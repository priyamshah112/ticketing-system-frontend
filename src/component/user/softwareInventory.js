import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inventoryListAction } from "../actions/inventoryAction";
import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";
import AddInventoryForm from "./forms/AddInventoryForm";
import { Modal, Select, DatePicker } from "antd";
import { toast } from "react-toastify";
import $ from "jquery";
import MaterialTable from "material-table";

function SoftwareInventory() {
  const { RangePicker } = DatePicker;
  let id = "software";
  const inventoryList = useSelector((state) => state.inventoryList);
  const userList = useSelector((state) => state.userList);

  const [inventories, setInventories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [inventoryId, setInventoryId] = useState("");
  let columns = [
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
      field: "Available",
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
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [softwareInfo, setSoftwareeInfo] = useState([]);
  const [inventoryFile, setInventoryFile] = useState("");
  const [error, setError] = useState("");

  const { Option } = Select;

  console.log("userList: ", userList)
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(inventoryFile);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(inventoryListAction(id));
    $("#filter-inventory").slideToggle(0);
  }, [id]);

  const editInventory = (inventory) => {
    setEditFormData(inventory);
    setInventoryId(inventory.id);
    setModal(true);
  };

  const handleChange = () => {};

  useEffect(() => {
    let data = inventoryList[id];
    data.map((inv) => {
      // console.log(inv)
      inv.assigned_to_username = inv.user && inv.user.name && inv.user.name;
      inv.action = (
        <div className="d-flex">
          <i
            className="fa fa-pen bg-warning table-icon"
            onClick={() => editInventory(inv)}
          ></i>
          <i
            className="fa fa-trash bg-danger ml-3 table-icon"
            onClick={() => deleteInventory(inv)}
          ></i>
          <i
            className="fa fa-eye bg-success ml-3 table-icon"
            onClick={() => ViewSoftwareHandler(inv)}
          ></i>
        </div>
      );
    });
    setInventories(data);
  }, [inventoryList]);

  const filterSubmitHandler = async (e) => {
    e.preventDefault();
    console.log($("#filter-inventory").serialize());
    let path = apipaths.softwareInventoryList;
    path["url"] = path["url"] + "?" + $("#filter-inventory").serialize();
    let res = await getResponse(path);
    console.log(res);
  };

  const handleViewModalCancel = () => {
    setIsModal(false);
  };

  const ViewSoftwareHandler = async (data) => {
    setIsModal(true);
    let software = [];
    software.push(data);
    setSoftwareeInfo(software);
    console.log("software", software);
  };

  const deleteInventory = async (inv) => {
    if (id === "software") {
      const { data } = await getResponse(apipaths.deleteInventorySoftware, {
        delete_id: inv.id,
      });
      const { success, message } = data;
      if (success === 1 || success === 0) {
        toast.success(message);
        dispatch(inventoryListAction(id));
      }
    }
  };

  const submitHandler = async (formdata) => {
    let data = formdata;
    if (inventoryId) {
      data.operation = "update";
      data.id = inventoryId;
    } else data.operation = "add";

    if (id === "software")
      await getResponse(apipaths.addInventorySoftware, data);
    else await getResponse(apipaths.addInventoryHardware, data);
    dispatch(inventoryListAction(id));
    setModal(false);
  };

  const importTnventoryFileHandler = () => {
    setError("");
    const formdata = new FormData();
    formdata.append("file", inventoryFile);
    if (
      inventoryFile.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setIsModalVisible();
      getResponse(apipaths.importInventory, formdata);
    } else {
      setError("File type not allowed.");
    }
  };

  return (
    <>
      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header flex justify-content-between">
                    <div className="card-title">
                      {id === "software" ? "Software" : "Hardware"} Inventory
                    </div>
                    <div className="d-flex">
                      <button
                        onClick={() => showModal()}
                        className="btn btn-radius btn-info mr-3"
                      >
                        Import Inventory
                      </button>
                      <button
                        onClick={() => {
                          window
                            .open(inventoryList.exportUrl, "_blank")
                            .focus();
                        }}
                        className="btn btn-radius btn-info mr-3"
                      >
                        Export Inventory
                      </button>

                      <button
                        className="btn btn-outline-primary btn-radius"
                        onClick={() => {
                          setModal(true);
                          setEditFormData({});
                          setInventoryId();
                        }}
                      >
                        Add Inventory
                      </button>
                      <button
                        className="btn btn-info btn-radius mx-3"
                        onClick={() => $("#filter-inventory").slideToggle(300)}
                      >
                        More Filters
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <form
                      onSubmit={filterSubmitHandler}
                      id="filter-inventory"
                      className="mb-5"
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
                            <select className="form-control">
                              <option>Select Assigned To</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3 mt-3">
                          <div>
                            <div>
                              <label className="mb-2">Status</label>
                            </div>
                            <select className="form-control">
                              <option>In Use</option>
                              <option>Available</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3 mt-3">
                          <div>
                            <div>
                              <label className="mb-2">Assigned On</label>
                            </div>
                            <select className="form-control">
                              <option>In Use</option>
                              <option>Available</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-3 mt-3">
                          <div>
                            <div>
                              <label className="mb-2">Expiry Date</label>
                            </div>
                            <RangePicker
                              className="form-control"
                              name="expiry_date"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mt-3">
                          <div>
                            <div>
                              <label className="mb-2">Assigned Date</label>
                            </div>
                            <RangePicker
                              className="form-control"
                              name="assigned_date"
                            />
                          </div>
                        </div>

                        <div className="col-12 mt-3 text-right">
                          <button
                            className="btn  btn-info btn-radius"
                            type="submit"
                          >
                            Save
                          </button>
                          <button
                            className="btn  btn-info btn-radius ml-3"
                            onClick={() =>
                              $("#filter-inventory").slideToggle(300)
                            }
                            type="button"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </form>

                    <MaterialTable
                      title=""
                      data={inventories}
                      columns={columns}
                      options={{
                        search: true,
                        paging: true,
                        exportButton: true,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {modal && (
              <div className="custom-modal open">
                <div className="custom-modal-content">
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
                  />
                </div>
              </div>
            )}
            <Modal
              title="Import Inventory"
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
                {error && <p className="text-danger">{error}</p>}
              </div>
            </Modal>

            <Modal
              title="Software Details"
              visible={isModal}
              onOk={ViewSoftwareHandler}
              onCancel={handleViewModalCancel}
            >
              <div className="">
                <div>
                  {softwareInfo &&
                    softwareInfo.map((software, index) => (
                      <>
                        <div className="row" key={index}>
                          <div className="col-6 p-2">
                            <span className="fw-bold">Software Id:</span>
                            <span className="margin">{software.id}</span>
                          </div>
                          <div className="col-6 p-2">
                            <span className="fw-bold">Name:</span>
                            <span className="margin">{software.name}</span>
                          </div>
                          <div className="col-6 p-2">
                            <span className="fw-bold">Version:</span>
                            <span className="margin">{software.version}</span>
                          </div>
                          <div className="col-6 p-2">
                            <span className="fw-bold">Status:</span>
                            <span className="margin">{software.status}</span>
                          </div>
                          <div className="col-6 p-2">
                            <span className="fw-bold">Notes:</span>
                            <span className="margin">{software.notes}</span>
                          </div>
                          <div className="col-6 p-2">
                            <span className="fw-bold">Assigned To:</span>
                            <span className="margin">
                              {software.assigned_to_username}
                            </span>
                          </div>
                          <div className="col-6 p-2">
                            <span className="fw-bold">Assigned On:</span>
                            <span className="margin">
                              {software.assigned_on}
                            </span>
                          </div>
                          <div className="col-6 p-2">
                            <span className="fw-bold">Expiry Date:</span>
                            <span className="margin">
                              {software.expiry_date}
                            </span>
                          </div>
                          <div className="col-12 p-2">
                            <span className="fw-bold">Assigned Date:</span>
                            <span className="margin">
                              {software.created_at}
                            </span>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
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
