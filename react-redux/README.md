# Redux and React (without react-redux)

In this challenge, we are going to add Redux to our React app, without using a popular library `react-redux`, which would ordinarily be used to connect React and Redux together.

## Why aren't we using `react-redux`?

`react-redux` introduces *A LOT* of additional concepts (e.g. Provider, connect(), etc.) that make it difficult to teach both `redux` and `react-redux` in one day. This challenge has been designed to teach you `redux` (using a templating language you are already familiar with) without adding too many concepts.

## Getting Started

```sh
git clone https://github.com/[YOUR-COHORT]/redux-react-minimal.git
cd redux-react-minimal && npm install
```

To start the development server with a watcher that refreshes your browser, run `npm start`. The assets built by webpack are placed in `server/static`. This folder is defined as a static folder in an Express.js server that can be started with `npm run server`.

Additional components should be placed in `client/components`.

## READ THIS FIRST

Things to remember:

### Actions

1. There aren't any actions (yet), but remember that an action is simply an object with a `type` property. The `type` property describes the action we want to perform, and is commonly written in UPPER_CASE_WITH_UNDERSCORES. There may be additional properties for any `data` that needs to accompany the action (e.g. the text of a todo when adding a todo). For example:

```js
const addTodoAction = {
  type: 'ADD_TODO',
  todo: 'Grok Redux'
}
```

