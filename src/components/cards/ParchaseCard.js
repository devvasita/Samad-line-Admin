import React from 'react';
import { Card, CardBody } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';

const ParchaseCard = ({ className = 'mb-4', title, value, icon }) => {
  return (
    <div className={`icon-row-item ${className}`}>
      <Card style={{ borderRadius: '0.75rem' }}>
        <CardBody className="text-center">
          <i className={icon} />
          <p className="card-text font-weight-semibold mb-0">
            <IntlMessages id={title} />
          </p>
          <p className="lead text-center" style={{ fontSize: '12px' }}>
            {value}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default React.memo(ParchaseCard);
