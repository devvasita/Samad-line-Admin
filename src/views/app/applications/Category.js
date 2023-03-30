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
import './category.css';
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
import CropImage from '../ui/components/crop';

function Category() {
  const CategoryData = useSelector(
    (state) => state?.brandAndCategory?.category?.data
  );
  const dispatch = useDispatch();

  const [upImg, setUpImg] = useState();
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
    setState({
      name: state.name,
      image: e,
      _id: state._id,
    });
  };
  const handleCancelImage = () => {
    setUpImg(null);
    setState({
      name: state.name,
      image: '',
      _id: state._id,
    });
  };

  const handleSubmit = (e) => {
    console.log('dsaf');
    e.preventDefault();
    const formData = new FormData();
    Object.keys(state).map(
      (elem) => state[elem] && formData.append(elem, state[elem])
    );

    if (modelEdit) {
      dispatch(updateBrandAndCategory(formData, 'category'));
      setModalLong(false);
    } else {
      dispatch(addBrandAndCategory(formData, 'category'));
      setModalLong(false);
    }
    setModelEdit('');
  };
  const handleDelete = (_id) => {
    dispatch(deleteBrandAndCategory(_id, 'category'));
  };

  useEffect(() => {
    dispatch(getBrandAndCategory('category'));
  }, [dispatch]);

  const handleEdit = (index) => {
    setModalLong(true);
    setState({
      ...state,
      name: CategoryData[index].name,
      image: CategoryData[index].image,
      _id: CategoryData[index]._id,
    });
  };

  return (
    <Row>
      <Colxx xxs="12">
        <div className="d-flex justify-content-between mb-4">
          <h1>Category</h1>
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
            <IntlMessages id="+ Add Category" />
          </Button>
        </div>

        <Separator className="mb-4" />
      </Colxx>
      <Card className="mb-4">
        <form onSubmit={handleSubmit}>
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
                <div className="model">
                  {state.image && (
                    <CancelIcon
                      onClick={handleCancelImage}
                      style={{
                        position: 'absolute',
                        top: '-25px',
                        right: '-30px',
                        cursor: 'pointer',
                      }}
                    />
                  )}
                  {upImg ? (
                    <CropImage
                      upImg={upImg}
                      setUpImg={(val) => setUpImg(val)}
                      setCropedImage={(e) => handleChange(e)}
                      src={state.image || null}
                    />
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                      style={{
                        margin: 'auto',
                        borderRadius: 0,
                        width: '100%',
                        height: '100%',
                        padding: 0,
                      }}
                    >
                      <CropImage
                        upImg={upImg}
                        setUpImg={(val) => setUpImg(val)}
                        setCropedImage={(e) => handleChange(e)}
                        src={state.image || null}
                      />
                    </IconButton>
                  )}
                </div>
              </div>

              <Label className="mt-4">
                <IntlMessages id="Title :" />
              </Label>

              <Input
                type="text"
                defaultValue={state.name}
                onChange={(event) => {
                  setState((oldVal) => {
                    return { ...oldVal, name: event.target.value };
                  });
                }}
              />
            </ModalBody>
            <ModalFooter style={{ borderTop: 'none' }}>
              <Button
                outline
                className="primary-new"
                type="submit"
                onClick={handleSubmit}
                press
              >
                Submit
              </Button>{' '}
              <Button
                outline
                className="secondary-new"
                // style={{ background: '#6c757d', border: 'none' }}
                onClick={() => {
                  setUpImg(null);
                  setModalLong(false);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </form>
      </Card>
      <Colxx xxs="12">
        <CardTitle className="mb-4">
          <IntlMessages id="Category" />
        </CardTitle>
        <Row>
          {CategoryData &&
            CategoryData.map((category, index) => (
              <Colxx xxs="12" xs="6" md="3" lg="2" key={category?._id}>
                <Card className="mb-4" style={{ borderRadius: '0.75rem' }}>
                  <div className="position-relative">
                    <CardImg
                      top
                      src={category?.image}
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
                      <h2 className="truncate">{category?.name}</h2>
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
                          setModelEdit(category._id);
                          handleEdit(index);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        outline
                        color="danger"
                        size="sm"
                        onClick={() => handleDelete(category._id)}
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

export default Category;
