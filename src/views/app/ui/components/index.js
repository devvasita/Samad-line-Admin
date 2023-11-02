import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';

const Alerts = React.lazy(() =>
  import(/* webpackChunkName: "components-alerts" */ './alerts')
);
const Badges = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './badges')
);
const Buttons = React.lazy(() =>
  import(/* webpackChunkName: "components-buttons" */ './buttons')
);
const Cards = React.lazy(() =>
  import(/* webpackChunkName: "components-cards" */ './cards')
);
const Carousel = React.lazy(() =>
  import(/* webpackChunkName: "components-carousel" */ './carousel')
);
const Charts = React.lazy(() =>
  import(/* webpackChunkName: "components-charts" */ './charts')
);
const Collapse = React.lazy(() =>
  import(/* webpackChunkName: "components-collapse" */ './collapse')
);
const Dropdowns = React.lazy(() =>
  import(/* webpackChunkName: "components-dropdowns" */ './dropdowns')
);
const Editors = React.lazy(() =>
  import(/* webpackChunkName: "components-editors" */ './editors')
);
const Icons = React.lazy(() =>
  import(/* webpackChunkName: "components-icons" */ './icons')
);
const InputGroups = React.lazy(() =>
  import(/* webpackChunkName: "components-input-groups" */ './input-groups')
);
const Jumbotron = React.lazy(() =>
  import(/* webpackChunkName: "components-jumbotron" */ './jumbotron')
);
const Maps = React.lazy(() =>
  import(/* webpackChunkName: "components-maps" */ './maps')
);
const Modal = React.lazy(() =>
  import(/* webpackChunkName: "components-modal" */ './modal')
);
const Navigation = React.lazy(() =>
  import(/* webpackChunkName: "components-navigation" */ './navigation')
);
const PopoverTooltip = React.lazy(() =>
  import(
    /* webpackChunkName: "components-popover-tooltip" */ './popover-tooltip'
  )
);
const Sortable = React.lazy(() =>
  import(/* webpackChunkName: "components-sortable" */ './sortable')
);
const Tables = React.lazy(() =>
  import(/* webpackChunkName: "components-tables" */ './tables')
);

const Components = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Routes>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/alerts`} />
      <Route
        path={`${match.url}/alerts`}
        element={(props) => <Alerts {...props} />}
      />
      <Route
        path={`${match.url}/badges`}
        element={(props) => <Badges {...props} />}
      />
      <Route
        path={`${match.url}/buttons`}
        element={(props) => <Buttons {...props} />}
      />
      <Route
        path={`${match.url}/cards`}
        element={(props) => <Cards {...props} />}
      />
      <Route
        path={`${match.url}/carousel`}
        element={(props) => <Carousel {...props} />}
      />
      <Route
        path={`${match.url}/charts`}
        element={(props) => <Charts {...props} />}
      />
      <Route
        path={`${match.url}/collapse`}
        element={(props) => <Collapse {...props} />}
      />
      <Route
        path={`${match.url}/dropdowns`}
        element={(props) => <Dropdowns {...props} />}
      />
      <Route
        path={`${match.url}/editors`}
        element={(props) => <Editors {...props} />}
      />
      <Route
        path={`${match.url}/icons`}
        element={(props) => <Icons {...props} />}
      />
      <Route
        path={`${match.url}/input-groups`}
        element={(props) => <InputGroups {...props} />}
      />
      <Route
        path={`${match.url}/jumbotron`}
        element={(props) => <Jumbotron {...props} />}
      />
      <Route
        path={`${match.url}/maps`}
        element={(props) => <Maps {...props} />}
      />
      <Route
        path={`${match.url}/modal`}
        element={(props) => <Modal {...props} />}
      />
      <Route
        path={`${match.url}/navigation`}
        element={(props) => <Navigation {...props} />}
      />
      <Route
        path={`${match.url}/popover-tooltip`}
        element={(props) => <PopoverTooltip {...props} />}
      />
      <Route
        path={`${match.url}/sortable`}
        element={(props) => <Sortable {...props} />}
      />
      <Route
        path={`${match.url}/tables`}
        element={(props) => <Tables {...props} />}
      />
      <Redirect to="/error" />
    </Routes>
  </Suspense>
);
export default Components;
