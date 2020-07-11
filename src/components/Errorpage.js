import React from "react";
import { Link } from "react-router-dom";
export default function Errorpage() {
  return (
    <div style={{ height: "80vh", padding: "20px" }}>
      <h3 style={{ marginBottom: "10px" }}>There might be some kind of trouble!!</h3>
      <Link to="/">
        <button className="action-btn">
          Click here to get out of here
        </button>
      </Link>
    </div>
  );
}
