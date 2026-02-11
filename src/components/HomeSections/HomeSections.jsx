import CarouselRow from "../CarouselRow/CarouselRow";
import { productosCuidados, productosMaquillaje, productosRegalos } from "../../data/catalog";

export default function HomeSections({ onAdd }) {
  return (
    <>
      <section id="cuidados" className="container py-5">
        <h2 className="section-title">Cuidados</h2>
        <CarouselRow title="Cuidados" items={productosCuidados} onAdd={onAdd} />
      </section>

      <section id="maquillaje" className="container py-5">
        <h2 className="section-title">Maquillaje</h2>
        <CarouselRow title="Maquillaje" items={productosMaquillaje} onAdd={onAdd} />
      </section>

      <section id="regalos" className="container py-5">
        <h2 className="section-title">Regalos</h2>
        <CarouselRow title="Regalos" items={productosRegalos} onAdd={onAdd} />
      </section>
    </>
  );
}
