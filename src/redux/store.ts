import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const middlewares = [thunk]

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(...middlewares))

const store = createStore(rootReducer, enhancer)

store.subscribe(() =>
  localStorage.setItem('store', JSON.stringify(store.getState()))
)

export default store
