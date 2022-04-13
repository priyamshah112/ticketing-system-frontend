import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { dateHandler } from "../../actions/commonAction";
import { addTicketsAction } from "../../actions/ticketAction";
import { apipaths } from "../../api/apiPaths";
import { getResponse } from "../../api/apiResponse";
import LayoutOne from "../layout/layoutone";
import Faq from "./faq";

function Dashboard() {
  const dispatch = useDispatch();
  const ticketList = useSelector(state => state.ticketList);
  const [data, setData] = useState([])
  const userDetails = useSelector(state => state.userDetails);

  useEffect(() => {
    getData();
    getTickets();
  }, []);

  const getData = async () => {
    getTickets();
    const { data } = await getResponse(apipaths.dashboard);
    setData(data.data)
    console.log("Dashboard--- >",data);
  }

  const getTickets = async () => {
    const { data, error } = await getResponse(apipaths.listticket);
    if (error) return toast.warn("Error in listing tickets.");
    dispatch(addTicketsAction(data?.data?.tickets));
  };
  return (
    <>
      <div className="wrapper">
        <div className="main-panel">
          <div className="content">
            <div className="panel-header bg-primary-gradient">
              <div className="page-inner py-5">
                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                  <div>
                    <h2 className="text-white pb-2 fw-bold">Dashboard</h2>
                  </div>
                  <div className="ml-md-auto py-2 py-md-0">
                  </div>
                </div>
              </div>
            </div>
            <div className="page-inner mt--5">
              <div className="row mt--2">
                <div className="col-md-9">
                  {
                    data && <LayoutOne tickets={ticketList} data={data} />
                  }
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-head">

                    </div>
                    <div className="card-body">
                      <div className="card-title mb-3">
                        Total
                      </div>

                      {
                        userDetails.userType !== "Support" && userDetails.userType !== "Staff" && (
                          <div className="flex justify-content-between">
                            <p>Customers</p>
                            <p>{data.totalCustomers}</p>
                          </div>)
                      }

                      <div className="flex justify-content-between">
                        <p>Hardwares</p>
                        <p>{data.totalHardwares}</p>
                      </div>

                      <div className="flex justify-content-between">
                        <p>Open Tickets</p>
                        <p>{data.totalOpenTickets}</p>
                      </div>

                      <div className="flex justify-content-between">
                        <p>Softwares</p>
                        <p>{data.totalSoftware}</p>
                      </div>

                      <div className="flex justify-content-between">
                        <p>Total Tickets</p>
                        <p>{data.totalTickets}</p>
                      </div>


                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-head">
                    </div>
                    <div className="card-body">
                      <div className="card-title mb-3">Recent Tickets</div>
                      <ul className="list-group">
                        <li className="list-group-item  text-capitalize justify-content-between">
                          <p><b>Subject</b></p>
                          <p><b>Status</b></p>
                          <p><b>Lasted Updated</b></p>
                        </li>
                        {
                          data.recentTickets && data.recentTickets.map((data, i) => (
                            i < 5 && <li className="list-group-item  text-capitalize justify-content-between" key={i}>
                              <Link to={`/ticket/details?ticketid=${data.id}`}>{data.subject}</Link>
                              <p>{data.status}</p>
                              <p>{dateHandler(data.updated_at)}</p>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-head">
                    </div>
                    <div className="card-body">
                      <div className="card-title mb-3">Recent Open Tickets</div>
                      <ul className="list-group">
                        <li className="list-group-item  text-capitalize justify-content-between">
                          <p><b>Subject</b></p>
                          <p><b>Status</b></p>
                          <p><b>Lasted Updated</b></p>
                        </li>

                        {
                          data.recentOpenTickets && data.recentOpenTickets.map((data, i) => (
                            i < 5 && (
                              <li className="list-group-item  text-capitalize justify-content-between" key={i}
                              ><Link to={`/ticket/details?ticketid=${data.id}`}>{data.subject}</Link>
                                <p>{data.status}</p>
                                <p>{dateHandler(data.updated_at)}</p>
                              </li>)
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                </div>


                {
                  userDetails.userType !== "Support" && userDetails.userType !== "Staff" && (
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-head">
                        </div>
                        <div className="card-body">
                          <div className="card-title mb-3">Hardware List</div>
                          <ul className="list-group">
                            <li className="list-group-item  text-capitalize justify-content-between">
                              <b>Device Name</b>
                              <b>Device Number</b>
                            </li>
                            {
                              data.hardwareList && data.hardwareList.map((data, i) => (
                                i < 5 && (
                                  <li className="list-group-item  text-capitalize justify-content-between" key={i}>
                                    <Link to={`/inventory/hardware`}>{data.device_name}</Link>
                                    <p>{data.device_number}</p>
                                  </li>)
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }


                {
                  userDetails.userType !== "Support" && userDetails.userType !== "Staff" && (<div className="col-md-6">
                    <div className="card">
                      <div className="card-head">
                      </div>
                      <div className="card-body">
                        <div className="card-title mb-3">Software List</div>
                        <ul className="list-group">
                          <li className="list-group-item  text-capitalize justify-content-between">
                            <b>Device Name</b>
                            <b>Assigned On</b>
                          </li>
                          {
                            data.softwareList && data.softwareList.map((data, i) => (
                              i < 5 && (
                                <li className="list-group-item  text-capitalize justify-content-between" key={i}>
                                  <Link to={`/inventory/software`}>{data.name}</Link>
                                  <p>{data.assigned_on}</p>
                                </li>)
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>)
                }

                <div className="col-md-6">
                  <Faq data={data.faqs} />
                </div>

              </div>
            </div>
          </div>
          {/* <footer className="footer">
            <div className="container-fluid">          
              <div className="copyright ml-auto">
               COPYRIGHT &copy; 2022 RXLifeScience,All right Reserved
              </div>
            </div>
          </footer> */}
        </div>

        <div className="custom-template">
          <div className="title">Settings</div>
          <div className="custom-content">
            <div className="switcher">
              <div className="switch-block">
                <h4>Logo Header</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="dark"
                  ></button>
                  <button
                    type="button"
                    className="selected changeLogoHeaderColor"
                    data-color="blue"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="purple"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="light-blue"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="green"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="orange"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="red"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="white"
                  ></button>
                  <br />
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="dark2"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="blue2"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="purple2"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="light-blue2"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="green2"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="orange2"
                  ></button>
                  <button
                    type="button"
                    className="changeLogoHeaderColor"
                    data-color="red2"
                  ></button>
                </div>
              </div>
              <div className="switch-block">
                <h4>Navbar Header</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="dark"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="blue"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="purple"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="light-blue"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="green"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="orange"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="red"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="white"
                  ></button>
                  <br />
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="dark2"
                  ></button>
                  <button
                    type="button"
                    className="selected changeTopBarColor"
                    data-color="blue2"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="purple2"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="light-blue2"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="green2"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="orange2"
                  ></button>
                  <button
                    type="button"
                    className="changeTopBarColor"
                    data-color="red2"
                  ></button>
                </div>
              </div>
              <div className="switch-block">
                <h4>Sidebar</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="selected changeSideBarColor"
                    data-color="white"
                  ></button>
                  <button
                    type="button"
                    className="changeSideBarColor"
                    data-color="dark"
                  ></button>
                  <button
                    type="button"
                    className="changeSideBarColor"
                    data-color="dark2"
                  ></button>
                </div>
              </div>
              <div className="switch-block">
                <h4>Background</h4>
                <div className="btnSwitch">
                  <button
                    type="button"
                    className="changeBackgroundColor"
                    data-color="bg2"
                  ></button>
                  <button
                    type="button"
                    className="changeBackgroundColor selected"
                    data-color="bg1"
                  ></button>
                  <button
                    type="button"
                    className="changeBackgroundColor"
                    data-color="bg3"
                  ></button>
                  <button
                    type="button"
                    className="changeBackgroundColor"
                    data-color="dark"
                  ></button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="custom-toggle">
						<i className="flaticon-settings"></i>
					</div> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
