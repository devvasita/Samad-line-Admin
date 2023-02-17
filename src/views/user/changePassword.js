import React from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changePassword } from 'redux/actions';

function ChangePassword({ history }) {
  const dispatch = useDispatch();
  const onResetPassword = (values) => {
    const { newPassword, oldPassword } = values;
    if (newPassword && oldPassword) {
      dispatch(changePassword(values, history));
    }
  };

  const validateNewPassword = (values) => {
    const { newPassword, newPasswordAgain } = values;
    const errors = {};
    if (newPasswordAgain && newPassword !== newPasswordAgain) {
      errors.newPasswordAgain = 'Please check your new password';
    }
    return errors;
  };
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: '',
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" sm="12" md="12" lg="6" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="form-side">
            <span className="logo-single" />

            <CardTitle className="mb-4">
              <IntlMessages id="user.reset-password" />
            </CardTitle>

            <Formik
              validate={validateNewPassword}
              initialValues={initialValues}
              onSubmit={onResetPassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="Old Password" />
                    </Label>
                    <Field
                      className="form-control"
                      name="oldPassword"
                      type="password"
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.new-password" />
                    </Label>
                    <Field
                      className="form-control"
                      name="newPassword"
                      type="password"
                    />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.new-password-again" />
                    </Label>
                    <Field
                      className="form-control"
                      name="newPasswordAgain"
                      type="password"
                    />
                    {errors.newPasswordAgain && touched.newPasswordAgain && (
                      <div className="invalid-feedback d-block">
                        {errors.newPasswordAgain}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/">
                      <IntlMessages id="user.login-title" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state `}
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
}

export default ChangePassword;
