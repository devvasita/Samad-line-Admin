/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useHistory, useParams } from 'react-router-dom';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import GlideComponentThumbs from 'components/carousel/GlideComponentThumbs';
import IntlMessages from 'helpers/IntlMessages';
import GlideComponent from 'components/carousel/GlideComponent';
import { getSingleProduct } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';

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
    title: '1 Homemade Cheesecake with Flowers',
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
    title: '2 Wedding Cake with Flowers Macarons ',
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
    title: '3 Cheesecake with Chocolate Cookies ',
    img: '/assets/img/cards/sim3.webp',
    detail: '27.05.2019',
    category: 'Cupcakes',
    color: 'Black-red',
    badges: [
      {
        color: 'secondary',
        title: 'PROCESSED',
      },
    ],
  },
  {
    id: 4,
    title: '4 Homemade Cheesecake with Flowers',
    img: '/assets/img/cards/sim4.webp',
    detail: '10.12.2019',
    category: 'Cakes',
    color: 'Gold Black',
    badges: [
      {
        color: 'primary',
        title: 'NEW',
      },
    ],
  },
  {
    id: 5,
    title: '5 Cheesecake with Chocolate Cookies ',
    img: '/assets/img/cards/sim5.webp',
    detail: '27.05.2019',
    category: 'Cupcakes',
    color: 'White',
    badges: [
      {
        color: 'theme-3',
        title: 'PROCESSED',
      },
    ],
  },
];
const BasicCarouselItem = ({ name, image, createdAt, _id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleViewProduct = () => {
    dispatch(getSingleProduct(_id));
    history.push(`/app/applications/viewProduct/${_id}`);
  };
  return (
    <div className="glide-item">
      <Card
        onClick={handleViewProduct}
        className="flex-row d-block"
        style={{ borderRadius: '0.75rem' }}
      >
        <div className="w-100 position-relative h-50 p-2">
          <img
            className="card-img-left"
            style={{ height: 200, width: 200 }}
            src={image ? image.find((elem) => elem.url !== '').url : null}
            alt={name}
          />
        </div>
        <div className="w-100">
          <CardBody>
            <p
              className="mb-4 truncate"
              style={{
                display: '-webkit-box',
                webkitlineClamp: '4',
                overflow: 'hidden',
                webkitLineClamp: '2',
                webkitBoxOrient: 'vertical',
                whiteSpace: 'normal',
              }}
            >
              {name}
            </p>
            <footer>
              <p className="text-muted text-small mb-0 font-weight-light">
                {createdAt?.split('T')[0]}
              </p>
            </footer>
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

function ViewProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.product?.selectedProduct);

  const [imgArr, setimgArr] = useState([]);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, []);

  useEffect(() => {
    if (data) {
      const filteredImg = [];
      data.image.map(
        (elem, i) =>
          elem.url !== '' &&
          filteredImg.push({
            img: elem.url,
            key: i,
          })
      );
      setimgArr(filteredImg);
    }
  }, [data]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>View Products</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <CardTitle style={{ padding: '5px' }}>
        <h2>
          {data?.name}({data?.value}
          {data?.unit}):-
        </h2>
      </CardTitle>
      {console.log({ data })}
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
                  data: imgArr,
                }}
                settingsThumbs={{
                  bound: true,
                  rewind: false,
                  focusAt: 0,
                  startAt: 0,
                  gap: 10,
                  perView: 5,
                  data: imgArr,
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
                    src={
                      data?.nonVeg
                        ? `/assets/img/products/non-veg-icon.svg`
                        : `/assets/img/products/veg-icon.svg`
                    }
                    alt="Chitr - Veg Symbol - Svg - Veg And Non Veg mailto:icons@pngkey.com"
                    style={{
                      height: '30px',
                      width: '30px',
                      marginRight: '5px',
                    }}
                  />
                  <h5 style={{ marginBottom: '0px' }}>
                    {data?.nonVeg ? (
                      <b>This is a non-Veg Product</b>
                    ) : (
                      <b>This is a Vegetarian Product</b>
                    )}
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
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data?.description,
                        }}
                      />
                    </li>
                  </ul>
                </div>

                {/* <div>
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
                </div> */}
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
                        <b>₹{data?.mrp}</b>
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
                        <b>₹{data?.price}</b>
                      </CardText>
                    </div>
                  </CardBody>
                </div>
              </Card>
            </Colxx>
            {data?.flavour !== 'null' && (
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
                          <b>{data?.flavour}</b>
                        </CardText>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </Colxx>
            )}

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
                        <b>{data?.brand}</b>
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
                {data && data.otherUnit.length ? (
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
                      {data.otherUnit.map((item) => {
                        return (
                          <div key={item._id}>
                            <BasicCarouselItem {...item.value} />
                          </div>
                        );
                      })}
                    </GlideComponent>
                  </CardBody>
                ) : null}
              </Card>
            </Colxx>
          </Row>

          <Row>
            <Colxx xl="12">
              <Card style={{ borderRadius: '0.75rem', marginTop: '20px' }}>
                {data && data.otherColor.length ? (
                  <CardBody>
                    <CardTitle>
                      <IntlMessages id="Other Color" />
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
                      {data.otherColor.map((item) => {
                        return (
                          <div key={item._id}>
                            <BasicCarouselItem {...item.value} />
                          </div>
                        );
                      })}
                    </GlideComponent>
                  </CardBody>
                ) : null}
              </Card>
            </Colxx>
          </Row>

          <Row>
            <Colxx xl="12">
              <Card style={{ borderRadius: '0.75rem', marginTop: '20px' }}>
                {data && data.otherFlavour.length ? (
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
                      {data.otherFlavour.map((item) => {
                        return (
                          <div key={item._id}>
                            <BasicCarouselItem {...item.value} />
                          </div>
                        );
                      })}
                    </GlideComponent>
                  </CardBody>
                ) : null}
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mt-3">
          <CardTitle>
            <h3>Suggested Product:</h3>
          </CardTitle>
        </Colxx>
        {data && data.suggestedProduct.length ? (
          <Colxx xxs="12" className="pl-0 pr-0 mb-5">
            <GlideComponent
              settings={{
                gap: 5,
                perView: 4,
                type: 'carousel',
                rewind: false,
                breakpoints: {
                  480: { perView: 1 },
                  800: { perView: 2 },
                  1200: { perView: 3 },
                },
              }}
            >
              {data.suggestedProduct.map((item) => {
                return (
                  <div key={item._id}>
                    <BasicCarouselItem {...item.value} />
                  </div>
                );
              })}
            </GlideComponent>
          </Colxx>
        ) : null}
      </Row>
    </>
  );
}

export default ViewProduct;
