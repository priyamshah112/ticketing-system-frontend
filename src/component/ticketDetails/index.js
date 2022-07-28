import React, { useEffect, useState } from "react";
import queryString from "query-string"
import TicketInformation from "./ticketInformation/TicketInformation";
import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import TextEditor from "../TextEditor";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { apipaths } from "../../api/apiPaths";
import { getResponse } from "../../api/apiResponse";
import { addTicketsAction } from "../../actions/ticketAction";
import { getUserLists } from "../../actions/userActions";
import { dateHandler } from "../../actions/commonAction";
import $ from "jquery"
import { isCompositeComponent } from "react-dom/cjs/react-dom-test-utils.production.min";
import DownloadIcon from '@mui/icons-material/Download';
import './style.css';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import Typography from "@material-ui/core/Typography";
function TicketDetails(props) {

    const [attachments, setAttachments] = useState([]);
    const [ticketMessage, setTicketMessage] = useState("");
    const [apiMess, setApiMess] = useState("");
    const [ticket, setTicket] = useState("");
    const [files, setFiles] = useState([]);
    const ticketList = useSelector(state => state.ticketList);
    const userList = useSelector(state => state.userList);
    const userDetails = useSelector(state => state.userDetails);

    const dispatch = useDispatch();

    const normFile = (e) => {
        if (e.fileList) {
            setAttachments(e.fileList)
        }
    };


    useEffect(() => {
        userListHandler();
    }, [])

    useEffect(() => {
        if (userList.length > 0)
            getTickets();
    }, [userList])

    useEffect(() => {
        if (ticketList.length === 0)
            return null
        const { ticketid } = queryString.parse(window.location.search);
        if (!ticketid) return props.history.push("/tickets")
        ticketList && ticketList.map(t => {
            if (parseInt(t.id) === parseInt(ticketid)) {
                ticketDataHandler(t)
            }

        })
    }, [ticketList])


    const ticketDataHandler = (t) => {
        if (!t) return null
        let ticket_data = t;
        ticket_data.ticket_activity.map(ta => {
            ta.files = ta.files ? JSON.parse(ta.files) : []
        })
        setTicket(ticket_data)
    }

    const userListHandler = async () => {
        const { data } = await getResponse(apipaths.listusers, null);
        const users = data.data.user;
        dispatch(getUserLists(users));
    }

    const getTickets = async () => {
        const { data, error } = await getResponse(apipaths.listticket);
        if (error) return toast.warn("Error in listing tickets.")
        data.data.tickets.map((ticket) => {
            let username = ""
            let created_by = ""
            userList.map(user => {
                if (ticket.assigned_to === user.id) {
                    username = user.name
                }

                if (ticket.created_by === user.id) {
                    created_by = user.name
                }
            })

            ticket.created_by = username;
            ticket.assigned_to = username;
            ticket.subject = (<Link style={{ fontWeight: 600 }} to={`/ticket/details?ticketid=${ticket.id}`}>{ticket.subject}</Link>)
        })

        dispatch(addTicketsAction(data.data.tickets));
    }

    const getUserNameById = (id) => {
        let name = "";
        userList && userList.map(user => {
            if (user.id === id)
                name = user.name
        })
        return name;
    }

    const ticketMessageHandler = (id, message) => {
        setTimeout(() => $(`#${id}`).html(message), 500)
    }

    const closeTicketHandler = async (ticket) => {
        await getResponse(apipaths.closeticket, { ticket_id: ticket.id });
        userListHandler();
    }

    const fileHandler = (e) => {
        setFiles([]);
        for (let i = 0; i < (e.target.files).length; i++) {
            setFiles([...files, e.target.files[i]]);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setApiMess("uploading your reply...")
        const formdata = new FormData();
        formdata.append("message", ticketMessage)
        formdata.append("ticket_id", ticket.id)
        formdata.append("operation", "add")
        files.map((file) => {
            formdata.append("files[]", file);
        })
        await getResponse(apipaths.replyTicket, formdata)
        userListHandler();
        setTicketMessage("");
        setApiMess("")
    }


    return (
        <div className="page-inner usetTicket">
            <div className="row">
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link underline="hover" color="#5C55BF" 
                        //to={`/ticket`}
                        to="/"                        
                    >
                        Home
                    </Link>
                    <Link underline="hover" color="#5C55BF" 
                        //to={`/ticket`}
                        to="/tickets"

                       
                        
                    >
                        Tickets
                    </Link>
                    <Link underline="hover"color="#5C55BF"
                        to={`/ticket/details?ticketid=${ticket.id}`} 
                        
                    >
                        ${ticket.id}
                    </Link>
                </Breadcrumbs>
            </div>
            <div className="row">


                <div className="col-lg-4 col-12">
                    <TicketInformation ticket={ticket} closeTicketHandler={closeTicketHandler} />
                </div>
                <div className="col-lg-8 col-12 mt-4 mt-lg-0">
                    <div className="ticket-details card bg-white py-3">
                        <div className="ticket-details-container px-3">
                            <h3>View Ticket</h3>
                            <p className="text-lg ticket-subject">Subject: <b>{ticket.subject}</b></p>
                        </div>

                        {
                            ticket.ticket_activity && ticket.ticket_activity.map((t, i) => {
                                return (
                                    <div className="ticket-details-content">
                                        <div className="ticket-post-info">
                                            <div className="px-3 flex align-items-center justify-content-between">
                                                <p className="mb-0">Posted By {getUserNameById(t.activity_by)} on {dateHandler(t.created_at)}</p>
                                                {/* {
                                                    userDetails.id === t.activity_by ? (
                                                        <Button
                                                            type="primary"
                                                            style={{ background: "green", borderColor: "green" }}
                                                            shape="round"
                                                            size="small">
                                                            Owner
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            type="primary"
                                                            style={{ background: "#1986d9", borderColor: "#1986d9" }}
                                                            shape="round"
                                                            size="small">
                                                            Operator
                                                        </Button>
                                                    )
                                                } */}
                                            </div>
                                        </div>
                                        <div className="ticket-post-content mx-3">
                                            <p id={`${ticket.id}_${t.id}`}>{ticketMessageHandler(ticket.id + '_' + t.id, t.message)}</p>
                                            <div className="activity-image">
                                                {
                                                    t.files && t.files.map((file, i) => {
                                                        if (file.type.toLowerCase() === 'jpg' || file.type.toLowerCase() === 'png' || file.type.toLowerCase() === 'jpeg' || file.type.toLowerCase() === 'gif') {
                                                            return (
                                                                <a href={`${process.env.REACT_APP_BASE_URL}${file.path}`} target="_blank">
                                                                    <img className="img_reply mr-3 mb-3" key={i} src={`${process.env.REACT_APP_BASE_URL}${file.path}`} width={100} height={100} />
                                                                </a>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <a
                                                                    href={`${process.env.REACT_APP_BASE_URL}${file.path}`}
                                                                    class="other-attachment"
                                                                    shape="round"
                                                                    size="small"
                                                                    download
                                                                    target="_blank"
                                                                >
                                                                    <DownloadIcon className="MIcons" /> {file.name !== undefined ? file.name : ''}
                                                                </a>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {
                            ticket.status !== "Closed" && (
                                <div className="ticket-details-form-wrapper mx-3 mt-2">
                                    <div>
                                        <lable>Message <span className="text-danger">*</span></lable>
                                        <TextEditor value={ticketMessage}
                                            onChange={(e) => setTicketMessage(e)} />
                                    </div>

                                    <div className="mt-3">
                                        <h4>Attachments</h4>
                                        <form onSubmit={submitHandler}>
                                            <Form.Item
                                                name="upload"
                                                label="Upload"
                                                valuePropName="fileList"
                                                getValueFromEvent={normFile}
                                                extra="Upload attachments from here"
                                            >
                                                <Input className="form-control" type={"file"} multiple onChange={fileHandler} />
                                            </Form.Item>

                                            {
                                                <p className=" text-center text-success">{apiMess}</p>
                                            }

                                            <div className="container text-center">
                                                <button className="btn btn-info" type="submit">Submit</button>
                                                <button type="reset" id="form-reset-btn" className="btn btn-danger ml-3">Reset</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )

}

export default TicketDetails;