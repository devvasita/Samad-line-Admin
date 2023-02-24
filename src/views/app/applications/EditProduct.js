/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-computed-key */
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import React, { useEffect, useState } from 'react';
import { Label, Row, FormGroup, Form, Button } from 'reactstrap';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { Field, Formik } from 'formik';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import 'react-quill/dist/quill.snow.css';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBrandAndCategory,
  getProducts,
  getSingleProduct,
  updateProduct,
} from 'redux/actions';
// import * as Yup from 'yup';

const useStyles = makeStyles(() => ({
  cancel: {
    border: '1px solid #6c757d',
    background: 'none',
    color: '#6c757d',
    padding: '0.5rem 1.25rem 0.5rem 1.25rem',
    borderRadius: '50px',
    marginLeft: '10px',
    '&:hover': {
      background: '#6c757d',
      border: '1px solid #6c757d',
    },
  },
  image: {
    border: '1px dotted',
    display: 'flex',
    // width: '30%',
    margin: ' 0 auto',
    height: '115px',
    cursor: 'pointer',
    marginTop: '15px',
    // [theme.breakpoints.up('sm')]: {
    //   backgroundColor: 'red',
    // },
    '&>div:nth-child(1)': {
      color: 'red',
    },
    '@media (max-width: 450px)': {
      width: '70%',
      height: '90px',
    },
  },
  upload: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    // width: '30%',
    height: '115px',
    marginTop: '15px',

    '@media (max-width: 450px)': {
      width: '70%',
      height: '90px',
    },
  },
  required: {
    color: 'red',
    position: 'absolute',
    top: -3,
    marginBottom: '3px',
  },
  cover: {
    color: 'red',
    position: 'absolute',
    bottom: 0,
  },
}));
const unit = [
  { value: 'kg', label: 'Kg', disabled: true },
  { value: 'gm', label: 'Gm' },
  { value: 'pcs', label: 'pcs' },
];

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};
const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

