import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { inventoryListAction } from "../actions/inventoryAction";
import { apipaths } from "../api/apiPaths";
import { getResponse } from "../api/apiResponse";
import AddInventoryForm from "./forms/AddInventoryForm";
import { Modal, Select } from 'antd';
import { toast } from "react-toastify";
import $ from "jquery"
import MaterialTable from "material-table";

function HardwareInventory() {
    const {userid} = useParams();
    console.log(userid)
    let id = "hardware";
    const inventoryList = useSelector(state => state.inventoryList);
    const [inventories, setInventories] = useState([]);
    const [modal, setModal] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [editFormData, setEditFormData] = useState({})
    const [inventoryId, setInventoryId] = useState("")
    let columns = [
        {
            title: "Inventory ID",
            field: "id",
        },
        {
            title: "Device Name",
            field: "device_name",
        },
        {
            title: "IT Device Number",
            field: "device_number",
        },
        {
            title: "Brand",
            field: "brand",
        },
        {
            title: "Model",
            field: "model",
        },
        {
            title: "Serial Number",
            field: "serial_number",
        },
        {
            title: "Section",
            field: "section",
        },
        {
            title: "Assigned to",
            field: "assigned_to_username",
        },
        {
            title: "Status",
            field: "status",
        },
        {
            title: "Custom ID",
            field: "customID",
        },
        {
            title: "Action",
            field: "action",
        },

    ]
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hardwareInfo, setHardwareInfo] = useState([]);
    const [inventoryFile, setInventoryFile] = useState("");
    const [error, setError] = useState("");

    const { Option } = Select;


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        console.log(inventoryFile)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleViewModalCancel = () => {
        setIsModal(false);
      };

      const ViewHardwareHandler = async (data) => {
        setIsModal(true)
        let hardwares = []
        hardwares.push(data)
        setHardwareInfo(hardwares)
        console.log("hardwares", hardwares)
      };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(inventoryListAction(id))
        $("#filter-inventory").slideToggle(0)
    }, [id]);

    const editInventory = (inventory) => {
        setEditFormData(inventory)
        setInventoryId(inventory.id)
        setModal(true)
    }

    const handleChange = () => { }     

    useEffect(() => {
        let data = inventoryList[id];
        data.map(inv => {
            // console.log(inv)
            inv.assigned_to_username = inv.user && inv.user.name && inv.user.name;
            inv.action = (
                <div className="d-flex">
                    <i className="fa fa-pen bg-warning table-icon" onClick={() => editInventory(inv)}></i>
                    <i className="fa fa-trash bg-danger ml-3 table-icon" onClick={() => deleteInventory(inv)}></i>
                    <i className="fa fa-eye bg-success ml-3 table-icon" onClick={() => ViewHardwareHandler(inv)}></i>
                </div>)
        })
        setInventories(data)
    }, [inventoryList])

    const filterSubmitHandler = async (e) => {
        e.preventDefault();
        console.log($('#filter-inventory').serialize())
        let path = apipaths.softwareInventoryList
        path["url"] = path["url"] + "?" + $('#filter-inventory').serialize()
        let res = await getResponse(path);
        console.log(res)
    }


    const deleteInventory = async (inv) => {
        if (id === "software") {
            const { data } = await getResponse(apipaths.deleteInventorySoftware, { delete_id: inv.id })
            const { success, message } = data;
            if (success === 1 || success === 0) {
                toast.success(message)
                dispatch(inventoryListAction(id))
            }
        }
    }



    const submitHandler = async (formdata) => {
        let data = formdata;
        if (inventoryId) {
            data.operation = "update";
            data.id = inventoryId;
        } else
            data.operation = "add";

        if (id === "software")
            await getResponse(apipaths.addInventorySoftware, data);
        else
            await getResponse(apipaths.addInventoryHardware, data);
        dispatch(inventoryListAction(id))
        setModal(false)
    }

    const importTnventoryFileHandler = () => {
        setError("")
        const formdata = new FormData();
        formdata.append("file", inventoryFile)
        if (inventoryFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setIsModalVisible()
            getResponse(apipaths.importInventory, formdata)
        }

        else {
            setError("File type not allowed.")
        }
    }

    return (
        <>
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header flex justify-content-between">
                                        <div className="card-title">{id === "software" ? "Software" : "Hardware"} Inventory</div>
                                        <div className="d-flex">
                                            <button onClick={() => showModal()} className="btn btn-radius btn-info mr-3">Import Inventory</button>
                                            <button onClick={() => { window.open(inventoryList.exportUrl, '_blank').focus() }} className="btn btn-radius btn-info mr-3">Export Inventory</button>

                                            <button
                                                className="btn btn-outline-primary btn-radius"
                                                onClick={() => {
                                                    setModal(true)
                                                    setEditFormData({})
                                                    setInventoryId()
                                                }}>Add Inventory</button>
                                            <button className="btn btn-info btn-radius mx-3" onClick={() => $("#filter-inventory").slideToggle(300)}>
                                                More Filters
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">

                                        <form onSubmit={filterSubmitHandler} id="filter-inventory" className="mb-5">
                                            <div className="row mx-auto pt-3">
                                                <div className="col-md-12"><h4 className="fw-bold">Search Hardware Inventory</h4></div>
                                                <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Device Name</label>
                                                        </div>
                                                        <select className="form-control">
                                                            <option>Select Device</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Device Number</label>
                                                        </div>
                                                        <input name="number" type="text" className="form-control filter-input" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Brand</label>
                                                        </div>
                                                        <select className="form-control">
                                                            <option>Select Brand</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Modal</label>
                                                        </div>
                                                        <input name="name" type="text" className="form-control filter-input" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Serial Number</label>
                                                        </div>
                                                        <input name="name" type="text" className="form-control filter-input" />
                                                    </div>
                                                </div>

                                                {/* <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Floor</label>
                                                        </div>
                                                        <select className="form-control">
                                                            <option>Select Floor</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Section</label>
                                                        </div>
                                                        <select className="form-control">
                                                            <option>Select Section</option>
                                                        </select>
                                                    </div>
                                                </div> */}

                                                <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Assign To</label>
                                                        </div>
                                                        <select className="form-control">
                                                            <option>Select Assign To</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Status</label>
                                                        </div>
                                                        <select className="form-control">
                                                            <option>Select Status</option>
                                                            <option>Available</option>
                                                            <option>Available</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-lg-3 mt-3">
                                                    <div>
                                                        <div>
                                                            <label className="mb-2">Location</label>
                                                        </div>
                                                        <select className="form-control">
                                                            <option>Select Status</option>
                                                            <option>Not Available</option>
                                                            <option>Available</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-12 mt-3 text-right">
                                                    <button className="btn  btn-info btn-radius" type="submit">Save</button>
                                                    <button className="btn  btn-info btn-radius ml-3" onClick={() => $("#filter-inventory").slideToggle(300)} type="button">Close</button>
                                                </div>
                                            </div>
                                        </form>

                                        <MaterialTable
                                            title=""
                                            data={inventories}
                                            columns={columns}
                                            options={{ search: true, paging: true, exportButton: true }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            modal && (
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
                            )
                        }
                        <Modal title="Import Inventory" visible={isModalVisible} onOk={importTnventoryFileHandler} destroyOnClose onCancel={handleCancel}>
                            <div>
                                <form id="file-import-handler">
                                    <input type={"file"} className="form-control" onChange={(e) => setInventoryFile(e.target.files[0])} />
                                </form>
                                {error && (
                                    <p className="text-danger">{error}</p>
                                )}
                            </div>
                        </Modal>

                        <Modal title="Hardware Details" visible={isModal} onOk={ViewHardwareHandler} onCancel={handleViewModalCancel}>
                            <div className="">
                                <div>
                                    {
                                        hardwareInfo && hardwareInfo.map((hardware, index) => (
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
                                                    {/* <div className="col-6 p-2">
                                                        <span className="fw-bold">Section:</span>
                                                        <span className="margin">{hardware.section}</span>
                                                    </div> */}
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
                                                        <span className="margin">{hardware.assigned_to_username}</span>
                                                    </div>
                                                    <div className="col-6 p-2">
                                                        <span className="fw-bold">customID:</span>
                                                        <span className="margin">{hardware.customID}</span>
                                                    </div>
                                                    {/* <div className="col-6 p-2">
                                                        <span className="fw-bold">Floor:</span>
                                                        <span className="margin">{hardware.floor}</span>
                                                    </div> */}
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
                                        ))
                                    }
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HardwareInventory;