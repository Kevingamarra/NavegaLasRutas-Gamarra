export default function InfoSection() {
 return (
 <section className="container-fluid py-5 info-section border-top">
 <div className="container">
 <div className="row g-4">
 <div className="col-12 col-lg-6 text-lg-start">
 <h2 className="section-title">
 Encontrá Natura
 </h2>
 <p className="mb-3 animate-fadeUp" style={{ animationDelay: ".06s" }}>
 Podés comprar con Consultoras de Belleza, en Tiendas, en el sitio naturacosmeticos.com.ar,
 solicitar regalos corporativos o usar la app.
 </p>
 <h3 className="h5 animate-fadeUp" style={{ animationDelay: ".12s" }}>
 Alertas y retiro de productos
 </h3>
 <p className="mb-0 animate-fadeUp" style={{ animationDelay: ".18s" }}>
 Al día de la última comunicación pública, no hay productos bajo procesos de Alerta y Retiro.
 </p>
 </div>

 <div className="col-12 col-lg-6 text-lg-end">
 <h2 className="section-title">
 Soporte
 </h2>
 <h3 className="h5 animate-fadeUp" style={{ animationDelay: ".06s" }}>
 Políticas de privacidad
 </h3>
 <p className="mb-3 animate-fadeUp" style={{ animationDelay: ".12s" }}>
 Natura &amp;Co informa cómo recopila, usa y protege datos personales; el aviso y la política pueden
 actualizarse periódicamente.
 </p>
 <h3 className="h5 animate-fadeUp" style={{ animationDelay: ".18s" }}>
 Política de cookies
 </h3>
 <p className="mb-0 animate-fadeUp" style={{ animationDelay: ".24s" }}>
 Se describen categorías de cookies y tecnologías similares; cuando son datos personales se tratan
 conforme la política de privacidad.
 </p>
 </div>
 </div>

 <div className="text-center medios-de-pago mt-5">
 <h2 className="section-title">
 Medios de pago
 </h2>
 <img
 src={`${import.meta.env.BASE_URL}img/medios-de-pago.png`}
 alt="Medios de pago aceptados"
 className="img-fluid pay-logos animate-fadeUp"
 style={{ animationDelay: ".06s" }}
 loading="lazy"
 decoding="async"
 />
 <p className="small text-muted animate-fadeUp" style={{ animationDelay: ".12s" }}>
 Aceptamos tarjetas de crédito, débito y medios electrónicos a través de Mercado Pago.
 </p>
 </div>
 </div>
 </section>
 );
}
