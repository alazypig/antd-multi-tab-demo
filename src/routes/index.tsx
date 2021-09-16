import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Home from '../layout/home'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Redirect to="/home/page1" />
    </Switch>
  )
}

export default Routes
