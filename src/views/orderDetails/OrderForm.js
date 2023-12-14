/* eslint-disable jsx-a11y/label-has-associated-control */
// IMPORTS
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import { Button, Chip, FormHelperText, Grid, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import CustomInput from 'views/customerDetails/CustomInput';
import { useEffect } from 'react';
import API from 'API';
import { width } from '@mui/system';
import { grey } from '@mui/material/colors';
import OrderStatusSelect from './OrderStatusSelect';

//APP
export default function OrderForm({ userDetails, add, readOnly, setReadOnly, updateCandidate, assignOrder }) {
    //TAB STATES
    const navigate = useNavigate();
    const [distributors, setDistributors] = React.useState([]);

    useEffect(() => {
        (async () => {
            const {
                data: { data }
            } = await API.get('/admin/distributors');
            setDistributors(data);
        })();
    }, []);

    // GENDER SELECT STATES

    // FORM STATES

    //BUTTON STATES
    const [edit, update] = useState({
        required: true,
        disabled: true,
        isEdit: true
    });

    // EDIT -> UPDATE

    // TOGGLE PASSWORD VISIBILITY

    //RETURN
    return (
        <Card variant="outlined" sx={{ height: '100%', width: '100%', padding: 0, border: 'none' }}>
            <Formik
                initialValues={{
                    ...userDetails
                }}
                enableReinitialize
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (add) {
                            updateCandidate(values, navigate);
                        } else updateCandidate(userDetails._id, values, navigate);
                        setReadOnly(true);
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <CardContent
                            sx={{
                                p: 3,

                                textAlign: { xs: 'center', md: 'start' }
                            }}
                        >
                            <FormControl fullWidth>
                                <Grid container direction={{ xs: 'column', md: 'row' }} columnSpacing={5} rowSpacing={3}>
                                    <Grid item xs={6}>
                                        <CustomInput
                                            id="name"
                                            name="name"
                                            value={values.user?.firstName}
                                            title="Name"
                                            disabled={readOnly}
                                            error={touched.firstname && errors.firstname}
                                        />
                                        {touched.firstname && errors.firstname && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.firstname}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomInput
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={values.user?.email}
                                            title="Email Address"
                                            disabled={readOnly}
                                            error={touched.email && errors.email}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {' '}
                                        <CustomInput
                                            id="phone"
                                            name="mobileNo"
                                            value={values.user?.mobileNo}
                                            title="Phone No."
                                            disabled={readOnly}
                                            error={touched.mobileNo && errors.mobileNo}
                                        />
                                        {touched.mobileNo && errors.mobileNo && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.mobileNo}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={6} sx={{ '&>div': { marginBottom: '24px' } }}>
                                        <CustomInput
                                            id="phone"
                                            name="order_id"
                                            value={'#' + values._id}
                                            title="Order ID"
                                            disabled={readOnly}
                                            error={touched.order_id && errors.order_id}
                                        />
                                        {touched.order_id && errors.order_id && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.order_id}
                                            </FormHelperText>
                                        )}
                                    </Grid>{' '}
                                    <Grid container item xs={6} spacing={2}>
                                        <Grid item sm={12} xs={12}>
                                            <CustomInput
                                                id="Address"
                                                name="address"
                                                // onBlur={handleBlur}
                                                // onChange={handleChange}
                                                disabled={readOnly}
                                                value={
                                                    values.shippingAddress &&
                                                    values.shippingAddress.addressLine1 + values.shippingAddress.addressLine2
                                                }
                                                title="Address"
                                                multiline
                                                minRows={7}
                                            />{' '}
                                            {touched.address && errors.address && (
                                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                                    {errors.address}
                                                </FormHelperText>
                                            )}
                                        </Grid>
                                    </Grid>{' '}
                                    <Grid item xs={6} sx={{ '&>div': { marginBottom: '24px' } }}>
                                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Order Status</label>
                                        <OrderStatusSelect value={values.currentOrderStatus?.status} _id={userDetails._id} />
                                    </Grid>
                                    <button type="submit" id="customerSubmit" style={{ display: 'none', opacity: 0 }} />
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </form>
                )}
            </Formik>
        </Card>
    );
}
