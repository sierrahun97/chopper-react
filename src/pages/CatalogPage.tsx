import { useEffect, useMemo, useState } from "react";
import { useCart } from "../contexts/CartContext";
import {
  FEATURED_PRODUCTS,
  HERO_BANNERS,
  type Product,
} from "../data/mockData";
import {
  getAdminProducts,
  type AdminProduct,
} from "../services/productService";

function mapAdminToProduct(p: AdminProduct, index: number): Product {
  return {
    id: p.id_producto || 1000 + index,
    name: p.nombre_producto,
    category: p.categoria_producto,
    description: p.descripcion_producto,
    price: p.precio,
    image: p.url,
  };
}

export function CatalogPage() {
  const { addToCart } = useCart();
  const [bannerIndex, setBannerIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadAdminProducts() {
      try {
        const dbProducts = await getAdminProducts();
        setAdminProducts(dbProducts.map(mapAdminToProduct));
      } catch (error) {
        console.error("Error loading admin products:", error);
      }
    }
    loadAdminProducts();
  }, []);

  const visibleCards = 5;
  const maxCardIndex = Math.max(FEATURED_PRODUCTS.length - visibleCards, 0);
  const trackStyle = useMemo(
    () => ({ transform: `translateX(-${cardIndex * 330}px)` }),
    [cardIndex],
  );

  const allProducts = [...FEATURED_PRODUCTS, ...adminProducts];

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
                  {/* TODO: reemplazar banner.image con imagen real */}
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

      <h2 className="sections-titles">Nuestros productos</h2>

      <section className="catalog-section">
        <article className="catalog-products">
          {allProducts.map((item) => (
            <div className="item-catalog" key={item.id}>
              <div className="img-product">
                <img
                  src={item.image || "/img/product-img/1.png"}
                  alt="image-product"
                />
              </div>
              <div className="info-product">
                <h5>{item.name}</h5>
                <p>{item.category}</p>
                <p>{item.description}</p>
                <p id="product-price">${item.price.toLocaleString()}</p>
                <button
                  className="add-to-cart"
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                >
                  Añadir
                </button>
              </div>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
