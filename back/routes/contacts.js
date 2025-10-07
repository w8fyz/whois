var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createContact,
    updateContact,
    deleteContact,
    getContacts,
    getContactByIdAndUser
} = require('../services/contactService');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const contacts = await getContacts(req.user.userId);
        if (contacts.error) {
            return res.status(contacts.code).json({ error: contacts.error });
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const contact = await getContactByIdAndUser(req.params.id, req.user.userId);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, company, notes } = req.body;
        
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ error: 'Missing required fields (firstName, lastName, email)' });
        }

        const contactData = {
            firstName,
            lastName,
            email,
            phoneNumber: phoneNumber || null,
            company: company || null,
            notes: notes || null
        };

        const result = await createContact(contactData, req.user.userId);
        
        if (result.error) {
            return res.status(result.code).json({ error: result.error });
        }
        
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, company, notes } = req.body;
        const updateData = {};

        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) updateData.email = email;
        if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
        if(phoneNumber.length < 10 || phoneNumber.length > 20) {
            return res.status(400).json({ error: 'Invalid phone number' });
        }
        if (company !== undefined) updateData.company = company;
        if (notes !== undefined) updateData.notes = notes;

        const result = await updateContact(req.params.id, req.user.userId, updateData);
        
        if (result.error) {
            return res.status(result.code).json({ error: result.error });
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const result = await deleteContact(req.params.id, req.user.userId);
        
        if (result.error) {
            return res.status(result.code).json({ error: result.error });
        }
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

