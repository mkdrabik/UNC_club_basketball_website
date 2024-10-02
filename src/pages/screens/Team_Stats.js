import { useState, useEffect, useRef } from "react";
import { txtDB, auth } from "../txtConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

import Header from "../../components/Header";

import "../css/Team_Stats.css";

function Team_Stats() {
  const [games, setGames] = useState(() => {
    const lv = localStorage.getItem("TEAM_GAMES");
    if (lv == null) return [];
    return JSON.parse(lv);
  });

  const [season, setSeason] = useState("");

  const se = useRef("");
  //every time games changes local storage is updated
  useEffect(() => {
    localStorage.setItem("GAMES", JSON.stringify(games));
  }, [games]);

  //gets games ordered based on filter choice;
  async function qC() {
    try {
      setGames([]);
      if (auth.currentUser != null) {
        const colRef = collection(txtDB, season);
        var q = null;
        q = await query(colRef, where("Game", "!=", null));
      } else {
        alert("Provide Email to view stats");
      }
    } catch (err) {
      if (err.toString().includes(" Missing or insufficient permissions")) {
        alert("Provide Email to view stats");
      } else {
        alert(err);
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
        </div>
        <div className="row-container">
          <button className="stats-btn" onClick={filled}>
            Get Games
          </button>

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
                <th>Opponent</th>
                <th>Score</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Wake Forest</td>
                <td>73 - 69</td>
                <td>Win</td>
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
  }

  //   function handlePlayerChange() {
  //     var e = document.getElementById("player");
  //     var value = e.options[e.selectedIndex].value;
  //     console.log(player);
  //     setPlayer(value);
  //     setSB(true);
  //   }

  //resets local storage and games array
  function clear() {
    setGames([]);
  }

  //clears the inputs
  function cf() {
    se.current.value = "";
    setSeason("");
  }

  //checks to make sure fields are filled out properly
  function filled() {
    if (season === "") {
      alert("Fill everything out");
    } else {
      qC();
    }
  }
}
export default Team_Stats;
