const { getUserByEmail, createUser } = require('./userService');
const { comparePassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');

async function login(email, password) {
    try {
        const user = await getUserByEmail(email);
        
        if (!user) {
            return { error: 'Invalid email or password', code: 401 };
        }

        const isPasswordValid = await comparePassword(password, user.password);
        
        if (!isPasswordValid) {
            return { error: 'Invalid email or password', code: 401 };
        }

        const token = generateToken({ 
            userId: user._id.toString(), 
            email: user.email 
        });

        const { password: _, ...userWithoutPassword } = user;

        return {
            token,
            user: userWithoutPassword
        };
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

async function register(userData) {
    try {
        const result = await createUser(userData);
        
        if (result.error) {
            return result;
        }

        const token = generateToken({ 
            userId: result._id.toString(), 
            email: result.email 
        });

        const { password: _, ...userWithoutPassword } = result;

        return {
            token,
            user: userWithoutPassword
        };
    } catch (error) {
        return { error: error.message, code: 500 };
    }
}

module.exports = { login, register };

