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
      color: "#B12121",
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
      color: "#21B14A",
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
          colors: ["#422b88", "#b64961", "#27723c"],
        },
      };

      return (
        <ReactApexChart
          options={graphData.options}
          series={graphData.series}
          type="radialBar"
          height={350}
        />
      );
    }
  };

  const supportTrackerGraphHandler = (track_data) => {

    let closeTicketsAvg = (track_data.ClosedTickets * 100) / totalTicketsCount(track_data); 

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
              stops: [0,totalTicketsCount(supportTracker)],
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
          height={350}
        />
      );
    }
  };

  return (
    <div className="wrapper">
      <div className="main-panel">
        <div className="content mx-3">
          <br />
          <br />
          <h2
            className="heading font-weight-bold dashboard-card-heading"
            style={{ color: "#422B88" }}
          >
            Dashboard
          </h2>
          <div className="dashboard-card-container">
            <div className="row flex-wrap">
              {cards &&
                cards.map((card, i) => {
                  if (i === cards.length - 1) return null;
                  return (
                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 my-2">
                      <DashboardCard data={card} num={i} />
                    </div>
                  );
                })}

              {cards && (
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 my-2">
                  <div className="dashboard-card card-active-users">
                    <p
                      className="mb-0"
                      style={{
                        color: "#422B88",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      Number of Active Users
                    </p>
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginTop: "1.5rem" }}
                    >
                      <p className="mb-0 mr-5 total-users">{totalUsers}</p>
                      <p className="mb-0">
                        {/* <i className="fa fa-users"></i> */}
                        <img src="/images/users.png" />
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="row flex-wrap mt-2 mb-2">
              <div className="col-xl-8 col-lg-12 col-md-12 col-12 mt-2">
                <p className="software-heading mb-0 text-center">Country</p>
                <div
                  className="dashboard-card dashboard-country-table mt-2 d-flex "
                  style={{ height: "300px", borderRadius: "26px" }}
                >
                  <table className="w-100">
                    <thead>
                      <tr style={{ borderBottom: "1px solid #9b9b9b" }}>
                        <th
                          className="py-2"
                          style={{
                            fontSize: "18px",
                            color: "#27723C",
                            fontWeight: "600",
                          }}
                        >
                          Country
                        </th>
                        <th className="text-center px-2 py-2">Total Tickets</th>
                        <th className="text-center px-2 py-2">Open Tickets</th>
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
                            <td className={`flex align-items-center`}>
                              {d.country === "USA" && (
                                <span>
                                  <img
                                    width={30}
                                    className="mr-3"
                                    src={"images/united-states.svg"}
                                  />
                                </span>
                              )}

                              {d.country === "Costa Rica" && (
                                <span>
                                  <img
                                    width={30}
                                    className="mr-3"
                                    src={"images/cr.png"}
                                  />
                                </span>
                              )}

                              {d.country === "India" && (
                                <span>
                                  <img
                                    width={30}
                                    className="mr-3"
                                    src={"images/in.png"}
                                  />
                                </span>
                              )}

                              {d.country}
                            </td>
                            <td className="text-center">{d.tickets.total}</td>
                            <td className="text-center">{d.tickets.open}</td>
                            <td className="text-center">{d.tickets.closed}</td>
                            <td className="text-right f-14">
                              {d.lastUpdated.lastseen
                                ? d.lastUpdated.lastseen
                                : "-"}
                              <span className="ml-3">
                                {d.lastUpdated.time ? d.lastUpdated.time : "-"}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-xl-4 col-lg-12 col-md-12 col-12 mt-3">
                <div className="dashboard-inventory bg-white">
                  <p className="software-heading mb-0 text-center">
                    Software inventory
                  </p>
                  <div className="row" style={{ height: "100%" }}>
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
                                  <span className="text-white">
                                    {inv.title}
                                  </span>
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
                          style={{ color: "#21B14A", fontWeight: "bold" }}
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
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-xl-5 col-lg-5 col-md-5 col-12 w-100 mt-3">
              <div
                className="w-100 ml-2 p-3"
                style={{
                  borderRadius: "26px",
                  background: "#D3D0E1",
                }}
              >
                <div className="flex justify-content-between mt-3 px-4">
                  <h2 className="font-weight-bold">Hardware Inventory</h2>
                  <p>last Seen 7 Days</p>
                </div>
                <div>
                  {hardwareInventoryGraphHandler(hardwareInventory)}
                  <div className="pt-2">
                    {hardwareInventory && (
                      <>
                        <div className="flex ai-center">
                          <span
                            className="circle"
                            style={{ backgroundColor: "#422b88" }}
                          ></span>
                          <p className="font-weight-bold mx-3 mb-0">
                            Total Hardware
                          </p>
                          <p
                            className="font-weight-bold ml-auto mb-0"
                            style={{ color: "#422b88", fontWeight: "bold" }}
                          >
                            {hardwareInventory.totalHardware}
                          </p>
                        </div>

                        <div className="flex ai-center">
                          <span
                            className="circle"
                            style={{ backgroundColor: "#b64961" }}
                          ></span>
                          <p className="font-weight-bold mx-3 mb-0">
                            Available Hardware
                          </p>
                          <p
                            className="font-weight-bold ml-auto mb-0"
                            style={{ color: "#b64961", fontWeight: "bold" }}
                          >
                            {hardwareInventory.availableHardware}
                          </p>
                        </div>

                        <div className="flex ai-center">
                          <span
                            className="circle"
                            style={{ backgroundColor: "#27723c" }}
                          ></span>
                          <p className="font-weight-bold mx-3 mb-0">
                            Assigned Hardware
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
              <h2
                className="text-center mt-4"
                style={{
                  color: "#422B88",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Calendar
              </h2>
              <div className="mt-4 bg-white  box-shadow">
                <div class="card large-card calender-card">
                  <div class="card-body">
                    <div class="auto-jsCalendar"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-7 col-12 w-100 mt-3">
              <div
                className="bg-white ml-auto"
                style={{
                  borderRadius: "35px",
                  width: "98%",
                  position: "relative",
                }}
              >
                <div
                  className="text-center"
                  style={{ position: "absolute", top: "30px", left: "30px" }}
                >
                  <p
                    className="mb-0 font-weight-bold"
                    style={{ color: "rgb(39, 114, 60)" }}
                  >
                    Support Tracker
                  </p>
                  <h2 className="mb-0 font-weight-bold">
                    {totalTicketsCount(supportTracker)}
                  </h2>
                  <p className="mb-0">Tickets</p>
                </div>

                {supportTrackerGraphHandler(supportTracker)}

                <div className="flex justify-content-between px-5 pb-3">
                  {supportTracker &&
                    Object.keys(supportTracker).map((track, i) => {
                      const ticketType = [
                        "Open Tickets",
                        "Pending Tickets",
                        "Closed Tickets",
                      ];
                      return (
                        <div className="text-center">
                          <p className="mb-0 font-weight-bold">
                            {ticketType[i]}
                          </p>
                          <p className="font-weight-bold">
                            {supportTracker[track]}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div
                className="row position-relative ml-auto"
                style={{ width: "100%" }}
              >
                <div className="seperator vertical"></div>
                <div className="col-lg-6 col-md-12 col-12 w-100 mt-3">
                  <div
                    className="bg-white pl-4 mt-4 py-4 box-shadow"
                    style={{ borderRadius: "22px", height: "500px" }}
                  >
                    <p
                      className="font-weight-bold f-20"
                      style={{ color: "#27723C" }}
                    >
                      Users
                    </p>
                    <hr />
                    <div className="user-block">
                      {newusers &&
                        newusers.map((user) => (
                          <div className="flex align-items-center my-3">
                            <img
                              width={50}
                              height={50}
                              className="mr-3"
                              src="/images/user/user.png"
                              style={{
                                objectFit: "cover",
                                borderRadius: "10px",
                              }}
                            />
                            <div>
                              <p className="f-17 mb-0">
                                <b>{user.name}</b>
                              </p>
                              <p className="mb-0" style={{ color: "#707070" }}>
                                {user.lastSeen}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12 w-100 mt-3">
                  <div
                    className="bg-white pl-4 mt-4 py-4 box-shadow"
                    style={{ borderRadius: "22px", height: "500px" }}
                  >
                    <p
                      className="font-weight-bold f-20"
                      style={{ color: "#27723C" }}
                    >
                      Activity Timeline
                    </p>
                    <hr />
                    <div className="timeline-block">
                      {activityTimeLine &&
                        activityTimeLine.map((data) => (
                          <div
                            className="flex align-items-baseline"
                            style={{ borderLeft: `5px solid ${data.color}` }}
                          >
                            <span className="ml-3 f-17 mb-0">
                              {data.message}
                            </span>
                          </div>
                        ))}
                        
                        <Link to="/faqs" className="mt-3 pl-1" style={{color: "rgb(71, 145, 255)"}}>more...</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="text-center py-3 mt-5 dashboard-footer">
                <p className="text-white mb-0">COPYRIGHT © 2022 RXLifeScience, All rights Reserved</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
