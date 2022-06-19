import React from "react";
import { Collapse } from 'antd';
import { List } from "antd";
import { dateHandler } from "../../../actions/commonAction";

function TicketInformation(props) {
    
    const { Panel } = Collapse;
    const { ticket, closeTicketHandler } = props;

    function callback(key) {
        console.log(key);
    }

    return (
        <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel header="Ticket Information" key="1">
                <List
                    bordered
                    footer={(
                        <div>
                            {
                                ticket.status === "Closed" ? (
                                    <button className="w-100 btn btn-success" disabled>Resolved</button>
                                ) : (
                                    <>
                                        {/*<button className="btn btn-success">Open</button>
                                        <button className="btn btn-danger ml-3" onClick={() => closeTicketHandler(ticket)}>Close</button>*/}
                                    </>
                                )
                            }

                        </div>
                    )}
                >

                    <List.Item>
                        <div>
                            <h4 className="mb-0">Requestor</h4>
                            <p className="mb-0">{ticket.created_by}</p>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div>
                            <h4 className="mb-0">Last Updated</h4>
                            <p className="mb-0">{dateHandler(ticket.updated_at)}</p>
                        </div>
                    </List.Item>
                </List>
            </Panel>
        </Collapse>
    )
}

export default TicketInformation;