import React from "react";

// import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper ">
        <div className="container">
          <div className=" align-center ">
            {/* <img src="./logo.png" className="center-align" /> */}
            <h4>Pizza-Burst</h4>
          </div>
          {/* <ul id="nav-mobile" className="left ">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
}
