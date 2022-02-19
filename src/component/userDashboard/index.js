import React, { useEffect, useState } from "react";
import "../userDashboard/user.css";
import create from "./imges/noun-create-1409600.svg";
import process from "./imges/noun-process-1372543.svg";
import close from "./imges/noun-close-4502796.svg";
import message from "./imges/noun-new-message-1970229.svg";
import pc from "./imges/noun-pc-3667149.svg";
import software from "./imges/noun-software-2519404.svg";
import create1 from "./imges/noun-create-1409600.svg";
import download from "./imges/download.jpg";
import { Link } from "react-router-dom";
import { apipaths } from "../../api/apiPaths";
import { getResponse } from "../../api/apiResponse";
import AddTicket from "../forms/AddTicket";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import $ from "jquery"
import { Collapse } from 'antd';


function UserDashboard() {
  const [userdata, setUserDate] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { Panel } = Collapse;

  useEffect(() => {
    userinfo();
  }, []);

  const userinfo = async (e) => {
    // e.preventDefault();
    // setError({ show: false });
    let { data } = await getResponse(apipaths.userDashboard);
    setUserDate(data.data);
  };

  const onSubmit = async (ticket) => {
    ticket.append("created_by", userDetails.id)
    ticket.append("status", "Pending")
    ticket.append("operation", "add")

    const data = await getResponse(apipaths.addticket, ticket);
    if (data.status === 200) {
      setTicketModal(false);
    }
  };

  const faqAnsHandler = (elem, faq) => {
    setTimeout(() => {
      $(`.${elem}`).html(faq.answer)
    }, 1000)
  }

  return (
    <>
      <div className="wrapper">
        <div className="main-panel">
          <div className="content">
            <div class="container-fluid mt-4 pt-3">
              <div className="row my-2 ">
                <div className="title-main col-lg-6">
                  <h1>Welcome</h1>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Magni, nobis?
                  </p>
                </div>
                <div className="search-field col-lg-6  mt-4">
                  <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="How To"
                    ></input>
                  </div>
                </div>
              </div>
              <div class="row my-4">
                <div class="col-lg-4 col-md-6 my-2">
                  <div
                    class="card small-card cursor-pointer"
                    onClick={() => setTicketModal(true)}
                  >
                    <div class="card-body">
                      <div class="card-details d-flex flex-column text-center justify-content-center align-items-center">
                        <div>
                          <img
                            src={create}
                            alt="create"
                            class="img-fluid"
                            style={{ width: "35%" }}
                          />
                        </div>
                        <h4>Create Incedent</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 my-2">
                  <div class="card small-card">
                    <div class="card-body">
                      <div class="card-details d-flex flex-column text-center justify-content-center align-items-center">
                        <div>
                          <img src={process} alt="create" class="img-fluid" />
                        </div>
                        <h4>In Process</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 my-2">
                  <div class="card small-card">
                    <div class="card-body">
                      <div class="card-details d-flex flex-column text-center justify-content-center align-items-center">
                        <div>
                          <img src={close} alt="create" class="img-fluid" />
                        </div>
                        <h4>Close Incedent Report</h4>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="col-lg-3 my-2">
                                    <div class="card small-card">
                                        <div class="card-body">
                                            <div class="card-details d-flex flex-column text-center justify-content-center align-items-center">
                                                <div>
                                                    <img src={message} alt="create" class="img-fluid" />
                                                </div>
                                                <h4>New Messages</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
              </div>
              <div class="row my-4">
                <div class="col-lg-4 my-2">
                  <div class="card medium-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                      <div class="d-flex flex-row justify-content-between ">
                        <h5>Assigned Hardware</h5>

                        <p>{userdata.totalHardwares}</p>
                      </div>
                      <div class="md-card-icon mx-auto my-2">
                        <img src={pc} alt="pc" class="img-fluid" />
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Laboriosam, quam?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 my-2">
                  <div class="card medium-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                      <div class="d-flex flex-row justify-content-between ">
                        <h5>Assigned Software</h5>
                        <p>{userdata.totalSoftware}</p>
                      </div>
                      <div class="md-card-icon mx-auto my-2">
                        <img src={software} alt="pc" class="img-fluid" />
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Laboriosam, quam?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 my-2">
                  <div class="card medium-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                      <div class="d-flex text-center">
                        <h5>Create Request For Hardware</h5>
                      </div>
                      <div class="md-card-icon mx-auto my-2">
                        <img src={create1} alt="pc" class="img-fluid" />
                      </div>
                      <div>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Laboriosam, quam?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row my-4">
                {/* <div class="col-lg-6 my-2">
                  <div class="card large-card calender-card">
                    <div class="card-body">
                      <div class="auto-jsCalendar"></div>
                    </div>
                  </div>
                </div> */}
                <div class="col-lg-12 my-2">
                  <div class="card acc-card">
                    <div class="card-heading pt-3 px-4">
                      <h3 className="mb-0">FAQs</h3>
                    </div>
                    <div class="card-body d-flex flex-column pt-0">
                      {/* <div class="d-flex text-left">
                                                <h5>FAQs</h5>
                                            </div> */}
                      <div id="accordion my-3">
                        <Collapse accordion>
                          {userdata.faqs &&
                            userdata.faqs.map((faq, i) => (

                              <Panel header={<h4 className="font-weight-bold mb-0">sdfjkn</h4>} key={i}>
                                <p className={`faq_${i}`} dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                              </Panel>
                            ))}
                        </Collapse>

                      </div>
                      <Link to="/faqs" className="mx-3 my-2 text-primary">
                        More...
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="">
                  {ticketModal && (
                    <AddTicket
                      setTicketModal={setTicketModal}
                      onSubmit={onSubmit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
