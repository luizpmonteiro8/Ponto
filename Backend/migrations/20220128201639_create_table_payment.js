/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('payment', (table) => {
    table.increments('id').primary;
    table.date('day_of_payment').notNullable();
    table.integer('absent_day').notNullable();
    table.double('discont').notNullable();
    table.double('total_with_discont').notNullable();
    table.integer('employee_id').references('id').inTable('employee').notNullable();
    table.integer('building_id').references('id').inTable('building').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('payment');
};
