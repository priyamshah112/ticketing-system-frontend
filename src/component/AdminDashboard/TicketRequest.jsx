import React, { Component } from "react";
import Chart from "react-apexcharts";


class TicketRequest extends Component {
    constructor(props) {
        const { children, value, index, ...other } = props;
        super(props);

        this.state = {
            series: [{
                name: "Tickets",
                data: [...this.props.seriesData]
            }],
            options: {
                chart: {
                    toolbar: { show: false },
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                markers: {
                    size: [6],
                    colors: "#5C55BF",
                    strokeColors: "#5C55BF",
                    shape: "circle",
                    radius: 2,
                    fillOpacity: 0.1,
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#EAD063"],
                stroke: {
                    curve: 'smooth'
                },
                grid: {
                    show: true,
                    row: {
                        // colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.1
                    },
                    yaxis: {
                        lines: {
                            show: false
                        }
                    },
                    xaxis: {
                        lines: {
                            show: true
                        }
                    },
                },
                xaxis: {
                    categories: [...this.props.categories],
                    labels: {
                        show: false,
                    }
                },
                yaxis: {
                    show: false,
                }
            },
        }
    }
    // async componentDidMount() {
    //     const { data } = await getResponse(apipaths.getTicketRequest);
    //     console.log("getTicketRequest--- >", data);
    //     this.setState({
    //         count: data?.totalticket[0].count + data?.totalticket[1].count + data?.totalticket[2].count,
    //         series: [
    //             {
    //                 name: "Open Tickets",
    //                 data: [data?.totalticket[0].count, data?.totalticket[1].count, data?.totalticket[2].count]
    //             }
    //         ]
    //     })
    // }

    render() {
        console.log(this.props.seriesData)
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