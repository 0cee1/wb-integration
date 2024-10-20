/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('blogs', (table) => {
    table.renameColumn('created_at', 'last_modified_at');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('blogs', (table) => {
    table.renameColumn('last_modified_at', 'created_at');
  })
};
