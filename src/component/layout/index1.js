import React from "react";
import Sidebar from './sidebar';
import Header from './header/index';
import Footer from './footer';

function Layout(props) {

  return (
    <div ClassName="layout">
      <Header />
      {/* <Sidebar /> */}
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
