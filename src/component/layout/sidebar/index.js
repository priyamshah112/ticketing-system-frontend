import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { addUserDetailsAction } from "../../../actions/userActions";
import dashboard from "../../assets/Category.svg";
import userimg from "../../assets/Plus.svg";
import tickets from "../../assets/File.svg";
import inventory from "../../assets/Invoice.svg";
import faq from "../../assets/Comment.svg";
import role from "../../assets/Education.svg";
import admin from "../../assets/Profile.svg";
import logout from "../../assets/Logout.svg";
import ChangePassword from "../../changepassword";
import hardware from "../../assets/Hardware.svg";
import software from "../../assets/Software.svg";
import ProfileView from "../../profileView";
import $ from "jquery";

function Sidebar() {
  let data = localStorage.user_details;
  let user = JSON.parse(data); 

  const userType = JSON.parse(localStorage.user_details).userType;
  const dispatch = useDispatch();

  const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);
  const [isProfileViewActive, setIsProfileViewActive] = useState(false);

  useEffect(() => {
    if (data) return dispatch(addUserDetailsAction(JSON.parse(data)));
  }, []);

  const activeLinkHandler = (elem) => {
      $(`.nav-item`).removeClass("curr-active");
      $(`.sub-nav-item`).removeClass("curr-active");
      $(`#${elem}`).addClass("curr-active");
      console.log($(`#${elem}`))
    }
  

  return (
    <div className="sidebar sidebar-style-2">
      <ChangePassword
        isChangePasswordActive={isChangePasswordActive}
        setIsChangePasswordActive={setIsChangePasswordActive}
      />
      <ProfileView
        isProfileViewActive={isProfileViewActive}
        setIsProfileViewActive={setIsProfileViewActive}
      />

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <div className="user">
            <div className="avatar-sm float-left mr-2">
              <img
                src="/images/user/user.png"
                alt="..."
                className="avatar-img rounded-circle"
              />
            </div>
            <div className="info">
              <a
                data-toggle="collapse"
                href="#collapseExample"
                aria-expanded="true"
              >
                <div class="dropdown">
                  <span className="text-dark d-flex flex-column" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user && user.user_details && user.user_details.firstName}

                    <span className="user-level text-dark mt-2">{user.userType} <i className="fas fa-chevron-down ml-1"></i></span>
                  </span>
                  <div class="dropdown-menu" style={{ top: "20px" }} aria-labelledby="dropdownMenuButton">

                    <a class="dropdown-item" href="/changepassword" onClick={(e) => {
                      e.preventDefault();
                      setIsChangePasswordActive(true);
                    }}>changePassword</a>
                    <a class="dropdown-item" href="/profileview" onClick={(e) => {
                      e.preventDefault();
                      setIsProfileViewActive(true);
                    }}>My Profile</a>

                  </div>
                </div>
              </a>
              <div className="clearfix"></div>
            </div>
          </div>
          <ul className="nav nav-primary">
            {userType !== "Support" && (
              <li className="nav-item" id="dashboard" onClick={() => activeLinkHandler("dashboard")}>
                <Link
                  to={userType === "User" ? "/userdashboard" : "/dashboard"}
                >
                  {/* <i className="fas fa-layer-group"></i> */}
                  <img
                    src={dashboard}
                    alt="dashboard"
                    className="img-fluid icon-img"
                  />
                  <p>Dashboard</p>
                </Link>
              </li>
            )}

            {userType !== "Support" && userType !== "User" && (
              <li className="nav-item" id="user-main" onClick={() => activeLinkHandler("user-main")}>
                <a
                  data-toggle="collapse"
                  href="#user"
                  className="collapsed"
                  aria-expanded="false"
                >
                  <img
                    src={userimg}
                    alt="user"
                    className="img-fluid icon-img"
                  />
                  <p className="text-capitalize">User</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="user">
                  <ul className="nav nav-collapse">
                    <li>
                      <Link to="/role">
                        <img
                          src={role}
                          alt="role"
                          className="img-fluid icon-img"
                        />
                        <span className="">Role</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/user">
                        <img
                          src={admin}
                          alt="user"
                          className="img-fluid icon-img"
                        />
                        <span className="">User</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            {userType !== "Support" && userType !== "User" && (
              <li className="nav-item" id="inventory-main" onClick={() => activeLinkHandler("inventory-main")}>
                <a
                  data-toggle="collapse"
                  href="#inventory"
                  className="collapsed"
                  aria-expanded="false"
                >
                  <img
                    src={inventory}
                    alt="inventory"
                    className="img-fluid icon-img"
                  />
                  <p className="text-capitalize">Inventory</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="inventory">
                  <ul className="nav nav-collapse">
                    <li id="inv-software" className="sub-nav-item" onClick={() => activeLinkHandler("inv-software")}>
                      <Link to="/inventory/software">
                        <img
                          src={software}
                          alt="faq"
                          className="img-fluid icon-img"
                        />
                        <span className="">Software</span>
                      </Link>
                    </li>
                    <li id="inv-hardware" className="sub-nav-item" onClick={() => activeLinkHandler("inv-hardware")}>
                      <Link to="/inventory/hardware">
                        <img
                          src={hardware}
                          alt="faq"
                          className="img-fluid icon-img"
                        />
                        <span className="">Hardware</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}

            <li className="nav-item" id="tickets-main" onClick={() => activeLinkHandler("tickets-main")}>
              <Link to={`/tickets`}>
                <img
                  src={tickets}
                  alt="tickets"
                  className="img-fluid icon-img"
                />
                <p className="text-capitalize">tickets</p>
              </Link>
            </li>

            <li className="nav-item" id="faq-main" onClick={() => activeLinkHandler("faq-main")}>
              <Link to="/faqs">
                <img src={faq} alt="faq" className="img-fluid icon-img" />
                <span className="">FAQs</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link onClick={() => localStorage.clear()} to="/">
                <img
                  src={logout}
                  alt="logout"
                  style={{ transform: "rotate(180deg)", marginRight: "9px" }}
                  className="img-fluid icon-img"
                />
                <span className="">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
