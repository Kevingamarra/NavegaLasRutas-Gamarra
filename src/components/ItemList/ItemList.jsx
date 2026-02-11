import ItemCard from "../ItemCard/ItemCard";

export default function ItemList({ items = [] }) {
  return (
    <div className="row g-3">
      {items.map((item) => (
        <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
          <ItemCard item={item} />
        </div>
      ))}
    </div>
  );
}
