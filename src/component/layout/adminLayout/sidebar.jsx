import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Modal } from "antd";
import ChangePassword from "../../changepassword";
import ProfileView from "../../Profile";
import { ReactComponent as Clipboard } from "../../../images/admin-dashboard/Category.svg";
import { ReactComponent as Solidusers } from "../../../images/admin-dashboard/Plus.svg";
import { ReactComponent as Vector } from "../../../images/admin-dashboard/File.svg";
import dropdown from "../../../images/admin-dashboard/dropdown.svg";
import { ReactComponent as Hardware } from "../../../images/admin-dashboard/Hardware1.svg";
import { ReactComponent as Software } from "../../../images/admin-dashboard/Software.svg";
import { ReactComponent as Inventory } from "../../../images/admin-dashboard/Invoice.svg"
import { ReactComponent as Roles } from "../../../images/admin-dashboard/Education.svg";
import { ReactComponent as User } from "../../../images/admin-dashboard/Plus.svg"
import { ReactComponent as Faq } from "../../../images/admin-dashboard/File.svg"
import { ReactComponent as Logout } from "../../../images/admin-dashboard/Logout1.svg";
import PersonIcon from '@mui/icons-material/Person';

import $ from "jquery";
import { SvgIcon } from '@material-ui/core';
import { getResponse } from "../../../api/apiResponse";
import { toast } from "react-toastify";
import { apipaths } from "../../../api/apiPaths";
import './style.css';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


function IconTabs() {
    const location = useLocation();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userType = JSON.parse(localStorage.user_details).userType;
    const [showInventory, setshowInventory] = React.useState(false);
    const [showUsers, setshowUsers] = React.useState(false);

    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setActiveRoute();
        }, 400)
    }, []);
    
    const setActiveRoute = () => {
        if(location.pathname === '/dashboard')
        {
            activeLinkHandler('dashboard');
        }
        else if(location.pathname === '/tickets') {
            activeLinkHandler('tickets-main');
        }
        else if(location.pathname === '/inventory/software') {
            toggleInventory();
            activeLinkHandler('inv-software');
        }
        else if(location.pathname === '/inventory/hardware') {
            toggleInventory();
            activeLinkHandler('inv-hardware');
        }
        else if(location.pathname === '/role') {
            toggleUsers();
            activeLinkHandler("roles");
        }
        else if(location.pathname === '/user') {
            toggleUsers();
            activeLinkHandler("users");
        }
        else if(location.pathname === '/faqs') {
            toggleUsers();
            activeLinkHandler("faq-main");
        }
        else if(location.pathname === '/useful-information') {
            toggleUsers();
            activeLinkHandler("useful-information-main");
        }
    }

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
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [img, setImg] = useState("");
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
        const res = await getResponse(apipaths.getUserData);

        setFirstName(res.data.data.first_name);
        setLastName(res.data.data.last_name);
        setMiddleName(res.data.data.middle_name);
        setCountry(res.data.data.location);
        setPhone(res.data.data.phone);
        setEmail(res.data.data.email);
        setImg(res.data.data.image_name);
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

                <div className="profile__img__layout">
                    <div className="profile" onClick={handleClick}>
                        {
                            img !== "" && img !== null ? 
                                <img
                                    src={ img }
                                    alt="..."
                                    width="40" 
                                    height="40"
                                    className="profile__img"
                                />
                            :
                            <div className="default-profile-container">  
                                <PersonIcon className="default-profile" />
                            </div>
                        }
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
                                            handleClose();
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
                                            handleClose();
                                        }}
                                    >
                                        <span className="link-collapse">My Profile</span>
                                    </a>
                                </li>
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
                            <a
                                title ="" href={userType === "User" ? "/userdashboard" : "/dashboard"}
                            >
                                <SvgIcon component={Clipboard} viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }} />

                            </a>
                            <span class="hiddenHover">Dashboard</span>
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
                        <span class="hiddenHover">Tickets</span>
                    </li>
                    <li class="sidebar__divider">
                    </li>
                    <li
                        className="sidebar-item "
                        id="inventory-main"
                        onClick={() => { activeLinkHandler("inventory-main"); toggleInventory() }}
                        
                    >
                        <span class="hiddenHover"> Inventory</span>
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
                                                <span class="hiddenHoverIn">Software</span>
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
                                                <span class="hiddenHoverIn">Hardware</span>
                                            </li>

                                        </div>
                                    </div>


                                </div>

                            </div>
                            :
                            ''
                    }
                    { userType !==  'Co-Admin' && (
                        <li
                            className="sidebar-item"
                            id="user-sub-user"
                            onClick={() => { activeLinkHandler("user-sub-user"); toggleUsers() }}
                        >
                            <span class="hiddenHover">Users</span>
                            <SvgIcon component={Solidusers} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }} />
                        </li>
                    )}
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
                                                id="roles"
                                                onClick={() => activeLinkHandler("roles")}
                                            >
                                                <span class="hiddenHoverIn">Roles</span>
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
                                                id="users"
                                                onClick={() => activeLinkHandler("users")}
                                            >
                                                <span class="hiddenHoverIn">Users</span>
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

                    { userType !==  'Co-Admin' && (
                    <li
                        className="sidebar-item"
                        id="faq-main"
                        onClick={() => activeLinkHandler("faq-main")}
                    >
                        <span class="hiddenHover">Faqs</span>
                        <Link to={`/faqs`}>
                            <SvgIcon component={Faq} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }}  />
                        </Link>
                    </li>
                    )}
                    
                    { userType !==  'Co-Admin' && (
                    <li
                        className="sidebar-item"
                        id="useful-information-main"
                        onClick={() => activeLinkHandler("useful-information-main")}
                    >
                        <span class="hiddenHover">Information</span>
                        <Link to={`/useful-information`}>
                            <SvgIcon component={Faq} width="20" height="20" viewBox="0 -10 59 59" style={{ fontSize: '3.5rem ', width: '60px' }}  />
                        </Link>
                    </li>
                    )}


                    <li
                        className="sidebar-item"
                        id="logout-main"
                        onClick={() => activeLinkHandler("logout-main")}
                    >
                        <span class="hiddenHover">Logout</span>
                        
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