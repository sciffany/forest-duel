import Phaser from "phaser";
import eventsCenter from "../game/managers/EventsEmitter";
import StartGame from "./scenes/StartGame";

const config = {
  width: 800,
  height: 400,
  type: Phaser.AUTO,
  scene: [StartGame],
  scale: {
    parent: "game-display",
  },
};

export const ForestDuelSingleton = (function () {
  var instance: ForestDuel;

  function createInstance() {
    var object = new ForestDuel(config);
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

class ForestDuel extends Phaser.Game {
  private startGame?: Phaser.Scene;

  public setQuestion(question: string) {
    eventsCenter.emit("set-question", question);
  }

  public attack() {
    eventsCenter.emit("attack");
  }
}
