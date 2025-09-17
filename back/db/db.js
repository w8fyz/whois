const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let db;

async function connect() {
    if(!db) {
        try {
            await client.connect();
            db = client.db("whois_dev");
        } catch(e) {
            console.error(e);
        }
    }
    return db;
}

module.exports = connect;