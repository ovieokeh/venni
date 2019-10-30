import { createStore, compose } from 'redux'
import rootReducer from './reducers/rootReducer'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers()

const store = createStore(rootReducer, enhancer)

store.subscribe(() =>
  localStorage.setItem('store', JSON.stringify(store.getState()))
)

export default store
