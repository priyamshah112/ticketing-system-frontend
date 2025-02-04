import React, { useState, useEffect } from "react";
import DashboardCard from "./dashboardCard";
import { Checkbox } from "antd";
import "./style.css";
import { Calendar } from "antd";
// import { PieChart } from 'react-minimal-pie-chart';
import { apipaths } from "../../api/apiPaths";
import { getResponse } from "../../api/apiResponse";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import moment from "moment";

function Dashboard() {
  const [cards, setCards] = useState([
    {
      title: "Open Tickets",
      lastChecked: "last 7 Days",
      total: "62",
      progress: {
        type: "down",
        value: "32.4%",
      },
      icon: "/images/open.png",
      color: "#f25961",
      font: "bold",
    },
    {
      title: "Open Tickets",
      lastChecked: "last 7 Days",
      total: "62",
      progress: {
        type: "up",
        value: "32.4%",
      },
      icon: "/images/process.png",
      color: "#f25961",
      font: "bold",
    },
    {
      title: "Open Tickets",
      lastChecked: "last 7 Days",
      total: "62",
      progress: {
        type: "up",
        value: "32.4%",
      },
      icon: "/images/noun-pc-3667149.png",
      color: "#27723C",
      font: "bold",
    },
  ]);

  const [countryData, setCountryData] = useState([
    {
      country: "USA",
      tickets: {
        total: 25,
        open: 25,
        closed: 25,
      },
      lastUpdated: {
        lastseen: "Last update 27 min ago",
        time: "8:00 PM",
      },
    },
    {
      country: "USA",
      tickets: {
        total: 25,
        open: 25,
        closed: 25,
      },
      lastUpdated: {
        lastseen: "",
        time: "1 Day Ago",
      },
    },
    {
      country: "USA",
      tickets: {
        total: 25,
        open: 25,
        closed: 25,
      },
      lastUpdated: {
        lastseen: "",
        time: "1 Day Ago",
      },
    },
    {
      country: "USA",
      tickets: {
        total: 25,
        open: 25,
        closed: 25,
      },
      lastUpdated: {
        lastseen: "",
        time: "1 Day Ago",
      },
    },
  ]);

  const [softwareInventoryData, setSoftwareInventory] = useState([]);

  const [hardwareInventory, setHardwareInventory] = useState({});

  const [newusers, setNewUsers] = useState([
    {
      name: "Peter Orangatan",
      lastSeen: "2 Hours Ago",
    },
    {
      name: "Peter Orangatan",
      lastSeen: "2 Hours Ago",
    },
    {
      name: "Peter Orangatan",
      lastSeen: "2 Hours Ago",
    },
    {
      name: "Peter Orangatan",
      lastSeen: "2 Hours Ago",
    },
    {
      name: "Peter Orangatan",
      lastSeen: "2 Hours Ago",
    },
  ]);

  const [activityTimeLine, setActivityTimeline] = useState([
    {
      title: "Lorem ipsum is some dummy text",
      color: "#4791FF",
    },
    {
      title: "Lorem ipsum is some dummy text",
      color: "#FFD950",
    },
    {
      title: "Lorem ipsum is some dummy text",
      color: "#707070",
    },
    {
      title: "Lorem ipsum is some dummy text",
      color: "#02BC77",
    },
    {
      title: "Lorem ipsum is some dummy text",
      color: "#FF2366",
    },
    {
      title: "Lorem ipsum is some dummy text",
      color: "#FF2366",
    },
  ]);

  const [totalUsers, setTotalUsers] = useState();

  const [supportTracker, setSupportTracker] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./assets/js/demo.js";
    script.async = true;

    document.body.appendChild(script);

    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    let { data } = await getResponse(apipaths.dashboard);
    setCards(data.data.counters);
    setCountryData(data.data.tickets);
    setActivityTimeline(data.data.userActivity);
    setNewUsers(data.data.users);
    setTotalUsers(data.data.totalUsers);
    setSoftwareInventory(data.data.softwareCounter);
    setSupportTracker(data.data.supportTracker);
    setHardwareInventory(data.data.hardwareGraph);
  };

  function totalTicketsCount(data) {
    const { openTicket, pendingTicket, ClosedTickets } = data;
    return openTicket + pendingTicket + ClosedTickets;
  }

  const unassignedSofwareGraphHanlder = (inv_data) => {
    if (inv_data.length > 0) {
      let count = 100 - (inv_data[1].total / inv_data[0].total) * 100;
      let data = {
        series: [count],
        options: {
          chart: {
            height: 350,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "70%",
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
          colors: ["#FFCD34"],
          labels: ["Unassigned"],
        },
      };

      return (
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="radialBar"
          height={200}
        />
      );
    }
  };

  const hardwareInventoryGraphHandler = (inv_data) => {
    const { totalHardware, availableHardware, assinedHardware } = inv_data;

    if ((totalHardware, availableHardware, assinedHardware)) {
      const graphData = {
        series: [assinedHardware, availableHardware, totalHardware],
        options: {
          chart: {
            height: 350,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px",
                },
                value: {
                  fontSize: "16px",
                },
                total: {
                  show: true,
                  label: "Total",
                  formatter: function (w) {
                    return totalHardware;
                  },
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
          labels: ["Assigned", "Un-Assigned", "Total"],
          colors: ["#1572e8", "#b64961", "#27723c"],
        },
      };

      return (
        <ReactApexChart
          options={graphData.options}
          series={graphData.series}
          type="radialBar"
          height="350px"
        />
      );
    }
  };

  const supportTrackerGraphHandler = (track_data) => {
    let closeTicketsAvg =
      (track_data.ClosedTickets * 100) / totalTicketsCount(track_data);

    if (track_data) {
      let data = {
        series: [parseInt(closeTicketsAvg)],
        options: {
          chart: {
            height: 350,
            type: "radialBar",
            offsetY: -10,
          },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 135,
              hollow: {
                size: "70%",
              },
              dataLabels: {
                name: {
                  fontSize: "12px",
                  color: undefined,
                  offsetY: -10,
                },
                value: {
                  offsetY: 10,
                  fontSize: "28px",
                  color: undefined,
                  formatter: function (val) {
                    return val + "%";
                  },
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              shadeIntensity: 0.15,
              gradientToColors: ["#7568EF"],
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, totalTicketsCount(supportTracker)],
            },
          },
          stroke: {
            dashArray: 4,
          },
          colors: ["#EA5455"],
          labels: ["Closed Tickets"],
        },
      };
      return (
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="radialBar"
          height="350px"
        />
      );
    }
  };

  return (
    <React.Fragment>
      <div className="panel-header bg-secondary-gradient">
        <div className="page-inner py-5">
          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
            <div>
              <h2 className="text-white pb-2 fw-bold">Dashboard</h2>
              <h5 className="text-white op-7 mb-2">
                Manage Your Inventory And Tickets
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-card-container page-inner mt--5">
        <div className="row dashboard-count">
          {cards &&
            cards.map((card, i) => {
              if (i === cards.length - 1) return null;
              return (
                <div className="col-md-3">
                  <DashboardCard data={card} num={i} />
                </div>
              );
            })}

          {cards && (
            <div className="col-md-3">
              <div className="card full-height">
                <div className="card-body flex justify-content-between">
                  <div
                    className="card-title"
                    style={{ color: "#1572e8", fontWeight: "bold" }}
                  >
                    Number of Active Users
                  </div>
                  {/* <div className="card-category">Daily information about statistics in system</div> */}
                  <div className="d-flex flex-wrap justify-content-around pb-2 pt-4 align-items-center">
                    <div className="align-items-center">
                      <p className="card-progress-total mb-0">
                        {totalUsers}
                      </p>
                    </div>
                    <div className="card-sec-two align-items-left">
                      {/* <p className="f-14 card-lastchecked mb-0">{data.lastChecked}</p> */}
                      <p className="f-14 card-lastchecked mb-0">
                        <img src="/images/users.png" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="row">
          <div className="col-12">
            <div className="card full-height">
              <div className="card-header">
                <div className="card-head-row card-tools-still-right">
                  <h4 className="card-title">Country</h4>
                  <div className="card-tools">
                    <button className="btn btn-icon btn-link btn-primary btn-xs">
                      <span className="fa fa-angle-down"></span>
                    </button>
                    <button className="btn btn-icon btn-link btn-primary btn-xs btn-refresh-card">
                      <span className="fa fa-sync-alt"></span>
                    </button>
                    <button className="btn btn-icon btn-link btn-primary btn-xs">
                      <span className="fa fa-times"></span>
                    </button>
                  </div>
                </div>
                <p className="card-category">
                  Ticket of the distribution of ticket around the world
                </p>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="table-responsive table-hover table-sales">
                      <table className="table">
                        <thead>
                          <tr style={{ borderBottom: "1px solid #9b9b9b" }}>
                            <th
                              className="py-2"
                              // style={{
                              //   fontSize: "18px",
                              //   color: "#27723C",
                              //   fontWeight: "600",
                              // }}
                            >
                              Country
                            </th>
                            <th className="text-center px-2 py-2">
                              Total Tickets
                            </th>
                            <th className="text-center px-2 py-2">
                              Open Tickets
                            </th>
                            <th className="text-center px-2 py-2">
                              Closed Tickets
                            </th>
                            <th className="text-center  py-2">Last Updated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {countryData &&
                            countryData.map((d, i) => (
                              <tr key={i}>
                                <td className={`flex`}>
                                  {d.country === "USA" && (
                                    <img
                                      width={30}
                                      className="mr-3"
                                      src={"../assets/img/flags/us.png"}
                                    />
                                  )}

                                  {d.country === "Costa Rica" && (
                                    <img
                                      width={30}
                                      className="mr-3"
                                      src={"images/cr.png"}
                                    />
                                  )}

                                  {d.country === "India" && (
                                    <img
                                      width={30}
                                      className="mr-3"
                                      src={"images/in.png"}
                                    />
                                  )}

                                  {d.country}
                                </td>
                                <td className="text-center">
                                  {d.tickets.total}
                                </td>
                                <td className="text-center">
                                  {d.tickets.open}
                                </td>
                                <td className="text-center">
                                  {d.tickets.closed}
                                </td>
                                <td className="text-right f-14">
                                  {d.lastUpdated.lastseen
                                    ? d.lastUpdated.lastseen
                                    : "-"}
                                  <span className="ml-3">
                                    {d.lastUpdated.time
                                      ? d.lastUpdated.time
                                      : "-"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mapcontainer">
                      <div id="map-example" className="vmap"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-6">
            <div className="card dashboard-inventory bg-white">
              <div className="row">
                <div className="col-lg-5 col-md-5 col-12 px-0">
                  <div className="sec-one position-relative">
                    <p className="inv-heading">Software inventory</p>
                    <div
                      className="flex align-items-center justify-content-around"
                      style={{ height: "100%", flexDirection: "column" }}
                    >
                      {softwareInventoryData &&
                        softwareInventoryData.map((inv) => (
                          <div className="text-center ml-3">
                            <div className="mx-auto text-left pl-3">
                              <span className="text-white">{inv.title}</span>
                              <h2
                                className="text-white font-weight-bold mt-2 text-center"
                                style={{ fontSize: "22px" }}
                              >
                                {inv.total}
                              </h2>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-7 col-12 px-0">
                  <div className="text-center">
                    <p
                      className="pr-4 pt-4"
                      style={{ color: "#f25961", fontWeight: "bold" }}
                    >
                      Unassigned Software
                    </p>
                    <div className="w-100 mx-auto">
                      {unassignedSofwareGraphHanlder(softwareInventoryData)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-md-6">
            <div
              className="card full-height"
              style={{ backgroundColor: "#d3c5e3" }}
            >
              <div className="card-header">
                <h2 className="font-weight-bold">Hardware Inventory</h2>
                <p>last Seen 7 Days</p>
              </div>
              <div className="card-body">
                <div className="chart-350">
                  {hardwareInventoryGraphHandler(hardwareInventory)}
                </div>
                <div className="pt-2">
                  {hardwareInventory && (
                    <>
                      <div className="d-flex">
                        <span
                          className="circle"
                          style={{ backgroundColor: "#1572e8" }}
                        ></span>
                        <p className="font-weight-bold mx-3 mb-0">
                          Total Laptops
                        </p>
                        <p
                          className="font-weight-bold ml-auto mb-0"
                          style={{ color: "#1572e8", fontWeight: "bold" }}
                        >
                          {hardwareInventory.totalHardware}
                        </p>
                      </div>

                      <div className="d-flex">
                        <span
                          className="circle"
                          style={{ backgroundColor: "#b64961" }}
                        ></span>
                        <p className="font-weight-bold mx-3 mb-0">
                          Available Laptops
                        </p>
                        <p
                          className="font-weight-bold ml-auto mb-0"
                          style={{ color: "#b64961", fontWeight: "bold" }}
                        >
                          {hardwareInventory.availableHardware}
                        </p>
                      </div>

                      <div className="d-flex">
                        <span
                          className="circle"
                          style={{ backgroundColor: "#27723c" }}
                        ></span>
                        <p className="font-weight-bold mx-3 mb-0">
                          Assigned Laptops
                        </p>
                        <p
                          className="font-weight-bold ml-auto mb-0"
                          style={{ color: "#27723c", fontWeight: "bold" }}
                        >
                          {hardwareInventory.assinedHardware}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card full-height">
              <div className="card-header">
                <h2 className="font-weight-bold">Support Tracker</h2>
                <p>{totalTicketsCount(supportTracker)} Tickets</p>
              </div>
              <div className="card-body">
                <div className="chart-350">
                  {supportTrackerGraphHandler(supportTracker)}
                </div>
                <div className="pt-2">
                  {supportTracker &&
                    Object.keys(supportTracker).map((track, i) => {
                      const ticketType = [
                        "Open Tickets",
                        "Pending Tickets",
                        "Closed Tickets",
                      ];
                      const ticketTypeColor = ["#f25961", "#ff9e27", "#2bb930"];
                      return (
                        <div className="d-flex align-items-center">
                          <span
                            className="circle"
                            style={{ backgroundColor: ticketTypeColor[i] }}
                          ></span>
                          <p className="font-weight-bold mx-3 mb-0">
                            {ticketType[i]}
                          </p>
                          <p
                            className="font-weight-bold ml-auto mb-0"
                            style={{
                              color: ticketTypeColor[i],
                              fontWeight: "bold",
                            }}
                          >
                            {supportTracker[track]}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card full-height">
              <div className="card-header">
                <div className="card-title">User Activity</div>
              </div>
              <div className="card-body">
                <ol className="activity-feed">
                  {activityTimeLine &&
                    activityTimeLine.map((result, index) => {
                      return (
                        <li className="feed-item feed-item-success" key={index}>
                          <time className="date" datetime="9-24">
                            {result?.created_at &&
                              moment(result.created_at).format("MM/DD/YYYY")}
                          </time>
                          <span className="text">
                            {result.message && result.message}
                            <a href="#">"Volunteer Activities"</a>
                          </span>
                        </li>
                      );
                    })}
                  {/* <li className="feed-item feed-item-secondary">
                    <time className="date" datetime="9-25">Sep 25</time>
                    <span className="text">Responded to need <a href="#">"Volunteer opportunity"</a></span>
                  </li>
                  <li className="feed-item feed-item-success">
                    <time className="date" datetime="9-24">Sep 24</time>
                    <span className="text">Added an interest <a href="#">"Volunteer Activities"</a></span>
                  </li>
                  <li className="feed-item feed-item-info">
                    <time className="date" datetime="9-23">Sep 23</time>
                    <span className="text">Joined the group <a href="single-group.php">"Boardsmanship Forum"</a></span>
                  </li>
                  <li className="feed-item feed-item-warning">
                    <time className="date" datetime="9-21">Sep 21</time>
                    <span className="text">Responded to need <a href="#">"In-Kind Opportunity"</a></span>
                  </li>
                  <li className="feed-item feed-item-danger">
                    <time className="date" datetime="9-18">Sep 18</time>
                    <span className="text">Created need <a href="#">"Volunteer Opportunity"</a></span>
                  </li>
                  <li className="feed-item">
                    <time className="date" datetime="9-17">Sep 17</time>
                    <span className="text">Attending the event <a href="single-event.php">"Some New Event"</a></span>
                  </li> */}
                </ol>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card full-height">
              <div className="card-header">
                <div className="card-head-row">
                  <div className="card-title">Support Tickets</div>
                  {/* <div className="card-tools">
                    <ul
                      className="nav nav-pills nav-secondary nav-pills-no-bd nav-sm"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-today"
                          data-toggle="pill"
                          href="#pills-today"
                          role="tab"
                          aria-selected="true"
                        >
                          Today
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="pills-week"
                          data-toggle="pill"
                          href="#pills-week"
                          role="tab"
                          aria-selected="false"
                        >
                          Week
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="pills-month"
                          data-toggle="pill"
                          href="#pills-month"
                          role="tab"
                          aria-selected="false"
                        >
                          Month
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
              <div className="card-body">
                {newusers &&
                  newusers.map((result) => {
                    return (
                      <>
                        <div className="d-flex">
                          <div className="avatar avatar-offline">
                            <span className="avatar-title rounded-circle border border-white bg-secondary">
                              {result.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 ml-3 pt-1">
                            <h6 className="text-uppercase fw-bold mb-1">
                              {result.name}
                              <span className="text-success pl-3">open</span>
                            </h6>
                            <span className="text-muted">
                              I have some query regarding the license issue.
                            </span>
                          </div>
                          <div className="float-right pt-1">
                            <small className="text-muted">
                              {result.lastSeen}
                            </small>
                          </div>
                        </div>
                        <div className="separator-dashed"></div>
                      </>
                    );
                  })}
                {/* <div className="d-flex">
                  <div className="avatar avatar-online">
                    <span className="avatar-title rounded-circle border border-white bg-info">
                      J
                    </span>
                  </div>
                  <div className="flex-1 ml-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Joko Subianto{" "}
                      <span className="text-warning pl-3">pending</span>
                    </h6>
                    <span className="text-muted">
                      I am facing some trouble with my viewport. When i start my
                    </span>
                  </div>
                  <div className="float-right pt-1">
                    <small className="text-muted">8:40 PM</small>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar avatar-offline">
                    <span className="avatar-title rounded-circle border border-white bg-secondary">
                      P
                    </span>
                  </div>
                  <div className="flex-1 ml-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Prabowo Widodo{" "}
                      <span className="text-success pl-3">open</span>
                    </h6>
                    <span className="text-muted">
                      I have some query regarding the license issue.
                    </span>
                  </div>
                  <div className="float-right pt-1">
                    <small className="text-muted">1 Day Ago</small>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar avatar-away">
                    <span className="avatar-title rounded-circle border border-white bg-danger">
                      L
                    </span>
                  </div>
                  <div className="flex-1 ml-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Lee Chong Wei{" "}
                      <span className="text-muted pl-3">closed</span>
                    </h6>
                    <span className="text-muted">
                      Is there any update plan for RTL version near future?
                    </span>
                  </div>
                  <div className="float-right pt-1">
                    <small className="text-muted">2 Days Ago</small>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar avatar-offline">
                    <span className="avatar-title rounded-circle border border-white bg-secondary">
                      P
                    </span>
                  </div>
                  <div className="flex-1 ml-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Peter Parker{" "}
                      <span className="text-success pl-3">open</span>
                    </h6>
                    <span className="text-muted">
                      I have some query regarding the license issue.
                    </span>
                  </div>
                  <div className="float-right pt-1">
                    <small className="text-muted">2 Day Ago</small>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar avatar-away">
                    <span className="avatar-title rounded-circle border border-white bg-danger">
                      L
                    </span>
                  </div>
                  <div className="flex-1 ml-3 pt-1">
                    <h6 className="text-uppercase fw-bold mb-1">
                      Logan Paul <span className="text-muted pl-3">closed</span>
                    </h6>
                    <span className="text-muted">
                      Is there any update plan for RTL version near future?
                    </span>
                  </div>
                  <div className="float-right pt-1">
                    <small className="text-muted">2 Days Ago</small>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* <div className="row">
          <div className="col-md-6">
            <div className="card full-height">
              <div className="card-body">
                <div className="card-title">Overall statistics</div>
                <div className="card-category">
                  Daily information about statistics in system
                </div>
                <div className="d-flex flex-wrap justify-content-around pb-2 pt-4">
                  <div className="px-2 pb-2 pb-md-0 text-center">
                    <div id="circles-1"></div>
                    <h6 className="fw-bold mt-3 mb-0">New Users</h6>
                  </div>
                  <div className="px-2 pb-2 pb-md-0 text-center">
                    <div id="circles-2"></div>
                    <h6 className="fw-bold mt-3 mb-0">Sales</h6>
                  </div>
                  <div className="px-2 pb-2 pb-md-0 text-center">
                    <div id="circles-3"></div>
                    <h6 className="fw-bold mt-3 mb-0">Subscribers</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card full-height">
              <div className="card-body">
                <div className="card-title">
                  Total income & spend statistics
                </div>
                <div className="row py-3">
                  <div className="col-md-4 d-flex flex-column justify-content-around">
                    <div>
                      <h6 className="fw-bold text-uppercase text-success op-8">
                        Total Income
                      </h6>
                      <h3 className="fw-bold">$9.782</h3>
                    </div>
                    <div>
                      <h6 className="fw-bold text-uppercase text-danger op-8">
                        Total Spend
                      </h6>
                      <h3 className="fw-bold">$1,248</h3>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div id="chart-container">
                      <canvas id="totalIncomeChart"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <div className="card-head-row">
                  <div className="card-title">User Statistics</div>
                  <div className="card-tools">
                    <a
                      href="#"
                      className="btn btn-info btn-border btn-round btn-sm mr-2"
                    >
                      <span className="btn-label">
                        <i className="fa fa-pencil"></i>
                      </span>
                      Export
                    </a>
                    <a
                      href="#"
                      className="btn btn-info btn-border btn-round btn-sm"
                    >
                      <span className="btn-label">
                        <i className="fa fa-print"></i>
                      </span>
                      Print
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-container">
                  <canvas id="statisticsChart"></canvas>
                </div>
                <div id="myChartLegend"></div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-primary">
              <div className="card-header">
                <div className="card-title">Daily Sales</div>
                <div className="card-category">March 25 - April 02</div>
              </div>
              <div className="card-body pb-0">
                <div className="mb-4 mt-2">
                  <h1>$4,578.58</h1>
                </div>
                <div className="pull-in">
                  <canvas id="dailySalesChart"></canvas>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body pb-0">
                <div className="h1 fw-bold float-right text-warning">+7%</div>
                <h2 className="mb-2">213</h2>
                <p className="text-muted">Transactions</p>
                <div className="pull-in sparkline-fix">
                  <div id="lineChart"></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Top Products</div>
              </div>
              <div className="card-body pb-0">
                <div className="d-flex">
                  <div className="avatar">
                    <img
                      src="../assets/img/logoproduct.svg"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="flex-1 pt-1 ml-2">
                    <h6 className="fw-bold mb-1">CSS</h6>
                    <small className="text-muted">Cascading Style Sheets</small>
                  </div>
                  <div className="d-flex ml-auto align-items-center">
                    <h3 className="text-info fw-bold">+$17</h3>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar">
                    <img
                      src="../assets/img/logoproduct.svg"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="flex-1 pt-1 ml-2">
                    <h6 className="fw-bold mb-1">J.CO Donuts</h6>
                    <small className="text-muted">The Best Donuts</small>
                  </div>
                  <div className="d-flex ml-auto align-items-center">
                    <h3 className="text-info fw-bold">+$300</h3>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="d-flex">
                  <div className="avatar">
                    <img
                      src="../assets/img/logoproduct3.svg"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="flex-1 pt-1 ml-2">
                    <h6 className="fw-bold mb-1">Ready Pro</h6>
                    <small className="text-muted">
                      Bootstrap 4 Admin Dashboard
                    </small>
                  </div>
                  <div className="d-flex ml-auto align-items-center">
                    <h3 className="text-info fw-bold">+$350</h3>
                  </div>
                </div>
                <div className="separator-dashed"></div>
                <div className="pull-in">
                  <canvas id="topProductsChart"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title fw-mediumbold">Suggested People</div>
                <div className="card-list">
                  <div className="item-list">
                    <div className="avatar">
                      <img
                        src="../assets/img/jm_denis.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <div className="info-user ml-3">
                      <div className="username">Jimmy Denis</div>
                      <div className="status">Graphic Designer</div>
                    </div>
                    <button className="btn btn-icon btn-primary btn-round btn-xs">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  <div className="item-list">
                    <div className="avatar">
                      <img
                        src="../assets/img/chadengle.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <div className="info-user ml-3">
                      <div className="username">Chad</div>
                      <div className="status">CEO Zeleaf</div>
                    </div>
                    <button className="btn btn-icon btn-primary btn-round btn-xs">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  <div className="item-list">
                    <div className="avatar">
                      <img
                        src="../assets/img/talha.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <div className="info-user ml-3">
                      <div className="username">Talha</div>
                      <div className="status">Front End Designer</div>
                    </div>
                    <button className="btn btn-icon btn-primary btn-round btn-xs">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  <div className="item-list">
                    <div className="avatar">
                      <img
                        src="../assets/img/mlane.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <div className="info-user ml-3">
                      <div className="username">John Doe</div>
                      <div className="status">Back End Developer</div>
                    </div>
                    <button className="btn btn-icon btn-primary btn-round btn-xs">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  <div className="item-list">
                    <div className="avatar">
                      <img
                        src="../assets/img/talha.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <div className="info-user ml-3">
                      <div className="username">Talha</div>
                      <div className="status">Front End Designer</div>
                    </div>
                    <button className="btn btn-icon btn-primary btn-round btn-xs">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  <div className="item-list">
                    <div className="avatar">
                      <img
                        src="../assets/img/jm_denis.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <div className="info-user ml-3">
                      <div className="username">Jimmy Denis</div>
                      <div className="status">Graphic Designer</div>
                    </div>
                    <button className="btn btn-icon btn-primary btn-round btn-xs">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-primary bg-primary-gradient">
              <div className="card-body">
                <h4 className="mt-3 b-b1 pb-2 mb-4 fw-bold">
                  Active user right now
                </h4>
                <h1 className="mb-4 fw-bold">17</h1>
                <h4 className="mt-3 b-b1 pb-2 mb-5 fw-bold">
                  Page view per minutes
                </h4>
                <div id="activeUsersChart"></div>
                <h4 className="mt-5 pb-3 mb-0 fw-bold">Top active pages</h4>
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between pb-1 pt-1">
                    <small>/product/readypro/index.html</small> <span>7</span>
                  </li>
                  <li className="d-flex justify-content-between pb-1 pt-1">
                    <small>/product/atlantis/demo.html</small> <span>10</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
