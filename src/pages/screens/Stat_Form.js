import { useState, useEffect, useRef } from "react";
import { txtDB, auth } from "../txtConfig";
import { doc, setDoc } from "firebase/firestore";

import Header from "../../components/Header";

import "../css/Stat_Form.css";

// TODO: Get roster and add option for every player
function StatForm() {
  const [game, setGame] = useState({
    date: "",
    opponent: "",
    win: "",
    game: "",
  });

  const [players, setPlayers] = useState({});
  const [player, setPlayer] = useState("");
  const [points, setPoints] = useState("");
  const d = useRef("");
  const o = useRef("");
  const w = useRef("");
  const ga = useRef("");
  const p = useRef("");
  const pts = useRef("");
  var emp = true;

  //Resets form whenever page is refreshed
  useEffect(() => {
    setGame({
      win: "",
      opponent: "",
      date: "",
      game: "",
      players: {},
    });
    clear();
  }, []);

  //Handle Data Upload
  const handleUpload = async () => {
    try {
      game.date.toString();
      await setDoc(
        doc(txtDB, "24-25", game.date.toString() + " " + game.opponent),
        {
          Opponent: game.opponent,
          Win: game.win,
          Date: game.date,
          Game: game.game,
        }
      );
      alert("Data added successfully.");
    } catch (err) {
      if (
        err.toString() ===
        "FirebaseError: [code=permission-denied]: Missing or insufficient permissions."
      ) {
        alert("Contact drabikmason12@gmail.com to log stats");
      } else {
        alert("Idk what happened");
      }
      emp = true;
    }
  };

  return (
    <body class="sf-bg">
      <Header />
      <div className="sf-overall">
        <div className="col">
          <div className="row">
            <button
              className="sf-sub"
              onClick={printPlayers}
              //() => {
              //   if (!auth.currentUser) {
              //     alert("Sign in to log stats");
              //   } else {
              //     filled();
              //   }
              // }}
            >
              Submit
            </button>
            <h1 className="sf-title">Game</h1>
            <button className="sf-reset" onClick={clear}>
              Reset
            </button>
          </div>
          <br />

          <select
            required
            name="outcome"
            id="outcome"
            placeholder=""
            onChange={handleWinChange}
            ref={w}
          >
            <option value="">Outcome?</option>
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
          </select>
          <br />
          <br />

          <input
            placeholder="Opponent?"
            ref={o}
            type="text"
            className="sf-input-box"
            onChange={handleOpponentChange}
          />
          <br />
          <br />

          <input
            required
            placeholder=""
            type="date"
            ref={d}
            className="sf-input-box"
            onChange={handleDateChange}
          />
          <br />
          <br />
          <input
            placeholder="Game #"
            ref={ga}
            type="number"
            className="sf-input-box"
            onChange={handleGameChange}
          />
          <br />
          <br />
          <div className="row">
            <input
              placeholder="Player"
              type="input"
              className="sf-input-box"
              ref={p}
              onChange={handlePlayerChange}
            />
            <input
              placeholder="Points"
              type="number"
              className="sf-input-box"
              ref={pts}
              onChange={handlePointChange}
            />
            <button className="sf-reset" onClick={addPlayerPts}>
              Add Player
            </button>
          </div>
          {Object.entries(players).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </body>
  );

  //Functions to edit game item
  function handleWinChange() {
    var e = document.getElementById("outcome");
    var value = e.options[e.selectedIndex].value;
    setGame((g) => ({ ...game, win: value }));
  }

  function handleDateChange(e) {
    setGame((g) => ({ ...game, date: e.target.value }));
  }
  function handleOpponentChange(e) {
    setGame((g) => ({ ...game, opponent: e.target.value }));
  }

  function handleGameChange(e) {
    setGame((g) => ({ ...game, game: e.target.value }));
  }

  function handlePlayerChange(e) {
    setPlayer(e.target.value);
  }

  function handlePointChange(e) {
    if (e.target.value >= 0) {
      setPoints(e.target.value);
    } else {
      e.target.value = 0;
    }
  }

  function addPlayerPts(e) {
    setPlayers((p) => ({ ...players, [player]: points }));
    p.current.value = "";
    pts.current.value = "";
  }

  function printPlayers() {
    for (let key in players) {
      console.log(`${key}: ${players[key]}`);
    }
  }

  //Checks to see if all fields are filled then calls handle upload
  function filled() {
    emp = false;
    for (let key in game) {
      if (game[key] === "" || game[key] === null) {
        emp = true;
        alert("Fill everything out");
        break;
      }
    }
    if (emp === false) {
      handleUpload();
      if (emp === false) {
        clear();
      } else {
        alert("Enter a valid date");
      }
    }
  }

  //Sets everything empty
  function clear() {
    d.current.value = "";
    w.current.value = "";
    o.current.value = "";
    p.current.value = "";
    pts.current.value = "";

    setGame({
      win: "",
      opponent: "",
    });

    setPlayers({});
  }
}

export default StatForm;
