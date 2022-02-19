import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";
import { addUserDetailsAction } from "../actions/userActions";
import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
const queryString = require("query-string");

function ChangePassword(props) {
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [error, setError] = useState({ show: false, message: "" });

  const { setIsChangePasswordActive, isChangePasswordActive } = props;

  const createUserHandler = async (e) => {
    e.preventDefault();
    setError({ show: false, message: "" });  
    if (newpassword === conpassword) {
      const res = await getResponse(apipaths.changePassword, {
        current_password: oldpassword,
        new_password: newpassword,
        new_confirm_password: conpassword,
      }); 
      if(res.error){
        toast.error(res.error.message)
      }else{
        toast.success(res.data.message)
        setIsChangePasswordActive(false);
      }
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
        {isChangePasswordActive && (
          <div className="custom-modal open">
            <div
              className="custom-modal-content"
              style={{ position: "absolute", width: "70%", left: "15%" }}
            >
              <div className="form-container">
                <div className=" auth-content">
                  <h1 className="mb-4 f-w-400 bold">change Password</h1>
                  <form className="" onSubmit={createUserHandler}>
                    <div>
                      {error.show && error.message && (
                        <div>
                          <p className="text-danger">{error.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Old Password</label>
                      <input
                        className="form-control"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        className="form-control"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm-Password</label>
                      <input
                        className="form-control"
                        onChange={(e) => setConPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-info" type="submit">
                        Change Password
                      </button>
                      <button
                        className="btn btn-info ml-4 f-w-500"
                        onClick={() => setIsChangePasswordActive(false)}
                      >
                        Back
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChangePassword;
