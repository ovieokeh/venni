import React from 'react'
import { Empty } from 'antd'

interface Props {
  description: string
}

const EmptyContainer: React.FC<Props> = props => (
  <div className="no-data" style={{ margin: '5%' }}>
    <Empty description={props.description} />
  </div>
)

export default EmptyContainer
