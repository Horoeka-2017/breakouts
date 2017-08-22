const path = require('path')
const express = require('express')

const server = express()

const todos = require('./todos')

server.use(express.static(path.join(__dirname, '../public')))
server.use('/api/v1/todos', todos)

module.exports = server
