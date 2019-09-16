import store from 'src/redux/store'

const isLoggedIn = () => store.getState().auth.token
export default isLoggedIn
