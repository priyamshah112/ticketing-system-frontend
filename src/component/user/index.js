import React, { useEffect, useState } from "react";
import data from "../data/user.json";
import UserModal from "../modal/userModal";
import TableFeild from "../TableFeild";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "../forms/AddUser";
import { getResponse } from "../../api/apiResponse";
import { apipaths } from "../../api/apiPaths";
import { getUserLists } from "../../actions/userActions";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { Collapse } from "antd";
import { inventoryListAction } from "../../actions/inventoryAction";
import { Select } from "antd";
import { Modal, Button, Tabs } from "antd";
import $ from "jquery";
import MaterialTable from "material-table";
import { DatePicker, Space } from "antd";
import { dateFormatHandler } from "../../actions/commonAction";
import { Tooltip } from "@material-ui/core";

function User(props) {
  const { RangePicker } = DatePicker;

  const { TabPane } = Tabs;
  const columns = [
    {
      title: "ID ",
      field: "id",
    },
    {
      title: "Name",
      field: "namewithemail",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Type",
      field: "userType",
    },
    {
      title: "Added On",
      field: "created_at",
    },
    {
      title: "Inventory",
      field: "inventory",
      width: "10%",
      sorting: false,
    },
    {
      title: "Action",
      field: "action",
      width: "10%",
      sorting: false,
    },
  ];
  const [isCreateUserModal, setIsCreateModal] = useState(false);
  const [operation, setOperation] = useState("");
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [userImportFile, setUserImportFile] = useState("");

  const [seletedInventory, setSeletedInventory] = useState([]);
  const [availableInventory, setAvailableSeletedInventory] = useState([]);
  const [userInventory, setUserInventory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [error, setError] = useState();
  const [userData, setUserData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [exportUrl, setExportUrl] = useState("");

  const [filterData, setFilterData] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState();

  const [sampleImport, setSampleImport] = useState("");

  const userList = useSelector((state) => state.userList);
  const userDetails = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();

  const { Option } = Select;
  useEffect(() => {
    dataHandler();
    $("#filter-user").slideToggle(0);
  }, []);

  useEffect(() => {
    if (isModalVisible) setError("");
  }, [isModalVisible]);

  const dataHandler = () => {
    getData();
    dispatch(inventoryListAction("software"));
    dispatch(inventoryListAction("hardware"));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleViewModalCancel = () => {
    setIsModal(false);
  };

  const userInventoriesHandler = (inventories) => {
    if (inventories.length > 0) {
      return (
        <>
          {inventories.map((inventory) => (
            <button
              className="btn btn-outline-primary btn-radius btn-sm m-1"
              style={{ pointerEvents: "none" }}
            >
              {inventory.device_name}
            </button>
          ))}
        </>
      );
    } else {
      return null;
    }
  };

  const getUserListData = async () => {
    const { data } = await getResponse(apipaths.listusers, null);
    setSampleImport(data.data.sampleImport);
    let users = data.data.user;
    setUserData(data.data);
    users = usersAddMoreData(users);
    setExportUrl(data.data.exportUrl);
    dispatch(getUserLists(users));
  };

  const usersAddMoreData = (users) => {
    let data = users;
    data.map((user) => {
      // user.inventories_assigned = userInventoriesHandler(user.inventories);
      // user.created_at = new Date(user.created_at).toDateString()
      user.created_at = dateFormatHandler(user.created_at);
      user.updated_at = new Date(user.updated_at).toDateString();

      user.namewithemail = (
        <div>
          <p className="username">
            {user.user_details.firstName} {user.user_details.middleName}{" "}
            {user.user_details.lastName}
          </p>
          <span className="email">{user.email}</span>
        </div>
      );

      if (user.userType === "Support") {
        user.userType = "Co-Admin";
      }
      let userStatus = "";
      switch (user.enable) {
        case 1:
          userStatus = (
            <div className="status status-active">
              <span></span> Active
            </div>
          );
          break;
        case 2:
          userStatus = (
            <div className="status status-suspended">
              <span></span> Suspended
            </div>
          );
          break;
        case 0:
          userStatus = (
            <div className="status status-pending">
              <span></span> Pending
            </div>
          );
          break;
      }
      user.status = userStatus;
      user.action = (
        <div className="d-flex justify-content-center">
          <Tooltip title="Edit User">
            <div>
              <i
                className="table-icon fa fa-edit bg-warning text-white cursor-pointer mr-2"
                onClick={() => {
                  setOperation("update");
                  setIsCreateModal(true);
                  setUserInfo(user);
                }}
              ></i>
            </div>
          </Tooltip>
          <Tooltip title="View User">
            <div>
              <i
                className="table-icon fa fa-eye bg-success text-white cursor-pointer mr-2"
                onClick={() => {
                  setOperation("view");
                  setIsCreateModal(true);
                  setUserInfo(user);
                }}
              ></i>
            </div>
          </Tooltip>
          <Tooltip title="Delete User">
            <div>
              <i
                className="table-icon fa fa-trash bg-danger text-white cursor-pointer"
                onClick={() => deleteUserHandler(user)}
              ></i>
            </div>
          </Tooltip>
        </div>
      );
      user.inventory = (
        <div className="d-flex justify-content-center">
          <Tooltip title="view software inventories assigned">
            <div>
              <i
                className="table-icon fas fa-laptop-code bg-success text-white cursor-pointer mr-2"
                onClick={() => assignSoftwareInventoryHandler(user)}
              ></i>
            </div>
          </Tooltip>
          <Tooltip title="view hardware inventories assigned">
            <div>
              <i
                className="table-icon fa fa-laptop bg-success text-white cursor-pointer"
                onClick={() => assignHardwareInventoryHandler(user)}
              ></i>
            </div>
          </Tooltip>
        </div>
      );
    });
    return data;
  };

  const assignInventoryHandler = async (user) => {
    setUserId(user.id);
    const { data } = await getResponse(apipaths.getInventory, {
      user_id: user.id,
    });
    if (data) {
      setAvailableSeletedInventory(data.data.availableInventory);
      setUserInventory(data.data.userInventory);
      setModal(true);
    }
  };

  const assignSoftwareInventoryHandler = async (user) => {
    props.history.push(`/inventory/software/${user.id}`);
  };

  const assignHardwareInventoryHandler = async (user) => {
    // window.location.href = `/inventory/hardware:${user.id}`
    props.history.push(`/inventory/hardware/${user.id}`);
    // setUserId(user.id)
    // const { data } = await getResponse(apipaths.getInventory, {
    //   user_id: user.id,
    // });
    // if (data) {
    //   setAvailableSeletedInventory(data.data.availableInventory);
    //   setUserInventory(data.data.userInventory);
    //   setModal(true);
    // }
  };

  const getData = async () => {
    await getUserListData();
  };

  const createUserHandler = async (data, setFormdata) => {
    if (!data.firstName || !data.email) {
      setIsCreateModal(false);
      toast.warn("Name and Email is required");
      return null;
    }
    let user = data;
    user.operation = operation;
    user.role_id = userDetails.role_id;
    user.url = window.location.origin;
    const res = await getResponse(apipaths.adduser, user);
    if (res.error) toast.error(res.error.message);
    if (res.data) toast.success(res.data.message);

    if (res.data.success) getUserListData();

    setOperation("");
    setIsCreateModal(false);
  };

  const deleteUserHandler = async ({ id }) => {
    swal({
      title: "Are you sure?",
      text: "Press ok to delete this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (val) => {
      if (val === true) {
        let res = await getResponse(apipaths.deleteuser, { delete_id: id });
        toast.success(res.data.message);
        await getUserListData();
        dispatch(getUserLists());
      }
    });
  };

  const submitHandler = async () => {
    let formdata = new FormData();
    formdata.append("user_id", userId);

    seletedInventory.map((data) => {
      formdata.append("inventory_ids[]", data);
    });

    let { data } = await getResponse(apipaths.assignInventory, formdata);
    toast.success(data.message);

    dataHandler();
    setModal();
  };

  const importUserFileHandler = async () => {
    setError("Importing file please wait");
    const formdata = new FormData();
    formdata.append("file", userImportFile);
    if (
      userImportFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      userImportFile.type === "application/vnd.ms-excel"
    ) {
      let { data, error } = await getResponse(apipaths.importUser, formdata);

      if (error && error.status_code === 301) {
        setError(error.message);
        return window.open(error.data.filePath, "_blank");
      }

      if (data.success) toast.success(data.message);
      else toast.error(data.message);

      setIsModalVisible();
      dataHandler();
    } else setError("File type not allowed.");
  };

  const filterSubmitHandler = async (e) => {
    e.preventDefault();
    let filterString = $("#filter-user-form :input[value!='']")
      .filter(function (index, element) {
        return $(element).val() != "";
      })
      .serialize();
    let path = apipaths.listusers;
    path["url"] = path["url"].split("?")[0] + "?" + filterString;
    // console.log(path);
    let { data } = await getResponse(path);
    path = "";
    setIsFilterActive(true);

    let users = data.data.user;
    users = usersAddMoreData(users);
    setFilterData(users);
  };
  return (
    <>
      <div className="wrapper">
        <div className="main-panel">
          <div className="content">
            <Modal
              title="Import Users"
              destroyOnClose
              visible={isModalVisible}
              onOk={importUserFileHandler}
              onCancel={handleCancel}
            >
              <div className="">
                <form>
                  <input
                    type={"file"}
                    className={"form-control"}
                    onChange={(e) => setUserImportFile(e.target.files[0])}
                  />
                </form>
                {error && <p className="text-danger">{error}</p>}
                <p>
                  To download a sample import file&nbsp;
                  <span
                    className="text-primary cursor-pointer"
                    onClick={() => window.open(sampleImport, "_blank")}
                  >
                    click here
                  </span>
                </p>
              </div>
            </Modal>
            <div className="row buttons-row mt-5">
              <div className="col-md-6 text-left">
                <h2 style={{ fontSize: "22px", fontWeight: "600" }}>
                  Users Details
                </h2>
              </div>
              <div className="col-md-6 buttons-col">
                <button
                  className="btn btn-info btn-radius ml-3"
                  onClick={showModal}
                >
                  Import User
                </button>
                <button
                  className="btn btn-info btn-radius ml-3"
                  onClick={() => window.open(exportUrl, "_blank").focus()}
                >
                  Export User
                </button>
                <button
                  className="btn btn-info btn-radius mx-3"
                  onClick={() => $("#filter-user").slideToggle(300)}
                >
                  More Filters
                </button>
                <button
                  className="btn btn-outline-primary btn-radius"
                  onClick={() => {
                    setOperation("add");
                    setIsCreateModal(true);
                  }}
                >
                  Create
                </button>
              </div>
            </div>
            <div className="px-4 pt-3 border-radius-5">
              <div className="search-box" id="filter-user">
                <div className="card py-4">
                  <form onSubmit={filterSubmitHandler} id="filter-user-form">
                    <div className="row mx-auto pt-3">
                      <div className="col-md-12">
                        <h4 className="fw-bold">Search User</h4>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">User Type</label>
                          </div>
                          <select className="form-control" name="userType">
                            <option value="">Choose User Type</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="support">Co-Admin</option>
                          </select>
                        </div>
                      </div>

                      {/* <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Hire Date</label>
                            <input type={"text"} className="d-none" />
                          </div>
                          <RangePicker
                            className="form-control"
                            name="hireDate"
                            onChange={(val) => {}}
                          />
                        </div>
                      </div> */}

                      {/* <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Start Date</label>
                          </div>
                          <RangePicker
                            className="form-control"
                            name="startDate"
                          />
                        </div>
                      </div> */}

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Project Name</label>
                          </div>
                          <select className="form-control" name="projectName">
                            <option value="">Select One</option>
                            {userData &&
                              userData.projectName &&
                              userData.projectName.map((project, index) => {
                                if (!project) return null;
                                return (
                                  <option key={index} value={project}>
                                    {project}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Client Name</label>
                          </div>
                          <select className="form-control" name="clientName">
                            <option value={""}>Select One</option>
                            {userData &&
                              userData.clientName &&
                              userData.clientName.map((project, index) => {
                                if (!project) return null;
                                return (
                                  <option key={index} value={project}>
                                    {project}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Work Location</label>
                          </div>
                          <select className="form-control" name="workLocation">
                            <option value={""}>Select One</option>
                            {userData &&
                              userData.workLocation &&
                              userData.workLocation.map((project, index) => {
                                if (!project) return null;
                                return (
                                  <option key={index} value={project}>
                                    {project}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Hired As</label>
                          </div>
                          <select className="form-control" name="hiredAs">
                            <option value={""}>Select One</option>
                            {userData &&
                              userData.hiredAs &&
                              userData.hiredAs.map((project, index) => {
                                if (!project) return null;
                                return (
                                  <option key={index} value={project}>
                                    {project}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <div>
                            <label className="mb-2">Provided Laptop</label>
                          </div>
                          <select
                            className="form-control"
                            name="providingLaptop"
                          >
                            <option value={""}>Select One</option>
                            <option value={"Admin"}>Yes</option>
                            <option value={"Agent"}>No</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-md-6 col-lg-3 mt-3">
                        <div>
                          <label className="mb-2">Status</label>
                        </div>
                        <select className="form-control" name="status">
                          <option value={""}>Select Status</option>
                          <option value={"active"}>Active</option>
                          <option value={"pending"}>Pending</option>
                          <option value={"suspended"}>Suspended</option>
                        </select>
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
                            setIsFilterActive(false);
                            $("#filter-user-form").trigger("reset");
                            $("#filter-user").slideToggle(300);
                            let path = apipaths.listusers;
                            path["url"] = path["url"].split("?")[0];
                            dataHandler();
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
              <br />
              <div className="card">
                <div className="card-body users">
                  <MaterialTable
                    title=""
                    data={isFilterActive ? filterData : userList}
                    columns={columns}
                    options={{
                      search: true,
                      pageSize: 20,
                      emptyRowsWhenPaging: false,
                      paging: true,
                      exportButton: false,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 col-md-6">
        {/* <UserModal
                    isOpen={isCreateUserModal}
                    onCancel={() => setIsCreateModal(false)}
                    onSubmit={(data) => // console.log(data)}
                /> */}
        {isCreateUserModal && (
          <AddUser
            isOpen={isCreateUserModal}
            onCancel={() => setIsCreateModal(false)}
            onSubmit={createUserHandler}
            operation={operation}
            userInfo={userInfo}
          />
        )}

        {modal && (
          <div className={`custom-modal ${modal ? "open" : ""}`}>
            <div className="custom-modal-content add-inventory">
              <h2>Assign Inventory</h2>
              <div className="row align-items-end">
                <div className="col-lg-6 col-md-6 col-12 px-4 mt-3">
                  <label className="mb-2">Hardware</label>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    onChange={(data) => setSeletedInventory(data)}
                  >
                    {availableInventory &&
                      availableInventory.map((data) => (
                        <Option key={data.id} defaultValue={data.id}>
                          {data.device_name}
                        </Option>
                      ))}

                    {userInventory &&
                      userInventory.map((data) => (
                        <Option key={data.id} defaultValue={data.id}>
                          {data.device_name}
                        </Option>
                      ))}
                  </Select>
                </div>
                <div className="col-lg-6 col-md-6 col-12 px-4 mt-3">
                  <button
                    className="btn btn-success"
                    onClick={() => submitHandler()}
                  >
                    Add
                  </button>
                  <button
                    className="btn btn-danger ml-3"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default User;
