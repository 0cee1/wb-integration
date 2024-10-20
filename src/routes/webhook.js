
const express = require('express');
const { processWebhook, verifyHook } = require('../controllers/webhooks');



const webhookRouter = express.Router();

webhookRouter.post('/webhook', processWebhook);
webhookRouter.get('/webhook', verifyHook);


module.exports = { webhookRouter };
