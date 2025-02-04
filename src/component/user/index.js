import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddUser from './AddUser';
import { getResponse } from '../../api/apiResponse';
import { apipaths } from '../../api/apiPaths';
import { getUserLists } from '../../actions/userActions';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import { inventoryListAction } from '../../actions/inventoryAction';
import { Modal } from 'antd';
import $ from 'jquery';
import MaterialTable from 'material-table';
import { dateFormatHandler } from '../../actions/commonAction';
import { Tooltip } from '@material-ui/core';
import FilterComponent from '../inventory/reusableComponents/filters';
import './style.css';
import { Link } from 'react-router-dom';

function User(props) {
  const columns = [
    {
      title: 'ID ',
      field: 'id',
    },
    {
      title: 'Name',
      field: 'namewithemail',
    },
    {
      title: 'Status',
      field: 'status',
    },
    {
      title: 'Type',
      field: 'userType',
    },
    {
      title: 'Country',
      field: 'user_details.clientLocation',
    },
    {
      title: 'Added On',
      field: 'created_at',
    },
    {
      title: 'Inventory',
      field: 'inventory',
      width: '10%',
      sorting: false,
    },
    {
      title: 'Action',
      field: 'action',
      width: '10%',
      sorting: false,
    },
  ];
  const userList = useSelector((state) => state.userList);
  const userDetails = useSelector((state) => state.userDetails);
  const [isCreateUserModal, setIsCreateModal] = useState(false);
  const [operation, setOperation] = useState('');
  const [userImportFile, setUserImportFile] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState();
  const [userData, setUserData] = useState('');
  const [userInfo, setUserInfo] = useState([]);
  const [exportUrl, setExportUrl] = useState('');
  const [sampleImport, setSampleImport] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(userList);
  }, [userList]);

  useEffect(() => {
    dataHandler();
    $('#filter-user').slideToggle(0);
  }, []);

  useEffect(() => {
    if (isModalVisible) setError('');
  }, [isModalVisible]);

  const dataHandler = () => {
    getData();
    dispatch(inventoryListAction('software'));
    dispatch(inventoryListAction('hardware'));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getUserListData = async () => {
    const { data } = await getResponse(apipaths.listusers, null);
    setSampleImport(data.data.sampleImport);
    let users = data.data.user;
    users = usersAddMoreData(users);
    setExportUrl(data.data.exportUrl);
    dispatch(getUserLists(users));
  };

  const usersAddMoreData = (users) => {
    let data = users;
    data.map((user) => {
      user.created_at = dateFormatHandler(user.created_at);
      user.updated_at = new Date(user.updated_at).toDateString();

      user.namewithemail = (
        <div>
          <p className="username">
            {user.user_details?.firstName} {user.user_details?.middleName}{' '}
            {user.user_details?.lastName}
          </p>
          <span className="email">{user.email}</span>
        </div>
      );

      if (user.userType === "Co-Admin") {
        user.userType = "Co-Admin";
      }
      let userStatus = '';
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
          <Tooltip title="View User">
            <div>
              <i
                className="table-icon fa fa-eye bg-secondary text-white cursor-pointer mr-2"
                onClick={() => {
                  setOperation('view');
                  setIsCreateModal(true);
                  setUserInfo(user);
                }}
              ></i>
            </div>
          </Tooltip>
          <Tooltip title="Edit User">
            <div>
              <i
                className="table-icon fa fa-edit bg-warning text-white cursor-pointer mr-2"
                onClick={() => {
                  setOperation('update');
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
              <Link to={`${'/inventory/software/'}${user.id}`}>
              <i
                className="table-icon fas fa-laptop-code bg-secondary text-white cursor-pointer mr-2"
              ></i>
              </Link>
            </div>
          </Tooltip>
          <Tooltip title="view hardware inventories assigned">
            <div>
              <Link to={`${'/inventory/hardware/'}${user.id}`}>
              <i
                className="table-icon fa fa-laptop bg-secondary text-white cursor-pointer"
              ></i>
              </Link>
            </div>
          </Tooltip>
        </div>
      );
    });
    return data;
  };

  const getData = async () => {
    await getUserListData();
  };

  const createUserHandler = async (data, setFormdata) => {
    if (data == null || !data.firstName || !data.lastName || !data.email || !data.userType || !data.hireDate || !data.startDate || !data.hiredAs || !data.permanantAddress) {
      toast.warn("All * fields are mandatory.");
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

    setOperation('');
    setIsCreateModal(false);
  };

  const deleteUserHandler = async ({ id }) => {
    swal({
      title: 'Are you sure?',
      text: 'Press ok to delete this user!',
      icon: 'warning',
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

  const importUserFileHandler = async () => {
    setError('Importing file please wait');
    const formdata = new FormData();
    formdata.append('imports', userImportFile);
    if (
      userImportFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      userImportFile.type === 'application/vnd.ms-excel' || userImportFile.type === 'text/csv'
    ) {
      let { data, error } = await getResponse(apipaths.importUser, formdata);

      if (error && error.status_code === 301) {
        setError(error.message);
        return window.open(error.data.filePath, '_blank');
      }

      if (data.success) toast.success(data.message);
      else toast.error(data.message);

      setIsModalVisible();
      dataHandler();
    } else setError('File type not allowed.');
  };

  const filterSubmitHandler = async (e) => {
    e.preventDefault();
    let filterString = $("#filter-user-form :input[value!='']")
      .filter(function (index, element) {
        return $(element).val() != '';
      })
      .serialize();
    let path = {
      url: apipaths.listusers.url,
      method: apipaths.listusers.method,
    };
    path.url = path.url.split('?')[0] + '?' + filterString;
    let { data } = await getResponse(path);
    path = '';

    let users = data.data.user;
    users = usersAddMoreData(users);
    setUserData(users);
  };

  const handleFilterSearch = (val) => {
    const filteredData = userList?.filter(
      (item) =>
        item?.user_details?.firstName
          ?.toLowerCase()
          .includes(val.toLowerCase()) ||
        item?.user_details?.lastName
          ?.toLowerCase()
          .includes(val.toLowerCase()) ||
        item?.user_details?.middleName
          ?.toLowerCase()
          .includes(val.toLowerCase())
    );
    setUserData(filteredData);
  };

  const filterProps = {
    heading: 'User Management',
    exportFileName: 'users-list.csv',
    buttonOne: 'Add User',
    buttonOneHandler: () => {
      setOperation('add');
      setIsCreateModal(true);
    },

    buttonTwo: 'Import Users',
    buttonTwoHandler: () => {
      showModal();
    },
    filter: () => {
      $('#filter-user').slideToggle(300);
    },
    buttonThree: 'Export',
    inventories: userList,
    handleFilterSearch,
  };

  return (
    <div className="user__window">
      <FilterComponent {...{ ...filterProps }} />

      <div className="">
        <div className="card" id="filter-user">
          <div className="card-body">
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
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                      <option value="Co-Admin">Co-Admin</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-3 mt-3">
                  <div>
                    <label className="mb-2">Status</label>
                  </div>
                  <select className="form-control" name="status">
                    <option value={''}>Select Status</option>
                    <option value={'active'}>Active</option>
                    <option value={'pending'}>Pending</option>
                    <option value={'suspended'}>Suspended</option>
                  </select>
                </div>

                <div className="col-12 mt-3 text-right">
                  <button
                    className="btn btn-radius primary__save__button"
                    type="submit"
                  >
                    Search
                  </button>
                  <button
                    className="btn primary__cancel__button ml-3"
                    onClick={() => {
                      $('#filter-user-form').trigger('reset');
                      $('#filter-user').slideToggle(300);
                      let path = {
                        url: apipaths.listusers.url,
                        method: apipaths.listusers.method,
                      };
                      path.url = path.url.split('?')[0];
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

        <div className="user__table">
          <MaterialTable
            title=""
            data={userData}
            columns={columns}
            options={{
              search: false,
              pageSize: 20,
              pageSizeOptions: [10, 20, 50, 100, 250],
              emptyRowsWhenPaging: false,
              paging: true,
              exportButton: false,
            }}
          />
        </div>
      </div>

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
              type={'file'}
              className={'form-control'}
              onChange={(e) => setUserImportFile(e.target.files[0])}
            />
          </form>
          {error && <p className="text-danger">{error}</p>}
          <p>
            To download a sample import file&nbsp;
            <span
              className="text-primary cursor-pointer"
              onClick={() => window.open(sampleImport, '_blank')}
            >
              click here
            </span>
          </p>
        </div>
      </Modal>
      <Modal
        title={
          operation === 'view'
            ? 'View User'
            : operation === 'update'
            ? 'Edit User'
            : 'Create User'
        }
        visible={isCreateUserModal}
        onCancel={() => setIsCreateModal(false)}
        footer={null}
      >
        <AddUser
          onCancel={() => setIsCreateModal(false)}
          onSubmit={createUserHandler}
          operation={operation}
          userInfo={userInfo}
        />
      </Modal>
    </div>
  );
}

export default User;
