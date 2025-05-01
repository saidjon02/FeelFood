import React, { useContext, useState } from 'react';
import { CartContext } from './Context';

const API_URL = import.meta.env.VITE_API_URL;
console.log('API_URL:', API_URL);
function CheckOut() {
  const { state, dispatch } = useContext(CartContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const subtotal = state.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const list = state.map(i => `• ${i.name} x ${i.quantity}`).join('\n');
    const message = [
      '🛒 *Yangi Zakaz*',
      `👤 Ism: ${name}`,
      `📱 Tel: ${phone}`,
      `📍 Manzil: ${address}`,
      '',
      '*Mahsulotlar:*',
      list,
      '',
      `💲 Subtotal: $${subtotal.toFixed(2)}`,
      `🚚 Delivery: $${deliveryFee}`,
      `*Total:* $${total.toFixed(2)}`
    ].join('\n');

    try {
      const resp = await fetch(`https://feelfood.onrender.com/api/send-telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!resp.ok) throw new Error(`Server xatolik: ${resp.status}`);
      const data = await resp.json();
      console.log('🚀 Telegram javobi:', data);

      dispatch({ type: 'CLEAR' });
      setSubmitted(true);
    } catch (err) {
      console.error('API xatolik:', err);
    }
  };

  if (submitted) {
    return <div className="checkout container wrap"><h2>✅ Rahmat, zakazingiz qabul qilindi!</h2></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="checkout container wrap">
      <h2>Yetkazib berish ma’lumotlari</h2>
      <label>Ism:<input value={name} onChange={e => setName(e.target.value)} placeholder="Ismingizni yozing" required /></label>
      <label>Telefon:<input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+998 xx xxx xx xx" required /></label>
      <label>Manzil:<input value={address} onChange={e => setAddress(e.target.value)} placeholder="Manzilni yozing" required /></label>
      <div>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Delivery: ${deliveryFee}</p>
        <p><strong>Total: ${total.toFixed(2)}</strong></p>
      </div>
      <button type="submit">Buyurtmani Tasdiqlash</button>
    </form>
  );
}

export default CheckOut;