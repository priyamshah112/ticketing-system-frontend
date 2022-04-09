import React, { Component } from "react";
import Chart from "react-apexcharts";
import { getResponse } from "../../api/apiResponse";
import { apipaths } from "../../api/apiPaths";
import TicketRequestTabs from "./TicketRequestTabs";

class TicketRequest extends Component {
    constructor(props) {
        const { children, value, index, ...other } = props;
        super(props);

        this.state = {
            count: 0,
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
                xaxis: {
                    categories: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep"
                    ]
                  },
                  legend: {
                    position: "bottom"
                  },
                  grid: {
                    show: true
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
    async componentDidMount() {
        const { data } = await getResponse(apipaths.getTicketRequest);
        console.log("getTicketRequest--- >", data);
        this.setState({
            count: data?.totalticket[0].count + data?.totalticket[1].count + data?.totalticket[2].count,
            series: [
                {
                    name: "Open Tickets",
                    data: [data?.totalticket[0].count, data?.totalticket[1].count, data?.totalticket[2].count]
                }
            ]
        })
    }

    render() {
        return (
            
                <div className="mixed-chart">
                    <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        width="100%"
                        height="230"
                    />
                </div>
        );
    }
}

export default TicketRequest;