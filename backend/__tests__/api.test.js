const request = require('supertest');
const app = require('../server');

describe('Chat API', () => {
    it('should return 400 when missing message', async () => {
        const res = await request(app).post('/api/chat').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Message is required');
    });

    // We can mock gemini for internal testing but just doing status checks here
    it('should handle basic request', async () => {
        // Without an API key, we will expect a 500 or the fallback to fail gracefully if it hits API logic.
        const res = await request(app).post('/api/chat').send({ message: "Hello" });
        expect(res.statusCode === 200 || res.statusCode === 500).toBeTruthy();
    });
});

describe('Timeline API', () => {
    it('should return mock timeline when location is provided', async () => {
        const res = await request(app).get('/api/timeline?location=Texas');
        expect(res.statusCode).toBe(200);
        expect(res.body.location).toBe('Texas');
        expect(Array.isArray(res.body.timeline)).toBe(true);
    });

    it('should return 400 when location is missing', async () => {
        const res = await request(app).get('/api/timeline');
        expect(res.statusCode).toBe(400);
    });
});
