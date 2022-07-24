import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getResponse } from "../../api/apiResponse";
import { apipaths } from "../../api/apiPaths";
import { toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import './style.css';
import PersonIcon from '@mui/icons-material/Person';

function ProfileView(props) {
  const { isProfileViewActive, setIsProfileViewActive, firstName, lastName, middleName, phone, email, country } = props;
  const userDetails = useSelector((state) => state.userDetails.user_details);
  const [error, setError] = useState({ show: false, message: "" });
  const [img, setImg] = useState("");

  const getUserDetails = async (e) => {
    setError({ show: false, message: "" });

    const res = await getResponse(apipaths.getUserData);
    setImg(res.data.data.image_name)
    if (res.error) {
      toast.error(res.error.message)
    } else {
      toast.success(res.data.message)
    }
  }


  useEffect(() => {
    getUserDetails();
  }, []);

  const handleFileInput = async(imageFile) => {
    const formdata = new FormData();
    formdata.append('image_name', imageFile);

    let resp = await getResponse(apipaths.updateProfile, formdata);
    if (resp.status === 200) {
      toast.success(resp.data.message);
      getUserDetails();
    } else {
      if(resp.error.message.image_name !== undefined)
      {
        toast.error(resp.error.message?.image_name);
      }
      else
      {
        toast.error(resp.error.message);
      }
    }

  }

  return (
    <div>
      <div className="col-12 d-flex justify-content-center align-items-center">
        <div className=" float-left mr-2 myprofile">
          {
            img !== "" && img !== null ?          
              <img
                src={ img }
                alt="..."
                className="avatar-img rounded-circle"
              />
              :
              <div className="default-profile-container">  
                <PersonIcon className="default-profile" />
              </div>
            }
          <div class="image-upload">
            <label class="profile-edit-button-container" for="file-input">
              <EditIcon className="profile-edit-button" />
            </label>

            <input 
              id="file-input" 
              type="file" 
              accept="image/*, image/jpeg, image/png" 
              onChange={(e) => handleFileInput(e.target.files[0])}
            />
          </div>
        </div>
      </div>
      <div className="profile-details">
        <p className="name">{firstName+' '+middleName+''+lastName}</p>
        {/* <h3 className="basic-label">Basic Details</h3> */}
        <div className="row">
          <div className="col-6 contact-details">
            <div className="mb-2">
              <h2 className="label">Email Address</h2>
              <p>{email ? email : '---'}</p>
            </div>
            <div className="mb-2">
              <h2 className="label">Phone Number</h2>
              <p>{phone ? phone : '---'}</p>
            </div>
          </div>
          <div className="col-6 location">
            <div className="mb-2">
              <h2 className="label">Country</h2>
              <p>{country ? country : '---'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
