import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MainPage, Lobby } from 'Routes';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/login' component={MainPage} />
      <PrivateRoute path='/lobby' component={Lobby} />
    </Switch>
  );
};
/* eslint-disable react/prop-types */
function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector(state => state.authentication);
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? <Component {...props} /> : <Redirect to={'/login'} />;
      }}
    />
  );
}
/* eslint-enable react/prop-types */
export default Routes;
