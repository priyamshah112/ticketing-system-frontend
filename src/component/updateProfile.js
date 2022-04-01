import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import InputFeild from "../component/forms/InputFeild";
import { useSelector, useDispatch } from "react-redux";

function ProfileUpdate(props) {
  const { isProfileUpdateActive, setIsProfileUpdateActive } = props;
  const userDetails = useSelector((state) => state.userDetails.user_details);
  const dispatch = useDispatch();
  const submitPhoto = (event) => {
    event.preventDefault();
    let photoInput = document.getElementById('profile-photo-input');
    if (photoInput.files[0]) {
      const formData = new FormData();
      const upload_file = photoInput.files[0]
      formData.append('profile_picture', upload_file);
      props.submitProfilePhoto(formData)
    }
  }

  const imageUrl = "http://142.93.211.147:8080/view-profile";
  const [img, setImg] = useState();

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, []);
  
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
    <form className="row">
      <div className="form-group col-12 d-flex justify-content-center align-items-center">
        <div className="avatar-sm float-left mr-2">
          <form className={props.formStatus === "Active" ? "" : "hidden"} onSubmit={submitPhoto}>
            <input type="file"
              id="profile-photo-input" name="profile_picture"
              accept="image/png, image/jpeg"
            />
            <input
              className="submit-input"
              type="submit"
              value="Upload"
            />
          </form>
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
    </form>
  );
}

export default ProfileUpdate;
