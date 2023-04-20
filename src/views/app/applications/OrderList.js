/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import 'rc-switch/assets/index.css';
import './order.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { useHistory } from 'react-router-dom';

const Container = styled('div')(() => ({
  paddingTop: '1rem',
}));

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

function OrderList({ orders }) {
  const { orders: userOrders } = orders;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const history = useHistory();
  const handleView = (_id) => {
    history.push(`/app/applications/orders/${_id}`);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container>
      <Colxx xxs="12">
        <div className="d-flex justify-content-sm-between">
          <h1>Order Details</h1>
        </div>
        <Separator className="mb-5" />
      </Colxx>

      <Box className="plan">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center" width="200px">
                Order ID
              </TableCell>
              <TableCell align="center">
                <text>Customer Name</text>
              </TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Total </TableCell>
              <TableCell align="center">Payment status </TableCell>
              <TableCell align="center">Order Status </TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ padding: '10px' }}>
            {userOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.id}>
                  <TableCell align="center">#{order._id}</TableCell>
                  <TableCell align="center">{order.user.firstName}</TableCell>
                  <TableCell align="center">{order.user.mobileNo}</TableCell>
                  <TableCell align="center">{order.total}</TableCell>
                  <TableCell align="center">{order.paymentStatus}</TableCell>
                  <TableCell align="center">
                    {order.currentOrderStatus &&
                      order.currentOrderStatus.status}
                  </TableCell>
                  <TableCell align="center">
                    <i
                      className="simple-icon-eye"
                      onClick={() => handleView(order._id)}
                      onKeyDown={() => handleView(order._id)}
                      aria-hidden="true"
                      style={{
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: '#6fb326',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>

        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          className="page"
          rowsPerPage={rowsPerPage}
          count={userOrders.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />
      </Box>
    </Container>
  );
}

export default OrderList;
