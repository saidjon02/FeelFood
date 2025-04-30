// server.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sendTelegramRouter from './src/api/sendTelegram.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/send-telegram', sendTelegramRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlayapti`));
