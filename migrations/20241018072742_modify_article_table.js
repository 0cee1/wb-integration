/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('blogs', (table) => {
    table.timestamp('created_at').nullable().alter(); 
    table.renameColumn('hero_image', 'image_url');
    table.string('read_duration');
    table.dropColumn('updated_at');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('blogs', (table) => {
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.renameColumn('image_url', 'hero_image');
    table.dropColumn('read_duration');
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};
