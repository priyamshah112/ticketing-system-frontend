import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Collapse } from "antd";
import { toast } from "react-toastify";
import { addTicketsAction } from "../../actions/ticketAction";
import { apipaths } from "../../api/apiPaths";
import { getResponse } from "../../api/apiResponse";
import FaqAdmin from "./faqAdmin";
import $ from "jquery";
import { Tooltip } from "@material-ui/core";

function Faq() {
  const dispatch = useDispatch();
  const [faqs, setFaqs] = useState([]);
  const [editFaqInfo, setEditFaqInfo] = useState();
  const [faqCategories, setFaqCategories] = useState([]);
  const { Panel } = Collapse;

  useEffect(() => {
    getData();
  }, []);

  const getFaqList = async () => {
    const { data } = await getResponse(apipaths.faqList);
    if (data.success) {
      setFaqs(data.data.faqs);
      setFaqCategories(data.data.cateogry);
    }
  };

  const getData = async () => {
    getTickets();
    getFaqList();
  };

  const getTickets = async () => {
    const { data, error } = await getResponse(apipaths.listticket);
    if (error) return toast.warn("Error in listing tickets.");
    dispatch(addTicketsAction(data.data.tickets));
  };

  const faqAnswer = () => {
    setTimeout(() => {
      faqs &&
        faqs.map((x) => {
          $(`#faq-${x.id}`).html(x.answer);
        });
    }, 100);
  };

  const searchFaqHandler = (val) => {
    if (!val)
      getData();
    else {
      let results = [];
      faqs.map(x => {
        if (x.question && (x.question.toLowerCase()).includes(val.toLowerCase())) {
          results.push(x);
        }
      })
      setFaqs(results)
    }
  }

  const userType = JSON.parse(localStorage.user_details).userType;

  return (
    <div className="page-inner">
      <h2 className="text-secondary fw-bold mb-3">FAQ's</h2>
      {userType === "Admin" && (
          <FaqAdmin
            getData={getData}
            editFaqInfo={editFaqInfo}
            faqCategories={faqCategories}
          />
      )}
      <div className="card mw-100">
        <div className="card-body">
          <div className="rounded rounded-pill shadow-sm">
            <div className="input-group">
              <div className="input-group-prepend">
                <button
                  id="button-addon2"
                  type="submit"
                  className="btn btn-link text-muted"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <input
                type="search"
                placeholder="Search FAQ's"
                aria-describedby="button-addon2"
                className="form-control border-0 bg-light"
                onChange={(e) => searchFaqHandler(e.target.value)}
              />
            </div>
          </div>
          <Collapse accordion onChange={faqAnswer}>
            {faqs &&
              faqs.map((x, i) => (
                <Panel
                  header={
                    <div className="flex w-100 mt-3 mr-3 align-items-center justify-content-between">
                      <p className="font-weight-bold mb-0">{x.question}</p>
                      {userType === "Admin" && (
                        <Tooltip title="Edit Faq">
                          <button
                            className="btn btn-info btn-radius"
                            onClick={() => setEditFaqInfo(x)}
                          >
                            <i className="fa fa-pen"></i>
                          </button>
                        </Tooltip>
                      )}
                    </div>
                  }
                  key={i}
                >
                  <p id={`faq-${x.id}`}>{faqAnswer(x)}</p>
                </Panel>
              ))}
          </Collapse>
        </div>
      </div>

      <div className="container faq-container mt-5 p-0">
        <h1 className="text-center">You Still Have a Question ?</h1>
        <p className="text-center">
          If you cannot find a question in our fAQ, You can always contact
          us . We will Answer to you shortly !
        </p>
        <div className="row">
          <div className="col-lg-6 my-2 col-sm-12">
            <div className="card faq-cards">
              <div className="card-body d-flex justify-content-center align-items-center">
                <div className="card-details d-flex flex-column justify-content-center align-items-center">
                  <i className="fas fa-phone my-2"></i>
                  <h5>+(810) 2546 2345</h5>
                  <p className="text-center">
                    We Are Always Happy To Help You
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 my-2 col-sm-12">
            <div className="card faq-cards">
              <div className="card-body d-flex justify-content-center align-items-center">
                <div className="card-details d-flex flex-column justify-content-center align-items-center">
                  <i className="fas fa-envelope  my-2"></i>
                  <h5>hello@help.com</h5>
                  <p className="text-center">
                    Best way to get answer faster!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
