const { WEBHOOK_SECRET } = require("../../base");
const { findByIdAndUpdate, updateByMessageId } = require("../services/messageService");

const processWebhook = async (req, res) => {
  const { object, entry } = req.body;

  const authHeader = req.headers['authorization'];
  let isValid = '';
  // Verify the token exists and is correctly formatted (Bearer Token)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    // Validate the token
    isValid = validateSecret(token);
  } else {
    // No token provided
    console.error('No Access Token Provided');
    return res.status(401).json({
      status: 'fail',
      message: 'No access token provided' 
    });
  }

  if (!isValid) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid access token',
    })
  };


  
  // const isValid = validateSecret()
  res.status(200).json({
    status: true,
    message: 'Webhook received',
  });

  if (object !== 'whatsapp_business_account') {
    return res.status(400).json({
      status: 'fail',
      message: 'Bad request'
    })
  }

  const messageStatus = entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.status;
  const messageId = entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.id;

  // console.log(JSON.stringify(req.body, null, 2), `message Id: ${messageId}, status: ${messageStatus}`);
  if (!messageStatus || !messageId) {
    console.log('error: Error processing webhook')
    return ({
      status: 'fail',
      message: 'Error processing web-hook'
    })
  }

  try {
    if (messageStatus === 'sent') {
      await updateByMessageId(messageId, { status: 1 });
    } else if (messageStatus === 'delivered') {
      await updateByMessageId(messageId, { status: 2 });
    } else {
      await updateByMessageId(messageId, { status: 3 });
    }
  
    // res.status(200).json({
    //   staus: 'success',
    //   message: 'Webhook processed successfully'
    // })
  } catch (error) {
    console.log('Error: ', error);
    return {
      staus: 'fail',
      message: 'Error occurred!'
    };
  }
};

const verifyHook = async (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_SECRET) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
};

const validateSecret = async (secret) => {
  if (WEBHOOK_SECRET !== secret) {
    return false;
  }
  return true;
};

module.exports = {
  processWebhook,
  verifyHook
}