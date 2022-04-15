import React from "react";
import IconTabs from "./sidebar";
import Header from "./header";

function AdminLayout(props) {  
    return (    
      <>
        <Header/>
        <IconTabs />
        {props.children}
      </>
    );
 
  
}

export default AdminLayout;
