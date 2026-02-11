import ItemCount from "../ItemCount/ItemCount";

export default function ItemDetail({ item }) {
  if (!item) return null;

  return (
    <div className="row g-4">
      <div className="col-12 col-md-6">
        <img src={item.img} alt={item.name} className="img-fluid rounded" />
      </div>
      <div className="col-12 col-md-6">
        <h2 className="section-title">{item.name}</h2>
        <p className="mb-2">${item.price}</p>
        <p className="mb-0">{item.desc}</p>

        <ItemCount stock={10} initial={1} onAdd={(qty) => console.log("ADD (placeholder):", qty)} />
      </div>
    </div>
  );
}
