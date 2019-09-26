import store from 'src/redux/store'

const isLoggedIn = () => !!store.getState().profile.id
export default isLoggedIn
