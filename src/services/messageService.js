const Notifications = require("../models/whatsappNotifications");
const moment = require("moment");

const createMessage = async (data) => {
    const result = await Notifications.query().insert(data);
    return result;
};

const getMessageById = async (id) => {
    const result = await Notifications.query().findById(id);
    return result;
};

const getMessage = async (message_id) => {
    const result = await Notifications.query().findOne({ message_id });
    return result;
}

const updateMessage = async (Notifications_number, data) => {
    const result = await Notifications.query().where('Notifications_number', Notifications_number).patch({ balance: data });
    return result;
};

const updateByMessageId = async (wamid, data) => {
    const result = await Notifications.query().where('message_id', wamid).patch(data);
    return result;
};

const findByIdAndUpdate = async (data, id) => {
    const result = await Notifications.query().patchAndFetchById(id, data);
    return result;
};

const removeMessage = async (id) => {
    const deletedAt = moment().format('YYYY-MM-DD HH:mm:ss')
    const result = await Notifications.query().patchAndFetchById(+id, { deleted_at: deletedAt });
    return result;
};


module.exports = {
    createMessage,
    getMessageById,
    updateByMessageId,
    findByIdAndUpdate,
    removeMessage,
    getMessage
};