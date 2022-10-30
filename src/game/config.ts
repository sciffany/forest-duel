import StartGame from "./StartGame";

const config = {
  width: 800,
  height: 400,
  type: Phaser.AUTO,
  scene: [StartGame],
  scale: {
    parent: "game-display",
  },
};

export const createGame = () => {
  const game = new ForestDuel(config);
  return game;
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
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
