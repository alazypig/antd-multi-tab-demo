import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Home from '../layout/home'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
