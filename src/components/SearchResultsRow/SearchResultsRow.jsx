import CarouselRow from "../CarouselRow/CarouselRow";

export default function SearchResultsRow({ query = "", items = [], onAdd }) {
  const q = (query || "").trim();
  if (!q) return null;

  return (
    <>
      <h3 className="subcat-heading animate-fadeUp">Resultados</h3>
      <CarouselRow items={items} onAdd={onAdd} />
    </>
  );
}
