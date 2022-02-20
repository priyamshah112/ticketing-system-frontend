import react from "react";
import { useEffect } from "react/cjs/react.development";
import LayoutOne from "../layoutone";

function LayoutTwo() {

    useEffect(() => {
        var totalIncomeChart = document.getElementById('totalIncomeChart').getContext('2d');

		var mytotalIncomeChart = new window.Chart(totalIncomeChart, {
			type: 'bar',
			data: {
				labels: ["S", "M", "T", "W", "T", "F", "S", "S", "M", "T"],
				datasets : [{
					label: "Total Income",
					backgroundColor: '#ff9e27',
					borderColor: 'rgb(23, 125, 255)',
					data: [6, 4, 9, 5, 4, 6, 4, 3, 8, 10],
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false,
				},
				scales: {
					yAxes: [{
						ticks: {
							display: false //this will remove only the label
						},
						gridLines : {
							drawBorder: false,
							display : false
						}
					}],
					xAxes : [ {
						gridLines : {
							drawBorder: false,
							display : false
						}
					}]
				},
			}
		});
    }, [])
    return (
        <div className="card full-height">
            <div className="card-body">
                <div className="card-title">Total income & spend statistics</div>
                <div className="row py-3">
                    <div className="col-md-4 d-flex flex-column justify-content-around">
                        <div>
                            <h6 className="fw-bold text-uppercase text-success op-8">Total Income</h6>
                            <h3 className="fw-bold">$9.782</h3>
                        </div>
                        <div>
                            <h6 className="fw-bold text-uppercase text-danger op-8">Total Spend</h6>
                            <h3 className="fw-bold">$1,248</h3>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div id="chart-container">
                            <canvas id="totalIncomeChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutTwo;