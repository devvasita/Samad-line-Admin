import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const ThirdLevel1 = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-1" */ './third-level-1')
);
const ThirdLevel2 = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './third-level-2')
);
const ThirdLevel3 = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './third-level-3')
);

const MenuLevels = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/third-level-1`}
      />
      <Route
        path={`${match.url}/third-level-1`}
        element={(props) => <ThirdLevel1 {...props} />}
      />
      <Route
        path={`${match.url}/third-level-2`}
        element={(props) => <ThirdLevel2 {...props} />}
      />
      <Route
        path={`${match.url}/third-level-3`}
        element={(props) => <ThirdLevel3 {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default MenuLevels;