function NewComp({ setimgArr, i, imgArr }) {
  const handleChange = (e) => {
    e.stopPropagation();
    imgArr.splice(i, 1, {
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    });
  };

  const classes = useStyles();

  const handleCancelImage = () => {
    imgArr.splice(i, 1, {
      file: null,
      url: '',
    });
    setimgArr(imgArr);
  };

  return (
    <Colxx xxs="3">
      {imgArr[i] && imgArr[i].url ? (
        <div>
          <div className={classes.upload}>
            <CancelIcon
              onClick={handleCancelImage}
              style={{
                position: 'absolute',
                top: 0,
                right: '-25px',
                cursor: 'pointer',
              }}
            />
            <img
              src={imgArr[i].url}
              alt=""
              style={{
                objectFit: 'contain',
                borderRadius: '10px',
                height: '100%',
                width: '100%',
                border: '1px solid',
              }}
            />
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className={classes.image}>
          {i === 0 && <span className={classes.required}>* Cover Image</span>}

          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            style={{
              margin: 'auto',
              borderRadius: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <input
              hidden
              required
              accept="image/*"
              requiredStar
              type="file"
              onChange={(e) => handleChange(e, i)}
            />

            <img
              src="/assets/uploadicon.svg"
              alt=""
              style={{ height: '35px' }}
            />
          </IconButton>
        </div>
      )}
    </Colxx>
  );
}

function EditProduct({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [brand, setbrand] = useState([]);
  const [category, setcategory] = useState([]);
  const [relavantProduct, setRelavantProduct] = useState([]);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
    ],
    brand: '',
    category: '',
    countInStock: '',
    numReviews: '',
    description: '',
    sellerInformation: '',
    mrp: '',
    flavour: null,
    value: '',
    unit: '',
    color: null,
    nonVeg: false,
    otherUnit: [],
    otherColor: [],
    otherFlavour: [],
    suggestedProduct: [],
  });

  const brandData = useSelector(
    (state) => state?.brandAndCategory?.brand?.data
  );
  const categoryData = useSelector(
    (state) => state?.brandAndCategory?.category?.data
  );
  const productState = useSelector((state) => state.product);
  const selectedProduct = useSelector(
    (state) => state?.product?.selectedProduct
  );

  const { otherUnit, otherColor, otherFlavour, products } = productState;

  useEffect(() => {
    dispatch(getBrandAndCategory('brand'));
    dispatch(getBrandAndCategory('category'));
    dispatch(getSingleProduct(id));
    dispatch(getProducts({}));
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct) setProduct(selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    if (brandData && brandData.length)
      setbrand(
        brandData.map((elem, i) => {
          return { label: elem.name, value: elem.name, key: i };
        })
      );
    if (categoryData && categoryData.length)
      setcategory(
        categoryData.map((elem, i) => {
          return { label: elem.name, value: elem.name, key: i };
        })
      );
    if (products && products.data.length)
      setRelavantProduct(
        products.data.map((elem, i) => {
          return { label: elem.name, value: elem.name, key: i };
        })
      );
  }, [categoryData, brandData, products]);

  const handleChange = (value, key) => {
    setProduct((oldVal) => {
      return { ...oldVal, [key]: value };
    });
    if (value !== '' && key === 'unit')
      dispatch(getProducts({ unit: value, key: 'otherUnit' }));
    if (key === 'color' && !product.color)
      dispatch(getProducts({ filterBy: 'color', key: 'otherColor' }));
    if (key === 'flavour' && !product.flavour)
      dispatch(getProducts({ filterBy: 'flavour', key: 'otherFlavour' }));
  };

  const initialValues = {
    name: '',
    price: '',
    image: [],
    brand: '',
    category: '',
    countInStock: '',
    numReviews: '',
    description: '',
    mrp: '',
    flavour: '',
    value: '',
    unit: '',
    color: '',
    nonVeg: false,
    otherUnit: [],
    otherColor: [],
    otherFlavour: [],
    suggestedProduct: [],
  };

  const onSubmit = () => {
    // update product
    const formData = new FormData();
    // eslint-disable-next-line array-callback-return
    // const list = ['image', 'otherColor', 'otherFlavour', 'suggestedProduct'];

    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('brand', product.brand);
    formData.append('category', product.category);
    formData.append('countInStock', '');
    formData.append('numReviews', '');
    formData.append('description', product.description);
    formData.append('sellerInformation', product.sellerInformation);
    formData.append('mrp', product.mrp);
    formData.append('flavour', product.flavour);
    formData.append('value', product.value);
    formData.append('unit', product.value);
    formData.append('color', product.color);
    formData.append('nonVeg', product.nonVeg);
    formData.append('_id', id);
    product.image.map(
      (elem) => elem.file && formData.append('image', elem.file)
    );
    formData.append('otherColor', JSON.stringify(product.otherColor));
    formData.append('otherUnit', JSON.stringify(product.otherUnit));
    formData.append('otherFlavour', JSON.stringify(product.otherFlavour));
    formData.append(
      'suggestedProduct',
      JSON.stringify(product.suggestedProduct)
    );

    dispatch(updateProduct(formData, history, id));
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1> Add Product</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <Label>Image</Label>
          <Row>
            {product.image &&
              product.image.map((elm, index) => (
                <NewComp
                  setimgArr={(val) =>
                    setProduct((oldVal) => {
                      return { ...oldVal, image: val };
                    })
                  }
                  imgArr={product.image}
                  i={index}
                  key={elm.id}
                />
              ))}
          </Row>

          <Formik
            // validate={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({
              // values,
              errors,
              touched,
              // handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="av-tooltip tooltip-label-right mt-4"
              >
                <Row>
                  <Colxx lg="9" xs="12" sm="6">
                    <FormGroup>
                      <Label>Product Name:</Label>
                      <Field
                        className="form-control"
                        name="name"
                        value={product.name}
                        onChange={(e) => handleChange(e.target.value, 'name')}
                        onBlur={handleBlur}
                        error={Boolean(errors.name && touched.name)}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <Form>
                      <Label>Non-Veg :</Label>
                      <Switch
                        className="custom-switch custom-switch-red"
                        checked={product.nonVeg}
                        onChange={(value) => handleChange(value, 'nonVeg')}
                        // onChange={(primary) => setCheckedPrimary(primary)}
                        name="nonVeg"
                        value={product.nonVeg}
                      />
                    </Form>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx lg="3" xs="12" sm="6">
                    <FormGroup>
                      <Label>MRP(₹):</Label>

                      <Field
                        className="form-control"
                        name="mrp"
                        value={product.mrp}
                        onChange={(e) => handleChange(e.target.value, 'mrp')}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <FormGroup>
                      <Label>Price(₹):</Label>

                      <Field
                        className="form-control"
                        name="price"
                        value={product.price}
                        onChange={(e) => handleChange(e.target.value, 'price')}
                        error={Boolean(errors.price && touched.price)}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <FormGroup>
                      <Label>Brand:</Label>
                      <Select
                        className="react-select react-select__single-value"
                        classNamePrefix="react-select"
                        options={brand}
                        name="brand"
                        onChange={({ value }) => handleChange(value, 'brand')}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <FormGroup>
                      <Label>Category:</Label>
                      <Select
                        className="react-select react-select__single-value"
                        classNamePrefix="react-select"
                        options={category}
                        name="category"
                        onChange={({ value }) =>
                          handleChange(value, 'category')
                        }
                      />
                    </FormGroup>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx lg="3" xs="12" sm="6">
                    <FormGroup>
                      <Label>Unit:</Label>
                      <Select
                        className="react-select react-select__single-value"
                        classNamePrefix="react-select"
                        options={unit}
                        name="unit"
                        onChange={({ value }) => handleChange(value, 'unit')}
                        // value={product.unit}
                        //  onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <FormGroup>
                      <Label>Value:</Label>
                      <Field
                        className="form-control"
                        name="value"
                        value={product.value}
                        onChange={(e) => handleChange(e.target.value, 'value')}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <FormGroup>
                      <Label>Color:</Label>
                      <Field
                        className="form-control"
                        name="color"
                        value={product.color}
                        onChange={(e) => handleChange(e.target.value, 'color')}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <Form>
                      <Label>Flavour:</Label>
                      <Field
                        className="form-control"
                        name="flavour"
                        value={product.flavour}
                        onChange={(e) =>
                          handleChange(e.target.value, 'flavour')
                        }
                      />
                    </Form>
                    -{' '}
                  </Colxx>
                </Row>

                <Row>
                  <Colxx lg="12" xs="12" sm="6">
                    <Label>Description :</Label>
                    <ReactQuill
                      theme="snow"
                      name="description"
                      value={product.description}
                      //  onChange={handleChange}
                      onChange={(value) => handleChange(value, 'description')}
                      modules={quillModules}
                      formats={quillFormats}
                      style={{ marginBottom: '10px' }}
                    />
                  </Colxx>
                </Row>

                <Row>
                  <Colxx lg="12" xs="12" sm="6">
                    <Label>Seller Information :</Label>
                    <ReactQuill
                      theme="snow"
                      name="sellerInformation"
                      value={product.sellerInformation}
                      //  onChange={handleChange}
                      onChange={(value) =>
                        handleChange(value, 'sellerInformation')
                      }
                      modules={quillModules}
                      formats={quillFormats}
                      style={{ marginBottom: '10px' }}
                    />
                  </Colxx>
                </Row>
                <Row>
                  <Colxx lg="12" xs="12" sm="6">
                    <FormGroup>
                      <Label>Other Unit</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        isMulti
                        value={product.otherUnit}
                        onChange={(value) => handleChange(value, 'otherUnit')}
                        name="otherunit"
                        options={otherUnit}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx lg="12" xs="12" sm="6">
                    <FormGroup>
                      <Label>Other Color:</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        isMulti
                        name="otherColor"
                        value={product.otherColor}
                        //  onChange={handleChange}
                        // value={selectedOptionsColor}
                        onChange={(value) => handleChange(value, 'otherColor')}
                        options={otherColor}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx lg="12" xs="12" sm="6">
                    <Form>
                      <FormGroup>
                        <Label>Other Flavour:</Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          isMulti
                          name="otherFlavour"
                          value={product.otherFlavour}
                          onChange={(value) =>
                            handleChange(value, 'otherFlavour')
                          }
                          options={otherFlavour}
                        />
                      </FormGroup>
                    </Form>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx lg="12" xs="12" sm="6">
                    <FormGroup>
                      <Label>Suggested Product :</Label>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        isMulti
                        name="relevantProduct"
                        value={product.suggestedProduct}
                        onChange={(value) =>
                          handleChange(value, 'suggestedProduct')
                        }
                        options={relavantProduct}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
                <div style={{ textAlign: 'end', margin: '15px 0px 15px 0px' }}>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>

                  <NavLink to="./product">
                    <Button outline className={classes.cancel}>
                      Cancel
                    </Button>
                  </NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </Colxx>
      </Row>
    </>
  );
}

export default EditProduct;
