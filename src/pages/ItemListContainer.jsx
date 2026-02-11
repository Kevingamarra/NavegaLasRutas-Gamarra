import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../data/products";
import ItemList from "../components/ItemList/ItemList";

function prettyTitle(slug) {
  if (!slug) return "Catálogo";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function ItemListContainer({ greeting = "" }) {
  const { categoryId } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // solo para perfumería
  const [sexo, setSexo] = useState("femenina");

  useEffect(() => {
    if (!categoryId) {
      setItems([]);
      setLoading(false);
      return;
    }

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

  const visibleItems = useMemo(() => {
    if (categoryId !== "perfumeria") return items;
    return items.filter((p) => (sexo ? p.sexo === sexo : true));
  }, [items, categoryId, sexo]);

  // DEBUG (temporal)
  console.log("categoryId:", categoryId, "items:", items.length, "visible:", visibleItems.length);

  return (
    <section className="container py-4">
      {greeting ? <p className="mb-3">{greeting}</p> : null}

      {!categoryId ? (
        <>
          <h2 className="section-title">Catálogo</h2>

          <div className="row g-3">
            <div className="col-12 col-sm-6 col-lg-3">
              <Link className="card h-100 text-decoration-none" to="/category/perfumeria">
                <div className="card-body">
                  <h5 className="card-title mb-0">Perfumería</h5>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <Link className="card h-100 text-decoration-none" to="/category/cuidados">
                <div className="card-body">
                  <h5 className="card-title mb-0">Cuidados</h5>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <Link className="card h-100 text-decoration-none" to="/category/maquillaje">
                <div className="card-body">
                  <h5 className="card-title mb-0">Maquillaje</h5>
                </div>
              </Link>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <Link className="card h-100 text-decoration-none" to="/category/regalos">
                <div className="card-body">
                  <h5 className="card-title mb-0">Regalos</h5>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="section-title">{prettyTitle(categoryId)}</h2>

          {categoryId === "perfumeria" ? (
            <div className="d-flex gap-2 mb-3">
              <button
                type="button"
                className={`btn ${sexo === "femenina" ? "btn-brand" : "btn-outline-brand"}`}
                onClick={() => setSexo("femenina")}
              >
                Femenina
              </button>
              <button
                type="button"
                className={`btn ${sexo === "masculina" ? "btn-brand" : "btn-outline-brand"}`}
                onClick={() => setSexo("masculina")}
              >
                Masculina
              </button>
            </div>
          ) : null}

          {loading ? <p>Cargando...</p> : <ItemList items={visibleItems} />}
        </>
      )}
    </section>
  );
}