Read more on actions here in the [redux docs](http://redux.js.org/docs/basics/Actions.html)

### Initial State

1. Look at `index.js` on line 8 where you will find the initial state. In this case the initial state is an object with _TWO_ properties:
    * A `counter`, which is simply a number (integer)
    * A `todos` list which is an array of objects, each one representing a todo

```js
const initialState = {
  counter: 0,
  todos: [
    {
      id: uuidv1(), // To generate a unique ID for this todo
      text: 'Do the dishes',
      completed: false // To determine whether we've completed the todo or not
    },
    {
      id: uuidv1(),
      text: 'Complete my redux app',
      completed: false
    }
  ]
}
```

The initial state is normally in the *same place* as the reducer that it relates to. This is because the reducer is directly responsible for populating the store with our initial state.

### Reducer

1. Look at `index.js` on line 24 and you'll see the reducer. Remember the reducer specifies how our state changes in response to an action:
    1. Takes the `state` and `action` as parameters
    1. Does not mutate the state
    1. Does not produce any side effects (e.g. API calls)

IMPORTANT: Do not mutate the `state` (i.e. do not modify properties directly on the `state` object). Instead, create new copies of any arrays or objects before you modify them. For example:

```js
  // Object example

  // BAD - modifying the current state
  case 'INCREMENT_COUNTER':
    state.counter = state.counter + 1
    return state
  ...

  // GOOD - generating a new state
  case 'INCREMENT_COUNTER':
    const newState = {
      ...state,
      counter: state.counter + 1
    }
    return newState
```

```js
  // Array Example

  // BAD - modifying the current state
  case 'INCREMENT_COUNTER':
    state.todos.push({
      id: 1,
      text: 'This is bad',
      completed: false
    })
    return state
  ...

  // GOOD - generating a new state
  case 'INCREMENT_COUNTER':
    const newTodos = [
    ...state.todos,
    {
      id: 1,
      text: 'This is good',
      completed: false
    }]
    return newState
```

The above examples use the _Spread Operator syntax_ to spread the properties of an object or array onto another. [Read more here](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator)

### Redux Store

Look at `index.js` on line 37 and you'll see the store being created (with the reducer as a parameter). Remember that the store controls everything redux related and therefore there are a few operations can be performed directly on the store:

* `store.getState()`: Returns the current state tree of your application.
* `store.dispatch(action)`: Dispatches an action. This is the only way to trigger a state change.
* `store.subscribe(listener)`: Adds a change listener (which is generally a callback function). It will be called any time an action is dispatched, and some part of the state tree may potentially have changed. This has already been done for us (on line 38 of `index.js`), so we won't need to do this again.

### React

1. Look at how the react app receives the redux store (line 44 of the `index.js`):

```js
function renderToDom () {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
  )
}
```

The `App` component receives the redux `store` as a prop. To make the store available to any component, we must pass it down in this manner. For example, any children components within `App` (such as `Counter`) must also have the `store` passed down as a prop.

The current structure of our App is as follows:

```sh
App.jsx
  |
  |-- Banner.jsx --> The main banner 
  |-- Counter.jsx --> Renders our counter
  |-- Todos.jsx --> Renders the list of todos
      |
      |-- Todo.jsx --> Renders a specific todo
```

If you have a look at each component, you'll see that the store has been passed down as a prop to every single component. This means that in every component we are able to access all available operations on the store (e.g. store.dispatch(), store.getState())

## Let's get Reduxing!

### Counter

#### User Story 1: I want to see a counter on a page so I can start counting things

* If you look in the `Counter.jsx` component, you'll notice that in the `render` function we are rendering a `0` as our counter. This isn't very useful, so modify the render function to instead get the state from the redux store, and assign it to the counter instead. HINT: we need to _get the state_ from our `store`, and assign the counter property to our counter variable.

<details><summary>More Help</summary>

* Use `this.props.store.getState()` to get the current redux state. Then from the current state, get the counter and assign it to the counter variable.

<details><summary>Solution</summary>

```js
    render () {
      const state = this.props.store.getState()
      const counter = state.counter
      return (
      ...
    }
```

</details>

* Once you have assigned the counter from the store, check to make sure that it is correctly hooked up by changing the initial value of the counter in the initial state (in our `index.js`).

* `ADD and COMMIT your changes`

</details>

#### User Story 2: I want the ability to 'INCREMENT' the counter, so I can actually count things

* In the `Counter.jsx` there are two buttons, one used to 'INCREMENT', and the other used to 'DECREMENT' the counter. For now let's just focus on the 'INCREMENT' button. The button has an `onClick` event handler that invokes the `increment` function  however, the function is currently empty. Use the `store` that has been passed down in props to dispatch an 'INCREMENT' action (remember what an action is?).

<details><summary>More Help</summary>

* In the `increment` function within `Counter.jsx`, use the store's dispatch function (`this.props.store.dispatch()`) to dispatch an action `{type: 'INCREMENT'}` to the redux store.

<details><summary>Solution</summary>

```js
  increment () {
    this.props.store.dispatch({ type: 'INCREMENT' })
  }
```

</details>

* Once you have dispatched the action, use the Redux Dev Tools to check that the action is being dispatched to the store.

* Now that we have dispatched the action, we need update our reducer (which we use to specify how the store state changes). Remember, that our reducer needs to check the action that is being performed, and return the new state. Also keep in mind that we shouldn't mutate state directly, and we need to retain other properties that we are not updating (remember the object spread operator).

<details><summary>More Help</summary>

* Create another `case` in the reducer's `switch` statement in `index.js`. The case should be the same as the type when we created 

</details>

1. Once we have updated the reducer, we should see the counter increment when we press the `increment` button.

1. `ADD and COMMIT your changes`

</details>

#### User Story 3: I want the ability to 'DECREMENT' the counter, in case I have made a mistake and reduce the counter

<details><summary>More Help</summary>

1. This one should be pretty easy, given that we have just implemented the 'INCREMENT' action. Make sure to dispatch an action in the `Counter.jsx` and update our reducer to handle our new 'DECREMENT' action to update our state appropriately.

</details>

### Todo List

#### User Story 4: I want the ability to view todos, so I can view all the things I have to tick off my list

<details><summary>More Information</summary>

1. Now that our counter works, let's work on our todo list. In `Todos.jsx` you will see that the render function is currently displaying the todo list as an empty array (not ideal). Use the store passed into this component to get the todos from the redux state, which will display the todos on the page.

2. 

</details>

### Stretch Features

1. Let's do some refactoring:
    1. Our actions are currently object literals, but we should probably be using [action creators](http://redux.js.org/docs/api/combineReducers.html) instead. Create an `actions.js` file and convert our actions to action creators.
    1. Move the reducer from `index.js` into it's own reducer file
    1. Currently there is one reducer, however, the `counter` and `todos` should really be in two separate reducers (since they are not related). Separate the `counter` and `todos` into two separate reducers. You will need to use the [combineReducers](http://redux.js.org/docs/api/combineReducers.html) function to join the two reducers together before using it to create a store.
