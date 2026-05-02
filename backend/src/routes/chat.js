const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../services/gemini');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const aiResponse = await getChatResponse(message);
    
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

module.exports = router;
