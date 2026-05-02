import { useState } from "react";
import { HERO_BANNERS } from "../data/mockData";

export function AboutPage() {
  const [bannerIndex, setBannerIndex] = useState(0);

  return (
    <main>
      <section className="slogan-text home-hero text-center p-4">
        <h1>Tienda para mascotas Chopper</h1>
        <p>
          En Chopper, creemos que cada mordisco, ronroneo y salto de alegría
          merece el mejor cuidado y cariño.
        </p>
      </section>

      <section id="carousel">
        <div className="carousel-container">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              {HERO_BANNERS.map((banner, idx) => (
                <div
                  className={`carousel-item ${idx === bannerIndex ? "active" : ""}`}
                  key={banner.id}
                >
                  <img
                    src={banner.image}
                    className="d-block w-100"
                    alt={banner.alt}
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              onClick={() =>
                setBannerIndex(
                  (prev) =>
                    (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length,
                )
              }
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              onClick={() =>
                setBannerIndex((prev) => (prev + 1) % HERO_BANNERS.length)
              }
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section className="about-us">
        <img src="/img/cat-us.png" alt="about-us" className="img-responsive" />
        <div className="about-text">
          <h2>Sobre nosotros</h2>
          <p>
            En los últimos años, nuestras mascotas han ganado un lugar muy
            especial en nuestros corazones y hogares. Por eso creamos Chopper,
            una tienda que entiende que cada mascota merece ser consentida y
            amada.
          </p>
        </div>
      </section>
    </main>
  );
}
