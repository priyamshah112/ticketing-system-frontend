import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Modal } from "antd";
import ChangePassword from "../changepassword";
import ProfileView from "../profileView";
import ProfileUpdate from "../updateProfile"


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


function IconTabs() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isChangePasswordActive, setIsChangePasswordActive] = useState(false);
    const [isProfileViewActive, setIsProfileViewActive] = useState(false);
    const [isProfileUpdateActive, setIsProfileUpdateActive] = useState(false);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
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

                <div className="profile__img__layout row align-items-center mx-0 justify-content-around">
                    <figure>
                        <img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            width="40" height="40" className="profile__img" alt="" />
                    </figure>
                    <figure onClick={handleClick}>
                        <img src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            width="10" height="10" className="profile__img" alt="" />
                    </figure>

                    <Popover
                        id={id}
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
                    <li className="active">
                        <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                width="20" height="20" />
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                width="20" height="20" />
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                width="20" height="20" />
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                width="20" height="20" />
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                width="20" height="20" />
                        </figure>
                    </li>
                    <li>
                        <figure>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                width="20" height="20" />
                        </figure>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default IconTabs;