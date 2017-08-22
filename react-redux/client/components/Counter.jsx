import React from 'react'
import {connect} from 'react-redux'

class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.decrement = this.decrement.bind(this)
  }

  // Remove this by dispatching an action to the store instead
  decrement () {
  }

  render () {
    const counter = this.props.counter
    return (
      <div className="message">
        <div className="message-header">
          <p>Counter.jsx</p>
        </div>
        <div className="message-body">
          <p className="counter">{counter}</p>
          <div className="button-container">
            <button className="button is-danger" onClick={this.decrement}>DECREMENT</button>
            <button className="button is-success" onClick={this.props.increment}>INCREMENT</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    // propName: partOfState
    counter: state.counter
  }
}

function mapDispatchToProps (dispatch) {
  return {
    // propName: function that dispatches the action
    increment: () => {
      // use an action creator instead of an action object literal
      dispatch({ type: 'INCREMENT' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
