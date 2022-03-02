import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import $ from "jquery"

function LayoutOne(props) {
  const { tickets, data } = props;
  const [ticketList, setTicketList] = useState({});
  const userDetails = useSelector(state => state.userDetails);

  useEffect(() => {

    if (data && data.faqs && data.faqs.length > 0) {

      let x = tickets.filter((t) => t.status === "Pending");
      let y = tickets.filter((t) => t.status === "Closed");

      setTicketList({ ...ticketList, pending: x });
      setTicketList({ ...ticketList, closed: y });

      if (tickets.length > 0) {
        window.Circles.create({
          id: "circles-1",
          radius: 45,
          value: data.totalCustomers,
          maxValue: 100,
          width: 7,
          text: data.totalCustomers.toString(),
          colors: ["#f1f1f1", "#FF9E27"],
          duration: 400,
          wrpClass: "circles-wrp",
          textClass: "circles-text",
          styleWrapper: true,
          styleText: true,
        });

        window.Circles.create({
          id: "circles-2",
          radius: 45,
          value: data.totalHardwares,
          maxValue: 100,
          width: 7,
          text: data.totalHardwares.toString(),
          colors: ["#f1f1f1", "#2BB930"],
          duration: 400,
          wrpClass: "circles-wrp",
          textClass: "circles-text",
          styleWrapper: true,
          styleText: true,
        });

        window.Circles.create({
          id: "circles-3",
          radius: 45,
          value: data.totalOpenTickets,
          maxValue: 100,
          width: 7,
          text: data.totalOpenTickets.toString(),
          colors: ["#f1f1f1", "#F25961"],
          duration: 400,
          wrpClass: "circles-wrp",
          textClass: "circles-text",
          styleWrapper: true,
          styleText: true,
        });

        window.Circles.create({
          id: "circles-4",
          radius: 45,
          value: data.totalSoftware,
          maxValue: 100,
          width: 7,
          text: data.totalSoftware.toString(),
          colors: ["#f1f1f1", "#F25961"],
          duration: 400,
          wrpClass: "circles-wrp",
          textClass: "circles-text",
          styleWrapper: true,
          styleText: true,
        });

        window.Circles.create({
          id: "circles-5",
          radius: 45,
          value: data.totalTickets,
          maxValue: 500,
          width: 7,
          text: data.totalTickets.toString(),
          colors: ["#f1f1f1", "#F25961"],
          duration: 400,
          wrpClass: "circles-wrp",
          textClass: "circles-text",
          styleWrapper: true,
          styleText: true,
        });
      }

    }

  }, [tickets, data]);

  return (
    <div class="card full-height">
      <div class="card-body">
        <div class="card-title">Overview</div>
        {/* <div class="card-category">
          Daily information about statistics in system
        </div> */}
        <div class="d-flex flex-wrap justify-content-around pb-2 pt-4">
          {
            userDetails.userType !== "Support" && userDetails.userType !== "Staff" && userDetails.userType !== "User" && (
              <div class="px-2 pb-2 pb-md-0 text-center">
                <div id="circles-1"></div>
                <h6 class="fw-bold mt-3 mb-0">Total Customers</h6>
              </div>
            )
          }

          <div class="px-2 pb-2 pb-md-0 text-center">
            <div id="circles-2"></div>
            <h6 class="fw-bold mt-3 mb-0">Total Hardware</h6>
          </div>
          <div class="px-2 pb-2 pb-md-0 text-center">
            <div id="circles-3"></div>
            <h6 class="fw-bold mt-3 mb-0">Total Open Tickets</h6>
          </div>
          <div class="px-2 pb-2 pb-md-0 text-center">
            <div id="circles-4"></div>
            <h6 class="fw-bold mt-3 mb-0">Total Open Tickets</h6>
          </div>
          <div class="px-2 pb-2 pb-md-0 text-center">
            <div id="circles-5"></div>
            <h6 class="fw-bold mt-3 mb-0">Total Software</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutOne;
