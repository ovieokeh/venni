import store from 'src/redux/store'

export const isLoggedIn = () => store.getState().auth.token
