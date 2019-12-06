import React from "react";
import { Link } from "react-router-dom";
export default function Errorpage() {
  return (
    <div>
      <p>There might be some kind of trouble!!</p>
      <Link to="/">Click here to get out of here</Link>
    </div>
  );
}
