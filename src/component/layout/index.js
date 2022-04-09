import React from "react";
import { Redirect } from "react-router-dom";
import IconTabs from "./sidebar";
import Sidebar2 from './sidebar2'
import Header from './header/index';
import Footer from './footer';

function Layout(props) {
  let token = localStorage.authToken;
  const userType = JSON.parse(localStorage.user_details).userType;
  console.log(userType)
  if (!token) {
    return (
      <Redirect to={{ pathname: "/" }} />
    );
  }    
  if(userType === "User"){
    return (
    
      <div ClassName="wrapper">
                {console.log("in here")}

        <Sidebar2 />
        <div className="main-panel">
          <div className="content">
            {props.children}
          </div>
        </div>
      </div>
    );
  }
  else{
    return (
    
      <div ClassName="wrapper">
        <Header/>
        <IconTabs />
        <div className="main-panel">
          <div className="content">
            {props.children}
          </div>
        </div>
      </div>
    );
  }
  
}

export default Layout;
