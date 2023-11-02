import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);
const ContentDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ './content')
);
const AnalyticsDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-analytics" */ './analytics')
);
const EcommerceDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './ecommerce')
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        element={(props) => <DashboardDefault {...props} />}
      />
      <Route
        path={`${match.url}/content`}
        element={(props) => <ContentDefault {...props} />}
      />
      <Route
        path={`${match.url}/ecommerce`}
        element={(props) => <EcommerceDefault {...props} />}
      />
      <Route
        path={`${match.url}/analytics`}
        element={(props) => <AnalyticsDefault {...props} />}
      />
      {/*
      <ProtectedRoute
        path={`${match.url}/default`}
        component={DashboardDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/content`}
        component={ContentDefault}
        roles={[UserRole.Admin]}
      />
      <ProtectedRoute
        path={`${match.url}/ecommerce`}
        component={EcommerceDefault}
        roles={[UserRole.Editor]}
      />
      <ProtectedRoute
        path={`${match.url}/analytics`}
        component={AnalyticsDefault}
        roles={[UserRole.Editor]}
      />
      */}

      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default Dashboards;
