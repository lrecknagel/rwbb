import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import components
import Welcome from './components/Welcome';
import PublicDetail from './components/PublicDetail';
import PrivateDetail from './components/PrivateDetail';

// import styles

const privateRouteRenderer = (token, Component, props) => {
  if (token !== null) {
    return (
      <Component {...props} />
    )
  } else {
    return (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  }
}

const PrivateRoute = inject('store')(observer( ({ store, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={ (props) => privateRouteRenderer('YOUR_AUTH_STORE_TOKEN_REF', Component, props)} />
  )
}));

const NotFound = ({ location }) => (
  <div className="default-wrapper">
    <h2>404 ... for <code>{location.pathname}</code>.</h2>
    <h4>This page cannot not found!</h4>
  </div>
)

@inject('store')
@observer
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/public" component={PublicDetail} />
        <PrivateRoute exact path="/private/:id" component={PrivateDetail} />
        <Route exact path="/" component={Welcome} />
        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default App;