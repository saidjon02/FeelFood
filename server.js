import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Compute __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Telegram order endpoint
app.post('/api/sendTelegram', async (req, res) => {
  const { name, phone } = req.body;
  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  const text = `🛒 Yangi buyurtma:\n👤 Ismi: ${name}\n📞 Telefon: ${phone}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
    if (!response.ok) throw new Error('Telegramga yuborilmadi');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Xatolik:', error);
    return res.status(500).json({ success: false });
  }
});

// Serve static React files from dist
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});
