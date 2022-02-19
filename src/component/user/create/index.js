import React from "react";
import { useState } from "react/cjs/react.development";
import Login from "../../login";
import UserModal from "../../modal/userModal";

function CreateUser(props) {
  

  return (
    <>
      <div className="pt-5 create-user-container">
        <div className="container p-3">
          <h1 className="text-white">Create User</h1>
          <UserModal history={props.history}/>
        </div>
      </div>
    </>
  );
}

export default CreateUser;