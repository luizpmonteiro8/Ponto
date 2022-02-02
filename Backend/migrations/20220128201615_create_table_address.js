/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('address', (table) => {
    table.increments('id').primary;
    table.string('zipcode').notNullable();
    table.string('street').notNullable();
    table.string('number').notNullable();
    table.string('district').notNullable();
    table.string('city').notNullable();
    table.string('state').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('address');
};
