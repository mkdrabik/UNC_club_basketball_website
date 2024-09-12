import { useState, useEffect, useRef } from "react";
import { txtDB, auth } from "../txtConfig";
import { doc, setDoc } from "firebase/firestore";

import Header from "../../components/Header";

import "../css/Stat_Form.css";

// TODO: Get roster and add option for every player
function StatForm() {
  const [game, setGame] = useState({
    Date: "",
    Opponent: "",
    Win: "",
    Game: "",
    Opponent_score: "",
    Our_score: "",
  });

  const [players, setPlayers] = useState({});
  const [player, setPlayer] = useState(0);
  const [points, setPoints] = useState(0);
  const d = useRef("");
  const o = useRef("");
  const w = useRef("");
  const ga = useRef(0);
  const p = useRef("");
  const pts = useRef(0);
  const os = useRef(0);
  const us = useRef(0);
  var emp = true;

  //Resets form whenever page is refreshed
  useEffect(() => {
    clear();
  }, []);

  //Handle Data Upload
  const handleUpload = async () => {
    try {
      const dataToSet = {};

      Object.keys(players).forEach((key) => {
        dataToSet[key] = Number(players[key]);
      });

      const comb = { ...game, ...dataToSet };
      game.Date.toString();
      await setDoc(
        doc(
          txtDB,
          "24-25",
          game.Date.toString() + " " + game.Opponent + " " + game.Game
        ),
        comb
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
        console.log(err);
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
              onClick={() => {
                if (!auth.currentUser) {
                  alert("Sign in to log stats");
                } else {
                  filled();
                }
              }}
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
          <div className="row">
            <input
              placeholder="Our Score"
              ref={us}
              type="number"
              className="sf-input-box"
              onChange={handleUSChange}
            />
            <input
              placeholder="Opponent Score"
              ref={os}
              type="number"
              className="sf-input-box"
              onChange={handleOSChange}
            />
          </div>
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
            <button className="sf-sub" onClick={addPlayerPts}>
              Add Player
            </button>
          </div>
          {Object.entries(players).map(([key, value]) => (
            <div className="row" key={key}>
              <h1 className="player-text">
                {key}: {value}pts
              </h1>
              <button
                className="sf-reset"
                onClick={() => {
                  {
                    delete players[key];
                    setPlayers((p) => ({ ...players }));
                  }
                }}
              >
                Delete
              </button>
            </div>
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
    setGame((g) => ({ ...game, Win: value }));
  }

  function handleDateChange(e) {
    setGame((g) => ({ ...game, Date: e.target.value }));
  }
  function handleOpponentChange(e) {
    setGame((g) => ({ ...game, Opponent: e.target.value }));
  }

  function handleGameChange(e) {
    if (e.target.value >= 0) {
      setGame((g) => ({ ...game, Game: Number(e.target.value) }));
    } else {
      e.target.value = 0;
    }
  }

  function handleOSChange(e) {
    if (e.target.value >= 0) {
      setGame((g) => ({ ...game, Opponent_score: Number(e.target.value) }));
    } else {
      e.target.value = 0;
    }
  }

  function handleUSChange(e) {
    if (e.target.value >= 0) {
      setGame((g) => ({ ...game, Our_score: Number(e.target.value) }));
    } else {
      e.target.value = 0;
    }
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
    ga.current.value = "";
    os.current.value = "";
    us.current.value = "";

    setGame({
      Win: "",
      Opponent: "",
      Date: "",
      Game: 0,
      Opponent_score: 0,
      Our_score: 0,
    });

    setPlayers({});
  }
}

export default StatForm;
