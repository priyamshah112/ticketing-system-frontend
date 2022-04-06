import Footer from "../layout/footer";
import "./admin-dashboard.css"
import Header from "./header";
import IconTabs from "./sidebar";



function AdminDashboard() {
    return (
        <>

            <Header />
            <IconTabs />


            <div className="content__section">

                <div className="dashboard__summary">
                    <h5 className="section__title">Dashboard</h5>
                    <div className="f-p">

                        <div className="tickets__box">
                            <div>
                                <figure>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                        width="40" height="40" />
                                </figure>
                            </div>
                            <div className="ch__content">
                                <h6 className="tickets__title">Open Tickets</h6>
                                <p className="tickets__count">25</p>
                                <p className="tickets__viewDetails">View Details</p>
                            </div>
                        </div>
                        <div className="tickets__box">
                            <div>
                                <figure>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                        width="40" height="40" />
                                </figure>
                            </div>
                            <div className="ch__content">
                                <h6 className="tickets__title">pending Tickets</h6>
                                <p className="tickets__count">13</p>
                                <p className="tickets__viewDetails">View Details</p>
                            </div>
                        </div>
                        <div className="tickets__box">
                            <div>
                                <figure>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                        width="40" height="40" />
                                </figure>
                            </div>
                            <div className="ch__content">
                                <h6 className="tickets__title">closed</h6>
                                <p className="tickets__count">4</p>
                                <p className="tickets__viewDetails">View Details</p>
                            </div>
                        </div>
                        <div className="tickets__box">
                            <div>
                                <figure>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                        width="40" height="40" />
                                </figure>
                            </div>
                            <div className="ch__content">
                                <h6 className="tickets__title">total hardware</h6>
                                <p className="tickets__count">9</p>
                                <p className="tickets__viewDetails">View Details</p>
                            </div>
                        </div>
                        <div className="tickets__box">
                            <div>
                                <figure>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&usqp=CAU"
                                        width="40" height="40" />
                                </figure>
                            </div>
                            <div className="ch__content">
                                <h6 className="tickets__title">active users</h6>
                                <p className="tickets__count">10</p>
                                <p className="tickets__viewDetails">View Details</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="statistics__section">
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