const Joi = require("joi");

const validateContact = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        address: Joi.string().min(4).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().min(7).max(10000000000).required(),
        id: Joi.string().optional(), // Adding id for update validation if needed
    });

    return schema.validate(data);
};

module.exports = validateContact;
