import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { inventoryListAction } from "../actions/inventoryAction";
import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";
import AddInventoryForm from "./forms/AddInventoryForm";
import Navbar from "./navbar";
import TableFeild from "./TableFeild";
import swal from "sweetalert";
import { Modal, Button, Select, DatePicker } from "antd";
import { toast } from "react-toastify";
import $ from "jquery";
import MaterialTable from "material-table";
import {
  assignInventoryToUser,
  unassignInventory,
} from "../actions/commonAction";
import { Tooltip } from "@material-ui/core";
import { getUserLists } from "../actions/userActions";

function SoftwareInventory() {
  const parameters = useParams();
  let assInvFormData = new FormData();

  const { RangePicker } = DatePicker;
  let id = "software";
  const inventoryList = useSelector((state) => state.inventoryList);
  const [inventories, setInventories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const [inventoryId, setInventoryId] = useState("");
  let columns = parameters.userid
    ? [
        {
          title: "Inventory ID",
          field: "id",
        },
        {
          title: "Name",
          field: "name",
        },
        {
          title: "Version",
          field: "version",
        },
        {
          title: "Notes",
          field: "notes",
        },
        {
          title: "Assigned To",
          field: "assigned_to_username",
        },
        {
          title: "Assigned On",
          field: "assigned_on",
        },
        {
          title: "Action",
          field: "action",
          sorting: false,
        },
      ]
    : [
        {
          title: "Inventory ID",
          field: "id",
        },
        {
          title: "Name",
          field: "name",
        },
        {
          title: "Version",
          field: "version",
        },
        {
          title: "Status",
          field: "status",
        },
        {
          title: "Notes",
          field: "notes",
        },
        {
          title: "Assigned To",
          field: "assigned_to_username",
        },
        {
          title: "Assigned On",
          field: "assigned_on",
        },
        {
          title: "Action",
          field: "action",
          sorting: false,
        },
      ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [softwareInfo, setSoftwareeInfo] = useState([]);
  const [inventoryFile, setInventoryFile] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const userList = useSelector((state) => state.userList);

  const [isAssignInventoryModal, setIsAssignInventoryModal] = useState(false);

  const [sampleImport, setSampleImport] = useState("");
  const assignInventoryModal = () => {
    setIsAssignInventoryModal(true);
  };

  const userListHandler = async () => {
    const { data } = await getResponse(apipaths.listusers, null);
    const users = data.data.user;
    dispatch(getUserLists(users));
  };

  const assignInventoryHandleOk = async () => {
    assInvFormData.append("user_id", parameters.userid);
    let { data } = await assignInventoryToUser(assInvFormData);
    toast.success(data.message);
    setIsAssignInventoryModal(false);
  };

  const assignInventoryHandleCancel = () => {
    setIsAssignInventoryModal(false);
  };

  const { Option } = Select;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // console.log(inventoryFile)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(inventoryListAction(id));
    userListHandler();
    $("#filter-inventory-wrapper").slideToggle(0);
  }, [id]);

  const editInventory = (inventory, viewOnly) => {
    setEditFormData(inventory);
    if (viewOnly == 0) setEditForm(true);
    else setEditForm(false);
    setInventoryId(inventory.id);

    // console.log(editForm)
    setModal(true);
  };

  const handleChange = () => {};

  useEffect(() => {
    inventoryListDataModifier(inventoryList[id]);
    setSampleImport(inventoryList.softwareSampleImport);
  }, [inventoryList]);

  useEffect(() => {
    if (isModalVisible) setError("");
  }, [isModalVisible]);

  useEffect(() => {
    if (inventories.length > 0) {
      setUsername(inventories[0].user ? inventories[0].user.name : "");
    }
  }, [inventories]);

  const unassignedInventoryHandler = async (inv) => {
    swal({
      title: "Are you sure?",
      text: `Press ok to Un-Assigned this inventory to ${username}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (val) => {
      if (val) {
        const { data } = await unassignInventory(inv, "software");
        if (data.status_code === 200) {
          toast.success(data.message);
          dispatch(inventoryListAction(id));
          userListHandler();
        } else {
          toast.error("error in un-assigning the inventory.");
        }
      }
    });
  };

  const inventoryListDataModifier = (data) => {
    if (parameters.userid) {
      data = data.filter(
        (d) => parseInt(d.assigned_to) === parseInt(parameters.userid)
      );
    }
    data.map((inv) => {
      inv.assigned_to_username = inv.user && inv.user.name && inv.user.name;
      let invStatus = "";
      // eslint-disable-next-line default-case
      switch (inv.status) {
        case "Available":
          invStatus = (
            <div className="status status-active">
              <span></span> Available
            </div>
          );
          break;
        case "In Use":
          invStatus = (
            <div className="status status-suspended">
              <span></span> Not Available
            </div>
          );
          break;
      }
      inv.status = invStatus;

      inv.assigned_to_username = inv.user && inv.user.name && inv.user.name;
      inv.action = (
        <div className="text-center d-flex justify-content-center">
          {!parameters.userid ? (
            <>
              <Tooltip title="View Software Inventory">
                <div>
                  <i
                    className="fa fa-file bg-success table-icon"
                    onClick={() => editInventory(inv, 0)}
                  ></i>
                </div>
              </Tooltip>
              <Tooltip title="Edit Software Inventory">
                <div>
                  <i
                    className="fa fa-pen bg-warning ml-2 table-icon"
                    onClick={() => editInventory(inv, 1)}
                  ></i>
                </div>
              </Tooltip>
              <Tooltip title="Delete Software Inventory">
                <div>
                  <i
                    className="fa fa-trash bg-danger ml-2  table-icon"
                    onClick={() => deleteInventory(inv)}
                  ></i>
                </div>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="UnAssign Software Inventory">
              <div>
                <i
                  className="fa fa-trash bg-danger ml-2  table-icon"
                  onClick={() => unassignedInventoryHandler(inv, "hardware")}
                ></i>
              </div>
            </Tooltip>
          )}
        </div>
      );
    });
    setInventories(data);
  };

  const filterSubmitHandler = async (e) => {
    e.preventDefault();
    let elem = $("#filter-inventory :input[value!='']")
      .filter(function (index, element) {
        return $(element).val() != "";
      })
      .serialize();
    let defaultPath = apipaths.softwareInventoryList;
    let path = apipaths.softwareInventoryList;
    path["url"] = path["url"].split("?")[0] + "?" + elem;
    let { data } = await getResponse(path);
    inventoryListDataModifier(data.data.inventory);
  };

  const deleteInventory = async (inv) => {
    if (id === "software") {
      swal({
        title: "Are you sure?",
        text: "Press ok to Delete this software inventory",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (val) => {
        if (val) {
          const { data } = await getResponse(apipaths.deleteInventorySoftware, {
            delete_id: inv.id,
          });
          const { success, message } = data;
          if (success === 1 || success === 0) {
            toast.success(<div className="text-capitalize">{message}</div>);
            dispatch(inventoryListAction(id));
          }
        }
      });
    }
  };

  const submitHandler = async (formdata) => {
    let data = formdata;
    const { name, key, assigned_to, version } = data;
    if (!name || !key || !assigned_to || !version) {
      return toast.warn("Name, Key, Assigned to, Version are required.");
    }

    // 2022-04-22
    // let dateformat = data.expiry_date;
    // dateformat =  dateformat.split("-");
    // dateformat = dateformat[1] + "/" + dateformat[2] + "/" + dateformat[0];
    // data.expiry_date = dateformat;
    if (inventoryId) {
      data.operation = "update";
      data.assigned_on = editFormData.assigned_on;
      data.id = inventoryId;
    } else data.operation = "add";

    if (id === "software")
      await getResponse(apipaths.addInventorySoftware, data);
    else await getResponse(apipaths.addInventoryHardware, data);
    dispatch(inventoryListAction(id));
    setModal(false);
  };

  const importTnventoryFileHandler = async () => {
    setError("Importing file please wait");
    const formdata = new FormData();
    formdata.append("file", inventoryFile);
    if (
      inventoryFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      inventoryFile.type === "application/vnd.ms-excel"
    ) {
      let { data, error } = await getResponse(
        apipaths.importInventory,
        formdata
      );

      if (error && error.status_code === 301) {
        setError(error.message);
        return window.open(error.data.filePath, "_blank");
      }

      if (data.success) toast.success(data.message);
      else toast.error(data.message);

      setIsModalVisible();
      userListHandler();
    } else {
      setError("File type not allowed.");
    }
  };

  const assignInventoryHandler = (inventoryId) => {
    assInvFormData.append("software_ids[]", inventoryId);
  };

  return (
    <>
      <div className="main-panel">
        <div className="content">
          <div className="row buttons-row mt-5">
            <div className="col-md-12">
              <div className="d-flex align-items-center justify-content-between">
                <h2 style={{ fontSize: "22px", fontWeight: "600" }}>
                  {id === "software" ? "Software" : "Hardware"} Inventory{" "}
                  {parameters.userid && username && "( " + username + " )"}
                </h2>
                <div className="d-flex">
                  {parameters.userid ? (
                    <button
                      className="btn btn-radius btn-info mr-3"
                      onClick={assignInventoryModal}
                    >
                      Assign Inventory
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => showModal()}
                        className="btn btn-radius btn-info mr-3"
                      >
                        Import Software
                      </button>
                      <button
                        onClick={() => {
                          window
                            .open(inventoryList.exportUrl, "_blank")
                            .focus();
                        }}
                        className="btn btn-radius btn-info mr-3"
                      >
                        Export Software
                      </button>
                      <button
                        className="btn btn-info btn-radius mr-3"
                        onClick={() =>
                          $("#filter-inventory-wrapper").slideToggle(300)
                        }
                      >
                        More Filters
                      </button>
                      <button
                        className="btn btn-outline-info btn-radius"
                        onClick={() => {
                          setModal(true);
                          setEditFormData({});
                          setInventoryId();
                          setEditForm(false);
                        }}
                      >
                        Add Software
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pt-2 border-radius-5">
            <div className="search-box" id="filter-inventory-wrapper">
              <div className="card">
                <div className="card-body">
                  <form
                    onSubmit={filterSubmitHandler}
                    id="filter-inventory"
                    className=""
                  >
                    <div className="row mx-auto pt-3">
                      <div className="col-md-12">
                        <h4 className="fw-bold">Search software Inventory</h4>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Name</label>
                          </div>
                          <input
                            name="name"
                            type="text"
                            className="form-control filter-input"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Version</label>
                          </div>
                          <input
                            name="version"
                            type="text"
                            className="form-control filter-input"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Assigned To</label>
                          </div>
                          <select className="form-control" name="assignedTo">
                            <option value={""}>Select Assigned To</option>
                            {userList &&
                              userList.map((user) => (
                                <option value={user.id}>{user.user_details.firstName}</option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Status</label>
                          </div>
                          <select className="form-control" name="status">
                            <option value={""}>Select Status</option>
                            <option value={"In Use"}>In Use</option>
                            <option value={"Available"}>Available</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Assigned On</label>
                          </div>
                          <div>
                            <input
                              type={"date"}
                              name="assignedOn"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Expiry Date</label>
                          </div>
                          <input
                            type={"date"}
                            name="expiry_date"
                            className="form-control"
                          />
                          {/* <RangePicker className="form-control" onChange={(e) => // console.log(e._d)} name="expiry_date" /> */}
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Assigned Date</label>
                          </div>
                          <input
                            type={"date"}
                            name="assigned_date"
                            className="form-control"
                          />
                          {/* <RangePicker className="form-control" name="assigned_date" /> */}
                        </div>
                      </div>

                      <div className="col-12 mt-3 text-right">
                        <button
                          className="btn  btn-info btn-radius"
                          type="submit"
                        >
                          Search
                        </button>
                        <button
                          className="btn  btn-info btn-radius ml-3"
                          onClick={() => {
                            let apipath = apipaths.softwareInventoryList;
                            apipath["url"] = apipath["url"].split("?")[0];
                            $("#filter-inventory").trigger("reset");
                            $("#filter-inventory-wrapper").slideToggle(300);
                            dispatch(inventoryListAction(id));
                          }}
                          type="button"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="page-inner">
            <div>
              <Modal
                title="Assign Software Inventory"
                visible={isAssignInventoryModal}
                onOk={assignInventoryHandleOk}
                onCancel={assignInventoryHandleCancel}
              >
                <form>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <label>Available Inventories</label>
                      <select
                        className="form-control"
                        onChange={(e) => assignInventoryHandler(e.target.value)}
                      >
                        <option value="">Select Inventory</option>
                        {inventoryList[id] &&
                          inventoryList[id].map(
                            (inv) =>
                              !inv.assigned_to && (
                                <option value={inv.id}>{inv.name}</option>
                              )
                          )}
                      </select>
                    </div>

                    <div className="col-lg-6 col-md-6 col-12">
                      <label>Version</label>
                      <select className="form-control">
                        <option value="">Select Inventory</option>
                        {inventoryList[id] &&
                          inventoryList[id].map(
                            (inv) =>
                              !inv.assigned_to && <option>{inv.version}</option>
                          )}
                      </select>
                    </div>
                  </div>
                </form>
              </Modal>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body roles">
                    <MaterialTable
                      title=""
                      data={inventories}
                      columns={columns}
                      options={{
                        search: true,
                        paging: true,
                        pageSize: 20,
                        emptyRowsWhenPaging: false,
                        exportButton: false,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {modal && (
              <div className="custom-modal open ">
                <div className="custom-modal-content col-md-6">
                  <div>
                    <h2>{inventoryId ? "Update" : "Add"} Inventory</h2>
                  </div>
                  <AddInventoryForm
                    type={id}
                    isOpen={setModal}
                    submitHandler={submitHandler}
                    editFormData={editFormData}
                    inventoryId={inventoryId}
                    id={id}
                    userList={userList}
                    editForm={editForm}
                  />
                </div>
              </div>
            )}
            <Modal
              title="Import Software"
              visible={isModalVisible}
              onOk={importTnventoryFileHandler}
              destroyOnClose
              onCancel={handleCancel}
            >
              <div>
                <form id="file-import-handler">
                  <input
                    type={"file"}
                    className="form-control"
                    onChange={(e) => setInventoryFile(e.target.files[0])}
                  />
                </form>
                <p>
                  To download a sample import file&nbsp;
                  <span
                    className="text-primary cursor-pointer"
                    onClick={() => window.open(sampleImport, "_blank")}
                  >
                    click here
                  </span>
                </p>
                {error && <p className="text-danger">{error}</p>}
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default SoftwareInventory;
