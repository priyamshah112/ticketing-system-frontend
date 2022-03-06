import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserLists } from "../../../actions/userActions";
import { apipaths } from "../../../api/apiPaths";
import { getResponse } from "../../../api/apiResponse";
import TextEditor from "../../TextEditor";
import { Modal } from "antd";

function AddTicket(props) {
  let form_data = new FormData();
  const [formdata, setFormdata] = useState({});
  const [process, setProcess] = useState(false);
  const [file, setFile] = useState({});
  const userList = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  const userType = JSON.parse(localStorage.user_details).userType;

  const { setTicketModal, onSubmit } = props;

  useEffect(() => {
    userListHandler();
  }, []);

  const userListHandler = async () => {
    const { data } = await getResponse(apipaths.listusers, null);
    const users = data.data.user;
    dispatch(getUserLists(users));
  };

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal
      title="Create Ticket"
      visible={props.ticketModal}
      // onOk={() => assignToSubmitHandler(false)}
      onCancel={() => setTicketModal(false)}
      footer={null}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { message, subject, assiged_to } = formdata;
          if (userType === 'User')
          {
            if(!message || !subject) {
              toast.error("All field are required.");
              setTicketModal(false);
              return null;
            }
          }
          else 
          {
            form_data.append("assiged_to", formdata.assiged_to);
            if (!message || !subject || !assiged_to) {
              toast.error("All field are required.");
              setTicketModal(false);
              return null;
            }
          }
          form_data.append("message", formdata.message);
          form_data.append("subject", formdata.subject);
          form_data.append("file", file);

          onSubmit(form_data);
          setProcess(true); 
        }}
      >
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
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
          {userType !== "User" && (
            <div className="col-lg-6 col-md-6 col-12">
              <label>
                Assigned To<span className="text-danger">*</span>
              </label>
              <select
                className="form-control"
                onChange={(e) =>
                  setFormdata({ ...formdata, assiged_to: e.target.value })
                }
              >
                <option value="">Choose One</option>

                {userList.map((user) => (
                  <option
                    className="text-capitalize"
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="col-lg-12 col-md-12 col-12 mt-4">
            <div>
              <label>Attachment</label>
              <input
                type={"file"}
                className="form-control"
                onChange={handleFileInput}
              />
            </div>
          </div>
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
              <input type="submit" className="btn btn-success" />
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
