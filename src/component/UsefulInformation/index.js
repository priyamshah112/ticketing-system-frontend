import React, { useEffect, useState } from 'react';
import { getResponse } from '../../api/apiResponse';
import { apipaths } from '../../api/apiPaths';
import { toast } from 'react-toastify';
import UsefulIModal from './UsefulIModal';
import MaterialTable from 'material-table';
import { dateFormatHandler } from '../../actions/commonAction';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import fileImage from "../assets/file.png"
import swal from 'sweetalert';
import './index.css';
import FilterComponent from '../inventory/reusableComponents/filters';

function UsefulInformation(props) {
  const [uiModal, setUIModal] = useState(false);
  const [uiMasterData, setUIMasterData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [uiFilterData, setUIFilterData] = useState([]);
  const [modalCode, setModalCode] = useState(0);
  const [editFormData, setEditFormData] = useState({});
  const [uiId, setUIId] = useState('');
  const userType = JSON.parse(localStorage.user_details).userType;

  const columns = userType !== 'User' ? [
    {
      title: 'ID',
      field: 'id',
    },
    {
      title: 'Subject',
      field: 'subject',
    },
    {
      title: 'Category',
      field: 'category',
    },
    {
      title: 'Link',
      field: 'customlink',
    },
    {
      title: 'Attachment',
      field: 'customfile',
    },
    {
      title: 'Created At',
      field: 'created_at',
    },
    {
      title: 'Action',
      field: 'action',
      sorting: false,
    },
  ] : [
    {
      title: 'ID',
      field: 'id',
    },
    {
      title: 'Subject',
      field: 'subject',
    },
    {
      title: 'Category',
      field: 'category',
    },
    {
      title: 'Link',
      field: 'customlink',
    },
    {
      title: 'Attachment',
      field: 'customfile',
    },
    {
      title: 'Created At',
      field: 'created_at',
    },
  ];

  useEffect(() => {
    getUsefulInformations();
  }, []);


  const getUsefulInformations = async () => {
    const { data, error } = await getResponse(apipaths.uiList);
    if (error) return toast.warn('Error in listing Useful Information.');
    console.log(data);
    data.data.usefulInformations.map((ui) => {
      ui.created_at = dateFormatHandler(ui.created_at);
      ui.customlink = ui.link !== undefined && ui.link !== null && ui.link !== '' ? (
        <a
          href={ui.link}
          class="other-attachment"
          shape="round"
          size="small"
          target="_blank"
      >
        {ui.link}
      </a>
      ) : '';
      ui.customfile = ui.file !== undefined && ui.file !== null && ui.file !== '' ? (
        <a
          href={`${process.env.REACT_APP_BASE_URL}${ui.file}`}
          class="other-attachment"
          shape="round"
          size="small"
          download
          target="_blank"
      >
        <img src={fileImage} />
      </a>
      ) : '';
      ui.action = (
        <div className="text-center d-flex justify-content-center">
          <Tooltip title="View Useful Information">
            <div>
              <i
                className="fa fa-eye bg-secondary ml-3 table-icon"
                onClick={() => openModel(ui, 1)}
              ></i>
            </div>
          </Tooltip>
          <Tooltip title="Edit Useful Information">
            <div>
              <i
                className="fa fa-pen bg-warning ml-2 table-icon"
                onClick={() => openModel(ui, 2)}
              ></i>
            </div>
          </Tooltip>
          <Tooltip title="Delete Useful Information">
            <div>
              <i
                className="fa fa-trash bg-danger ml-2  table-icon"
                onClick={() => deleteUI(ui)}
              ></i>
            </div>
          </Tooltip>
        </div>
      );
    });
    setUIMasterData(data.data.usefulInformations);
  };


  const onSubmit = async (ui) => {
    const data = await getResponse(apipaths.addUI, ui);
    if (data.status === 200) {
      toast.success(data.data.message);
      getUsefulInformations();
      setUIModal(false);
    } else {
      toast.error(data.data.message);
    }
  };

  const openModel = (ui, code) => {
    setModalCode(code)
    setEditFormData(ui);
    if(ui !== null)
    {
      setUIId(ui.id);
    }
    setUIModal(true);
  };

  const deleteUI = async (ui) => {
    swal({
      title: 'Are you sure?',
      text: 'Press ok to delete this Useful Information',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (val) => {
      if (val) {
        const { data } = await getResponse(apipaths.deleteUI, {
          delete_id: ui.id,
        });
        const { success, message } = data;
        if (success) {
          toast.success(<div className="text-capitalize">{message}</div>);
          getUsefulInformations();
        }
      }
    });
  };

  const handleFilterSearch = (val) => {
    setSearchValue(val);
    const filteredData = uiMasterData?.filter((item) =>
      item?.subject?.toLowerCase().includes(val.toLowerCase())
    );
    setUIFilterData(filteredData);
  };

  const filterProps = userType !== 'User' ? {
    heading: 'Useful Informations',
    buttonOne: 'Add Useful Information',
    filterEnableButton: false,
    buttonOneHandler: () => {
      openModel({}, 0);
    },
    handleFilterSearch,
  } : {
    heading: 'Useful Informations',
    filterEnableButton: false,
    handleFilterSearch,
  };

  const useStyles = makeStyles({
    toolbarWrapper: {
      '& .MuiToolbar-gutters': {
        paddingLeft: 0,
        paddingRight: 0,
        fontFamily: 'Rubik',
        fontSize: ' 24px',

        lineHeight: '28px',

        color: '#2D3142',
      },
    },
  });

  const classes = useStyles();

  return (
    <div className={userType !== 'User' ? "ui__window" : "user__ui__window"}>
      <FilterComponent {...{ ...filterProps }} />

      <div className="ui__table">
        <MaterialTable
          className={classes.toolbarWrapper}
          title=""
          data={ searchValue !== '' ? uiFilterData : uiMasterData}
          columns={columns}
          disableGutters={true}
          options={{
            search: false,
            paging: true,
            pageSize: 20,
            pageSizeOptions: [10, 20, 50, 100, 250],
            showTitle: false,

            emptyRowsWhenPaging: false,
            exportButton: false,
          }}
        />
      </div>

      <div className="">
        {uiModal && (
          <UsefulIModal
            setUIModal={setUIModal}
            editFormData={editFormData}
            modalCode = {modalCode}
            uiId={uiId}
            uiModal={uiModal}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default UsefulInformation;
