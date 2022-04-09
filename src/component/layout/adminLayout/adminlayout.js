import React from "react";
import { Redirect } from "react-router-dom";
import IconTabs from "../sidebar";


function AdminLayout(props) {
  let token = localStorage.authToken;
  
  if (!token) {
    return (
      <Redirect to={{ pathname: "/" }} />
    );
  }    
  
    return (
    
      <div ClassName="wrapper">
                {console.log("in here")}

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
