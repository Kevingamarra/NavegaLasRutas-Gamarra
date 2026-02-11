export default function FloatingCartButton({ count = 0 }) {
  return (
    <button
      id="floatingCartBtn"
      className="cart-float"
      data-bs-toggle="offcanvas"
      data-bs-target="#carrito"
      aria-label="Abrir carrito"
      type="button"
    >
      <i className="bi bi-cart-fill"></i>
      <span id="floatingCartCount">{count}</span>
    </button>
  );
}
