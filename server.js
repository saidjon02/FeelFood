// server.js
import path from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// __dirname workaround (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve React build
app.use(express.static(path.join(__dirname, 'build')));

// Telegramga xabar yuborish endpointi
app.post('/api/send-telegram', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }
    );
    res.json({ status: 'ok', telegramResponse: response.data });
  } catch (err) {
    console.error('Telegram xatosi:', err.message);
    res.status(500).json({ error: 'Telegramga yuborishda xatolik' });
  }
});

// Barcha boshqa yo‘llar uchun React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server https://feelfood.onrender.com da ${PORT}-portda ishlayapti`);
});
