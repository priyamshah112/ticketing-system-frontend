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
  const form_data = new FormData();
  const [formdata, setFormdata] = useState({
    priority: 'low',
  });
  const [process, setProcess] = useState(false);
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
      (result) => result.userType === "Support"
    ); 
    setUSerListOnCoAdmin(userListOnCoAdmin);
  }, [userList]);
 
  const userListHandler = async () => {
    const { data } = await getResponse(apipaths.listusers, null);
    let userOptions = [];
    data.data?.user.map((user) => {
      if(user.userType === "Support")
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
    form_data.delete('files[]');
    for (let i = 0; i < (e.target.files).length; i++)
    {
      form_data.append("files[]", e.target.files[i]);
    }
    console.log("Hitted files");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const { message, subject, assigned_to, priority } = formdata;
    if (userType === "User") {
      if (!message || !subject) {
        toast.error("All field are required.");
        setTicketModal(false);
        return null;
      }
    } else {
      form_data.append("assigned_to", selectedOption?.value);
      if (!message || !subject || !selectedOption?.value || !priority) {
        toast.error("All field are required.");
        setTicketModal(false);
        return null;
      }
    }

    form_data.append("message", formdata.message);
    form_data.append("subject", formdata.subject);
    form_data.append("priority", formdata.priority);

    onSubmit(form_data);
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
                setFormdata({ ...formdata, subject: e.target.value })
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
                setFormdata({ ...formdata, subject: e.target.value })
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
                  setFormdata({ ...formdata, priority: e.target.value })
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
              onChange={(e) => setFormdata({ ...formdata, message: e })}
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
