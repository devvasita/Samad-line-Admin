import React from 'react';
import { Card, CardBody } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';

const AddressCard = ({
  className = 'mb-4',
  icon,
  title,
  // value,
  address,
  state,
  pincode,
  city,
}) => {
  return (
    <div className={`icon-row-item ${className}`}>
      <Card style={{ borderRadius: '15px' }}>
        <CardBody className="text-center" style={{ padding: '1rem 0.5rem' }}>
          <i className={icon} />
          <p className="card-text font-weight-semibold mb-0">
            <b>
              <IntlMessages id={title} />
            </b>
          </p>

          <div style={{ padding: '10px' }}>
            <p
              className="lead text-left text-dark"
              style={{ fontSize: '0.9rem', lineHeight: '1.5rem' }}
            >
              {address}
            </p>
            <p
              className="lead text-left text-dark"
              style={{ fontSize: '0.9rem', lineHeight: '1.5rem' }}
            >
              {city}
            </p>

            <p
              className="lead text-left text-dark"
              style={{ fontSize: '0.9rem', lineHeight: '1.5rem' }}
            >
              {state}
            </p>

            <p
              className="lead text-left text-dark"
              style={{ fontSize: '0.9rem', lineHeight: '1.5rem' }}
            >
              {' '}
              {pincode}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default React.memo(AddressCard);
