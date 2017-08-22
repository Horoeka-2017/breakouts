const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const knex = require('knex')(config)

function getTodos (conn) {
  const connection = conn || knex
  return connection('todos')
}

function insertTodo (todo, conn) {
  const connection = conn || knex
  return connection('todos')
    .insert([{
      text: todo.text,
      completed: false
    }], 'id')
    .then((newTodoId) => {
      newTodoId = newTodoId[0]
      return connection('todos')
        .where({ id: newTodoId })
    })
    .then((newTodo) => {
      return newTodo[0]
    })
}

function updateTodo (todoId, todo, conn) {
  const connection = conn || knex
  return connection('todos')
    .where({ id: todoId })
    .update(todo, 'id')
    .then(() => {
      return connection('todos')
        .where({ id: todoId })
    })
    .then((newTodo) => {
      return newTodo[0]
    })
}

function toggleTodo (todoId, conn) {
  const connection = conn || knex
  return connection('todos')
    .where({ id: todoId })
    .then((todo) => {
      todo = todo[0]
      const completed = !todo.completed
      return connection('todos')
        .where({ id: todoId })
        .update({
          completed: completed
        }, 'id')
    })
    .then((todoId) => {
      return connection('todos')
        .where({ id: todoId })
    })
    .then((newTodo) => {
      return newTodo[0]
    })
}

module.exports = {
  getTodos,
  insertTodo,
  toggleTodo,
  updateTodo
}
