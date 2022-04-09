import React, { useEffect, useState } from "react";
import "./admin-dashboard.css"
import Header from "./header";
import IconTabs from "./sidebar";
import tool from "../../../src/images/admin-dashboard/tool.svg";
import person from "../../../src/images/admin-dashboard/person.svg";
import { getResponse } from "../../api/apiResponse";
import { apipaths } from "../../api/apiPaths";
import HardInventory from "./hardInventory";
import UserRequest from "./user-request";
import TrackByCountry from "./track-by-country";
import Calendar from "./calender";
import TicketCalender from "./calender";
import RadialBar from "./radialbar";
import { Link } from "react-router-dom";



function AdminDashboard() {
    const [userRequest, setUserRequest] = useState([])
    const [priorityTickets, setPriorityTickets] = useState([])
    const [dashBoardTicketData, setDashBoardTicketData] = useState([])
    useEffect(() => {
        getTicketRequest()
        getTicketPriority()
        getTicketRequestUser()
        getData()
    }, [])
    const getData = async () => {
        const { data } = await getResponse(apipaths.dashboard);
        console.log("Dashboard--- >",data);
        setDashBoardTicketData(data)
      }
      
    const getTicketRequestUser = async () => {
        const data = await getResponse(apipaths.getTicketRequestByUser)
        setUserRequest(data?.data?.data)
    }

    const getTicketPriority = async () => {
        const data = await getResponse(apipaths.getTicketPriority)
        setPriorityTickets(data)
    }
    const getTicketRequest = async () => {
        const data = await getResponse(apipaths.getTicketRequest)
        console.log(data)
    }
    
    return (
        <>
            <div className="content__section">

                <h1 className="section__title">Dashboard</h1>

                <div className="row pb-4">
                    <div className="col-12 col-sm-6 col-md col-lg">
                        <div className="tickets__box py-0">
                            <div className="row align-items-center">
                                <div className="col-5 p-0">
                                    <RadialBar color={"#BF5555"} series={70} />
                                </div>
                                <div className="col p-0 pl-2">
                                    <h6 className="tickets__title">Open Tickets</h6>
                                    <p className="tickets__count">{dashBoardTicketData?.data?.counters[0].total}</p>
                                    <p className="tickets__viewDetails"><Link to={`/tickets?open=true`}> View Details >></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md col-lg">
                        <div className="tickets__box py-0">
                            <div className="row align-items-center">
                                <div className="col-5 p-0">
                                    <RadialBar color={"#EAD063"} series={13} />
                                </div>
                                <div className="col p-0 pl-2">
                                    <h6 className="tickets__title">pending Tickets</h6>
                                    <p className="tickets__count">{dashBoardTicketData?.data?.counters[1].total}</p>
                                    <p className="tickets__viewDetails"><Link to={`/tickets?pending=true`}> View Details >></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md col-lg">
                        <div className="tickets__box py-0">
                            <div className="row align-items-center">
                                <div className="col-5 p-0">
                                    <RadialBar color={"#62BC46"} series={40} />
                                </div>
                                <div className="col p-0 pl-2">
                                    <h6 className="tickets__title">closed</h6>
                                    <p className="tickets__count">{dashBoardTicketData?.data?.counters[2].total}</p>
                                    <p className="tickets__viewDetails"><Link to={`/tickets?closed=true`}> View Details >></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md col-lg">
                        <div className="tickets__box">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <figure>
                                        <img src={tool}
                                            className="dashboard__icon" />
                                    </figure>
                                </div>
                                <div className="col p-0 pl-2">
                                    <h6 className="tickets__title">total hardware</h6>
                                    <p className="tickets__count">{dashBoardTicketData?.data?.counters[2].total}</p>
                                    <p className="tickets__viewDetails"><Link to={`/inventory/hardware`}> View Details >></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md col-lg">
                        <div className="tickets__box">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <figure>
                                        <img src={person}
                                            className="dashboard__icon" />
                                    </figure>
                                </div>
                                <div className="col p-0 pl-2">
                                    <h6 className="tickets__title">active users</h6>
                                    <p className="tickets__count">{dashBoardTicketData?.data?.counters[3].total}</p>
                                    <p className="tickets__viewDetails" ><Link to={`/user`}> View Details >></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h5 className="support__title">Support Tracker</h5>
                <div className="row">
                    <UserRequest userRequest={userRequest} />
                    <HardInventory priorityTickets={priorityTickets} />
                    <div className="col-4">
                        <TrackByCountry />
                        <TicketCalender />

                    </div>
                </div>


                <div className="statistics__section d-none">
                    <h5 className="support__title">Support Tracker</h5>
                    <div className="mansory__lyt">
                        <div className="mansory__lyt__ch">
                            <div className="category__box category__box__ht__max">
                                <p className="category__title">requests by users</p>
                                <table className="table__style">
                                    <tr>
                                        <th
                                            className="table__box table__boxborder">
                                        </th>
                                        <th
                                            className="table__box table__boxborder">
                                            Open</th>
                                        <th
                                            className="table__box table__boxborder">
                                            Pending</th>
                                        <th
                                            className="table__box table__boxborder">
                                            Closed</th>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Md Shan</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Prakash</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Md Shan</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Prakash</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Md Shan</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Prakash</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Md Shan</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Prakash</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Md Shan</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Prakash</td>
                                        <td
                                            className="table__box table_number_color">
                                            2</td>
                                        <td
                                            className="table__box table_number_color">
                                            5</td>
                                        <td
                                            className="table__box table_number_color">
                                            10</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="category__box category__box__ht__min">
                                <p className="category__title">ticket requests</p>
                            </div>
                        </div>
                        <div className="mansory__lyt__ch">
                            <div className="category__box category__box__ht__min">
                                <p className="category__title">hardware inventory</p>
                            </div>
                            <div className="category__box category__box__ht__max">
                                <p className="category__title">ticket priority level</p>
                                <table className="table__style">
                                    <tr>
                                        <th
                                            className="table__box table__boxborder">
                                        </th>
                                        <th
                                            className="table__box table__boxborder">
                                            Date</th>
                                        <th
                                            className="table__box table__boxborder">
                                            Assigned To</th>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Ticket 1</td>
                                        <td
                                            className="table__box">
                                            01/03/2022</td>
                                        <td
                                            className="table__box">
                                            Ashwin Rao</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Ticket 1</td>
                                        <td
                                            className="table__box">
                                            01/03/2022</td>
                                        <td
                                            className="table__box">
                                            Ashwin Rao</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Ticket 1</td>
                                        <td
                                            className="table__box">
                                            01/03/2022</td>
                                        <td
                                            className="table__box">
                                            Ashwin Rao</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Ticket 1</td>
                                        <td
                                            className="table__box">
                                            01/03/2022</td>
                                        <td
                                            className="table__box">
                                            Ashwin Rao</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className="table__box">
                                            Ticket 1</td>
                                        <td
                                            className="table__box">
                                            01/03/2022</td>
                                        <td
                                            className="table__box">
                                            Ashwin Rao</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="mansory__lyt__ch">
                            <div className="category__box category__box__ht__max">
                                <p className="category__title"></p>
                            </div>
                            <div className="category__box category__box__ht__min calender">
                                <p className="category__title">calender</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* <Footer /> */}

        </>
    );
}

export default AdminDashboard;