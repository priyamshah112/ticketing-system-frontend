import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Modal } from "antd";
import ChangePassword from "../../changepassword";
import ProfileView from "../../profileView";
import ProfileUpdate from "../../updateProfile";
import { ReactComponent as Clipboard } from "../../../images/admin-dashboard/Category.svg";
import { ReactComponent as Solidusers } from "../../../images/admin-dashboard/Plus.svg";
import { ReactComponent as Vector } from "../../../images/admin-dashboard/File.svg";
import dropdown from "../../../images/admin-dashboard/dropdown.svg";
import { ReactComponent as Hardware } from "../../../images/admin-dashboard/Hardware1.svg";
import { ReactComponent as Software } from "../../../images/admin-dashboard/Software.svg";
import { ReactComponent as Inventory } from "../../../images/admin-dashboard/Invoice.svg"
import { ReactComponent as Roles } from "../../../images/admin-dashboard/Education.svg";
import { ReactComponent as User } from "../../../images/admin-dashboard/Plus.svg"
import { ReactComponent as Faq } from "../../../images/admin-dashboard/Comment.svg";
import { ReactComponent as Logout } from "../../../images/admin-dashboard/Logout1.svg";

import $ from "jquery";
import { SvgIcon } from '@material-ui/core';
import { getResponse } from "../../../api/apiResponse";
import { toast } from "react-toastify";
import { apipaths } from "../../../api/apiPaths";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


