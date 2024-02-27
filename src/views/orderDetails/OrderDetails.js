/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { deleteUserById, getCandidateById, updateCandidateDetails } from 'store/actions/userActions';
import { Table, TableCell, TableHead, TableRow, TableBody, TablePagination, IconButton, Button } from '@mui/material';
import { useEffect } from 'react';
import PrintIcon from '@mui/icons-material/Print';
import GetAppIcon from '@mui/icons-material/GetApp';
import { connect } from 'react-redux';
import Loading from 'layout/loader/Loading';
import OrderForm from './OrderForm';
import { Box } from '@mui/system';
import styled from '@emotion/styled';
import { assignDistributor, getOrderByID } from 'store/actions/orderActions';
import { makeStyles } from '@material-ui/core';
import html2pdf from 'html2pdf.js';
import image from '../../assets/images/logo/logo.png';
// import html2pdf from 'html2pdf';

const useStyles = makeStyles((theme) => ({
    body: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontFamily: 'Arial, Helvetica, sans-serif',
        backgroundColor: '#e3e3e3'
    },
    a: {
        textDecoration: 'none',
        color: '#000000'
    },
    p: {
        margin: '0rem'
    },
    bgWhite: {
        backgroundColor: '#ffffff !important'
    },
    textSize: {
        fontSize: 15
    },
    templateBody: {
        width: 'min(100% - 0px, 90%)',
        backgroundColor: '#ffffff',
        margin: '80px auto'
    },
    sectionBody: {
        display: 'flex',
        marginTop: 20
    },
    addressSection: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    tableSection: {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 4px'
    },
    tableCell: {
        padding: 10
    },
    tableHead: {
        backgroundColor: '#bfbfbf'
    },
    tableHeadCell: {
        fontSize: 15,
        fontWeight: 600
    },
    tableBodyRow: {
        backgroundColor: '#eeeeee'
    },
    downloadButton: {
        marginTop: 20
    }
}));

const StyledTable = styled(Table)(() => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
    },
    '& tbody': {
        '& tr': { '& td': { paddingLeft: 0 } }
    }
}));

const CandidateRows = ({ userData, i }) => {
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
                {userData.name}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                {userData.qty}
            </TableCell>
            <TableCell align="center" style={{ paddingLeft: 16 }}>
                ${userData.price}
            </TableCell>
        </TableRow>
    );
};

