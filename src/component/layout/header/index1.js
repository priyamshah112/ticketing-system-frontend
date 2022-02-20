import React from "react";
import logo1 from "../../assets/logo1.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import $ from "jquery";

function Header() {
  const toggleHandler = (e) => {
    console.log(e.preventDefault);
    $(`.sidebar-wrapper`).toggleClass("sidebar_minimize");
  };

  return (
    <>
      <div className="wrapper sidebar-wrapper">
        <div className="main-header">
          <nav
            className="navbar navbar-header navbar-expand-lg"
            data-background-color="blue2"
          >
            <div className="container-fluid d-flex">
              <ul className="navbar-nav topbar-nav align-items-center justify-content-between w-100">
                <li className="nav-item">
                  <div className="d-flex">
                    <img
                      src={logo1}
                      alt="logo"
                      className="img-fluid my-3 d-block logo-img mr-5"
					  width={150}
                    />

                    <img
                      src={logo2}
                      alt="logo"
					  width={150}
                      className="img-fluid my-3 d-block logo-img mx-auto" 
                    />
                  </div>
                </li>
                <li className="nav-item">
                  <img
                    src={logo3}
                    alt="logo"
					width={150}
                    className="img-fluid my-3 mr-2 d-block logo-img ml-auto"
                  />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
