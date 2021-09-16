import React from 'react'

import {UserOutlined} from '@ant-design/icons'

import {TabRoute} from '../types'

const Page1 = React.lazy(() => import('./page1'))
const Page2 = React.lazy(() => import('./page2'))
const Page3 = React.lazy(() => import('./page3'))

const routes: TabRoute[] = [
  {
    path: '/home/page1',
    title: 'Page 1',
    Icon: UserOutlined,
    component: Page1,
  },
  {
    path: '/home/part1/',
    title: 'Part 1',
    children: [
      {
        path: '/home/part1/page2/',
        title: 'Page 2',
        component: Page2,
      },
      {
        path: '/home/part1/page3/',
        title: 'Page 3',
        component: Page3,
      },
    ],
  },
]

export default routes
