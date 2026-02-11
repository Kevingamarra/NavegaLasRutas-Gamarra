import { useMemo, useState } from "react";

const WHATSAPP_PHONE = "5491151039074";

function formatAR(n) {
  return `$ ${Number(n || 0).toLocaleString("es-AR")}`;
}

export default function CartOffcanvas({
  cart = [],
  subtotal = 0,
  onAdd,
  onRemoveOne,
  onRemoveItem,
  onClear,
}) {
  const [metodoEnvio, setMetodoEnvio] = useState("retiro");
  const [clienteNombre, setClienteNombre] = useState("");

  const [dirCalle, setDirCalle] = useState("");
  const [dirCiudad, setDirCiudad] = useState("");
  const [dirProvincia, setDirProvincia] = useState("");
  const [dirCP, setDirCP] = useState("");
  const [dirNotas, setDirNotas] = useState("");

  const [err, setErr] = useState("");

  const total = useMemo(() => Number(subtotal || 0), [subtotal]);
  const showDireccion = metodoEnvio === "andreani";

  function buildWhatsAppMessageOrError() {
    const nombre = (clienteNombre || "").trim();
    const metodo = metodoEnvio || "retiro";

    if (!nombre) {
      return { error: "Por favor, ingresá tu nombre." };
    }

    let envioTxt = "Método de envío: Retiro en domicilio del vendedor";
    let dir = { calle: "", ciudad: "", prov: "", cp: "", notas: "" };

    if (metodo === "andreani") {
      envioTxt = "Método de envío: Envío a domicilio (Andreani)";
      dir.calle = (dirCalle || "").trim();
      dir.ciudad = (dirCiudad || "").trim();
      dir.prov = (dirProvincia || "").trim();
      dir.cp = (dirCP || "").trim();
      dir.notas = (dirNotas || "").trim();

      if (!dir.calle || !dir.ciudad || !dir.prov || !dir.cp) {
        return {
          error:
            "Completá calle y número, ciudad, provincia y código postal para el envío por Andreani.",
        };
      }
    }

    
    const totalTxt = formatAR(total);
    const lines = cart.map((p) => `• ${p.name} — ${formatAR(p.price)}`).join("\n");

    const direccionBloque =
      metodo === "andreani"
        ? `\nDirección:\n${dir.calle}\n${dir.ciudad}, ${dir.prov} (CP ${dir.cp})${
            dir.notas ? `\nRef.: ${dir.notas}` : ""
          }\n`
        : "";

    const msg =
`Hola! Quiero finalizar mi compra:

${lines}

Total: ${totalTxt}

Nombre: ${nombre}
${envioTxt}
${direccionBloque}
¿Podemos coordinar el pago?`;

    return { text: encodeURIComponent(msg) };
  }

  function checkoutViaWhatsApp() {
    if (!cart.length) {
      setErr("Tu carrito está vacío.");
      return;
    }

    const result = buildWhatsAppMessageOrError();
    if (result.error) {
      setErr(result.error);
      return;
    }
    setErr("");

    const primary = `https://wa.me/${WHATSAPP_PHONE}?text=${result.text}`;
    const fallback = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${result.text}`;

    const win = window.open(primary, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = fallback;
  }

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="carrito" aria-labelledby="carritoLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="carritoLabel">Carrito de compras</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
      </div>

      <div className="offcanvas-body">
        <ul className="list-group" id="cartItems" aria-live="polite">
          {cart.length === 0 ? (
            <li className="list-group-item text-muted">Tu carrito está vacío.</li>
          ) : (
            cart.map((it) => (
              <li key={it.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="me-2" style={{ minWidth: 0 }}>
                  <div className="fw-semibold text-truncate">{it.name}</div>
                  <div className="small text-muted">
                    {formatAR(it.price)} · x{it.qty}
                  </div>

                  <div className="mt-2 d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => onRemoveOne?.(it.id)}
                      aria-label={`Restar 1 de ${it.name}`}
                    >
                      −
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => onAdd?.({ id: it.id, name: it.name, price: it.price })}
                      aria-label={`Sumar 1 de ${it.name}`}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onRemoveItem?.(it.id)}
                      aria-label={`Quitar ${it.name}`}
                    >
                      Quitar
                    </button>
                  </div>
                </div>

                <div className="fw-bold">{formatAR((it.price || 0) * (it.qty || 0))}</div>
              </li>
            ))
          )}
        </ul>

        <div className="mt-3 d-flex justify-content-between">
          <span>Total:</span> <span id="cartTotal">{formatAR(total)}</span>
        </div>

        <div className="mt-3">
          <label className="form-label small mb-1" htmlFor="clienteNombre">Nombre</label>
          <input
            id="clienteNombre"
            className="form-control"
            placeholder="Tu nombre"
            required
            aria-required="true"
            value={clienteNombre}
            onChange={(e) => setClienteNombre(e.target.value)}
          />
        </div>

        <div className="mt-3">
          <label className="form-label small mb-1" htmlFor="metodoEnvio">Método de envío</label>
          <select
            id="metodoEnvio"
            className="form-select"
            aria-label="Elegir método de envío"
            value={metodoEnvio}
            onChange={(e) => setMetodoEnvio(e.target.value)}
          >
            <option value="retiro">Retiro en domicilio del vendedor</option>
            <option value="andreani">Envío a domicilio (Andreani)</option>
          </select>
        </div>

        <div id="bloqueDireccion" className={`mt-3 ${showDireccion ? "" : "d-none"}`}>
          <div className="row g-2">
            <div className="col-12">
              <label className="form-label small mb-1" htmlFor="dirCalle">Calle y número</label>
              <input id="dirCalle" className="form-control" placeholder="Ej: Av. Siempre Viva 742"
                value={dirCalle} onChange={(e) => setDirCalle(e.target.value)} />
            </div>
            <div className="col-6">
              <label className="form-label small mb-1" htmlFor="dirCiudad">Ciudad</label>
              <input id="dirCiudad" className="form-control" placeholder="Ej: CABA"
                value={dirCiudad} onChange={(e) => setDirCiudad(e.target.value)} />
            </div>
            <div className="col-6">
              <label className="form-label small mb-1" htmlFor="dirProvincia">Provincia</label>
              <input id="dirProvincia" className="form-control" placeholder="Ej: Buenos Aires"
                value={dirProvincia} onChange={(e) => setDirProvincia(e.target.value)} />
            </div>
            <div className="col-6">
              <label className="form-label small mb-1" htmlFor="dirCP">Código Postal</label>
              <input id="dirCP" className="form-control" placeholder="Ej: 1406"
                value={dirCP} onChange={(e) => setDirCP(e.target.value)} />
            </div>
            <div className="col-6">
              <label className="form-label small mb-1" htmlFor="dirNotas">Referencias (opcional)</label>
              <input id="dirNotas" className="form-control" placeholder="Piso, dpto, entre calles..."
                value={dirNotas} onChange={(e) => setDirNotas(e.target.value)} />
            </div>
          </div>
        </div>

        {err ? (
          <div className="alert alert-danger mt-3 mb-0" role="alert">
            {err}
          </div>
        ) : null}

        <div className="mt-3 d-grid gap-2">
          <button id="btnCheckout" className="btn btn-brand" aria-label="Finalizar compra" type="button" onClick={checkoutViaWhatsApp}>
            Finalizar compra
          </button>
          <button id="btnClearCart" className="btn btn-outline-secondary" aria-label="Vaciar carrito" type="button" onClick={() => onClear?.()}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
}
