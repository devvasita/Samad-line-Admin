/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CategoryDetails from './CategoryDetails';
import 'cropperjs/dist/cropper.css';

const Todo = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './todo')
);

const Brand = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './Brand')
);
const Blog = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './Blog')
);

const BlogDetails = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './BlogDetails')
);
const AddBlog = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './AddBlog')
);

const EditBlog = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './EditBlog')
);
const EditOffer = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './EditOffer')
);

const ViewOffer = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './ViewOffer')
);
const AddOffer = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './AddOffer')
);

const Offers = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './Offers')
);
const Category = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './Category')
);
const Survey = React.lazy(() =>
  import(/* webpackChunkName: "application-survey" */ './survey')
);
const SurveyDetail = React.lazy(() =>
  import(/* webpackChunkName: "application-survey-detail" */ './survey-detail')
);
const Chat = React.lazy(() =>
  import(/* webpackChunkName: "application-chat" */ './chat')
);
const AddProduct = React.lazy(() =>
  import(/* webpackChunkName: "application-chat" */ './AddProduct')
);
const EditProduct = React.lazy(() =>
  import(/* webpackChunkName: "application-chat" */ './EditProduct')
);
const Product = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './Product')
);

const ViewProduct = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './ViewProduct')
);
const Orders = React.lazy(() =>
  import(/* webpackChunkName: "application-todo" */ './Orders')
);

const OrderDetails = React.lazy(() => import('./OrderDetails'));

const Applications = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/todo`} />
      <Route
        path={`${match.url}/todo`}
        render={(props) => <Todo {...props} />}
      />
      <Route
        exact
        path={`${match.url}/brand`}
        render={(props) => <Brand {...props} />}
      />
      <Route
        exact
        path={`${match.url}/category`}
        render={(props) => <Category {...props} />}
      />
      <Route
        exact
        path={`${match.url}/category/:id`}
        render={(props) => <CategoryDetails {...props} />}
      />
      <Route
        path={`${match.url}/blog`}
        exact
        render={(props) => <Blog {...props} />}
      />
      <Route
        exact
        path={`${match.url}/blog/:id`}
        render={(props) => <BlogDetails {...props} />}
      />
      <Route
        path={`${match.url}/addblog`}
        render={(props) => <AddBlog {...props} />}
      />

      <Route
        exact
        path={`${match.url}/blog/edit/:id`}
        render={(props) => <EditBlog {...props} />}
      />

      <Route
        path={`${match.url}/addOffer`}
        render={(props) => <AddOffer {...props} />}
      />
      <Route
        path={`${match.url}/addProduct`}
        render={(props) => <AddProduct {...props} />}
      />

      <Route
        path={`${match.url}/editProduct/:id`}
        render={(props) => <EditProduct {...props} />}
      />
      <Route
        path={`${match.url}/editOffer/:id`}
        render={(props) => <EditOffer {...props} />}
      />

      <Route
        path={`${match.url}/viewOffer/:id`}
        render={(props) => <ViewOffer {...props} />}
      />
      <Route
        path={`${match.url}/Offers`}
        render={(props) => <Offers {...props} />}
      />
      <Route
        path={`${match.url}/survey/:surveyid`}
        render={(props) => <SurveyDetail {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/survey`}
        render={(props) => <Survey {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/chat`}
        render={(props) => <Chat {...props} />}
      />
      <Route
        path={`${match.url}/product`}
        render={(props) => <Product {...props} />}
      />
      <Route
        path={`${match.url}/viewproduct/:id`}
        render={(props) => <ViewProduct {...props} />}
      />
      <Route
        exact
        path={`${match.url}/orders`}
        render={(props) => <Orders {...props} />}
      />
      <Route
        exact
        path={`${match.url}/orders/:id`}
        render={(props) => <OrderDetails {...props} />}
      />

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Applications;
