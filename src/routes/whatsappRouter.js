const express = require('express');
const { sendText, sendWhatsMessage } = require('../controllers/messageController');
const { fetchArticles } = require('../controllers/mediumController');

const messageRouter = express.Router();

messageRouter.post('/whatsapp/send-text', sendText);
messageRouter.post('/whatsapp/send-media', sendWhatsMessage);
messageRouter.get('/whatsapp/templates', sendWhatsMessage);
messageRouter.get('/whatsapp/status/:messageId', sendWhatsMessage);
messageRouter.get('/medium', fetchArticles);

module.exports = {
    messageRouter
}