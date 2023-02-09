import React, { useState } from 'react';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
// import IconCard from 'components/cards/IconCard';
import './viewplan.css';
import IntlMessages from 'helpers/IntlMessages';

// import TextField from '@mui/material/TextField';
// import data from 'data/iconCards';

import { Button, Collapse, Card, CardBody, CardTitle, Table } from 'reactstrap';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import ParchaseCards from '../../../../containers/ui/ParchaseCrads';

function Dataview() {
  const [isOpen, setIsOpen] = useState(false);

  const userAddressData = [
    {
      id: 1,
      addresstag: 'Home',
      fullAddress: '25, Sundervan Soc, Opp Water Tank, Karelibaug',
      state: 'Gujarat',
      city: 'Surat',
      pincode: 392390,
    },
    {
      id: 1,
      addresstag: 'Office',
      fullAddress: 'B-60, Golder plaza ,Opp MaharajaFarm, Satellite',
      state: 'Gujarat',
      city: 'Ahmedabad',
      pincode: 382390,
    },
    {
      id: 1,
      addresstag: 'Other',
      fullAddress: '50/52, Kazi Sayed Street, Mandvi',
      state: 'Maharashtra',
      city: 'Mumbai',
      pincode: 400003,
    },
  ];

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Colxx xxs="12">
        <div className="d-flex justify-content-sm-between flex-column">
          <h1>Jay Patel</h1>
          <p>Member Since Dec 23rd, 2017</p>
        </div>
        <Separator className="mb-5" />
      </Colxx>

      <div style={{ padding: '15px', marginTop: '15px' }}>
        <ParchaseCards />
      </div>

      {/* <Box className="fieldviewplan">
        <Box className="fieldboxviewplan">
          <span className="label"> Full Name :</span>
          <TextField
            id="outlined-basic"
            defaultValue=""
            name="planName"
            required
            variant="outlined"
            disabled
            size="small"
            className="textfieldaddplan"
          />
        </Box>

        <Box className="fieldboxviewplan">
          <span>Mobile :</span>
          <TextField
            id="outlined-basic"
            defaultValue=""
            name="lenders"
            required
            variant="outlined"
            disabled
            size="small"
            className="textfieldaddplan"
          />
        </Box>

        <Box className="fieldboxviewplan">
          <span className="label">Email :</span>
          <TextField
            id="outlined-basic"
            defaultValue=""
            name="planName"
            required
            variant="outlined"
            disabled
            size="small"
            className="textfieldaddplan"
          />
        </Box>

        <Box className="fieldboxviewplan">
          <span className="label">Member Since :</span>
          <TextField
            id="outlined-basic"
            defaultValue=""
            variant="outlined"
            disabled
            size="small"
            className="textfieldaddplan"
          />
        </Box>

        <Box className="fieldboxviewplan">
          <span className="label">Total Orders</span>
          <TextField
            id="outlined-basic"
            defaultValue=""
            name="maxIntrest"
            variant="outlined"
            disabled
            size="small"
            className="textfieldaddplan"
          />
        </Box>

        <Box className="fieldboxviewplan">
          <span className="label">Total Purchase</span>
          <TextField
            id="outlined-basic"
            defaultValue=""
            name="maxIntrest"
            variant="outlined"
            disabled
            className="textfieldaddplan"
            size="small"
          />
        </Box>
      </Box> */}

      <Colxx xxs="12">
        <div className="d-flex justify-content-sm-between">
          <Button
            color="primary"
            onClick={toggle}
            style={{
              marginBottom: '2rem',
              paddingLeft: '15px',
              fontSize: '0.9rem',
            }}
          >
            Addresses <ArrowDropDownIcon />
          </Button>
        </div>
      </Colxx>

      <Collapse isOpen={isOpen}>
        <Colxx xxs="12">
          <Card className="mb-4" style={{ borderRadius: '0.75rem' }}>
            <CardBody style={{ overflow: 'auto' }}>
              <CardTitle>
                <IntlMessages id="Address Details" />
              </CardTitle>
              <Table>
                <thead>
                  <tr>
                    <th>Address Tag</th>
                    <th>Full Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Pincode</th>
                  </tr>
                </thead>
                <tbody>
                  {userAddressData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.addresstag}</td>
                      <td>{data.fullAddress}</td>
                      <td>{data.city}</td>
                      <td>{data.state}</td>
                      <td>{data.pincode}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Collapse>
    </div>
  );
}

export default Dataview;
