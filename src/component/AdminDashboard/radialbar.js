import React from "react"
import ReactApexChart from "react-apexcharts";

class RadialBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            series: [this.props.series],
            options: {
                chart: {
                    height: 100,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: "40%"
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
                <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={150} />
            </div>

        );
    }
}

export default RadialBar