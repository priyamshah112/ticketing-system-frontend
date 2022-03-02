import { Footer } from "antd/lib/layout/layout";
import React from "react";
import Navbar from "./navbar";

function Index2(){
    return(
      <>
      <div className="wrapper">
		
        <div className="">
            <Navbar />       
        </div>
		<div className="main-panel">
			<div className="content">
				<div className="panel-header bg-primary-gradient">
					<div className="page-inner py-5">
						<div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
							<div>
								<h2 className="text-white pb-2 fw-bold">Dashboard</h2>
								<h5 className="text-white op-7 mb-2">Free Bootstrap 4 Admin Dashboard</h5>
							</div>
							<div className="ml-md-auto py-2 py-md-0">
								<a href="#" className="btn btn-white btn-border btn-round mr-2">Manage</a>
								<a href="#" className="btn btn-secondary btn-round">Add Customer</a>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			{/* <footer className="footer">
				<div className="container-fluid">
					<nav className="pull-left">
						<ul className="nav">
							<li className="nav-item">
								<a className="nav-link" href="https://www.themekita.com/">
									ThemeKita
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Help
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Licenses
								</a>
							</li>
						</ul>
					</nav>
					<div className="copyright ml-auto">
						2018, made with <i className="fa fa-heart heart text-danger"></i> by <a href="https://www.themekita.com/">ThemeKita</a>
					</div>				
				</div>
			</footer> */}
		</div>
	</div>
      </>
    )
}

export default Index2;