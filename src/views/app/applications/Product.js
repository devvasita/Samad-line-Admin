import { Colxx, Separator } from 'components/common/CustomBootstrap';
import React from 'react';
import { Row } from 'reactstrap';

function Product() {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Product</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    </>
  );
}

export default Product;
