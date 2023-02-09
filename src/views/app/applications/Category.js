import React, { useState } from 'react';
import {
  CardSubtitle,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  ModalFooter,
  Input,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

import CancelIcon from '@mui/icons-material/Cancel';
import './category.css';

function Category() {
  const [modalRight, setModalRight] = useState(false);
  const [state, setState] = useState({
    title: '',
    detail: '',
    label: {},
    category: {},
    status: 'PENDING',
  });

  const [file, setFile] = useState();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleCancelImage = () => {
    setFile(null);
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
            onClick={() => setModalRight(true)}
          >
            <IntlMessages id="+ Add Category" />
          </Button>
        </div>
        <Separator className="mb-5" />
        <Card className="mb-4 rounded">
          <Modal
            isOpen={modalRight}
            centered
            toggle={() => setModalRight(!modalRight)}
            style={{
              boxShadow: 'none',
            }}
          >
            <ModalBody>
              <ModalHeader style={{ padding: '5px 0px 5px 0px' }}>
                Add Category
              </ModalHeader>
              <Label className="mt-4">
                <IntlMessages id="Upload Image :" />
              </Label>
              <div>
                {!file ? (
                  <div className="modelCategory">
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
              <Button
                className="primary-new"
                onClick={() => setModalRight(false)}
              >
                Add
              </Button>{' '}
              <Button
                className="secondary-new"
                onClick={() => setModalRight(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Card>
      </Colxx>
      <Colxx xxs="12">
        <CardTitle className="mb-4">
          <IntlMessages id="Category" />
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
                  <h2>Fashion</h2>
                </CardSubtitle>
                {/* <CardText className="text-muted text-small mb-0 font-weight-light">
                09.04.2018
              </CardText> */}
                <div className="d-flex justify-content-center">
                  <Button
                    size="sm"
                    color="secondary"
                    outline
                    className="mr-1"
                    onClick={() => setModalRight(true)}
                  >
                    Edit
                  </Button>
                  <Button size="sm" color="danger" outline>
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

export default Category;
