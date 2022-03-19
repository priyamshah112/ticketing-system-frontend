import React from "react";

function LayoutThree() {

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-head-row">
                    <div className="card-title">User Statistics</div>
                    <div className="card-tools">
                        <a href="#" className="btn btn-info btn-border btn-round btn-sm mr-2">
                            <span className="btn-label">
                                <i className="fa fa-pencil"></i>
                            </span>
                            Export
                        </a>
                        <a href="#" className="btn btn-info btn-border btn-round btn-sm">
                            <span className="btn-label">
                                <i className="fa fa-print"></i>
                            </span>
                            Print
                        </a>
                    </div>
                </div>
            </div>
            {/* <div className="card-body">
                <div className="chart-container" style="min-height: 375px">
                    <canvas id="statistifcsChart"></canvas>
                </div>
                <div id="myChartLegend"></div>
            </div> */}
        </div>
    )
}

export default LayoutThree;