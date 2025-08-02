import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CartContext } from '../components/Context';

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { state: cartItems, dispatch } = useContext(CartContext);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 5;
  const total = parseFloat((subtotal + delivery).toFixed(2));
  const amount = Math.round(total * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return toast.error('Stripe yuklanmadi');
    if (cartItems.length === 0) return toast.error('Savat bosh');
    if (amount < 50) return toast.error('Minimum tolov miqdori $0.50 bolishi kerak');

    try {
      const res = await fetch(
        'https://chustfeelfoodbackend.onrender.com/api/create-payment-intent/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amount }),
        }
      );

      const data = await res.json();
      if (!res.ok || !data.clientSecret) throw new Error(data.error || 'Payment yaratilmadi');

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name },
        },
      });

      if (result.error) throw new Error(result.error.message);
      if (result.paymentIntent.status !== 'succeeded') {
        throw new Error(
          'Tolov muvaffaqiyatsiz yoki yarimta qoldi: ' + result.paymentIntent.status
        );
      }

      const telegramRes = await fetch('https://chustfeelfoodbackend.onrender.com/api/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          address,
          items: cartItems.map((item) => ({
            name: item.name,
            quantity: item.quantity,
          })),
          subtotal: subtotal.toFixed(2),
          delivery_fee: delivery,
          total: total.toFixed(2),
        }),
      });

      if (!telegramRes.ok) throw new Error('Telegramga yuborishda xatolik');

      dispatch({ type: 'CLEAR' });
      toast.success('Tolov va buyurtma muvaffaqiyatli!');
      navigate('/success');
    } catch (err) {
      toast.error('Xatolik: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout container wrap">
      <h2>Tolov malumotlari</h2>

      <input
        type="text"
        placeholder="Ismingiz"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Telefon raqamingiz"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <textarea
        placeholder="Yetkazib berish manzili"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <div className="order-summary">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Delivery: ${delivery}</p>
        <p>
          <strong>Total: ${total.toFixed(2)}</strong>
        </p>
      </div>

      <label>Karta raqamlaringiz:</label>
      <div className="card-element-wrapper">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#000',
                fontFamily: 'Arial, sans-serif',
                '::placeholder': {
                  color: '#888',
                },
              },
              invalid: {
                color: '#e5424d',
                iconColor: '#e5424d',
              },
            },
          }}
        />
      </div>

      <button type="submit" disabled={!stripe}>
        Tolov qilish - ${total}
      </button>
    </form>
  );
};

export default CheckOut;
