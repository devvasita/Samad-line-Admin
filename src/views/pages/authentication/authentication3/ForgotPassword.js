import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import Notification from 'utils/Notification';
// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import { Divider } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router';
import { authUser } from 'store/actions/userActions';
import { Link } from 'react-router-dom';

const ForgotPassword = ({ login, ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const url = process.env.REACT_APP_BASE_URL;

    return (
        <>
            <AuthWrapper1>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item>
                                            <Link to="#">
                                                <Logo />
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container direction="column" justifyContent="center" spacing={2}>
                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            alignItems: 'center',
                                                            display: 'flex'
                                                        }}
                                                    ></Box>
                                                </Grid>
                                                <Grid item xs={12} container alignItems="center" justifyContent="center">
                                                    <Box sx={{ mb: 2 }}>
                                                        <Typography variant="subtitle1">Enter your email to reset password</Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Formik
                                                initialValues={{
                                                    email: ''
                                                }}
                                                validationSchema={Yup.object().shape({
                                                    email: Yup.string()
                                                        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
                                                        .required('Email is required')
                                                })}
                                                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                                                    try {
                                                        axios
                                                            .post(`${url}/user/forgetpassword`, { email: values.email })
                                                            .then((response) => {
                                                                Notification('Success', 'Password has been sent to your mail');
                                                                console.log('Success', 'Password has been sent to your mail');
                                                                navigate('/');
                                                            });
                                                    } catch (err) {
                                                        setStatus({ success: false });
                                                        setErrors({ submit: err.message });
                                                        setSubmitting(false);
                                                    }
                                                }}
                                            >
                                                {({ errors, handleBlur, handleSubmit, handleChange, isSubmitting, touched, values }) => (
                                                    <form noValidate onSubmit={handleSubmit} {...others}>
                                                        <FormControl
                                                            fullWidth
                                                            error={Boolean(touched.email && errors.email)}
                                                            sx={{ ...theme.typography.customInput }}
                                                        >
                                                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-email-login"
                                                                type="email"
                                                                value={values.email}
                                                                name="email"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                label="Email Address"
                                                                inputProps={{}}
                                                            />
                                                            {touched.email && errors.email && (
                                                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                                                    {errors.email}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>

                                                        <Stack
                                                            direction="row"
                                                            alignItems="center"
                                                            justifyContent="flex-end"
                                                            spacing={1}
                                                        ></Stack>
                                                        {errors.submit && (
                                                            <Box sx={{ mt: 3 }}>
                                                                <FormHelperText error>{errors.submit}</FormHelperText>
                                                            </Box>
                                                        )}

                                                        <Box sx={{ mt: 2 }}>
                                                            <AnimateButton>
                                                                <Button
                                                                    disableElevation
                                                                    disabled={isSubmitting}
                                                                    fullWidth
                                                                    size="large"
                                                                    type="submit"
                                                                    variant="contained"
                                                                    color="secondary"
                                                                >
                                                                    Sign in
                                                                </Button>
                                                            </AnimateButton>
                                                        </Box>
                                                    </form>
                                                )}
                                            </Formik>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AuthWrapper1>
        </>
    );
};

const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => ({
    // login: (values, navigate) => dispatch(authUser(values, navigate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
