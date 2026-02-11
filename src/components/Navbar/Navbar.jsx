export default function Navbar({ cartCount = 0, query = "", onQueryChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const q = e.currentTarget?.searchProducts?.value || "";
    onQueryChange && onQueryChange(q);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#inicio" aria-label="Ir al inicio">
          <img src="/assets/img/logo.png" alt="Pura Belleza" height="40" className="me-2" />
          Pura Belleza
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link" href="#perfumeria">Perfumería</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#cuidados">Cuidados</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#maquillaje">Maquillaje</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#regalos">Regalos</a>
            </li>
          </ul>

          {/* Buscador */}
          <form
            className="d-flex ms-lg-3 mt-3 mt-lg-0"
            role="search"
            aria-label="Buscar productos"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control me-2"
              id="searchProducts"
              name="searchProducts"
              type="search"
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              value={query}
              onChange={(e) => onQueryChange && onQueryChange(e.target.value)}
            />
            <button className="btn btn-outline-brand" type="submit" aria-label="Buscar">
              <i className="bi bi-search" aria-hidden="true"></i>
            </button>
          </form>

          {/* Carrito */}
          <button
            className="btn btn-brand ms-2 ms-lg-3 mt-3 mt-lg-0"
            data-bs-toggle="offcanvas"
            data-bs-target="#carrito"
            aria-controls="carrito"
            aria-label="Abrir carrito"
            type="button"
          >
            <i className="bi bi-cart" aria-hidden="true"></i>
            <span id="cartBadge" className="badge bg-light text-dark rounded-pill ms-1">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
