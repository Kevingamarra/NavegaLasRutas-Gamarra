import { useId, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import ProductCard from "../ProductCard/ProductCard";

export default function CarouselRow({ title, items = [], onAdd }) {
  const uid = useId().replace(/:/g, "");
  const rowId = useMemo(() => `row-${uid}`, [uid]);
  const prevId = useMemo(() => `prev-${uid}`, [uid]);
  const nextId = useMemo(() => `next-${uid}`, [uid]);

  if (!items.length) return null;

  return (
    <>

      <div className="carousel-row">
        <button
          id={prevId}
          className="carousel-btn prev"
          data-target={rowId}
          aria-controls={rowId}
          aria-label={`Anterior ${title}`}
          type="button"
        >
          <i className="bi bi-chevron-left" aria-hidden="true"></i>
        </button>

        <Swiper
          id={rowId}
          className="products-row swiper"
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: `#${prevId}`,
            nextEl: `#${nextId}`,
          }}
          pagination={{ clickable: true }}
          loop={false}
          slidesPerView={"auto"}
          spaceBetween={12}
        >
          {items.map((p, i) => (
            <SwiperSlide key={p.id} className="swiper-slide">
              <ProductCard product={p} index={i} onAdd={onAdd} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          id={nextId}
          className="carousel-btn next"
          data-target={rowId}
          aria-controls={rowId}
          aria-label={`Siguiente ${title}`}
          type="button"
        >
          <i className="bi bi-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </>
  );
}
