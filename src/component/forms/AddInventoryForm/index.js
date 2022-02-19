import React from "react";
import { DatePicker, Select } from "antd";
import { useEffect, useState } from "react/cjs/react.development";
import { useSelector } from "react-redux";
import InputFeild from "../InputFeild";
import { getResponse } from "../../../api/apiResponse";
import { apipaths } from "../../../api/apiPaths";
import moment from "moment";

function AddInventoryForm(props) {
  const {
    isOpen,
    inventoryId,
    submitHandler,
    editFormData = {},
    id,
    userList,
    editForm,
  } = props;
  const { Option } = Select;
  const inventoryList = useSelector((state) => state.inventoryList);
  const [devicesList, setDevicesList] = useState(inventoryList.devices);
  const [formdata, setFormdata] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userlist();
  }, []);

  const userlist = async () => {
    const { data } = await getResponse(apipaths.usergetlist);
    list(data.data);
  };

  const list = (data) => {
    setUsers(data.user);
  };

  useEffect(() => {
    setFormdata(editFormData);
  }, [editFormData]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler(formdata);
        }}
      >
        {id !== "software" ? (
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Asset ID"
                value={formdata.assetID}
                onChange={(e) =>
                  setFormdata({ ...formdata, assetID: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Asset Name"
                value={formdata.assetName}
                onChange={(e) =>
                  setFormdata({ ...formdata, assetName: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Brand Name</label>
              <Select
                className="w-100"
                showSearch
                placeholder="Select a brand"
                optionFilterProp="children"
                onChange={(value) => setFormdata({ ...formdata, brand: value })}
                // onSearch={(value) => setFormdata({ ...formdata, brand: value })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                disabled={editForm ? "disabled" : ""}
              >
                {inventoryList.brands &&
                  inventoryList.brands.map((data, i) => {
                    if (!data) return null;
                    return (
                      <Option value={data} key={i}>
                        {data}
                      </Option>
                    );
                  })}
              </Select>
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Custom ID"
                value={formdata.customID}
                onChange={(e) =>
                  setFormdata({ ...formdata, customID: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Unit Price"
                value={formdata.unitPrice}
                onChange={(e) =>
                  setFormdata({ ...formdata, unitPrice: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Device Number"
                value={formdata.device_number}
                onChange={(e) =>
                  setFormdata({ ...formdata, device_number: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Model/version"
                value={formdata.model}
                onChange={(e) =>
                  setFormdata({ ...formdata, model: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Service Tag/ Serial Number"
                value={formdata.service_tag}
                onChange={(e) =>
                  setFormdata({ ...formdata, service_tag: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <InputFeild
                label="Express Service Code"
                value={formdata.express_service_code}
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
              <InputFeild
                label="Warranty Expiry Date"
                value={formdata.serial_number}
                onChange={(e) =>
                  setFormdata({ ...formdata, serial_number: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Assigned To</label>
              <Select
                className="w-100"
                showSearch
                placeholder="Select a device"
                optionFilterProp="children"
                disabled={editForm ? "disabled" : ""}
                onChange={(value) =>
                  setFormdata({ ...formdata, assignedTo: value })
                }
              >
                {users &&
                  users.map((data, i) => (
                    <>
                      <Option value={data.name} key={i}>
                        {data.name}
                      </Option>
                    </>
                  ))}
              </Select>
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Assigned On</label>
              <input
                type="date"
                className="form-control"
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Device Name</label>
              <Select
                className="w-100"
                showSearch
                placeholder="Select a device"
                optionFilterProp="children"
                onChange={(value) =>
                  setFormdata({ ...formdata, device_name: value })
                }
                onSearch={(value) => {
                  if (!value) return null;
                  let list = devicesList;
                  list[list.length - 1] = value;
                  setDevicesList(list);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                disabled={editForm ? "disabled" : ""}
              >
                {devicesList &&
                  devicesList.map((data, i) => {
                    if (!data) return null;
                    return (
                      <Option value={data} key={i}>
                        {data}
                      </Option>
                    );
                  })}
              </Select>
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Users</label>
              <select
                className="form-control"
                onChange={(e) =>
                  setFormdata({ ...formdata, assigned_to: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              >
                <option value={""}>Select User</option>

                {inventoryList.users &&
                  inventoryList.users.map(
                    (user) =>
                      formdata.assigned_to === user.id && (
                        <option selected value={user.id} key={user.id}>
                          selected: {user.name}
                        </option>
                      )
                  )}

                {inventoryList.users &&
                  inventoryList.users.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Location</label>
              <Select
                className="w-100"
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

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Description</label>
              <textarea
                value={formdata.description}
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
                className="btn btn-danger ml-3"
                onClick={() => isOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Name</label>
              <InputFeild
                value={formdata.customID}
                value={formdata.name}
                onChange={(e) =>
                  setFormdata({ ...formdata, name: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Version</label>
              <InputFeild
                value={formdata.customID}
                value={formdata.version}
                onChange={(e) =>
                  setFormdata({ ...formdata, version: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Key</label>
              <InputFeild
                value={formdata.key}
                onChange={(e) =>
                  setFormdata({ ...formdata, key: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Users</label>
              <select
                className="form-control"
                onChange={(e) =>
                  setFormdata({ ...formdata, assigned_to: e.target.value })
                }
                disabled={editForm ? "disabled" : ""}
              >
                <option value={""}>Select User</option>

                {/* {
                                        inventoryList.users && inventoryList.users.map((user) => (
                                            formdata.assigned_to === user.id && (
                                                <option selected value={user.id} key={user.id}>selected: {user.name}</option>
                                            )
                                        ))
                                    }

                                    {
                                        inventoryList.users && inventoryList.users.map((user) => (
                                            <option value={user.id} key={user.id}>{user.name}</option>
                                        ))
                                    } */}
                {userList &&
                  userList.map((user) => (
                    <option value={user.id}>
                      {user.user_details.firstName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <label>Expiry Date</label>
              {/* <input
                                    type="date"
                                    className="form-control"
                                    value={formdata.expiry_date}
                                    onChange={(e) => setFormdata({ ...formdata, expiry_date: e.target.value })} disabled={(editForm) ? "disabled" : ""} /> */}

              <DatePicker
                // defaultValue={moment('22/04/2000', "MM/DD/YYYY")}
                format={"MM/DD/YYYY"}
                className="form-control"
                onChange={(date, string) =>
                  setFormdata({ ...formdata, expiry_date: string })
                }
                disabled={editForm ? "disabled" : ""}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-12 mt-3">
              <lable>Notes</lable>
              <textarea
                label="Serial Number"
                value={formdata.notes}
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
                className="btn btn-danger ml-3"
                onClick={() => isOpen(false)}
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
