import React from 'react';
import './CartGame.css';

const CartGame = ({ cart, updateCartItemQuantity }) => {
  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 0) {
      updateCartItemQuantity(id, quantity);
    }
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateOrderTotal = () => {
    return cart.reduce((total, item) => {
      return total + calculateItemTotal(item);
    }, 0);
  };

  const handleRemoveFromCart = (id) => {
    updateCartItemQuantity(id, 0);
  };

  return (
    <div className="cart">
      <h3>Košík</h3>
      {cart.length === 0 ? (
        <p>Košík je prázdný</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            item.quantity > 0 && (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.name}</strong><br />
                  Cena/ks: {item.price} Kč<br />
                  Celkem: {calculateItemTotal(item)} Kč
                </div>
                <div>
                 
                  <button
                    className="btn btn-sm btn-danger p-2 me-2"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="form-control d-inline-block"
                    style={{ width: '60px', marginRight: '10px' }}
                  />
                  <button
                    className="btn btn-sm btn-success p-2 me-2 "
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-danger p-2"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </li>
            )
          ))}
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <strong>Celková cena objednávky:</strong>
            <span>{calculateOrderTotal()} Kč</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CartGame;
