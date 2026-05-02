/**
 * productService.ts
 * Gestiona la persistencia de productos (admin) en localStorage.
 * Requerimiento tarea.md: carpeta services/ para datos simulados (Mocks).
 */

export type AdminProduct = {
  codigo_producto: string;
  nombre_producto: string;
  categoria_producto: string;
  descripcion_producto: string;
  precio: number;
  stock: number;
  descuento_vip: number;
  url: string;
};

const PRODUCTS_KEY = "listaproductos";

/** Lee todos los productos guardados por el administrador */
export function getAdminProducts(): AdminProduct[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    return raw ? (JSON.parse(raw) as AdminProduct[]) : [];
  } catch {
    return [];
  }
}

/** Persiste la lista completa de productos */
export function saveAdminProducts(products: AdminProduct[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

/** Agrega un nuevo producto a la lista */
export function addAdminProduct(product: AdminProduct): AdminProduct[] {
  const current = getAdminProducts();
  const next = [...current, product];
  saveAdminProducts(next);
  return next;
}

/** Elimina un producto por código */
export function removeAdminProduct(codigo: string): AdminProduct[] {
  const next = getAdminProducts().filter((p) => p.codigo_producto !== codigo);
  saveAdminProducts(next);
  return next;
}
