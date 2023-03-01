import React, { useEffect } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import SingleLightbox from 'components/pages/SingleLightbox';
// import ThumbnailImage from 'components/cards/ThumbnailImage';
import { NavLink, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { getSingleOffer } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';

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
});

function ViewOffer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  const data = useSelector((state) => state?.offer?.selectedOffer);
  useEffect(() => {
    dispatch(getSingleOffer(id));
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Offer Details</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <CardTitle style={{ padding: '5px' }}>
        <h2>{data?.title} :-</h2>
        {/* <IntlMessages id="Game Changing Features :-" /> */}
      </CardTitle>
      <Row>
        <Colxx xxs="12" md="12" xl="6" className="col-right">
          {' '}
          <Card className="mb-4" style={{ borderRadius: '0.75rem' }}>
            <SingleLightbox
              thumb={data?.image?.url}
              large={data?.image?.url}
              className="responsive border-0 card-img-top mb-3"
            />
            <CardBody>
              <div className="mb-5">
                <h5 className="card-title">Offer Features</h5>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.description,
                  }}
                />
              </div>
            </CardBody>
            <div
              style={{
                textAlign: 'end',
                padding: '0 1.75rem 1.75rem 1.75rem',
              }}
            >
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
          </Card>
        </Colxx>
        <Colxx xxs="12" md="12" xl="3" className="col-left">
          <Card
            className="d-flex flex-row mb-4"
            style={{ borderRadius: '0.75rem' }}
          >
            <i
              rounded
              style={{
                fontSize: '30px',
                margin: 'auto 10px',
                color: '#6fb327',
              }}
              className="iconsminds-tag-3 m-4 display-6"
            />

            <div className=" d-flex flex-grow-1 min-width-zero">
              <CardBody className=" p-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <CardSubtitle
                    className="truncate mb-1"
                    style={{ fontSize: '17px' }}
                  >
                    Discount
                  </CardSubtitle>

                  <CardText className="mb-2" style={{ color: '#6fb327' }}>
                    <b>{data?.percentage} off</b>
                  </CardText>
                </div>
              </CardBody>
            </div>
          </Card>
          <Card
            className="d-flex flex-row mb-4"
            style={{ borderRadius: '0.75rem' }}
          >
            <i
              rounded
              style={{
                fontSize: '30px',
                margin: 'auto 10px',
                color: '#6fb327',
              }}
              className="iconsminds-calendar-1 m-4 display-6"
            />

            <div className=" d-flex flex-grow-1 min-width-zero">
              <CardBody className=" p-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <CardSubtitle
                    className="truncate mb-1"
                    style={{ fontSize: '17px' }}
                  >
                    Valid Till
                  </CardSubtitle>

                  <CardText className="mb-2">
                    <b>{data?.validTill}</b>
                  </CardText>
                </div>
              </CardBody>
            </div>
          </Card>
        </Colxx>
      </Row>
    </>
  );
}

export default ViewOffer;
