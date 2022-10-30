import React, { useRef, useState } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import StartGame from "../game/StartGame";
import "../App.css";

const game = {
  width: 800,
  height: 400,
  type: Phaser.AUTO,
  scene: [StartGame],
};

export default function App() {
  const gameRef = useRef(null);
  const [initialize, setInitialize] = useState(false);
  return (
    <>
      <div className="center">
        <IonPhaser ref={gameRef} game={game} initialize={initialize} />
      </div>
      {!initialize && (
        <div className="center">
          <button className="button" onClick={() => setInitialize(true)}>
            Play
          </button>
        </div>
      )}
    </>
  );
}
