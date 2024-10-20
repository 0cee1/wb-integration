const createApp = require('./app'); 
const { blogRouter } = require('./routes/mediumRouter');
const { webhookRouter } = require('./routes/webhook');
const { messageRouter } = require('./routes/whatsappRouter');





const app = createApp([webhookRouter, messageRouter, blogRouter]);

app.listen();
