
exports.up = function (knex, Promise) {
  return knex.schema.createTable('todos', function (table) {
    table.increments('id').primary()
    table.string('text').notNullable()
    table.boolean('completed').defaultTo(false).notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('todos')
}
