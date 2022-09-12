import React, { useEffect, useState } from "react";
import InputFeild from "../../forms/InputFeild";
import $ from "jquery";
import { DatePicker } from "antd";
import moment from "moment";

function AddUser(props) {
  const { onCancel, onSubmit } = props;
  const [formdata, setFormdata] = useState(null);
  const { userInfo, operation } = props;

  useEffect(() => {
    if (operation === "view") {
      $("form input[type='text']").attr("disabled", true);
      $("form input[type='email']").attr("disabled", true);
      $("form input[type='radio']").attr("disabled", true);
      $("form input[type='date']").attr("disabled", true);
      $("form select").attr("disabled", true);
      let data = { ...userInfo, ...userInfo.user_details };
      assignDataToForm(data);
    } else if (operation === "update") {
      let data = { ...userInfo, ...userInfo.user_details };
      assignDataToForm(data);
    }
  }, [operation, userInfo]);

  const assignDataToForm = (userInfo) => {
    setFormdata(userInfo);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formdata, setFormdata);
      }}
    >
      <div className="row">
        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <InputFeild
            label="First Name"
            mandatory={true}
            value={formdata !== null ? formdata.firstName : ""}
            onChange={(e) =>
              setFormdata({ ...formdata, firstName: e.target.value })
            }
          />
        </div>
        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <InputFeild
            label="Middle Name"
            value={formdata !== null ? formdata.middleName : ""}
            onChange={(e) =>
              setFormdata({ ...formdata, middleName: e.target.value })
            }
          />
        </div>
        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <InputFeild
            label="Last Name"
            mandatory={true}
            value={formdata !== null ? formdata.lastName : ""}
            onChange={(e) =>
              setFormdata({ ...formdata, lastName: e.target.value })
            }
          />
        </div>
        <div className="col-lg-6 col-md-6 col-6 mt-3">
          {/* <div className="form-group"> */}
          <label>
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            value={formdata !== null ? formdata.email : ""}
            onChange={(e) =>
              setFormdata({ ...formdata, email: e.target.value })
            }
            className="form-control"
          />
          {/* </div> */}
        </div>

        <div className="col-lg-6 col-md-6 col-6 mt-3">
          {/* <div className="form-group"> */}
          <label>User Type <span className="text-danger">*</span></label>
          <select
            className="form-control"
            onChange={(e) =>
              setFormdata({ ...formdata, userType: e.target.value })
            }
          >
            {formdata?.userType && (
              <option selected value={formdata?.userType}>
                {formdata?.userType}
              </option>
            )}
            <option value={""}>Choose User Type</option>
            <option value={"user"}>User</option>
            <option value={"admin"}>Admin</option>
            <option value={"support"}>Support</option>
          </select>
          {/* </div> */}
        </div>

        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <div>
            <label>Date of Hire <span className="text-danger">*</span></label>
            <div>
              <DatePicker
                format={"MM/DD/YYYY"}
                defaultValue={
                  operation === "update" &&
                  userInfo.user_details.hireDate &&
                  moment(userInfo.user_details.hireDate, "MM/DD/YYYY")
                }
                onChange={(date, string) =>
                  setFormdata({ ...formdata, hireDate: string })
                }
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <div>
            <label>Start Date <span className="text-danger">*</span></label>

            <DatePicker
              className="form-control"
              format={"MM/DD/YYYY"}
              defaultValue={
                operation === "update" &&
                moment(userInfo.user_details.startDate, "MM/DD/YYYY")
              }
              onChange={(date, string) =>
                setFormdata({ ...formdata, startDate: string })
              }
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <label className="form-label d-block mb-1">Hired As <span className="text-danger">*</span></label>
          <div className="selectgroup selectgroup-pills">
            <label className="selectgroup-item">
              <InputFeild
                type="radio"
                onChange={(e) =>
                  setFormdata({ ...formdata, hiredAs: e.target.value })
                }
                name="hired-as"
                value="1099"
                className="selectgroup-input"
                selected
              />
              <span className="selectgroup-button">1099</span>
            </label>
            <label className="selectgroup-item">
              <InputFeild
                type="radio"
                onChange={(e) =>
                  setFormdata({ ...formdata, hiredAs: e.target.value })
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
                  setFormdata({ ...formdata, hiredAs: e.target.value })
                }
                name="hired-as"
                value="B2B"
                className="selectgroup-input"
              />
              <span className="selectgroup-button">B2B</span>
            </label>
          </div>
        </div>

        {/* <div className="col-lg-6 col-md-6 col-6 mt-3">
                    <InputFeild
                        label="Business Name"
                        onChange={(e) =>
                            setFormdata({ ...formdata, businessName: e.target.value })
                        }
                        name="hired-as"
                    />
                </div> */}

        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <InputFeild
            label="Preferred Name"
            value={formdata !== null ? formdata?.preferredName : ""}
            onChange={(e) =>
              setFormdata({ ...formdata, preferredName: e.target.value })
            }
          />
        </div>
        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <label>Location <span className="text-danger">*</span></label>
          <select
            onChange={(e) =>
              setFormdata({ ...formdata, permanantAddress: e.target.value })
            }
            className="form-control"
          >
            {operation === "update" && formdata?.permanantAddress && (
              <option selected>
                {formdata?.user_details.permanantAddress}
              </option>
            )}
            <option value={""}>Select Location</option>
            <option value={"USA"}>USA</option>
            <option value={"Costa Rica"}>Costa Rica</option>
            <option value={"India"}>India</option>
          </select>
        </div>
        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <InputFeild
            label="Cell Phone"
            value={formdata !== null ? formdata.cellPhone : ""}
            onChange={(e) =>
              setFormdata({ ...formdata, cellPhone: e.target.value })
            }
          />
        </div>
        <div className="col-lg-6 col-md-6 col-6 mt-3">
          <InputFeild
            label="Home Phone"
            value={formdata !== null ? formdata.homePhone : ""}
            onChange={(e) =>
              setFormdata({ ...formdata, homePhone: e.target.value })
            }
          />
        </div>


        <div className="col-12 px-4 mt-3 text-right">
          {operation !== "view" && (
            <input type="submit" className="btn submit-btn" />
          )}
          <input
            type="button"
            className="btn btn-danger ml-3"
            onClick={() => {
              setFormdata(null);
              onCancel();
            }}
            value={"Close"}
          />
        </div>
      </div>
    </form>
  );
}

export default AddUser;
