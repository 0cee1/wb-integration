/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('messages', function (table) {
        table.increments('id'); 
        table.string('recepient_phone').notNullable(); 
        table.string('template').notNullable(); 
        table.string('message_id'); 
        table.integer('status').defaultTo(0).unsigned(); 
        table.string('media_url'); 
        table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now()); 
        table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now()); 
        table.timestamp('deleted_at').nullable(); 
    });
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('messages'); 
};
