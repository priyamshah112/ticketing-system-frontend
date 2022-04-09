import React from "react";
import { Redirect } from "react-router-dom";
import IconTabs from "../../AdminDashboard/sidebar";
import Header from "../../AdminDashboard/header";

function AdminLayout(props) {
    
  
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

export default AdminLayout;
