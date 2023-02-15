import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUserDetails } from 'redux/actions';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getUserDetails());
  }, [dispatch]);

  const token = localStorage.getItem('auth_token');
  const setComponent = (props) => {
    if (token) {
      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    );
  };

  return <Route {...rest} render={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
