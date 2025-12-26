import express from "express";
import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();


const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/chat
router.post('/chat', async (req, res) => {
  try {
    console.log(req.body)
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
    });

    return res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    if (error.code === 'insufficient_quota') {
      res.status(429).json({
        error: "You’ve run out of OpenAI credits. Please upgrade your plan or add billing details."
      });
    } else {
      console.log(error)
      res.status(500).json({ error: "Something went wrong with the AI service." });
    }
  }
});

export default router;
