import { drawerReducer } from './drawerReducer'
import { SHOW_DRAWER, HIDE_DRAWER } from '../../types'

const initialState = {
  showDrawer: false
}

describe('Drawer reducer', () => {
  it('should return the initial state', () => {
    expect(drawerReducer(undefined, {} as any)).toEqual(initialState)
  })

  it('should handle SHOW_DRAWER', () => {
    initialState.showDrawer = true
    expect(drawerReducer(undefined, { type: SHOW_DRAWER })).toEqual(
      initialState
    )
  })

  it('should handle HIDE_DRAWER', () => {
    initialState.showDrawer = false

    expect(drawerReducer(undefined, { type: HIDE_DRAWER })).toEqual(
      initialState
    )
  })
})
