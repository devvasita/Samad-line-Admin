import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const Product = React.lazy(() =>
  import(/* webpackChunkName: "pages-product" */ './product')
);
const Profile = React.lazy(() =>
  import(/* webpackChunkName: "pages-profile" */ './profile')
);
const Miscellaneous = React.lazy(() =>
  import(/* webpackChunkName: "pages-miscellaneous" */ './miscellaneous')
);
const Blog = React.lazy(() =>
  import(/* webpackChunkName: "pages-blog" */ './blog')
);

const Pages = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/product`} />
      <Route
        path={`${match.url}/product`}
        element={(props) => <Product {...props} />}
      />
      <Route
        path={`${match.url}/profile`}
        element={(props) => <Profile {...props} />}
      />
      <Route
        path={`${match.url}/blog`}
        element={(props) => <Blog {...props} />}
      />
      <Route
        path={`${match.url}/miscellaneous`}
        element={(props) => <Miscellaneous {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default Pages;
