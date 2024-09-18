import { useState, useEffect, useRef } from "react";
import { txtDB, auth } from "../txtConfig";
import {
  average,
  collection,
  getAggregateFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import Header from "../../components/Header";

import "../css/Stats.css";

function Stats() {
  const [games, setGames] = useState(() => {
    const lv = localStorage.getItem("GAMES");
    if (lv == null) return [];
    return JSON.parse(lv);
  });

  const [avgs, setAVGs] = useState(() => {
    const lv = localStorage.getItem("AVGS");
    if (lv == null) return {};
    return JSON.parse(lv);
  });

  const [player, setPlayer] = useState(() => {
    const lv = localStorage.getItem("PLAYER");
    if (lv == null) return "";
    return JSON.parse(lv);
  });

  const [showSB, setSB] = useState(true);
  const [season, setSeason] = useState("");

  const se = useRef("");
  const pla = useRef("");

  //every time games changes local storage is updated
  useEffect(() => {
    localStorage.setItem("GAMES", JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    localStorage.setItem("PLAYER", JSON.stringify(player));
  }, [player]);

  //stores averages in local storage everytime avgs changes
  useEffect(() => {
    localStorage.setItem("AVGS", JSON.stringify(avgs));
  }, [avgs]);

  //gets games ordered based on filter choice;
  async function qC() {
    try {
      setGames([]);
      setAVGs({});
      if (auth.currentUser != null) {
        const colRef = collection(txtDB, season);
        var q = null;

        //non-opponent query
        q = await query(colRef, where(player, "!=", null));
        //gets averages over query
        const ss = await getAggregateFromServer(q, {
          ppg: average(player),
        });
        if (ss.ppg === undefined) {
          alert("No games played");
          return;
        }
        const data = await getDocs(q);
        data.forEach((g) => {
          const game = {
            points: g.data().Points,
          };

          setGames((ga) => [...ga, game]);
          setAVGs({
            points: Math.round(ss.data().ppg * 10) / 10,
            player: player,
          });
          setSB(false);
        });
      } else {
        alert("Provide Gmail to view stats");
      }
    } catch (err) {
      if (err.toString().includes(" Missing or insufficient permissions")) {
        alert("Provide Gmail to view stats");
      } else {
        alert(err);
        console.log(err);
      }
    }
  }

  return (
    <body className="statsbg">
      <>
        <Header />
        <br></br>
        <div className="row-container">
          <select
            required
            name="season"
            id="season"
            placeholder=""
            onChange={handleSeasonChange}
            ref={se}
          >
            <option value="">Which Season</option>
            <option value="24-25">2024-2025</option>
          </select>
          <select
            required
            name="player"
            id="player"
            placeholder=""
            onChange={handlePlayerChange}
            ref={pla}
          >
            <option value="">Player</option>
            <option value="Aidan">Aidan Driscoll </option>
            <option value="AJ">AJ Webb</option>
            <option value="Alex">Alexander Sidhu</option>
            <option value="Arun">Arun Soma</option>
            <option value="Ben">Ben Cohen-Vogel</option>
            <option value="Brian">Brian McGarth</option>
            <option value="Bryson">Bryson Tupper</option>
            <option value="Charles">Charles Maret</option>
            <option value="Davis">Davis Long</option>
            <option value="Denzel">Denzel Foster</option>
            <option value="Hugh">Hugh Wheeler</option>
            <option value="Jack">Jack Felkner</option>
            <option value="James">James Viola</option>
            <option value="Jedd">Jedd Wagner</option>
            <option value="Jonah">Jonah Chatowsky</option>
            <option value="Josh">Josh Crews</option>
            <option value="Kevin">Kevin Garcia</option>
            <option value="Khalil">Khalil Blount</option>
            <option value="Kharan">Kharan Joshi</option>
            <option value="Kris">Kris Pan</option>
            <option value="Liam">Liam Gates</option>
            <option value="Luke">Luke Evers</option>
            <option value="Mac">Mac Robinson</option>
            <option value="Mason">Mason Drabik</option>
            <option value="Matt">Matt Polsky</option>
            <option value="Nick">Nick Vecchiarello</option>
            <option value="Nyikos">Nyikos Fritts</option>
            <option value="Owen">Owen Jackson</option>
            <option value="Qiis">Qiis Johnson</option>
            <option value="Riley">Riley Haynie</option>
            <option value="Sam M">Sam Mirikwe</option>
            <option value="Sam T">Sam Turner</option>
            <option value="Sean">Sean Mclean</option>
            <option value="Seth">Seth Johnson</option>
            <option value="Spencer">Spencer Burton</option>
            <option value="Tucker">Tucker Shank</option>
            <option value="Ty'Rell">Ty'Rell McLucas</option>
          </select>
        </div>
        <div className="row-container">
          {showSB && (
            <button className="stats-btn" onClick={filled}>
              Get Stats
            </button>
          )}

          <button className="stats-btn" onClick={clear}>
            Clear Data
          </button>

          <button className="stats-btn" onClick={cf}>
            Clear Form
          </button>
        </div>

        <br></br>
        <div className="app-container">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{avgs.player}</td>
                <td>{avgs.points}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </body>
  );

  //handles changes of pickers
  function handleSeasonChange() {
    var e = document.getElementById("season");
    console.log(season);
    var value = e.options[e.selectedIndex].value;
    setSeason(value);
    setSB(true);
  }

  function handlePlayerChange() {
    var e = document.getElementById("player");
    var value = e.options[e.selectedIndex].value;
    console.log(player);
    setPlayer(value);
    setSB(true);
  }

  //resets local storage and games array
  function clear() {
    setGames([]);
    setAVGs({});
  }

  //clears the inputs
  function cf() {
    se.current.value = "";
    pla.current.value = "";
    setSeason("");
    setPlayer("");
  }

  //checks to make sure fields are filled out properly
  function filled() {
    if (season === "" || player === "") {
      alert("Fill everything out");
    } else {
      qC();
    }
  }
}
export default Stats;
