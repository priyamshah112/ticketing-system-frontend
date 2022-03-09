import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo1.png";

function Header() {
  return (
    <div className="main-header">
      {/* Logo Header */}
      <div className="logo-header" data-background-color="purple2">
        <Link className="logo" to={"/dashboard"}>
          <img src={logo} alt="navbar brand" className="navbar-brand" />
        </Link>
        <button
          className="navbar-toggler sidenav-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="icon-menu"></i>
          </span>
        </button>
        <button className="topbar-toggler more">
          <i className="icon-options-vertical"></i>
        </button>
        <div className="nav-toggle">
          <button className="btn btn-toggle toggle-sidebar">
            <i className="icon-menu"></i>
          </button>
        </div>
      </div>
      {/* End Logo Header */}

      {/* Navbar Header */}
      <nav
        className="navbar navbar-header navbar-expand-lg"
        data-background-color="purple2"
      >
        <div className="container-fluid">
          <div className="collapse" id="search-nav">
            <form className="navbar-left navbar-form nav-search mr-md-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <button type="submit" className="btn btn-search pr-1">
                    <i className="fa fa-search search-icon"></i>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search ..."
                  className="form-control"
                />
              </div>
            </form>
          </div>
          <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
            <li className="nav-item toggle-nav-search hidden-caret">
              <a
                className="nav-link"
                data-toggle="collapse"
                href="#search-nav"
                role="button"
                aria-expanded="false"
                aria-controls="search-nav"
              >
                <i className="fa fa-search"></i>
              </a>
            </li>
            <li className="nav-item dropdown hidden-caret">
              {/* <a
                className="nav-link dropdown-toggle"
                href="#"
                id="messageDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-envelope"></i>
              </a> */}
              {/* <ul
                className="dropdown-menu messages-notif-box animated fadeIn"
                aria-labelledby="messageDropdown"
              >
                <li>
                  <div className="dropdown-title d-flex justify-content-between align-items-center">
                    Messages
                    <a href="#" className="small">
                      Mark all as read
                    </a>
                  </div>
                </li>
                <li>
                  <div className="message-notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="../assets/img/jm_denis.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jimmy Denis</span>
                          <span className="block">How are you ?</span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="../assets/img/chadengle.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Chad</span>
                          <span className="block">Ok, Thanks !</span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="../assets/img/mlane.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jhon Doe</span>
                          <span className="block">
                            Ready for the meeting today...
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="../assets/img/talha.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Talha</span>
                          <span className="block">Hi, Apa Kabar ?</span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <a className="see-all" href="javascript:void(0);">
                    See all messages<i className="fa fa-angle-right"></i>{" "}
                  </a>
                </li>
              </ul> */}
            </li>
            {/* <li className="nav-item dropdown hidden-caret">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="notifDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-bell"></i>
                <span className="notification">4</span>
              </a>
              <ul
                className="dropdown-menu notif-box animated fadeIn"
                aria-labelledby="notifDropdown"
              >
                <li>
                  <div className="dropdown-title">
                    You have 4 new notification
                  </div>
                </li>
                <li>
                  <div className="notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <a href="#">
                        <div className="notif-icon notif-primary">
                          {" "}
                          <i className="fa fa-user-plus"></i>{" "}
                        </div>
                        <div className="notif-content">
                          <span className="block">New user registered</span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-icon notif-success">
                          {" "}
                          <i className="fa fa-comment"></i>{" "}
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Rahmad commented on Admin
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-img">
                          <img
                            src="../assets/img/profile2.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Reza send messages to you
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a href="#">
                        <div className="notif-icon notif-danger">
                          {" "}
                          <i className="fa fa-heart"></i>{" "}
                        </div>
                        <div className="notif-content">
                          <span className="block">Farrah liked Admin</span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <a className="see-all" href="javascript:void(0);">
                    See all notifications<i className="fa fa-angle-right"></i>{" "}
                  </a>
                </li>
              </ul>
            </li> */}
            {/* <li className="nav-item dropdown hidden-caret">
                <a className="nav-link" data-toggle="dropdown" href="#" aria-expanded="false">
                  <i className="fas fa-layer-group"></i>
                </a>
                <div className="dropdown-menu quick-actions quick-actions-info animated fadeIn">
                  <div className="quick-actions-header">
                    <span className="title mb-1">Quick Actions</span>
                    <span className="subtitle op-8">Shortcuts</span>
                  </div>
                  <div className="quick-actions-scroll scrollbar-outer">
                    <div className="quick-actions-items">
                      <div className="row m-0">
                        <a className="col-6 col-md-4 p-0" href="#">
                          <div className="quick-actions-item">
                            <i className="flaticon-file-1"></i>
                            <span className="text">Generated Report</span>
                          </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                          <div className="quick-actions-item">
                            <i className="flaticon-database"></i>
                            <span className="text">Create New Database</span>
                          </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                          <div className="quick-actions-item">
                            <i className="flaticon-pen"></i>
                            <span className="text">Create New Post</span>
                          </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                          <div className="quick-actions-item">
                            <i className="flaticon-interface-1"></i>
                            <span className="text">Create New Task</span>
                          </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                          <div className="quick-actions-item">
                            <i className="flaticon-list"></i>
                            <span className="text">Completed Tasks</span>
                          </div>
                        </a>
                        <a className="col-6 col-md-4 p-0" href="#">
                          <div className="quick-actions-item">
                            <i className="flaticon-file"></i>
                            <span className="text">Create New Invoice</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li> */}
            <li className="nav-item dropdown hidden-caret">
              <a
                className="dropdown-toggle profile-pic"
                data-toggle="dropdown"
                href="#"
                aria-expanded="false"
              >
                <div className="avatar-sm">
                  <img
                    src="../assets/img/profile.jpg"
                    alt="..."
                    className="avatar-img rounded-circle"
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-user animated fadeIn">
                <div className="dropdown-user-scroll scrollbar-outer">
                  <li>
                    <div className="user-box">
                      <div className="avatar-lg">
                        <img
                          src="../assets/img/profile.jpg"
                          alt="image profile"
                          className="avatar-img rounded"
                        />
                      </div>
                      <div className="u-text">
                        <h4>Hizrian</h4>
                        <p className="text-muted">hello@example.com</p>
                        <a
                          href="profile.html"
                          className="btn btn-xs btn-secondary btn-sm"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      My Profile
                    </a>
                    <div className="dropdown-divider"></div>
                    <Link
                      onClick={() => localStorage.clear()}
                      to="/"
                      className="dropdown-item"
                    >
                      <span className="">Logout</span>
                    </Link>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </div>
  );
}

export default Header;
