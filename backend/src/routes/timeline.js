const express = require('express');
const router = express.Router();

// Get timeline based on location and election type
router.get('/', async (req, res) => {
  try {
    const { location, type } = req.query;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    // Mock timeline response
    const timeline = [
      { id: 1, date: '2026-09-01', event: 'Voter Registration Deadline', description: 'Last day to register to vote in ' + location },
      { id: 2, date: '2026-10-15', event: 'Early Voting Begins', description: 'Early voting locations open across ' + location },
      { id: 3, date: '2026-11-03', event: 'Election Day', description: 'Go out and vote!' }
    ];

    res.json({ location, type: type || 'General', timeline });
  } catch (error) {
    console.error('Timeline API Error:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
});

module.exports = router;
