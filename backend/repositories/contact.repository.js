const Contact = require("../models/contact.model");

class ContactRepository {
    async create(contactData) {
        const contact = new Contact(contactData);
        return await contact.save();
    }

    async findAllByUser(userId) {
        return await Contact.find({ postedBy: userId }).populate(
            "postedBy",
            "-password"
        );
    }

    async findById(id) {
        return await Contact.findOne({ _id: id });
    }

    async update(id, updatedData) {
        return await Contact.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
    }

    async delete(id) {
        return await Contact.deleteOne({ _id: id });
    }
}

module.exports = new ContactRepository();
