import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <div className="card product h-100">
      <img src={item.img} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">${item.price}</p>
        <Link className="btn btn-brand" to={`/item/${item.id}`}>
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
