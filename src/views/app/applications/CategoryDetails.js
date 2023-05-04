/* eslint-disable no-unused-vars */
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
import Switch from '@mui/material/Switch';
// import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

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

const dataList = [
  {
    id: 1,
    userName: 'Jay Patel',
    mobile: '9876543211',
    email: 'johntest@gmail.com',
    status: 'block',
  },
  {
    id: 2,
    userName: 'Mayank tejani',
    mobile: '9126543211',
    email: 'mayanktejani@gmail.com',
    status: 'block',
  },
  {
    id: 3,
    userName: 'Kuldeep Yadav',
    mobile: '9876577777',
    email: 'Kuldeep23@gmail.com',
    status: 'block',
  },
  {
    id: 4,
    userName: 'Divya Sharma',
    mobile: '9872243211',
    email: 'divyasharma34@gmail.com',
    status: 'block',
  },
  {
    id: 5,
    userName: 'Krupa Pandit',
    mobile: '9922771188',
    email: 'krupapandit90@gmail.com',
    status: 'block',
  },
  {
    id: 6,
    userName: 'Harsh Mevani',
    mobile: '6790126733',
    email: 'harshmevani9@gmail.com',
    status: 'block',
  },
];

function CategoryDetails() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const label = { inputProps: { 'aria-label': 'Switch demo' } };

  // const data = useSelector((state) => state?.adminAddPlan);
  // const [newData, setNewData] = React.useState();
  // const [userId, setuserId] = React.useState();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  // const history = useHistory();
  // const handleView = () => {
  //   history.push('/app/pages/product/data-view');
  // };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // useEffect(() => {
  //   setNewData(data);
  // }, [data]);

  return (
    <Container>
      <Colxx xxs="12">
        <div className="d-flex justify-content-sm-between">
          <h1>Category Details</h1>
          <Button size="sm" color="primary" outline>
            <IntlMessages id="+ Add Sub Category" />
          </Button>
        </div>
        <Separator className="mb-5" />
      </Colxx>

      <Box className="plan">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="end" />
            </TableRow>
          </TableHead>
          <TableBody style={{ padding: '10px' }}>
            {dataList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((userData) => (
                <TableRow key={userData.id}>
                  <TableCell>{userData.userName}</TableCell>
                  <TableCell
                    className="-webkit-center"
                    style={{ textAlign: 'right' }}
                  >
                    <Button>Edit</Button>{' '}
                    <Button outline className="secondary-new">
                      Delete
                    </Button>
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
          count={dataList.length}
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

export default CategoryDetails;
