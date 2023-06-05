/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
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
import { NavLink, useParams } from 'react-router-dom';
import { getSingleOffer, updateOffer } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import UploadSingleImage from '../ui/components/UploadSingleImage';

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

function EditOffer({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleOffer(id));
  }, [dispatch]);

  const selectedOffer = useSelector((state) => state?.offer?.selectedOffer);

  const [offer, setOffer] = useState({
    image: { file: '', url: '' },
    title: '',
    validTill: new Date(),
    discountType: {},
    value: '',
    description: '',
  });

  useEffect(() => {
    if (selectedOffer) setOffer(selectedOffer);
  }, [selectedOffer]);

  const onSubmit = () => {
    dispatch(updateOffer(offer, history, id));
  };

  const handleChange = (value, key) => {
    setOffer((oldVal) => {
      return { ...oldVal, [key]: value };
    });
  };

  const validate = () => {
    const errors = {};

    if (!offer?.image?.url && !offer?.image?.file) {
      errors.image = 'Image Required';
    }
    if (!offer?.title) {
      errors.title = 'Required';
    }
    if (!offer?.discountType?.value) {
      errors.discountType = 'Required';
    }
    if (!offer?.value) {
      errors.value = 'Required';
    }
    if (!offer?.description) {
      errors.description = 'Required';
    }
    return errors;
  };

  const options = [
    { value: 'food', label: 'Flat' },
    { value: 'beingfabulous', label: 'Percentage(%)', disabled: true },
  ];

  const initialValues = {
    image: { file: '', url: '' },
    title: '',
    validTill: new Date(),
    discountType: {},
    value: '',
    description: '',
  };

  return (
    <div>
      <Colxx xxs="12">
        <h1>Edit Offers</h1>
        <Separator className="mb-5" />
        <Row>
          <Colxx xxs="12">
            <Formik
              validate={validate}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form
                  onSubmit={handleSubmit}
                  className="av-tooltip tooltip-label-right mt-4"
                >
                  <Row>
                    <Colxx lg="12" xs="12" sm="6">
                      <FormGroup>
                        <Label>Image</Label>
                        {/* <DropzoneExample /> */}
                        <UploadSingleImage
                          image={offer?.image?.url}
                          setImage={(image) =>
                            setOffer((oldState) => {
                              return {
                                ...oldState,
                                image,
                              };
                            })
                          }
                        />

                        {!offer?.image?.url &&
                          errors.image &&
                          touched.image && (
                            <div className="invalid-feedback d-block">
                              {errors.image}
                            </div>
                          )}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx lg="6" xs="12" sm="6">
                      <FormGroup>
                        <Label>Title</Label>
                        <Field
                          className="form-control"
                          name="title"
                          value={offer?.title}
                          onChange={(e) =>
                            handleChange(e.target.value, 'title')
                          }
                        />
                        {errors.title && touched.title && (
                          <div className="invalid-feedback d-block">
                            {errors.title}
                          </div>
                        )}
                      </FormGroup>
                    </Colxx>
                    <Colxx lg="6" xs="12" sm="6">
                      <FormGroup>
                        <Label>Valid Till</Label>
                        <div>
                          <div>
                            <DatePicker
                              onChange={(date) => {
                                handleChange(date.toString(), 'validTill');
                              }}
                              className={classes.date}
                              placeholderText=""
                              size="small"
                              name="validTill"
                              value={
                                offer?.validTill.toString() !== 'undefined'
                                  ? offer.validTill
                                  : ''
                              }
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
                        {errors.validTill && touched.validTill && (
                          <div className="invalid-feedback d-block">
                            {errors.validTill}
                          </div>
                        )}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx lg="6" xs="12" sm="6">
                      <FormGroup>
                        <Label>Flat/Percentage(%)</Label>
                        <Select
                          className="react-select react-select__single-value"
                          classNamePrefix="react-select"
                          options={options}
                          name="discountType"
                          // isMulti={isMulti}
                          value={offer?.discountType}
                          // onChange={handleChangeselect}
                          onChange={(value) => {
                            handleChange(value, 'discountType');
                          }}
                          // onBlur={handleBlur}
                        />
                        {errors.discountType && touched.discountType ? (
                          <div className="invalid-feedback d-block">
                            {errors.discountType}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                    <Colxx lg="6" xs="12" sm="6">
                      <FormGroup>
                        <Label>Value</Label>
                        <Field
                          className="form-control"
                          value={offer.value}
                          onChange={(e) =>
                            handleChange(e.target.value, 'value')
                          }
                          onKeyPress={(event) => {
                            const charCode = event.which
                              ? event.which
                              : event.keyCode;
                            if (
                              String.fromCharCode(charCode).match(/[^0-9.]/g)
                            ) {
                              event.preventDefault();
                            }
                          }}
                          name="value"
                        />

                        {errors.value && touched.value && (
                          <div className="invalid-feedback d-block">
                            {errors.value}
                          </div>
                        )}
                      </FormGroup>
                    </Colxx>
                  </Row>

                  <Row>
                    <Colxx lg="12" xs="6" sm="6">
                      <Label>Description</Label>
                      <ReactQuill
                        theme="snow"
                        name="description"
                        value={offer.description || ''}
                        onChange={(value) => handleChange(value, 'description')}
                        modules={quillModules}
                        formats={quillFormats}
                        style={{ marginBottom: '10px' }}
                      />
                      {errors.description && touched.description && (
                        <div className="invalid-feedback d-block">
                          {errors.description}
                        </div>
                      )}
                    </Colxx>
                  </Row>
                  <div
                    style={{
                      textAlign: 'end',
                      margin: '15px 0px 15px 0px',
                    }}
                  >
                    <Button color="primary">Submit</Button>

                    <NavLink to="/app/applications/Offers">
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
      </Colxx>
    </div>
  );
}

export default EditOffer;
