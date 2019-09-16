import * as actions from './drawerActions'
import * as types from '../../types'

interface ExpectedAction {
  type: string
}

const expectedAction: ExpectedAction = {
  type: ''
}

describe('Drawer actions', () => {
  it('should handle SHOW_DRAWER', () => {
    expectedAction.type = types.SHOW_DRAWER
    expect(actions.showDrawer()).toEqual(expectedAction)
  })

  it('should handle HIDE_DRAWER', () => {
    expectedAction.type = types.HIDE_DRAWER

    expect(actions.hideDrawer()).toEqual(expectedAction)
  })
})
