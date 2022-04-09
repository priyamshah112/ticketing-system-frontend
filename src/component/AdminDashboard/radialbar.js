import React from "react"
import ReactApexChart from "react-apexcharts";

class RadialBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [this.props.series],
            options: {
                chart: {
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: "35%"
                        },

                        dataLabels: {
                            show: false,
                        }
                    }
                },

                stroke: {
                    lineCap: "round",
                },
                labels: [""],
                colors: [this.props.color],
               
            },
        };
    }



    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={110} />
            </div>

        );
    }
}

export default RadialBar