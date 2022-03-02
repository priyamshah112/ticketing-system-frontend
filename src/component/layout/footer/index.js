import React from "react";

function Footer() {

    return (      
      <footer className="footer">
        <div className="container-fluid">
          <nav className="pull-left">
            <ul className="nav">
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  Help
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);">
                  Licenses
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright ml-auto">
            2022, made with <i className="fa fa-heart heart text-danger"></i> by <a href="javascript:void(0);">Enhanced Compliance</a>
          </div>				
        </div>
      </footer>
    )
}

export default Footer;