/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('building_employee', (table) => {
    table.increments('id').primary;
    table.boolean('status').notNullable();
    table
      .integer('employee_id')
      .references('id')
      .inTable('employee')
      .notNullable()
      .onDelete('RESTRICT');
    table
      .integer('building_id')
      .references('id')
      .inTable('building')
      .notNullable()
      .onDelete('RESTRICT');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('building_employee');
};
