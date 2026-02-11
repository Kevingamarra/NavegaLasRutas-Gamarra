export const products = [
  { id: "1", name: "Perfume Femenino", category: "perfumeria", price: 12000, img: import.meta.env.BASE_URL + "img/productos/perfumeria/femenina/perfumeria-femenina-1.jpg", desc: "Fresco y clásico." },
  { id: "2", name: "Perfume Masculino", category: "perfumeria", price: 18000, img: import.meta.env.BASE_URL + "img/productos/perfumeria/masculina/perfumeria-masculina-1.jpg", desc: "Intenso y elegante." },
  { id: "3", name: "Crema Hidratante", category: "cuidados", price: 9000, img: import.meta.env.BASE_URL + "img/productos/cuidados/cuidados-1.jpg", desc: "Hidratación diaria." },
  { id: "4", name: "Labial Mate", category: "maquillaje", price: 7000, img: import.meta.env.BASE_URL + "img/productos/maquillaje/maquillaje-1.jpg", desc: "Color intenso." },
  { id: "5", name: "Set Regalo", category: "regalos", price: 15000, img: import.meta.env.BASE_URL + "img/productos/regalos/regalos-1.jpg", desc: "Ideal para regalar." },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts(categoryId) {
  await delay(600);
  if (!categoryId) return products;
  return products.filter((p) => p.category === categoryId);
}

export async function getProductById(id) {
  await delay(600);
  return products.find((p) => p.id === id) || null;
}
