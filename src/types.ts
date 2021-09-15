import React from 'react'

export type TabRoute = {
  path: string
  title: string
  Icon?: any
  children?: TabRoute[]

  // TODO: completion type
  component?: React.LazyExoticComponent<any>

  // TODO: props
  props?: any
}
