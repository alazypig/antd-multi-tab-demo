import {Layout, Menu} from 'antd'
import React from 'react'
import {useLocation, useHistory} from 'react-router-dom'

import MultiTabs, {routesMap} from '../../components/multiTabs'
import routes from '../../pages'
import {TabRoute} from '../../types'

const Home: React.FC = () => {
  const history = useHistory()
  const location = useLocation()

  const paths = location.pathname.split('/').filter((i) => i)
  const [openKeys, setOpenKeys] = React.useState<string[]>(() => {
    if (paths.length > 1) {
      const res: string[] = []

      paths.reduce((p, c, i) => {
        if (i < paths.length - 1) {
          const path = p + '/' + c
          if (i > 0) {
            res.push(path)
          }

          return path
        }
        return p
      }, '')

      return res
    }

    return []
  })

  const recursionRoute = (routes: TabRoute[]) => {
    if (!routes) return null

    return routes.map((route) => {
      if (!route.children && route.component) {
        routesMap.set(route.path, {
          title: route.title,
          tabKey: route.path,
          component: route.component,
        })
      }

      if (route.children) {
        return (
          <Menu.SubMenu
            key={route.path}
            title={route.title}
            icon={route.Icon ? <route.Icon /> : null}>
            {recursionRoute(route.children)}
          </Menu.SubMenu>
        )
      }

      return (
        <Menu.Item
          onClick={() => history.push(route.path)}
          key={route.path}
          title={route.title}
          icon={route.Icon ? <route.Icon /> : null}>
          {route.title}
        </Menu.Item>
      )
    })
  }

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Layout.Sider>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          onOpenChange={(key) => setOpenKeys(key as string[])}
          openKeys={openKeys}
          mode="inline">
          {recursionRoute(routes)}
        </Menu>
      </Layout.Sider>

      <Layout>
        <Layout.Header style={{backgroundColor: '#fff', fontWeight: 'bold'}}>
          Antd-Multi-Tabs-Demo
        </Layout.Header>

        <Layout.Content>
          <MultiTabs />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Home
