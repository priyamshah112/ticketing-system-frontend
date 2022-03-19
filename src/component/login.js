import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addUserDetailsAction } from "../actions/userActions";
import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import $ from "jquery"
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
      password: password ? password: e.password,
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
    if(cred){
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
    if(checked){
      localStorage.setItem("credentials", JSON.stringify({
        email,
        password,
      }))
    }else{
      localStorage.removeItem("credentials")
    }
  }

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
              </div>
              <h1 className="text-white my-4">Welcome to Enhance Compliance!</h1>
              <h5 className="text-white font-weight-normal">
                Please use your credentials to login.
              </h5>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-container">
              <div className=" auth-content">
                <h1 className="mb-4 f-w-400 bold">Ticket System</h1>

                <h5 className=" font-weight-normal">
                  {create ? "Activate Account" : "LOGIN"}
                </h5>
                {!create ? (
                  <form>
                    <input
                      type="hidden"
                      name="_token"
                      value="Ba0kkGpzOoHo2USnqX7zrrAD3KeZ9uCXEgbdHGPD"
                    />
                    <div className="form-group mb-3">
                      <label className="floating-label" htmlFor="Email">
                        Email address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        id="Email"
                        placeholder=""
                        value={email}
                        required=""
                      />
                    </div>
                    <div className="form-group mb-4 position-relative">
                      <label className="floating-label" htmlFor="Password">
                        Password
                      </label>
                      <input
                        type={passType}
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        value={password}
                        id="Password"
                        placeholder=""
                        required=""
                      />
                      <div>
                        {
                          passType === "text" ? (
                            <i className="fas fa-eye show-password" onClick={() => setPassType("password")}></i>
                          ) : (
                            <i className="fas fa-eye-slash show-password" onClick={() => setPassType("text")}></i>
                          )
                        }

                      </div>
                    </div>

                    <div>
                      {error.show && error.message && (
                        <div>
                          <p className="text-danger">{error.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="custom-control custom-checkbox text-left mb-4 mt-2">
                      <input
                        type="checkbox"
                        className="remember_me custom-control-input"
                        id="customCheck1"
                        name="remember_me" 
                        onChange={() => saveCredentialsHandler("remember_me")}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Save credentials.
                      </label>
                    </div>
                    <div
                      className="btn btn-block btn-info sign-in mb-4"
                      onClick={loginHandler}
                    >
                      SIGN IN
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
                    </div>
                  </form>
                )}
                <div className="text-center">
                  <p className="mb-2 mt-4 text-muted">
                    <Link className="f-w-400" to="/forgotpassword">Forgot password?{" "} {" "}</Link>
                    <Link className="f-w-400" to="/user/resetpassword">Reset</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
