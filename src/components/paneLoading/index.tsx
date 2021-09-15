import {Spin} from 'antd'
import React from 'react'

import {LoadingOutlined} from '@ant-design/icons'

const PaneLoading: React.FC<{content?: string}> = ({content}) => {
  return (
    // TODO: fix height
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <Spin size="large" indicator={<LoadingOutlined spin />} />
      <div style={{fontWeight: 'bold'}}>{content ?? 'Loading...'}</div>
    </div>
  )
}

export default PaneLoading
