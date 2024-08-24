import { useState, useEffect, useRef } from "react";
import { txtDB, auth } from "../txtConfig";
import { doc, setDoc } from "firebase/firestore";

import Header from "../../components/Header";

import "../css/Stat_Form.css";

function StatForm() {
  const [game, setGame] = useState({
    date: "",
    opponent: "",
    win: "",
    game: "",
    players: {},
  });
  const d = useRef("");
  const o = useRef("");
  const w = useRef("");
  const ga = useRef("");
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
              placeholder="Player 1"
              type="input"
              className="sf-input-box"
              //onChange={handleGameChange}
            />

            <input
              placeholder="Player 1 Points"
              type="number"
              className="sf-input-box"
              //onChange={handleGameChange}
            />
          </div>
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

    setGame({
      win: "",
      opponent: "",
    });
  }
}

export default StatForm;
