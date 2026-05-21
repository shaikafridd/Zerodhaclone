const request = require('supertest');
const app = require('../index');
const { UserModel } = require('../models/UserModel');
const { OrdersModel } = require('../models/OrdersModel');
const { HoldingsModel } = require('../models/HoldingsModel');
const { PositionsModel } = require('../models/PositionsModel');
const bcrypt = require('bcrypt');

describe('Order Endpoints', () => {
    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
    };
    let cookie;
    let userId;

    beforeEach(async () => {
        await UserModel.deleteMany({});
        await OrdersModel.deleteMany({});
        await HoldingsModel.deleteMany({});
        await PositionsModel.deleteMany({});

        // Create and login user
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        const user = await new UserModel({ 
            ...testUser, 
            password: hashedPassword,
            balance: 10000.00
        }).save();
        userId = user._id;

        const loginRes = await request(app)
            .post('/login')
            .send({ email: testUser.email, password: testUser.password });

        cookie = loginRes.headers['set-cookie'];
    });

    describe('POST /newOrder', () => {
        test('should return 400 for invalid quantity or price', async () => {
            const res = await request(app)
                .post('/newOrder')
                .set('Cookie', cookie)
                .send({ name: 'RELIANCE', qty: -5, price: 2000, mode: 'BUY', product: 'MIS' });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Invalid quantity or price');
        });

        test('should return 400 if user has insufficient funds for BUY order', async () => {
            const res = await request(app)
                .post('/newOrder')
                .set('Cookie', cookie)
                .send({ name: 'RELIANCE', qty: 10, price: 2000, mode: 'BUY', product: 'MIS' }); // cost = 20000, balance = 10000

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Insufficient funds to place this order');
        });

        test('should successfully BUY intraday (MIS) stock, deduct balance, update positions and save order', async () => {
            const res = await request(app)
                .post('/newOrder')
                .set('Cookie', cookie)
                .send({ name: 'RELIANCE', qty: 2, price: 2500, mode: 'BUY', product: 'MIS' }); // cost = 5000

            expect(res.statusCode).toBe(200);
            expect(res.text).toBe('Order saved!');

            // Check User balance
            const user = await UserModel.findById(userId);
            expect(user.balance).toBe(5000.00);

            // Check Position
            const position = await PositionsModel.findOne({ userId, name: 'RELIANCE', product: 'MIS' });
            expect(position).toBeDefined();
            expect(position.qty).toBe(2);
            expect(position.avg).toBe(2500);

            // Check Order logged
            const order = await OrdersModel.findOne({ userId, name: 'RELIANCE' });
            expect(order).toBeDefined();
            expect(order.qty).toBe(2);
            expect(order.price).toBe(2500);
            expect(order.mode).toBe('BUY');
            expect(order.product).toBe('MIS');
        });

        test('should successfully BUY CNC (delivery) stock and save holding', async () => {
            const res = await request(app)
                .post('/newOrder')
                .set('Cookie', cookie)
                .send({ name: 'TCS', qty: 2, price: 3000, mode: 'BUY', product: 'CNC' }); // cost = 6000

            expect(res.statusCode).toBe(200);

            // Check Holding
            const holding = await HoldingsModel.findOne({ userId, name: 'TCS' });
            expect(holding).toBeDefined();
            expect(holding.qty).toBe(2);
            expect(holding.avg).toBe(3000);
        });

        test('should successfully SELL CNC holding, add to user balance, update holdings', async () => {
            // First insert mock holding
            await new HoldingsModel({
                name: 'TCS',
                qty: 5,
                avg: 3000,
                price: 3000,
                net: '0%',
                day: '0%',
                isLoss: false,
                userId: userId
            }).save();

            const res = await request(app)
                .post('/newOrder')
                .set('Cookie', cookie)
                .send({ name: 'TCS', qty: 3, price: 3200, mode: 'SELL', product: 'CNC' }); // credit = 9600

            expect(res.statusCode).toBe(200);

            // Check User balance (10000 + 9600 = 19600)
            const user = await UserModel.findById(userId);
            expect(user.balance).toBe(19600.00);

            // Check Holding qty reduced to 2
            const holding = await HoldingsModel.findOne({ userId, name: 'TCS' });
            expect(holding.qty).toBe(2);
        });

        test('should return 400 if user has insufficient CNC holding for SELL order', async () => {
            const res = await request(app)
                .post('/newOrder')
                .set('Cookie', cookie)
                .send({ name: 'TCS', qty: 1, price: 3200, mode: 'SELL', product: 'CNC' });

            expect(res.statusCode).toBe(400);
            expect(res.text).toBe('Insufficient holdings to place this sell order');
        });

        test('should successfully SELL (short) MIS positions', async () => {
            const res = await request(app)
                .post('/newOrder')
                .set('Cookie', cookie)
                .send({ name: 'RELIANCE', qty: 2, price: 2500, mode: 'SELL', product: 'MIS' }); // credit = 5000

            expect(res.statusCode).toBe(200);

            const user = await UserModel.findById(userId);
            expect(user.balance).toBe(15000.00);

            const position = await PositionsModel.findOne({ userId, name: 'RELIANCE', product: 'MIS' });
            expect(position.qty).toBe(-2);
        });
    });

    describe('GET /allOrders', () => {
        test('should return all orders placed by the user', async () => {
            await new OrdersModel({ userId, name: 'RELIANCE', qty: 2, price: 2500, mode: 'BUY', product: 'MIS' }).save();
            await new OrdersModel({ userId, name: 'TCS', qty: 1, price: 3000, mode: 'BUY', product: 'CNC' }).save();

            const res = await request(app)
                .get('/allOrders')
                .set('Cookie', cookie);

            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body[0].name).toBe('RELIANCE');
            expect(res.body[1].name).toBe('TCS');
        });
    });
});
