import { Colxx } from 'components/common/CustomBootstrap';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Row } from 'reactstrap';
import { getAdminOrders } from 'redux/auth/actions';
import OrderList from './OrderList';

function Orders({ getOrders, orders }) {
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <OrderList orders={orders} />
        </Colxx>
      </Row>
    </>
  );
}

const mapStateToProps = ({ authUser }) => {
  const { orders } = authUser;
  return { orders };
};
const mapDispatchToProps = (dispatch) => ({
  getOrders: () => dispatch(getAdminOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
