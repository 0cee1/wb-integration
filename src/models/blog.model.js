const { Model } = require('objection');

class Blog extends Model {
  static get tableName() {
    return 'blogs';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        author: { type: 'string', minLength: 1, maxLength: 255 },
        article_id: { type: 'string' },
        image_url: { type: 'string' },
        read_duration: {type: 'string'},
        subtitle: { type: 'string'},
        content: { type: 'string' },
        published_at: { type: 'string', format: 'date-time' },
        last_modified_at: { type: 'string', format: 'date-time' },
      }
    };
  }
}

module.exports = Blog;