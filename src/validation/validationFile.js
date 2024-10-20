const Joi = require('joi');

const validateMediMessage = Joi.object({
    imageUrl: Joi.string()
        .uri()
        .messages({
            "string.uri": "Image URL must be a valid URL.",
            "string.empty": "Image URL cannot be empty if provided."
        }),
    phone: Joi.string().required()
        .messages({
            "string.pattern.base": "Phone number must be in international format (e.g., +2340567890).",
            "string.empty": "Phone number cannot be empty.",
            "any.required": "Phone number is required."
        }),
    type: Joi.string()
        .required()
        .messages({
            "string.empty": "Transaction Type cannot be empty"
        })
});

const validateText = Joi.object({
    account_number: Joi.string()
        .messages({
            "string.empty": "Account number cannot be empty if provided."
        }),
    phone: Joi.string().required()
    .messages({
        "string.pattern.base": "Phone number must be in international format (e.g., +2340567890).",
        "string.empty": "Phone number cannot be empty.",
        "any.required": "Phone number is required."
    }),

    customer_data: Joi.string()
    .required()
    .messages({
        "string.empty": "customer data cannot be empty.",
    }),

    amount: Joi.string()
    .required()
    .messages({
        "string.empty": "Amount data cannot be empty.",
    }),

    description: Joi.string()
    .required()
    .messages({
        "string.empty": "Description cannot be empty.",
    }),
});

module.exports = {
    validateText,
    validateMediMessage
};