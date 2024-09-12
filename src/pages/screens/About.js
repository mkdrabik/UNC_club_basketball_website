import Header from "../../components/Header";
import { Link } from "react-router-dom";

import "../css/About.css";

function About() {
  return (
    <body className="abg">
      <Header />
      <br />
      <br />
      <div className="ab-horizontal">
        <div className="ab-vertical">
          <div className="ab-horizontal">
            <h1 className="ab-t">President:</h1>
            <h1 className="ab-des"> Tucker Shank</h1>
          </div>

          <div className="ab-horizontal">
            <h1 className="ab-t">Vice President: </h1>
            <h1 className="ab-des"> Khalil Blount</h1>
          </div>
          <div className="ab-horizontal">
            <h1 className="ab-t">Treasurer: </h1>
            <h1 className="ab-des"> Mac Robinson</h1>
          </div>
          <div className="ab-horizontal">
            <h1 className="ab-t">Secretary:</h1>
            <h1 className="ab-des"> Arun Somasundaram</h1>
          </div>
          <div className="ab-horizontal">
            <h1 className="ab-t">Data Analyst: </h1>
            <h1 className="ab-des"> Mason Drabik</h1>
          </div>

          <div className="ab-horizontal">
            <h1 className="ab-t"> Social Media Chair: </h1>
            <h1 className="ab-des">Qiis Johnson</h1>
          </div>
        </div>
        <div className="ab-vertical2">
          <Link to="https://account.venmo.com/u/m_drabik">
            <img
              src={require("../imgs/venmo.png")}
              className="logo2"
              alt="Logo"
              draggable="false"
            />
          </Link>
          <Link to="https://www.instagram.com/m_drabik/">
            <img
              src={require("../imgs/ig.webp")}
              className="logo2"
              alt="Logo"
              draggable="false"
            />
          </Link>
        </div>
      </div>
    </body>
  );
}

export default About;
