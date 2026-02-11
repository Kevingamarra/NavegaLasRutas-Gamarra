import {
  productsPerfumeria,
  productosCuidados,
  productosMaquillaje,
  productosRegalos,
} from "./catalog.js";

const toItem = (p, forcedCategory = "") => {
  const category = forcedCategory || p.category || "";

  let sexo = "";
  const img = p.img || "";
  if (category === "perfumeria") {
    if (img.includes("/perfumeria/femenina/")) sexo = "femenina";
    if (img.includes("/perfumeria/masculina/")) sexo = "masculina";
  }

  const aromas = Array.isArray(p.aromas) && p.aromas.length ? p.aromas.slice(0, 3).join(", ") : "";
  const desc = [p.subcat || "", aromas ? `Aromas: ${aromas}` : ""].filter(Boolean).join(" • ");

  return {
    id: String(p.id),
    name: p.name,
    category,   // <-- ahora SIEMPRE viene bien
    sexo,       // femenina/masculina solo perfumeria
    price: p.price,
    img: p.img,
    desc: desc || "Producto Natura",
  };
};

export const products = [
  ...productsPerfumeria.map((p) => toItem(p, "perfumeria")),
  ...productosCuidados.map((p) => toItem(p, "cuidados")),
  ...productosMaquillaje.map((p) => toItem(p, "maquillaje")),
  ...productosRegalos.map((p) => toItem(p, "regalos")),
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts(categoryId) {
  await delay(600);
  if (!categoryId) return [];
  return products.filter((p) => p.category === categoryId);
}

export async function getProductById(id) {
  await delay(600);
  return products.find((p) => p.id === String(id)) || null;
}
