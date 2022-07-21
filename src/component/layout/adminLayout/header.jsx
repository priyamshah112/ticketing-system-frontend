
import logo from "../../assets/logo1.png"
import React from 'react'
function Header() {
    return (
        <>
            <div className="header__section"> 
                <img src={logo} width="120"
                    height="" />     
            </div>
        </>
    );
}

export default React.memo(Header);