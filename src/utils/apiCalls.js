const axios = require('axios');
const { mediaTemplate, textAlertTemplate } = require('./template');
const { SENDMEDIAURL, ACCESS_TOKEN, SENDTEXT, WBID, MEDIUM_SECRET } = require('../../base');

const postMessage = async (data) => {
    const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
    }

    try {
        const response = axios.post(SENDTEXT, data, { headers });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

const mediumOptions = (url,) => {
    const options = {
        method: 'GET',
        url,
        // params: {
        //     next: '1625519209064'
        // },
        headers: {
            'x-rapidapi-key': MEDIUM_SECRET,
            'x-rapidapi-host': 'medium2.p.rapidapi.com'
        }
    };
    return options;
}

module.exports = {
    postMessage,
    mediumOptions,
}