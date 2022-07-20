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
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState({ show: false, message: "" });
  
  const getUserDetails = async (e) => {
    setError({ show: false, message: "" });
    const res = await getResponse(apipaths.getUserData);
    setFirstName(res.data.first_name);
    setLastName(res.data.last_name);
    setMiddleName(res.data.middle_name);
    setCountry(res.data.location);
    setPhone(res.data.phone);
    setEmail(res.data.email);
    if (res.error) {
      toast.error(res.error.message)
    } else {
      toast.success(res.data.message)
    }
  }
  
  useEffect(() => {
    uploadProfilePicture(img);
  }, [img]);
  useEffect(() => {
    getUserDetails();
  }, []);
  
  const ImageThumb = ({ image }) => {
    uploadProfilePicture(image);

    return <img src={image}  />;
  };

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
  function handleUpload(event) {
    setImg(event.target.value)
    // Add code here to upload file to server
    // ...
  }
  return (
    <>
      <form className="row">
        <div className="form-group col-12 d-flex justify-content-center align-items-center">
          <div className=" float-left mr-2">
          <ImageThumb  className="avatar-img rounded-circle" image={img} />
           



          </div>
          <div>
            <input type="file" onChange={handleUpload} accept="image/*" />
          </div>
        </div>
        <div className="form-group col-12" style={{display: 'contents'}}>



          <div className="form-group col-6 ">
            <label>First Name</label>
            <input
              onChange={e => { }}
              className="form-control "
              value={firstName}
              disabled     ></input>
          </div>
          <div className="form-group col-6">
            <label>Middle Name</label>
            <input
              className="form-control "
              value={middleName}
              disabled
            />
          </div>
          <div className="form-group col-6">
            <label>Last Name</label>
            <input
              className="form-control "
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
        </div>
      </form>
    </>
  );
}

export default ProfileUpdate;
