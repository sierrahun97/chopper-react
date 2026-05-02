import { useCart } from "../contexts/CartContext";
import { TRANSPARENT_PIXEL } from "../data/mockData";

export function CartModal() {
  const { items, isOpen, closeCart, totalValue, addOne, removeOne } = useCart();

  return (
    <div id="cart-modal" className={`modal ${isOpen ? "show" : ""}`}>
      <div className="modal-content">
        <div className="close-cart">
          <p className="close" onClick={closeCart}>
            &times;
          </p>
        </div>
        <h2>Tu Carrito</h2>
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
        <button id="checkout-btn" className="btn-pay" type="button">
          Pagar
        </button>
      </div>
    </div>
  );
}
