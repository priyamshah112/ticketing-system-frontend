import React, { useEffect, useState } from "react";
import { getResponse } from "../../api/apiResponse";
import { apipaths } from "../../api/apiPaths";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTicketsAction } from "../../actions/ticketAction";
import AddTicket from "./AddTicket";
import { getUserLists } from "../../actions/userActions";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import { Modal } from "antd";
import $ from "jquery";
import queryString from "query-string";
import { dateFormatHandler } from "../../actions/commonAction";
import { Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Header from "../AdminDashboard/header";
import IconTabs from "../AdminDashboard/sidebar";

function Ticket(props) {
  const [ticketModal, setTicketModal] = useState(false);

  const [editTicket, setEditTicket] = useState();
  const [editTicketModel, setEditTicketModel] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [ticketinfo, setTicketInfo] = useState([]);
  const userDetails = useSelector((state) => state.userDetails);
  const ticketList = useSelector((state) => state.ticketList);
  const userList = useSelector((state) => state.userList);
  const userType = JSON.parse(localStorage.user_details).userType;
  const { status } = queryString.parse(window.location.search);
  const location = useLocation();
  const [ticketDataOnStatus, setTicketDataOnStatus] = useState([]);

  const columns = userType !== "User" ? [
    {
      title: "ID",
      field: "id",
      width: "10%",
    },
    {
      title: "Subject",
      field: "subject",
    },
    {
      title: "Created By",
      field: "user.name",
    },
    {
      title: "Created At",
      field: "created_at",
    },
    {
      title: "Assigned To",
      field: "support.name",
    },
    {
      title: "Status",
      field: "status",
    },
    {
      title: "Action",
      field: "edit",
      sorting: false,
    },
  ] : [
    {
      title: "ID",
      field: "id",
      width: "10%",
    },
    {
      title: "Subject",
      field: "subject",
    },
    {
      title: "Created By",
      field: "user.name",
    },
    {
      title: "Created At",
      field: "created_at",
    },
    {
      title: "Action",
      field: "edit",
      sorting: false,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    userListHandler();
    $("#filter-ticket").slideToggle(0);
  }, []);

  useEffect(() => {
    // // console.log(status)
    if (status) {
      filterSubmitHandler(status, true);
    }
  }, [status]);

  useEffect(() => {
    if (userList.length > 0) getTickets();
  }, [userList]);

  useEffect(() => {
    let ticketDataOnStatus = ticketList?.filter(
      (result) => result.status.props.children[1] === location?.state?.status
    );
    setTicketDataOnStatus(ticketDataOnStatus);
  }, [location?.state?.status]);

  const filterSubmitHandler = async (e, custom = false) => {
    e && e.preventDefault && e.preventDefault();

    let elem = $("#ticket-filter-form :input[value!='']")
      .filter(function (index, element) {
        return $(element).val() != "";
      })
      .serialize();
    // // console.log("custom: ", custom)
    if (custom) {
      elem = `status=${e}`;
    }

    let path = apipaths.listticket;
    path["url"] = path["url"].split("?")[0] + "?" + elem;

    const { data, error } = await getResponse(path);
    if (error) return toast.warn("Error in listing tickets.");

    setUsers(data.data.support);

    data.data.tickets.map((ticket) => {
      let username = "";
      let created_by = "";
      userList.map((user) => {
        if (ticket.assiged_to === user.id) {
          username = user.name;
        }

        if (ticket.created_by === user.id) {
          created_by = user.name;
        }
      });

      ticket.created_by = username;
      ticket.created_at = dateFormatHandler(ticket.created_at);
      if (ticket.subject.length > 30)
        ticket.subject = ticket.subject.substring(0, 30) + "...";

      //ticket.assiged_to = username;
      let ticketStatus = "";
      // eslint-disable-next-line default-case
      switch (ticket.status) {
        case "Closed":
          ticketStatus = (
            <div className="status status-suspended">
              <span></span> Closed
            </div>
          );
          break;
        case "In Progress":
          ticketStatus = (
            <div className="status status-success">
              <span></span> Open
            </div>
          );
          break;
        case "Pending":
          ticketStatus = (
            <div className="status status-pending">
              <span></span> Pending
            </div>
          );
          break;
      }
      ticket.status = ticketStatus;
      if (userType === "User") {
      }
      ticket.edit = (
        <div className="d-flex justify-content-center">
          {userType !== "User" && (
            <Tooltip title="Assign Tickets">
              <div>
                <i
                  className="fas fa-pen pr-3 table-icon bg-warning"
                  style={{ cursor: "pointer" }}
                  onClick={() => ticketAssignHandler(ticket)}
                ></i>
              </div>
            </Tooltip>
          )}
          <Tooltip title="View Ticket">
            <div>
              <i
                className="fa fa-eye bg-secondary ml-3 table-icon"
                onClick={() => ViewTicketHandler(ticket)}
              ></i>
            </div>
          </Tooltip>
        </div>
      );
      ticket.subject = (
        <Link
          style={{ fontWeight: 600 }}
          to={`/ticket/details?ticketid=${ticket.id}`}
        >
          {ticket.subject}
        </Link>
      );
    });

    dispatch(addTicketsAction(data.data.tickets));
  };

  const userListHandler = async () => {
    const { data } = await getResponse(apipaths.listusers, null);
    const users = data.data.user;
    dispatch(getUserLists(users));
  };

  const ViewTicketHandler = async (data) => {
    setIsModal(true);
    let ticket = [];
    ticket.push(data);
    setTicketInfo(ticket);
  };

  const getTickets = async () => {
    const { data, error } = await getResponse(apipaths.listticket);
    if (error) return toast.warn("Error in listing tickets.");

    setUsers(data.data.support);

    data.data.tickets.map((ticket) => {
      let username = "";
      let created_by = "";
      userList.map((user) => {
        if (ticket.assiged_to === user.id) {
          username = user.name;
        }

        if (ticket.created_by === user.id) {
          created_by = user.name;
        }
      });

      ticket.created_by = username;
      ticket.created_at = dateFormatHandler(ticket.created_at);
      if (ticket.subject.length > 30)
        ticket.subject = ticket.subject.substring(0, 30) + "...";

      //ticket.assiged_to = username;
      let ticketStatus = "";
      // eslint-disable-next-line default-case
      switch (ticket.status) {
        case "Closed":
          ticketStatus = (
            <div className="status status-suspended">
              <span></span> Closed
            </div>
          );
          break;
        case "In Progress":
          ticketStatus = (
            <div className="status status-success">
              <span></span> Open
            </div>
          );
          break;
        case "Pending":
          ticketStatus = (
            <div className="status status-pending">
              <span></span> Pending
            </div>
          );
          break;
      }
      ticket.status = ticketStatus;
      if (userType === "User") {
      }
      ticket.edit = (
        <div className="d-flex justify-content-center">
          {userType !== "User" && (
            <Tooltip title="Assign Tickets">
              <div>
                <i
                  className="fas fa-pen pr-3 table-icon bg-warning"
                  style={{ cursor: "pointer" }}
                  onClick={() => ticketAssignHandler(ticket)}
                ></i>
              </div>
            </Tooltip>
          )}
          <Tooltip title="View Ticket">
            <div>
              <i
                className="fa fa-eye bg-secondary ml-3 table-icon"
                onClick={() => ViewTicketHandler(ticket)}
              ></i>
            </div>
          </Tooltip>
        </div>
      );
      ticket.subject = (
        <Link
          style={{ fontWeight: 600 }}
          to={`/ticket/details?ticketid=${ticket.id}`}
        >
          {ticket.subject}
        </Link>
      );
    });

    dispatch(addTicketsAction(data.data.tickets));
  };

  const ticketAssignHandler = (ticket) => {
    setEditTicketModel(true);
    setEditTicket(ticket);
    setTicketId(ticket.id);
  };

  const onSubmit = async (ticket) => {
    ticket.append("created_by", userDetails.id);
    ticket.append("status", "Pending");
    ticket.append("operation", "add");

    const data = await getResponse(apipaths.addticket, ticket);
    if (data.status === 200) {
      toast.success(data.data.message);
      getTickets();
      setTicketModal(false);
    } else {
      toast.error(data.data.message);
    }
  };

  const assignToSubmitHandler = async (userId) => {
    if (userId) {
      let { data } = await getResponse(apipaths.assignTicket, {
        ticket_id: ticketId,
        assigned_to: parseInt(userId),
      });
      userListHandler();
      setEditTicketModel(false);
      toast.success(data.message);
    }
    setEditTicket();
    setTicketId();
  };

  return (
    <React.Fragment>
      {userType !== 'user' && (
        <>
          <Header />
          <IconTabs />
        </>
      )}
      <div className="panel-header bg-secondary-gradient">
        <div className="page-inner py-5">
          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
            <div>
              <h2 className="text-white pb-2 fw-bold">Tickets</h2>
              <h5 className="text-white op-7 mb-2">
                Manage Your Inventory And Tickets
              </h5>
            </div>
            <div className="ml-md-auto py-2 py-md-0">
              <a
                href="#"
                className="btn btn-white btn-border btn-round mr-2"
                onClick={() => $("#filter-ticket").slideToggle(300)}
              >
                Filters
              </a>
              <a
                href="javascript:void(0);"
                className="btn btn-primary btn-round"
                onClick={() => setTicketModal(true)}
              >
                Add Ticket
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="page-inner mt--5">
        <div className="card" id="filter-ticket">
          <div className="card-body">
            <form onSubmit={filterSubmitHandler} id="ticket-filter-form">
              <div className="row mx-auto">
                <div className="form-group col-md-12">
                  <h4 className="fw-bold">Search Ticket</h4>
                </div>

                <div className="form-group col-12 col-md-6 col-lg-4">
                  <label className="mb-2">Subject</label>
                  <input
                    name="subject"
                    type="text"
                    className="form-control filter-input"
                  />
                </div>
                {/* <div className="form-group col-12 col-md-6 col-lg-4">
                  <div className="form-group">
                    <label className="mb-2">Type</label>
                    <select name="type" className="form-control">
                      <option>Select Type</option>
                      <option>Hardware</option>
                      <option>Software</option>
                    </select>
                  </div>
                </div> */}
                <div className="form-group col-12 col-md-6 col-lg-4">
                  <label className="mb-2">Status</label>
                  <select name="status" className="form-control filter-status">
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                {userType !== "User" && (
                  <div className="form-group col-12 col-md-6 col-lg-4">
                    <label className="mb-2">Assigned To</label>
                    <select name="assigned_to" className="form-control">
                      <option value="">Select Assigned To</option>
                      {ticketList.length &&
                        ticketList.map((result) => {
                          if (result.support?.id) {
                            return (
                              <option
                                value={result.support?.id}
                                key={result.support?.id}
                              >
                                {result.support?.name
                                  ? result.support?.name
                                  : ""}
                              </option>
                            );
                          }

                          return "";
                        })}
                    </select>
                  </div>
                )}
                <div className="form-group col-12 col-md-6 col-lg-4">
                  <label className="mb-2">Created At</label>
                  <input
                    name="created_at"
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  {/* <div>
                        <label className="mb-2">Assigned Date</label>
                    </div>
                    <RangePicker className="form-control" name="assigned_date" /> */}
                </div>
                <div className="col-12 mt-3 text-right">
                  <button
                    className="btn  btn-secondary btn-radius"
                    type="submit"
                  >
                    Search
                  </button>
                  <button
                    className="btn  btn-secondary btn-border ml-3"
                    onClick={() => $("#filter-ticket").slideToggle(300)}
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-body p-0">
            <MaterialTable
              title=""
              data={ticketDataOnStatus.length ? ticketDataOnStatus : ticketList}
              columns={columns}
              options={{
                search: true,
                paging: true,
                pageSize: 20,
                emptyRowsWhenPaging: false,
                exportButton: false,
              }}
            />
          </div>
        </div>

        <div className="">
          {ticketModal && (
            <AddTicket
              setTicketModal={setTicketModal}
              ticketModal={ticketModal}
              onSubmit={onSubmit}
            />
          )}
        </div>
      </div>
      <Modal
        title="Assign Ticket"
        visible={editTicketModel}
        onOk={() => assignToSubmitHandler(false)}
        onCancel={() => setEditTicketModel(false)}
      >
        <div className="col-12 mt-4">
          <label>Ticket Name: {editTicket?.subject}</label>
        </div>
        <div className="col-12 mt-4">
          <label>Assign To</label>
          <select
            onChange={(e) => assignToSubmitHandler(e.target.value)}
            className="form-control"
          >
            <option value="">Choose User</option>
            {users &&
              users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
      </Modal>
      <Modal
        title="Ticket Details"
        visible={isModal}
        onOk={() => setIsModal(false)}
        onCancel={() => setIsModal(false)}
      >
        <div className="">
          <div>
            {ticketinfo &&
              ticketinfo.map((ticket, index) => (
                <>
                  <div className="row" key={index}>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Ticket Id:</span>
                      <span className="margin">{ticket.id}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Subject:</span>
                      <span className="margin">{ticket.subject}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Status:</span>
                      <span className="margin">{ticket.status}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Closed At:</span>
                      <span className="margin">{ticket.closed_at}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Created At:</span>
                      <span className="margin">{ticket.created_at}</span>
                    </div>
                    <div className="col-6 p-2">
                      <span className="fw-bold">Assigned Date:</span>
                      <span className="margin">{ticket.created_at}</span>
                    </div>
                  </div>
                </>
              ))}
          </div>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default Ticket;
