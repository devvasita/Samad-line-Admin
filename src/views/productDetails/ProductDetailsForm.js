// IMPORTS
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, FormHelperText, Grid, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import CustomInput from 'views/customerDetails/CustomInput';
import { Upload } from 'utils/Upload';
import API from 'API';
import ReactQuill from 'react-quill';
import MultipleSelectWithRemove from 'ui-component/fields/MultipleSelectWithRemove';
import Notification from 'utils/Notification';

//APP

const quillModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['clean']
    ]
};

const quillFormats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];

export default function ProductDetailsForm({ productDetails, readOnly, updateProduct, setProductDetails, createNewProduct }) {
    console.log(productDetails);
    const navigate = useNavigate();
    const { images, category, subCategory: sub, brand, stock, mrp } = productDetails;
    console.log(productDetails);

    const [categoryList, setcategoryList] = useState([]);
    const [subCategories, setsubCategories] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        (async () => {
            const {
                data: { data }
            } = await API.get('/brand');

            const list = [{ value: brand, label: brand }, ...data];
            const unique = list.filter((obj, index) => {
                return index === list.findIndex((o) => obj.id === o.id && obj.name === o.name);
            });
            setBrandList(
                unique.map((elem) => {
                    return { value: elem._id, label: elem.name };
                })
            );
        })();
    }, [productDetails]);

    useEffect(() => {
        (async () => {
            const {
                data: { data }
            } = await API.get('/category');

            const list = [{ value: category, label: category }, ...data];
            const unique = list.filter((obj, index) => {
                return index === list.findIndex((o) => obj.id === o.id && obj.name === o.name);
            });
            setcategoryList(
                unique.map((elem) => {
                    return { value: elem._id, label: elem.name };
                })
            );
        })();
    }, [productDetails]);

    useEffect(() => {
        (async () => {
            const keyword = activeCategory || category;
            if (keyword) {
                const {
                    data: { data }
                } = await API.get(`/category/${keyword}`, { params: { keyword } });
                const { subCategory } = data;
                const list = [{ value: sub, label: sub }, ...subCategory];
                const unique = list.filter((obj, index) => {
                    return index === list.findIndex((o) => obj.id === o.id && obj.name === o.name);
                });

                setsubCategories(
                    unique.map((elem) => {
                        return { value: elem._id, label: elem.name };
                    })
                );
            }
        })();
    }, [activeCategory, category, productDetails]);

    return (
        <Card variant="outlined" sx={{ height: '100%', width: '100%', padding: 0, border: 'none' }}>
            <Formik
                initialValues={{
                    ...productDetails
                }}
                enableReinitialize
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                    // brand: Yup.string().max(255)
                    category: Yup.string().max(255).required('Category is required'),
                    subCategory: Yup.string().max(255).required('Sub Category is required'),
                    description: Yup.string().required('Description is required'),
                    productCode: Yup.string().max(255).required('ProductCode is required'),
                    stock: Yup.string().max(255).required('Stock is required'),
                    mrp: Yup.string().max(255).required('MRP is required'),
                    color: Yup.string().max(255).required('Color is required'),
                    images: Yup.lazy((value) => {
                        if (!value[0].url) {
                            return Yup.array().of(
                                Yup.object().shape({
                                    key: Yup.string().required()
                                })
                            );
                        }
                        return Yup.array().of(
                            Yup.object().shape({
                                key: Yup.string()
                            })
                        );
                    })
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        console.log('values', values);
                        const otherProducts = values.otherProductsData ? values.otherProductsData.map((elem) => elem.id) : [];
                        console.log(values);
                        const productData = {
                            ...values,
                            otherProducts
                        };

                        // Check if brand is not empty before setting it
                        if (productData.brand === '') {
                            delete productData.brand;
                            delete values.brand;
                        }
                        console.log(productData);
                        if (createNewProduct) {
                            createNewProduct(
                                {
                                    ...values,
                                    ...productData
                                },
                                navigate
                            );
                        } else {
                            updateProduct(
                                productDetails._id,
                                {
                                    ...values,
                                    ...productData
                                },
                                navigate
                            );
                        }
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <CardContent
                            sx={{
                                p: 3,
                                textAlign: { xs: 'center', md: 'start' }
                            }}
                        >
                            <FormControl fullWidth>
                                <Grid container direction={{ xs: 'column', md: 'row' }} columnSpacing={5} rowSpacing={3}>
                                    <Grid component="form" item xs={12}>
                                        <label style={{ fontWeight: 'bold' }} htmlFor={'images'}>
                                            Images
                                        </label>
                                        <Grid container sx={{ justifyContent: 'space-between', padding: '8px 0' }}>
                                            {images.map((img, i) => (
                                                <Grid item xs={12} lg={2} sx={{ height: 150 }}>
                                                    <Upload
                                                        imgData={img}
                                                        updateImage={setProductDetails}
                                                        index={i}
                                                        disabled={readOnly}
                                                        error={errors.images}
                                                        values={values}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>

                                    <Grid component="form" item xs={6}>
                                        <CustomInput
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            title="Name"
                                            disabled={readOnly}
                                            error={touched.name && errors.name}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.name && errors.name && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.name}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid component="form" item xs={6}>
                                        {' '}
                                        {/* <CustomInput
                                            id="stock"
                                            name="stock"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            disabled={readOnly}
                                            title="Stock"
                                            value={values.stock}
                                            error={touched.stock && errors.stock}
                                        />
                                        {touched.stock && errors.stock && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.stock}
                                            </FormHelperText>
                                        )}{' '} */}
                                        <CustomInput
                                            id="stock"
                                            name="stock"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            disabled={readOnly}
                                            title="Stock"
                                            value={values.stock}
                                            error={touched.stock && errors.stock}
                                        />
                                        {touched.stock && errors.stock && (
                                            <FormHelperText error id="standard-weight-helper-text-stock-login">
                                                {errors.stock}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    {/* <Grid item xs={6}>
                                        <CustomInput
                                            select
                                            id="brand"
                                            name="brand"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            disabled={readOnly}
                                            title="Brand"
                                            value={values.brand}
                                            error={touched.brand && errors.brand}
                                            content={brandList.map((option) => (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        />
                                        {touched.brand && errors.brand && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.brand}
                                            </FormHelperText>
                                        )}
                                    </Grid> */}

                                    {/* <Grid item xs={6}></Grid> */}
                                    <Grid component="form" item xs={6}>
                                        {/* <CustomInput
                                            id="stock"
                                            name="stock"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            disabled={readOnly}
                                            title="Stock"
                                            value={values.stock}
                                            error={touched.stock && errors.stock}
                                        />
                                        {touched.stock && errors.stock && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.stock}
                                            </FormHelperText>
                                        )} */}
                                        <CustomInput
                                            select
                                            id="category"
                                            name="category"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setActiveCategory(e.target.value);
                                                setProductDetails((oldState) => {
                                                    return { ...values, category: e.target.value, subCategory: '' };
                                                });
                                                handleChange(e);
                                            }}
                                            disabled={readOnly}
                                            title="Category"
                                            value={values.category}
                                            error={touched.category && errors.category}
                                            content={categoryList.map((option) => (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        />
                                        {touched.category && errors.category && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.category}
                                            </FormHelperText>
                                        )}{' '}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomInput
                                            select
                                            id="subCategory"
                                            name="subCategory"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            disabled={readOnly}
                                            title="Sub Category"
                                            value={values.subCategory}
                                            error={touched.subCategory && errors.subCategory}
                                            content={subCategories.map((option) => (
                                                <MenuItem value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        />{' '}
                                        {touched.subCategory && errors.subCategory && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.subCategory}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid component="form" item xs={6}>
                                        <CustomInput
                                            id="productCode"
                                            name="productCode"
                                            value={values.productCode}
                                            title="Product Code"
                                            disabled={readOnly}
                                            error={touched.productCode && errors.productCode}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.productCode && errors.productCode && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.productCode}
                                            </FormHelperText>
                                        )}
                                        <CustomInput
                                            id="phone"
                                            type="number"
                                            name="price"
                                            value={values.price}
                                            // onChange={changeField}
                                            title="Selling Price"
                                            disabled={readOnly}
                                            // error={touched.price && errors.price}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {/* {touched.price && errors.price && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.price}
                                            </FormHelperText>
                                        )} */}
                                        {/* <CustomInput
                                            id="mrp"
                                            name="mrp"
                                            type="number"
                                            value={values.mrp}
                                            // onChange={changeField}
                                            title="MRP"
                                            disabled={readOnly}
                                            error={touched.mrp && errors.mrp}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.mrp && errors.mrp && (
                                            <FormHelperText error id="standard-weight-helper-text-mrp-login">
                                                {errors.mrp}
                                            </FormHelperText>
                                        )} */}
                                        <CustomInput
                                            id="mrp"
                                            name="mrp"
                                            type="number"
                                            value={values.mrp}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            title="MRP"
                                            disabled={readOnly}
                                            error={touched.mrp && errors.mrp}
                                        />
                                        {touched.mrp && errors.mrp && (
                                            <FormHelperText error id="standard-weight-helper-text-mrp-login">
                                                {errors.mrp}
                                            </FormHelperText>
                                        )}
                                        <CustomInput
                                            id="color"
                                            name="color"
                                            // type="number"
                                            value={values.color}
                                            // onChange={changeField}
                                            title="Color"
                                            disabled={readOnly}
                                            error={touched.color && errors.color}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        {touched.color && errors.color && (
                                            <FormHelperText error id="standard-weight-helper-text-color-login">
                                                {errors.color}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item xs={6}>
                                        <label style={{ fontWeight: 'bold' }} htmlFor={values.description}>
                                            Description
                                        </label>
                                        <ReactQuill
                                            theme="snow"
                                            id="Description"
                                            name="description"
                                            value={values.description}
                                            onChange={(val) => {
                                                setFieldValue('description', val);
                                            }}
                                            modules={quillModules}
                                            formats={quillFormats}
                                            style={{ height: 215, width: '100%', maxWidth: 550, marginTop: 6 }}
                                            readOnly={readOnly}
                                        />
                                        {touched.description && errors.description && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.description}
                                            </FormHelperText>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <MultipleSelectWithRemove
                                            otherProductsData={values?.otherProductsData}
                                            productOptions={values?.productOptions}
                                            // label="Select other products"
                                            title="Other Products"
                                            disabled={readOnly}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={6} /> */}
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            id="customerSubmit"
                                            variant="contained"
                                            color="secondary"
                                            style={{ display: 'block', marginLeft: 'auto' }}
                                        >
                                            save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </form>
                )}
            </Formik>
        </Card>
    );
}
