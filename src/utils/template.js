const mediaTemplate = (phoneNumber, templateName, imageLink, receiptType) => {
  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phoneNumber,
    type: 'template',
    template: {
      name: templateName, 
      language: {
        code: 'en', 
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: 'image',
              image: {
                link: imageLink,
              },
            },
          ],
        },
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: receiptType, // Replace with the text string
            },
          ],
        },
      ],
    }
  };

  return data;
};

const transactionTemplate = (phoneNumber, templateName, imageLink, receiptType) => {
  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phoneNumber,
    type: 'template',
    template: {
      name: templateName, 
      language: {
        code: en, 
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: 'image',
              image: {
                link: imageLink,
              },
            },
          ],
        },
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: type, 
            },
          ],
        },
      ],
    }
  };

  return data;
};


const textAlertTemplate = (phoneNumber, templateName, customerDeets, accountNumber, amount, description) => {
  const data = {
    messaging_product: "whatsapp",
    recipient_type: 'individual',
    to: phoneNumber,
    type: 'template',
    template: {
      name: templateName, 
      language: {
        code: 'en', 
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: amount, 
            },
            {
              type: 'text',
              text: accountNumber, 
            },
            {
              type: 'text',
              text: customerDeets, 
            },
            {
              type: 'text',
              text: description, 
            },
          ],
        },
      ],
    }
  };

  return data;
};

module.exports = {
  textAlertTemplate,
  mediaTemplate,
  transactionTemplate
}