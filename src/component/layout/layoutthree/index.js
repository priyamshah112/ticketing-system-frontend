import React from "react";

function LayoutThree() {

    return (
        <div class="card">
            <div class="card-header">
                <div class="card-head-row">
                    <div class="card-title">User Statistics</div>
                    <div class="card-tools">
                        <a href="#" class="btn btn-info btn-border btn-round btn-sm mr-2">
                            <span class="btn-label">
                                <i class="fa fa-pencil"></i>
                            </span>
                            Export
                        </a>
                        <a href="#" class="btn btn-info btn-border btn-round btn-sm">
                            <span class="btn-label">
                                <i class="fa fa-print"></i>
                            </span>
                            Print
                        </a>
                    </div>
                </div>
            </div>
            {/* <div class="card-body">
                <div class="chart-container" style="min-height: 375px">
                    <canvas id="statistifcsChart"></canvas>
                </div>
                <div id="myChartLegend"></div>
            </div> */}
        </div>
    )
}

export default LayoutThree;