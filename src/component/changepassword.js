import React, { useState } from "react";
import { toast } from "react-toastify";
import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";

function ChangePassword(props) {
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [error, setError] = useState({ show: false, message: "" });

  const { setIsChangePasswordActive } = props;

  const createUserHandler = async (e) => {
    e.preventDefault();
    setError({ show: false, message: "" });
    if (newpassword === conpassword) {
      const res = await getResponse(apipaths.changePassword, {
        current_password: oldpassword,
        new_password: newpassword,
        new_confirm_password: conpassword,
      });
      if (res.error) {
        toast.error(res.error.message)
      } else {
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
    <form onSubmit={createUserHandler}>
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
          type="password"
          className="form-control"
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm-Password</label>
        <input
          type="password"

          className="form-control"
          onChange={(e) => setConPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-info" type="submit">
          Change Password
        </button>
      </div>
    </form>
  );
}

export default ChangePassword;
