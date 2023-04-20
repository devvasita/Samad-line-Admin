/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormControl, InputLabel, Select } from '@mui/material';
import { Box } from '@mui/system';
import { Colxx } from 'components/common/CustomBootstrap';
import React, { useEffect, useState } from 'react';
import { MenuItem } from 'react-contextmenu';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row } from 'reactstrap';
import { getOrderById } from 'redux/auth/actions';

const OrderDetails = ({ getOrderDetails, selectedOrder }) => {
  const { id } = useParams();
  const {
    currentOrderStatus,
    orderItems,
    shippingAddress,
    subTotal,
    total,
    tax,
    _id,
  } = selectedOrder;
  useEffect(() => {
    getOrderDetails(id);
  }, [id]);

  const initStatus = [
    { label: 'Order Placed', value: 'Order Placed' },
    { label: 'Order Confirmed', value: 'Order Confirmed' },
    { label: 'Out For Delivery', value: 'Out For Delivery' },
    { label: 'Order Delivered', value: 'Order Delivered' },
    { label: 'Cancelled', value: 'Cancelled' },
  ];
  const [status, setStatus] = useState('');
  const [statusOption, setStatusOption] = useState([...initStatus]);

  useEffect(() => {
    setStatus(currentOrderStatus.status);
  }, [selectedOrder, currentOrderStatus]);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="Order-Details-traking-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8  ">
            <div className="Order-ID-body">
              <div className="Order-ID-box">
                <img src="asstes/img/order-logo/packStatus.png" alt="" />
              </div>
              <div className="order-id-list">
                <h5>Order ID: #{_id}</h5>
                <p>
                  {orderItems && orderItems.length} Items .{' '}
                  {currentOrderStatus && currentOrderStatus.status}
                </p>
              </div>
            </div>

            <Row>
              <Colxx lg="6" xs="6" sm="6">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      onChange={handleChange}
                    >
                      {statusOption.map(({ value, label }) => (
                        <MenuItem value={value} key={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Colxx>
            </Row>

            <div className=" order-details-traking-section  ">
              {orderItems.map(
                ({
                  name,
                  image,
                  price,
                  qty,
                  _id: ProductId,
                  flavour,
                  nonVeg,
                }) => (
                  <div
                    className="order-details-traking-contain col-lg-11 col-md-12 "
                    key={ProductId}
                    style={{
                      boxShadow:
                        '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <div className="row ">
                      <div className="col-lg-2 col-md-3  d-flex align-items-center justify-content-center m-0 p-0">
                        <div className="order-details-traking-img-box">
                          <Link to={`/product/${_id}`}>
                            <a>
                              {' '}
                              <img src={image} alt="" />
                            </a>
                          </Link>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-6 ">
                        <div className="order-details-traking-list">
                          <Link to={`/product/${_id}`}>
                            <a>
                              <h5>{name}</h5>
                              {flavour !== '' && (
                                <iconify-icon
                                  icon="mdi:lacto-vegetarian"
                                  className="veg-icon"
                                  style={
                                    nonVeg
                                      ? {
                                          color: 'red',
                                        }
                                      : {
                                          color: 'green',
                                        }
                                  }
                                />
                              )}
                            </a>
                          </Link>
                          <div className="Price-tag">
                            <p>Qty: {qty}</p>
                            <p>Price : ₹{qty * price}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="col-lg-4 d-flex justify-content-center">
            <div className="col-lg-10 col-md-12 ">
              <div className="row">
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div
                    className="delivery-address-details "
                    style={{
                      boxShadow:
                        '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <p className="Shipping-details" style={{ marginBottom: 0 }}>
                      Shipping Details
                    </p>
                    <div className=" name-addres-details">
                      <h6>
                        {shippingAddress && shippingAddress.firstName}{' '}
                        {shippingAddress && shippingAddress.lastName}
                      </h6>
                      <p>
                        {shippingAddress && shippingAddress.addressLine1},
                        <br />
                        {shippingAddress && shippingAddress.addressLine2},
                        <br />
                        {shippingAddress && shippingAddress.city}-
                        {shippingAddress && shippingAddress.pinCode},
                        {shippingAddress && shippingAddress.country}
                        <br />
                        +91 {shippingAddress && shippingAddress.phoneNo}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div
                    className="total-box "
                    style={{
                      boxShadow:
                        '0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" colSpan="4" className="Price-detal ">
                            Price Details
                          </th>
                        </tr>
                      </thead>
                      <tbody style={{ background: '#FFFFFF' }}>
                        <tr>
                          <th scope="row" />
                          <td className="subtotal">Subtotal :</td>
                          <td />
                          <td className="text-end ">₹12689</td>
                        </tr>
                        <tr>
                          <th scope="row" />
                          <td className="discount">Discount :</td>
                          <td className="text-end" />
                          <td className="text-end">
                            <span className="me-2">-</span> ₹{subTotal}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" />
                          <td className="info-btn">
                            Tax
                            <i className="bi bi-info-circle" />
                            <span className="ms-3">:</span>{' '}
                          </td>
                          <td className="text-end" />
                          <td className="text-end">
                            <span className="me-2">+</span> ₹{tax}
                          </td>
                        </tr>
                        <tr className="total-border">
                          <th scope="row" />
                          <th className="fw-semibold">Total :</th>
                          <td className="" />
                          <th className="text-end fw-semibold">₹ {total}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { selectedOrder } = authUser;
  return { selectedOrder };
};
const mapDispatchToProps = (dispatch) => ({
  getOrderDetails: (_id) => dispatch(getOrderById(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
