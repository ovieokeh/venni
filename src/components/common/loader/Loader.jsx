import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Spin, notification } from 'antd';

const Loader = (props) => {
  const {
    isLoading, children, type, message,
  } = props;
  const [loading, setState] = useState(isLoading);

  useEffect(() => {
    if (type && !loading) {
      notification[type]({
        message,
      });
    }
  }, [type, loading]);

  useEffect(() => {
    setState(isLoading);
  }, [isLoading]);

  return (
    <Spin spinning={loading}>
      {children}
    </Spin>
  );
};

Loader.propTypes = {
  isLoading: propTypes.bool.isRequired,
  children: propTypes.instanceOf(Object).isRequired,
  type: propTypes.string,
  message: propTypes.string,
};

Loader.defaultProps = {
  type: '',
  message: '',
};

const mapStateToProps = state => ({
  isLoading: state.loader.isLoading,
  type: state.loader.type,
  message: state.loader.message,
});

const ConnectedLoader = connect(mapStateToProps)(Loader);

export default ConnectedLoader;
