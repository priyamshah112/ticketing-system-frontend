import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import InputFeild from "../component/forms/InputFeild";
import { useSelector, useDispatch } from "react-redux";
import { getResponse } from "../api/apiResponse";
import { apipaths } from "../api/apiPaths";
import { toast } from "react-toastify";
import '../App.css'

function ProfileUpdate(props) {
  const { isProfileUpdateActive, setIsProfileUpdateActive } = props;
  const userDetails = useSelector((state) => state.userDetails.user_details);
  const dispatch = useDispatch();
  const data = new FormData();


  const [img, setImg] = useState();
  const [error, setError] = useState({ show: false, message: "" });
  const updateImage = async (e) => {
    setError({ show: false, message: "" });
    e.preventDefault();
    const res = await getResponse(apipaths.updateProfile, data);
    data.append("image_name", res.data);
    setImg(res.data.data.image_name)
    if (res.error) {
      toast.error(res.error.message)
    } else {
      toast.success(res.data.message)
      console.log(res.data);
    }
  }

  useEffect(() => {
    updateImage();
  }, [img]);


 

  const uploadProfilePicture = (formData) => {
    return dispatch => {
      const configurationObject = {
        credentials: "include",
        method: "POST",
        body: formData
      }
      const baseUrl = "http://142.93.211.147:8080/"
      return fetch(`${baseUrl}/api/v1/update-profile`, configurationObject)
        .then(r => r.json())
        .then(photo => {
          if (photo.error) {
            alert(photo.error)
          } else {
            // this is where I will dispatch an action creator function to update my store
            console.log("success", photo)
            const mapDispatchToProps = dispatch => {
              return {
                //toggleForm: () => dispatch(setFormStateToActive()),
                submitProfilePhoto: (formData) => dispatch(uploadProfilePicture(formData))
              }
            }
          }
        })
        .catch(error => console.log(error))
    }
  }
  return (
    <>
    <form className="row">
      <div className="form-group col-12 d-flex justify-content-center align-items-center">
        <div className="avatar-sm float-left mr-2">
          <img
            src="../assets/img/profile.jpg"
            alt="..."
            className="avatar-img rounded-circle"
          />
        </div>
      </div>
      <div className="form-group col-6">
        <label>First Name</label>
        <input
          onChange={e => { }}
          className="form-control"
          value={userDetails?.firstName}
          disabled     ></input>
        <div className="form-group col-6">
          <label>First Name</label>
          <input
            onChange={e => { }}
            className="form-control"
            value={userDetails?.firstName}
            disabled

          />
        </div>
        <div className="form-group col-6">
          <label>Middle Name</label>
          <input
            className="form-control"
            value={userDetails?.middleName}
            disabled
          />
        </div>
        <div className="form-group col-6">
          <label>Last Name</label>
          <input
            className="form-control"
            value={userDetails?.lastName}
            disabled
          />
        </div>
        <div className="form-group col-6">
          <label>Email</label>
          <input className="form-control" value={userDetails?.email} disabled />
        </div>
        <div className="form-group col-6">
          <label>Phone</label>
          <input
            className="form-control"
            value={userDetails?.cellPhone}
            disabled
          />
        </div>
        <div className="form-group col-6">
          <label>Country</label>
          <input
            className="form-control"
            value={userDetails?.clientLocation}
            disabled
          />
        </div>
      </div>
    </form>
        </>
    );
}

export default ProfileUpdate;
