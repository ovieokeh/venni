import React from 'react';
import propTypes from 'prop-types';
import { Empty } from 'antd';
import './Empty.less';

function EmptyContainer({ description }) {
  return (
    <div className="no-data">
      <Empty
        description={description}
      />
    </div>
  );
}

EmptyContainer.propTypes = {
  description: propTypes.string.isRequired,
};

export default EmptyContainer;
