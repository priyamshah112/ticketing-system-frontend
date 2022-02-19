import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import TextEditor from "../TextEditor";
import { Select } from "antd";
import { getResponse } from "../../api/apiResponse";
import { apipaths } from "../../api/apiPaths";
import $ from "jquery";
import { toast } from "react-toastify";

function FaqAdmin(props) {
  const { getData, editFaqInfo, faqCategories } = props;
  const [operation, setOperation] = useState("add");
  const [faqModal, setFaqModal] = useState(false);
  const [formdata, setFormdata] = useState({
    question: "",
    answer: "",
    category: "",
  });
  const { Option } = Select;

  useEffect(() => {
    if (editFaqInfo && editFaqInfo.id) {
      setOperation("update");
      setFormdata(editFaqInfo);
      $("#faq-categories").attr("devaultValue", "c");
      setFaqModal(true);
    } else {
      setOperation("add");
      setFormdata({
        question: "",
        answer: "",
        category: "",
      });
      setFaqModal(false);
    }
  }, [editFaqInfo]);

  const addFaqBtn = () => {
    setOperation("add");
    setFormdata({
        question: "",
        answer: "",
        category: "",
      });
    setFaqModal(true);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const { question, answer, category } = formdata;
    if(!question || !answer || !category){
      return toast.warn("All feilds are mandatory")
    }
    formdata["operation"] = operation;
    let { data } = await getResponse(apipaths.addFaq, formdata);
    toast.success(data.message)
    getData();
    setFaqModal(false);
  };

  return (
    <>
      <div className="text-right mb-3">
        <button className="btn btn-info btn-radius" onClick={addFaqBtn}>
          Add Faq
        </button>
      </div>

      {faqModal && (
        <div className="card">
          <div className="card-header">
            <h3 className="font-weight-bold mb-0">
              {operation === "add" ? "Add" : "Update"} FAQ
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={formSubmitHandler}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12 mt-4">
                  <label>Enter Question <span className="text-danger">*</span></label>
                  <input
                    className="form-control"
                    type={"text"}
                    placeholder="Enter Question"
                    value={formdata.question}
                    onChange={(e) =>
                      setFormdata({ ...formdata, question: e.target.value })
                    }
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12 mt-4">
                  <label>Select Category <span className="text-danger">*</span></label>
                  <Select
                    id="faq-categories"
                    showSearch
                    style={{ width: "100%" }}
                    value={formdata.category}
                    onChange={(e) => setFormdata({ ...formdata, category: e })}
                    placeholder="Select Category"
                  >
                      {
                          faqCategories && faqCategories.map(c => (
                              <Option key={c} value={c} className="text-capitalize">{c}</Option>
                          ))
                      }
                  </Select>
                </div>
                <div className="col-12 mt-4">
                  <label>Enter Answer <span className="text-danger">*</span></label>
                  <TextEditor
                    value={formdata.answer}
                    onChange={(e) => setFormdata({ ...formdata, answer: e })}
                  />
                </div>
                <div className="col-12 mt-4">
                  <button className="btn btn-info btn-radius mr-3">
                    {operation === "add" ? "Add" : "Update"} Faq
                  </button>
                  <button
                    className="btn btn-info btn-radius"
                    type="button"
                    onClick={() => {
                        setFaqModal(false);
                        setFormdata({})
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FaqAdmin;
