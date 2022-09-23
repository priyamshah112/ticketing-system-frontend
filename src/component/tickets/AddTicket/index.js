import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserLists } from "../../../actions/userActions";
import { apipaths } from "../../../api/apiPaths";
import { getResponse } from "../../../api/apiResponse";
import TextEditor from "../../TextEditor";
import { Modal } from "antd";
import Select from 'react-select';

function AddTicket(props) {
  const [ticketForm, setTicketForm] = useState({
    priority: 'low',
  });
  const [process, setProcess] = useState(false);
  const [files, setFiles] = useState([]);
  const [userListOnCoAdmin, setUSerListOnCoAdmin] = useState([]);
  const userList = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  const userType = JSON.parse(localStorage.user_details).userType;
  const [selectedOption, setSelectedOption] = useState([]);
  const [users, setUsers] = useState([]);

  const { setTicketModal, onSubmit } = props;

  useEffect(() => {
    userListHandler();
  }, []);

  useEffect(() => {
    let userListOnCoAdmin = userList?.filter(
      (result) => result.userType === "Co-Admin"
    ); 
    setUSerListOnCoAdmin(userListOnCoAdmin);
  }, [userList]);
 
  const userListHandler = async () => {
    const { data } = await getResponse(apipaths.listusers, null);
    let userOptions = [];
    data.data?.user.map((user) => {
      if(user.userType === "Co-Admin")
      {
        userOptions.push({
          value: user.user_details?.id,
          label: user.user_details?.firstName + " " + user.user_details?.lastName
        })
      }     
    });
    setUsers(userOptions);
    // dispatch(getUserLists(users));
  };

  const fileHandler = (e) => {
    setFiles([]);
    for (let i = 0; i < (e.target.files).length; i++)
    {
      setFiles([...files,e.target.files[i]]);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    const { message, subject, assigned_to, priority } = ticketForm;
    if (userType === "User") {
      if (!message || !subject) {
        toast.error("All field are required.");
        return null;
      }
    } else {
      formdata.delete("assigned_to");
      formdata.append("assigned_to", selectedOption?.value);
      if (!message || !subject || !selectedOption?.value || !priority) {
        toast.error("All field are required.");
        return null;
      }
    }

    formdata.append("message", ticketForm.message);
    formdata.append("subject", ticketForm.subject);
    formdata.append("priority", ticketForm.priority);
    files.map((file) => {
      formdata.append("files[]", file);
    })

    onSubmit(formdata);
    setProcess(true);
  }

  var options = [];
  {
    userListOnCoAdmin.map((user) => (

      options.push[{
        value: user.id,
        label: user.name
      }]

    ))
  }
  return (
    <Modal
      title="Create Ticket"
      visible={props.ticketModal}
      // onOk={() => assignToSubmitHandler(false)}
      onCancel={() => setTicketModal(false)}
      footer={null}
    >
      <form
        onSubmit={submitHandler}
      >
        <div className="row">
          {userType !== "User" && (<div className="col-lg-6 col-md-6 col-12">
            <label>
              Subject<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                setTicketForm({ ...ticketForm, subject: e.target.value })
              }
            />
          </div>
          )}
          {userType == "User" && (<div className="col-lg-12 col-md-12 col-12">
            <label>
              Subject<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) =>
                setTicketForm({ ...ticketForm, subject: e.target.value })
              }
            />
          </div>
          )}
          {userType !== "User" && (
            <div className="col-lg-6 col-md-6 col-12">


              <label>
                Assigned To<span className="text-danger">*</span>
              </label>
              <Select 
                  name="assigned_to"
                  options={users}
                  className="w-100"
                  onChange={(value) => {
                    setSelectedOption(value);
                  }}
                  value={selectedOption}
                  required
                />
            </div>
          )}

          <div className="col-lg-6 col-md-6 col-12 mt-4">
            <div>
              <label>Attachment</label>
              <input
                type={"file"}
                className="form-control"
                onChange={fileHandler}
                multiple
              />
            </div>
          </div>

          {
            userType !== "User" ? <div className="col-lg-6 col-md-6 col-12 mt-4">
              <label>
                Priority<span className="text-danger">*</span>
              </label>
              <select
                className="form-control"
                onChange={(e) =>
                  setTicketForm({ ...ticketForm, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div> : ''
          }

          <div className="col-lg-12 col-md-12 col-12 mt-4">
            <lable>
              Message<span className="text-danger">*</span>
            </lable>
            <TextEditor
              onChange={(e) => setTicketForm({ ...ticketForm, message: e })}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="mt-4">
              <input type="submit" className="btn submit-btn" />
              <input
                type="button"
                value="Close"
                className="btn btn-danger ml-4"
                onClick={() => setTicketModal(false)}
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          {process && <p>Creating Ticket Please Wait</p>}
        </div>
      </form>
    </Modal>
  );
}

export default AddTicket;
