const { MEDIA_TEMPLATE, TEXT_TEMPLATE } = require("../../base");
const { createMessage } = require("../services/messageService");
const { postMessage } = require("../utils/apiCalls");
const { mediaTemplate, textAlertTemplate } = require("../utils/template");
const { validateText, validateMediMessage } = require("../validation/validationFile");


const sendWhatsMessage = async (req, res) => {
    const { image_url, phone, type } = req.body;

    try {
        // validate req data
        const { error } = validateMediMessage({ image_url, phone, type });
        if (error) return res.status(400).json({ 
            status: 'fail',
            message: error.message,
        });

        // log to db

        // send message request
        const data = await mediaTemplate(phone, MEDIA_TEMPLATE, image_url, type);
        const messageRes = await postMessage(data);
         console.log(messageRes.data)
        res.status(200).json({
            status: 'success',
            message: 'Receipt sent successfully',
            data: ''
        })
    } catch (error) {
        console.log('error -===========- ', error)
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: ''
        })
    }
};


const sendText = async (req, res) => {
    const { phone, customer_data, account_number, amount, description } = req.body;

    try {
        // validate req data
        const { error } = validateText({ phone, customer_data, account_number, amount, description });
        if (error) return res.status(400).json({ 
            status: 'fail',
            message: error.message,
        });

        // send message request
        const data = await textAlertTemplate(phone, TEXT_TEMPLATE, customer_data, account_number, amount, description);
        const messageRes = await postMessage(data);
        if (!messageRes) {
            return res.status(400).json({
                status: 'fail',
                message: 'Error processing request'
            })
        }

        // log to db
        const wamid = messageRes?.messages?.[0]?.id;
        await createMessage({
            message_id: wamid,
            recepient_phone: phone,
            template: TEXT_TEMPLATE,
            status: 1,
        })
        
        res.status(200).json({
            status: 'success',
            message: 'Message sent successfully',
        })
    } catch (error) {
        console.log('error -===========- ', error.message)
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: 'null'
        })
    }
}

// const data = mediaTemplate('+2348148009889', MEDIA_TEMPLATE, 'https://drive.google.com/file/d/1BLV9RmnbyVbnuP6srdCtEl0BQLUFcpd9/view?usp=sharing', 'Payment');
// const messageRes = await postMessage(data);

// console.log(messageRes.data)
// console.log(resp)
module.exports = {
    sendWhatsMessage,
    sendText
}