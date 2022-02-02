/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('building', (table) => {
    table.increments('id').primary;
    table.string('name').notNullable().unique();
    table.boolean('status').notNullable();
    table
      .integer('address_id')
      .references('id')
      .inTable('address')
      .notNullable()
      .unique()
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('building');
};
