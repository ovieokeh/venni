function hydrate(key: string, initialState: any) {
  try {
    const remember = window.localStorage.getItem('remember')
    if (!remember) return initialState

    const store = window.localStorage.getItem('store') as string
    const state = JSON.parse(store)[key]

    console.log(`${key} hydrated`)
    return state
  } catch (error) {
    return initialState
  }
}

export default hydrate
