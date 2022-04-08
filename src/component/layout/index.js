import React from "react";
import { Redirect } from "react-router-dom";
import Sidebar from './sidebar';
import Sidebar2 from './sidebar2'
import Header from './header/index';
import Footer from './footer';

function Layout(props) {
  let token = localStorage.authToken;
  if (!token) {
    return (
      <Redirect to={{ pathname: "/" }} />
    );
  }    
  if(token){
    return (
    
      <div ClassName="wrapper">
        <Sidebar2 />
        <div className="main-panel">
          <div className="content">
            {props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
  else{
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
  
}

export default Layout;
