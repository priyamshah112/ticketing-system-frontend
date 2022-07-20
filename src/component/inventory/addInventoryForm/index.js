import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inventoryListAction } from "../../../actions/inventoryAction";
import InputFeild from "../../forms/InputFeild";
import { getResponse } from "../../../api/apiResponse";
import { apipaths } from "../../../api/apiPaths";
import moment from "moment";
import { toast } from "react-toastify";
import Select from 'react-select'
import { dateFormatYYMMDD } from "../../../actions/commonAction"

function AddInventoryForm(props) {
  const dispatch = useDispatch();
  const {
    isOpen,
    inventoryId,
    editFormData = {},
    type,
    editForm,
  } = props;
  const { Option } = Select;
  const [formdata, setFormdata] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    userlist();
  }, []);

  useEffect(() => {
    if(type === 'hardware')
    {
      setFormdata({
        ...editFormData,
        warranty_expire_on: editFormData.warranty_expire_on !== undefined ? dateFormatYYMMDD(editFormData.warranty_expire_on) : '',
        assigned_on: editFormData.assigned_on !== undefined ? dateFormatYYMMDD(editFormData.assigned_on) : '',
      });
    }
    else
    {
      setFormdata({
        ...editFormData,
        expiry_date: editFormData.expiry_date !== undefined ? dateFormatYYMMDD(editFormData.expiry_date) : '',
      });
    }

    if(editFormData.user !== undefined && editFormData.user !== null)
    {
      setSelectedOption({
        value: editFormData.user.id,
        label: editFormData.user.name
      });
    }
  }, [editFormData]);

  const userlist = async () => {
    const { data } = await getResponse(apipaths.usergetlist);
    let userOptions = [];
    data.data?.user.map((user) => (
      userOptions.push({
        value: user.user_details?.id,
        label: user.user_details?.firstName
      })
      
    ))
    setUsers(userOptions);

  };

  const submitHandlerSoftware = async (formdata) => {
    let data = formdata;
    data.assigned_to = selectedOption?.value
    const { name } = data;
    if (!name || !selectedOption?.value) {
      return toast.warn("All * fields are mandatory.");
    }

    if (inventoryId) {
      data.operation = "update";
      data.assigned_on = editFormData.assigned_on;
      data.id = inventoryId;
    } else data.operation = "add";

    let resp = await getResponse(apipaths.addInventorySoftware, data);

    if (resp.status === 200) {
      toast.success(resp.data.message);
      setSelectedOption([]);
      setFormdata({});
      dispatch(inventoryListAction(type));
      isOpen(false);
    } else {
      toast.error(resp.error.message);
    }

  };

  const locations = ['USA','Costa Rica','India' ]

  const submitHandlerHardware = async (formdata) => {
    let data = formdata;
    data.type = "Hardware";

    const {
      // brand,
      asset_name,
      unit_price,
      // device_number,
      service_tag,
      model,
      express_service_code,
      // device_name,
      //assigned_to,
      location,
      description,
      warranty_expire_on,
    } = data;

    data.assigned_to = selectedOption?.value

    if (
      !asset_name ||
      !unit_price ||
      !service_tag ||
      !model ||
      !express_service_code ||
      !selectedOption?.value ||
      !warranty_expire_on ||
      !location ||
      !description
    ) {
      toast.warn("All * feilds are mandatory.");
    } else {
      if (inventoryId) {
        data.operation = "update";
        data.id = inventoryId;
      } else data.operation = "add";

      let resp = await getResponse(apipaths.addInventoryHardware, data);

      if (resp.status === 200) {
        toast.success(resp.data.message);
        setFormdata({});
        dispatch(inventoryListAction(type));
        isOpen(false);
      } else {
        toast.error(resp.error.message);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (type == "software") {
            submitHandlerSoftware(formdata);
          }
          else {
            submitHandlerHardware(formdata);
          }
        }}
      >
        {type == "hardware" ? (
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Asset Name"
                mandatory={true}
                value={formdata.asset_name ? formdata.asset_name : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, asset_name: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Unit Price ( USD )"
                type="number"
                mandatory={true}
                value={formdata.unit_price ? formdata.unit_price : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, unit_price: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Model/version"
                mandatory={true}
                value={formdata.model ? formdata.model : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, model: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Service Tag/ Serial Number"
                mandatory={true}
                value={formdata.service_tag ? formdata.service_tag : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, service_tag: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Express Service Code"
                mandatory={true}
                value={formdata.express_service_code ? formdata.express_service_code : ''}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    express_service_code: e.target.value,
                  })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Warranty Expiry Date<span className="text-danger"> * </span></label>
              <input
                type="date"
                mandatory={true}
                value={formdata.warranty_expire_on ? formdata.warranty_expire_on : ''}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    warranty_expire_on: e.target.value,
                  })
                }
                className="form-control"
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
                <label>Assigned To<span className="text-danger"> * </span></label>
                <Select 
                  name="assigned_to"
                  options={users}
                  className="w-100"
                  onChange={(value) => {
                    setSelectedOption(value);
                  }}
                  value={selectedOption}
                  isDisabled={editForm ? true : false}
                  required
                />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Assigned On<span className="text-danger"> * </span></label>
              <input
                type="date"
                className="form-control"
                disabled={editForm ? "disabled" : ""}
                value={formdata.assigned_on ? formdata.assigned_on : ''}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    assigned_on: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Location<span className="text-danger"> * </span></label>

              <select
                className="form-control"
                onChange={(e) => {
                  setFormdata({ ...formdata, location: e.target.value });
                }
                }
                value={formdata.location ? formdata.location : ''}
                disabled={editForm ? "disabled" : ""}
              >
                <option value={''}>Select Country</option>
                  {locations &&
                    locations.map((location) => (
                      <option value={location}>
                        {location}
                      </option>
                    ))}
              </select>
            </div>

            <div className="col-12 mt-3">
              <label>Description<span className="text-danger"> * </span></label>
              <textarea
                value={formdata.description ? formdata.description : ''}
                rows="4"
                className="form-control"
                onChange={(e) =>
                  setFormdata({ ...formdata, description: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className=" col-12 mt-3 pull-right text-right ">
              {editForm == 0 ? (
                <button className="btn submit-btn">
                  {inventoryId ? "Update" : "Add"}
                </button>
              ) : (
                ""
              )}
              {/* <button
                type="button"
                className="btn btn-danger ml-3"
                onClick={() => {isOpen(false)}}
                // setFormdata({});
              >
                Close
              </button> */}
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Name<span className="text-danger"> * </span></label>
              <InputFeild
                value={formdata.name ? formdata.name : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, name: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Version</label>
              <InputFeild
                value={formdata.version ? formdata.version : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, version: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Key </label>
              <InputFeild
                value={formdata.key ? formdata.key : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, key: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">

              <label>Assign To<span className="text-danger"> * </span></label>
              <Select options={users}
                className="w-100"
                name="assigned_to"
                onChange={(value) => {
                  setSelectedOption(value);
                }}
                value={selectedOption}
                isDisabled={editForm ? true : false}
                required
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Expiry Date</label>
              <input
                type="date"
                mandatory={true}
                value={formdata.expiry_date ? formdata.expiry_date : ''}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    expiry_date: e.target.value,
                  })
                }
                className="form-control"
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Notes </label>
              <textarea
                label="Serial Number"
                value={formdata.notes ? formdata.notes : ''}
                className="form-control"
                onChange={(e) =>
                  setFormdata({ ...formdata, notes: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>
            <div className="col-12 mt-3 pull-right text-right">
              {editForm == 0 ? (
                <button className="btn submit-btn">
                  {inventoryId ? "Update" : "Add"}
                </button>
              ) : (
                ""
              )}

              <button
                type="button"
                className="btn btn-danger ml-3"
                onClick={() => { isOpen(false) }}
              // setFormdata({});
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default AddInventoryForm;
