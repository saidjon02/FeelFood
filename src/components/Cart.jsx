// src/components/Cart.jsx
import React, { useState, useContext } from 'react';
import { CartContext } from '../components/Context';
import ScrollToTop from './ScrollToTop';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import promo from '../../imgs/promo.png';

function Cart() {
  const { state: cartItems, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 10000;
  const total = subtotal + delivery;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.error('Savatcha bo‘sh');

    setLoading(true);

    try {
      const orderRes = await fetch('https://chustfeelfoodbackend.onrender.com/api/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          address,
          items: cartItems.map((item) => ({ name: item.name, quantity: item.quantity })),
          subtotal,
          delivery_fee: delivery,
          total,
        }),
      });
      if (!orderRes.ok) throw new Error('Buyurtma yuborishda xatolik');

      dispatch({ type: 'CLEAR' });
      toast.success('Buyurtma muvaffaqiyatli yuborildi!');
      navigate('/success');
    } catch (err) {
      toast.error('Xatolik: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="wrap container">
      <ScrollToTop />
      <h2 className="cart-title">Sizning savatchangiz</h2>
      <div className="cart-row-first">
        <div className="cart">
          {cartItems.length === 0 ? (
            <div className="buy">
              <h2 className="cart-title-not">Hech narsa tanlanmadi</h2>
              <Link to="/">
                <button className="our-product">Mahsulotlar</button>
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart" key={item.id}>
                <div className="cart-row">
                  <div className="cart-row-left">
                    <img src={item.get_image} alt={item.name} />
                  </div>
                  <div className="cart-row-right">
                    <h2 className="cart-item-name">{item.name}</h2>
                    <p className="item-price">{item.price.toLocaleString()} <span className="cart-uzs">UZS</span></p>
                    <div className="cart-price-row">
                      <div className="cart-row-quantity">
                        <button onClick={() => dispatch({ type: 'DECREASE', payload: item })}>
                          <i className="bx bx-minus" />
                        </button>
                        <p className="quantity-item">{item.quantity}</p>
                        <button onClick={() => dispatch({ type: 'INCREASE', payload: item })}>
                          <i className="bx bx-plus" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => dispatch({ type: 'REMOVE', payload: item })}>
                  <i className="bx bx-x" />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="order">
          <h2 className="order-title">Buyurtma xulosasi</h2>
          <div className="order-row">
            <p className="order-text">O'rtacha summa</p>
            <p className="order-price">{subtotal.toLocaleString()} <span className="cart-uzs">UZS</span></p>
          </div>
          <div className="order-row">
            <p className="order-text">Yetkazib berish</p>
            <p className="order-price">{delivery.toLocaleString()} <span className="cart-uzs">UZS</span></p>
          </div>
          <div className="arrow2" />

          <form onSubmit={handleSubmit}>
            <h2 className="yetkaz">Yetkazib berish ma'lumotlari</h2>
            <input
              type="text"
              placeholder="Ismingiz"
              value={name}
              className="inputs"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              className="inputs"
              placeholder="Telefon raqamingiz"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <textarea
              placeholder="Yetkazib berish manzili"
              value={address}
              className="inputs"
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <div className="order-summary">
              <p>
                <strong className="order-row order-text total">
                  Jami summa <span className="order-price">{total.toLocaleString()} <span className="cart-uzs">UZS</span></span>
                </strong>
              </p>
            </div>

            <button type="submit" className='checkout-btn' disabled={loading}>
              {loading ? 'Buyurtma yuborilmoqda...' : 'Buyurtma berish'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cart;