function IconTabs() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userType = JSON.parse(localStorage.user_details).userType;
    const [showInventory, setshowInventory] = React.useState(false);
    const [showUsers, setshowUsers] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleInventory = () => {
        setshowInventory(!showInventory)
    }
    const toggleUsers = () => {
        setshowUsers(!showUsers)
    }

    const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);
    const [isProfileViewActive, setIsProfileViewActive] = useState(false);
    const [isProfileUpdateActive, setIsProfileUpdateActive] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState({ show: false, message: "" });

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const activeLinkHandler = (elem) => {
        $(`.sidebar-item`).removeClass("active");
        $(`#${elem}`).addClass("active");
    };
    const getUserDetails = async (e) => {
        setError({ show: false, message: "" });
        const res = await getResponse(apipaths.getUSerData);
        setFirstName(res.data.data.first_name);
        setLastName(res.data.data.last_name);
        setMiddleName(res.data.data.middle_name);
        setCountry(res.data.data.location);
        setPhone(res.data.data.phone);
        setEmail(res.data.data.email);
        if (res.error) {
          toast.error(res.error.message)
        } else {
          toast.success(res.data.message)
        }
      }



    return (
        <>
            <div className="side__bar">
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
                     <ProfileView setIsProfileViewActive={setIsProfileViewActive} firstName={firstName} lastName={lastName} middleName={middleName} email={email} country={country} phone={phone}/>
                </Modal>
                {/* <Modal
                    title="Edit Profile"

                    visible={isProfileUpdateActive}
                    onCancel={() => setIsProfileUpdateActive(false)}
                    footer={null}
                >
                    <ProfileUpdate setIsProfileUpdateActive={setIsProfileUpdateActive} />
                </Modal> */}

                <div className="profile__img__layout">
                    <div className="profile" onClick={handleClick}>
                        <img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            width="40" height="40" className="profile__img" alt="" />

                        <img className="profile__dropdown" src={dropdown} width="10" height="10" alt="" />
                    </div>

                    <Popover
                        id={id}
                        data-trigger="focus"
                        className="adminmenu-popup"
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Typography className={classes.typography}>
                            <ul className="popover__content">
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
                                            getUserDetails();
                                        }}
                                    >
                                        <span className="link-collapse">My Profile</span>
                                    </a>
                                </li>
                                {/* <li>
                                    <a href="#edit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsProfileUpdateActive(true);
                                        }}
                                    >
                                        <span className="link-collapse">Edit Profile</span>
                                    </a>
                                </li> */}
                            </ul>
                        </Typography>
                    </Popover>

                </div>

                <ul className="sidebar__ul" style={{paddingLeft:0}}>
                    {userType !== "Support" && (
                        <li className="sidebar-item active"
                            id="dashboard"
                            onClick={() => activeLinkHandler("dashboard")}
                        >
                            <Link
                                to={userType === "User" ? "/userdashboard" : "/dashboard"}
                            >
                                <SvgIcon component={Clipboard} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }} />

                            </Link>
                        </li>
                    )}
                    <li
                        className="sidebar-item"
                        id="tickets-main"
                        onClick={() => activeLinkHandler("tickets-main")}
                    >
                        <Link to={`/tickets`}>
                            <SvgIcon component={Vector} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }} />
                        </Link>
                    </li>
                    <li class="sidebar__divider">
                    </li>
                    <li
                        className="sidebar-item "
                        id="inventory-main"
                        onClick={() => { activeLinkHandler("inventory-main"); toggleInventory() }}
                    >
                        <SvgIcon component={Inventory} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }} />

                    </li>
                    {
                        showInventory ?
                            <div className=" ">
                                <div className=" d-flex " >
                                    <div className="vertical-line shift-line">

                                    </div>
                                    <div classname="flex-column ">
                                        <div className=" d-flex shift-line">
                                            <div className="horizontal-line">

                                            </div>
                                            <li
                                                className="sidebar-item pl-0 pr-0 "
                                                id="inv-software"
                                                onClick={() => activeLinkHandler("inv-software")}
                                            >
                                                <Link to="/inventory/software">
                                                    <SvgIcon component={Software} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '55px', marginLeft: '-4px' }} />
                                                </Link>
                                            </li>
                                        </div>

                                        <div className=" d-flex shift-line">
                                            <div className="horizontal-line ">

                                            </div>
                                            <li
                                                id="inv-hardware"
                                                className="sidebar-item pl-0 pr-0"
                                                onClick={() => activeLinkHandler("inv-hardware")}
                                            >
                                                <Link
                                                    to="/inventory/hardware"
                                                >
                                                    <SvgIcon component={Hardware} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '55px', marginLeft: '-4px' }}  >
                                                    </SvgIcon>
                                                </Link>
                                            </li>

                                        </div>
                                    </div>


                                </div>

                            </div>
                            :
                            ''
                    }
                    <li
                        className="sidebar-item"
                        id="user-sub-user"
                        onClick={() => { activeLinkHandler("user-sub-user"); toggleUsers() }}
                    >
                        <SvgIcon component={Solidusers} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }} />
                    </li>
                    {
                        showUsers ?
                            <div className=" ">
                                <div className=" d-flex " >
                                    <div className="vertical-line shift-line">

                                    </div>
                                    <div classname="flex-column ">
                                        <div className=" d-flex shift-line">
                                            <div className="horizontal-line  ">

                                            </div>
                                            <li
                                                className="sidebar-item pl-0 pr-0"
                                                id="user-role"
                                                onClick={() => activeLinkHandler("user-role")}
                                            >
                                                <Link to="/role">
                                                    <SvgIcon component={Roles} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '55px', marginLeft: '-4px' }} />
                                                </Link>
                                            </li>
                                        </div>

                                        <div className=" d-flex shift-line">
                                            <div className="horizontal-line ">

                                            </div>
                                            <li
                                                className="sidebar-item pl-0 pr-0"
                                                id="user"
                                                onClick={() => activeLinkHandler("user-role")}
                                            >
                                                <Link to="/user">
                                                    <SvgIcon component={User} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '55px', marginLeft: '-4px' }} />
                                                </Link>
                                            </li>

                                        </div>
                                    </div>


                                </div>

                            </div>

                            :
                            ''
                    }

                    {/* <li
                        className="sidebar-item"
                        id="faq-main"
                        onClick={() => activeLinkHandler("faq-main")}
                    >
                        <SvgIcon component={Faq} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }}  />
                    </li> */}


                    <li
                        className="sidebar-item"
                        id="logout-main"
                        onClick={() => activeLinkHandler("logout-main")}
                    >
                        <Link onClick={() => localStorage.clear()} to="/">
                            <SvgIcon component={Logout} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }} />
                        </Link>
                    </li>
                    {/* <li>
                        <img src={wpf_faq}
                            width="20" height="20" />
                    </li> */}
                </ul>
            </div>
        </>
    );
}

export default IconTabs;