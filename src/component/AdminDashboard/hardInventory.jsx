import React from "react"
import ReactApexChart from "react-apexcharts";
import CenteredTabs from "./priority-ticket";
import PriorityTickets from "./priority-ticket";
import { getResponse } from "../../api/apiResponse";
import { apipaths } from "../../api/apiPaths";

class HardInventory extends React.Component {

    state = {
        series: [{
            data: [1, 2, 3]
        }],
        options: {
            chart: {
                toolbar: { show: false },
                type: 'bar',
                height: 150,
            },
            plotOptions: {
                bar: {
                    barHeight: '100%',
                    borderRadius: 4,
                    distributed: true,
                    horizontal: true,
                    columnWidth: '70%'
                    // dataLabels: {
                    //     position: 'bottom'
                    // },
                }
            },
            colors: ['#5C55BF', '#EAD063', '#62BC46'

            ],
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                    colors: ['#fff']
                },
                formatter: function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                },
                offsetX: 0,
                dropShadow: {
                    enabled: true
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: ["totalinventory", "available", "assign"
                ],
            },
            yaxis: {
                labels: {
                    show: false
                }
            },
            tooltip: {
                theme: 'dark',
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function () {
                            return ''
                        }
                    }
                }
            }
        },


    };

    componentDidMount() {
        this.getHardwareData()
    }

    getHardwareData = async () => {
        const { data } = await getResponse(apipaths.getHardwareInventory)
        let seriesData = Object.values(data?.data[0])
        let series = [{
            data: seriesData
        }]
        this.setState({
            series
        })
    }



    render() {
        // console.log(Object.values(this.props.inventoryData[0]))
        return (
            <>
                <div className="col-4">
                    <div className="category__box category__box__ht__min" style={{ overflowY: "hidden" }}>
                        <p className="category__title m-0">hardware inventory</p>
                        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={150} className="verticalCharts" />
                    </div>
                    <div className="category__box category__box__ht__max">
                        <p className="category__title">ticket priority level</p>
                        <CenteredTabs priorityTickets={this.props.priorityTickets} />

                    </div>
                </div>
            </>
        );
    }
}

export default HardInventory;