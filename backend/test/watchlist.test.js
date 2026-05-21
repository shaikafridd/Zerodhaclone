const request = require('supertest');
const app = require('../index');
const { UserModel } = require('../models/UserModel');
const bcrypt = require('bcrypt');

jest.mock('yahoo-finance2', () => {
    const search = jest.fn();
    const quote = jest.fn();
    return {
        default: jest.fn().mockImplementation(() => {
            return {
                search,
                quote
            };
        }),
        _mockSearch: search,
        _mockQuote: quote
    };
});

const { _mockSearch: mockSearch, _mockQuote: mockQuote } = require('yahoo-finance2');

describe('Watchlist Endpoints', () => {
    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
    };
    let cookie;
    let userId;

    beforeEach(async () => {
        await UserModel.deleteMany({});
        jest.clearAllMocks();

        // Create and login user
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        const user = await new UserModel({ 
            ...testUser, 
            password: hashedPassword,
            watchlist: ['RELIANCE.NS', 'TCS.NS']
        }).save();
        userId = user._id;

        const loginRes = await request(app)
            .post('/login')
            .send({ email: testUser.email, password: testUser.password });

        cookie = loginRes.headers['set-cookie'];
    });

    describe('GET /watchlist', () => {
        test('should return watchlist with mocked Yahoo Finance data', async () => {
            mockQuote.mockResolvedValueOnce([
                { symbol: 'RELIANCE.NS', regularMarketPrice: 2450.50, regularMarketChangePercent: 1.2 },
                { symbol: 'TCS.NS', regularMarketPrice: 3200.00, regularMarketChangePercent: -0.5 }
            ]);

            const res = await request(app)
                .get('/watchlist')
                .set('Cookie', cookie);

            expect(res.statusCode).toBe(200);
            expect(mockQuote).toHaveBeenCalledWith(['RELIANCE.NS', 'TCS.NS']);
            expect(res.body).toEqual([
                { name: 'RELIANCE', symbol: 'RELIANCE.NS', price: 2450.5, percent: '1.20%', isDown: false },
                { name: 'TCS', symbol: 'TCS.NS', price: 3200, percent: '-0.50%', isDown: true }
            ]);
        });

        test('should fallback to individual symbol quotes if bulk quote throws error', async () => {
            mockQuote
                .mockRejectedValueOnce(new Error('Bulk quote error'))
                .mockResolvedValueOnce({ symbol: 'RELIANCE.NS', regularMarketPrice: 2450.50, regularMarketChangePercent: 1.2 })
                .mockResolvedValueOnce({ symbol: 'TCS.NS', regularMarketPrice: 3200.00, regularMarketChangePercent: -0.5 });

            const res = await request(app)
                .get('/watchlist')
                .set('Cookie', cookie);

            expect(res.statusCode).toBe(200);
            expect(mockQuote).toHaveBeenCalledTimes(3); // 1 bulk + 2 individual
            expect(res.body).toEqual([
                { name: 'RELIANCE', symbol: 'RELIANCE.NS', price: 2450.5, percent: '1.20%', isDown: false },
                { name: 'TCS', symbol: 'TCS.NS', price: 3200, percent: '-0.50%', isDown: true }
            ]);
        });
    });

    describe('GET /searchSymbol', () => {
        test('should return search results for a symbol query', async () => {
            mockSearch.mockResolvedValueOnce({
                quotes: [
                    { symbol: 'INFY.NS', exchange: 'NSE' },
                    { symbol: 'INFY', exchange: 'NYQ' }
                ]
            });

            const res = await request(app)
                .get('/searchSymbol?q=INFY')
                .set('Cookie', cookie);

            expect(res.statusCode).toBe(200);
            expect(mockSearch).toHaveBeenCalledWith('INFY');
            expect(res.body).toEqual([
                { symbol: 'INFY.NS', name: 'INFY', exchange: 'NSE' },
                { symbol: 'INFY', name: 'INFY', exchange: 'NYQ' }
            ]);
        });

        test('should return empty list if query is empty', async () => {
            const res = await request(app)
                .get('/searchSymbol')
                .set('Cookie', cookie);

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]);
            expect(mockSearch).not.toHaveBeenCalled();
        });
    });

    describe('POST /watchlist/add', () => {
        test('should add new stock symbol to watchlist and return the updated watchlist', async () => {
            const res = await request(app)
                .post('/watchlist/add')
                .set('Cookie', cookie)
                .send({ symbol: 'INFY.NS' });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Added to watchlist');
            expect(res.body.watchlist).toContain('INFY.NS');

            const userInDb = await UserModel.findById(userId);
            expect(userInDb.watchlist).toContain('INFY.NS');
        });

        test('should not add duplicate symbol to watchlist', async () => {
            const res = await request(app)
                .post('/watchlist/add')
                .set('Cookie', cookie)
                .send({ symbol: 'RELIANCE.NS' });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.watchlist.filter(sym => sym === 'RELIANCE.NS').length).toBe(1);
        });

        test('should return 400 if symbol is missing', async () => {
            const res = await request(app)
                .post('/watchlist/add')
                .set('Cookie', cookie)
                .send({});

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Symbol is required');
        });
    });

    describe('POST /watchlist/remove', () => {
        test('should remove stock symbol from watchlist and return the updated watchlist', async () => {
            const res = await request(app)
                .post('/watchlist/remove')
                .set('Cookie', cookie)
                .send({ symbol: 'RELIANCE.NS' });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Removed from watchlist');
            expect(res.body.watchlist).not.toContain('RELIANCE.NS');

            const userInDb = await UserModel.findById(userId);
            expect(userInDb.watchlist).not.toContain('RELIANCE.NS');
        });

        test('should return 400 if symbol is missing', async () => {
            const res = await request(app)
                .post('/watchlist/remove')
                .set('Cookie', cookie)
                .send({});

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Symbol is required');
        });
    });
});
