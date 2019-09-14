import React from 'react'
import { connect } from 'react-redux'
import { Drawer as AntDrawer, Icon } from 'antd'
import Profile from '../Profile/Profile'
import { hideDrawer as closeDrawer } from 'src/redux/actions/drawer/drawerActions'
import './Drawer.less'
import { Dispatch } from 'redux'
import { ReduxState } from 'src/redux/types'

interface Props {
  showDrawer: boolean
  hideDrawer: () => void
}

const Drawer: React.FC<Props> = ({ showDrawer, hideDrawer }) => {
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
        width="100%"
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
