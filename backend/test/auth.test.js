const request = require('supertest');
const app = require('../index');
const { UserModel } = require('../models/UserModel');
const bcrypt = require('bcrypt');

describe('Auth Endpoints', () => {
    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
    };

    beforeEach(async () => {
        await UserModel.deleteMany({});
    });

    describe('POST /signup', () => {
        test('should successfully sign up a new user and set a cookie', async () => {
            const res = await request(app)
                .post('/signup')
                .send(testUser);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Signup successful');
            expect(res.headers['set-cookie']).toBeDefined();
            expect(res.headers['set-cookie'][0]).toContain('token=');

            // Verify user is saved in DB and password is hashed
            const userInDb = await UserModel.findOne({ email: testUser.email });
            expect(userInDb).toBeDefined();
            expect(userInDb.username).toBe(testUser.username);
            expect(userInDb.password).not.toBe(testUser.password);
            
            const isPasswordValid = await bcrypt.compare(testUser.password, userInDb.password);
            expect(isPasswordValid).toBe(true);
        });

        test('should not sign up a user with an already registered email', async () => {
            const hashedPassword = await bcrypt.hash(testUser.password, 10);
            await new UserModel({ ...testUser, password: hashedPassword }).save();

            const res = await request(app)
                .post('/signup')
                .send(testUser);

            expect(res.statusCode).toBe(400);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('User already exists');
        });
    });

    describe('POST /login', () => {
        beforeEach(async () => {
            const hashedPassword = await bcrypt.hash(testUser.password, 10);
            await new UserModel({ ...testUser, password: hashedPassword }).save();
        });

        test('should login successfully with valid credentials and set cookie', async () => {
            const res = await request(app)
                .post('/login')
                .send({ email: testUser.email, password: testUser.password });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Login successful');
            expect(res.headers['set-cookie']).toBeDefined();
            expect(res.headers['set-cookie'][0]).toContain('token=');
        });

        test('should return 401 for non-existent email', async () => {
            const res = await request(app)
                .post('/login')
                .send({ email: 'nonexistent@example.com', password: testUser.password });

            expect(res.statusCode).toBe(401);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Invalid credentials');
        });

        test('should return 401 for incorrect password', async () => {
            const res = await request(app)
                .post('/login')
                .send({ email: testUser.email, password: 'wrongpassword' });

            expect(res.statusCode).toBe(401);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Invalid credentials');
        });
    });

    describe('POST /logout', () => {
        test('should clear the token cookie', async () => {
            const res = await request(app)
                .post('/logout');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Logged out');
            expect(res.headers['set-cookie'][0]).toContain('token=;');
        });
    });

    describe('GET /auth/status', () => {
        test('should return user info when authenticated with a valid token cookie', async () => {
            // First login to get a cookie
            const hashedPassword = await bcrypt.hash(testUser.password, 10);
            const user = await new UserModel({ ...testUser, password: hashedPassword }).save();

            const loginRes = await request(app)
                .post('/login')
                .send({ email: testUser.email, password: testUser.password });

            const cookie = loginRes.headers['set-cookie'];

            const res = await request(app)
                .get('/auth/status')
                .set('Cookie', cookie);

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Authenticated');
            expect(res.body.user).toBeDefined();
            expect(res.body.user.username).toBe(testUser.username);
            expect(res.body.user.email).toBe(testUser.email);
            expect(res.body.user.balance).toBeDefined();
            expect(res.body.user.id).toBe(user._id.toString());
        });

        test('should return 401 when no token cookie is provided', async () => {
            const res = await request(app)
                .get('/auth/status');

            expect(res.statusCode).toBe(401);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Unauthorized');
        });

        test('should return 401 when an invalid token cookie is provided', async () => {
            const res = await request(app)
                .get('/auth/status')
                .set('Cookie', ['token=invalid_token_12345']);

            expect(res.statusCode).toBe(401);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Invalid token');
        });
    });
});
