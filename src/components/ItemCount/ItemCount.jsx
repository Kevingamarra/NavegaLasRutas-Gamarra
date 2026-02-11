import { useState } from "react";

export default function ItemCount({ initial = 1, stock = 10, onAdd }) {
  const [qty, setQty] = useState(initial);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(stock, q + 1));

  return (
    <div className="d-flex align-items-center gap-2 mt-3">
      <button className="btn btn-outline-brand" type="button" onClick={dec}>-</button>
      <span>{qty}</span>
      <button className="btn btn-outline-brand" type="button" onClick={inc}>+</button>
      <button className="btn btn-brand ms-2" type="button" onClick={() => onAdd && onAdd(qty)}>
        Agregar
      </button>
    </div>
  );
}
