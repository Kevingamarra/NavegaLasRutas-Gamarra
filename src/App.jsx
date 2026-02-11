import { useMemo, useState } from "react";

import Welcome from "./components/Welcome/Welcome";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import HeroTitle from "./components/HeroTitle/HeroTitle";
import FiltersBar from "./components/FiltersBar/FiltersBar";
import SearchResultsRow from "./components/SearchResultsRow/SearchResultsRow";
import PerfumeriaGroups from "./components/PerfumeriaGroups/PerfumeriaGroups";
import CarouselRow from "./components/CarouselRow/CarouselRow";
import CartOffcanvas from "./components/CartOffcanvas/CartOffcanvas";
import FloatingCartButton from "./components/FloatingCartButton/FloatingCartButton";
import InfoSection from "./components/InfoSection/InfoSection";
import Footer from "./components/Footer/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat/WhatsAppFloat";

import {
  productsPerfumeria,
  productosCuidados,
  productosMaquillaje,
  productosRegalos,
  SUBCAT_ORDER,
} from "./data/catalog";

import useCart from "./hooks/useCart";

function uniqAromas(arr) {
  const set = new Set();
  arr.forEach((p) => (p.aromas || []).forEach((a) => set.add(a)));
  return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
}

export default function App() {
  const { cart, totalItems, subtotal, addToCart, removeOne, removeItem, clearCart } = useCart();

  const [subcat, setSubcat] = useState("*");
  const [aroma, setAroma] = useState("*");
  const [q, setQ] = useState("");

  const aromasDisponibles = useMemo(() => uniqAromas(productsPerfumeria), []);

  const filteredPerfumeria = useMemo(() => {
    return productsPerfumeria.filter((p) => {
      if (subcat !== "*" && p.subcat !== subcat) return false;
      if (aroma !== "*" && !(p.aromas || []).includes(aroma)) return false;
      return true;
    });
  }, [subcat, aroma]);

  const searchResults = useMemo(() => {
    const query = (q || "").trim().toLowerCase();
    if (!query) return [];
    return productsPerfumeria.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const sc = (p.subcat || "").toLowerCase();
      return name.includes(query) || sc.includes(query);
    });
  }, [q]);

  return (
    <>
      <Welcome />

      <Navbar cartCount={totalItems} query={q} onQueryChange={setQ} />

      <Hero />
      <HeroTitle />

      <main id="inicio">
        <section id="perfumeria" className="container py-5">
          <h2 className="section-title">Perfumería</h2>

          <FiltersBar
            subcat={subcat}
            aroma={aroma}
            aromas={aromasDisponibles}
            subcatOrder={SUBCAT_ORDER}
            onSubcatChange={setSubcat}
            onAromaChange={setAroma}
          />

          <SearchResultsRow query={q} items={searchResults} onAdd={addToCart} />

          <PerfumeriaGroups products={filteredPerfumeria} subcatOrder={SUBCAT_ORDER} onAdd={addToCart} />
        </section>

        <section id="cuidados" className="container py-5">
          <h2 className="section-title">Cuidados</h2>
          <CarouselRow title="Cuidados" items={productosCuidados} onAdd={addToCart} />
        </section>

        <section id="maquillaje" className="container py-5">
          <h2 className="section-title">Maquillaje</h2>
          <CarouselRow title="Maquillaje" items={productosMaquillaje} onAdd={addToCart} />
        </section>

        <section id="regalos" className="container py-5">
          <h2 className="section-title">Regalos</h2>
          <CarouselRow title="Regalos" items={productosRegalos} onAdd={addToCart} />
        </section>

        <FloatingCartButton count={totalItems} />
        <CartOffcanvas
          cart={cart}
          subtotal={subtotal}
          onAdd={addToCart}
          onRemoveOne={removeOne}
          onRemoveItem={removeItem}
          onClear={clearCart}
        />

        <InfoSection />
        <Footer />
        <WhatsAppFloat />
      </main>
    </>
  );
}
