import React, { useEffect, useState } from 'react';
import { roleListAction } from '../../actions/roleAction';
import { useDispatch, useSelector } from 'react-redux';
import RoleForm from '../forms/roleForm';
import { getResponse } from '../../api/apiResponse';
import { apipaths } from '../../api/apiPaths';
import swal from 'sweetalert';
import { toast } from 'react-toastify';
import MaterialTable from 'material-table';
import { Modal } from 'antd';
import $ from 'jquery';
import { Tooltip } from '@material-ui/core';
import FilterComponent from '../inventory/reusableComponents/filters';
import './style.css';

function Roles() {
  const roles = useSelector((state) => state.roles);
  const [operation, setOperation] = useState('add');
  const [roleModal, setRoleModal] = useState(false);
  const [roleList, setRoleList] = useState(false);
  const [roleid, setRoleid] = useState('');
  const [role, setRole] = useState('');
  const columns = [
    {
      title: 'ID',
      field: 'id',
      width: '10%',
    },
    {
      title: 'Name',
      field: 'role_name',
    },
    // {
    //     title: "Role Access",
    //     field: "role_access_string",
    // },
    {
      title: 'Created At',
      field: 'created_at',
    },
    {
      title: 'Updated At',
      field: 'updated_at',
    },
    {
      title: 'Action',
      field: 'action',
      sorting: false,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(roleListAction());
    $('#filter-role').slideToggle(0);
  }, []);

  useEffect(() => {
    if (roles) {
      roles.map((r, i) => {
        r.action = (
          <div className="" key={{ i }}>
            <Tooltip title="Edit Role">
              <i
                className="table-icon fas fa-pen pr-3 bg-warning mr-2"
                onClick={() => editRoleHandler(r)}
              ></i>
            </Tooltip>
            <Tooltip title="Delete Role">
              <i
                className="table-icon fas fa-trash pr-3 bg-danger"
                onClick={() => deleteRoleHandler(r)}
              ></i>
            </Tooltip>
          </div>
        );
      });
      setRoleList(roles);
    }
  }, [roles]);

  const deleteRoleHandler = async (r) => {
    // deleterole
    swal({
      title: 'Are you sure?',
      text: 'Press ok to Delete this role!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (val) => {
      if (val === true) {
        const { status, data } = await getResponse(apipaths.deleterole, {
          delete_id: r.id,
          enable: 0,
        });
        if (status === 200) toast.success(data.message);
        dispatch(roleListAction());
      }
    });
  };

  const submitHandler = async (role) => {
    if (!role.role_name) {
      setRoleModal(false);
      return toast.warning('Role Name are required.');
    }

    if (operation === 'add') {
      role['operation'] = 'add';
      await getResponse(apipaths.addrole, role);
    } else {
      role['operation'] = 'update';
      role['id'] = roleid;
      await getResponse(apipaths.addrole, role);
      setRoleid('');
    }

    setRoleModal(false);
    dispatch(roleListAction());
  };

  const roleHandler = (action) => {
    setRoleid('');
    setRole('');
    if (action === 'add') {
      setOperation(action);
    } else {
      setOperation('action');
    }

    setRoleModal(true);
  };

  const editRoleHandler = (data) => {
    setOperation('update');
    let role = {};
    role.id = data['id'];
    role.role_name = data['role_name'];
    role.operation = 'update';
    role.access = data['role_access'].map((access) => {
      return {
        manager_id: access.manager_id,
        mode: access.mode,
      };
    });
    setRoleid(role.id);
    setRole(role);
    setRoleModal(true);
    setTimeout(() => {
      checkSelectedRoleAccess(data);
    }, [500]);
  };

  const checkSelectedRoleAccess = (data) => {
    data['role_access'].map((access) => {
      const { manager } = access;
      if (manager) {
        switch (manager.manager_name) {
          case 'Users':
            $(`#manager_1`).prop('checked', true);
            break;
          case 'Tickets':
            $(`#manager_2`).prop('checked', true);
            break;
          case 'Inventory':
            $(`#manager_3`).prop('checked', true);
            break;
          default:
            return null;
        }
      }
    });
  };

  const handleFilterSearch = (val) => {
    const filteredData = roles?.filter((item) =>
      item?.role_name?.toLowerCase().includes(val.toLowerCase())
    );
    setRoleList(filteredData);
  };

  const filterProps = {
    heading: 'User Roles',
    filterEnableButton: false,
    handleFilterSearch,
  };
  return (
    <div className="roles__window">
      <FilterComponent {...{ ...filterProps }} />

      <div className="roles__table">
        <MaterialTable
          title=""
          data={roleList}
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

      <Modal
        title={operation === 'add' ? 'Add Role' : 'Update Role'}
        onCancel={() => setRoleModal(false)}
        visible={roleModal}
        footer={null}
      >
        <RoleForm
          submitHandler={submitHandler}
          setModal={setRoleModal}
          roleid={roleid}
          urole={role}
        />
      </Modal>
    </div>
  );
}

export default Roles;
