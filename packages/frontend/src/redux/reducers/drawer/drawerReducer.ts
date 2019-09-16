import { DrawerTypes, SHOW_DRAWER, HIDE_DRAWER, DrawerState } from '../../types'

const initialState: DrawerState = {
  showDrawer: false
}

export function drawerReducer(
  state: DrawerState = initialState,
  action: DrawerTypes
): DrawerState {
  switch (action.type) {
    case SHOW_DRAWER:
      return {
        showDrawer: true
      }

    case HIDE_DRAWER:
      return {
        showDrawer: false
      }

    default:
      return state
  }
}
