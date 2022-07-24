import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Modal } from "antd";
import fileImage from "../../assets/file.png"

function UsefulIModal(props) {
  const [uiForm, setUIForm] = useState({
    category: 'link',
  });
  const [waitMsg, setWaitMsg] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('')

  const { 
    setUIModal, 
    onSubmit,
    modalCode = 0,
    editFormData = {},
    uiId
  } = props;

  useEffect(() => {
    if(modalCode === 0){
      setTitle('Create Useful Information');
    }
    else if(modalCode === 1)
    {
      setTitle('View Useful Information');
    }
    else if(modalCode === 2)
    {
      setTitle('Update Useful Information');
    }
  },[modalCode]);

  useEffect(() => {
    setUIForm(editFormData);
  },[editFormData]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    const { subject, category, link = '' } = uiForm;
    
    if (!subject || !category || (category === 'link' && link === '') || (category === 'file' && file === null)) {
      toast.error("All field are required.");
      return null;
    }

    formdata.append("subject", uiForm.subject);
    formdata.append("category", uiForm.category);
    formdata.append("link", uiForm.link ? uiForm.link : '');
    if(file !== null) formdata.append("file", file);

    if(modalCode === 0){
      formdata.append('operation', 'add');
    }
    else if(2)
    {
      formdata.append('id', uiId)
      formdata.append('operation', 'update');
    }

    onSubmit(formdata);
    setWaitMsg(true);
  }

  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <Modal
      title= { title }
      visible={props.uiModal}
      onCancel={() => setUIModal(false)}
      footer={null}
    >
      <form
        onSubmit={submitHandler}
      >
        <div className="row">
          <div className="col-12">
            <label>
              Subject <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={uiForm.subject ? uiForm.subject : ''}
              onChange={(e) =>
                setUIForm({ ...uiForm, subject: e.target.value })
              }
              disabled={modalCode == 1 ? "disabled" : ""}
            />
          </div>

          <div className="col-12 mt-4">
            <label>
              Category <span className="text-danger">*</span>
            </label>
            <select 
              className="form-control" 
              value={uiForm.category ? uiForm.category : ''}
              onChange={(e) => {
                setUIForm({ ...uiForm, category: e.target.value})}
              }
              disabled={modalCode == 1 ? "disabled" : ""}
            >
              <option value="">Select Category</option>
              <option value="link">Link</option>
              <option value="file">File</option>
            </select>
          </div>
          {
            uiForm.category ===  'link' && (
            <div className="col-12 mt-4">
              <label>
                Link <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={uiForm.link ? uiForm.link : ''}
                onChange={(e) =>
                  setUIForm({ ...uiForm, link: e.target.value })
                }
                disabled={modalCode == 1 ? "disabled" : ""}
              />
            </div>
          )
          }
          {
            uiForm.category === 'file' && modalCode !== 1 && (
            <div className="col-12 mt-4">
              <label>
                File <span className="text-danger">*</span>
              </label>
              <input
                type="file"
                className="form-control"
                onChange={fileHandler}
                accept="application/pdf"
              />
            </div>
          )
          }

          {
            uiForm.category === 'file' && modalCode === 1 && (
              <div className="col-12 mt-4">
                <label> Attached File </label>
                <a
                    href={`${process.env.REACT_APP_BASE_URL}${uiForm.file}`}
                    class="other-attachment"
                    shape="round"
                    size="small"
                    download
                    target="_blank"
                >
                  <img src={fileImage} />
                </a>
              </div>
            )
          }

          <div className="col-lg-6 col-md-6 col-12">
            <div className="mt-4">
              {
              modalCode !== 1 && (
              <button type="submit" className="btn submit-btn"> {modalCode == 0 ? 'Submit' : 'Update'}</button>
              )
              }
              <input
                type="button"
                value="Close"
                className={modalCode !== 1 ? "btn btn-danger ml-4" : "btn btn-danger"}
                onClick={() => setUIModal(false)}
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          {waitMsg && <p>Please Wait ...</p>}
        </div>
      </form>
    </Modal>
  );
}

export default UsefulIModal;
