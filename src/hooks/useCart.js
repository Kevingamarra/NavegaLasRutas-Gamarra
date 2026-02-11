import { useEffect, useMemo, useState } from "react";

const CART_LS_KEY = "pb_cart_v1";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_LS_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default function useCart() {
  const [cart, setCart] = useState(() => loadCart());

  useEffect(() => {
    localStorage.setItem(CART_LS_KEY, JSON.stringify(cart));
  }, [cart]);

  const totalItems = useMemo(
    () => cart.reduce((acc, it) => acc + (it.qty || 0), 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((acc, it) => acc + (it.price || 0) * (it.qty || 0), 0),
    [cart]
  );

  function addToCart(prod) {
    if (!prod?.id) return;

    setCart((prev) => {
      const next = [...prev];
      const idx = next.findIndex((i) => i.id === prod.id);
      if (idx >= 0) {
        next[idx] = { ...next[idx], qty: (next[idx].qty || 0) + 1 };
      } else {
        next.push({
          id: prod.id,
          name: prod.name || "Producto sin nombre",
          price: Number(prod.price || 0),
          qty: 1,
        });
      }
      return next;
    });
  }

  function removeOne(id) {
    setCart((prev) => {
      const next = prev
        .map((it) => (it.id === id ? { ...it, qty: (it.qty || 0) - 1 } : it))
        .filter((it) => (it.qty || 0) > 0);
      return next;
    });
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((it) => it.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return { cart, totalItems, subtotal, addToCart, removeOne, removeItem, clearCart };
}
