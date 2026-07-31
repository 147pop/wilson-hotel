import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..");

// Nombre de carpeta de Drive (case/espacios normalizados) -> slug físico ya usado
// en public/hotel/. Sin fuzzy matching a propósito: si Drive tiene un nombre
// nuevo, el script lo reporta como "sin mapeo" en vez de adivinar.
const FOLDER_TO_SLUG = {
  "TRIPLE - M+S": { category: "habitaciones", slug: "triple-ms" },
  "TRIPLE - X3 SIMPLE": { category: "habitaciones", slug: "triple-simple" },
  "SINGLE STANDARD": { category: "habitaciones", slug: "single-standard" },
  "DOBLE SINGLE": { category: "habitaciones", slug: "doble-single" },
  "DOBLE SUIT - SILLAS": { category: "habitaciones", slug: "doble-suite-sillas" },
  "DOBLE STANDARD": { category: "habitaciones", slug: "doble-standard" },
  "DOBLE SUIT - SILLONES": { category: "habitaciones", slug: "doble-suite-sillones" },
  "FACHADA": { category: "amenities", slug: "fachada" },
  "DESAYUNO": { category: "amenities", slug: "desayuno" },
  "HOME": { category: "amenities", slug: "home" },
  "SALON": { category: "amenities", slug: "salon" },
};

const CATEGORY_LABELS = {
  "single-standard": "Habitación Simple",
  "doble-standard": "Doble Matrimonial",
  "doble-single": "Doble Twin",
  "doble-suite-sillones": "Suite Matrimonial",
  "doble-suite-sillas": "Suite con Sillas",
  "triple-ms": "Triple",
  "triple-simple": "Triple Simple",
  "desayuno": "Desayuno",
  "fachada": "Fachada",
  "home": "Lobby",
  "salon": "Salón de Eventos",
};

// Las fotos exportadas de Google Drive llegan como HEIC pero SIN extensión
// (ej. "FACHADA(2)", sin ".heic") — solo los videos conservan ".mov". Por eso
// no se puede clasificar solo por extensión: un archivo sin extensión dentro
// de una carpeta FOTO/FOTOS se trata como foto (sips detecta el contenido real,
// no depende del nombre).
const IMAGE_EXTENSIONS = new Set([".heic", ".heif", ".jpg", ".jpeg", ".png", ".webp"]);
const HEIC_EXTENSIONS = new Set([".heic", ".heif"]);
const PHOTO_DIR_NAMES = new Set(["FOTO", "FOTOS"]);

function normalizeFolderName(name) {
  return name.trim().toUpperCase();
}

function isPhotoFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (IMAGE_EXTENSIONS.has(ext)) return true;
  if (ext === "") {
    return PHOTO_DIR_NAMES.has(normalizeFolderName(path.basename(path.dirname(filePath))));
  }
  return false;
}

function needsHeicConversion(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return HEIC_EXTENSIONS.has(ext) || ext === "";
}

function padNum(n) {
  return String(n).padStart(2, "0");
}

// --- autocheck de la lógica real del script, corre siempre antes de tocar archivos ---
assert(
  FOLDER_TO_SLUG[normalizeFolderName("triple - m+s")].slug === "triple-ms",
  "mapeo de carpetas roto (normalización)"
);
assert(padNum(3) === "03" && padNum(12) === "12", "formateo de numeración roto");
assert(isPhotoFile("/a/FOTOS/IMG_1") === true, "foto sin extensión en carpeta FOTOS debe detectarse");
assert(isPhotoFile("/a/VIDEOS/clip.mov") === false, ".mov nunca es foto");
assert(isPhotoFile("/a/cualquiera/x.heic") === true, ".heic siempre es foto, sea cual sea la carpeta");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function walkDirs(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const full = path.join(dir, entry.name);
      out.push(full, ...walkDirs(full));
    }
  }
  return out;
}

function heicToJpeg(heicPath, outJpegPath) {
  execFileSync("sips", ["-s", "format", "jpeg", heicPath, "--out", outJpegPath], {
    stdio: "pipe",
  });
}

async function processOne(srcPath, destDir, slug, index, tmpDir) {
  let inputPath = srcPath;

  if (needsHeicConversion(srcPath)) {
    inputPath = path.join(tmpDir, `tmp-${index}.jpg`);
    heicToJpeg(srcPath, inputPath);
  }

  const base = `${slug}-${padNum(index)}`;
  const fullOut = path.join(destDir, `${base}.webp`);

  // Un solo tamaño: /galeria usa next/image, que ya genera derivados más
  // chicos on-demand desde este archivo (ver sizes= en GalleryGrid/Lightbox).
  // Un -thumb.webp estático sería peso muerto, nadie lo referencia.
  await sharp(inputPath)
    .rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(fullOut);

  return `/hotel/galeria/${destDir.includes("amenities") ? "amenities" : "habitaciones"}/${slug}/${base}.webp`;
}

