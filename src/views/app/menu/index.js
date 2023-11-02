import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const MenuTypes = React.lazy(() =>
  import(/* webpackChunkName: "menu-types" */ './types')
);
const Levels = React.lazy(() =>
  import(/* webpackChunkName: "menu-levels" */ './levels')
);

const UI = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/types`} />
      <Route
        path={`${match.url}/types`}
        element={(props) => <MenuTypes {...props} />}
      />
      <Route
        path={`${match.url}/levels`}
        element={(props) => <Levels {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default UI;
