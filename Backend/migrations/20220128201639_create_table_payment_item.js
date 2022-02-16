/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('payment_item', (table) => {
    table.increments('id').primary;
    table.integer('absent_day').notNullable();
    table.double('discont').notNullable();
    table.double('total_with_discont').notNullable();
    table.integer('employee_id').references('id').inTable('employee').notNullable();
    table
      .integer('payment_id')
      .references('id')
      .inTable('payment')
      .notNullable()
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('payment_item');
};
