import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addUserDetailsAction } from "../actions/userActions";
import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";
import logo1 from "./assets/logo1.png";
import bg from "./assets/background.png"
import compliancelogo from "./assets/compliancelogo.png"
import sciencelogo from "./assets/sciences-logo.png"
import lifescience from "./assets/life-sciencelogo.png"
import google from "./assets/google.png"
import facebook from "./assets/facebook.png"

import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import $ from "jquery"
import './assets/css/login.css'
const queryString = require("query-string");

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ show: false, message: "" });
  const [formdata, setFormdata] = useState({});
  const [passType, setPassType] = useState("password");

  const { create } = props;

  const parsed = queryString.parse(window.location.search);
  const dispatch = useDispatch();
  const loginHandler = async (e) => {
    e.preventDefault && e.preventDefault();
    setError({ show: false });
    let { status_code, data, error } = await getResponse(apipaths.login, {
      email: email ? email : e.email,
      password: password ? password : e.password,
    });
    if (error)
      return setError({
        show: true,
        message: "Incorrect credentials entered.",
      });
    dispatch(addUserDetailsAction(data.data));
    // console.log(data.data)
    if (data.data.userType === "Support") {
      props.history.push("/tickets");
    } else if (data.data.userType === "User") {
      props.history.push("/userdashboard");
    } else {
      props.history.push("/dashboard");
    }
  };

  useEffect(() => {
    let token = localStorage.authToken;
    if (token) {
      window.location.href = '/dashboard';
    }
    let cred = localStorage.credentials;
    if (cred) {
      cred = JSON.parse(cred);
      loginHandler(cred)
    }

  }, [])

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


  const saveCredentialsHandler = (elem) => {
    let checked = $(`.${elem}`).prop("checked")
    if (checked) {
      localStorage.setItem("credentials", JSON.stringify({
        email,
        password,
      }))
    } else {
      localStorage.removeItem("credentials")
    }
  }




  return (
    <>
      <div className="content-wrapper">
        <div className="row mx-auto g-0">
          <div className="col-lg-6 hide-on-med-and-down">
            <div className=" col-lg-12  main-banner">
              <div>
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
              <div className="auth-content-logo">
                <img
                  src={bg}
                  alt=""
                  className="img-fluid mb-4 d-block bg-logo"
                />
              </div>

            </div>
          </div>
          <div className="col-lg-6  px-0">
            <div className="form-container">
              <div className=" auth-content">
                <h1 className="mb-4 f-w-400 bold sign-in-head">Sign In</h1>

                <h5 className=" font-weight-normal">
                  {create ? <div>
                    <span className="have-account">Already have an account? </span> <span className="sign-up">Sign Up</span>
                  </div> :
                    <div>
                      <span className="have-account">Already have an account? </span> <span className="sign-up">Sign In</span>
                    </div>
                  }
                </h5>
                {!create ? (
                  <form>

                    <div className="button-div">
                      <span>
                        <button type="button" className="btn btn-light google-button " data-toggle="button" aria-pressed="false" ><img src={google} classname="google-icon"></img>Continue with Google</button>
                        <button type="button" class="btn btn-primary facebook-button" data-toggle="button" aria-pressed="false" ><img src={facebook} classname="  google-icon"></img> Continue with Facebook</button>

                      </span>

                    </div>
                    <div className="divider-div">
                      <div><hr className="divider"></hr></div>  <div>or </div> <div><hr className="divider"></hr></div>
                    </div>
                    <input
                      type="hidden"
                      name="_token"
                      value="Ba0kkGpzOoHo2USnqX7zrrAD3KeZ9uCXEgbdHGPD"

                    />
                    <div className="form-group mb-3">
                      <label className="input-label" htmlFor="Email">
                        Email address
                      </label>
                      <input
                        type="text"
                        className="form-control input-box"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="Email"
                        placeholder=""
                        value={email}
                        required=""
                      />
                    </div>
                    <div className="form-group mb-4 position-relative">
                      <label className="input-label" htmlFor="Password">
                        Password
                      </label>
                      <input
                        type={passType}
                        className="form-control input-box"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        value={password}
                        id="Password"
                        placeholder=""
                        required=""
                      />
                      <div>
                        {/*
                          passType === "text" ? (
                            <i className="fas fa-eye show-password" onClick={() => setPassType("password")}></i>
                          ) : (
                            <i className="fas fa-eye-slash show-password" onClick={() => setPassType("text")}></i>
                          )
                          */}

                      </div>
                    </div>

                    <div>
                      {error.show && error.message && (
                        <div>
                          <p className="text-danger">{error.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="forgot-pwd">
                      Forgot Password?
                    </div>
                    <div
                      className="btn btn-block text-center sign-in-button mb-4"
                      onClick={loginHandler}
                    >
                      Sign In
                    </div>
                  </form>
                ) : (
                  <form className="" onSubmit={createUserHandler}>
                    <div>
                      {error.show && error.message && (
                        <div>
                          <p className="text-danger">{error.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="input-label">Email</label>
                      <input
                        className="form-control input-box" 
                        value={parsed.email}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Password</label>
                      <input
                        className="form-control input-box"
                        onChange={(e) =>
                          setFormdata({ ...formdata, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Re-Password</label>
                      <input
                        className="form-control input-box"
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
                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
