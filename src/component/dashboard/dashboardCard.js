import { Card } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function DashboardCard(props) {
  const { data, num } = props;

  const colorArr = ["#f25961", "#ff9e27", "#2bb930"];
  const redirectLink = ["/tickets?status=open", "/tickets?status=pending", "/inventory/hardware"];
  return (
    <Link to={ `${redirectLink[num]}`}  className="card full-height">      
      <div className="card-body flex justify-content-between">
        <div className="card-title" style={{ color: colorArr[num], fontWeight: "bold" }}>{data.title}</div>
        {/* <div className="card-category">Daily information about statistics in system</div> */}
        <div className="d-flex flex-wrap justify-content-around pb-2 pt-4 align-items-center">
          <div className="align-items-center">
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
          <div className="card-sec-two align-items-left">
            <p className="f-14 card-lastchecked mb-0">{data.lastChecked}</p>
            <p className="f-14 card-lastchecked mb-0">
              <img src={data.icon} />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DashboardCard;
