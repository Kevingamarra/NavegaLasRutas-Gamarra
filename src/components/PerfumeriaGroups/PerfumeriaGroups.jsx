import CarouselRow from "../CarouselRow/CarouselRow";

export default function PerfumeriaGroups({ products = [], order = [], onAdd }) {
  const groups = products.reduce((acc, p) => {
    const key = (p.subcat || "Otros").trim();
    (acc[key] ||= []).push(p);
    return acc;
  }, {});

  const keys = order.length
    ? order.filter((k) => (groups[k] || []).length > 0)
    : Object.keys(groups);

  return (
    <div id="perfumeria-groups">
      {keys.map((k) => (
        <div key={k}>
          <h3 className="subcat-heading animate-fadeUp">{k}</h3>
          <CarouselRow title={k} items={groups[k] || []} onAdd={onAdd} />
        </div>
      ))}
    </div>
  );
}
