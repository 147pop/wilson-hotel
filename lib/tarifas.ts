export type RoomKey = "SGL" | "MAT" | "TWN" | "JRS" | "TPL";

export type Tarifa = { room: RoomKey; nombre: string; lista: number; oferta: number; noReemb: number };

const WINPAX_URL = "https://motor.winpax.com.ar/search.php?hotel_id=133";

// Winpax lista las habitaciones siempre en este orden (verificado en fixture de scripts/fixtures/winpax.html).
// Se mapea por posición, no por nombre: Winpax escribe "Habitacion Doble Twin" sin tilde y puede cambiar el texto.
const ROOM_ORDER: RoomKey[] = ["SGL", "MAT", "TWN", "JRS", "TPL"];

// ponytail: fallback estático, actualizar a mano si el scrape queda desactualizado por mucho tiempo
const FALLBACK: Tarifa[] = [
  { room: "SGL", nombre: "Habitación Single", lista: 63223, oferta: 53740, noReemb: 56901 },
  { room: "MAT", nombre: "Doble Matrimonial", lista: 98347, oferta: 83595, noReemb: 88512 },
  { room: "TWN", nombre: "Doble Twin", lista: 98347, oferta: 83595, noReemb: 88512 },
  { room: "JRS", nombre: "Junior Suite Matrimonial", lista: 119421, oferta: 101508, noReemb: 107479 },
  { room: "TPL", nombre: "Triple", lista: 119421, oferta: 101508, noReemb: 107479 },
];

function parseWinpaxHtml(html: string): Tarifa[] | null {
  const blocks = html.split('<div class="room_title">').slice(1);
  if (blocks.length < 5) return null;

  const tarifas: Tarifa[] = [];
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

export async function getTarifas(): Promise<{ tarifas: Tarifa[]; live: boolean }> {
  try {
    const res = await fetch(WINPAX_URL, {
      next: { revalidate: 3600 },
      // Winpax devuelve 403 sin un User-Agent de navegador real.
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" },
    });
    if (!res.ok) throw new Error(`Winpax respondió ${res.status}`);
    const html = await res.text();
    const tarifas = parseWinpaxHtml(html);
    if (!tarifas) throw new Error("Parseo de Winpax no encontró 5 habitaciones");
    return { tarifas, live: true };
  } catch {
    return { tarifas: FALLBACK, live: false };
  }
}

export function formatARS(n: number): string {
  return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(n);
}
