import Header from "../../components/Header";

import "../css/Account.css";

function Media() {
  return (
    <body className="abg">
      <Header />
      <h1 className="ab">Pictures</h1>
      <div className="img-track">
        <img
          src={require("../imgs/tourney.png")}
          alt="Logo"
          draggable="false"
        />
        <img src={require("../imgs/duke.png")} alt="Logo" draggable="false" />
        <img
          src={require("../imgs/uncc.png")}
          className="horizontal-img"
          alt="Logo"
          draggable="false"
        />

        <script async src="//www.instagram.com/embed.js"></script>
      </div>
    </body>
  );
}

export default Media;
