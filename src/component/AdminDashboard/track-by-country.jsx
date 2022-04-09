import React, { Component } from "react";
import Chart from "react-apexcharts";
import track from "../../../src/images/admin-dashboard/track.svg";

class TrackByCountry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 120,
            options: {
                chart: {
                    toolbar: { show: false },
                    id: "basic-bar",
                },
                plotOptions: {
                    bar: {
                        borderRadius: 5,
                        startingShape: 'rounded',
                        columnWidth: '30%',
                    }
                },
                colors: ['#5C55BF', '#5C55BF', '#5C55BF'

                ],
                xaxis: {
                    categories: ["In", "US", "CR"]
                },
                dataLabels: {
                    enabled: false,
                }
            },
            series: [
                {
                    name: "Open Tickets",
                    data: [15, 25, 50,]
                }
            ]
        };
    }

    render() {
        return (
            <div className="category__box category__box__ht__max">
                <p className="category__title m-0">track by country</p>

                <div className="mixed-chart">
                    <img src={track} className="dashboard__white__icon" />
                    <p className="mixed-chart-title">OPEN TICKETS</p>
                    <p className="mixed-chart-count">{this.state.count}</p>
                    <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="bar"
                        width="100%"
                        height="230"
                    />
                </div>
            </div>
        );
    }
}

export default TrackByCountry;