const contactService = require("../services/contact.service");
const validateContact = require("../validators/contact.validator");

class ContactController {
    async createContact(req, res) {
        try {
            const { error } = validateContact(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const result = await contactService.createContact(req.body, req.user._id);
            return res.status(201).json(result);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }

    async getMyContacts(req, res) {
        try {
            const contacts = await contactService.getAllContacts(req.user._id);
            return res.status(200).json({ contacts });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async updateContact(req, res) {
        try {
            const { error } = validateContact(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const result = await contactService.updateContact(req.body.id, req.body, req.user._id);
            return res.status(200).json(result);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: err.message });
        }
    }

    async deleteContact(req, res) {
        try {
            const deletedContact = await contactService.deleteContact(req.params.id, req.user._id);
            const myContacts = await contactService.getAllContacts(req.user._id);
            return res.status(200).json({ ...deletedContact._doc, myContacts });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async getContact(req, res) {
        try {
            const contact = await contactService.getContactById(req.params.id);
            return res.status(200).json(contact);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new ContactController();
