import React from "react";
import { Link } from "react-router-dom";
export default function Errorpage() {
  return (
    <div style={{ height: "40vh" }}>
      <p style={{ marginLeft: "auto", marginRight: "auto" }}>
        <h3>There might be some kind of trouble!!</h3>
      </p>
      <Link to="/">
        <button className="waves-effect waves-light btn">
          Click here to get out of here
        </button>
      </Link>
    </div>
  );
}
