import fs from "fs";
import path from "path";

const HOME = process.env.HOME || "";
const oldAppPath = path.join(HOME, "Desktop", "Entregable2Gamarra", "assets", "js", "app.js");
const outPath = path.join(process.cwd(), "src", "data", "catalog.js");

if (!fs.existsSync(oldAppPath)) {
  console.error("No encuentro:", oldAppPath);
  process.exit(1);
}

const src = fs.readFileSync(oldAppPath, "utf8");

// arrays que queremos migrar
const NAMES = [
  "productosFrescor",
  "productosKriska",
  "productosHumorFem",
  "productosLuna",
  "productosKaiak",
  "productosEssencial",
  "productosHomem",
  "productosCuidados",
  "productosMaquillaje",
  "productosRegalos",
];

// extrae: const <name> = [ ... ];
function extractConstArray(name) {
  const re = new RegExp(String.raw`const\s+${name}\s*=\s*\[[\s\S]*?\];`, "m");
  const m = src.match(re);
  return m ? m[0] : null;
}

function extractSubcatOrder() {
  const re = /const\s+SUBCAT_ORDER\s*=\s*\[[\s\S]*?\];/m;
  const m = src.match(re);
  return m ? m[0] : null;
}

function normalizeImages(block) {
  // assets/img/...  -> /img/...
  return block.replace(/img:\s*'assets\/img\//g, "img:'/img/");
}

let out = "";
out += `// AUTO-GENERADO desde Entregable2Gamarra/assets/js/app.js\n`;
out += `// NO edites a mano: re-corré tools/import_catalog.mjs\n\n`;

let missing = [];

for (const name of NAMES) {
  const block = extractConstArray(name);
  if (!block) {
    missing.push(name);
    continue;
  }
  const normalized = normalizeImages(block).replace(/^const\s+/m, "export const ");
  out += normalized + "\n\n";
}

const subcat = extractSubcatOrder();
if (subcat) {
  out += subcat.replace(/^const\s+/m, "export const ") + "\n\n";
} else {
  // fallback (por si no lo encuentra)
  out += `export const SUBCAT_ORDER = ['Kaiak','Essencial','Kriska','Luna','Humor','Homem','Frescor'];\n\n`;
}

// derivados (solo si existen)
out += `export const productosMasculina = [\n`;
out += `  ...(typeof productosKaiak !== 'undefined' ? productosKaiak : []),\n`;
out += `  ...(typeof productosEssencial !== 'undefined' ? productosEssencial : []),\n`;
out += `  ...(typeof productosHomem !== 'undefined' ? productosHomem : []),\n`;
out += `];\n\n`;

out += `export const productosFemenina = [\n`;
out += `  ...(typeof productosFrescor !== 'undefined' ? productosFrescor : []),\n`;
out += `  ...(typeof productosKriska !== 'undefined' ? productosKriska : []),\n`;
out += `  ...(typeof productosHumorFem !== 'undefined' ? productosHumorFem : []),\n`;
out += `  ...(typeof productosLuna !== 'undefined' ? productosLuna : []),\n`;
out += `];\n\n`;

out += `export const productosPerfumeria = [\n`;
out += `  ...productosFemenina,\n`;
out += `  ...productosMasculina,\n`;
out += `];\n\n`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, "utf8");

console.log("OK ✅ Generado:", outPath);
if (missing.length) {
  console.log("OJO ⚠️ No encontré estos bloques en app.js:", missing.join(", "));
}
