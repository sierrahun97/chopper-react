import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { FEATURED_PRODUCTS, HERO_BANNERS } from "../data/mockData";

export function HomePage() {
  const { addToCart } = useCart();
  const [bannerIndex, setBannerIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);

  const visibleCards = 5;
  const maxCardIndex = Math.max(FEATURED_PRODUCTS.length - visibleCards, 0);

  const trackStyle = useMemo(
    () => ({ transform: `translateX(-${cardIndex * 330}px)` }),
    [cardIndex],
  );

  return (
    <main>
      <section className="slogan-text home-hero">
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

      <section className="icon-link">
        <div className="icon-c">
          <i className="fas fa-utensils"></i>
          <span className="alimentos">Alimentos</span>
        </div>
        <div className="icon-c">
          <i className="fas fa-clinic-medical"></i>
          <span>Farmacia</span>
        </div>
        <div className="icon-c">
          <i className="fas fa-dog"></i>
          <span>Accesorios</span>
        </div>
        <div className="icon-c">
          <i className="fas fa-paw"></i>
          <span>Juguetes</span>
        </div>
        <div className="icon-c">
          <i className="fas fa-soap"></i>
          <span>Higiene</span>
        </div>
        <div className="icon-c">
          <i className="fas fa-bone"></i>
          <span>Snack</span>
        </div>
      </section>

      <section className="cards-food">
        {(
          [
            { src: "/img/Hills.png", alt: "Hills" },
            { src: "/img/GO SOLUTIONS.png", alt: "Go Solutions" },
            { src: "/img/royal_canin.png", alt: "Royal Canin" },
            { src: "/img/purina_proplan.png", alt: "Purina Pro Plan" },
          ] as { src: string; alt: string }[]
        ).map((brand) => (
          <div className="section-1__card" key={brand.alt}>
            <img src={brand.src} alt={brand.alt} width="120" height="120" />
          </div>
        ))}
      </section>

      <section className="card-subscription">
        <h2>Más vendidos</h2>
        <div className="card-carousel-container">
          <button
            className="card-carousel-btn left"
            aria-label="Anterior"
            onClick={() => setCardIndex((prev) => Math.max(prev - 1, 0))}
          >
            &#10094;
          </button>
          <div className="card-container" style={trackStyle}>
            {FEATURED_PRODUCTS.map((product) => (
              <article className="card-product-subscription" key={product.id}>
                <div className="card-product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="card-product-info">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <p className="card-product-price">
                    ${product.price.toLocaleString()}
                  </p>
                  <button
                    className="add-cart"
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      })
                    }
                  >
                    Añadir
                  </button>
                </div>
              </article>
            ))}
          </div>
          <button
            className="card-carousel-btn right"
            aria-label="Siguiente"
            onClick={() =>
              setCardIndex((prev) => Math.min(prev + 1, maxCardIndex))
            }
          >
            &#10095;
          </button>
        </div>
      </section>

      <section className="about-us">
        <img
          src="/img/veterinaria-paw.png"
          alt="about-us"
          className="img-responsive"
        />
        <div className="about-text">
          <h2>Contacta a un Veterinario experto</h2>
          <p>
            En Chopper, sabemos que la salud y el bienestar de tu mascota son
            primordiales. Por eso, te ofrecemos la oportunidad de contactar
            veterinarios expertos listos para ayudarte.
          </p>
          <Link to="/contact">
            <button className="btn-home" type="button">
              Contáctanos
            </button>
          </Link>
        </div>
      </section>

      <section className="about-us">
        <div className="about-text">
          <h2>Conoce nuestro servicio vip</h2>
          <p>
            En Chopper, queremos que tu experiencia con nosotros sea
            excepcional. Con nuestro servicio VIP acumulas puntos y obtienes
            promociones especiales.
          </p>
          <a
            href="https://wa.me/573154366839?text=Hola%20equipo%20Chopper,%20deseo%20saber%20mas%20sobre%20la%20suscripcion%20VIP"
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn-home" type="button">
              Saber más
            </button>
          </a>
        </div>
        <img
          src="/img/suscripcion_vip.png"
          alt="about-us"
          className="img-responsive"
        />
      </section>
    </main>
  );
}
