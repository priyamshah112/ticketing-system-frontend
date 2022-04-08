import React, { useEffect, useState } from "react";
import "../userDashboard/user.css";
import create from "./imges/noun-create-1409600.svg";
import process from "./imges/noun-process-1372543.svg";
import close from "./imges/noun-close-4502796.svg";
import pc from "./imges/noun-pc-3667149.svg";
import software from "./imges/noun-software-2519404.svg";
import create1 from "./imges/noun-create-1409600.svg";
import { Link } from "react-router-dom";
import { apipaths } from "../../api/apiPaths";
import { getResponse } from "../../api/apiResponse";
import AddTicket from "../tickets/AddTicket";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import $ from "jquery";
import { Collapse } from "antd";
import { useHistory } from "react-router-dom";
import corner from "../assets/corner.png";
import inprogress from "../assets/inprogress.png"
import ellipse from "../assets/Ellipse.png"
import hardware from "../assets/hardware.png"
import file from "../assets/file.png"
import Calendar from 'react-calendar';

function UserDashboard() {
  const [userdata, setUserDate] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const [value, onChange] = useState(new Date());
  const formatShortWeekday = (locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]
  const userDetails = useSelector((state) => state.userDetails);
  const { Panel } = Collapse;
  const history = useHistory();

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
    ticket.append("created_by", userDetails.id);
    ticket.append("status", "Pending");
    ticket.append("operation", "add");

    const data = await getResponse(apipaths.addticket, ticket);
    if (data.status === 200) {
      toast.success(data.data.message);
      setTicketModal(false);
    } else {
      toast.error(data.data.message);
    }
  };

  const faqAnsHandler = (elem, faq) => {
    setTimeout(() => {
      $(`.${elem}`).html(faq.answer);
    }, 1000);
  };



  return (
    <div className="page-inner ">
      <img className="corner" src={corner}></img>
      <div className="row my-2 ">
        <div className="title-main col-lg-6">
          <h1>Dashboard</h1>

        </div>

      </div>
      <div className="row my-4">
        <div className="col-lg-3 col-md-6 my-2 pointer">
          <div className="card ticket-card" onClick={() => setTicketModal(true)}>
            <div className="card-body">
              <div className="card-details d-inline-flex align-items-center">
                <div>
                  <img
                    src={create}
                    alt="create"
                    className="img-fluid ticket-card-img  "
                    style={{ width: "20%" }}
                  />
                </div>
                <h4>Create Ticket</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 my-2 pointer">
          <div
            className="card ticket-card"
            onClick={() =>
              history.push({
                pathname: "/tickets",
                state: { status: " Pending" },
              })
            }
          >
            <div className="card-body">
              <div className="card-details d-inline-flex align-items-center">
                <div>
                  <img src={ellipse} alt="create" className="img-fluid inprogress-circle" />
                  <img src={inprogress} alt="create" className="img-fluid inprogress-icon" style={{ width: "25%" }} />

                </div>
                <h4>In Process Ticket</h4>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-6 my-2 pointer"
          onClick={() =>
            history.push({
              pathname: "/tickets",
              state: { status: " Closed" },
            })
          }
        >
          <div className="card ticket-card">
            <div className="card-body">
              <div className="card-details d-inline-flex align-items-center">
                <div>
                  <img src={ellipse} alt="create" className="img-fluid inprogress-circle" />

                  <img src={hardware} alt="create" className="img-fluid inprogress-icon" style={{ width: "25%" }} />
                </div>
                <h4>Create Request For Hardware </h4>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-3 my-2">
                            <div className="card small-card">
                                <div className="card-body">
                                    <div className="card-details d-flex flex-column text-center justify-content-center align-items-center">
                                        <div>
                                            <img src={message} alt="create" className="img-fluid" />
                                        </div>
                                        <h4>New Messages</h4>
                                    </div>
                                </div>
                            </div>
                        </div> */}
      </div>
      <div className="row my-4">
        <div className="col-lg-4 my-2">
          <div className="card medium-card calendar-card">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex flex-row justify-content-between ">
                <h5>Calendar</h5>

              </div>

              <div>
                <Calendar onChange={onChange}
                  next2Label={null}
                  prev2Label={null}
                  prevLabel={null}
                  nextLabel={null}

                  showNavigation={true}
                  defaultValue={new Date()}
                  value={value}
                  formatShortWeekday={formatShortWeekday}
                />

              </div>
            </div>
          </div>
        </div>

        <div
          className="col-lg-4 my-2 pointer information"
          onClick={() => setTicketModal(true)}
        >
          <div className="card medium-card info-card">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex text-center">
                <h5>Useful Information</h5>
              </div>
              <div >
                <div className="button-div">
                  <button type="button" className="btn info-buttons active">Files</button>
                  <button type="button" className="btn info-buttons ">Links</button>

                </div>
                <div className="table-div  table-responsive">
                  <table class="table table-sm info-table">
                    <thead>
                      <tr className="row-height">
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Created By</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="row-height">
                        <th scope="row">File1</th>
                        <td><img src={file}></img></td>
                        <td>21/03/2022</td>
                        <td>Ashwin Rao</td>
                      </tr>
                      <tr className="row-height">
                        <th scope="row">File1</th>
                        <td><img src={file}></img></td>
                        <td>21/03/2022</td>
                        <td>Ashwin Rao</td>
                      </tr>
                      <tr className="row-height">
                        <th scope="row">File1</th>
                        <td><img src={file}></img></td>
                        <td>21/03/2022</td>
                        <td>Ashwin Rao</td>
                      </tr>
                      <tr className="row-height">
                        <th scope="row">File1</th>
                        <td><img src={file}></img></td>
                        <td>21/03/2022</td>
                        <td>Ashwin Rao</td>
                      </tr>
                      <tr className="row-height">
                        <th scope="row">File1</th>
                        <td><img src={file}></img></td>
                        <td>21/03/2022</td>
                        <td>Ashwin Rao</td>
                      </tr> 
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        {/* <div className="col-lg-6 my-2">
          <div className="card large-card calender-card">
            <div className="card-body">
              <div className="auto-jsCalendar"></div>
            </div>
          </div>
        </div> */}
        <div className="col-lg-12 my-2">
          <div className="card acc-card">
            <div className="card-heading pt-3 px-4">
              <h3 className="mb-0">FAQs</h3>
            </div>
            <div className="card-body d-flex flex-column pt-0">
              {/* <div className="d-flex text-left">
                                        <h5>FAQs</h5>
                                    </div> */}
              <div id="accordion my-3">
                <Collapse accordion>
                  {userdata.faqs &&
                    userdata.faqs.map((faq, i) => (
                      <Panel
                        header={
                          <h4 className="font-weight-bold mb-0">sdfjkn</h4>
                        }
                        key={i}
                      >
                        <p
                          className={`faq_${i}`}
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        ></p>
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
              ticketModal={ticketModal}
              setTicketModal={setTicketModal}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
