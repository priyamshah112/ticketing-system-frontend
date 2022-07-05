import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import InputFeild from "../component/forms/InputFeild";
import { useSelector } from "react-redux";
import { getResponse } from "../api/apiResponse";
import { apipaths } from "../api/apiPaths";
import { toast } from "react-toastify";


function ProfileView(props) {
  const { isProfileViewActive, setIsProfileViewActive, firstName, lastName, middleName, phone, email, country } = props;
  const userDetails = useSelector((state) => state.userDetails.user_details);
  const [error, setError] = useState({ show: false, message: "" });
  const [img, setImg] = useState();
  console.log(firstName, lastName, email, phone)
  const createUserHandler = async (e) => {
    setError({ show: false, message: "" });

    const res = await getResponse(apipaths.viewProfile, { image_name: img });

    setImg(res.data.data.image_name)
    if (res.error) {
      toast.error(res.error.message)
    } else {
      toast.success(res.data.message)
      console.log(res.data.data.image_name);
    }
  }


  useEffect(() => {
    createUserHandler();
  }, []);

  return (
    <form className="row">
      <div className="form-group col-12 d-flex justify-content-center align-items-center">
        <div className=" float-left mr-2 myprofile">
          <img
            src="../assets/img/profile.jpg"
            alt="..."
            className="avatar-img rounded-circle"
          />
          <div class="image-upload">
            <label for="file-input">
              <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png" />
            </label>

            <input id="file-input" type="file" />
          </div>
        </div>
      </div>
      <div className="form-group col-6">
        <label>First Name</label>
        <input
          className="form-control"
          value={firstName}
          disabled
        />
      </div>
      <div className="form-group col-6">
        <label>Middle Name</label>
        <input
          className="form-control"
          value={middleName}
          disabled
        />
      </div>
      <div className="form-group col-6">
        <label>Last Name</label>
        <input
          className="form-control"
          value={lastName}
          disabled
        />
      </div>
      <div className="form-group col-6">
        <label>Email</label>
        <input className="form-control" value={email} disabled />
      </div>
      <div className="form-group col-6">
        <label>Phone</label>
        <input
          className="form-control"
          value={phone}
          disabled
        />
      </div>
      <div className="form-group col-6">
        <label>Country</label>
        <input
          className="form-control"
          value={country}
          disabled
        />
      </div>
    </form>
  );
}

export default ProfileView;
