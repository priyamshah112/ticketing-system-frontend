import React, { useEffect, useState } from "react";
import "../userDashboard/user.css";
import create from "./imges/noun-create-1409600.svg";
import process from "./imges/noun-process-1372543.svg";
import { Link } from "react-router-dom";
import { apipaths } from "../../api/apiPaths";
import { getResponse } from "../../api/apiResponse";
import AddTicket from "../tickets/AddTicket";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Collapse } from "antd";
import { useHistory } from "react-router-dom";
import inprogress from "../assets/inprogress.png"
import ellipse from "../assets/Ellipse.png"
import hardware from "../assets/hardware.png"
import fileImage from "../assets/file.png"
import { dateFormatHandler } from '../../actions/commonAction';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TicketCalender from "../Calender";

function UserDashboard() {
  const [userdata, setUserDate] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const [value, onChange] = useState(new Date());
  const formatShortWeekday = (locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]
  const userDetails = useSelector((state) => state.userDetails);
  const { Panel } = Collapse;
  const history = useHistory();
  const [uiLinksInfo, setUILinksInfo] = useState([]);
  const [uiFilesInfo, setUIFilesInfo] = useState([]);
  const [faqsData, setFaqsData] = useState([]);
  const [toggleTab, setToggleTab] = useState('files');
  useEffect(() => {
    userinfo();
    getUsefulInformationsLinks();
    getUsefulInformationsFiles();
    getFaqs();

  }, []);


  const userinfo = async (e) => {
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


  const getUsefulInformationsLinks = async () => {
    const { data, error } = await getResponse(apipaths.uiLinksList);
    if (error) return toast.warn('Error in listing UI Links.');
    data.data.usefulInformations.map((ui) => {
      ui.created_at = dateFormatHandler(ui.created_at);
    });

    setUILinksInfo(data.data.usefulInformations);
  };
  
  const getUsefulInformationsFiles = async () => {
    const { data, error } = await getResponse(apipaths.uiFilesList);
    if (error) return toast.warn('Error in listing UI Files.');
    data.data.usefulInformations.map((ui) => {
      ui.created_at = dateFormatHandler(ui.created_at);
    });

    setUIFilesInfo(data.data.usefulInformations);
  };

  const getFaqs = async () => {
    const { data, error } = await getResponse(apipaths.dashboardFaqList);
    if (error) return toast.warn('Error in listing faq.');
    setFaqsData(data.data.faqs);
  };

  const [alignment, setAlignment] = React.useState('web');
  const handleChange = (event, newAlignment,) => {
    setToggleTab(newAlignment);
    setAlignment(newAlignment);
  };

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
        <div className="col-12 col-md-12 col-lg-4 my-2 pointer">
          <div className="card ticket-card" >
            <div className="card-body " onClick={() => setTicketModal(true)}>
              <div className="card-details d-inline-flex align-items-center addedcircle">
                <div>
                  <img src={ellipse} alt="create" className="img-fluid inprogress-circle" />
                  <img src={create} alt="create" className="img-fluid create-icon" style={{ width: "25%" }} />
                </div>
                <h4>Create Ticket</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-4 my-2 pointer">
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
              <div className="card-details d-inline-flex align-items-center addedcircle">
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
          className="col-12 col-md-12 col-lg-4 my-2 pointer"
          onClick={() =>
            history.push({
              pathname: "/tickets",
              state: { status: " Closed" },
            })
          }
        >
          <div className="card ticket-card">
            <div className="card-body">
              <div className="card-details d-inline-flex align-items-center addedcircle">
                <div>
                  <img src={ellipse} alt="create" className="img-fluid inprogress-circle" />

                  <img src={hardware} alt="create" className="img-fluid inprogress-icon" style={{ width: "25%" }} />
                </div>
                <h4>Create Request For Hardware </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-12 col-lg-6 my-2">
          <TicketCalender />
        </div>

        <div className="col-12 col-lg-6 my-2">
          <div className="card medium-card info-card">
            <div className="card-body d-flex flex-column">
              <div className="d-flex text-center">
                <h5>Useful Information</h5>
              </div>

              <div>
                <ThemeProvider theme={theme}>
                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    color="neutral" variant="contained"
                    onChange={handleChange}
                    className="button-div"

                  >
                    <ToggleButton className={toggleTab == 'files' ? 'info-buttons info-button-active' : 'info-buttons'} value="files">Files</ToggleButton>
                    <ToggleButton className={toggleTab == 'links' ? 'info-buttons info-button-active' : 'info-buttons'} value="links">Links</ToggleButton>

                  </ToggleButtonGroup>
                </ThemeProvider>

                {
                  toggleTab == 'files' && (
                    <>
                    <div className="table-div">
                      <table class="table table-sm info-table">
                        <thead>
                          <tr className="row-height">
                            <th scope="col">Subject</th>
                            <th scope="col">Attachment</th>
                            <th scope="col">Created Date</th>
                          </tr>
                        </thead>
                        <tbody className="scrollit">
    
                          {uiFilesInfo.map((ui) => {
                            return (
                            <tr className="row-height" >
                              <th scope="row">{ui.subject}</th>
    
                              <td>
                                {
                                  ui.file !== null && ui.file !== '' && (
                                    <a
                                      href={`${process.env.REACT_APP_BASE_URL}${ui.file}`}
                                      class="other-attachment"
                                      shape="round"
                                      size="small"
                                      download
                                      target="_blank"
                                  >
                                    <img src={fileImage} />
                                  </a>
                                  )
                                }
                              </td>
    
                              <td>{ui.created_at}</td>
                            </tr>
                            )}
                          )}
    
                        </tbody>
                      </table>
                      <Link className="more-link" to="/useful-information">view more</Link>
                    </div>
                    </>
                  )
                }
                {
                  toggleTab == 'links' && (
                    <>
                    <div className="table-div">
                      <table class="table table-sm info-table">
                        <thead>
                          <tr className="row-height">
                            <th scope="col">Subject</th>
                            <th scope="col">Link</th>
                            <th scope="col">Created Date</th>
                          </tr>
                        </thead>
                        <tbody className="scrollit">
    
                          {uiLinksInfo.map((ui) => {
                            return (
                            <tr className="row-height" >
                              <th scope="row">{ui.subject}</th>
    
                              <td>
                                {
                                  ui.link && (
                                    <a
                                      href={ui.link}
                                      class="other-attachment"
                                      shape="round"
                                      size="small"
                                      target="_blank"
                                  >
                                    {ui.link}
                                  </a>
                                  )
                                }
                              </td>
    
                              <td>{ui.created_at}</td>
                            </tr>
                            )}
                          )}
    
                        </tbody>
                      </table>
                    </div>
                    <Link className="more-link" to="/useful-information">view more</Link>
                    </>
                  )
                }
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="row my-2 h-100">
        {/* <div className="col-lg-6 my-2">
          <div className="card large-card calender-card">
            <div className="card-body">
              <div className="auto-jsCalendar"></div>
            </div>
          </div>
        </div> */}
        <div className="col-lg-12 my-2 faqs-card">
          <div className=" acc-card">
            <div className="pt-3 px-4">
              <h3 className="mb-0">FAQs</h3>
            </div>

          </div>
          <div className=" d-flex flex-column pt-0">
            <div id="accordion my-3 ">
              <Collapse accordion>
                {faqsData &&
                  faqsData.map((faqdata, i) => (
                    <Panel
                      header={
                        <h4 className=" mb-0 ">{faqdata.question}<i class="indicator glyphicon glyphicon-chevron-right  pull-right"></i></h4>
                      }
                      key={i}
                    >
                      <p
                        className={`faq_${i}`}
                        dangerouslySetInnerHTML={{ __html: faqdata.answer }}
                      ></p>
                    </Panel>
                  ))}
              </Collapse>
            </div>

          </div>
          <Link className="more-link" to="/faqs">view more</Link>
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
