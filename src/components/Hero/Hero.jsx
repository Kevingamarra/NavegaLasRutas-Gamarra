export default function Hero() {
  return (
    <section className="hero-video position-relative mb-4">
      <div className="container-fluid p-0">
        <div className="video-wrap overlay-on">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/img/poster.jpg"
            aria-label="Video de portada"
          >
            <source
              src="/assets/video/Video-principal.mp4"
              type="video/mp4"
            />
            Tu navegador no soporta videos HTML5.
          </video>
        </div>
      </div>
    </section>
  );
}
