export type SaleOrderItem = {
  productName: string;
  category: string;
  quantity: number;
  subtotal: number;
};

export type SaleOrder = {
  id: string;
  codigoVenta: string;
  date: string;
  total: number;
  items: SaleOrderItem[];
};

const API_URL = "http://localhost:8080";

export async function getSales(): Promise<SaleOrder[]> {
  try {
    const response = await fetch(`${API_URL}/venta/traer`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    // Map backend Venta to SaleOrder
    const orders: SaleOrder[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.forEach((venta: any) => {
      const dateStr = venta.fecha
        ? new Date(venta.fecha).toLocaleDateString("es-ES")
        : new Date().toLocaleDateString("es-ES");

      const orderItems: SaleOrderItem[] = [];
      if (venta.detallesVenta && venta.detallesVenta.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        venta.detallesVenta.forEach((detalle: any) => {
          orderItems.push({
            productName:
              detalle.producto?.nombre_producto || "Producto Desconocido",
            category: detalle.producto?.categoria_producto || "General",
            quantity: detalle.cantidad || 0,
            subtotal: detalle.subtotal || 0,
          });
        });
      }

      orders.push({
        id: venta.id_venta?.toString() || crypto.randomUUID(),
        codigoVenta: venta.codigo_venta || "VTA-Gen",
        date: dateStr,
        total: venta.total || 0,
        items: orderItems,
      });
    });

    return orders.reverse();
  } catch (error) {
    console.error(
      "Error fetching sales from backend, falling back to local storage:",
      error,
    );
    const raw = localStorage.getItem("listaventas_ordenes");
    return raw ? (JSON.parse(raw) as SaleOrder[]) : [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addSales(cartItems: any[]): Promise<void> {
  const currentDate = new Date().toISOString();
  const codigo = `VTA-${Date.now()}`;

  // Format matching CrearVentaDto
  const dto = {
    venta: {
      codigo_venta: codigo,
      fecha: currentDate,
      total: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      ),
    },
    productos: cartItems.map((item) => ({ id_producto: item.id || 1 })),
    cantidades: cartItems.map((item) => item.quantity || 1),
  };

  try {
    const response = await fetch(`${API_URL}/detalle-venta/crear/1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    if (!response.ok) throw new Error("Error creating sale in backend");
  } catch (error) {
    console.error(
      "Error saving sale in backend, saving to local storage:",
      error,
    );
    // Fallback: save to local storage as SaleOrder
    const currentOrdersStr = localStorage.getItem("listaventas_ordenes");
    const currentOrders: SaleOrder[] = currentOrdersStr
      ? JSON.parse(currentOrdersStr)
      : [];

    const newOrder: SaleOrder = {
      id: crypto.randomUUID(),
      codigoVenta: codigo,
      date: new Date().toLocaleDateString("es-ES"),
      total: dto.venta.total,
      items: cartItems.map((item) => ({
        productName: item.name,
        category: item.category || "General",
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
    };

    localStorage.setItem(
      "listaventas_ordenes",
      JSON.stringify([newOrder, ...currentOrders]),
    );
  }
}
