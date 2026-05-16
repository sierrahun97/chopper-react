import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { TRANSPARENT_PIXEL } from "../data/mockData";
import { useState } from "react";
import { addSales } from "../services/salesService";

export function CheckoutPage() {
  const { items, totalValue, clearCart } = useCart();
  const navigate = useNavigate();
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const handleFinishPurchase = async () => {
    await addSales(items);

    setPurchaseCompleted(true);
    clearCart();
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  };

  if (purchaseCompleted) {
    return (
      <main
        style={{ padding: "4rem 2rem", textAlign: "center", minHeight: "60vh" }}
      >
        <h2
          style={{ color: "#955EB7", fontSize: "2rem", marginBottom: "1rem" }}
        >
          ¡Gracias por tu compra!
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          Tu pedido ha sido procesado con éxito. Redirigiendo a la página
          principal...
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        minHeight: "70vh",
      }}
    >
      <h1
        style={{
          color: "#955EB7",
          borderBottom: "2px solid #955EB7",
          paddingBottom: "10px",
          marginBottom: "20px",
        }}
      >
        Checkout
      </h1>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h3>No hay productos en tuc carrito</h3>
          <button
            onClick={() => navigate("/catalog")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#955EB7",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Volver al Catálogo
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginBottom: "2rem",
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <img
                    src={item.image || TRANSPARENT_PIXEL}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <div>
                    <h3
                      style={{
                        margin: "0 0 5px 0",
                        color: "#333",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p style={{ margin: 0, color: "#777", fontSize: "0.9rem" }}>
                      Cant: {item.quantity} x ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 style={{ margin: 0, color: "#955EB7" }}>
                    ${(item.price * item.quantity).toLocaleString()}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#666",
                  margin: "0 0 5px 0",
                }}
              >
                Total a pagar
              </p>
              <h2 style={{ margin: 0, color: "#333", fontSize: "2rem" }}>
                ${totalValue.toLocaleString()}
              </h2>
            </div>

            <button
              onClick={handleFinishPurchase}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                padding: "12px 25px",
                border: "none",
                borderRadius: "5px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              Comprar
            </button>
          </div>
        </>
      )}
    </main>
  );
}
