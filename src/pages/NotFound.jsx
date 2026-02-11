import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container py-5">
      <h2 className="section-title">404</h2>
      <p>Página no encontrada.</p>
      <Link to="/" className="btn btn-brand">Volver al inicio</Link>
    </section>
  );
}
