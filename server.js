// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 8000;

// React build joylashuvi uchun
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// 1) CREATE PAYMENT INTENT
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount < 50) {
    return res.status(400).json({ error: 'Minimal miqdor $0.50 bo‘lishi kerak' });
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// 2) SEND TELEGRAM MESSAGE
app.post('/api/orders/', async (req, res) => {
  const { name, phone, address, items, subtotal, delivery_fee, total } = req.body;
  if (!name || !phone || !address || !items) {
    return res.status(400).json({ success: false, error: 'Required fields missing' });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  const message = [
    '🛒 *YANGI BUYURTMA*',
    `👤 Ism: ${name}`,
    `📞 Tel: ${phone}`,
    `📍 Manzil: ${address}`,
    '',
    '*Taomlar:*',
    ...items.map((i) => `• ${i.name} x${i.quantity}`),
    '',
    `💲 Subtotal: ${subtotal}`,
    `🚚 Delivery Fee: ${delivery_fee}`,
    `*Total:* ${total}`,
  ].join('\n');

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' }),
    });
    const tgData = await tgRes.json();
    if (!tgRes.ok || !tgData.ok) {
      return res.status(500).json({ success: false, ...tgData });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 3) React build’ini serve qilish (production uchun)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
