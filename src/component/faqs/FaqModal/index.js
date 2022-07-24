import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Modal } from "antd";

function FaqModal(props) {
  const [faqForm, setFaqForm] = useState({});
  const [process, setProcess] = useState(false);
  const [title, setTitle] = useState('')

  const { 
    setFaqModal, 
    onSubmit,
    modalCode = 0,
    editFormData = {},
    faqId
  } = props;

  useEffect(() => {
    if(modalCode === 0){
      setTitle('Create Faq');
    }
    else if(modalCode === 1)
    {
      setTitle('View Faq');
    }
    else if(modalCode === 2)
    {
      setTitle('Update Faq');
    }
  },[modalCode]);

  useEffect(() => {
    setFaqForm(editFormData);
  },[editFormData]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    const { question, answer } = faqForm;

    if (!question || !answer) {
      toast.error("All field are required.");
      return null;
    }

    formdata.append("question", faqForm.question);
    formdata.append("answer", faqForm.answer);
    if(modalCode === 0){
      formdata.append('operation', 'add');
    }
    else if(2)
    {
      formdata.append('id', faqId);
      formdata.append('operation', 'update');
    }

    onSubmit(formdata);
    setProcess(true);
  }

  return (
    <Modal
      title= { title }
      visible={props.faqModal}
      onCancel={() => setFaqModal(false)}
      footer={null}
    >
      <form
        onSubmit={submitHandler}
      >
        <div className="row">
          <div className="col-12">
            <label>
              Question <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              value={faqForm.question ? faqForm.question : ''}
              onChange={(e) =>
                setFaqForm({ ...faqForm, question: e.target.value })
              }
              disabled={modalCode == 1 ? "disabled" : ""}
            />
          </div>

          <div className="col-lg-12 col-md-12 col-12 mt-4">
            <label>
              Answer <span className="text-danger">*</span>
            </label>
            <textarea 
              rows="10" 
              className="form-control" 
              onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} 
              value={faqForm.answer ? faqForm.answer : ''}
            ></textarea>
          </div>          
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
                onClick={() => setFaqModal(false)}
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          {process && <p>Please Wait ...</p>}
        </div>
      </form>
    </Modal>
  );
}

export default FaqModal;
