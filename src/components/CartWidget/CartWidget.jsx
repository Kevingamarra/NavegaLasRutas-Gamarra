export default function CartWidget({ count = 0, targetId = "#carrito" }) {
  return (
    <button
      className="btn btn-brand ms-2 ms-lg-3 mt-3 mt-lg-0"
      data-bs-toggle="offcanvas"
      data-bs-target={targetId}
      aria-controls={targetId.replace("#", "")}
      aria-label="Abrir carrito"
      type="button"
    >
      <i className="bi bi-cart" aria-hidden="true"></i>
      <span className="badge bg-light text-dark rounded-pill ms-1">
        {count}
      </span>
    </button>
  );
}
