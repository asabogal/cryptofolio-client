import React from 'react';
import Header from '../header_footer/Header'

const Layout = ({handleLogin, handleLogout, loggedIn, children}) => {
  return (
    <div>
      <Header
        handleLogout={handleLogout}
        loggedIn={loggedIn}
      />
      {children}
    </div>
  );
};

export default Layout;