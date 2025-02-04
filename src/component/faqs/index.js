import React, { useEffect, useState } from 'react';
import { getResponse } from '../../api/apiResponse';
import { apipaths } from '../../api/apiPaths';
import { toast } from 'react-toastify';
import FaqModal from './FaqModal';
import MaterialTable from 'material-table';
import { dateFormatHandler } from '../../actions/commonAction';
import { Tooltip } from '@material-ui/core';
import FilterComponent from '../inventory/reusableComponents/filters';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import './index.css';

function Faqs(props) {
  const [faqModal, setFaqModal] = useState(false);
  const [faqsMasterData, setFaqMasterData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [faqsFilterData, setFaqFilterData] = useState([]);
  const [modalCode, setModalCode] = useState(0);
  const [editFormData, setEditFormData] = useState({});
  const [faqId, setFaqId] = useState('');
  const userType = JSON.parse(localStorage.user_details).userType;

  const columns = userType !== 'User' ? [
    {
      title: 'ID',
      field: 'id',
    },
    {
      title: 'Question',
      field: 'question',
    },
    {
      title: 'Answer',
      field: 'answer',
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
      title: 'Question',
      field: 'question',
    },
    {
      title: 'Answer',
      field: 'answer',
    },
    {
      title: 'Created At',
      field: 'created_at',
    },
  ];

  useEffect(() => {
    getFaqs();
  }, []);


  const getFaqs = async () => {
    const { data, error } = await getResponse(apipaths.faqList);
    if (error) return toast.warn('Error in listing faq.');
    data.data.faqs.map((faq) => {
      faq.created_at = dateFormatHandler(faq.created_at);

      faq.action = (
        <div className="text-center d-flex justify-content-center">
          <Tooltip title="View Faq">
            <div>
              <i
                className="fa fa-eye bg-secondary ml-3 table-icon"
                onClick={() => openModel(faq, 1)}
              ></i>
            </div>
          </Tooltip>
          <Tooltip title="Edit Faq">
            <div>
              <i
                className="fa fa-pen bg-warning ml-2 table-icon"
                onClick={() => openModel(faq, 2)}
              ></i>
            </div>
          </Tooltip>
          <Tooltip title="Delete Faq">
            <div>
              <i
                className="fa fa-trash bg-danger ml-2  table-icon"
                onClick={() => deleteFaq(faq)}
              ></i>
            </div>
          </Tooltip>
        </div>
      );
    });
    setFaqMasterData(data.data.faqs);
  };


  const onSubmit = async (faq) => {
    const data = await getResponse(apipaths.addFaq, faq);
    if (data.status === 200) {
      toast.success(data.data.message);
      getFaqs();
      setFaqModal(false);
    } else {
      toast.error(data.data.message);
    }
  };

  const openModel = (faq, code) => {
    setModalCode(code)
    setEditFormData(faq);
    if(faq !== null)
    {
      setFaqId(faq.id);
    }
    setFaqModal(true);
  };

  const deleteFaq = async (faq) => {
    swal({
      title: 'Are you sure?',
      text: 'Press ok to Delete this faq',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (val) => {
      if (val) {
        const { data } = await getResponse(apipaths.deleteFaq, {
          delete_id: faq.id,
        });
        const { success, message } = data;
        if (success) {
          toast.success(<div className="text-capitalize">{message}</div>);
          getFaqs();
        }
      }
    });
  };

  const handleFilterSearch = (val) => {
    setSearchValue(val);
    const filteredData = faqsMasterData?.filter((item) =>
      item?.question?.toLowerCase().includes(val.toLowerCase())
    );
    setFaqFilterData(filteredData);
  };

  const filterProps = userType !== 'User' ? {
    heading: 'Faqs',
    buttonOne: 'Add Faq',
    filterEnableButton: false,
    buttonOneHandler: () => {
      openModel({}, 0);
    },
    handleFilterSearch,
  } :  {
    heading: 'Faqs',
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
    <div className={userType !== 'User' ? "faqs__window" : "user__faqs__window"}>
      <FilterComponent {...{ ...filterProps }} />

      <div className="faqs__table">
        <MaterialTable
          className={classes.toolbarWrapper}
          title=""
          data={ searchValue !== '' ? faqsFilterData : faqsMasterData}
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
        {faqModal && (
          <FaqModal
            setFaqModal={setFaqModal}
            editFormData={editFormData}
            modalCode = {modalCode}
            faqId={faqId}
            faqModal={faqModal}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default Faqs;
