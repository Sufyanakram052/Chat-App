import React, { useState } from "react";
import "./join.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

let user;

const Join = () => {
  const [name, setName] = useState("");

  const senduser = () => {
    user = document.getElementById("inputTag").value;
    document.getElementById("inputTag").value = " ";
  };

  return (
    <div className="JoinPage">
      <div className="joinContainer">
        <img src={logo} alt="logo" />
        <h1>CHAT APP</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Your Name"
          id="inputTag"
        />
        <Link
          onClick={(event) => (!name ? event.preventDefault() : null)}
          to="/chat"
        >
          <button className="joinbtn" onClick={senduser}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
