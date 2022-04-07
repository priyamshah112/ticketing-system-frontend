
import logo from "../assets/logo1.png"
import React from 'react'
function Header() {
    return (
        <>
            <div className="header__section">
                <ul className="menu__navigation">
                    <li className="pt-3">
                        <figure>
                            <img src={logo} width="120"
                                height="" />
                        </figure>
                    </li>
                    <li className="pt-3">
                        <figure>
                            <img src={logo} width="120"
                                height="" />
                        </figure>
                    </li>
                    <li className="pt-3">
                        <figure>
                            <img src={logo} width="120"
                                height="" />
                        </figure>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default React.memo(Header);