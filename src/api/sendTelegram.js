import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/', async (req, res) => {
  console.log('📥 sendTelegramRouter payload:', req.body);
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message is required' });

  try {
    const resp = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.CHAT_ID, text: message, parse_mode: 'Markdown' }),
      }
    );
    const data = await resp.json();
    console.log('✅ Router Telegram javobi:', data);
    return res.status(resp.ok ? 200 : 400).json(data);
  } catch (err) {
    console.error('❌ Router xato:', err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;