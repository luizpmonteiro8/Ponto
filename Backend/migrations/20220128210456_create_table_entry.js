/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('entry', (table) => {
    table.increments('id').primary;
    table.enum('type', ['Entrada', 'Almoço', 'Retorno do almoço', 'Saída', 'Faltou']);
    table.dateTime('date_time').notNullable();
    table.string('obs').nullable();
    table.integer('employee_id').references('id').inTable('employee').notNullable();
    table.integer('building_id').references('id').inTable('building').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('entry');
};
