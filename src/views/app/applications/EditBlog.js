import React, { useState, useEffect } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { Formik, Form, Field } from 'formik';
import ReactQuill from 'react-quill';
import { FormGroup, Label, Button } from 'reactstrap';
import 'react-quill/dist/quill.snow.css';
// import DropzoneExample from 'containers/forms/DropzoneExample';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

import { makeStyles } from '@mui/styles';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBlogById, updateBlog } from 'redux/auth/actions';

const useStyles = makeStyles({
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
});

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

function EditBlog({ selectedBlog, getBlogDetails, updateBlogDetails }) {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [description, setDescription] = useState('');
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);

  useEffect(() => {
    getBlogDetails(id);
  }, [getBlogDetails]);

  useEffect(() => {
    setFile(selectedBlog.image.url);
    if (selectedBlog.description) setDescription(selectedBlog.description);
  }, [selectedBlog]);

  console.log({ selectedBlog });
  function handleChange(e) {
    setImage(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleCancelImage = () => {
    setFile(null);
  };

  const onSubmit = (values) => {
    const data = { ...values, image, description };
    const formData = new FormData();
    Object.keys(data).map((key) => formData.append(key, data[key]));
    updateBlogDetails(formData, id, history);
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'Please enter Blog Title';
    } else if (values.title === 'admin') {
      errors.title = 'Value must be longer than 2 characters';
    }
    return errors;
  };
  return (
    <div>
      <Colxx xxs="12">
        <h1>Edit Blog</h1>
        <Separator className="mb-5" />
        <Formik
          validate={validate}
          initialValues={{
            title: selectedBlog.title,
          }}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="av-tooltip tooltip-label-right">
              <Label>Image</Label>
              {/* <DropzoneExample /> */}
              <div>
                {!file ? (
                  <div aria-hidden="true" className={classes.image}>
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
              <FormGroup>
                <Label>Ttitle</Label>
                <Field className="form-control" name="title" />
                {errors.title && touched.title && (
                  <div className="invalid-feedback d-block">{errors.title}</div>
                )}
              </FormGroup>

              <Label>Description</Label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={(val) => setDescription(val)}
                modules={quillModules}
                formats={quillFormats}
                style={{ marginBottom: '10px' }}
              />
              <div style={{ textAlign: 'end', margin: '15px 0px 15px 0px' }}>
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <NavLink to="./blog">
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
    </div>
  );
}

const mapStateToProps = ({ authUser }) => {
  const { selectedBlog } = authUser;
  return { selectedBlog };
};
const mapDispatchToProps = (dispatch) => ({
  getBlogDetails: (_id) => dispatch(getBlogById(_id)),
  updateBlogDetails: (data, id, history) =>
    dispatch(updateBlog(data, id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBlog);
