import React, { useState } from "react";
import './style.css';
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { apipaths } from "../../api/apiPaths";
import { getResponse } from "../../api/apiResponse";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function ForgotPassword(props) {    

    const [email, setEmail] = useState("");   
    const url = window.location.host
    
    const createUserHandler = async (e) => {
        e.preventDefault();
        if (email) {
            const { data = null, error = null } = await getResponse(apipaths.forgotPassword, {email,url
            })    
            if(data !== null && data.success && error == null)
            {
                swal("Success", "Password reset link is sent!", "success",{
                    button:"Ok"
                }).then(()=>{
                    props.history.push("/")
                });
            }
            else
            {
                swal("Warning", error.message, "error",{
                    button:"Ok"
                })
            }
          
        } else {
            swal("Oops!", "Seems like we couldn't fetch the info", "error");
        }
    };

    return (
        <>
            <div className="forget-password content-wrapper">
                <div className="row mx-auto g-0">
                    <div className="col">
                        <div className="form-container">
                            <div className="auth-content">
                                <h1 className="text-center mb-3 f-w-400 bold">Forgot Password?</h1> 
                                <p className="text-center">No worries, we'll send you reset instructions.</p>                             
                                <form onSubmit={createUserHandler}>
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value="Ba0kkGpzOoHo2USnqX7zrrAD3KeZ9uCXEgbdHGPD"
                                    />
                                    <div className="form-group mb-2">
                                        <label className="floating-label" htmlFor="Email">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setEmail(e.target.value)}
                                            name="email"
                                            id="Email"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>   
                                    <div className="form-group">                 
                                        <button className="btn btn-secondary" type="submit">
                                            Reset Password
                                        </button>
                                    </div>                     
                                    <div className="form-group">  
                                        <Link className="back-link" to="/">
                                            <ArrowBackIcon className="MIcons"/>Back to log in                                            
                                        </Link>
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
