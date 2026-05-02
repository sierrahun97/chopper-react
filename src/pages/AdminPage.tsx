import { useState, type FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { TRANSPARENT_PIXEL } from "../data/mockData";
import {
  type AdminProduct,
  getAdminProducts,
  addAdminProduct,
} from "../services/productService";

type ProductForm = {
  codigo_producto: string;
  nombre_producto: string;
  categoria_producto: string;
  precio: string;
  stock: string;
  descuento_vip: string;
  descripcion_producto: string;
  url: string;
};

const EMPTY_FORM: ProductForm = {
  codigo_producto: "",
  nombre_producto: "",
  categoria_producto: "",
  precio: "",
  stock: "",
  descuento_vip: "",
  descripcion_producto: "",
  url: "",
};

export function AdminPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<AdminProduct[]>(() =>
    getAdminProducts(),
  );
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      !form.nombre_producto ||
      !form.categoria_producto ||
      !form.precio ||
      !form.url ||
      !form.descripcion_producto
    ) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    const newProduct: AdminProduct = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
      descuento_vip: Number(form.descuento_vip),
    };

    setProducts(addAdminProduct(newProduct));
    setMessage("¡Producto registrado correctamente!");
    setForm(EMPTY_FORM);
  };

  return (
    <main>
      <div
        id="custom-alert"
        className={`alert ${message ? "success" : "hidden"}`}
      >
        {message}
      </div>
      <div className="containerform">
        <h2>Agregar Nuevo Producto</h2>
        <form id="productForm" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="codeProduct">Código del Producto:</label>
            <input
              type="text"
              id="codeProduct"
              value={form.codigo_producto}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  codigo_producto: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="productName">Nombre del Producto:</label>
            <input
              type="text"
              id="productName"
              value={form.nombre_producto}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  nombre_producto: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoría:</label>
            <select
              id="category"
              value={form.categoria_producto}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  categoria_producto: e.target.value,
                }))
              }
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="perros">Perros</option>
              <option value="gatos">Gatos</option>
              <option value="juguetes">Juguetes</option>
              <option value="alimento">Alimento</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              value={form.precio}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, precio: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              value={form.stock}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, stock: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="vip-discount">Descuento:</label>
            <input
              type="number"
              id="vip-discount"
              value={form.descuento_vip}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, descuento_vip: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">URL de la imagen:</label>
            <input
              type="text"
              id="image"
              value={form.url}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, url: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              rows={4}
              value={form.descripcion_producto}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  descripcion_producto: e.target.value,
                }))
              }
              required
            ></textarea>
          </div>

          <button className="butonform" type="submit">
            Agregar Producto
          </button>
        </form>
      </div>

      <section>
        <article className="catalog-products">
          {products.map((item, idx) => (
            <div
              className="item-catalog"
              key={`${item.codigo_producto}-${idx}`}
            >
              <div className="img-product">
                <img src={item.url || TRANSPARENT_PIXEL} alt="image-product" />
              </div>
              <div className="info-product">
                <h5>{item.nombre_producto}</h5>
                <p>{item.categoria_producto}</p>
                <p>{item.descripcion_producto}</p>
                <p id="product-price">${item.precio.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </article>
      </section>

      {user?.rol !== "ADMIN" && (
        <p style={{ textAlign: "center", color: "#955EB7", fontWeight: 600 }}>
          Esta sección es privada y requiere sesión.
        </p>
      )}
    </main>
  );
}
