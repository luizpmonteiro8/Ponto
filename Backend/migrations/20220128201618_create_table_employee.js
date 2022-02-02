/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('employee', (table) => {
    table.increments('id').primary,
      table.string('name').notNullable().unique(),
      table.double('salary').notNullable(),
      table.integer('job_id').references('id').inTable('job').notNullable().onDelete('RESTRICT');
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
  return knex.schema.dropTable('employee');
};
