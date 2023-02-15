import React from 'react';
import {
  CardSubtitle,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Badge,
  Button,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

const ImageCards = () => {
  return (
    <Row>
      <Colxx xxs="12">
        <CardTitle className="mb-4">
          <IntlMessages id="Category" />
        </CardTitle>
        <Row>
          <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">
              <div className="position-relative">
                <CardImg
                  top
                  src="/assets/img/cards/thumb-1.jpg"
                  alt="Card image cap"
                />
                <Badge
                  color="primary"
                  pill
                  className="position-absolute badge-top-left"
                >
                  NEW
                </Badge>
                <Badge
                  color="secondary"
                  pill
                  className="position-absolute badge-top-left-2"
                >
                  TRENDING
                </Badge>
              </div>
              <CardBody>
                <CardSubtitle className="mb-4 font-weight-bold font-size-11">
                  <h1>Home Food</h1>
                </CardSubtitle>
                {/* <CardText className="text-muted text-small mb-0 font-weight-light">
                  09.04.2018
                </CardText> */}
                <div className="d-flex justify-content-end">
                  <Button className="mr-1">Edit</Button>
                  <Button>Delete</Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Colxx>
    </Row>
  );
};

export default ImageCards;
