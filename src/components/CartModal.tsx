import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { TRANSPARENT_PIXEL } from "../data/mockData";

export function CartModal() {
  const { items, isOpen, closeCart, totalValue, addOne, removeOne } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <div id="cart-modal" className={`modal ${isOpen ? "show" : ""}`}>
      <div className="modal-content" style={{ position: "relative" }}>
        <button
          className="close-cart-btn"
          onClick={closeCart}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "#f1f1f1",
            border: "none",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            color: "#333",
            zIndex: 3010,
          }}
          title="Cerrar carrito"
        >
          &times;
        </button>
        <h2 style={{ marginTop: "10px" }}>Tu Carrito</h2>
        <div id="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart-message">
              Tu carrito está vacío. Agrega productos para verlos aquí.
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-content">
                  <div className="cart-item-image">
                    <img
                      src={item.image || TRANSPARENT_PIXEL}
                      alt="img-producto"
                    />
                  </div>
                  <div className="product-cart-info">
                    <h3>{item.name}</h3>
                    <p>Precio: ${item.price.toLocaleString()}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <button className="btn-add" onClick={() => addOne(item.id)}>
                      Agregar
                    </button>
                    <button
                      className="btn-remove"
                      onClick={() => removeOne(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <p id="cart-total">Total: ${totalValue.toLocaleString()}</p>
        <button
          id="checkout-btn"
          className="btn-pay"
          type="button"
          onClick={handleCheckout}
        >
          Pagar
        </button>
      </div>
    </div>
  );
}
