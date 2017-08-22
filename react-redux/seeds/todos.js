exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {id: 1, text: 'Do the dishes', completed: false},
        {id: 2, text: 'Complete my redux app', completed: false},
        {id: 3, text: 'Do the running man', completed: false}
      ])
    })
}
