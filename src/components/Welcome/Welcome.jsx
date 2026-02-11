import { useEffect, useRef, useState } from "react";
import { Modal, Toast } from "bootstrap";

const TOAST_HTML =
  '💄✨ <strong>Bienvenido a Pura Belleza ✨🌸</strong><br>Descubrí fragancias y cosmética pensadas para vos';

export default function Welcome() {
  const [name, setName] = useState("");
  const modalRef = useRef(null);
  const toastRef = useRef(null);

  function showToast(html) {
    const toastEl = toastRef.current;
    if (!toastEl) return;

    const msgEl = toastEl.querySelector("#welcomeToastMsg");
    if (msgEl) msgEl.innerHTML = html;

    const toast = Toast.getOrCreateInstance(toastEl, {
      autohide: true,
      delay: 5000,
    });
    toast.show();
  }

  function showToastAfterModalClose() {
    const modalEl = modalRef.current;
    if (!modalEl) {
      showToast(TOAST_HTML);
      return;
    }
    modalEl.addEventListener("hidden.bs.modal", () => showToast(TOAST_HTML), { once: true });
  }

  useEffect(() => {
    const seen =
      sessionStorage.getItem("pb_welcome_seen") ||
      sessionStorage.getItem("pb_welcome_done");

    if (seen) return;

    const savedName = (localStorage.getItem("nombreUsuario") || "").trim();
    if (savedName) {
      sessionStorage.setItem("pb_welcome_seen", "1");
      sessionStorage.setItem("pb_welcome_done", "1");
      showToast(TOAST_HTML);
      return;
    }

    // Mostrar modal (con retry corto por timing de refs)
    let tries = 0;
    const tick = () => {
      tries += 1;
      const modalEl = modalRef.current;
      if (!modalEl) {
        if (tries < 30) setTimeout(tick, 50);
        return;
      }

      const modal = Modal.getOrCreateInstance(modalEl, {
        backdrop: "static",
        keyboard: false,
      });
      modal.show();
    };

    tick();
  }, []);

  function onStart() {
    const nombre = (name || "").trim();
    if (!nombre) return;

    localStorage.setItem("nombreUsuario", nombre);
    sessionStorage.setItem("pb_welcome_seen", "1");
    sessionStorage.setItem("pb_welcome_done", "1");

    showToastAfterModalClose();

    const modalEl = modalRef.current;
    if (modalEl) {
      const modal = Modal.getOrCreateInstance(modalEl);
      modal.hide();
    } else {
      showToast(TOAST_HTML);
    }
  }

  function onSkip() {
    sessionStorage.setItem("pb_welcome_seen", "1");
    sessionStorage.setItem("pb_welcome_done", "1");

    showToastAfterModalClose();

    const modalEl = modalRef.current;
    if (modalEl) {
      const modal = Modal.getOrCreateInstance(modalEl);
      modal.hide();
    } else {
      showToast(TOAST_HTML);
    }
  }

  return (
    <>
      {/* Toast (arriba derecha, debajo del carrito) */}
      <div id="welcomeToastContainer" className="toast-container p-3">
        <div
          ref={toastRef}
          id="welcomeToast"
          className="toast align-items-center text-bg-light border-0 shadow"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body" id="welcomeToastMsg"></div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Cerrar"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="modal fade"
        id="welcomeModal"
        tabIndex="-1"
        aria-labelledby="welcomeTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered welcome-modal">
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-body p-4 text-center">
              <img src={`${import.meta.env.BASE_URL}assets/img/logo.png`} alt="Pura Belleza" width="64" height="64" style={{ objectFit: "contain" }} />
              <h5 className="mt-3 mb-1" id="welcomeTitle">¡Bienvenidos a Pura Belleza!</h5>
              <p className="text-muted mb-3">Un universo de cosmética, fragancias y bienestar te espera.</p>

              <div className="text-start">
                <label className="form-label small mb-1" htmlFor="welcomeName">Tu nombre</label>
                <input
                  id="welcomeName"
                  className="form-control"
                  placeholder="Ingresá tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <button type="button" className="btn btn-brand w-100 mt-3" id="welcomeStart" onClick={onStart}>
                Comenzar
              </button>

              <button type="button" className="btn btn-outline-secondary w-100 mt-2" onClick={onSkip}>
                Ahora no
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
