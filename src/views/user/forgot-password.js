import React, { useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { forgotPassword } from 'redux/actions';
import { InputAdornment } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { NotificationManager } from 'components/common/react-notifications';

const validatemobile = (value) => {
  let error;
  const phoneno = /^\d{10}$/;
  if (!value) {
    error = 'Please enter your Mobile ';
  } else if (!value.match(phoneno)) {
    error = 'Invalid Mobile Number';
  }
  return error;
};

const ForgotPassword = ({
  history,
  forgotUserMail,
  loading,
  error,
  forgotPasswordAction,
}) => {
  const onForgotPassword = (values) => {
    if (!loading) {
      if (values.mobile !== '') {
        localStorage.setItem(
          'mobileNo',
          JSON.stringify({
            mobileNo: values.mobile,
            resetPass: true,
          })
        );
        forgotPasswordAction(values.mobile, history);
      }
    }
  };

  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Forgot Password Error',
        3000,
        null,
        null,
        ''
      );
    } else if (!loading && forgotUserMail === 'success')
      NotificationManager.success(
        'Please check your phone.',
        'Forgot Password Success',
        3000,
        null,
        null,
        ''
      );
  }, [error, forgotUserMail, loading]);

  const initialValues = { mobile: '' };

  return (
    <Row className="h-100">
      <Colxx xxs="12" sm="12" md="12" lg="6" className="mx-auto my-auto">
        <Card className="auth-card">
          {/* <div className="position-relative image-side ">
            <></>
          </div> */}
          <div className="form-side">
            <span className="logo-single" />

            <CardTitle className="mb-4">
              <IntlMessages id="user.forgot-password" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onForgotPassword}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="Mobile" />
                    </Label>
                    <Field
                      className="form-control"
                      name="mobile"
                      validate={validatemobile}
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

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/">
                      <IntlMessages id="user.back-to-login-question" />
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
                        <IntlMessages id="user.reset-password-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
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
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(mapStateToProps, {
  forgotPasswordAction: forgotPassword,
})(ForgotPassword);
