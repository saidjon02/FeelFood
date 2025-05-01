import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// Fayl yo‘llarini aniqlaymiz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configlar
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewarelar
app.use(cors());
app.use(express.json());

// === Telegramga yuborish ===
app.post("/api/sendTelegram", async (req, res) => {
  const { name, phone } = req.body;
  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  const text = `🛒 Yangi buyurtma:\n👤 Ismi: ${name}\n📞 Telefon: ${phone}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    if (!response.ok) throw new Error("Telegramga yuborilmadi");

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ success: false });
  }
});

// === React frontendni static qilib serve qilish ===
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// === Serverni ishga tushirish ===
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});
