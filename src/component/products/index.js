import React, { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import data from "../data/products.json" 
import TableFeild from "../TableFeild";

function Ticket() {
    
    const { products } = data;

    console.log(products)

    const [columns] = useState([
        {
            key: "product_name",
            name: "Product"
        },
        {
            key: "user_contact",
            name: "Contact Person"
        },
        {
            key: "type",
            name: "Type"
        },
        {
            name: "Use for",
            key: "use_for"
        },
        {
            name: "Located At",
            key: "located_at"
        },
        {
            name: "Last Updated",
            key: "last_update"
        },
    ])
    const [ticketModal, setTicketModal] = useState(false);
    const [tickets, setTickets] = useState(data.tickets)
    return (
        <>
            <div className="wrapper">
                <div className="main-panel">
                    <div className="content">
                        <div className="mx-4 my-5">
                            {/* <TableData ticket={true} title="Products"  setTicketModal={setTicketModal} tableRows={tableRows} tableData={data.users}/> */}

                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-header flex ai-center jc-sb">
                                            <div class="card-title">
                                                <h2>Products</h2>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <TableFeild 
                                                data={products}
                                                columns={columns}
                                            /> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className={`table-modal ${ticketModal ? "open" : ""}`}>
                <div className="table-modal-content">
                    <h2>Ticket Details</h2>
                    <div className="mt-3">
                        <p><b>User: </b> Abdellah Menikh</p>
                        <p><b>Subject: </b> Office 365 E3+Azure Information Protection Premium P1</p>
                        <p><b>Message: </b> Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore Not working with us anymore</p>
                        <p><b>Priority: </b> High</p>
                        <button className="btn  btn-danger mx-2" onClick={() => setTicketModal(false)}>Close</button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Ticket;