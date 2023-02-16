import React, { useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { loginUser } from 'redux/actions';
import { InputAdornment, IconButton } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

// const validatePassword = (value) => {
//   console.log({ value });
//   let error;
//   if (!value) {
//     error = 'Please enter your password';
//   } else if (value.length < 4) {
//     error = 'Value must be longer than 3 characters';
//   }
//   return error;
// };

// const validateEmail = (value) => {
//   let error;
//   if (!value) {
//     error = 'Please enter Mobile Number';
//   } else if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(value)) {
//     error = 'Invalid Mobile Number';
//   }
//   return error;
// };

const Login = ({ loading, error, loginUserAction }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);
  const history = useHistory();

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.mobile !== '' && values.password !== '') {
        loginUserAction(
          { mobileNo: values.mobile, password: values.password },
          history
        );
      }
    }
  };

  const initialValues = { mobile: '', password: '' };

  return (
    <Row className="h-100">
      <Colxx xxs="12" sm="12" md="12" lg="6" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="form-side">
            <span className="logo-single" />
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>
            <div>
              <Formik initialValues={initialValues} onSubmit={onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="Mobile Number" />
                      </Label>
                      <Field
                        className="form-control"
                        name="mobile"
                        // validate={validateEmail}
                        // component={TextField}
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{ outline: 'none' }}
                            >
                              <LocalPhoneIcon fontSize="default" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.mobile && touched.mobile && (
                        <div className="invalid-feedback d-block">
                          {errors.mobile}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Field
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        // validate={validatePassword}
                        // component={TextField}
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              style={{ outline: 'none' }}
                            >
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to="/user/forgot-password">
                        <IntlMessages id="Forgot Password?" />
                      </NavLink>
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          loading ? 'show-spinner' : ''
                        }`}
                        size="sm"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="user.login-button" />
                        </span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  position: 'absolute',
                  bottom: 15,
                  margin: '0 auto',
                  width: '74%',
                }}
              >
                Powered By, Rons Fitness
              </div>
            </div>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
