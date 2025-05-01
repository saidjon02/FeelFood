import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// .env faylini yuklaymiz
dotenv.config();

// __dirname workaround (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express ilovasini ishga tushiramiz
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewarelar
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Telegramga xabar yuborish endpointi
app.post('https://feelfood.onrender.com/api/send-telegram', async (req, res) => {
  console.log('📥 https://feelfood.onrender.com/api/send-telegram payload:', req.body);
  const { message } = req.body;
  if (!message) {
    console.warn('❗ message yo‘q — 400');
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }
    );
    console.log('✅ Telegram javobi:', response.data);
    return res.status(response.status).json(response.data);

  } catch (err) {
    const telegramError = err.response?.data || err.message;
    console.error('❌ Telegramga xato:', telegramError);
    const status = err.response?.status || 500;
    return res.status(status).json({ error: telegramError });
  }
});

// React build papkasini serve
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Serverni tinglash
app.listen(PORT, () => {
  console.log(`✅ Server port ${PORT}-da ishlayapti`);
});