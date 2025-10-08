const { MongoMemoryServer } = require('mongodb-memory-server');
const connect = require('../db/db');
const { disconnect } = require('../db/db');

let mongoServer;

async function setupMemoryDb() {
  mongoServer = await MongoMemoryServer.create();
  process.env.ATLAS_URI = mongoServer.getUri();
  await connect();
}

async function teardownMemoryDb() {
  await disconnect();
  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
}

module.exports = { setupMemoryDb, teardownMemoryDb };


