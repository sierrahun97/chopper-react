import { useState, useEffect, type FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";
import { TRANSPARENT_PIXEL } from "../data/mockData";
import {
  type AdminProduct,
  getAdminProducts,
  addAdminProduct,
  removeAdminProduct,
  updateAdminProduct,
} from "../services/productService";
import { getSales, type SaleOrder } from "../services/salesService";

type ProductForm = {
  codigo_producto: string;
  nombre_producto: string;
  categoria_producto: string;
  precio: string;
  stock: string;
  descripcion_producto: string;
  url: string;
};

const EMPTY_FORM: ProductForm = {
  codigo_producto: "",
  nombre_producto: "",
  categoria_producto: "",
  precio: "",
  stock: "",
  descripcion_producto: "",
  url: "",
};

export function AdminPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [salesPage, setSalesPage] = useState(1);
  const salesPerPage = 7;

  useEffect(() => {
    async function loadData() {
      const dbProducts = await getAdminProducts();
      setProducts(dbProducts);
      const dbSales = await getSales();
      setSales(dbSales);
    }
    loadData();
  }, []);

  const onSubmit = async (event: FormEvent) => {
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

    const productData: AdminProduct = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
      descuento_vip: 0,
    };

    if (editingId !== null) {
      try {
        await updateAdminProduct(editingId, productData);
        setMessage("¡Producto actualizado correctamente!");
        setEditingId(null);
        const updatedProducts = await getAdminProducts();
        setProducts(updatedProducts);
        setForm(EMPTY_FORM);
        setTimeout(() => setMessage(""), 3000);
      } catch (error: any) {
        setMessage(`Error al actualizar: ${error.message}`);
      }
      return;
    } else {
      await addAdminProduct(productData);
      setMessage("¡Producto registrado correctamente!");
    }

    const updatedProducts = await getAdminProducts();
    setProducts(updatedProducts);
    setForm(EMPTY_FORM);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEditProduct = (product: AdminProduct) => {
    setEditingId(product.id_producto ?? null);
    setForm({
      codigo_producto: product.codigo_producto,
      nombre_producto: product.nombre_producto,
      categoria_producto: product.categoria_producto,
      precio: String(product.precio),
      stock: String(product.stock),
      descripcion_producto: product.descripcion_producto,
      url: product.url,
    });
    window.scrollTo({
      top: document.getElementById("productForm")?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };

  const handleDeleteProduct = async (id_producto?: number) => {
    if (!id_producto) return;
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await removeAdminProduct(id_producto);
        const updatedProducts = await getAdminProducts();
        setProducts(updatedProducts);
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  const [sales, setSales] = useState<SaleOrder[]>([]);

  const totalSales = sales.reduce((acc, order) => acc + order.total, 0);
  const soldProducts = sales.reduce(
    (acc, order) =>
      acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
    0,
  );
  const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);

  // Pagination logic
  const indexOfLastSale = salesPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = sales.slice(indexOfFirstSale, indexOfLastSale);
  const totalPages = Math.ceil(sales.length / salesPerPage);

  return (
    <main>
      <div
        id="custom-alert"
        className={`alert ${message ? "success" : "hidden"}`}
      >
        {message}
      </div>

      <section
        style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2
          style={{
            color: "#955EB7",
            borderBottom: "2px solid #955EB7",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          Ventas e Inventario
        </h2>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "1 1 250px",
              backgroundColor: "rgba(40, 167, 69, 0.1)",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              border: "1px solid #28a745",
            }}
          >
            <h6 style={{ color: "#28a745", margin: "0 0 10px 0" }}>
              Ventas Totales (Ingresos)
            </h6>
            <h3 style={{ color: "#28a745", margin: 0, fontSize: "2rem" }}>
              ${totalSales.toLocaleString()}
            </h3>
          </div>
          <div
            style={{
              flex: "1 1 250px",
              backgroundColor: "rgba(23, 162, 184, 0.1)",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              border: "1px solid #17a2b8",
            }}
          >
            <h6 style={{ color: "#17a2b8", margin: "0 0 10px 0" }}>
              Productos Vendidos
            </h6>
            <h3 style={{ color: "#17a2b8", margin: 0, fontSize: "2rem" }}>
              {soldProducts} ud.
            </h3>
          </div>
          <div
            style={{
              flex: "1 1 250px",
              backgroundColor: "rgba(255, 193, 7, 0.1)",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              border: "1px solid #ffc107",
            }}
          >
            <h6 style={{ color: "#d39e00", margin: "0 0 10px 0" }}>
              Stock en Inventario
            </h6>
            <h3 style={{ color: "#d39e00", margin: 0, fontSize: "2rem" }}>
              {totalStock} ud.
            </h3>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <h5 style={{ margin: "0 0 15px 0", color: "#333" }}>
            Historial de Ventas Recientes
          </h5>
          {sales.length === 0 ? (
            <p style={{ color: "#777", fontStyle: "italic" }}>
              Aún no hay ventas registradas.
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid #ccc",
                    backgroundColor: "#eee",
                  }}
                >
                  <th style={{ padding: "10px", color: "#555" }}>
                    Código Venta
                  </th>
                  <th style={{ padding: "10px", color: "#555" }}>Fecha</th>
                  <th style={{ padding: "10px", color: "#555" }}>Productos</th>
                  <th style={{ padding: "10px", color: "#555" }}>
                    Total Venta
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentSales.map((order) => (
                  <tr
                    key={order.id}
                    style={{
                      borderBottom: "1px solid #ddd",
                      verticalAlign: "top",
                    }}
                  >
                    <td style={{ padding: "12px", fontWeight: "bold" }}>
                      {order.codigoVenta}
                    </td>
                    <td style={{ padding: "12px" }}>{order.date}</td>
                    <td style={{ padding: "12px" }}>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: "20px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        {order.items.map((item, idx) => (
                          <li key={idx} style={{ fontSize: "0.9rem" }}>
                            <strong>{item.quantity}x</strong> {item.productName}{" "}
                            <span style={{ color: "#777" }}>
                              ({item.category})
                            </span>{" "}
                            - ${item.subtotal.toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        color: "#28a745",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      ${order.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <button
                onClick={() => setSalesPage((prev) => Math.max(prev - 1, 1))}
                disabled={salesPage === 1}
                style={{
                  padding: "5px 15px",
                  cursor: salesPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                Anterior
              </button>
              <span style={{ padding: "5px 10px" }}>
                Página {salesPage} de {totalPages}
              </span>
              <button
                onClick={() =>
                  setSalesPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={salesPage === totalPages}
                style={{
                  padding: "5px 15px",
                  cursor: salesPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="containerform" style={{ marginTop: "2rem" }}>
        <div className="form-header">
          <div className="form-header-icon">
            {editingId !== null ? "✏️" : "🐶️"}
          </div>
          <div>
            <h2>
              {editingId !== null
                ? "Editar Producto"
                : "Agregar Nuevo Producto"}
            </h2>
            <p>
              {editingId !== null
                ? "Modifica los campos que desea actualizar"
                : "Registrar un nuevo producto"}
            </p>
          </div>
        </div>

        <div className="form-body">
          <form id="productForm" onSubmit={onSubmit}>
            <div className="form-grid">
              <div className="form-section-title">Identificación</div>

              <div className="form-group">
                <label htmlFor="codeProduct">Código del Producto</label>
                <input
                  type="text"
                  id="codeProduct"
                  placeholder="Ej: PROD006"
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
                <label htmlFor="productName">Nombre del Producto</label>
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
                <label htmlFor="category">Categoría</label>
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
                  <option value="">Seleccionar categoría</option>
                  <option value="perros">Perros</option>
                  <option value="gatos">Gatos</option>
                  <option value="juguetes">Juguetes</option>
                  <option value="alimento">Alimento</option>
                </select>
              </div>

              <div className="form-section-title">Precios y Stock</div>

              <div className="form-group">
                <label htmlFor="price">Precio ($)</label>
                <input
                  type="number"
                  id="price"
                  placeholder="Ej: 15000"
                  min="0"
                  value={form.precio}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, precio: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock (unidades)</label>
                <input
                  type="number"
                  id="stock"
                  placeholder="Ej: 50"
                  min="0"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, stock: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-section-title">Imagen y Descripción</div>

              <div className="form-group form-group-full">
                <label htmlFor="image">URL de la Imagen</label>
                <input
                  type="text"
                  id="image"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={form.url}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, url: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Describe el producto brevemente..."
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
            </div>

            <div className="form-actions">
              <button className="butonform" type="submit">
                {editingId !== null ? "Guardar Cambios" : "Agregar Producto"}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  className="butonform-cancel"
                  onClick={() => {
                    setEditingId(null);
                    setForm(EMPTY_FORM);
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
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
                <p style={{ color: "#d39e00", fontWeight: "bold" }}>
                  Stock: {item.stock || 0} ud.
                </p>
                <p id="product-price">${item.precio.toLocaleString()}</p>

                {item.id_producto &&
                  ![
                    "PROD001",
                    "PROD002",
                    "PROD003",
                    "PROD004",
                    "PROD005",
                  ].includes(item.codigo_producto) && (
                    <div
                      style={{ display: "flex", gap: "8px", marginTop: "10px" }}
                    >
                      <button
                        onClick={() => handleEditProduct(item)}
                        style={{
                          backgroundColor: "#955EB7",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(item.id_producto)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
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
