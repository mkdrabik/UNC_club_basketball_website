import { InstagramEmbed } from "react-social-media-embed";

import Header from "../../components/Header";

import "../css/Media.css";

function Media() {
  return (
    <body className="abg">
      <Header />
      <h1 className="ab">Pictures</h1>
      <div className="img-track">
        <div>
          <InstagramEmbed
            url="https://www.instagram.com/p/DAWVptrJ_qR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
            width={350}
            height={480}
          ></InstagramEmbed>
        </div>
        <img
          src={require("../imgs/tourney.png")}
          alt="Logo"
          draggable="false"
          className="vertical-img"
        />
        <img
          src={require("../imgs/duke.png")}
          alt="Logo"
          className="vertical-img"
          draggable="false"
        />

        <img
          src={require("../imgs/uncc.png")}
          className="horizontal-img"
          alt="Logo"
          draggable="false"
        />
      </div>
    </body>
  );
}

export default Media;
