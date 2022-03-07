import React from "react";
import { Redirect } from "react-router-dom"; 
import Sidebar from './sidebar';
import Header from './header/index';
import Footer from './footer';

function Layout (props){  
  let token = localStorage.authToken;
	if (!token) {
    return (
      <Redirect to={{ pathname: "/" }} />
    );
  }    
  
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
