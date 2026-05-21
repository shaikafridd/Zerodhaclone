const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test_secret_key_12345';

    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
});

afterEach(async () => {
    if (mongoose.connection.db) {
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) {
            await collection.deleteMany({});
        }
    }
});

afterAll(async () => {
    if (mongoose.connection) {
        await mongoose.connection.close();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
});
