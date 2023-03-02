/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  Button,
} from 'reactstrap';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useHistory } from 'react-router-dom';
import Moment from 'moment';

import { Separator, Colxx } from 'components/common/CustomBootstrap';
// import offersData from 'data/Offers';
// import PreviewIcon from '@mui/icons-material/Preview';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IntlMessages from 'helpers/IntlMessages';
import { deleteOffer, getOffers } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

function Offers() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeOfferId, setActiveOfferId] = useState(null);

  const dispatch = useDispatch();

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActiveOfferId(id);
  };
  const history = useHistory();

  const handleAddOffer = () => {
    history.push(`/app/applications/addoffer`);
  };
  const handleEditOffer = () => {
    history.push(`/app/applications/editOffer/${activeOfferId}`);
  };
  const handleViewOffer = () => {
    history.push(`/app/applications/viewOffer/${activeOfferId}`);
  };
  const handleDeleteOffer = () => {
    dispatch(deleteOffer(activeOfferId));
  };
  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  const OffersData = useSelector((state) => state?.offer?.offers);

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="d-flex justify-content-between mb-4">
            <h1>Offers</h1>
            <Button size="sm" color="primary" outline onClick={handleAddOffer}>
              <IntlMessages id="+ Add Offer" />
            </Button>
          </div>
          <Separator className="mb-4" />
        </Colxx>

        {OffersData &&
          OffersData.map((offersItem) => {
            return (
              <Colxx
                xxs="12"
                lg="4"
                className="mb-5"
                key={`offersItem_${offersItem?._id}`}
              >
                <Card
                  className="flex-row listing-card-container"
                  style={{ borderRadius: '0.75rem' }}
                >
                  <div className="w-40 position-relative">
                    <img
                      className="card-img-left"
                      src={offersItem.image?.url}
                      alt="Card cap"
                    />
                  </div>
                  <div className="w-60 d-flex align-items-center">
                    <CardBody style={{ overflow: 'hidden' }}>
                      <ResponsiveEllipsis
                        className="mb-3 listing-heading font-weight-bold  overflow"
                        text={offersItem?.title}
                        maxLine="1"
                        trimRight
                        basedOn="words"
                        component="h3"
                      />

                      <p
                        style={{
                          whiteSpace: 'nowrap',
                          margin: '0px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        dangerouslySetInnerHTML={{
                          __html: offersItem?.description,
                        }}
                      />

                      <div
                        className="listing-heading"
                        style={{ color: '#6fb327' }}
                      >
                        <h5>
                          <b>{offersItem?.value} off</b>
                        </h5>
                      </div>

                      <small>
                        <b>
                          Valid till{' '}
                          {Moment(offersItem?.validTill).format(
                            'DD MMMM, YYYY'
                          )}
                        </b>
                      </small>
                    </CardBody>
                  </div>

                  <MoreVertIcon
                    onClick={(e) => handleClick(e, offersItem?._id)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                      cursor: 'pointer',
                      '&:hover': { color: '#6fb327' },
                    }}
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
                        mt: 1.5,
                        border: '1px solid',
                        borderColor: 'rgba(58,58,58,.15)',
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
                    <MenuItem onClick={handleEditOffer}>
                      <i
                        className="iconsminds-file-edit"
                        style={{ color: '#6fb327', marginRight: '5px' }}
                      />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleViewOffer}>
                      <i
                        className="simple-icon-eye"
                        style={{ color: '#6fb327', marginRight: '5px' }}
                      />
                      <span style={{ marginLeft: '5px' }}>View</span>
                    </MenuItem>
                    <MenuItem onClick={handleDeleteOffer}>
                      <i
                        className="iconsminds-delete-file"
                        style={{ color: '#6fb327', marginRight: '5px' }}
                      />
                      Delete
                    </MenuItem>
                  </Menu>
                </Card>
              </Colxx>
            );
          })}
      </Row>
      {/* <Row>
        <Colxx xxs="12">
          <Pagination listClassName="justify-content-center">
            <PaginationItem>
              <PaginationLink className="prev" href="#">
                <i className="simple-icon-arrow-left" />
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="next" href="#">
                <i className="simple-icon-arrow-right" />
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        </Colxx>
      </Row> */}
    </>
  );
}

export default Offers;
