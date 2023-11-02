import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const BlogList = React.lazy(() =>
  import(/* webpackChunkName: "blog-list" */ './blog-list')
);

const BlogDetail = React.lazy(() =>
  import(/* webpackChunkName: "blog-detail" */ './blog-detail')
);

const PagesBlog = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/blog-list`} />
      <Route
        path={`${match.url}/blog-list`}
        element={(props) => <BlogList {...props} />}
      />
      <Route
        path={`${match.url}/blog-detail`}
        element={(props) => <BlogDetail {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default PagesBlog;
