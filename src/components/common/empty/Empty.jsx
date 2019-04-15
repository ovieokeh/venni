import React from 'react';
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

export default EmptyContainer;
