const { default: TicketRequestTabs } = require("./TicketRequestTabs");

function UserRequest(props) {
    return (
        <>
            <div className="col-12 col-md-6 col-lg-6 col-xl mb-3 mb-sm-0">
                <div className="category__box category__box__ht__max">
                    <p className="category__title">requests by users</p>
                    <div className="inner__category__box">
                        <div className="tableWrapper">
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
                                {props.userRequest.map((user) => (
                                    <tr>
                                        <td
                                            className="table__box">
                                            {user.name}</td>
                                        <td
                                            className="table__box" style={{ color: "#BF5555" }}>
                                            {user.open}</td>
                                        <td
                                            className="table__box" style={{ color: "#EAD063" }}>
                                            {user.pending}</td>
                                        <td
                                            className="table__box" style={{ color: "#62BC46" }}>
                                            {user.closed}</td>
                                    </tr>
                                ))}

                            </table>
                        </div>
                    </div>
                </div>
                <TicketRequestTabs />
            </div>
        </>
    );
}

export default UserRequest;