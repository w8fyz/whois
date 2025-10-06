const connect = require("../db/db");
const { hashPassword } = require("../utils/bcryptUtils");
const { ObjectId } = require("mongodb");

async function getCollection() {
    let db = await connect();
    return db.collection("users");
}

async function createUser(user) {
    try {
        if (await getUserByEmail(user.email) != null) {
            return { error: "User already exists", code: 403 };
        }
        user.password = await hashPassword(user.password);
        const col = await getCollection();
        const result = await col.insertOne(user);
        return await getUserById(result.insertedId);
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

async function updateUser(id, updateData) {
    try {
        const col = await getCollection();
        if (updateData.password) {
            updateData.password = await hashPassword(updateData.password);
        }
        const result = await col.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
        if (result.matchedCount === 0) {
            return { error: "User not found", code: 404 };
        }
        return await getUserById(id);
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

async function deleteUser(id) {
    try {
        const col = await getCollection();
        const result = await col.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return { error: "User not found", code: 404 };
        }
        return { message: "User deleted successfully", code: 200 };
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

async function getUserByEmail(email) {
    try {
        const col = await getCollection();
        return await col.findOne({ email });
    } catch (error) {
        return null;
    }
}

async function getUserById(id, keepPassword = false) {
    try {
        const col = await getCollection();
        const result = await col.findOne({ _id: new ObjectId(id) });
        if(!keepPassword) {
            const { password, ...safeUser } = result;
            return safeUser;
        }
        return result;
    } catch (error) {
        return null;
    }
}

async function getUsers(keepPassword = false) {
    try {
        const col = await getCollection();
        const users = await col.find({}).toArray();
        if(keepPassword) {
            return users;
        } else {
            return users.map(({ password, ...rest }) => rest);
        }
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserByEmail,
    getUserById
};