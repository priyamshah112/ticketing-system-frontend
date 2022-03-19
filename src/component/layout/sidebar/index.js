import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addUserDetailsAction } from "../../../actions/userActions";
import ChangePassword from "../../changepassword";
import ProfileView from "../../profileView";
import $ from "jquery";
import { Modal } from "antd";

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
    $(`.nav-item`).removeClass("active");
    $(`.sub-nav-item`).removeClass("active");
    $(`#${elem}`).addClass("active");
    console.log($(`#${elem}`));
  };

  return (
    <div className="sidebar sidebar-style-2">
      <Modal
        title="Change Password"
        visible={isChangePasswordActive}
        onCancel={() => setIsChangePasswordActive(false)}
        footer={null}
      >
        <ChangePassword setIsChangePasswordActive={setIsChangePasswordActive} />
      </Modal>
      <Modal
        title="My Profile"
        visible={isProfileViewActive}
        onCancel={() => setIsProfileViewActive(false)}
        footer={null}
      >
        <ProfileView setIsProfileViewActive={setIsProfileViewActive} />
      </Modal>
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <div className="user">
            <div className="avatar-sm float-left mr-2">
              <img
                src="../assets/img/profile.jpg"
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
                <span>
                  {user && user.user_details && user.user_details?.firstName}
                  <span className="user-level">{user.userType}</span>
                  <span className="caret"></span>
                </span>
              </a>
              <div className="clearfix"></div>

              <div className="collapse in" id="collapseExample">
                <ul className="nav">
                  <li>
                    <a
                      href="/changepassword"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsChangePasswordActive(true);
                      }}
                    >
                      <span className="link-collapse">Change Password</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/profileview"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsProfileViewActive(true);
                      }}
                    >
                      <span className="link-collapse">My Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="#edit">
                      <span className="link-collapse">Edit Profile</span>
                    </a>
                  </li>
                  <li>
                    <Link onClick={() => localStorage.clear()} to="/">
                      <span className="link-collapse">Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="nav nav-primary">
            {userType !== "Support" && (
              <li
                class="nav-item active"
                id="dashboard"
                onClick={() => activeLinkHandler("dashboard")}
              >
                <Link
                  to={userType === "User" ? "/userdashboard" : "/dashboard"}
                >
                  <i class="fas fa-home"></i>
                  <p>Dashboard</p>
                </Link>
              </li>
            )}
            <li
              className="nav-item"
              id="tickets-main"
              onClick={() => activeLinkHandler("tickets-main")}
            >
              <Link to={`/tickets`}>
                <i class="fas fa-ticket-alt"></i>
                <p>Tickets</p>
              </Link>
            </li>
            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h"></i>
              </span>
              <h4 className="text-section">Menu</h4>
            </li>
            {userType !== "Support" && userType !== "User" && (
              <li
                className="nav-item"
                id="inventory-main"
                onClick={() => activeLinkHandler("inventory-main")}
              >
                <a data-toggle="collapse" href="#inventory">
                  <i className="fas fa-layer-group"></i>
                  <p>Inventory</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="inventory">
                  <ul className="nav nav-collapse">
                    <li
                      id="inv-software"
                      onClick={() => activeLinkHandler("inv-software")}
                    >
                      <Link to="/inventory/software">
                        <span className="sub-item">Software</span>
                      </Link>
                    </li>
                    <li id="inv-hardware">
                      <Link
                        to="/inventory/hardware"
                        onClick={() => activeLinkHandler("inv-hardware")}
                      >
                        <span className="sub-item">Hardware</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}
            {userType !== "Support" && userType !== "User" && (
              <li
                className="nav-item"
                id="user-main"
                onClick={() => activeLinkHandler("user-main")}
              >
                <a data-toggle="collapse" href="#user">
                  <i className="fas fa-users"></i>
                  <p>Users</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="user">
                  <ul className="nav nav-collapse">
                    <li
                      id="user-role"
                      onClick={() => activeLinkHandler("user-role")}
                    >
                      <Link to="/role">
                        <span className="sub-item">Roles</span>
                      </Link>
                    </li>
                    <li
                      id="user-sub-user"
                      onClick={() => activeLinkHandler("user-sub-user")}
                    >
                      <Link to="/user">
                        <span className="sub-item">Users</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}
            <li
              className="nav-item"
              id="faq-main"
              onClick={() => activeLinkHandler("faq-main")}
            >
              <Link to="/faqs">
                <i class="fas fa-question-circle"></i>
                <p>FAQs</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
