import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const Portfolio = React.lazy(() =>
  import(/* webpackChunkName: "profile-portfolio" */ './portfolio')
);
const Social = React.lazy(() =>
  import(/* webpackChunkName: "profile-social" */ './social')
);

const PagesProfile = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/portfolio`} />
      <Route
        path={`${match.url}/portfolio`}
        element={(props) => <Portfolio {...props} />}
      />
      <Route
        path={`${match.url}/social`}
        element={(props) => <Social {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default PagesProfile;
