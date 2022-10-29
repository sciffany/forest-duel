export default class StartGame extends Phaser.Scene {
  public preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("grass", "assets/grass.png");

    this.load.image("player1", "assets/shelbyPangolin2.png");
    this.load.image("player2", "assets/capybara2.png");
  }
  public create() {
    // Setup backgrounds
    const bg = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 120,
      "background"
    );
    bg.setOrigin(0.5);

    // Setup players
    const player1 = this.add.image(200, 335, "player1");
    const player2 = this.add.image(600, 335, "player2");
    player1.setOrigin(0.5, 1);
    player2.setOrigin(0.5, 1);
    player1.setScale(0.4);
    player2.setScale(-0.4, 0.4);

    // Setup hp bars
    this.add.rectangle(200, 30, 320, 20, 0x523113);
    this.add.rectangle(200, 30, 300, 40, 0x523113);
    const hp1 = this.add.rectangle(200, 30, 280, 20, 0xb08341);

    this.add.rectangle(600, 30, 320, 20, 0x523113);
    this.add.rectangle(600, 30, 300, 40, 0x523113);
    const hp2 = this.add.rectangle(600, 30, 280, 20, 0xb08341);

    this.add.rectangle(400, 350, 600, 80, 0x001253);
    this.add.image(400, 390, "grass");
  }
  update() {}
}
