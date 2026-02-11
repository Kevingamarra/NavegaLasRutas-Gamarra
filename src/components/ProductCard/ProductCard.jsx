export default function ProductCard({ product: p, index = 0, onAdd }) {
  const aromaBadges = (p.aromas || []).map((a) => (
    <span key={a} className="badge badge-aroma me-1 mb-1">
      {a}
    </span>
  ));

  const delay = (0.04 * (index || 0)).toFixed(2);

  return (
    <div className="card product shadow-sm reveal" style={{ animationDelay: `${delay}s` }}>
      <div className="img-wrap">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          decoding="async"
          width="600"
          height="800"
          sizes="(max-width: 575.98px) 78vw, (max-width: 991.98px) 44vw, 300px"
          {...(index === 0 ? { fetchPriority: "high" } : {})}
        />
      </div>

      <div className="card-body">
        <div className="badge-row d-flex flex-wrap mb-1">
          <span className="badge-subcat">{p.subcat || "Otros"}</span>
          {aromaBadges}
        </div>
        <h3 className="title mb-0">{p.name}</h3>
        <div className="price fw-bold">
          $ {Number(p.price || 0).toLocaleString("es-AR")}
        </div>
      </div>

      <div className="card-footer bg-transparent border-0 pt-0">
        <button
          className="btn btn-brand w-100"
          data-add={p.id}
          aria-label={`Agregar ${p.name} al carrito`}
          type="button"
          onClick={() => onAdd?.(p)}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
