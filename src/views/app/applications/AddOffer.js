import React, { useState } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
// import DropzoneExample from 'containers/forms/DropzoneExample';
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import { FormGroup, Label, Button, Row } from 'reactstrap';
// import DatePicker from 'react-datepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Select from 'react-select';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';

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
    width: '30%',
    margin: ' 0 auto',
    height: '115px',
    cursor: 'pointer',
    // [theme.breakpoints.up('sm')]: {
    //   backgroundColor: 'red',
    // },
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
    width: '30%',
    height: '115px',
    '@media (max-width: 450px)': {
      width: '70%',
      height: '90px',
    },
  },

  date: {
    height: '40px',
  },
}));

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

function AddOffer() {
  const classes = useStyles();
  const [textQuillStandart, setTextQuillStandart] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const [file, setFile] = useState();
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleCancelImage = () => {
    setFile(null);
  };
  const onSubmit = (values) => {
    console.log(values);
  };

  const validate = (values) => {
    console.log(values, '--');
    const errors = {};

    if (!values.name) {
      errors.name = 'Please enter Blog Title';
    } else if (values.name === 'admin') {
      errors.name = 'Value must be longer than 2 characters';
    }
    if (!values.date) {
      errors.date = 'Please select date';
    }
    if (!values.value) {
      errors.value = 'Please enter value';
    }
    return errors;
  };

  const options = [
    { value: 'food', label: 'Flat' },
    { value: 'beingfabulous', label: 'Percentage(%)', disabled: true },
  ];
  // const handleChangeselect = (val) => {
  //   onChange(name, val);
  // };

  // const handleBlur = () => {
  //   onBlur(name, true);
  // };

  return (
    <div>
      <Colxx xxs="12">
        <h1>Add Offers</h1>
        <Separator className="mb-5" />
        <Row>
          <Colxx xxs="12">
            <Label>Image</Label>
            {/* <DropzoneExample /> */}

            <div>
              {!file ? (
                <div
                  onClick={handleClick}
                  onKeyDown={handleClick}
                  aria-hidden="true"
                  className={classes.image}
                >
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    style={{ margin: 'auto' }}
                    ref={hiddenFileInput}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      // ref={hiddenFileInput}
                      onChange={handleChange}
                    />

                    <img
                      src="/assets/uploadicon.svg"
                      alt=""
                      style={{ height: '35px' }}
                    />
                  </IconButton>
                </div>
              ) : (
                <div>
                  {file ? (
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
                  ) : null}
                </div>
              )}
            </div>

            <Formik
              validate={validate}
              initialValues={{
                name: '',
                select: '',
                value: '',
                date: '',
              }}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-right mt-4">
                  <Row>
                    <Colxx lg="6" xs="12">
                      <FormGroup>
                        <Label>Title</Label>
                        <Field className="form-control" name="name" />
                        {errors.name && touched.name && (
                          <div className="invalid-feedback d-block">
                            {errors.name}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label>Flat/Percentage(%)</Label>
                        <Select
                          className="react-select react-select__single-value"
                          classNamePrefix="react-select"
                          options={options}
                          name="select"
                          // isMulti={isMulti}
                          // onChange={handleChangeselect}
                          // onBlur={handleBlur}
                        />
                        {errors.select && touched.select ? (
                          <div className="invalid-feedback d-block">
                            {errors.select}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                    <Colxx lg="6" xs="12">
                      <FormGroup>
                        <Label>Valid Till</Label>
                        <div>
                          <div>
                            <DatePicker
                              selected={startDate}
                              onChange={setStartDate}
                              className={classes.date}
                              placeholderText=""
                              size="small"
                              name="date"
                            />
                            <div>
                              <i
                                className="simple-icon-calendar"
                                style={{
                                  color: '#6fb327',
                                  marginRight: '5px',
                                  position: 'absolute',
                                  right: 5,
                                  top: 33,
                                  fontSize: '20px',
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {errors.date && touched.date && (
                          <div className="invalid-feedback d-block">
                            {errors.date}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label>Value</Label>
                        <Field className="form-control" name="value" />

                        {errors.value && touched.value && (
                          <div className="invalid-feedback d-block">
                            {errors.value}
                          </div>
                        )}
                      </FormGroup>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>

            <Label>Description</Label>
            <ReactQuill
              theme="snow"
              value={textQuillStandart}
              onChange={(val) => setTextQuillStandart(val)}
              modules={quillModules}
              formats={quillFormats}
              style={{ marginBottom: '10px' }}
            />
            <div style={{ textAlign: 'end', margin: '15px 0px 15px 0px' }}>
              <Button color="primary" type="submit">
                Upload
              </Button>

              <NavLink to="./Offers">
                <Button
                  outline
                  className={classes.cancel}
                  // style={{ background: '#6c757d', border: 'none' }}
                >
                  Cancel
                </Button>
              </NavLink>
            </div>
          </Colxx>
        </Row>
      </Colxx>
    </div>
  );
}

export default AddOffer;
