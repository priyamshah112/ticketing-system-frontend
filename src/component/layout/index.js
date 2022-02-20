import React from "react";
import Sidebar from './sidebar';
import Header from './header/index';
import Footer from './footer';

function Layout (props){      
  return (
    <div ClassName="wrapper">
      <Header />
      <Sidebar />
      <div className="main-panel">
        <div className="content">
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
