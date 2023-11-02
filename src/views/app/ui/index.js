import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const Forms = React.lazy(() =>
  import(/* webpackChunkName: "ui-forms" */ './forms')
);
const Components = React.lazy(() =>
  import(/* webpackChunkName: "ui-components" */ './components')
);

const UI = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/forms`} />
      <Route
        path={`${match.url}/forms`}
        element={(props) => <Forms {...props} />}
      />
      <Route
        path={`${match.url}/components`}
        element={(props) => <Components {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default UI;
