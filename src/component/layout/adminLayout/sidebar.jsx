import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Modal } from "antd";
import ChangePassword from "../../changepassword";
import ProfileView from "../../profileView";
import ProfileUpdate from "../../updateProfile";
import bi_clipboard from "../../../images/admin-dashboard/bi_clipboard-data.svg";
import solid_users from "../../../images/admin-dashboard/fa-solid_users.svg";
import Vector from "../../../images/admin-dashboard/Vector.svg";
import dropdown from "../../../images/admin-dashboard/dropdown.svg";
import hardwareInventory from "../../../images/admin-dashboard/hardware-inventory.svg";
import softwareInventory from "../../../images/admin-dashboard/software-inventory.svg";
import inventory from "../../../images/admin-dashboard/inventory.svg"
import role from "../../../images/admin-dashboard/roles.svg";
import user from "../../../images/admin-dashboard/user.svg"
import $ from "jquery";

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

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const activeLinkHandler = (elem) => {
        $(`.sidebar-item`).removeClass("active");
        $(`#${elem}`).addClass("active");
    };



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
                    <ProfileView setIsProfileViewActive={setIsProfileViewActive} />
                </Modal>
                <Modal
                    title="Edit Profile"

                    visible={isProfileUpdateActive}
                    onCancel={() => setIsProfileUpdateActive(false)}
                    footer={null}
                >
                    <ProfileUpdate setIsProfileUpdateActive={setIsProfileUpdateActive} />
                </Modal>

                <div className="profile__img__layout">
                    <div className="profile" onClick={handleClick}>
                        <img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            width="40" height="40" className="profile__img" alt="" />

                        <img className="profile__dropdown" src={dropdown} width="10" height="10" alt="" />
                    </div>

                    <Popover
                        id={id}
                        data-trigger="focus"

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
                                        }}
                                    >
                                        <span className="link-collapse">My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#edit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsProfileUpdateActive(true);
                                        }}
                                    >
                                        <span className="link-collapse">Edit Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <Link onClick={() => localStorage.clear()} to="/">
                                        <span className="link-collapse">Logout</span>
                                    </Link>
                                </li>
                            </ul>
                        </Typography>
                    </Popover>

                </div>

                <ul className="sidebar__ul">
                    {userType !== "Support" && (
                        <li className="sidebar-item active"
                            id="dashboard"
                            onClick={() => activeLinkHandler("dashboard")}
                        >
                            <Link
                                to={userType === "User" ? "/userdashboard" : "/dashboard"}
                            >
                                <img src={bi_clipboard}
                                    width="20" height="20" />
                            </Link>
                        </li>
                    )}
                    <li
                        className="sidebar-item"
                        id="tickets-main"
                        onClick={() => activeLinkHandler("tickets-main")}
                    >
                        <Link to={`/tickets`}>
                            <img src={Vector} width="20" height="20" />
                        </Link>
                    </li>
                    <li class="sidebar__divider">
                    </li>
                    <li
                        className="sidebar-item"
                        id="inventory-main"
                        onClick={toggleInventory}
                    >
                        <div >
                            <img src={inventory} width="20" height="20" />
                        </div>
                    </li>
                    {
                        showInventory ?
                            <div>
                                <li
                                    className="sidebar-item"
                                    id="inv-software"
                                    onClick={() => activeLinkHandler("inv-software")}
                                >
                                    <Link to="/inventory/software">
                                        <img src={softwareInventory} width="20" height="20" />
                                    </Link>
                                </li>
                                <li
                                    id="inv-hardware"
                                    className="sidebar-item"
                                    onClick={() => activeLinkHandler("inv-hardware")}
                                >
                                    <Link
                                        to="/inventory/hardware"
                                    >
                                        <img src={hardwareInventory} width="20" height="20" />
                                    </Link>
                                </li>
                            </div>
                            :
                            ''
                    }
                    <li
                        className="sidebar-item"
                        id="user-sub-user"
                        onClick={toggleUsers}
                    >
                            <img src={solid_users} width="20" height="20" />
                    </li>
                    {
                        showUsers ?
                            <div>
                                <li
                                    className="sidebar-item"
                                    id="user-role"
                                    onClick={() => activeLinkHandler("user-role")}
                                >
                                    <Link to="/role">
                                        <img src={role} width="20" height="20" />
                                    </Link>
                                </li>
                                <li
                                    className="sidebar-item"
                                    id="user"
                                    onClick={() => activeLinkHandler("user-role")}
                                >
                                    <Link to="">
                                        <img src={user} width="20" height="20" />
                                    </Link>
                                </li>
                            </div>
                            :
                            ''
                    }


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