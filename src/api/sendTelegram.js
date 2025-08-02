import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// POST /api/sendTelegram
router.post('/sendTelegram', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );

    const data = await response.json();
    if (data.ok) {
      return res.json({ success: true });
    }
    return res.status(500).json({ error: data.description || 'Telegram error' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
