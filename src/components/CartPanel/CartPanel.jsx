export default function CartPanel({ cart, subtotal, onAdd, onRemoveOne, onRemoveItem, onClear }) {
  return (
    <aside style={{ border: "1px solid #e085a4", borderRadius: 14, padding: 14 }}>
      <h3 style={{ marginTop: 0 }}>Carrito</h3>

      {cart.length === 0 ? (
        <p style={{ opacity: 0.8, marginBottom: 0 }}>Todavía no agregaste productos.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
            {cart.map((it) => (
              <li key={it.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {it.name}
                  </div>
                  <div style={{ opacity: 0.8, fontSize: 14 }}>
                    $ {Number(it.price || 0).toLocaleString("es-AR")} · x{it.qty}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => onRemoveOne(it.id)}>
                    −
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => onAdd({ id: it.id, name: it.name, price: it.price })}>
                    +
                  </button>
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onRemoveItem(it.id)}>
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <hr style={{ margin: "12px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800 }}>
            <span>Total</span>
            <span>$ {Number(subtotal).toLocaleString("es-AR")}</span>
          </div>

          <button type="button" className="btn btn-brand w-100 mt-3" onClick={onClear}>
            Vaciar carrito
          </button>
        </>
      )}
    </aside>
  );
}
