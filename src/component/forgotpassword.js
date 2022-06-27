import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";

function ForgotPassword(props) {    

    const [email, setEmail] = useState("");   
    const [error, setError] = useState({ show: false, message: "" });
    const [message, setMessage] = useState("");
    const url = window.location.host
    
    const createUserHandler = async (e) => {
        e.preventDefault();
        setError({ show: false, message: "" });
        if (email) {
            const {res , message} = await getResponse(apipaths.forgotPassword, {email,url
            })
            setMessage(message);            
            setEmail('')
            swal(message,'success',{
                button:"Ok"
            }).then(()=>{
                props.history.push("/")
            })
            //props.history.push("/")
          
        } else {
            setError({
                show: true,
                message: "Enter your Email Address. ",
            });
        }
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row mx-auto g-0">
                    <div className="col-lg-8 banner-img hide-on-med-and-down">
                        <div className="main-banner" style={{width:'80%'}}>
                            <div className="auth-content-logo">
                                <img
                                    src={logo1}
                                    alt=""
                                    className="img-fluid mb-4 d-block  compliance-logo"
                                />
                            </div>
                            <h1 className=" my-4 ml-5" style={{fontSize:'50px'}}>Welcome!</h1>
                            <h5 className="font-weight-normal  ml-5" style={{fontSize:'20px'}}>Please use your credentials to login.
                            </h5>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-container">
                            <div className=" auth-content">
                                <h1 className="mb-4 f-w-400 bold">Forgot Password</h1> 
                                <p className="text-center">{message}</p>                               
                                <form onSubmit={createUserHandler}>
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
                                            required=""
                                        />
                                    </div>                                  
                                    <div className="form-group">
                                        <button className="btn btn-info" type="submit">
                                            Forgot Password
                                        </button>
                                        <button className="btn btn-info ml-4">
                                            <Link style={{color:'white'}} className="f-w-500" to="/">Back</Link>                                            
                                        </button>
                                    </div>
                                    <div>
                                        {error.show && error.message && (
                                            <div>
                                                <p className="text-danger">{error.message}</p>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