const OrderDetails = ({ getCandidateDetails, selectedOrder, loading, updateCandidate, assignOrder }) => {
    const { id } = useParams();
    const { orderItems } = selectedOrder;
    const [readOnly, setReadOnly] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const contentRef = useRef();

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        isBlocked: false,
        phoneNo: '',
        address: '',
        gstNo: ''
    });
    console.log(userDetails);

    useEffect(() => {
        getCandidateDetails(id);
    }, [getCandidateDetails, id]);

    useEffect(() => {
        setUserDetails(selectedOrder);
    }, [selectedOrder]);
    const handlePrint = () => {
        const printContents = document.querySelector('.elem').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    const handleDownload = async () => {
        const content = contentRef.current;
        // Create a canvas from the HTML content
        const canvas = await html2canvas(content);
        // Create a new jsPDF instance
        const pdf = new jsPDF();
        // Calculate the width and height of the PDF page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        // Add the canvas image to the PDF
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfWidth, pdfHeight);
        // Save the PDF
        pdf.save('invoice.pdf');
    };
    const classes = useStyles();
    function handleDownloadpdfformat() {
        const opt = { filename: 'invoice.pdf', html2canvas: { scale: 1, scrollY: 0 } };
        const div = document.querySelector('.elem');
        html2pdf().set(opt).from(div).save();
    }

    return (
        <>
            <MainCard
                title="Order Details"
                btnText="Download Invoice"
                btnEvent={handleDownloadpdfformat}
                btnText1="Print Invoice"
                btnEvent1={handlePrint}
                contentSX={{ padding: 0 }}
            >
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <OrderForm
                            userDetails={userDetails}
                            setUserDetails={setUserDetails}
                            readOnly={readOnly}
                            setReadOnly={setReadOnly}
                            updateCandidate={updateCandidate}
                            assignOrder={assignOrder}
                        />
                        <Box className="plan" style={{ overflowY: 'auto', minHeight: 'calc(100vh - 365px)' }}>
                            <StyledTable>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">No.</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Qty.</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ padding: '10px' }}>
                                    {orderItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userData, i) => (
                                        <CandidateRows key={userData._id} userData={userData} i={page * rowsPerPage + i} />
                                    ))}
                                    <TableRow>
                                        <TableCell align="center" style={{ paddingLeft: 16 }}>
                                            Total
                                        </TableCell>
                                        <TableCell align="center" style={{ paddingLeft: 16 }}></TableCell>
                                        <TableCell align="center" style={{ paddingLeft: 16 }}></TableCell>
                                        <TableCell align="center" style={{ paddingLeft: 16 }}>
                                            ${selectedOrder.total}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </StyledTable>

                            <TablePagination
                                sx={{ px: 2 }}
                                page={page}
                                component="div"
                                className="page"
                                rowsPerPage={rowsPerPage}
                                count={orderItems.length}
                                onPageChange={handleChangePage}
                                rowsPerPageOptions={[5, 10, 25]}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                nextIconButtonProps={{ 'aria-label': 'Next Page' }}
                                backIconButtonProps={{ 'aria-label': 'Previous Page' }}
                            />
                        </Box>
                    </>
                )}
                {/* <div>
                    <IconButton color="black" onClick={handlePrint}>
                        <PrintIcon />
                    </IconButton>

                    <IconButton color="black" onClick={handleDownloadpdfformat}>
                        <GetAppIcon />
                    </IconButton>
                </div> */}
            </MainCard>
            {/* Invoice data */}
            <div className={classes.body} style={{ display: 'none' }}>
                <div className={`${classes.templateBody} elem`}>
                    <div className={`${classes.sectionBody}`} style={{ alignItems: 'center' }}>
                        <div style={{ width: '100%' }}>
                            <p style={{ fontSize: 30, color: '#504b4b', marginBottom: 10 }}>Samadline </p>
                            <div className={classes.addressSection}>
                                <div style={{ width: '30%' }}>
                                    <p className={classes.textSize}>
                                        20 Margaret st,
                                        <br /> London Great britain, 3NM98-LK
                                    </p>
                                </div>
                                <div>
                                    <p className={classes.textSize} style={{ margin: 0, marginTop: '18px' }}>
                                        877-67-88-99
                                    </p>
                                    <p className={classes.textSize} style={{ margin: 0 }}>
                                        shop@store.com
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={image} alt="logo" style={{ width: '100px' }} />
                        </div>
                    </div>
                    <div className={`${classes.sectionBody}`} style={{ marginBottom: 40 }}>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '70%' }}>
                                <p style={{ marginBottom: 10, fontWeight: 600, color: '#9c9c9c' }}>BILLED TO</p>
                                <div className={`${classes.addressSection}`}>
                                    <div style={{ width: '45%' }}>
                                        <p style={{ fontWeight: 'bold', margin: 0 }}>
                                            {/* {userDetails?.billingAddress} */}
                                            {userDetails?.billingAddress?.firstName} {userDetails?.billingAddress?.lastName}
                                        </p>
                                        <p className={classes.textSize} style={{ margin: 0 }}>
                                            {userDetails?.billingAddress?.addressLine1}
                                            <br />
                                            {userDetails?.billingAddress?.addressLine2} <br />
                                            {userDetails?.billingAddress?.city} <br />
                                            {userDetails?.billingAddress?.pinCode}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={classes.textSize} style={{ margin: 0 }}>
                                            +{userDetails?.billingAddress?.phoneNo}
                                            <p className={classes.textSize} style={{ margin: 0 }}>
                                                {userDetails?.user?.email}
                                            </p>
                                        </p>
                                        {/* <p className={classes.textSize}>
                                    <a href="/">shrunjal.mehta@gmail.com</a>
                                </p> */}
                                    </div>
                                </div>
                            </div>
                            <div style={{ width: '30%' }}>
                                {' '}
                                <div style={{ width: '100%', marginLeft: '20px' }}>
                                    <p style={{ fontSize: '20px', color: '#504b4b', marginBottom: 10 }}>Invoice </p>
                                    <div style={{ marginTop: '10px' }}>
                                        <p style={{ color: '#9c9c9c', fontSize: 14, fontWeight: 600, margin: 0 }}>INVOICE NUMBER</p>
                                        <p className={classes.textSize} style={{ margin: 0, whiteSpace: 'break-spaces' }}>
                                            {userDetails?._id}
                                        </p>
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <p style={{ color: '#9c9c9c', fontSize: 14, fontWeight: 600, margin: 0 }}>DATE OF ISSUE</p>
                                        <p className={classes.textSize} style={{ margin: 0 }}>
                                            {userDetails?.createdAt?.slice(0, 10)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.sectionBody}`}>
                        <div style={{ width: '100%' }}>
                            <table width="100%" className={classes.tableSection}>
                                <thead>
                                    <tr className={classes.tableHead}>
                                        <td style={{ padding: '10px' }} width="50%" className={classes.tableHeadCell}>
                                            DESCRIPTION{' '}
                                        </td>
                                        <td className={classes.tableHeadCell}>UNIT COST</td>
                                        <td className={classes.tableHeadCell}> QTY</td>
                                        <td align="right" className={classes.tableHeadCell} style={{ padding: '10px' }}>
                                            AMOUNT
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* ... table body rows ... */}
                                    {orderItems.map((item, i) => (
                                        <tr key={i} style={{ backgroundColor: '#eeeeee' }}>
                                            <td style={{ padding: '10px' }}>
                                                <p style={{ width: '95%', margin: '0' }}>{item.name}</p>
                                            </td>
                                            <td>${item.price}</td>
                                            <td>{item.qty}</td>
                                            <td align="right" style={{ padding: '5px 10px' }}>
                                                ${item.price * item.qty}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className={classes.bgWhite}>
                                        <td colSpan="4" className={classes.bgWhite}>
                                            <table width="100%">
                                                <tr className={classes.bgWhite}>
                                                    <td colSpan="2" width="73%" style={{ padding: 0 }}></td>
                                                    <td style={{ padding: 0 }}>
                                                        <table width="100%">
                                                            <tr className={classes.bgWhite}>
                                                                <td width="50%" align="right" style={{ padding: '5px 5px' }}>
                                                                    <span style={{ color: '#9c9c9c', fontWeight: 600, fontSize: 15 }}>
                                                                        SUBTOTAL
                                                                    </span>
                                                                </td>
                                                                <td align="right" style={{ padding: '5px 5px' }}>
                                                                    ${userDetails?.subTotal}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr className={classes.bgWhite}>
                                                    <td colSpan="2" width="73%" style={{ padding: 0 }}></td>
                                                    <td style={{ padding: 0 }}>
                                                        <table width="100%">
                                                            <tr className={classes.bgWhite}>
                                                                <td width="50%" align="right" style={{ padding: '5px 5px' }}>
                                                                    <span style={{ color: '#9c9c9c', fontWeight: 600, fontSize: 15 }}>
                                                                        DISCOUNT
                                                                    </span>
                                                                </td>
                                                                <td align="right" style={{ padding: '5px 5px' }}>
                                                                    ${userDetails.discount}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr className={classes.bgWhite}>
                                                    <td colSpan="2" width="73%"></td>
                                                    {/* <td style={{ padding: 0 }}>
                                                        <table width="100%">
                                                            <tr className={classes.bgWhite}>
                                                                <td
                                                                    width="50%"
                                                                    align="right"
                                                                    style={{ padding: '5px 5px', width: '50%', textAlign: 'right' }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            color: '#9c9c9c',
                                                                            fontWeight: 600,
                                                                            fontSize: 15,
                                                                            whiteSpace: 'nowrap'
                                                                        }}
                                                                    >
                                                                        (TAX RATE)
                                                                    </span>
                                                                </td>
                                                                <td style={{ padding: '5px 5px' }}>0%</td>
                                                            </tr>
                                                        </table>
                                                    </td> */}
                                                </tr>
                                                <tr className={classes.bgWhite}>
                                                    <td colSpan="2" width="73%"></td>
                                                    <td style={{ padding: 0 }}>
                                                        <table width="100%">
                                                            <tr className={classes.bgWhite}>
                                                                <td width="50%" align="right" style={{ padding: '5px 5px' }}>
                                                                    <span style={{ color: '#9c9c9c', fontWeight: 600, fontSize: 15 }}>
                                                                        TAX
                                                                    </span>
                                                                </td>
                                                                <td align="right" width="50%" style={{ padding: '5px 5px' }}>
                                                                    ${userDetails.tax}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr className={classes.bgWhite}>
                                                    <td colSpan="2" width="73%"></td>
                                                    <td style={{ padding: 0 }}>
                                                        <table width="100%">
                                                            <tr className={classes.bgWhite}>
                                                                <td width="50%" align="right" style={{ padding: '5px 5px' }}>
                                                                    <div style={{ border: '0.5px solid #9c9c9c', width: '50%' }}></div>
                                                                </td>
                                                                <td align="right" style={{ padding: '5px 5px' }}></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr className={classes.bgWhite}>
                                                    <td colSpan="2" width="73%"></td>
                                                    <td style={{ padding: 0 }}>
                                                        <table width="100%">
                                                            <tr className={classes.bgWhite}>
                                                                <td colSpan="2" width="100%" align="center" style={{ padding: 0 }}>
                                                                    <span
                                                                        style={{
                                                                            color: '#9c9c9c',
                                                                            fontWeight: 600,
                                                                            fontSize: 15
                                                                        }}
                                                                    >
                                                                        TOTAL
                                                                    </span>
                                                                </td>
                                                                <td align="right" style={{ padding: '5px', textAlign: 'center' }}>
                                                                    <span style={{ color: '#000000', fontWeight: 500 }}>
                                                                        ${userDetails.total}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({ order }) => {
    const { selectedOrder, loading } = order;
    return { selectedOrder, loading };
};
const mapDispatchToProps = (dispatch) => ({
    getCandidateDetails: (id) => dispatch(getOrderByID(id)),
    updateCandidate: (_id, DistributorDetails, navigate) => dispatch(updateCandidateDetails(_id, DistributorDetails, navigate)),
    assignOrder: (val, product_id) => dispatch(assignDistributor(val, product_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
