import React, { useEffect, useState } from "react";
import { Modal } from 'antd';
import InputFeild from "../component/forms/InputFeild";
import { useSelector } from "react-redux";

function ProfileView(props) {

  const { isProfileViewActive, setIsProfileViewActive } = props;
  const userDetails = useSelector((state) => state.userDetails.user_details);

  return (
    <>

      <div className="content-wrapper">
        {isProfileViewActive && (
          <div className="custom-modal open">
            <div
              className="custom-modal-content"
              style={{ position: "absolute", width: "70%", left: "15%" }}
            >
              <div className="form-container">
                <div className=" auth-content">
                  <h1 className="mb-4 f-w-400 bold">My Profile</h1>
                  <form className="row">
                    <div className="form-group col-6">
                      <label>First Name</label>
                      <input
                        className="form-control" value={userDetails.firstName} disabled
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Middle Name</label>
                      <input
                        className="form-control" value={userDetails.middleName} disabled
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Last Name</label>
                      <input
                        className="form-control" value={userDetails.lastName} disabled
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Email</label>
                      <input
                        className="form-control" value={userDetails.email} disabled
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Phone</label>
                      <input
                        className="form-control" value={userDetails.cellPhone} disabled
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Country</label>
                      <input
                        className="form-control" value={userDetails.clientLocation} disabled
                      />
                    </div>
                    <div className="form-group">
                    <button
                        className="btn btn-info f-w-500" 
                        type="button"
                        onClick={() => setIsProfileViewActive(false)}
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

export default ProfileView;
