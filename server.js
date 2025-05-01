// server.js (project root)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Telegram API endpoint accepts `message` string
app.post('/api/sendTelegram', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message is required' });

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' })
    });
    const data = await response.json();
    return res.status(response.ok ? 200 : 400).json(data);
  } catch (err) {
    console.error('Telegram xato:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Serve React build
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server port ${PORT} ishga tushdi`));

