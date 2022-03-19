import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apipaths } from "../../../api/apiPaths";
import { getResponse } from "../../../api/apiResponse";
import InputFeild from "../../forms/InputFeild";
const queryString = require("query-string");

function UserModal(props) {
  const [newUser, setNewUser] = useState({});
  const [personal, setPersonal] = useState();
  const [job, setJob] = useState();
  const [itInfo, setItInfo] = useState();
  const parsed = queryString.parse(window.location.search);

  const { isOpen = true, onCancel, onSubmit } = props;

  console.log("personal",personal)

  const submitHandler = async (e) => {
    e.preventDefault();

    if(personal.password !== personal.confirmPassword){
      return toast.error("Password and Confirm Password do not match.")
    }

    let data = {
      ...job,
      ...itInfo,
      ...personal,
      ...newUser,
    };

    data["email"] = parsed.email;
    data["userType"] = "user";

    await getResponse(apipaths.adduser, data, parsed.token);
    props.history.push("/");
  };

  return (
    <div className={`bg-light`}>
      <div className="container card mt-5">
        <div className="card-header">
          <div className="text-center mb-3 pt-4 pb-3 flex justify-content-around">
            <img
              src={`/static/media/logo1.e4a34f9d01afff7c5288.png`}
              width={"200"}
            />
            <img
              src={`/static/media/logo2.0c15fe8b451d5f6f6935.png`}
              width={"200"}
            />
            <img
              src={`/static/media/logo3.d42406bca606314f60f5.png`}
              width={"200"}
            />
          </div>
          <h2 className="text-black text-center mt-5">IT Request Form</h2>
        </div>
        <div className="card-body">
          <form action="#" onSubmit={submitHandler}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-6">
                <div>
                  <label>Date of Hire</label>
                  <input
                    onChange={(e) =>
                      setNewUser({ ...newUser, hireDate: e.target.value })
                    }
                    type="date"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-6">
                <div>
                  <label>Start Date</label>
                  <input
                    type="date"
                    onChange={(e) =>
                      setNewUser({ ...newUser, startDate: e.target.value })
                    }
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <label className="form-label d-block mb-1">Hired As</label>
                <div className="selectgroup selectgroup-pills">
                  <label className="selectgroup-item">
                    <InputFeild
                      type="radio"
                      onChange={(e) =>
                        setNewUser({ ...newUser, hiredAs: e.target.value })
                      }
                      name="hired-as"
                      value="1099"
                      className="selectgroup-input"
                    />
                    <span className="selectgroup-button">1099</span>
                  </label>
                  <label className="selectgroup-item">
                    <InputFeild
                      type="radio"
                      onChange={(e) =>
                        setNewUser({ ...newUser, hiredAs: e.target.value })
                      }
                      name="hired-as"
                      value="W-2"
                      className="selectgroup-input"
                    />
                    <span className="selectgroup-button">W-2</span>
                  </label>
                  <label className="selectgroup-item">
                    <InputFeild
                      type="radio"
                      onChange={(e) =>
                        setNewUser({ ...newUser, hiredAs: e.target.value })
                      }
                      name="hired-as"
                      value="B2B"
                      className="selectgroup-input"
                    />
                    <span className="selectgroup-button">B2B</span>
                  </label>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Password"
                  onChange={(e) =>
                    setPersonal({ ...personal, password: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Confirm Password"
                  onChange={(e) =>
                    setPersonal({
                      ...personal,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Business Name"
                  onChange={(e) =>
                    setNewUser({ ...newUser, businessName: e.target.value })
                  }
                  name="hired-as"
                />
              </div>
            </div>

            <h3 className="mb-3 mt-5">Personal Information</h3>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="First Name"
                  onChange={(e) =>
                    setPersonal({ ...personal, firstName: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Middle Initial"
                  onChange={(e) =>
                    setPersonal({ ...personal, middleName: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Last Name"
                  onChange={(e) =>
                    setPersonal({ ...personal, lastName: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Preferred Name"
                  onChange={(e) =>
                    setPersonal({ ...personal, preferredName: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                {/* <InputFeild
                  label="Location"
                  onChange={(e) =>
                    setPersonal({
                      ...personal,
                      permanantAddress: e.target.value,
                    })
                  }
                /> */}
                  <label>Location</label>
                                <Select
                                    className="w-100"
                                    showSearch
                                    placeholder="Select a Location"
                                    optionFilterProp="children"
                                    onChange={(value) => setPersonal({ ...personal, permanantAddress: value })}                                  
                        
                                >
                                    {/* {
                                        inventoryList.locations && inventoryList.locations.map((data, i) => (
                                            <Option value={data} key={i}>{data}</Option>
                                        ))
                                    } */}

                                    <Option value={"USA"}>{"USA"}</Option>
                                    <Option value={"Costa Rica"}>{"Costa Rica"}</Option>
                                    <Option value={"India"}>{"India"}</Option>
                                </Select>
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Home Phone"
                  onChange={(e) =>
                    setPersonal({ ...personal, homePhone: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Cell Phone"
                  onChange={(e) =>
                    setPersonal({ ...personal, cellPhone: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Personal Email"
                  disabled
                  value={parsed.email}
                />
              </div>
            </div>

            <h3 className="mb-3 mt-5">Job Information</h3>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Job Title"
                  onChange={(e) => setJob({ ...job, title: e.target.value })}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Project Name"
                  onChange={(e) =>
                    setJob({ ...job, projectName: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Client Name"
                  onChange={(e) =>
                    setJob({ ...job, clientName: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Client Location (i.e., Stevensville, Lehigh Valley, etc)"
                  onChange={(e) =>
                    setJob({ ...job, clientLocation: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Work Location (Remote, Onsite, etc.)"
                  onChange={(e) =>
                    setJob({ ...job, workLocation: e.target.value })
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-6 mt-3">
                <InputFeild
                  label="Supervisor Name"
                  onChange={(e) =>
                    setJob({ ...job, supervisorName: e.target.value })
                  }
                />
              </div>
            </div>

            <h3 className="mt-5 mb-3">IT Information</h3>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-3">
                    <label>
                      <b>SPECIAL REQUESTS</b> <br />
                      <small>
                        Software (i.e. Microsoft Project, Visio, etc.): <br />
                        Network (i.e. SharePoint, Box, etc.): <br />
                        System Access (Jobscience, Salesforce, etc.):
                      </small>
                    </label>
                  </div>
                  <div className="col-lg-9 col-md-9 col-9">
                    <textarea
                      className="form-control"
                      id="comment"
                      rows="5"
                      onChange={(e) =>
                        setItInfo({ ...itInfo, request: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-12 mt-4">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-3">
                    <label className="d-block mb-3">
                      ECI Providing Laptop?
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-3 col-3">
                    <div className="">
                      <label className="selectgroup-item mr-3">
                        {/* <input type="radio" name="providelaptop" onChange={(e) => setItInfo({ ...itInfo, providingLaptop: e.target.value })} value="no" className="selectgroup-input" /> */}

                        <InputFeild
                          type="radio"
                          onChange={(e) =>
                            setItInfo({
                              ...itInfo,
                              providingLaptop: e.target.value,
                            })
                          }
                          name="providelaptop"
                          value="Yes"
                          className="selectgroup-input"
                        />
                        <span className="selectgroup-button">Yes</span>
                      </label>
                      <label className="selectgroup-item mr-3">
                        {/* <input type="radio" name="providelaptop" onChange={(e) => setItInfo({ ...itInfo, providingLaptop: e.target.value })} value="yes" className="selectgroup-input" /> */}
                        <InputFeild
                          type="radio"
                          onChange={(e) =>
                            setItInfo({
                              ...itInfo,
                              providingLaptop: e.target.value,
                            })
                          }
                          name="providelaptop"
                          value="No"
                          className="selectgroup-input"
                        />
                        <span className="selectgroup-button">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success mr-3">
                Submit
              </button>
              <button type="button" className="btn btn-danger" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserModal;