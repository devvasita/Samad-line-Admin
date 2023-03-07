import React from 'react';
import { Row } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
// import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="6" lg="12">
              <p className="mb-0 text-muted text-center">
                Copyright <span>&#169;</span> 2023 | All Rights Reserved | Rons
                Fitness
              </p>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
