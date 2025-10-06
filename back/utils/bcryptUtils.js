const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (plainPassword) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(plainPassword, salt);
    } catch (error) {
        throw error;
    }
};

const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw error;
    }
};

module.exports = { hashPassword, comparePassword };