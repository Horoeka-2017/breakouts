import React from 'react'
import uuidv1 from 'uuid/v1'

import Banner from './Banner'
import Counter from './Counter'
import Todos from './Todos'
import TodoForm from './TodoForm'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: [
        {
          id: uuidv1(),
          text: 'Do the dishes',
          completed: false
        },
        {
          id: uuidv1(),
          text: 'Clock redux',
          completed: false
        }
      ]
    }
    this.addTodo = this.addTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  addTodo (text) {
    const newTodo = {
      id: uuidv1(),
      text: text,
      completed: false
    }
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
  }

  deleteTodo (todoId) {
    const todos = this.state.todos.filter((todo) => todo.id !== todoId)
    this.setState({
      todos: todos
    })
  }

  toggleTodo (todoId) {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed
      }
      return todo
    })
    this.setState({
      todos: todos
    })
  }

  render () {
    return (
      <div>
        <Banner />
        <div className="container">
          <div className="flex-container">
            <Counter />
            <Todos todos={this.state.todos} toggleTodo={this.toggleTodo} deleteTodo={this.deleteTodo} />
            <TodoForm addTodo={this.addTodo} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
