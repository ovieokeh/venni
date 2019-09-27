import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Drawer as AntDrawer, Icon } from 'antd'
import Profile from '../Profile/Profile'
import { hideDrawer as closeDrawer } from 'src/redux/actions/drawer/drawerActions'
import { ReduxState } from 'src/redux/types'
import isMobile from 'src/utilities/isMobile'
import './Drawer.less'

interface Props {
  showDrawer: boolean
  hideDrawer: () => void
}

export const Drawer: React.FC<Props> = ({ showDrawer, hideDrawer }) => {
  return (
    <div className="drawer">
      <AntDrawer
        title={
          <div className="profile-header">
            <Icon className="drawer__profile-icon" type="profile" />
            Your Profile
          </div>
        }
        placement="right"
        width={isMobile() ? '100%' : '40%'}
        onClose={hideDrawer}
        visible={showDrawer}
      >
        <Profile />
      </AntDrawer>
    </div>
  )
}

/* istanbul ignore next */
const mapStateToProps = (state: ReduxState) => ({
  showDrawer: state.drawer.showDrawer
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hideDrawer: () => dispatch(closeDrawer())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer)
