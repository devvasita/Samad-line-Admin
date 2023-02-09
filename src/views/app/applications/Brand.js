import React, { useState } from 'react';
import {
  CardSubtitle,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  // Badge,
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
import './brand.css';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
import CancelIcon from '@mui/icons-material/Cancel';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

// import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import './Demo.css';

function Brand() {
  const [modalLong, setModalLong] = useState(false);

  const [state, setState] = useState({
    title: '',
    detail: '',
    label: {},
    category: {},
    status: 'PENDING',
  });
  const [file, setFile] = useState();
  // const hiddenFileInput = React.useRef(null);
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  // const handleClick = () => {
  //   hiddenFileInput.current.click();
  // };
  const handleCancelImage = () => {
    setFile(null);
  };

  // const [image, setImage] = useState(defaultSrc);
  // const [cropData, setCropData] = useState("#");
  // const [cropper, setCropper] = useState<any>();
  // const onChange = (e) => {
  //   e.preventDefault();
  //   let files;
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImage(reader.result );
  //   };
  //   reader.readAsDataURL(files[0]);
  // };

  // const getCropData = () => {
  //   if (typeof cropper !== "undefined") {
  //     setCropData(cropper.getCroppedCanvas().toDataURL());
  //   }
  // };

  return (
    <Row>
      <Colxx xxs="12">
        <div className="d-flex justify-content-between mb-4">
          <h1>Brand</h1>
          <Button
            size="sm"
            color="primary"
            outline
            onClick={() => setModalLong(true)}
          >
            <IntlMessages id="+ Add Brand" />
          </Button>
        </div>

        <Separator className="mb-4" />
      </Colxx>
      <Card className="mb-4 rounded">
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
              Add Brand
            </ModalHeader>

            <Label className="mt-4">
              <IntlMessages id="Upload Image : " />
            </Label>
            <div>
              {!file ? (
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
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        margin: 'auto',
                        width: '50%',
                        height: '115px',
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
                        src={file}
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
              defaultValue={state.title}
              onChange={(event) =>
                setState({ ...state, title: event.target.value })
              }
            />
          </ModalBody>
          <ModalFooter style={{ borderTop: 'none' }}>
            {/* <button
                    type="button"
                    className="new"
                    // style={{ background: '#007bff', border: 'none' }}
                    onClick={() => setModalLong(false)}
                  >
                    Add
                  </button> */}
            <Button
              outline
              className="primary-new"
              // style={{ background: '#007bff', border: 'none' }}
              onClick={() => setModalLong(false)}
            >
              Add
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
          <Colxx xxs="12" xs="6" lg="2">
            <Card className="mb-4">
              <div className="position-relative">
                <CardImg
                  top
                  src="/assets/img/cards/thumb-1.jpg"
                  alt="Card image cap"
                />
              </div>
              <CardBody className="p-2">
                <CardSubtitle className="mb-3 font-weight-bold font-size-11">
                  <h2>Home Food</h2>
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
                    onClick={() => setModalLong(true)}
                  >
                    Edit
                  </Button>
                  <Button outline color="danger" size="sm">
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
}

export default Brand;
