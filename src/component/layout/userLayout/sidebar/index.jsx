import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addUserDetailsAction } from "../../../../actions/userActions";
import $ from "jquery";
import "./style.css"
import "../../../userDashboard/user.css"
import { ReactComponent as Dashboard } from "../../../assets/Dashboard.svg"
import calender from "../../../assets/calender.png"
import { ReactComponent as Tickets } from "../../../assets/tickets.svg"
import { ReactComponent as Logout } from "../../../assets/Logout.svg"
import compliancelogo from "../../../assets/compliancelogo.png"
import sciencelogo from "../../../assets/sciences-logo.png"
import lifescience from "../../../assets/life-sciencelogo.png"
import man from "../../../assets/man.png"
import msg from "../../../assets/msg.png"
import corner from "../../../assets/corner.png";
import { SvgIcon } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from "antd";
import ChangePassword from "../../../changepassword";
import ProfileView from "../../../Profile";
import ProfileUpdate from "../../../updateProfile";
import { getResponse } from "../../../../api/apiResponse";
import { toast } from "react-toastify";
import { apipaths } from "../../../../api/apiPaths";
import PersonIcon from '@mui/icons-material/Person';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));
function Sidebar() {
    const classes = useStyles();

    let data = localStorage.user_details;
    let user = JSON.parse(data);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const userType = JSON.parse(localStorage.user_details).userType;
    const userName = JSON.parse(localStorage.user_details).name;

    const dispatch = useDispatch();

    const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);
    const [isProfileViewActive, setIsProfileViewActive] = useState(false);
    const [isProfileUpdateActive, setIsProfileUpdateActive] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [img, setImg] = useState("");
    const [error, setError] = useState({ show: false, message: "" });
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        getUserDetails();
        if (data) return dispatch(addUserDetailsAction(JSON.parse(data)));
    }, []);
    
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
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
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
                <div className="logos">                    
                    <img
                        src={compliancelogo}
                        alt="logo"
                        className="img-fluid mb-4 d-block  compliance-logo"></img>
                    <img
                        src={sciencelogo}
                        alt="logo"
                        className="img-flui                                                                                                                                         d mb-4 d-block  science-logo"></img>
                    <img
                        src={lifescience}
                        alt="logo"
                        className="img-fluid mb-4 d-block  life-sciencelogo"></img>
                </div>
            </div>
            <div className=" col-lg-4 user">
                <div className="avatar-sm float-left mr-2 user-profile">
                {
                    img !== "" && img !== null ? 
                        <img
                            src={ img }
                            alt="..."
                            width="40" 
                            height="40"
                            className="avatar-img rounded-circle"
                        />
                    :
                    <div className="default-profile-container">  
                        <PersonIcon className="default-profile" />
                    </div>
                }
                </div>
                <div className="info">
                    <a
                        data-toggle="collapse"
                        href="#collapseExample"
                        aria-expanded="true"
                        onClick={handleClick}
                    >
                        <span>
                            <span className="user-level">{user.name}</span>
                        </span>
                        <span> <i style={{
                            position: 'absolute',
                            top: '96px',
                            left: '230px',
                            color:'white'
                        }} class="fas fa-caret-down fa-2x"></i></span>


                    </a>
                    <div className="clearfix"></div>
                </div>


                <Popover
                    id={id}
                    data-trigger="focus"
                    className="user-menu-popup"
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

            <div classname="col-lg-4 col-md-6">
                <div className="card  dashboard-nav">
                    <div className="card-body">
                        <ul class="nav   flex-column">
                            <li class="nav-item items">
                                <a class="" href={`/userdashboard`}>  <SvgIcon component={Dashboard} width="25" height="25" viewBox="0 -10 59 59" style={{ fontSize: '2.5rem ', width: '45px' }} />Dashboard</a>
                            </li>
                            <li class="nav-item items ">
                                <a class="" href={`/tickets`}><SvgIcon component={Tickets} width="25" height="25" viewBox="10 -10 59 59 " style={{ fontSize: '2rem', width: '45px' }} />Tickets</a>
                            </li>

                            <li class="nav-item items" onClick={() => localStorage.clear()}>
                                <a class="" href="#"><SvgIcon component={Logout} width="25" height="25" viewBox="0 0 59 59" style={{ fontSize: '2rem', width: '45px' }} />Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>



                <div className="card  contact-card d-none">
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
            <Modal
                title="Edit Profile"

                visible={isProfileUpdateActive}
                onCancel={() => setIsProfileUpdateActive(false)}
                footer={null}
            >
                <ProfileUpdate setIsProfileUpdateActive={setIsProfileUpdateActive} />
            </Modal>
        </div>
    );
}

export default Sidebar;
