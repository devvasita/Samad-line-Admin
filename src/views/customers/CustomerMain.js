import { Table, TableCell, TableHead, TableRow, TableBody, TablePagination, Switch, Grid, InputAdornment } from '@mui/material';
import { Box, color } from '@mui/system';
import MainCard from 'ui-component/cards/MainCard';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { blockCandidate, getCustomer } from 'store/actions/userActions';
import Loading from 'layout/loader/Loading';
import CustomInput from 'views/customerDetails/CustomInput';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } }
    }
}));

const CandidateRows = ({ userData, i, blockUser }) => {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(userData.isBlocked);
    }, userData);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        blockUser({ _id: userData._id, isBlocked: event.target.checked });
    };
    return (
        <TableRow>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {i + 1}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {userData.firstName} {userData.lastName}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {userData.mobileNo}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                <Switch color="secondary" checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
            </TableCell>
        </TableRow>
    );
};

const CustomerMain = ({ getCandidateList, customers, loading, blockUser }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [keyword, setKeyword] = useState('');
    const [compLoaded, setCompLoaded] = useState(false);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        getCandidateList({ params: { userType: 'customer' } });
        setCompLoaded(true);
    }, [getCandidateList]);

    // search after delay
    useEffect(() => {
        if (compLoaded) {
            const setData = setTimeout(() => {
                getCandidateList({ params: { keyword, userType: 'customer' } });
            }, 1000);
            return () => clearTimeout(setData);
        }
    }, [keyword, getCandidateList]);
    // console.log(setData);
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        // Update the filtered customers state
        setFilteredCustomers(
            customers.filter(
                (userData) =>
                    // userData.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
                    // userData.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
                    (userData.firstName + ' ' + userData.lastName).toLowerCase().includes(keyword.toLowerCase()) ||
                    userData.mobileNo.toLowerCase().includes(keyword.toLowerCase())
            )
        );
    }, [customers, keyword]);

    return (
        <MainCard title="Customer">
            <>
                <Grid container>
                    <Grid item xs={12} sm={6} xl={7} />
                    <Grid item xs={12} sm={6} xl={5}>
                        <CustomInput
                            onChange={(e) => setKeyword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                </Grid>
                {loading ? (
                    <Loading />
                ) : (
                    <Box className="plan" style={{ overflowY: 'auto', minHeight: 'calc(100vh - 365px)' }}>
                        <StyledTable>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">No.</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Mobile</TableCell>
                                    <TableCell align="center">Block</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody style={{ padding: '10px' }}>
                                {/* {customers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((userData, i) => (
                                        <CandidateRows
                                            key={userData._id}
                                            userData={userData}
                                            i={page * rowsPerPage + i}
                                            blockUser={blockUser}
                                        />
                                    ))} */}
                                {filteredCustomers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userData, i) => (
                                    <CandidateRows
                                        key={userData._id}
                                        userData={userData}
                                        i={page * rowsPerPage + i}
                                        blockUser={blockUser}
                                    />
                                ))}
                            </TableBody>
                        </StyledTable>

                        <TablePagination
                            sx={{ px: 2 }}
                            page={page}
                            component="div"
                            className="page"
                            rowsPerPage={rowsPerPage}
                            count={filteredCustomers.length}
                            onPageChange={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                        />
                    </Box>
                )}
            </>
        </MainCard>
    );
};

const mapStateToProps = ({ user }) => {
    const { customers, loading } = user;
    return { customers, loading };
};
const mapDispatchToProps = (dispatch) => ({
    getCandidateList: (query) => dispatch(getCustomer(query)),
    blockUser: (userData) => dispatch(blockCandidate(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMain);
