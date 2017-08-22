import React from 'react'
import Todo from './Todo'

class Todos extends React.Component {
  render () {
    const todos = this.props.todos
    return (
      <div className="message">
        <div className="message-header">
          <p>Todos.jsx</p>
        </div>
        <div className="panel">
          {todos.map((todo) => {
            return (
              <Todo key={todo.id} todo={todo} toggleTodo={this.props.toggleTodo} deleteTodo={this.props.deleteTodo} />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Todos
