import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Reimplementación mínima del parser de lib/tarifas.ts contra el fixture guardado,
// sin depender del transpilado de TS (el script corre con node plano).
const ROOM_ORDER = ["SGL", "MAT", "TWN", "JRS", "TPL"];

function parseWinpaxHtml(html) {
  const blocks = html.split('<div class="room_title">').slice(1);
  if (blocks.length < 5) return null;

  const tarifas = [];
  for (let i = 0; i < ROOM_ORDER.length; i++) {
    const block = blocks[i];
    if (!block) return null;

    const nameMatch = block.match(/<h3>\s*([^<]+)/);
    const bbars = block.match(/rel="BBARS"[\s\S]{0,600}?<h4><small>ARS<\/small>\s*([\d.]+)/);
    const lst = block.match(/rel="[^"]*LST"[\s\S]{0,600}?<h4><small>ARS<\/small>\s*([\d.]+)/);
    const nrars = block.match(/rel="NRARS"[\s\S]{0,600}?<h4><small>ARS<\/small>\s*([\d.]+)/);

    if (!nameMatch || !bbars || !lst || !nrars) return null;

    tarifas.push({
      room: ROOM_ORDER[i],
      nombre: nameMatch[1].trim(),
      lista: Math.round(parseFloat(bbars[1])),
      oferta: Math.round(parseFloat(lst[1])),
      noReemb: Math.round(parseFloat(nrars[1])),
    });
  }
  return tarifas;
}

const html = readFileSync(path.join(__dirname, "fixtures/winpax.html"), "utf8");
const tarifas = parseWinpaxHtml(html);

assert(tarifas, "parser debe devolver tarifas, no null");
assert(tarifas.length === 5, `esperaba 5 habitaciones, obtuve ${tarifas?.length}`);
for (const t of tarifas) {
  assert(t.lista > t.oferta, `${t.room}: lista (${t.lista}) debe ser > oferta (${t.oferta})`);
  assert(t.oferta > 0, `${t.room}: oferta debe ser > 0`);
  assert(t.noReemb > 0, `${t.room}: noReemb debe ser > 0`);
}

console.log("OK — 5 tarifas parseadas correctamente:");
console.table(tarifas);

function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    process.exit(1);
  }
}
