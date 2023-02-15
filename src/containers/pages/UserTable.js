import styled from '@emotion/styled';
import {
  Box,
  Menu,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from '@mui/material';
import { H1, H2 } from 'app/components/Typography';
import React, { useEffect, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './PersonalLoan.css';
import { Label } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DeletePlan, Viewplan } from 'app/redux/actions/LoanAction';

const Container = styled('div')(({ theme }) => ({
  paddingTop: '1rem',

  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .button': { margin: theme.spacing(1) },
  '& .input': { display: 'none' },
}));

const Heading = styled('div')(() => ({
  width: '100%',
  background: '#D9D9D9',
  height: '70px',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
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
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const subscribarList = [
  {
    planname: 'Mudra',
    lendername: 'HDFC',
    interest: '11 - 17',
    tenure: '12 - 36',
  },
];
function PersonalLoan() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const data = useSelector((state) => state?.adminAddPlan);
  const [newData, setNewData] = React.useState(data);
  const [userId, setuserId] = React.useState();

  useEffect(() => {
    setNewData(data);
  }, [data]);

  const [filterData, setFilterdata] = React.useState();
  const handleClick = (event, id) => {
    setuserId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const handleDelete = async (userId) => {
    await dispatch(DeletePlan(userId));
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleEdit = (userId) => {
    navigate(`/material/personalloan/editplan/${userId}`);
  };
  const handleView = async (userId) => {
    // await dispatch(Viewplan(userId));
    navigate(`/material/personalloan/viewplan/${userId}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleAddPlan = async () => {
    await navigate('/material/personalloan/addplan');
  };

  return (
    <Container>
      <Box>
        <Heading>
          <H2 style={{ color: 'black' }}>Personal Loan</H2>
        </Heading>
      </Box>
      <Box className="plan">
        <Box>
          <Box className="loan">
            <H1>Plan</H1>
            <StyledButton
              variant="contained"
              color="primary"
              style={{ background: '#b97983' }}
              onClick={handleAddPlan}
            >
              Add Plan
            </StyledButton>
          </Box>
        </Box>

        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Plan Name</TableCell>
              <TableCell align="center">Lender Name </TableCell>
              <TableCell align="center" width="200px">
                Interest (%)
              </TableCell>
              <TableCell align="center">Tenure (Months)</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{subscriber.planName}</TableCell>
                  <TableCell align="center">{subscriber.lenders}</TableCell>
                  <TableCell align="center">
                    {subscriber.minIntrest}-{subscriber.maxIntrest}
                  </TableCell>
                  <TableCell align="center">
                    {subscriber.minMonths}-{subscriber.maxMonths}
                  </TableCell>
                  <TableCell align="center">
                    <MoreVertIcon
                      onClick={(e) => handleClick(e, subscriber.id)}
                      size="small"
                      sx={{ ml: 2, cursor: 'pointer' }}
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
          rowsPerPage={rowsPerPage}
          count={subscribarList.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
        />

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              boxShadow:
                '0px 16px 16px rgba(50, 50, 71, 0.08), 0px 24px 32px rgba(50, 50, 71, 0.08)',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => handleView(userId)}>
            <PreviewIcon style={{ marginRight: '6px' }} /> View
          </MenuItem>
        </Menu>
      </Box>
    </Container>
  );
}

export default PersonalLoan;
