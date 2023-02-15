import React from 'react';
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
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

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

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Offer Details</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <CardTitle style={{ padding: '5px' }}>
        <h2>Laptop :-</h2>
        {/* <IntlMessages id="Game Changing Features :-" /> */}
      </CardTitle>
      <Row>
        <Colxx xxs="12" md="12" xl="6" className="col-right">
          {' '}
          <Card className="mb-4" style={{ borderRadius: '0.75rem' }}>
            <SingleLightbox
              thumb="/assets/offers/laptop.jpg"
              large="/assets/offers/laptop.jpg"
              className="responsive border-0 card-img-top mb-3"
            />
            <CardBody>
              <div className="mb-5">
                <h5 className="card-title">Laptop Features</h5>
                <p>
                  Blended value human-centered social innovation resist scale
                  and impact issueoutcomesbandwidth efficient. A; social return
                  on investment, change-makers, support a,co-createcommitment
                  because sustainable. Rubric when vibrant black lives matter
                  benefitcorporation human-centered. Save the world,
                  problem-solvers support silo massincarceration.
                </p>
                <p>
                  Mass incarceration, preliminary thinking systems thinking
                  vibrant thought leadershipcorporate social responsibility.
                  Green space global, policymaker; shared
                  valuedisruptsegmentation social capital.
                </p>
              </div>

              <div>
                <h5 className="card-title">Revolutionary Bandwidth</h5>
                <p>
                  The great thing is that these promotions rarely cost anything.
                  In fact, they’re designed to increase revenue. For example,
                  let’s say you pay $3 for a product that you sell for $10. If
                  you offer a 50% discount, you’d be making $2 from selling just
                  one at the discounted price. However, running a BOGO discount
                  means you can sell one item at full price minus your cost for
                  two items so, in the end, you’d be earning $4. With more
                  people buying that product as a result of your promo, your
                  profits would soar.
                </p>
              </div>
            </CardBody>
            <div
              style={{
                textAlign: 'end',
                padding: '0 1.75rem 1.75rem 1.75rem',
              }}
            >
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
                    <b>50% off</b>
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
                    <b> 29 March,2023</b>
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
