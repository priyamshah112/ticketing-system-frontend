

function PriorityTable(props) {
   
    return (
        <>
            <table className="table__style mt-4">
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
                {props?.priorityTickets?.map((ticket) => (
                    <tr>
                        <td
                            className="table__box">
                            {ticket.ticket}</td>
                        <td
                            className="table__box">
                            {ticket.created}</td>
                        <td
                            className="table__box">
                            {ticket.assign}</td>
                    </tr>
                ))}

            </table>
        </>
    );
}

export default PriorityTable;