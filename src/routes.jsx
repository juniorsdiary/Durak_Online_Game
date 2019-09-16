import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MainPage, Lobby, PlayRoom } from 'Routes';

const Routes = () => {
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);
  const isInRoom = useSelector(state => state.authentication.isInRoom);
  return (
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/login' component={MainPage} />
      <PrivateRoute path='/lobby' component={Lobby} access={isAuthenticated} redirectPath={'/login'} />
      <PrivateRoute path='/room/:name' component={PlayRoom} access={isInRoom} redirectPath={'/login'} />
    </Switch>
  );
};
/* eslint-disable react/prop-types */
function PrivateRoute({ component: Component, access, redirectPath, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return access ? <Component {...props} /> : <Redirect to={redirectPath} />;
      }}
    />
  );
}
/* eslint-enable react/prop-types */
export default Routes;
