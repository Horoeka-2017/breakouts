import React from 'react'
import classNames from 'classnames'

class Todo extends React.Component {
  constructor (props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleToggle () {
    this.props.toggleTodo(this.props.todo.id)
  }

  handleDelete () {
    this.props.deleteTodo(this.props.todo.id)
  }

  render () {
    const todo = this.props.todo
    return (
      <div className="panel-block is-active">
        <div className={classNames('item', { completed: todo.completed })} onClick={this.handleToggle}>{todo.text}</div>
        <button className="button is-danger" onClick={this.handleDelete}>X</button>
      </div>
    )
  }
}

export default Todo
