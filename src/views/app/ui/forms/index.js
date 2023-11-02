import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const Components = React.lazy(() =>
  import(/* webpackChunkName: "forms-components" */ './components')
);
const Layouts = React.lazy(() =>
  import(/* webpackChunkName: "forms-layouts" */ './layouts')
);
const Validations = React.lazy(() =>
  import(/* webpackChunkName: "forms-validations" */ './validations')
);
const Wizard = React.lazy(() =>
  import(/* webpackChunkName: "forms-wizard" */ './wizard')
);

const Forms = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/components`} />
      <Route
        path={`${match.url}/components`}
        element={(props) => <Components {...props} />}
      />
      <Route
        path={`${match.url}/layouts`}
        element={(props) => <Layouts {...props} />}
      />
      <Route
        path={`${match.url}/validations`}
        element={(props) => <Validations {...props} />}
      />
      <Route
        path={`${match.url}/wizard`}
        element={(props) => <Wizard {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default Forms;
