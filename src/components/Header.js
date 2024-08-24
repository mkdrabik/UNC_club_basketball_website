import { React } from "react";
import { Link } from "react-router-dom";

import "./header.css";

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("body").style.opacity = 1;
});

function Header() {
  return (
    <div class="header">
      <nav class="navbar">
        <ul>
          <li>
            <span>
              <Link to="/account">Email</Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/stat_form">Log Stats</Link>
            </span>
          </li>
          <li>
            <Link to="/about" className="cname">
              <img
                src={require("./unc.png")}
                alt="Logo"
                draggable="false"
                className="logo"
              />
            </Link>
          </li>
          <li>
            <span>
              <Link to="/stats">View Stats</Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/media">Media</Link>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
