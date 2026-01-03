const contactRepository = require("../repositories/contact.repository.js");
const mongoose = require("mongoose");

class ContactService {
    async createContact(contactData, userId) {
        return await contactRepository.create({
            ...contactData,
            postedBy: userId,
        });
    }

    async getAllContacts(userId) {
        const contacts = await contactRepository.findAllByUser(userId);
        return contacts.reverse();
    }

    async getContactById(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new Error("Please enter a valid id");
        }
        const contact = await contactRepository.findById(id);
        if (!contact) throw new Error("No contact found");
        return contact;
    }

    async updateContact(id, updatedData, userId) {
        if (!id) throw new Error("No id specified.");
        if (!mongoose.isValidObjectId(id)) throw new Error("Please enter a valid id");

        const contact = await contactRepository.findById(id);
        if (!contact) throw new Error("No contact found");

        const postedBy = contact.postedBy._id || contact.postedBy;
        if (userId.toString() !== postedBy.toString()) {
            throw new Error("You can't edit other people contacts!");
        }

        const dataToUpdate = { ...updatedData, id: undefined };
        return await contactRepository.update(id, dataToUpdate);
    }

    async deleteContact(id, userId) {
        if (!id) throw new Error("No id specified.");
        if (!mongoose.isValidObjectId(id)) throw new Error("Please enter a valid id");

        const contact = await contactRepository.findById(id);
        if (!contact) throw new Error("No contact found");

        const postedBy = contact.postedBy._id || contact.postedBy;
        if (userId.toString() !== postedBy.toString()) {
            throw new Error("You can't delete other people contacts!");
        }

        await contactRepository.delete(id);
        return contact;
    }
}

module.exports = new ContactService();
