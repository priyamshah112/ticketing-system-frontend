import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { inventoryListAction } from '../../../actions/inventoryAction';
import { apipaths } from '../../../api/apiPaths';
import { getResponse } from '../../../api/apiResponse';
import AddInventoryForm from '../addInventoryForm';
import swal from 'sweetalert';
import { Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import $ from 'jquery';
import MaterialTable from 'material-table';
import {
  assignInventoryToUser,
  unassignInventory,
  dateFormatHandler,
} from '../../../actions/commonAction';
import { Tooltip } from '@material-ui/core';
import { getUserLists } from '../../../actions/userActions';
import { CSVLink } from 'react-csv';

function SoftwareInventory() {
  const parameters = useParams();
  let assInvFormData = new FormData();

  let id = 'software';
  const inventoryList = useSelector((state) => state.inventoryList);
  const [inventories, setInventories] = useState([]);
  const [modal, setModal] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [formData, setFormdata] = useState({});

  const [inventoryId, setInventoryId] = useState('');
  let columns = parameters.userid
    ? [
        {
          title: 'Software ID',
          field: 'id',
        },
        {
          title: 'Software Name',
          field: 'name',
        },
        {
          title: 'Version',
          field: 'version',
        },
        {
          title: 'User',
          field: 'assigned_to_username',
        },
        {
          title: 'Expiry Date',
          field: 'expiry_date',
        },
        {
          title: 'Action',
          field: 'action',
          sorting: false,
        },
      ]
    : [
        {
          title: 'Software ID',
          field: 'id',
        },
        {
          title: 'Software Name',
          field: 'name',
        },
        {
          title: 'Version',
          field: 'version',
        },
        {
          title: 'Status',
          field: 'status',
        },
        {
          title: 'User',
          field: 'assigned_to_username',
        },
        {
          title: 'Expiry Date',
          field: 'expiry_date',
        },
        {
          title: 'Action',
          field: 'action',
          sorting: false,
        },
      ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [softwareInfo, setSoftwareeInfo] = useState([]);
  const [inventoryFile, setInventoryFile] = useState('');
  const brands = ['HP', 'DELL'];
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const userList = useSelector((state) => state.userList);

  const [isAssignInventoryModal, setIsAssignInventoryModal] = useState(false);

  const [sampleImport, setSampleImport] = useState('');
  const assignInventoryModal = () => {
    setIsAssignInventoryModal(true);
  };

  const userListHandler = async () => {
    const { data } = await getResponse(apipaths.listusers, null);
    const users = data.data.user;
    dispatch(getUserLists(users));
  };

  const assignInventoryHandleOk = async () => {
    assInvFormData.append('user_id', parameters.userid);
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
    $('#filter-inventory-wrapper').slideToggle(0);
  }, [id]);

  const editInventory = (inventory, viewOnly) => {
    setEditFormData(inventory);
    if (viewOnly == 0) setEditForm(true);
    else setEditForm(false);
    setInventoryId(inventory.id);

    // console.log(editForm)
    setModal(true);
  };

  useEffect(() => {
    inventoryListDataModifier(inventoryList[id]);
    setSampleImport(inventoryList.softwareSampleImport);
  }, [inventoryList]);

  useEffect(() => {
    if (isModalVisible) setError('');
  }, [isModalVisible]);

  useEffect(() => {
    if (inventories.length > 0) {
      setUsername(inventories[0].user ? inventories[0].user.name : '');
    }
  }, [inventories]);

  const unassignedInventoryHandler = async (inv) => {
    swal({
      title: 'Are you sure?',
      text: `Press ok to Un-Assigned this inventory to ${username}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (val) => {
      if (val) {
        const { data } = await unassignInventory(inv, 'software');
        if (data.status_code === 200) {
          toast.success(data.message);
          dispatch(inventoryListAction(id));
          userListHandler();
        } else {
          toast.error('error in un-assigning the inventory.');
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
      inv.assigned_on =
        inv.assigned_on &&
        dateFormatHandler(new Date(inv.assigned_on).getTime());

      inv.expiry_date =
        inv.expiry_date &&
        dateFormatHandler(new Date(inv.expiry_date).getTime());

      inv.assigned_to_username = inv.user && inv.user.name && inv.user.name;
      let invStatus = '';
      // eslint-disable-next-line default-case
      switch (inv.status) {
        case 'Available':
          invStatus = (
            <div className="status status-active">
              <span></span> Available
            </div>
          );
          break;
        case 'Not Available':
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
                  onClick={() => unassignedInventoryHandler(inv, 'hardware')}
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
        return $(element).val() != '';
      })
      .serialize();
    let path = apipaths.softwareInventoryList;
    path['url'] = path['url'].split('?')[0] + '?' + elem;
    let { data, error } = await getResponse(path, formData);
    if (error) return toast.warn('Error in listing tickets.');

    inventoryListDataModifier(data.data.inventory);
  };

  const deleteInventory = async (inv) => {
    if (id === 'software') {
      swal({
        title: 'Are you sure?',
        text: 'Press ok to Delete this software inventory',
        icon: 'warning',
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

  const importTnventoryFileHandler = async () => {
    setError('Importing file please wait');
    const formdata = new FormData();
    formdata.append('file', inventoryFile);
    if (
      inventoryFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      inventoryFile.type === 'application/vnd.ms-excel'
    ) {
      let { data, error } = await getResponse(
        apipaths.importInventory,
        formdata
      );

      if (error && error.status_code === 301) {
        setError(error.message);
        return window.open(error.data.filePath, '_blank');
      }

      if (data.success) toast.success(data.message);
      else toast.error(data.message);

      setIsModalVisible();
      userListHandler();
    } else {
      setError('File type not allowed.');
    }
  };

  const assignInventoryHandler = (inventoryId) => {
    assInvFormData.append('software_ids[]', inventoryId);
  };

  return (
    <React.Fragment>
      <div className="panel-header bg-secondary-gradient">
        <div className="page-inner py-5">
          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
            <div>
              <h2 className="text-white pb-2 fw-bold">
                {id === 'software' ? 'Software' : 'Hardware'}
                {parameters.userid && username && '( ' + username + ' )'}{' '}
                Inventory
              </h2>
              <h5 className="text-white op-7 mb-2">
                Manage Your Software Inventory
              </h5>
            </div>
            <div className="ml-md-auto py-2 py-md-0">
              {parameters.userid ? (
                <button
                  className="btn btn-round btn-primary mr-3"
                  onClick={assignInventoryModal}
                >
                  Assign Inventory
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-white btn-border btn-round mr-2"
                    onClick={() =>
                      $('#filter-inventory-wrapper').slideToggle(300)
                    }
                  >
                    Filters
                  </button>
                  <button
                    onClick={() => showModal()}
                    className="btn btn-round btn-primary mr-2"
                  >
                    Import Software
                  </button>
                  <CSVLink
                    data={inventories}
                    filename={'Software-inventory-list.csv'}
                    className="btn btn-round btn-primary mr-2"
                    target="_blank"
                  >
                    Export Software
                  </CSVLink>

                  <button
                    className="btn btn-primary btn-round"
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
      <div className="page-inner mt--5">
        <div className="card" id="filter-inventory-wrapper">
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
                <div className="form-group col-12 col-md-6 col-lg-4">
                  <label className="mb-2">Software Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control filter-input"
                    onChange={(e) => {
                      setFormdata({
                        ...formData,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-group col-12 col-md-6 col-lg-4">
                  <label className="mb-2">Version</label>
                  <input
                    name="version"
                    type="text"
                    className="form-control filter-input"
                    onChange={(e) => {
                      setFormdata({
                        ...formData,
                        version: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="form-group col-12 col-md-6 col-lg-4">
                  <label className="mb-2">User</label>
                  <select
                    className="form-control"
                    name="assigned_to"
                    value={formData?.assigned_to}
                    onChange={(e) => {
                      setFormdata({
                        ...formData,
                        assignTo: e.target.value,
                      });
                    }}
                  >
                    <option value={''}>Select User</option>
                    {userList &&
                      userList.map((user) => (
                        <option value={user.id}>
                          {user?.user_details?.firstName}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-4">
                  <label className="mb-2">Status</label>
                  <select
                    className="form-control"
                    name="status"
                    value={formData?.status}
                    onChange={(e) => {
                      setFormdata({
                        ...formData,
                        status: e.target.value,
                      });
                    }}
                  >
                    <option value="">Select Status</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-4">
                  <label className="mb-2">Expiry Date</label>
                  <input
                    type={'date'}
                    name="expiry_date"
                    className="form-control"
                    onChange={(e) => {
                      setFormdata({
                        ...formData,
                        expiry_date: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="col-12 mt-3 text-right">
                  <button className="btn  btn-info btn-radius" type="submit">
                    Search
                  </button>
                  <button
                    className="btn  btn-info btn-border ml-3"
                    onClick={() => {
                      let apipath = apipaths.softwareInventoryList;
                      apipath['url'] = apipath['url'].split('?')[0];
                      $('#filter-inventory').trigger('reset');
                      $('#filter-inventory-wrapper').slideToggle(300);
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
                    (inv) => !inv.assigned_to && <option>{inv.version}</option>
                  )}
              </select>
            </div>
          </div>
        </form>
      </Modal>
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
              type={'file'}
              className="form-control"
              onChange={(e) => setInventoryFile(e.target.files[0])}
            />
          </form>
          <p>
            To download a sample import file&nbsp;
            <span
              className="text-primary cursor-pointer"
              onClick={() => window.open(sampleImport, '_blank')}
            >
              click here
            </span>
          </p>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </Modal>
      <Modal
        title={inventoryId ? 'Update Inventory' : 'Add Inventory'}
        visible={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <AddInventoryForm
          type={id}
          isOpen={setModal}
          editFormData={editFormData}
          inventoryId={inventoryId}
          userList={userList}
          editForm={editForm}
          brands={brands}
        />
      </Modal>
    </React.Fragment>
  );
}

export default SoftwareInventory;
