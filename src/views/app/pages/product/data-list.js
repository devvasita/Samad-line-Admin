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
// import { H1, H2 } from 'app/components/Typography';
// import { Button } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import 'rc-switch/assets/index.css';
import './dataList.css';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Switch from '@mui/material/Switch';
import { useHistory } from 'react-router-dom';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Container = styled('div')(() => ({
  paddingTop: '1rem',

  // [theme.breakpoints.down('sm')]: { margin: '16px' },
  // '& .breadcrumb': {
  //   marginBottom: '30px',
  //   [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  // },
  // '& .button': { margin: theme.spacing(1) },
  // '& .input': { display: 'none' },
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

function DataListPages() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const label = { inputProps: { 'aria-label': 'Switch demo' } };

  // const data = useSelector((state) => state?.adminAddPlan);
  // const [newData, setNewData] = React.useState();
  // const [userId, setuserId] = React.useState();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const history = useHistory();
  const handleView = () => {
    history.push('/app/pages/product/data-view');
  };
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
          <h1>Customers Details</h1>
        </div>
        <Separator className="mb-5" />
      </Colxx>

      <Box className="plan">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <text>Customer Name</text>
              </TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center" width="200px">
                {' '}
                Email
              </TableCell>
              <TableCell align="center">Block / Unblock </TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ padding: '10px' }}>
            {dataList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((userData) => (
                <TableRow key={userData.id}>
                  <TableCell align="center">{userData.userName}</TableCell>
                  <TableCell align="center">{userData.mobile}</TableCell>
                  <TableCell align="center">{userData.email}</TableCell>
                  <TableCell align="center" className="-webkit-center">
                    <div className="switch">
                      <Switch {...label} />
                    </div>
                  </TableCell>

                  <TableCell align="center">
                    <i
                      className="simple-icon-eye"
                      onClick={handleView}
                      onKeyDown={handleView}
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

export default DataListPages;
