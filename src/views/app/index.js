import React, { Suspense } from 'react';
import { Route, useRouteMatch, Routes, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
// const Pages = React.lazy(() =>
//   import(/* webpackChunkName: "pages" */ './pages')
// );
// const Applications = React.lazy(() =>
//   import(/* webpackChunkName: "applications" */ './applications')
// );
// const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
// const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
// const BlankPage = React.lazy(() =>
//   import(/* webpackChunkName: "blank-page" */ './blank-page')
// );

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Routes>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              element={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              element={(props) => <Applications {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            {/* <Route
              path={`${match.url}/pages`}
              element={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              element={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              element={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              element={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" /> */}
          </Routes>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default useRouteMatch(connect(mapStateToProps, {})(App));
