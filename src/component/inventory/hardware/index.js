import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { inventoryListAction } from "../../../actions/inventoryAction";
import { apipaths } from "../../../api/apiPaths";
import { getResponse } from "../../../api/apiResponse";
import AddInventoryForm from "../../forms/AddInventoryForm";
import { Modal, Select } from "antd";
import { toast } from "react-toastify";
import $ from "jquery";
import MaterialTable from "material-table";
import {
  assignInventoryToUser,
  unassignInventory,
} from "../../../actions/commonAction";
import { Tooltip } from "@material-ui/core";
import swal from "sweetalert";
import { getUserLists } from "../../../actions/userActions";

function HardwareInventory() {
  let id = "hardware";
  const { userid } = useParams();
  const inventoryList = useSelector((state) => state.inventoryList);
  const [inventories, setInventories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [inventoryId, setInventoryId] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [formData, setFormdata] = useState({});

  let columns = userid
    ? [
        {
          title: "Asset ID",
          field: "id",
          emptyValue: "-",
        },
        {
          title: "Asset Name",
          field: "device_name",
          emptyValue: "-",
        },
        // {
        //   title: "Brand Name",
        //   field: "brand",
        //   emptyValue: "-",
        // },
        {
          title: "Location",
          field: "location",
          emptyValue: "-",
        },
        {
          title: "Assigned To",
          field: "assigned_to_username",
          emptyValue: "-",
        },
        {
          title: "Assigned On",
          field: "assigned_on",
          emptyValue: "-",
        },
        {
          title: "Service Tag",
          field: "service_tag",
          emptyValue: "-",
        },
        {
          title: "Express Service Code",
          field: "express_service_code",
          emptyValue: "-",
        },
        {
          title: "Warranty Expiry date",
          field: "warranty_expire_on",
          emptyValue: "-",
        },
        {
          title: "Action",
          field: "action",
          sorting: false,
        },
      ]
    : [
        {
          title: "Asset ID",
          field: "id",
          emptyValue: "-",
        },
        {
          title: "Asset Name",
          field: "device_name",
          emptyValue: "-",
        },
        // {
        //   title: "Brand Name",
        //   field: "brand",
        //   emptyValue: "-",
        // },
        {
          title: "Location",
          field: "location",
          emptyValue: "-",
        },
        {
          title: "Assigned To",
          field: "assigned_to_username",
          emptyValue: "-",
        },
        {
          title: "Assigned On",
          field: "assigned_on",
          emptyValue: "-",
        },
        {
          title: "Service Tag",
          field: "service_tag",
          emptyValue: "-",
        },
        {
          title: "Express Service Code",
          field: "express_service_code",
          emptyValue: "-",
        },
        {
          title: "Warranty Expiry date",
          field: "warranty_expire_on",
          emptyValue: "-",
        },
        {
          title: "Status",
          field: "status",
          emptyValue: "-",
        },
        {
          title: "Action",
          field: "action",
          sorting: false,
        },
      ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hardwareInfo, setHardwareInfo] = useState([]);
  const [inventoryFile, setInventoryFile] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const brands = ["HP", "DELL"];
  const [isAssignInventoryModal, setIsAssignInventoryModal] = useState(false);
  const [sampleImport, setSampleImport] = useState("");
  const userList = useSelector((state) => state.userList);

  const { Option } = Select;

  const assInvFormData = new FormData();

  const userListHandler = async () => {
    const { data } = await getResponse(apipaths.listusers, null);
    const users = data.data.user;
    dispatch(getUserLists(users));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleViewModalCancel = () => {
    setIsModal(false);
  };

  const ViewHardwareHandler = async (data) => {
    setIsModal(true);
    let hardwares = [];
    hardwares.push(data);
    setHardwareInfo(hardwares);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(inventoryListAction(id));
    userListHandler();
    $("#filter-inventory-wrapper").slideToggle(0);
  }, [id]);

  useEffect(() => {
    if (inventories.length > 0) {
      setUsername(inventories[0].user ? inventories[0].user.name : "");
    }
  }, [inventories]);

  const editInventory = (inventory, viewOnly) => {
    setEditFormData(inventory);
    //setEditForm(true)
    setInventoryId(inventory.id);
    if (viewOnly == 0) setEditForm(true);
    else setEditForm(false);
    setModal(true);
  };

  useEffect(() => {
    let data = inventoryList[id];
    if (userid) {
      data = data.filter((d) => parseInt(d.assigned_to) === parseInt(userid));
    }
    let mydata = inventoryDataModifier(data);
    setInventories(mydata);
    setSampleImport(inventoryList.hardwareSampleImport);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryList]);

  useEffect(() => {
    if (isModalVisible) setError("");
  }, [isModalVisible]);

  const unassignedInventoryHandler = async (inv) => {
    swal({
      title: "Are you sure?",
      text: `Press ok to Un-Assigned this inventory to ${username}`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (val) => {
      if (val) {
        const { data } = await unassignInventory(inv, "hardware");
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

  const inventoryDataModifier = (data) => {
    let mydata = data;
    mydata.map((inv) => {
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
      inv.action = (
        <div className="d-flex justify-content-center">
          {!userid ? (
            <>
              <Tooltip title="View Hardware Inventory">
                <div>
                  <i
                    className="fa fa-file bg-success table-icon"
                    onClick={() => editInventory(inv, 0)}
                  ></i>
                </div>
              </Tooltip>
              <Tooltip title="Edit Hardware Inventory">
                <div>
                  <i
                    className="fa fa-pen bg-warning  ml-2 table-icon"
                    onClick={() => editInventory(inv, 1)}
                  ></i>
                </div>
              </Tooltip>
              <Tooltip title="Delete Hardware Inventory">
                <div>
                  <i
                    className="fa fa-trash bg-danger ml-2 table-icon"
                    onClick={() => deleteInventory(inv)}
                  ></i>
                </div>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Unassign Hardware Inventory">
              <div>
                <i
                  className="fa fa-trash bg-danger ml-2 table-icon"
                  onClick={() => unassignedInventoryHandler(inv)}
                ></i>
              </div>
            </Tooltip>
          )}
        </div>
      );
    });

    return mydata;
  };

  const filterSubmitHandler = async (e) => {
    e.preventDefault();
    let elem = $("#filter-inventory :input[value!='']")
      .filter(function (index, element) {
        return $(element).val() != "";
      })
      .serialize();
    let path = apipaths.hardwareInventoryList;
    path["url"] = path["url"].split("?")[0] + "?" + elem;
    let { data } = await getResponse(path, formData);
    let inventoryData = inventoryDataModifier(data.data.inventory);
    setInventories(inventoryData);
  };

  const deleteInventory = async (inv) => {
    if (id === "hardware") {
      swal({
        title: "Are you sure?",
        text: "Press ok to Delete this hardware inventory",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (val) => {
        if (val) {
          const { data } = await getResponse(apipaths.deleteInventoryHardware, {
            delete_id: inv.id,
            enable: 0,
          });
          const { success, message } = data;
          if (success === 1 || success === 0) {
            toast.success(message);
            dispatch(inventoryListAction(id));
          }
        }
      });
    }
  };

  const submitHandler = async (formdata) => {
    let data = formdata;

    const {
      // brand,
      assetName,
      customID,
      unitPrice,
      // device_number,
      service_tag,
      model,
      express_service_code,
      serial_number,
      assignedTo,
      Test,
      // device_name,
      // assigned_to,
      location,
      description,
      warranty_expiry_date,
    } = data;
    console.log("data==>", data);
    if (
      // !brand ||
      !assetName ||
      !customID ||
      !unitPrice ||
      // !device_number ||
      !service_tag ||
      !model ||
      !express_service_code ||
      !assignedTo ||
      // !device_name ||
      // !assigned_to ||
      !warranty_expiry_date ||
      !location ||
      !description
    ) {
      toast.warn("All Feilds are required.");
    } else {
      if (inventoryId) {
        data.operation = "update";
        data.id = inventoryId;
      } else data.operation = "add";

      if (id === "software")
        await getResponse(apipaths.addInventorySoftware, data);
      else await getResponse(apipaths.addInventoryHardware, data);
      dispatch(inventoryListAction(id));
      setModal(false);
    }
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

      dispatch(inventoryListAction(id));
      userListHandler();
      setIsModalVisible();
    } else {
      setError("File type not allowed.");
    }
  };

  const assignInventoryModal = () => {
    setIsAssignInventoryModal(true);
  };

  const assignInventoryHandleOk = async () => {
    assInvFormData.append("user_id", userid);
    let { data } = await assignInventoryToUser(assInvFormData);
    toast.success(data.message);
    setIsAssignInventoryModal(false);
  };

  const assignInventoryHandleCancel = () => {
    setIsAssignInventoryModal(false);
  };

  return (
    <React.Fragment>
      <div className="panel-header bg-secondary-gradient">
        <div className="page-inner py-5">
          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
            <div>
              <h2 className="text-white pb-2 fw-bold">
                {id === "software" ? "Software" : "Hardware"} Inventory{" "}
                {userid && username && "( " + username + " )"}
              </h2>
              <h5 className="text-white op-7 mb-2">
                Manage Your Hardware Inventory
              </h5>
            </div>
            <div className="ml-md-auto py-2 py-md-0">
              {!userid ? (
                <>
                  <button
                    className="btn btn-white btn-round btn-border mr-2"
                    onClick={() =>
                      $("#filter-inventory-wrapper").slideToggle(300)
                    }
                  >
                    Filters
                  </button>
                  <button
                    onClick={() => showModal()}
                    className="btn btn-round btn-primary mr-2"
                  >
                    Import Hardware
                  </button>
                  <button
                    onClick={() => {
                      window.open(inventoryList.exportUrl, "_blank").focus();
                    }}
                    className="btn btn-round btn-primary mr-2"
                  >
                    Export Hardware
                  </button>
                  <button
                    className="btn btn-primary btn-round"
                    onClick={() => {
                      setModal(true);
                      setEditFormData({});
                      setInventoryId();
                      setEditForm(false);
                    }}
                  >
                    Add Hardware
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-round"
                    onClick={assignInventoryModal}
                  >
                    Assign Inventory
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="page-inner mt--5">
        <div className="card" id="filter-inventory-wrapper">
          <div className="card-body">
            <form
              onSubmit={filterSubmitHandler}
              id="filter-inventory"
              className="mb-5"
            >
              <div className="row mx-auto pt-3">
                <div className="col-md-12">
                  <h4 className="fw-bold">Search Hardware Inventory</h4>
                </div>
                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <div>
                      <label className="mb-2">Assest Name</label>
                    </div>
                    <input
                      type={"text"}
                      className="form-control"
                      name="device_name"
                      onChange={(e) => {
                        setFormdata({
                          ...formData,
                          device_name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <div>
                      <label className="mb-2">Device Number</label>
                    </div>
                    <input
                      name="device_number"
                      type="text"
                      className="form-control filter-input"
                      onChange={(e) => {
                        setFormdata({
                          ...formData,
                          device_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                {/* <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <div>
                      <label className="mb-2">Brand</label>
                    </div>
                    <select className="form-control" name="brand">
                      <option value="">Select Brand</option>
                      {inventoryList.brands &&
                        inventoryList.brands.map((data, i) => {
                          if (!data) return null;
                          return (
                            <option value={data} key={i}>
                              {data}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div> */}

                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <div>
                      <label className="mb-2">Model</label>
                    </div>
                    <input
                      name="model"
                      type="text"
                      className="form-control filter-input"
                      onChange={(e) => {
                        setFormdata({
                          ...formData,
                          model: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <div>
                      <label className="mb-2">Serial Number</label>
                    </div>
                    <input
                      name="serial_number"
                      type="text"
                      className="form-control filter-input"
                      onChange={(e) => {
                        setFormdata({
                          ...formData,
                          serial_number: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <div>
                      <label className="mb-2">Express Service Code </label>
                    </div>
                    <input
                      type="text"
                      name="express_service_code"
                      className="form-control filter-input"
                      onChange={(e) => {
                        setFormdata({
                          ...formData,
                          express_service_code: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <div>
                      <label className="mb-2">Warranty Expire On</label>
                    </div>
                    <input
                      type="date"
                      name="warranty_expire_on"
                      className="form-control filter-input"
                      onChange={(e) => {
                        setFormdata({
                          ...formData,
                          warranty_expire_on: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <div>
                      <label className="mb-2">Assign To</label>
                    </div>
                    <select
                      optionsState={formData?.assignTo}
                      className="form-control"
                      name="assigned_to"
                      onChange={(e) => {
                        setFormdata({
                          ...formData,
                          assignTo: e.target.value,
                        });
                      }}
                    >
                      <option value={""}>Select User</option>
                      {userList &&
                        userList.map((user) => (
                          <option value={user.name}>{user.name}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <div>
                      <label className="mb-2">Status</label>
                    </div>
                    <select
                      className="form-control"
                      value={formData?.status}
                      name="status"
                      onChange={(e) => {
                        setFormdata({
                          ...formData,
                          status: e.target.value,
                        });
                      }}
                    >
                      <option value={""}>Select Status</option>
                      <option value="Not Available">Not Available</option>
                      <option value="Avaialable">Available</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <label className="mb-2">Location</label>
                  </div>{" "}
                  <select
                    className="form-control"
                    value={formData?.location}
                    name="location"
                    onChange={(e) => {
                      setFormdata({
                        ...formData,
                        location: e.target.value,
                      });
                    }}
                  >
                    <option value={""}>{"Select LOcation"}</option>
                    <option value={"USA"}>{"USA"}</option>
                    <option value={"Costa Rica"}>{"Costa Rica"}</option>
                    <option value={"India"}>{"India"}</option>
                  </select>
                </div>

                <div className="col-12 mt-3 text-right">
                  <button className="btn  btn-primary btn-radius" type="submit">
                    Search
                  </button>
                  <button
                    className="btn  btn-primary btn-border ml-3"
                    onClick={() => {
                      $("#filter-inventory").trigger("reset");
                      $("#filter-inventory-wrapper").slideToggle(300);
                      let path = apipaths.hardwareInventoryList;
                      path["url"] = path["url"].split("?")[0];
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
        <div className="card">
          <div className="card-body p-0">
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

      <Modal
        title={inventoryId ? "Update Inventory" : "Add Inventory"}
        visible={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <AddInventoryForm
          type={id}
          isOpen={setModal}
          submitHandler={submitHandler}
          editFormData={editFormData}
          inventoryId={inventoryId}
          id={id}
          editForm={editForm}
          brands={brands}
        />
      </Modal>
      <Modal
        title="Basic Modal"
        visible={isAssignInventoryModal}
        onOk={assignInventoryHandleOk}
        onCancel={assignInventoryHandleCancel}
      >
        <form>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <label>Device Name</label>
              <select
                className="form-control"
                onChange={(e) =>
                  assInvFormData.append("inventory_ids[]", e.target.value)
                }
              >
                <option value="">Select Inventory</option>
                {inventoryList[id] &&
                  inventoryList[id].map(
                    (inv) =>
                      !inv.assigned_to && (
                        <option value={inv.id}>{inv.device_name}</option>
                      )
                  )}
              </select>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
              <label>Brand</label>
              <select className="form-control">
                <option value="">Select Brand</option>
                {inventoryList[id] &&
                  inventoryList[id].map(
                    (inv) => !inv.assigned_to && <option>{inv.brand}</option>
                  )}
              </select>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
              <label>Model</label>
              <select className="form-control">
                <option value="">Select Model</option>
                {inventoryList[id] &&
                  inventoryList[id].map(
                    (inv) => !inv.assigned_to && <option>{inv.model}</option>
                  )}
              </select>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
              <label>Brand</label>
              <select className="form-control">
                <option value="">Select Device Number</option>
                {inventoryList[id] &&
                  inventoryList[id].map(
                    (inv) =>
                      !inv.assigned_to && <option>{inv.device_number}</option>
                  )}
              </select>
            </div>
          </div>
        </form>
      </Modal>
      <Modal
        title="Import Hardware"
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

      <Modal
        title="Hardware Details"
        visible={isModal}
        onOk={ViewHardwareHandler}
        onCancel={handleViewModalCancel}
      >
        <div className="">
          <div>
            {hardwareInfo &&
              hardwareInfo.map((hardware, index) => (
                <>
                  <div className="row" key={index}>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Hardware Id:</span>
                      <span className="margin">{hardware.id}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Device Name:</span>
                      <span className="margin">{hardware.device_name}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Device Number:</span>
                      <span className="margin">{hardware.device_number}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Brand:</span>
                      <span className="margin">{hardware.brand}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Model:</span>
                      <span className="margin">{hardware.model}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Serial Number:</span>
                      <span className="margin">{hardware.serial_number}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Section:</span>
                      <span className="margin">{hardware.section}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Assign To:</span>
                      <span className="margin">{hardware.assigned_to}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Status:</span>
                      <span className="margin">{hardware.status}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Location:</span>
                      <span className="margin">{hardware.location}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Assigned User:</span>
                      <span className="margin">
                        {hardware.assigned_to_username}
                      </span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">customID:</span>
                      <span className="margin">{hardware.customID}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Floor:</span>
                      <span className="margin">{hardware.floor}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Notes:</span>
                      <span className="margin">{hardware.notes}</span>
                    </div>
                    <div className="col-12 p-2">
                      <span className="fw-bold">Updated At:</span>
                      <span className="margin">{hardware.updated_at}</span>
                    </div>
                  </div>
                </>
              ))}
          </div>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default HardwareInventory;
