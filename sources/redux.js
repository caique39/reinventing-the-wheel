/**
 * Inspired by: https://redux.js.org
 *
 * At this moment, I never use Redux
 */

const usersReducer = (state = [], action = {}) => {
  switch (action.type) {
    case 'UPDATE_USERS':
      return [...state, ...(action.payload || [])]
    default:
      return state
  }
}

const counterReducer = (state = 0, action = {}) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const combineReducers = reducers => {
  const reducersKeys = Object.keys(reducers)

  return function combined(state, action) {
    return reducersKeys.reduce((acc, next) => {
      const currentState = state ? state[next] : state

      return {
        ...acc,
        [next]: reducers[next](currentState, action)
      }
    }, {})
  }
}

class Store {
  constructor(reducer, preloadedState) {
    this.reducer = reducer
    this.state = this.reducer(preloadedState)
  }

  dispatch(action = {}) {
    this.state = this.reducer(this.state, action)
  }

  getState() {
    return this.state
  }
}

const combinedStore = new Store(
  combineReducers({
    users: usersReducer,
    counter: counterReducer
  })
)

const fetchUsers = () => {
  combinedStore.dispatch({
    type: 'UPDATE_USERS',
    payload: [{ id: parseInt(Math.random() * 10, 10), nome: 'Caique' }]
  })
}

combinedStore.dispatch({
  type: 'INCREMENT'
})

fetchUsers()
fetchUsers()
fetchUsers()

console.log(JSON.stringify(combinedStore.getState(), null, 4))
