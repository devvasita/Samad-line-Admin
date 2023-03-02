/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint no-underscore-dangle: 0 */
import React, { useState, useEffect } from 'react';
import {
  CardSubtitle,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Button,
  Modal,
  ModalBody,
  Label,
  ModalFooter,
  Input,
  ModalHeader,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import './brand.css';
import {
  addBrandAndCategory,
  deleteBrandAndCategory,
  getBrandAndCategory,
  updateBrandAndCategory,
} from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';
// import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { NotificationManager } from 'components/common/react-notifications';

function Brand() {
  const BrandData = useSelector(
    (state) => state?.brandAndCategory?.brand?.data
  );
  const dispatch = useDispatch();

  const [image, setimage] = useState('');
  const [modalLong, setModalLong] = useState(false);
  const [modelEdit, setModelEdit] = useState(false);
  const [state, setState] = useState({
    name: '',
    image: '',
    _id: '',
  });

  const { error, message } = useSelector(
    (brandState) => brandState.brandAndCategory
  );

  useEffect(() => {
    if (error && error.message) {
      NotificationManager.error(
        error.message,
        'Brand Error',
        3000,
        null,
        null,
        ''
      );
    }
    if (message)
      NotificationManager.success(message, 'success', 3000, null, null, '');
  }, [error]);

  const handleChange = (e) => {
    e.preventDefault();

    setState({
      name: state.name,
      image: e.target.files[0],
      _id: state._id,
    });
    setimage(URL.createObjectURL(e.target.files[0]));
  };
  const handleCancelImage = () => {
    setState({
      name: state.name,
      image: '',
      _id: state._id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(state).map(
      (elem) => state[elem] && formData.append(elem, state[elem])
    );

    console.log({
      state,
      name: formData.get('name'),
      image: formData.get('image'),
    });
    if (modelEdit) {
      dispatch(updateBrandAndCategory(formData, 'brand'));
      setModalLong(false);
    } else {
      dispatch(addBrandAndCategory(formData, 'brand'));
      setModalLong(false);
    }
    setModelEdit('');
  };
  const handleDelete = (_id) => {
    dispatch(deleteBrandAndCategory(_id, 'brand'));
  };

  useEffect(() => {
    dispatch(getBrandAndCategory('brand'));
  }, [dispatch]);

  const handleEdit = (index) => {
    setModalLong(true);
    setState({
      ...state,
      name: BrandData[index].name,
      image: BrandData[index].image,
      _id: BrandData[index]._id,
    });
  };

  return (
    <Row>
      <Colxx xxs="12">
        <div className="d-flex justify-content-between mb-4">
          <h1>Brand</h1>
          <Button
            size="sm"
            color="primary"
            outline
            onClick={() => {
              setModelEdit(false);
              setModalLong(true);
              setState({
                name: '',
                image: '',
                _id: '',
              });
            }}
          >
            <IntlMessages id="+ Add Brand" />
          </Button>
        </div>

        <Separator className="mb-4" />
      </Colxx>
      <Card className="mb-4">
        <Modal
          centered
          backdrop="static"
          isOpen={modalLong}
          toggle={() => setModalLong(!modalLong)}
          style={{
            boxShadow: 'none',
          }}
        >
          <ModalBody>
            <ModalHeader style={{ padding: '5px 0px 5px 0px' }}>
              {modelEdit ? 'Edit Brand' : 'Add Brand'}
            </ModalHeader>

            <Label className="mt-4">
              <IntlMessages id="Upload Image : " />
            </Label>
            <div>
              {!state.image ? (
                <div className="model">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    style={{ margin: 'auto' }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
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
                  {state.image ? (
                    <div
                      style={{
                        position: 'relative',
                        // display: 'flex',
                        justifyContent: 'center',
                        margin: 'auto',
                        width: '50%',
                        height: 'auto',
                        textAlign: 'center',
                      }}
                    >
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
                        src={state.image.length ? state.image : image}
                        alt=""
                        style={{
                          objectFit: 'contain',
                          borderRadius: '10px',
                          height: '100%',
                          width: '100%',
                          border: '1px solid',
                          boxShadow:
                            '0px 16px 16px rgb(50 50 71 / 8%), 0px 24px 32px rgb(50 50 71 / 8%)',
                        }}
                      />

                      {/* {result && (
                        <div>
                          <img src={result} alt="result" />
                        </div>
                      )} */}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <Label className="mt-4">
              <IntlMessages id="Title :" />
            </Label>

            <Input
              type="text"
              defaultValue={state.name}
              onChange={(event) => {
                // formData.append('name', event.target.value);
                setState((oldVal) => {
                  return { ...oldVal, name: event.target.value };
                });
              }}
            />
          </ModalBody>
          <ModalFooter style={{ borderTop: 'none' }}>
            <Button outline className="primary-new" onClick={handleSubmit}>
              Submit
            </Button>{' '}
            <Button
              outline
              className="secondary-new"
              // style={{ background: '#6c757d', border: 'none' }}
              onClick={() => setModalLong(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Card>
      <Colxx xxs="12">
        <CardTitle className="mb-4">
          <IntlMessages id="Brand" />
        </CardTitle>
        <Row>
          {BrandData &&
            BrandData.map((brand, index) => (
              <Colxx xxs="12" xs="6" md="3" lg="2" key={brand?._id}>
                <Card className="mb-4" style={{ borderRadius: '0.75rem' }}>
                  <div className="position-relative">
                    <CardImg
                      top
                      src={brand?.image}
                      alt="Card image cap"
                      style={{
                        borderRadius: '0.75rem 0.75rem 0 0',
                        height: '100px',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <CardBody className="p-2">
                    <CardSubtitle className="mb-3 font-weight-bold font-size-11">
                      <h2 className="truncate">{brand?.name}</h2>
                    </CardSubtitle>
                    {/* <CardText className="text-muted text-small mb-0 font-weight-light">
                09.04.2018
              </CardText> */}

                    <div className="d-flex justify-content-center">
                      <Button
                        outline
                        color="secondary"
                        className="mr-2"
                        size="sm"
                        onClick={() => {
                          setModelEdit(brand._id);
                          handleEdit(index);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        outline
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(brand._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
            ))}
        </Row>
      </Colxx>
    </Row>
  );
}

export default Brand;
