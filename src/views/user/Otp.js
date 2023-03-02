import React, { useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { NavLink, useHistory } from 'react-router-dom';
import { verifyOtp } from 'redux/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'components/common/react-notifications';

// const validateEmail = (value) => {
//   let error;
//   if (!value) {
//     error = 'Please enter your OTP';
//   } else if (
//     !/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(value)
//   ) {
//     error = 'Invalid email address';
//   } else if (value !== '987654') {
//     error = 'Invalid OTP';
//   }
//   return error;
// };

const Otp = ({ loading }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { mobileNo, resetPass } =
    JSON.parse(localStorage.getItem('mobileNo')) ?? {};

  const { error } = useSelector((state) => state?.authUser);

  const onVerifyOtp = (values) => {
    if (!loading) {
      if (values.otp !== '') {
        dispatch(verifyOtp({ mobileNo, otp: values.otp, resetPass }, history));
      }
    }
  };
  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);
  const initialValues = { otp: '' };
  return (
    <Row className="h-100">
      <Colxx xxs="12" sm="12" md="12" lg="6" className="mx-auto my-auto">
        <Card className="auth-card">
          {/* <div className="position-relative image-side ">
            <></>
          </div> */}
          <div className="form-side">
            <span className="logo-single" />

            <CardTitle className="mb-0 font-weight-bold">
              <IntlMessages id="OTP" />
            </CardTitle>
            <CardTitle className="mb-4">
              <IntlMessages id="user.otp-dec" />
              {mobileNo}
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onVerifyOtp}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.otp" />
                    </Label>

                    <Field
                      className="form-control"
                      name="otp"
                      type="number"
                      // validate={validateEmail}
                      maxlength={6}
                    />
                    {errors.otp && touched.otp && (
                      <div className="invalid-feedback d-block">
                        {errors.otp}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/">
                      <IntlMessages id="Change MobileNumber ?" />
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
                        <IntlMessages id="Verify" />
                      </span>
                    </Button>
                  </div>
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
                </Form>
              )}
            </Formik>
            {/* <Formik initialValues={initialValues} onSubmit={onUserLogin}>
            {({ errors, touched }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="user.email" />
                  </Label>
                  <Field
                    className="form-control"
                    name="email"
                    validate={validateEmail}
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </FormGroup>
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="user.password" />
                  </Label>
                  <Field
                    className="form-control"
                    type="password"
                    name="password"
                    validate={validatePassword}
                  />
                  {errors.password && touched.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to="/user/forgot-password">
                    <IntlMessages id="user.forgot-password-question" />
                  </NavLink>
                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    }`}
                    size="lg"
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
          </Formik> */}
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

export default Otp;
