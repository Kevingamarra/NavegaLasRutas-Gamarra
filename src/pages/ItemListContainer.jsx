import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../data/products";
import ItemList from "../components/ItemList/ItemList";

export default function ItemListContainer({ greeting = "" }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    getProducts(categoryId)
      .then((data) => {
        if (alive) setItems(data);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [categoryId]);

  return (
    <section className="container py-4">
      {greeting ? <p className="mb-3">{greeting}</p> : null}
      {categoryId ? <h2 className="section-title text-capitalize">{categoryId}</h2> : <h2 className="section-title">Catálogo</h2>}
      {loading ? <p>Cargando...</p> : <ItemList items={items} />}
    </section>
  );
}
