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
import inprogress from "../assets/inprogress.png"
import ellipse from "../assets/Ellipse.png"
import hardware from "../assets/hardware.png"
import file from "../assets/file.png"
import Calendar from 'react-calendar';
import queryString from 'query-string';
import { dateFormatHandler } from '../../actions/commonAction';
import { Tooltip } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { buttonBaseClasses } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';

function UserDashboard() {
  const [userdata, setUserDate] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const [value, onChange] = useState(new Date());
  const formatShortWeekday = (locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]
  const userDetails = useSelector((state) => state.userDetails);
  const { Panel } = Collapse;
  const history = useHistory();

  const [ticketId, setTicketId] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const [isModal, setIsModal] = useState(false);
  const [ticketinfo, setTicketInfo] = useState([]);
  const [supportUsers, setSupportUsers] = useState([]);
  const userList = useSelector((state) => state.userList);
  const userType = JSON.parse(localStorage.user_details).userType;
  const { status } = queryString.parse(window.location.search);
  const location = useLocation();
  const [ticketDataOnStatus, setTicketDataOnStatus] = useState([]);
  const [faq, setFaqDate] = useState([{
    questions: "Is there a free trial available?",
    answer: "2 Hours Ago",
  },
  {
    questions: "What is Cancellation fee?",
    answer: "2 Hours Ago",
  },
  {
    questions: "How does your billing work?",
    answer: "2 Hours Ago",
  },
  {
    questions: "How do I change my account email?",
    answer: "2 Hours Ago",
  }

  ]);
  useEffect(() => {
    userinfo();
    getTickets();

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


  const getTickets = async () => {
    const { data, error } = await getResponse(apipaths.listticket);
    if (error) return toast.warn('Error in listing tickets.');
    console.log("ticket info", data);
    setUsers(data.data.support);
    setTicketInfo(data.data.tickets);
    data.data.tickets.map((ticket) => {
      let username = '';
      let created_by = '';
      userList.map((user) => {
        if (ticket.assigned_to === user.id) {
          username = user.name;
        }

        if (ticket.created_by === user.id) {
          created_by = user.name;
        }
      });

      ticket.created_by = username;
      ticket.created_at = dateFormatHandler(ticket.created_at);
      if (ticket.subject.length > 30)
        ticket.subject = ticket.subject.substring(0, 30) + '...';

      //ticket.assigned_to = username;
      let ticketStatus = '';
      // eslint-disable-next-line default-case
      switch (ticket.status) {
        case 'closed':
          ticketStatus = (
            <div className="status status-success">
              <span></span> Closed
            </div>
          );
          break;
        case 'open':
          ticketStatus = (
            <div className="status status-suspended">
              <span></span> Open
            </div>
          );
          break;
        case 'pending':
          ticketStatus = (
            <div className="status status-pending">
              <span></span> Pending
            </div>
          );
          break;
      }
      ticket.status = ticketStatus;
      if (userType === 'User') {
      }

      ticket.subject = (
        <Link
          style={{ fontWeight: 600 }}
          to={`/ticket/details?ticketid=${ticket.id}`}
        >
          {ticket.subject}
        </Link>
      );
    });

    setTicketDataOnStatus(data.data.tickets);
  };

  const [alignment, setAlignment] = React.useState('web');
  const handleChange = (event, newAlignment,) => {
    setAlignment(newAlignment);

  };

  console.log(ticketinfo)

  const [checked, setChecked] = React.useState(false);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      }
    },
  });
  return (
    <div className="page-inner ">
      <div className="row my-2 ">
        <div className="title-main col-lg-6">
          <h1>Dashboard</h1>

        </div>

      </div>
      <div className="row my-4">
        <div className="col-lg-3 col-md-6 my-2 pointer">
          <div className="card ticket-card" >
            <div className="card-body " onClick={() => setTicketModal(true)}>
              {console.log("in here")}
              <div className="card-details d-inline-flex align-items-center">
                <div>
                  <img
                    src={create}
                    alt="create"
                    className="img-fluid ticket-card-img  "
                    style={{ width: "15%" }}
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
                  showNeighboringMonth={false}

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

        >
          <div className="card medium-card info-card">
            <div className="card-body d-flex flex-column justify-content-between">
              <div className="d-flex text-center">
                <h5>Useful Information</h5>
              </div>

              <div >



                <ThemeProvider theme={theme}>
                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    color="neutral" variant="contained"
                    onChange={handleChange}
                    className="button-div"

                  >
                    <ToggleButton className="info-buttons" value="files">Files</ToggleButton>
                    <ToggleButton className="info-buttons" value="links">Links</ToggleButton>

                  </ToggleButtonGroup>
                </ThemeProvider>




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
                    <tbody className="scrollit">

                      {ticketinfo.map((ticket) =>
                        <tr className="row-height" >
                          <th scope="row">File1</th>

                          <td><img src={file}></img></td>

                          <td>{ticket.created_at}</td>
                          <td>{ticket.created_by}</td>
                        </tr>
                      )}

                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="row my-4 h-100">
        {/* <div className="col-lg-6 my-2">
          <div className="card large-card calender-card">
            <div className="card-body">
              <div className="auto-jsCalendar"></div>
            </div>
          </div>
        </div> */}
        <div className="col-lg-12 my-2">
          <div className=" acc-card">
            <div className="pt-3 px-4">
              <h3 className="mb-0">FAQs</h3>
            </div>

          </div>
          <div className=" d-flex flex-column pt-0">
            {/* <div className="d-flex text-left">
                                        <h5>FAQs</h5>
                                    </div> */}
            <div id="accordion my-3 ">
              <Collapse accordion>
                {faq &&
                  faq.map((faqdata, i) => (
                    <Panel
                      header={
                        <h4 className=" mb-0 ">{faqdata.questions}<i class="indicator glyphicon glyphicon-chevron-right  pull-right"></i></h4>
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

          </div>
        </div>

        {<div className="">
          {ticketModal && (
            <AddTicket
              ticketModal={ticketModal}
              setTicketModal={setTicketModal}
              onSubmit={onSubmit}
            />
          )}
        </div>}
      </div>
    </div >
  );
}

export default UserDashboard;
