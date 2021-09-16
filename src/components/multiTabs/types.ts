import React from 'react'

export interface TabProps {
  title: string
  tabKey?: string
  component?: React.LazyExoticComponent<any> | null
}
