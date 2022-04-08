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



function AdminDashboard() {
    const [userRequest, setUserRequest] = useState([])
    const [priorityTickets, setPriorityTickets] = useState([])
    useEffect(() => {
        getTicketRequest()
        getTicketPriority()
    }, [])



    const getTicketRequest = async () => {
        const data = await getResponse(apipaths.getTicketRequest)
        setUserRequest(data?.data?.data)
    }

    const getTicketPriority = async () => {
        const data = await getResponse(apipaths.getTicketPriority)
        setPriorityTickets(data)
    }
    return (
        <>

            <Header />
            <IconTabs />




            <div className="content__section">

                <div className="col-12 mb-3 mb-lg-4">
                    <h5 className="section__title">Dashboard</h5>
                    <div className="row">

                        <div className="col-12 col-sm-6 col-md-4 col-lg">
                            <div className="col-12 tickets__box py-0">
                                <div className="row align-items-center">
                                    <div className="col-5 p-0">
                                        <RadialBar color={"#BF5555"} series={70} />
                                    </div>
                                    <div className="col">
                                        <h6 className="tickets__title">Open Tickets</h6>
                                        <p className="tickets__count">25</p>
                                        <p className="tickets__viewDetails">View Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg">
                            <div className="col-12 tickets__box py-0">
                                <div className="row align-items-center">
                                <div className="col-5 p-0">
                                        <RadialBar color={"#EAD063"} series={13} />
                                    </div>
                                    <div className="col pr-0">
                                        <h6 className="tickets__title">pending Tickets</h6>
                                        <p className="tickets__count">13</p>
                                        <p className="tickets__viewDetails">View Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg">
                            <div className="col-12 tickets__box py-0">
                                <div className="row align-items-center">
                                <div className="col-5 p-0">
                                        <RadialBar color={"#62BC46"} series={40} />
                                    </div>
                                    <div className="col pl-4">
                                        <h6 className="tickets__title">closed</h6>
                                        <p className="tickets__count">4</p>
                                        <p className="tickets__viewDetails">View Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg">
                            <div className="col-12 tickets__box">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <figure>
                                            <img src={tool}
                                                className="dashboard__icon" width="80" height="80" />
                                        </figure>
                                    </div>
                                    <div className="col">
                                        <h6 className="tickets__title">total hardware</h6>
                                        <p className="tickets__count">9</p>
                                        <p className="tickets__viewDetails">View Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg">
                            <div className="col-12 tickets__box">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <figure>
                                            <img src={person}
                                                className="dashboard__icon" width="80" height="80" />
                                        </figure>
                                    </div>
                                    <div className="col">
                                        <h6 className="tickets__title">active users</h6>
                                        <p className="tickets__count">10</p>
                                        <p className="tickets__viewDetails">View Details</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <h5 className="support__title">Support Tracker</h5>
                    <div className="row">
                        <UserRequest userRequest={userRequest} />
                        <HardInventory priorityTickets={priorityTickets} />
                        <div className="col-4">
                            <TrackByCountry />
                            <TicketCalender />

                        </div>
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
                                <p className="category__title">track by country</p>
                            </div>
                            <div className="category__box category__box__ht__min">
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