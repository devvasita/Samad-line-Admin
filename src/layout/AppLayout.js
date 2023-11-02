import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // v6 hooks

import TopNav from 'containers/navs/Topnav';
import Sidebar from 'containers/navs/Sidebar';
import Footer from 'containers/navs/Footer';

const AppLayout = ({ containerClassnames, children }) => {
  const navigate = useNavigate();
  const location = useLocation(); // if you need location data

  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav navigate={navigate} />
      <Sidebar />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

const mapActionToProps = {};

export default connect(mapStateToProps, mapActionToProps)(AppLayout);
