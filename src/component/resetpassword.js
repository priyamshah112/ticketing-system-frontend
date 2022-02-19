import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { addUserDetailsAction } from "../actions/userActions";
import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
const queryString = require("query-string");

function ResetPassword(props) {
    const parsed = queryString.parse(window.location.search);
    console.log(parsed)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ show: false, message: "" });
    const [formdata, setFormdata] = useState({});

    const createUserHandler = async (e) => {
        e.preventDefault();
        setError({ show: false, message: "" });
        if (formdata.password === formdata.repassword) {
            const res = await getResponse(apipaths.resetPassword, {
                password: formdata.password,
                token: parsed.token,
                email: parsed.email,
                userType: "admin"
            })
            props.history.push("/")
        } else {
            setError({
                show: true,
                message: "Password and confirm password do not match. ",
            });
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row mx-auto g-0">
                    <div className="col-lg-8 banner-img hide-on-med-and-down">
                        <div className="main-banner">
                            <div className="auth-content-logo">
                                <img
                                    src={logo1}
                                    alt=""
                                    className="img-fluid mb-4 d-block login-logo"
                                />
                                <img
                                    src={logo2}
                                    alt=""
                                    className="img-fluid mb-4 d-block login-logo"
                                />
                                <img
                                    src={logo3}
                                    alt=""
                                    className="img-fluid mb-4 d-block login-logo"
                                />
                            </div>
                            <h1 className="text-white my-4">Welcome!</h1>
                            <h5 className="text-white font-weight-normal">
                                Please use your credentials to login.
                            </h5>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-container">
                            <div className=" auth-content">
                                <h1 className="mb-4 f-w-400 bold">Reset Password</h1>
                                <form className="" onSubmit={createUserHandler}>
                                    <div>
                                        {error.show && error.message && (
                                            <div>
                                                <p className="text-danger">{error.message}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            className="form-control"
                                            value={parsed.email}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            className="form-control"
                                            onChange={(e) =>
                                                setFormdata({ ...formdata, password: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Re-Password</label>
                                        <input
                                            className="form-control"
                                            onChange={(e) =>
                                                setFormdata({
                                                    ...formdata,
                                                    repassword: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-info" type="submit">
                                            Reset
                                        </button>
                                        <button className="btn btn-info ml-4">
                                            <Link className="f-w-500" to="/">Back</Link>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ResetPassword;
