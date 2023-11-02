/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense } from 'react';
import {   Route, Switch } from 'react-router-dom';
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
    <Routes>
      {/* <Redirect exact from={`${match.url}/`} to={`${match.url}/todo`} /> */}
      <Route
        path={`${match.url}/todo`}
        element={(props) => <Todo {...props} />}
      />
      <Route
        exact
        path={`${match.url}/brand`}
        element={(props) => <Brand {...props} />}
      />
      <Route
        exact
        path={`${match.url}/category`}
        element={(props) => <Category {...props} />}
      />
      <Route
        exact
        path={`${match.url}/category/:id`}
        element={(props) => <CategoryDetails {...props} />}
      />
      <Route
        path={`${match.url}/blog`}
        exact
        element={(props) => <Blog {...props} />}
      />
      <Route
        exact
        path={`${match.url}/blog/:id`}
        element={(props) => <BlogDetails {...props} />}
      />
      <Route
        path={`${match.url}/addblog`}
        element={(props) => <AddBlog {...props} />}
      />

      <Route
        exact
        path={`${match.url}/blog/edit/:id`}
        element={(props) => <EditBlog {...props} />}
      />

      <Route
        path={`${match.url}/addOffer`}
        element={(props) => <AddOffer {...props} />}
      />
      <Route
        path={`${match.url}/addProduct`}
        element={(props) => <AddProduct {...props} />}
      />

      <Route
        path={`${match.url}/editProduct/:id`}
        element={(props) => <EditProduct {...props} />}
      />
      <Route
        path={`${match.url}/editOffer/:id`}
        element={(props) => <EditOffer {...props} />}
      />

      <Route
        path={`${match.url}/viewOffer/:id`}
        element={(props) => <ViewOffer {...props} />}
      />
      <Route
        path={`${match.url}/Offers`}
        element={(props) => <Offers {...props} />}
      />
      <Route
        path={`${match.url}/survey/:surveyid`}
        element={(props) => <SurveyDetail {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/survey`}
        element={(props) => <Survey {...props} />}
        isExact
      />
      <Route
        path={`${match.url}/chat`}
        element={(props) => <Chat {...props} />}
      />
      <Route
        path={`${match.url}/product`}
        element={(props) => <Product {...props} />}
      />
      <Route
        path={`${match.url}/viewproduct/:id`}
        element={(props) => <ViewProduct {...props} />}
      />
      <Route
        exact
        path={`${match.url}/orders`}
        element={(props) => <Orders {...props} />}
      />
      <Route
        exact
        path={`${match.url}/orders/:id`}
        element={(props) => <OrderDetails {...props} />}
      />


                <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  </Suspense>
);
export default Applications;
