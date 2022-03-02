import React, { useEffect, useState } from "react";
import { Modal } from 'antd';
import InputFeild from "../component/forms/InputFeild";
import { useSelector } from "react-redux";

function ProfileView(props) {

  const { isProfileViewActive, setIsProfileViewActive } = props;
  const userDetails = useSelector((state) => state.userDetails.user_details);

  return (
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
    </form>
  );
}

export default ProfileView;
