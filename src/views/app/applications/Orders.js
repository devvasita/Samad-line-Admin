import { Colxx, Separator } from 'components/common/CustomBootstrap';
import React from 'react';
import { Row } from 'reactstrap';

function Orders() {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Orders</h1>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    </>
  );
}

export default Orders;
