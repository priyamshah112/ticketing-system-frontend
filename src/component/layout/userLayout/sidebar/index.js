import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addUserDetailsAction } from "../../../../actions/userActions";
import $ from "jquery";
import "./index.css"
import dashboard from "../../../assets/dashboard.png"
import calender from "../../../assets/calender.png"
import tickets from "../../../assets/tickets.png"
import compliancelogo from "../../../assets/compliancelogo.png"
import sciencelogo from "../../../assets/sciences-logo.png"
import lifescience from "../../../assets/life-sciencelogo.png"
import man from "../../../assets/man.png"
import msg from "../../../assets/msg.png"
import corner from "../../../assets/corner.png";

function Sidebar() {
    let data = localStorage.user_details;
    let user = JSON.parse(data);

    const userType = JSON.parse(localStorage.user_details).userType;
    const dispatch = useDispatch();

    const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);
    const [isProfileViewActive, setIsProfileViewActive] = useState(false);
    const [isProfileUpdateActive, setIsProfileUpdateActive] = useState(false);

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
        <div className="col-lg-6">
            <div>
            <img className="corner" src={corner}></img>

            <img
                  src={compliancelogo}
                  alt="logo"
                  className="img-fluid mb-4 d-block  compliance-logo"></img>
                <img
                  src={sciencelogo}
                  alt="logo"
                  className="img-fluid mb-4 d-block  science-logo"></img>
                <img
                  src={lifescience}
                  alt="logo"
                  className="img-fluid mb-4 d-block  life-sciencelogo"></img>
              
            </div>
            <div className=" col-lg-4 user">
                <div className="avatar-sm float-left mr-2 user-profile">
                    <img
                        src="../assets/img/profile.jpg"
                        alt="..."
                        className="avatar-img rounded-circle "
                    />
                </div>
                <div className="info">
                    <a
                        data-toggle="collapse"
                        href="#collapseExample"
                        aria-expanded="true"
                    >
                        <span>
                            <span className="user-level">{user.userType}</span>
                        </span>
                    </a>
                    <div className="clearfix"></div>
                </div>
            </div>

            <div classname="col-lg-4 col-md-6">
                <div className="card  dashboard-nav">
                    <div className="card-body">
                        <ul class="nav   flex-column">
                            <li class="nav-item items">
                                <a class="" href={`/userdashboard`}><img src={dashboard}></img>Dashboard</a>
                            </li>
                            <li class="nav-item items ">
                                <a class="" href={`/tickets`}><img src={tickets}></img>Tickets</a>
                            </li>
                           
                            <li class="nav-item items" onClick={() => localStorage.clear()}>
                                <a class="" href="#"><img src={calender}></img>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>



                <div className="card  contact-card">
                    <div className="card-body">
                        <div className="contact-title">
                                Contact Support
                        </div>
                        <div className="contact-desc">
                        Facing issues? <br></br> Please contact support team for immediate resolution.
                        </div>
                        <div className="contact-today">
                            Contact Today !
                        </div>
                        <img src={msg} className="msg"></img>

                        <img src={man} className="man"></img>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
