import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inventoryListAction } from "../../../actions/inventoryAction";
import { DatePicker, Select } from "antd";
import InputFeild from "../../forms/InputFeild";
import { getResponse } from "../../../api/apiResponse";
import { apipaths } from "../../../api/apiPaths";
import moment from "moment";
import { toast } from "react-toastify";

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

  useEffect(() => {
    userlist();
  }, []);

  const userlist = async () => {
    const { data } = await getResponse(apipaths.usergetlist);
    setUsers(data.data?.user);
  };

  useEffect(() => {
    setFormdata(editFormData);
    console.log(editFormData);
  }, [editFormData]);

  const submitHandlerSoftware = async (formdata) => {
    let data = formdata;
    const { name, key, assigned_to, version, notes } = data;
    if (!name || !key || !assigned_to || !version || !notes) {
      return toast.warn("All * fields are mandatory.");
    }

    if (inventoryId) {
      data.operation = "update";
      data.assigned_on = editFormData.assigned_on;
      data.id = inventoryId;
    } else data.operation = "add";

    let resp =  await getResponse(apipaths.addInventorySoftware, data);

    if (resp.status === 200) {
      toast.success(resp.data.message);
      setFormdata({});
      dispatch(inventoryListAction(type));
      isOpen(false);
    } else {
      toast.error(resp.error.message);
    }
    
  };

  const submitHandlerHardware = async (formdata) => {
    let data = formdata;

    const {
      // brand,
      asset_name,
      unit_price,
      // device_number,
      service_tag,
      model,
      express_service_code,
      serial_number,
      assigned_to,
      Test,
      // device_name,
      // assigned_to,
      location,
      description,
      warranty_expire_on,
    } = data;
    if (
      !asset_name ||
      !unit_price ||
      !service_tag ||
      !model ||
      !express_service_code ||
      !assigned_to ||
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
          if(type == "software")
          {
            submitHandlerSoftware(formdata);
          }
          else
          {
            submitHandlerHardware(formdata);
          }
        }}
      >
        {type !== "software" ? (
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
                label="Unit Price"
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
                className="w-100"
                value={formdata.assigned_to ? formdata.assigned_to : ''}
                showSearch
                placeholder="Select a device"
                optionFilterProp="children"
                disabled={editForm ? "disabled" : ""}
                onChange={(value) =>
                  setFormdata({ ...formdata, assigned_to: value })
                }
              >
                {users &&
                  users.map((data, i) => (
                    <>
                      <Option value={data.id} key={i}>
                        {data.name}
                      </Option>
                    </>
                  ))}
              </Select>
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
              <Select
                className="w-100"
                value={formdata.location ? formdata.location : ''}
                showSearch
                placeholder="Select a Location"
                optionFilterProp="children"
                onChange={(value) =>
                  setFormdata({ ...formdata, location: value })
                }
                // onSearch={(value) => setFormdata({ ...formdata, location: value })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                disabled={editForm ? "disabled" : ""}
              >
                <Option value={"USA"}>{"USA"}</Option>
                <Option value={"Costa Rica"}>{"Costa Rica"}</Option>
                <Option value={"India"}>{"India"}</Option>
              </Select>
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
                <button className="btn btn-success">
                  {inventoryId ? "Update" : "Add"}
                </button>
              ) : (
                ""
              )}
              <button
                type="button"
                className="btn btn-danger ml-3"
                onClick={() => {setFormdata({});isOpen(false)}}
              >
                Close
              </button>
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
              <label>Version<span className="text-danger"> * </span></label>
              <InputFeild
                value={formdata.version ? formdata.version : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, version: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Key<span className="text-danger"> * </span></label>
              <InputFeild
                value={formdata.key ? formdata.key : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, key: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Users<span className="text-danger"> * </span></label>
              <select
                className="form-control"
                value={formdata.assigned_to ? formdata.assigned_to : ''}
                onChange={(e) =>
                  setFormdata({ ...formdata, assigned_to: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              >
                <option value={""}>Select User</option>
                {users &&
                  users.map((user) => (
                    <option value={user.id}>
                      {user.user_details?.firstName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Expiry Date<span className="text-danger"> * </span></label>

              <DatePicker
                format={"DD/MM/YYYY"}
                value={formdata.expiry_date ? moment(formdata.expiry_date, 'DD/MM/YYYY') : ''}
                className="form-control"
                onChange={(date, string) =>
                  setFormdata({ ...formdata, expiry_date: string })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Notes<span className="text-danger"> * </span></label>
              <textarea
                label="Serial Number"
                value={formdata.notes ? formdata.notes : '' }
                className="form-control"
                onChange={(e) =>
                  setFormdata({ ...formdata, notes: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>
            <div className="col-12 mt-3 pull-right text-right">
              {editForm == 0 ? (
                <button className="btn btn-success">
                  {inventoryId ? "Update" : "Add"}
                </button>
              ) : (
                ""
              )}

              <button
                type="button"
                className="btn btn-danger ml-3"
                onClick={() => {setFormdata({});isOpen(false)}}
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
