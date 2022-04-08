import React, { Component } from "react";
import Chart from "react-apexcharts";

class TrackByCountry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    toolbar: { show: false },
                    id: "basic-bar",
                },
                plotOptions: {
                    bar: {
                        columnWidth: '30%',
                    }
                },
                colors: ['#5C55BF', '#5C55BF', '#5C55BF'

                ],
                xaxis: {
                    categories: ["In", "US", "CN"]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [15, 25, 50,]
                }
            ]
        };
    }

    render() {
        return (
            <div className="category__box category__box__ht__max">
                <p className="category__title m-0">track by country</p>

                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="bar"
                                width="400"
                                height="150"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrackByCountry;