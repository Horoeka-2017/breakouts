const router = require('express').Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())

const db = require('./db')

router.get('/', (req, res) => {
  db.getTodos()
    .then((todos) => {
      res.json(todos)
    })
})

router.post('/', (req, res) => {
  const todo = req.body
  db.insertTodo({
    text: todo.text
  })
    .then((todo) => {
      res.json(todo)
    })
})

router.put('/:id', (req, res) => {
  const todo = req.body
  const id = Number(req.params.id)
  db.updateTodo(id, todo)
    .then((todo) => {
      res.json(todo)
    })
})

router.get('/toggle/:id', (req, res) => {
  const id = Number(req.params.id)
  db.toggleTodo(id)
    .then((todo) => {
      res.json(todo)
    })
})

module.exports = router
