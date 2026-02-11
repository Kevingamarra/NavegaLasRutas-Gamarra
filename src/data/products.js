export const products = [
  { id: "1", name: "Kaiak Clásico", category: "perfumeria", price: 12000, img: "/assets/img/productos/kaiak.jpg", desc: "Fresco y clásico." },
  { id: "2", name: "Essencial Oud", category: "perfumeria", price: 18000, img: "/assets/img/productos/essencial.jpg", desc: "Intenso y elegante." },
  { id: "3", name: "Crema Hidratante", category: "cuidados", price: 9000, img: "/assets/img/productos/crema.jpg", desc: "Hidratación diaria." },
  { id: "4", name: "Labial Mate", category: "maquillaje", price: 7000, img: "/assets/img/productos/labial.jpg", desc: "Color intenso." },
  { id: "5", name: "Set Regalo", category: "regalos", price: 15000, img: "/assets/img/productos/regalo.jpg", desc: "Ideal para regalar." },
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
