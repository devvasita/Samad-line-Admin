import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const Faq = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-faq" */ './faq')
);
const Invoice = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-invoice" */ './invoice')
);
const KnowledgeBase = React.lazy(() =>
  import(
    /* webpackChunkName: "miscellaneous-knowledge-base" */ './knowledge-base'
  )
);
const Mailing = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-mailing" */ './mailing')
);
const Prices = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-prices" */ './prices')
);
const Search = React.lazy(() =>
  import(/* webpackChunkName: "miscellaneous-search" */ './search')
);

const PagesMiscellaneous = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/faq`} />
      <Route path={`${match.url}/faq`} element={(props) => <Faq {...props} />} />
      <Route
        path={`${match.url}/invoice`}
        element={(props) => <Invoice {...props} />}
      />
      <Route
        path={`${match.url}/knowledge-base`}
        element={(props) => <KnowledgeBase {...props} />}
      />
      <Route
        path={`${match.url}/mailing`}
        element={(props) => <Mailing {...props} />}
      />
      <Route
        path={`${match.url}/prices`}
        element={(props) => <Prices {...props} />}
      />
      <Route
        path={`${match.url}/search`}
        element={(props) => <Search {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default PagesMiscellaneous;
