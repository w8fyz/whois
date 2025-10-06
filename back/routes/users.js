var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById
} = require('../services/userService');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await getUsers();
        const self = await getUserById(req.user.userId);
        console.log(self);
        if(!self.isAdmin) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (users.error) {
            return res.status(users.code).json({ error: users.error });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        const self = await getUserById(req.user.userId);
        if(!self.isAdmin && req.user.userId !== req.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, password, profilePicture64 } = req.body;
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const userData = {
            firstName,
            lastName,
            email,
            password,
            profilePicture64: profilePicture64 || null
        };

        const result = await createUser(userData);
        
        if (result.error) {
            return res.status(result.code).json({ error: result.error });
        }
        
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { firstName, lastName, email, password, profilePicture64 } = req.body;
        const updateData = {};

        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) updateData.email = email;
        if (password) updateData.password = password;
        if (profilePicture64 !== undefined) updateData.profilePicture64 = profilePicture64;

        const result = await updateUser(req.params.id, updateData);
        
        if (result.error) {
            return res.status(result.code).json({ error: result.error });
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteUser(req.params.id);
        
        if (result.error) {
            return res.status(result.code).json({ error: result.error });
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
