import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { getUserDetails } from 'redux/actions';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    authUser: { currentUser },
  } = useSelector((state) => state);

  useEffect(() => {
    if (!currentUser) dispatch(getUserDetails(history));
  }, [dispatch, history]);

  const token = localStorage.getItem('auth_token');
  const setComponent = (props) => {
    if (token) {
      return <Component {...props} />;
    }
    if (!token) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      );
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
