export default function ItemListContainer({ greeting = "" }) {
  return (
    <section className="container py-3">
      <p className="mb-0">{greeting}</p>
    </section>
  );
}
