const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

let client;
let db;

async function connect() {
    if (!db) {
        try {
            const connectionString = process.env.ATLAS_URI || "";
            client = new MongoClient(connectionString);
            await client.connect();
            db = client.db("whois_dev");
        } catch (e) {
            console.error(e);
        }
    }
    return db;
}

async function disconnect() {
    try {
        if (client) {
            await client.close();
        }
    } catch (e) {
        console.error(e);
    } finally {
        client = null;
        db = null;
    }
}

module.exports = connect;
module.exports.disconnect = disconnect;