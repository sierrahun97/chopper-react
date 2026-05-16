export type AdminProduct = {
  id_producto?: number;
  codigo_producto: string;
  nombre_producto: string;
  categoria_producto: string;
  descripcion_producto: string;
  precio: number;
  stock: number;
  descuento_vip: number;
  url: string;
};

const API_URL = "http://localhost:8080";

/** Lee todos los productos guardados (ahora desde backend) */
export async function getAdminProducts(): Promise<AdminProduct[]> {
  try {
    const response = await fetch(`${API_URL}/producto/traer`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data as AdminProduct[];
  } catch (error) {
    console.error(
      "Error fetching products from backend, falling back to local storage:",
      error,
    );
    const raw = localStorage.getItem("listaproductos");
    return raw ? (JSON.parse(raw) as AdminProduct[]) : [];
  }
}

/** Agrega un nuevo producto a la lista */
export async function addAdminProduct(product: AdminProduct): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/producto/crear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Error creating product in backend");
  } catch (error) {
    console.error(
      "Error saving product in backend, falling back to local storage:",
      error,
    );
    const currentStr = localStorage.getItem("listaproductos");
    const current = currentStr ? JSON.parse(currentStr) : [];
    localStorage.setItem(
      "listaproductos",
      JSON.stringify([...current, product]),
    );
  }
}

/** Actualiza un producto existente por ID */
export async function updateAdminProduct(
  id: number,
  product: AdminProduct,
): Promise<void> {
  const params = new URLSearchParams({
    codigo_producto: product.codigo_producto,
    nombre_producto: product.nombre_producto,
    precio: String(product.precio),
    categoria_producto: product.categoria_producto,
    descripcion_producto: product.descripcion_producto,
    stock: String(product.stock),
    descuento_vip: String(product.descuento_vip),
    url: product.url,
  });

  try {
    const response = await fetch(
      `${API_URL}/producto/editar/${id}?${params.toString()}`,
      { method: "PUT" },
    );
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(
        `Error ${response.status}: ${text || "No se pudo actualizar el producto"}`,
      );
    }
  } catch (error) {
    // Solo usar localStorage si el backend está completamente inaccesible (error de red)
    if (error instanceof TypeError) {
      const currentStr = localStorage.getItem("listaproductos");
      const current: AdminProduct[] = currentStr ? JSON.parse(currentStr) : [];
      const updated = current.map((p) =>
        p.id_producto === id ? { ...product, id_producto: id } : p,
      );
      localStorage.setItem("listaproductos", JSON.stringify(updated));
      return;
    }
    throw error;
  }
}

/** Elimina un producto por ID */
export async function removeAdminProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/producto/borrar/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(
      "No se pudo eliminar el producto (puede tener ventas asociadas).",
    );
  }
}
