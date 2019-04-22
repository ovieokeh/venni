import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  Spin, notification, Drawer, Icon,
} from 'antd';
import { closeProfileDrawer } from 'actions/loader/loaderActions';
import { Profile } from 'components/container';

function Loader(props) {
  const {
    loading, children, type,
    message, profileDrawerOpen, closeDrawer,
    user,
  } = props;
  const [drawerVisibility, setDrawerVisibility] = useState(profileDrawerOpen);

  useEffect(() => {
    if (type && !loading) {
      notification.config({ placement: 'topLeft' });
      notification[type]({
        message,
      });
    }
  }, [type, loading]);

  useEffect(() => {
    setDrawerVisibility(profileDrawerOpen);
  }, [profileDrawerOpen]);

  return (
    <React.Fragment>
      <Spin spinning={loading}>
        {children}
      </Spin>
      {
        user
          ? (
            <Drawer
              title={(
                <div className="profile-header">
                  <Icon type="solution" />
                  <span>Your Profile</span>
                </div>
              )}
              placement="right"
              width="600px"
              onClose={() => closeDrawer()}
              visible={drawerVisibility}
            >
              <Profile user={user} />
            </Drawer>
          ) : null
      }
    </React.Fragment>
  );
}

Loader.propTypes = {
  loading: propTypes.bool.isRequired,
  children: propTypes.instanceOf(Object).isRequired,
  type: propTypes.string,
  message: propTypes.string,
  profileDrawerOpen: propTypes.bool.isRequired,
  closeDrawer: propTypes.func.isRequired,
  user: propTypes.instanceOf(Object),
};

Loader.defaultProps = {
  type: '',
  message: '',
  user: null,
};

const mapStateToProps = state => ({
  loading: state.loader.isLoading,
  type: state.loader.type,
  message: state.loader.message,
  profileDrawerOpen: state.loader.profileDrawerOpen,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  closeDrawer: () => dispatch(closeProfileDrawer()),
});

const ConnectedLoader = connect(mapStateToProps, mapDispatchToProps)(Loader);

export default ConnectedLoader;
