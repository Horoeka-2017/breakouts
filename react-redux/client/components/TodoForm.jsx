import React from 'react'

class TodoForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      todo: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.addTodo(this.state.todo)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className="message">
        <div className="message-header">
          <p>TodoForm.jsx</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="field has-addons">
            <div className="control">
              <input
                className="input is-large"
                type="text"
                name="todo"
                onChange={this.handleChange}
                value={this.state.todo}
                placeholder="Enter todo description"
              />
            </div>
            <div className="control">
              <button className="button is-primary is-large">Add</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default TodoForm
