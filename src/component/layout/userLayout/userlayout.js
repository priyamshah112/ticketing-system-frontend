import React from "react";
import Sidebar from './sidebar'


function UserLayout(props) {

    return (
        <div ClassName="wrapper">
            <Sidebar />
            <div className="main-panel">
                <div className="content">
                    {props.children}
                </div>
            </div>
        </div>
    );


}

export default UserLayout;
