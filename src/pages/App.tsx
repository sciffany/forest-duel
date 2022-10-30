import React, { useRef, useState } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import StartGame from "../game/StartGame";
import "../App.css";
import { useParams } from "react-router-dom";
import { createGame, ForestDuelSingleton } from "../game/config";

export default function App(props: any) {
  const { quizIds } = useParams();
  const gameRef = useRef(null);
  const [initialize, setInitialize] = useState(false);
  const [question, setQuestion] = React.useState<string>("");
  React.useEffect(() => {
    ForestDuelSingleton.getInstance();
  }, []);

  function submit() {}
  return (
    <>
      <div className="center" id="game-display"></div>
      <div className="center">
        <input className="button"></input>
      </div>
      <div className="center">
        <button className="button" onClick={submit}>
          Attack
        </button>
      </div>
      <div className="center">
        <button className="button" onClick={submit}>
          Heal
        </button>
      </div>
    </>
  );
}
