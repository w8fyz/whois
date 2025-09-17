const connect = require("../db/db");
let db = await connect();
let collection = await db.collection("users");

async function createUser(user) {
    return await collection.insertOne(user);
}

async function updateUser(user) {
    return await collection.insertOne(user);
}

async function deleteUser(user) {
    return await collection.deleteOne(user);
}

async function getUserByEmail(email) {
    return await collection.findOne({
        email: email
    });
}

async function getUsers() {
    return await collection.find({}).toArray();
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserByEmail
}