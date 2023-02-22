import { Colxx, Separator } from 'components/common/CustomBootstrap';
import React, { useState } from 'react';
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
import { NavLink } from 'react-router-dom';
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
const options = [
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
const relavantProduct = [
  { label: 'Dumbbell (2pcs)', value: 'Dumbbell', key: 0 },
  { label: 'Protin(5kg)', value: 'Protin', key: 1 },
  { label: 'Dessert(250gm)', value: 'dessert', key: 2 },
  { label: 'Shaker Bottle(500ml)', value: 'bottle', key: 3 },
  { label: 'Protin SugarFree(2kg)', value: 'Protin1', key: 1 },
  { label: 'gloves(2pcs)', value: 'gloves', key: 2 },
];
const color = [
  { label: 'Gym gloves(Red)', value: 'Red', key: 0 },
  { label: 'Streching Belt (Gray)', value: 'Gray', key: 0 },
  { label: 'Gym gloves(Blue)', value: 'Blue', key: 0 },
  { label: 'Skipping Ropes(green)', value: 'green', key: 0 },
  { label: 'Medicine Balls(Gray)', value: 'gray1', key: 0 },
];
const Flavour = [
  { label: 'Protein Powder (Chocolate)', value: 'gm', key: 0 },
  {
    label:
      'PRO365 Tummy Trimmer for Men & Women Belly Fat ABS Exercise (Coconute)',
    value: 'gm1',
    key: 1,
  },
  {
    label:
      'Kobra Labs The Bull Mass Gainer Weight Gainers/Mass Gainers  (Snickerdoodle)',
    value: 'gm2',
    key: 2,
  },
  { label: 'Protein Powder (Peanut Butter )', value: 'gm3', key: 3 },
  { label: 'Protein Powder (Cookies and Cream  )', value: 'gm4', key: 4 },
];
const selectBrandData = [
  { label: 'Zara', value: 'Zara', key: 0 },
  { label: 'U.S Polo', value: 'u.s polo', key: 1 },
  { label: 'Nike', value: 'nike', key: 2 },
];
const category = [
  { label: 'Cycling', value: 'Cycling', key: 0 },
  { label: 'Gymnastics', value: 'Gymnastics', key: 1 },
  { label: 'Boxing', value: 'Boxing', key: 2 },
];
const unit = [
  { label: 'Protein Powder (200gm)', value: 'gm', key: 0 },
  { label: 'Protein Powder (250gm)', value: 'gm1', key: 1 },
  {
    label:
      'PRO365 Tummy Trimmer for Men & Women Belly Fat ABS Exercise (1 pcs)',
    value: 'gm2',
    key: 2,
  },
  {
    label: 'Streching Belt(2 pcs)',
    value: 'Kg1',
    key: 3,
  },

  { label: 'Gym gloves(2 pcs)', value: 'Kg2', key: 4 },
  { label: 'Protein Powder sugarless(2.5kg)', value: 'Kg3', key: 5 },

  {
    label: 'Protein Powder Mass Gainer (5kg)',
    value: 'Kg4',
    key: 6,
  },
];

function NewComp({ setimgArr, i, imgArr }) {
  const [file, setFile] = useState();

  const handleChange = (e) => {
    console.log({ e });
    e.stopPropagation();
    setFile(URL.createObjectURL(e.target.files[0]));
    setimgArr(imgArr);
  };

  //   const hiddenFileInput = useRef();
  const classes = useStyles();

  //   const handleClick = (e) => {
  //     e.stopPropagation();
  //     hiddenFileInput.current.click();
  //   };
  const handleCancelImage = () => {
    setFile('');
  };

  return (
    <Colxx xxs="3">
      {file && file ? (
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
              src={file}
              alt=""
              style={{
                objectFit: 'contain',
                borderRadius: '10px',
                height: '100%',
                width: '100%',
                border: '1px solid',
                // boxShadow:
                //   '0px 16px 16px rgb(50 50 71 / 8%), 0px 24px 32px rgb(50 50 71 / 8%)',
              }}
            />
          </div>
        </div>
      ) : (
        <div
          // onClick={(e) => handleClick(e)}
          // onKeyDown={(e) => handleClick(e)}
          aria-hidden="true"
          className={classes.image}
        >
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
            // ref={hiddenFileInput}
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

function AddProduct() {
  const [imgArr, setimgArr] = useState([
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
  ]);
  // const [textQuillStandart, setTextQuillStandart] = useState('');
  // const [selectedOptionsUnit, setSelectedOptionsUnit] = useState([]);
  // const [selectedOptionsColor, setselectedOptionsColor] = useState([]);
  // const [selectedOptionsFlavour, setselectedOptionsFlavour] = useState([]);
  // const [selectedOptionsSuggest, setselectedOptionsSuggest] = useState([]);

  // const [checkedPrimary, setCheckedPrimary] = useState(false);

  // const [addProduct, setAddProduct] = useState({
  //   name: '',
  //   price: '',
  //   image: [],
  //   brand: '',
  //   category: '',
  //   countInStock: '',
  //   numReviews: '',
  //   description: '',
  //   mrp: '',
  //   flavour: '',
  //   value: '',
  //   unit: '',
  //   color: '',
  //   nonVeg: false,
  //   otherUnit: [],
  //   otherColor: [],
  //   otherFlavour: [],
  //   suggestedProduct: [],
  // });
  // console.log(addProduct, setAddProduct);
  const classes = useStyles();

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

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().required('name is reqired'),
  //   price: Yup.string().required('price is required!'),
  // });

  const onSubmit = (values) => {
    console.log(values);
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
            {imgArr &&
              imgArr.map((elm, index) => (
                <NewComp
                  setimgArr={setimgArr}
                  imgArr={imgArr}
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
              values,
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
                        // value={values.name}
                        //  onChange={handleChange}
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
                        checked={values.nonVeg}
                        //  onChange={handleChange}
                        // onChange={(primary) => setCheckedPrimary(primary)}
                        name="nonVeg"
                        // value={values.nonVeg}
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
                        // value={values.mrp}
                        //  onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <FormGroup>
                      <Label>Price(₹):</Label>

                      <Field
                        className="form-control"
                        name="price"
                        // value={values.price}
                        //  onChange={handleChange}
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
                        options={selectBrandData}
                        name="brand"
                        // value={values.brand}
                        //  onChange={handleChange}

                        // isMulti={isMulti}
                        // onChange={handleChangeselect}
                        // onBlur={handleBlur}
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
                        // value={values.category}
                        //  onChange={handleChange}
                        // isMulti={isMulti}
                        // onChange={handleChangeselect}
                        // onBlur={handleBlur}
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
                        options={options}
                        name="unit"
                        // value={values.unit}
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
                        // value={values.value}
                        //  onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <FormGroup>
                      <Label>Color:</Label>
                      <Field
                        className="form-control"
                        name="color"
                        // value={values.color}
                        //  onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx lg="3" xs="12" sm="6">
                    <Form>
                      <Label>Flavour:</Label>
                      <Field
                        className="form-control"
                        name="flavour"
                        // value={values.flavour}
                        //  onChange={handleChange}
                      />
                    </Form>
                  </Colxx>
                </Row>

                <Row>
                  <Colxx lg="12" xs="12" sm="6">
                    <Label>Description :</Label>
                    <ReactQuill
                      theme="snow"
                      // value={values.description}
                      //  onChange={handleChange}
                      // onChange={(val) => setTextQuillStandart(val)}
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
                        // value={values.description}
                        //  onChange={handleChange}
                        name="otherunit"
                        options={unit}
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
                        // value={values.otherColor}
                        //  onChange={handleChange}
                        // value={selectedOptionsColor}
                        // onChange={setselectedOptionsColor}
                        options={color}
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
                          name="relevantProduct"
                          // value={values.otherColor}
                          //  onChange={handleChange}
                          // value={selectedOptionsFlavour}
                          // onChange={setselectedOptionsFlavour}
                          options={Flavour}
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
                        // value={values.suggestedProduct}
                        //  onChange={handleChange}
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
                    <Button
                      outline
                      className={classes.cancel}
                      // style={{ background: '#6c757d', border: 'none' }}
                    >
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

export default AddProduct;
