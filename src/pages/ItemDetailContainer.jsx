import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/products";
import ItemDetail from "../components/ItemDetail/ItemDetail";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    getProductById(itemId)
      .then((data) => {
        if (alive) setItem(data);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [itemId]);

  return (
    <section className="container py-4">
      <Link to="/" className="btn btn-outline-brand mb-3">← Volver</Link>
      {loading ? <p>Cargando...</p> : item ? <ItemDetail item={item} /> : <p>No se encontró el producto.</p>}
    </section>
  );
}
