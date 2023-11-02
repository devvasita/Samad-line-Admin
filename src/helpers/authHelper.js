import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route , useNavigate } from 'react-router-dom';
import { getUserDetails } from 'redux/actions';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
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
        <Route
         element={<Navigate to="/" />}
        />
      );
    }
    return (
      <Route
       element={<Navigate to="/" />}
      />
    );
  };

  return <Route {...rest}  element={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
