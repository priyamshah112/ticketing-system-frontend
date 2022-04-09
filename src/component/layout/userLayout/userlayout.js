import React from "react";
import Sidebar2 from '../sidebar2'


function UserLayout(props) {

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

export default UserLayout;
