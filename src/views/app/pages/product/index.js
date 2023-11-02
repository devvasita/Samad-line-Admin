import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const DataList = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './data-list')
);
const DataView = React.lazy(() =>
  import(/* webpackChunkName: "product-data-list" */ './data-view')
);
const ImageList = React.lazy(() =>
  import(/* webpackChunkName: "product-image-list" */ './image-list')
);
const ThumbList = React.lazy(() =>
  import(/* webpackChunkName: "product-thumb-list" */ './thumb-list')
);
const Details = React.lazy(() =>
  import(/* webpackChunkName: "product-details" */ './details')
);
const DetailsAlt = React.lazy(() =>
  import(/* webpackChunkName: "product-details-alt" */ './details-alt')
);

const PagesProduct = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/data-list`} />
      <Route
        path={`${match.url}/data-list`}
        element={(props) => <DataList {...props} />}
      />
      <Route
        path={`${match.url}/data-view`}
        element={(props) => <DataView {...props} />}
      />
      <Route
        path={`${match.url}/image-list`}
        element={(props) => <ImageList {...props} />}
      />
      <Route
        path={`${match.url}/thumb-list`}
        element={(props) => <ThumbList {...props} />}
      />
      <Route
        path={`${match.url}/details`}
        element={(props) => <Details {...props} />}
      />
      <Route
        path={`${match.url}/details-alt`}
        element={(props) => <DetailsAlt {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default PagesProduct;
