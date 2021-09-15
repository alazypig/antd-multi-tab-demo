import {Tabs} from 'antd'
import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'

import PaneLoading from '../paneLoading'
import {TabProps} from './types'

export const routesMap = new Map<string, TabProps>()

const MultiTabs: React.FC = () => {
  const location = useLocation()
  const history = useHistory<{rerender: false}>()
  const [panes, setPane] = React.useState<TabProps[]>([])

  const rerender = history.location.state?.rerender ?? true
  const path = location.pathname

  const component = React.useMemo(
    () =>
      routesMap.get(path) ?? {
        title: 'Not found',
        component: null,
        tabKey: 'NOT_FOUND',
      },
    [path],
  )

  const paneFactory = React.useCallback(
    (panes: TabProps[]) => {
      console.log(rerender, panes)
      if (!rerender && panes.length) return panes

      if (panes.length) {
        const index = panes.findIndex((i) => i.tabKey === path)

        if (index !== -1) {
          if (rerender) {
            console.log('here', panes[index])
            const component = panes[index].component

            panes[index].component = null

            // TODO: Maybe we can inject something into the component to force update
            setTimeout(() => {
              setPane((p) => {
                p[index].component = component

                return [...p]
              })
            }, 0)

            return [...panes]
          }

          return panes
        }
      }

      panes.push({
        title: component.title,
        tabKey: component.tabKey,
        component: component.component,
      })

      return [...panes]
    },
    [rerender, component, path],
  )

  const removeTab = (key: string) => {
    setPane([...panes.filter((i) => i.tabKey !== key)])
  }

  React.useEffect(() => {
    setPane(paneFactory)
  }, [paneFactory])

  return (
    <Tabs
      type="editable-card"
      onChange={(path: string) => history.push(path, {rerender: false})}
      activeKey={location.pathname}
      onEdit={(key, action) =>
        action === 'remove' ? removeTab(key as string) : undefined
      }
      hideAdd>
      {panes.map((i) => {
        const Component = i.component

        return (
          <Tabs.TabPane
            tab={i.title}
            key={i.tabKey}
            closable={i.tabKey !== path}>
            <React.Suspense fallback={<PaneLoading />}>
              {Component ? (
                <div style={{padding: '10px 20px'}}>
                  <Component />
                </div>
              ) : null}
            </React.Suspense>
          </Tabs.TabPane>
        )
      })}
    </Tabs>
  )
}

export default MultiTabs
