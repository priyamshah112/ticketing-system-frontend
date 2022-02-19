import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import UserModal from "../../modal/userModal";
import InputFeild from "../InputFeild";
import $ from "jquery"
import { DatePicker, Select } from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment";
import { dateFormatHandler } from "../../../actions/commonAction";

function AddUser(props) {

    const { onCancel, isOpen, onSubmit } = props;
    const [formdata, setFormdata] = useState({});
    const { userInfo, operation } = props;

    useEffect(() => {
        if (operation === "view") {
            $("form input[type='text']").attr("disabled", true)
            $("form input[type='email']").attr("disabled", true)
            $("form input[type='radio']").attr("disabled", true)
            $("form input[type='date']").attr("disabled", true)
            $("form select").attr("disabled", true)
            let data = { ...userInfo, ...userInfo.user_details }
            assignDataToForm(data);
        } else if (operation === "update") {
            let data = { ...userInfo, ...userInfo.user_details }
            assignDataToForm(data);
        }
    }, [operation])

    const assignDataToForm = (userInfo) => {
        setFormdata(userInfo)
        console.log(userInfo)
    }

    return (
        <div className={`custom-modal ${isOpen ? "open" : ""}`}>
            <div className="custom-modal-content col-md-6" >
                <h2>{operation === "view" ? "View " : operation === "update" ? "Edit " : "Create "} User</h2>
                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formdata, setFormdata) }}>
                    <div className="row">
                        {/* <div className="col-lg-6 col-md-6 col-12">
                            <div className="form-group">
                                <label>Name<span className="text-danger">*</span></label>
                                <input type="text" value={formdata.name} onChange={(e) => setFormdata({ ...formdata, name: e.target.value })} className="form-control" />
                            </div>
                        </div> */}
                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            <InputFeild
                                label={<p>First Name <span className="text-danger">*</span></p>}
                                value={formdata.firstName}
                                onChange={(e) =>
                                    setFormdata({ ...formdata, firstName: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            <InputFeild
                                label="Middle Initial"
                                value={formdata.middleName}
                                onChange={(e) =>
                                    setFormdata({ ...formdata, middleName: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            <InputFeild
                                label="Last Name"
                                value={formdata.lastName}
                                onChange={(e) =>
                                    setFormdata({ ...formdata, lastName: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            {/* <div className="form-group"> */}
                            <label>Email<span className="text-danger">*</span></label>
                            <input type="email" value={formdata.email} onChange={(e) => setFormdata({ ...formdata, email: e.target.value })} className="form-control" />
                            {/* </div> */}
                        </div>


                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            {/* <div className="form-group"> */}
                            <label>User Type</label>
                            <select className="form-control" onChange={(e) => setFormdata({ ...formdata, userType: e.target.value })}>
                                {formdata.userType && (<option selected value={formdata.userType}>{formdata.userType}</option>)}
                                <option value={""}>Choose User Type</option>
                                <option value={"user"}>User</option>
                                <option value={"admin"}>Admin</option>
                                <option value={"support"}>Co-Admin</option>
                            </select>
                            {/* </div> */}

                        </div>

                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            <div>
                                <label>Date of Hire</label>
                                {/* <input
                                    onChange={(e) =>
                                        setFormdata({ ...formdata, hireDate: e.target.value })
                                    }
                                    type="date"
                                    className="form-control"
                                /> */}
                                <div>
                                    <DatePicker
                                        format={"MM/DD/YYYY"}
                                        defaultValue={operation === "update" && userInfo.user_details.hireDate && moment(userInfo.user_details.hireDate, "MM/DD/YYYY")}
                                        onChange={(date, string) => setFormdata({ ...formdata, hireDate: string })}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            <div>
                                <label>Start Date</label>

                                <DatePicker
                                    className="form-control"
                                    format={"MM/DD/YYYY"}
                                    defaultValue={operation === "update" && moment(userInfo.user_details.startDate, "MM/DD/YYYY")}
                                    onChange={(date, string) => setFormdata({ ...formdata, startDate: string })}
                                />

                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            <label class="form-label d-block mb-1">Hired As</label>
                            <div class="selectgroup selectgroup-pills">
                                <label class="selectgroup-item">
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
                                    <span class="selectgroup-button">1099</span>
                                </label>
                                <label class="selectgroup-item">
                                    <InputFeild
                                        type="radio"
                                        onChange={(e) =>
                                            setFormdata({ ...formdata, hiredAs: e.target.value })
                                        }
                                        name="hired-as"
                                        value="W-2"
                                        className="selectgroup-input"
                                    />
                                    <span class="selectgroup-button">W-2</span>
                                </label>
                                <label class="selectgroup-item">
                                    <InputFeild
                                        type="radio"
                                        onChange={(e) =>
                                            setFormdata({ ...formdata, hiredAs: e.target.value })
                                        }
                                        name="hired-as"
                                        value="B2B"
                                        className="selectgroup-input"
                                    />
                                    <span class="selectgroup-button">B2B</span>
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
                                value={formdata.preferredName}
                                onChange={(e) =>
                                    setFormdata({ ...formdata, preferredName: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            {/* <InputFeild
                                label="Location"
                                value={formdata.permanantAddress}
                                onChange={(e) =>
                                    setFormdata({
                                        ...formdata,
                                        permanantAddress: e.target.value,
                                    })
                                }
                            /> */}
                            <label>Location</label>
                            <select
                                onChange={(e) => setFormdata({ ...formdata, permanantAddress: e.target.value })}
                                className="form-control"
                            >
                                {
                                    operation === "update" && formdata.permanantAddress && (
                                        <option selected>{formdata.user_details.permanantAddress}</option>
                                    )
                                }
                                <option value={""}>Select Location</option>
                                <option value={"USA"}>USA</option>
                                <option value={"Costa Rica"}>Costa Rica</option>
                                <option value={"India"}>India</option>
                            </select>
                        </div>
                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            <InputFeild
                                label="Home Phone"
                                value={formdata.homePhone}
                                onChange={(e) =>
                                    setFormdata({ ...formdata, homePhone: e.target.value })
                                }
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-6 mt-3">
                            <InputFeild
                                label="Cell Phone"
                                value={formdata.cellPhone}
                                onChange={(e) =>
                                    setFormdata({ ...formdata, cellPhone: e.target.value })
                                }
                            />
                        </div>


                        <div className="col-12 px-4 mt-3 text-right">
                            {
                                operation !== "view" && (
                                    <input type="submit" className="btn btn-success" />
                                )
                            }
                            <input type="button" className="btn btn-danger ml-3" onClick={onCancel} value={"Close"} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default AddUser;