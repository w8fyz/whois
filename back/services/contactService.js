const connect = require("../db/db");
const { ObjectId } = require("mongodb");

async function getCollection() {
    let db = await connect();
    return db.collection("contacts");
}

async function createContact(contact, userId) {
    try {
        const existingContact = await getContactByEmailAndUser(contact.email, userId);
        if (existingContact != null) {
            return { error: "Contact with this email already exists", code: 403 };
        }
        contact.userId = userId;
        const col = await getCollection();
        const result = await col.insertOne(contact);
        return await getContactById(result.insertedId);
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

async function updateContact(id, userId, updateData) {
    try {
        const col = await getCollection();
        const result = await col.updateOne(
            { _id: new ObjectId(id), userId: userId },
            { $set: updateData }
        );
        if (result.matchedCount === 0) {
            return { error: "Contact not found", code: 404 };
        }
        return await getContactById(id);
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

async function deleteContact(id, userId) {
    try {
        const col = await getCollection();
        const result = await col.deleteOne({ _id: new ObjectId(id), userId: userId });
        if (result.deletedCount === 0) {
            return { error: "Contact not found", code: 404 };
        }
        return { message: "Contact deleted successfully", code: 200 };
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

async function getContactByEmail(email) {
    try {
        const col = await getCollection();
        return await col.findOne({ email });
    } catch (error) {
        return null;
    }
}

async function getContactByEmailAndUser(email, userId) {
    try {
        const col = await getCollection();
        return await col.findOne({ email, userId });
    } catch (error) {
        return null;
    }
}

async function getContactById(id) {
    try {
        const col = await getCollection();
        return await col.findOne({ _id: new ObjectId(id) });
    } catch (error) {
        return null;
    }
}

async function getContacts(userId) {
    try {
        const col = await getCollection();
        return await col.find({ userId }).toArray();
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

async function getContactByIdAndUser(id, userId) {
    try {
        const col = await getCollection();
        return await col.findOne({ _id: new ObjectId(id), userId });
    } catch (error) {
        return null;
    }
}

module.exports = {
    createContact,
    updateContact,
    deleteContact,
    getContacts,
    getContactByEmail,
    getContactByEmailAndUser,
    getContactById,
    getContactByIdAndUser
};

