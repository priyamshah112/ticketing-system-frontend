import React, { useState } from "react";
import './style.css';
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { apipaths } from "../../api/apiPaths";
import { getResponse } from "../../api/apiResponse";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const queryString = require("query-string");

function ResetPassword(props) {
    const parsed = queryString.parse(window.location.search);
    const [error, setError] = useState({ show: false, message: "" });
    const [formdata, setFormdata] = useState({
        password: '',
        resetPassword: '',
    });

    const createUserHandler = async (e) => {
        e.preventDefault();
        setError({ show: false, message: "" });
        if (formdata.password === formdata.repassword) {
            const {data = null, error = null} = await getResponse(apipaths.resetPassword, {
                password: formdata.password,
                token: parsed.token,
                email: parsed.email
            })
            if(data !== null && data.success && error == null)
            {
                swal("Success", "Password is updated successfully.", "success",{
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
            setFormdata({
                password: '',
                repassword: ''
            });
            setError({
                show: true,
                message: "Password do not match. Please, try again",
            });
        }
    };

    return (
        <>
            <div className="reset-password content-wrapper">
                <div className="row mx-auto g-0">
                    <div className="col">
                        <div className="form-container">
                            <div className=" auth-content">
                                <h1 className="text-center mb-4 f-w-400 bold">Password Reset</h1>
                                <p className="text-center">Enter your new password and then repeat it</p>
                                <form className="" onSubmit={createUserHandler}>
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        value={parsed.email}
                                        disabled
                                    />
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            onChange={(e) =>
                                                setFormdata({ ...formdata, password: e.target.value })
                                            }
                                            value={formdata?.password}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Re-Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            onChange={(e) =>
                                                setFormdata({
                                                    ...formdata,
                                                    repassword: e.target.value,
                                                })
                                            }
                                            value={formdata?.repassword}
                                            required
                                        />
                                    </div>
                                    {error.show && error.message && (
                                        <div className="error-msg text-danger">{error.message}</div>
                                    )}
                                    <div className="form-group">
                                        <button className="btn btn-secondary" type="submit">
                                            Save
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
            </div >
        </>
    );
}

export default ResetPassword;
