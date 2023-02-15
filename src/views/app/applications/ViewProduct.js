import { Colxx, Separator } from 'components/common/CustomBootstrap';
import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  // Button,
  CardTitle,
} from 'reactstrap';
// import SingleLightbox from 'components/pages/SingleLightbox';
// import ThumbnailImage from 'components/cards/ThumbnailImage';
// import { NavLink } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
import GlideComponentThumbs from 'components/carousel/GlideComponentThumbs';
import IntlMessages from 'helpers/IntlMessages';
import GlideComponent from 'components/carousel/GlideComponent';

// const useStyles = makeStyles({
//   cancel: {
//     border: '1px solid #6c757d',
//     background: 'none',
//     color: '#6c757d',
//     padding: '0.5rem 1.25rem 0.5rem 1.25rem',
//     borderRadius: '50px',
//     marginLeft: '10px',
//     '&:hover': {
//       background: '#6c757d',
//       border: '1px solid #6c757d',
//     },
//   },
// });

export const detailImages = [
  {
    id: 'large1',
    img: '/assets/img/products/img1.webp',
  },
  {
    id: 'large2',
    img: '/assets/img/products/img2.jpg',
  },
  {
    id: 'large3',
    img: '/assets/img/products/img3.jpg',
  },
  {
    id: 'large4',
    img: '/assets/img/products/img4.webp',
  },
  {
    id: 'large5',
    img: '/assets/img/products/img5.jpg',
  },
  {
    id: 'large6',
    img: '/assets/img/products/img6.jpg',
  },
  {
    id: 'large7',
    img: '/assets/img/products/img7.webp',
  },
  {
    id: 'large8',
    img: '/assets/img/products/img8.jpg',
  },
  {
    id: 'large9',
    img: '/assets/img/products/img9.webp',
  },
  {
    id: 'large10',
    img: '/assets/img/products/img3.jpg',
  },
];

export const detailThumbs = [
  {
    id: 'thumb1',
    img: '/assets/img/products/img1.webp',
  },
  {
    id: 'thumb2',
    img: '/assets/img/products/img2.jpg',
  },
  {
    id: 'thumb3',
    img: '/assets/img/products/img3.jpg',
  },
  {
    id: 'thumb4',
    img: '/assets/img/products/img4.webp',
  },
  {
    id: 'thumb5',
    img: '/assets/img/products/img5.jpg',
  },
  {
    id: 'thumb6',
    img: '/assets/img/products/img6.jpg',
  },
  {
    id: 'thumb7',
    img: '/assets/img/products/img7.webp',
  },
  {
    id: 'thumb8',
    img: '/assets/img/products/img8.jpg',
  },
  {
    id: 'thumb9',
    img: '/assets/img/products/img9.webp',
  },
  {
    id: 'thumb10',
    img: '/assets/img/products/img3.jpg',
  },
];
export const items = [
  {
    id: 1,
    title: '1 Homemade Cheesecake with Fresh Berries and Mint',
    img: '/assets/img/cards/sim1.webp',
    detail: '10.12.2019',
    category: 'Cupcakes',
    color: 'Black',
    badges: [
      {
        color: 'theme-1',
        title: 'NEW',
      },
      {
        color: 'theme-2',
        title: 'ONHOLD',
      },
    ],
  },
  {
    id: 2,
    title: '2 Wedding Cake with Flowers Macarons and Blueberries',
    img: '/assets/img/cards/sim2.webp',
    detail: '01.06.2019',
    category: 'Cakes',
    color: 'Gray',
    badges: [
      {
        color: 'theme-2',
        title: 'DONE',
      },
      {
        color: 'primary',
        title: 'TRENDING',
      },
    ],
  },
  {
    id: 3,
    title: '3 Cheesecake with Chocolate Cookies and Cream Biscuits',
    img: '/assets/img/cards/sim3.webp',
    detail: '27.05.2019',
    category: 'Cupcakes',
    color: 'Blue',
    badges: [
      {
        color: 'secondary',
        title: 'PROCESSED',
      },
    ],
  },
  {
    id: 4,
    title: '4 Homemade Cheesecake with Fresh Berries and Mint',
    img: '/assets/img/cards/sim4.webp',
    detail: '10.12.2019',
    category: 'Cakes',
    color: 'Green',
    badges: [
      {
        color: 'primary',
        title: 'NEW',
      },
    ],
  },
  {
    id: 5,
    title: '5 Cheesecake with Chocolate Cookies and Cream Biscuits',
    img: '/assets/img/cards/sim5.webp',
    detail: '27.05.2019',
    category: 'Cupcakes',
    color: 'Dark Blue',
    badges: [
      {
        color: 'theme-3',
        title: 'PROCESSED',
      },
    ],
  },
];

