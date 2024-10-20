const { Model } = require("objection");
const moment = require("moment");


class Notifications extends Model {
    static get tableName() {
        return 'messages';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ["template", "recepient_phone"],
            properties: {
                id: { type: 'integer' },
                recepient_phone: { type: 'string' },
                template: { type: 'string' },
                message_id: { type: 'string' },
                status: { type: 'integer', enum: [0, 1, 2, 3] },
                media_url: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
                deleted_at: { type: 'string', format: 'date-time' },
            }
        }
    }
    $beforeInsert() {
        const now = moment().format('YYYY-MM-DD HH:mm:ss');
        this.created_at = now;
        this.updated_at = now;
    }

    $beforeUpdate() {
        this.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}

module.exports = Notifications;
