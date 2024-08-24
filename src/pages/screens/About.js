import Header from "../../components/Header";

import "../css/About.css";

function About() {
  return (
    <body className="abg">
      <Header />
      <br />
      <br />
      <div className="ab-hori">
        <h1 className="ab-t">President:</h1>
        <h1 className="ab-des"> Tucker Shank</h1>
      </div>

      <div className="ab-hori">
        <h1 className="ab-t">Vice President: </h1>
        <h1 className="ab-des"> Khalil Blount</h1>
      </div>
      <div className="ab-hori">
        <h1 className="ab-t">Treasurer: </h1>
        <h1 className="ab-des"> Mac Robinson</h1>
      </div>
      <div className="ab-hori">
        <h1 className="ab-t">Secretary:</h1>
        <h1 className="ab-des"> Arun Somasundaram</h1>
      </div>
      <div className="ab-hori">
        <h1 className="ab-t">Data Analyst: </h1>
        <h1 className="ab-des"> Mason Drabik</h1>
      </div>

      <div className="ab-hori">
        <h1 className="ab-t"> Social Media Chair: </h1>
        <h1 className="ab-des">Qiis Johnson</h1>
      </div>
    </body>
  );
}

export default About;