const BasicCarouselItem = ({ title, img, detail }) => {
  return (
    <div className="glide-item">
      <Card className="flex-row d-block" style={{ borderRadius: '0.75rem' }}>
        <div className="w-100 position-relative h-50">
          <img className="card-img-left" src={img} alt={title} />
        </div>
        <div className="w-100">
          <CardBody>
            <span className="mb-4">{title}</span>
            <footer>
              <p className="text-muted text-small mb-0 font-weight-light">
                {detail}
              </p>
            </footer>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

const SingleCarouselItem = ({ title, img }) => {
  return (
    <div className="glide-item">
      <Card className="flex-row" style={{ borderRadius: '0.75rem' }}>
        <img
          className="list-thumbnail responsive border-0 card-img-left"
          src={img}
          alt={title}
        />
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <CardBody className="align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
            <p className="list-item-heading mb-1 truncate">{title}</p>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

function ViewProduct() {
  // const classes = useStyles();

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>View Product</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <CardTitle style={{ padding: '5px' }}>
        <h2>MUSCLEBLAZE Beginner&apos;s Whey Protein(2 kg) </h2>
      </CardTitle>

      <Row>
        <Colxx xxs="12" md="12" xl="6" className="col-right">
          <Row>
            <Card className="mb-4">
              <GlideComponentThumbs
                settingsImages={{
                  bound: true,
                  rewind: false,
                  focusAt: 0,
                  startAt: 0,
                  gap: 5,
                  perView: 1,
                  data: detailImages,
                }}
                settingsThumbs={{
                  bound: true,
                  rewind: false,
                  focusAt: 0,
                  startAt: 0,
                  gap: 10,
                  perView: 5,
                  data: detailThumbs,
                  breakpoints: {
                    576: {
                      perView: 4,
                    },
                    420: {
                      perView: 3,
                    },
                  },
                }}
              />
              <CardBody>
                <div className="d-flex align-items-center mb-2">
                  <img
                    src="/assets/img/products/veg-icon.svg"
                    alt="Chitr - Veg Symbol - Svg - Veg And Non Veg Icons@pngkey.com"
                    style={{
                      height: '30px',
                      width: '30px',
                      marginRight: '5px',
                      // marginTop: '10px',
                    }}
                  />
                  <h5 style={{ marginBottom: '0px' }}>
                    <b>This is a Vegetarian Product</b>
                  </h5>
                </div>
                <Separator className="mb-5" />
                <div className="mb-5">
                  <h5 className="card-title">
                    <b>About This Product</b>
                  </h5>
                </div>

                <div>
                  <ul style={{ padding: '0px 0px 0px 15px' }}>
                    <li className="card-title">
                      <p>
                        MB Biozyme Performance Whey comes with a proprietary
                        international patent-pending Enhanced Absorption Formula
                        (EAF ®) that ensures 50% higher protein absorption & 60%
                        superior BCAA absorption when compared to other whey
                        proteins
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul style={{ padding: '0px 0px 0px 15px' }}>
                    <li className="card-title">
                      <p>
                        The leading Biozyme range by MuscleBlaze ® are
                        India&apos;s first clinically-tested Whey Protein
                        offerings which have been tested & proven for their
                        efficacy (absorption & muscle-building) on Indian bodies
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul style={{ padding: '0px 0px 0px 15px' }}>
                    <li className="card-title">
                      <p>
                        MuscleBlaze Biozyme Performance Whey is crafted
                        exclusively for fitness and muscle-building champions
                        who want their protein supplement to be as effective as
                        their efforts. It is scientifically designed with
                        Enhanced Absorption Formula (EAF®) to maximize the
                        bioavailability of protein for the Indian bodies.
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul style={{ padding: '0px 0px 0px 15px' }}>
                    <li className="card-title">
                      <p>
                        The leading Biozyme range by MuscleBlaze ® are India
                        first clinically-tested Whey Protein offerings which
                        have been tested & proven for their efficacy (absorption
                        & muscle-building) on Indian bodies
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul style={{ padding: '0px 0px 0px 15px' }}>
                    <li className="card-title">
                      <p>
                        The leading Biozyme range by MuscleBlaze ® are India
                        first clinically-tested Whey Protein offerings which
                        have been tested & proven for their efficacy (absorption
                        & muscle-building) on Indian bodies
                      </p>
                    </li>
                  </ul>
                </div>

                <div>
                  <ul style={{ padding: '0px 0px 0px 15px' }}>
                    <li className="card-title">
                      <p>
                        Biozyme Performance Whey delivers 25g of protein per
                        serving and is powered by all-imported, highest grade,
                        international quality Whey Protein Concentrate
                      </p>
                    </li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Row>
        </Colxx>
        <Colxx xl="6">
          <Row>
            <Colxx xxs="12" md="12" xl="6" className="col-left">
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
                  className="iconsminds-pricing m-4 display-6"
                />

                <div className=" d-flex flex-grow-1 min-width-zero">
                  <CardBody className=" p-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero">
                      <CardSubtitle
                        className="truncate mb-1"
                        style={{ fontSize: '17px' }}
                      >
                        MRP(₹)
                      </CardSubtitle>

                      <CardText className="mb-2" style={{ color: '#6fb327' }}>
                        <b>500₹</b>
                      </CardText>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Colxx>
            <Colxx xxs="12" md="12" xl="6" className="col-left">
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
                  className="iconsminds-pricing m-4 display-6"
                />

                <div className=" d-flex flex-grow-1 min-width-zero">
                  <CardBody className=" p-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero">
                      <CardSubtitle
                        className="truncate mb-1"
                        style={{ fontSize: '17px' }}
                      >
                        Price(₹)
                      </CardSubtitle>

                      <CardText className="mb-2" style={{ color: '#6fb327' }}>
                        <b>400₹</b>
                      </CardText>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Colxx>
            <Colxx xxs="12" md="12" xl="6" className="col-left">
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
                  className="iconsminds-cookies m-4 display-6"
                />

                <div className=" d-flex flex-grow-1 min-width-zero">
                  <CardBody className=" p-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero">
                      <CardSubtitle
                        className="truncate mb-1"
                        style={{ fontSize: '17px' }}
                      >
                        Flavour
                      </CardSubtitle>

                      <CardText className="mb-2" style={{ color: '#6fb327' }}>
                        <b>Chocolate</b>
                      </CardText>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Colxx>
            <Colxx xxs="12" md="12" xl="6" className="col-left">
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
                  className="iconsminds-can m-4 display-6"
                />

                <div className=" d-flex flex-grow-1 min-width-zero">
                  <CardBody className=" p-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                    <div className="min-width-zero">
                      <CardSubtitle
                        className="truncate mb-1"
                        style={{ fontSize: '17px' }}
                      >
                        Brand
                      </CardSubtitle>

                      <CardText className="mb-2" style={{ color: '#6fb327' }}>
                        <b>MUSCLEBLAZE</b>
                      </CardText>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Colxx>
          </Row>

          <Row>
            <Colxx xl="12">
              <Card style={{ borderRadius: '0.75rem' }}>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Other Unit" />
                  </CardTitle>
                  <GlideComponent
                    settings={{
                      gap: 5,
                      perView: 2,
                      type: 'carousel',
                      breakpoints: {
                        480: { perView: 1 },
                        800: { perView: 2 },
                        1200: { perView: 3 },
                      },
                    }}
                  >
                    {items.map((item) => {
                      return (
                        <div key={item.id}>
                          <BasicCarouselItem {...item} />
                        </div>
                      );
                    })}
                  </GlideComponent>
                </CardBody>
              </Card>
            </Colxx>
          </Row>

          <Row>
            <Colxx xl="12">
              <Card style={{ borderRadius: '0.75rem', marginTop: '20px' }}>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Other Color" />
                  </CardTitle>
                  <GlideComponent
                    settings={{
                      gap: 5,
                      perView: 1,
                      type: 'carousel',
                    }}
                  >
                    {items.map((item) => {
                      return (
                        <div key={item.id}>
                          <SingleCarouselItem {...item} />
                        </div>
                      );
                    })}
                  </GlideComponent>
                </CardBody>
              </Card>
            </Colxx>
          </Row>

          <Row>
            <Colxx xl="12">
              <Card style={{ borderRadius: '0.75rem', marginTop: '20px' }}>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Other Flavours" />
                  </CardTitle>
                  <GlideComponent
                    settings={{
                      gap: 5,
                      perView: 2,
                      type: 'carousel',
                      breakpoints: {
                        480: { perView: 1 },
                        800: { perView: 2 },
                        1200: { perView: 3 },
                      },
                    }}
                  >
                    {items.map((item) => {
                      return (
                        <div key={item.id}>
                          <BasicCarouselItem {...item} />
                        </div>
                      );
                    })}
                  </GlideComponent>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12">
          <CardTitle>
            <IntlMessages id="Simmilar Product" />
          </CardTitle>
        </Colxx>
        <Colxx xxs="12" className="pl-0 pr-0 mb-5">
          <GlideComponent
            settings={{
              gap: 5,
              perView: 4,
              type: 'carousel',
              breakpoints: {
                480: { perView: 1 },
                800: { perView: 2 },
                1200: { perView: 3 },
              },
            }}
          >
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <BasicCarouselItem {...item} />
                </div>
              );
            })}
          </GlideComponent>
        </Colxx>
      </Row>
    </>
  );
}

export default ViewProduct;
