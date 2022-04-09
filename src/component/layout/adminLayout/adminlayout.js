import React from "react";
import { Redirect } from "react-router-dom";
import IconTabs from "../../AdminDashboard/sidebar";
import Header from "../../AdminDashboard/header";

function AdminLayout(props) {
    console.log("AdminLayout:",props);
  
    return (
    
      <>
        <Header/>
        <IconTabs />
        {props.children}
      </>
    );
 
  
}

export default AdminLayout;
