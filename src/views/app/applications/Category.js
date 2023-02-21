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
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function Category() {
  const CategoryData = useSelector(
    (state) => state?.brandAndCategory?.category?.data
  );
  const dispatch = useDispatch();

  const [modalLong, setModalLong] = useState(false);
  const [modelEdit, setModelEdit] = useState('');

  const [state, setState] = useState({
    name: '',
    image: '',
    id: '',
  });

  const handleChange = (e) => {
    setState({
      name: state.name,
      image: URL.createObjectURL(e.target.files[0]),
      id: state.id,
    });
  };
  const handleCancelImage = () => {
    setState({
      name: state.name,
      image: '',
      id: state.id,
    });
  };

  const handleSubmit = () => {
    if (modelEdit) {
      dispatch(updateBrandAndCategory(state, 'category'));
      setModalLong(false);
    } else {
      dispatch(addBrandAndCategory(state, 'category'));
      setModalLong(false);
    }
    setModelEdit('');
  };
  const handleDelete = (id) => {
    dispatch(deleteBrandAndCategory(id, 'category'));
  };

  useEffect(() => {
    dispatch(getBrandAndCategory('category'));
  }, [dispatch]);

  const handleEdit = (index) => {
    console.log(CategoryData);
    setModalLong(true);
    setState({
      ...state,
      name: CategoryData[index].name,
      image: CategoryData[index].image,
      id: CategoryData[index]._id,
    });
  };

  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [result, setResult] = useState(null);

  const onImageLoaded = () => {
    setCrop({ aspect: state.image.width / state.image.height });
  };
  const getCropImage = () => {
    const canvas = document.createElement('Canvas');
    const ctx = canvas.getContext('2d');
    const scaleX = state.image.naturalWidth / state.image.width;
    const scaleY = state.image.naturalHeight / state.image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    const img = new Image();
    img.src = state.image;
    console.log(img, '0000');
    ctx.drawImage(
      img,
      0,
      0,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // canvas.toBlob((blob) => {
    //   setResult(blob);
    // }, 'image/jpeg');
    const base64Image = canvas.toDataURL('image/jpeg');
    setResult(base64Image);
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
              setModalLong(true);
              setState({
                name: '',
                image: '',
                id: '',
              });
            }}
          >
            <IntlMessages id="+ Add Category" />
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
              Add Category
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

                      {/* <ReactCrop
                        src="./assets/upload.png"
                        crop={crop}
                        onChange={(newCrop) => setCrop(newCrop)}
                        onImageLoaded={onImageLoaded}
                        onComplete={getCropImage}
                      /> */}
                      <ReactCrop
                        crop={crop}
                        onChange={(c) => {
                          console.log('c=======', c);
                          setCrop(c);
                        }}
                        onImageLoaded={onImageLoaded}
                      >
                        <img src={state.image} alt="crop" />
                      </ReactCrop>
                      <Button onClick={getCropImage}>Crop Image</Button>
                      {/* <img
                        src={state.image}
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
                      /> */}

                      {result && (
                        <div>
                          <img src={result} alt="result" />
                        </div>
                      )}
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
                setState({
                  name: event.target.value,
                  image: state.image,
                  id: state.id,
                });
                // setState((oldState) => (oldState.name = event.target.value));
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
          <IntlMessages id="Category" />
        </CardTitle>
        <Row>
          {CategoryData &&
            CategoryData.map((category, index) => (
              <Colxx xxs="12" xs="6" md="3" lg="2" key={category?._id}>
                <Card className="mb-4">
                  <div className="position-relative">
                    <CardImg top src={category?.image} alt="Card image cap" />
                  </div>
                  <CardBody className="p-2">
                    <CardSubtitle className="mb-3 font-weight-bold font-size-11">
                      <h2>{category?.name}</h2>
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
