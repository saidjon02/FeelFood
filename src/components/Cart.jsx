// src/components/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from './Context';
import ScrollToTop from './ScrollToTop';
import { Link } from 'react-router-dom';
import promo from '../../imgs/promo.png';

function Cart() {
  const Globalstate = useContext(CartContext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;

  return (
    <div className="wrap container">
      <ScrollToTop />
      <h2 className="cart-title">Your cart</h2>
      <div className="cart-row-first">
        <div className="cart">
          {state.length === 0 ? (
            <div className="buy">
              <h2 className="cart-title-not">You haven't selected anything yet</h2>
              <Link to={'/'}>
                <button className="our-product">Our products</button>
              </Link>
            </div>
          ) : (
            state.map((item) => (
              <div className="cart" key={item.id}>
                <div className="cart-row" key={item.id}>
                  <div className="cart-row-left">
                    <img src={item.img_url} alt={item.name} />
                  </div>
                  <div className="cart-row-right">
                    <h2 className="cart-item-name">{item.name}</h2>
                    <p className="item-price">{item.price} so'm</p>
                    <div className="cart-price-row">
                      <div className="cart-row-quantity">
                        <button onClick={() => dispatch({ type: 'DECREASE', payload: item })}>
                          <i className="bx bx-minus"></i>
                        </button>
                        <p className="quantity-item">{item.quantity}</p>
                        <button onClick={() => dispatch({ type: 'INCREASE', payload: item })}>
                          <i className="bx bx-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => dispatch({ type: 'REMOVE', payload: item })}>
                  <i className="bx bx-x"></i>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="order">
          <h2 className="oder-title">Order Summary</h2>
          <div className="oder-row">
            <p className="oder-text">Subtotal</p>
            <p className="oder-price">
              ${state.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </p>
          </div>
          <div className="oder-row">
            <p className="oder-text">Delivery Fee</p>
            <p className="oder-price">$5</p>
          </div>
          <div className="arrow2"></div>
          <div className="oder-row">
            <p className="oder-text">Total</p>
            <p className="oder-price">
              ${state.reduce((acc, item) => acc + item.price * item.quantity, 0) + 5}
            </p>
          </div>
          <div className="oder-row2">
            <div className="input-box-cart">
              <i className="bx bx-purchase-tag"></i>
              <input
                type="text"
                placeholder="Add promo code"
                className="oder-inp"
              />
            </div>
            <Link to={'/checkout'}>
              <button className="oder-btn2">Apply</button>
            </Link>
          </div>
          <Link to={'/checkout'}>
            <button className="oder-btn">
              Go to Checkout <i className="bx bx-right-arrow-alt"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
