import React from "react"
import ReactApexChart from "react-apexcharts";
import CenteredTabs from "./priority-ticket";
import PriorityTickets from "./priority-ticket";
import { getResponse } from "../../api/apiResponse";
import { apipaths } from "../../api/apiPaths";
import ProgressBar from "../ProgressBar/progress-bar";
import { Link } from "react-router-dom";

class HardInventory extends React.Component {

    state = {
        totalLaptop : 0,
        totalLaptopValue : 0,
        availableLaptop : 0,
        availableLaptopValue : 0,
        assignedLaptop : 0,
        assignedLaptopValue : 0
    }

    componentDidMount() {
        this.getHardwareData()
    }
    getHardwareData = async () => {
        const { data } = await getResponse(apipaths.getHardwareInventory)
        this.setState({
            totalLaptop : (data.data[0].totalinventory / data.data[0].totalinventory)*100,
            totalLaptopValue : data.data[0].totalinventory,
            availableLaptop : (data.data[0].available / data.data[0].totalinventory)*100,
            availableLaptopValue : data.data[0].available,
            assignedLaptop : (data.data[0].assign / data.data[0].totalinventory)*100,
            assignedLaptopValue : data.data[0].assign
        })


    }


    render() {
        return (
            <>
                <div className="col-12 col-md-6 col-lg-6 col-xl mb-3 mb-sm-0">
                    <div className="category__box category__box__ht__min" style={{ overflowY: "hidden" }}>
                        <p className="category__title m-0">hardware inventory</p>
                        <div className="py-4">
                            <Link to={`/inventory/hardware?hardware_type=Laptop`}><ProgressBar label={"Total Laptops"} width={this.state.totalLaptop} count={this.state.totalLaptopValue} backgroundColor={'#5C55BF'} /></Link>
                            <Link to={`/inventory/hardware?hardware_type=Laptop&status=Available`}><ProgressBar label={"Available Laptops"} width={this.state.availableLaptop} count={this.state.availableLaptopValue} backgroundColor={'#EAD063'} color={"#2D3142"}/></Link>
                            <Link to={`/inventory/hardware?hardware_type=Laptop&status=Not Available`}><ProgressBar label={"Assigned Laptops"} width={this.state.assignedLaptop} count={this.state.assignedLaptopValue} backgroundColor={'#62BC46'} color={"#2D3142"}/></Link>
                        </div>
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