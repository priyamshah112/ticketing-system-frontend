import { Card } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function DashboardCard(props) {
  const { data, num } = props;

  const colorArr = ["#ff0000", "#fac72c", "#27723C"];
  const redirectLink = ["/tickets?status=open", "/tickets?status=pending", "/inventory/hardware"];
  return (
    <Link to={ `${redirectLink[num]}`}>
      <div className="dashboard-card flex justify-content-between">
        <div>
          <div>
            <p
              className="mb-0 dashboard-card-title"
              style={{ color: colorArr[num], fontWeight: "bold" }}
            >
              {data.title}
            </p>
          </div>
          <div className="mt-4" >
            <p className="mb-0" className="card-progress-total mb-0">
              {data.total}
            </p>
            <p className="mb-0" style={{ color: colorArr[num], fontWeight: "bold" }}>
              <span className="card-progress-icon">
                <i
                  className={`fa ${
                    data.progress.type === "up"
                      ? "fa-arrow-up card-progress-up"
                      : "fa-arrow-down card-progress-down"
                  } f-14 mr-1`}
                  style={{ color: colorArr[num], fontWeight: "bold" }}
                ></i>
              </span>
              <span
                className={` ${
                  data.progress.type === "up"
                    ? "card-progress-up"
                    : "card-progress-down"
                }`}
                style={{ color: colorArr[num], fontWeight: "bold" }}
              >
                {data.progress.value}
              </span>
            </p>
          </div>
        </div>
        <div className="card-sec-two align-items-center">
          <p className="f-14 card-lastchecked mb-0">{data.lastChecked}</p>
          <p className="f-14 card-lastchecked mb-0">
            <img src={data.icon} />
          </p>
        </div>
      </div>
    </Link>
  );
}

export default DashboardCard;