async function main() {
  const inputRoot = process.argv[2];
  if (!inputRoot) {
    console.error("Uso: node scripts/convert-gallery-photos.mjs <carpeta WILSON HOTEL descomprimida>");
    process.exit(1);
  }
  if (!statSync(inputRoot, { throwIfNoEntry: false })?.isDirectory()) {
    console.error(`No existe o no es carpeta: ${inputRoot}`);
    process.exit(1);
  }

  // Busca, en cualquier profundidad, subcarpetas cuyo nombre matchee FOLDER_TO_SLUG.
  // Esto absorbe la estructura inconsistente de Drive (HABITACIONES/AMENITIES,
  // subcarpetas FOTO/FOTOS/VIDEO extra, alguna carpeta vacía) sin casos especiales.
  const allDirs = [inputRoot, ...walkDirs(inputRoot)];
  const matchedDirs = new Map(); // slug -> { category, dirs: [] }

  for (const dir of allDirs) {
    const name = normalizeFolderName(path.basename(dir));
    const mapping = FOLDER_TO_SLUG[name];
    if (!mapping) continue;
    const entry = matchedDirs.get(mapping.slug) ?? { category: mapping.category, dirs: [] };
    entry.dirs.push(dir);
    matchedDirs.set(mapping.slug, entry);
  }

  const foundSlugs = new Set(matchedDirs.keys());
  const missing = Object.values(FOLDER_TO_SLUG)
    .map((m) => m.slug)
    .filter((slug) => !foundSlugs.has(slug));
  if (missing.length) {
    console.warn("Sin carpeta encontrada para:", missing.join(", "));
  }

  const tmpDir = mkdtempSync(path.join(tmpdir(), "gallery-convert-"));
  const summary = {};
  let skipped = 0;

  try {
    for (const [slug, { category, dirs }] of matchedDirs) {
      const files = dirs
        .flatMap((dir) => walk(dir))
        .filter(isPhotoFile)
        .sort();

      if (files.length === 0) {
        summary[slug] = 0;
        continue;
      }

      // Árbol dedicado a /galeria, separado de public/hotel/<categoria>/<slug>/
      // que usan ROOM_IMAGES/AMENITY_IMAGES — esas carpetas ya tienen fotos
      // curadas con la misma convención de numeración (slug-01.webp...), así
      // que reusarlas pisaría contenido en producción con cada corrida.
      const destDir = path.join(REPO_ROOT, "public", "hotel", "galeria", category, slug);
      mkdirSync(destDir, { recursive: true });

      const photos = [];
      for (let i = 0; i < files.length; i++) {
        const webPath = await processOne(files[i], destDir, slug, i + 1, tmpDir);
        photos.push(webPath);
      }
      summary[slug] = photos.length;
      summary[`__photos_${slug}`] = photos;
    }

    // cuenta archivos no-imagen para el log (videos, .DS_Store, shortcuts de Drive)
    for (const dir of allDirs) {
      const name = normalizeFolderName(path.basename(dir));
      if (!FOLDER_TO_SLUG[name]) continue;
      for (const f of walk(dir)) {
        if (!isPhotoFile(f)) skipped++;
      }
    }
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }

  console.log("\n=== Resumen de conversión ===");
  for (const slug of Object.keys(FOLDER_TO_SLUG).map((k) => FOLDER_TO_SLUG[k].slug)) {
    console.log(`  ${slug}: ${summary[slug] ?? 0} fotos`);
  }
  console.log(`  archivos no-imagen salteados: ${skipped}`);

  console.log("\n=== Pegar en lib/hotel-images.ts (reemplazando GALLERY_CATEGORIES) ===\n");
  console.log("export const GALLERY_CATEGORIES: GalleryCategory[] = [");
  for (const mapping of Object.values(FOLDER_TO_SLUG)) {
    const photos = summary[`__photos_${mapping.slug}`] ?? [];
    console.log(`  {`);
    console.log(`    slug: "${mapping.slug}",`);
    console.log(`    label: "${CATEGORY_LABELS[mapping.slug]}",`);
    console.log(`    photos: [`);
    for (const p of photos) console.log(`      "${p}",`);
    console.log(`    ],`);
    console.log(`  },`);
  }
  console.log("];");
}

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}

main();
