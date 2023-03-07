import React from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { useDispatch } from 'react-redux';
import { changePassword } from 'redux/actions';
// import { useEffect } from 'react';

function ChangePassword({ history, modalClose }) {
  const dispatch = useDispatch();
  // const { error } = useSelector((state) => state?.authUser);
  // const value = useSelector((state) => state?.authUser);
  // console.log(value, '----');
  // const [errorState,seterrorState]

  const onResetPassword = (values) => {
    const { newPassword, oldPassword } = values;
    if (newPassword && oldPassword) {
      dispatch(changePassword(values, history));
      modalClose();
    }
    //  const errors = "";
    // if(error){
    //   errors = error;
    // }
    // return errors;
  };

  const validateNewPassword = (values) => {
    const { newPassword, confirmNewPssword } = values;
    const errors = {};
    if (confirmNewPssword && newPassword !== confirmNewPssword) {
      errors.confirmNewPssword = 'Please check your new password';
    }
    return errors;
  };

  const handleCancel = () => {
    modalClose();
  };
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPssword: '',
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" sm="12" md="12" lg="12" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="form-side">
            <span className="logo-single" />

            <CardTitle className="mb-4">
              <IntlMessages id="Change Password" />
            </CardTitle>

            <Formik
              validate={validateNewPassword}
              initialValues={initialValues}
              onSubmit={onResetPassword}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    {/* {error ? (
                      <div className="invalid-feedback d-block">{error}</div>
                    ) : (
                      <div className="invalid-feedback d-block">
                        password change successfully
                      </div>
                    )} */}

                    <Label>
                      <IntlMessages id="Old Password" />
                    </Label>
                    <Field
                      className="form-control"
                      name="oldPassword"
                      type="password"
                    />
                    {errors.oldPassword && touched.oldPassword && (
                      <div className="invalid-feedback d-block">
                        {errors.oldPassword}
                      </div>
                    )}
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
                    {errors.oldPassword && touched.oldPassword && (
                      <div className="invalid-feedback d-block">
                        {errors.oldPassword}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="confirm Password" />
                    </Label>
                    <Field
                      className="form-control"
                      name="confirmNewPssword"
                      type="password"
                    />
                    {errors.confirmNewPssword && touched.confirmNewPssword && (
                      <div className="invalid-feedback d-block">
                        {errors.confirmNewPssword}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-end align-items-center">
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state mr-2 `}
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
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state `}
                      size="sm"
                      onClick={handleCancel}
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="CANCEL" />
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
