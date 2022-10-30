const Constants = {
  player1_x: 200,
  player2_x: 600,
  player_y: 335,
  fullHp: 280,
};

export class CharacterManager {
  private scene: Phaser.Scene;
  private player1?: Phaser.GameObjects.Image;
  private player2?: Phaser.GameObjects.Image;
  private hp1: integer;
  private hp2: integer;
  private hpBar1?: Phaser.GameObjects.Rectangle;
  private hpBar2?: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.hp1 = Constants.fullHp;
    this.hp2 = Constants.fullHp;
  }
  public create() {
    // Setup players
    this.player1 = this.scene.add.image(
      Constants.player1_x,
      Constants.player_y,
      "player1"
    );
    this.player2 = this.scene.add.image(
      Constants.player2_x,
      Constants.player_y,
      "player2"
    );
    this.player1.setOrigin(0.5, 1);
    this.player2.setOrigin(0.5, 1);
    this.player1.setScale(0.4);
    this.player2.setScale(-0.4, 0.4);

    // Setup hp bars
    this.scene.add.rectangle(Constants.player1_x, 30, 320, 20, 0x523113);
    this.scene.add.rectangle(Constants.player1_x, 30, 300, 40, 0x523113);
    this.hpBar1 = this.scene.add.rectangle(
      Constants.player1_x - Constants.fullHp / 2,
      30,
      280,
      20,
      0xb08341
    );
    this.hpBar1.setOrigin(0, 0.5);

    this.scene.add.rectangle(Constants.player2_x, 30, 320, 20, 0x523113);
    this.scene.add.rectangle(Constants.player2_x, 30, 300, 40, 0x523113);
    this.hpBar2 = this.scene.add.rectangle(
      Constants.player2_x - Constants.fullHp / 2,
      30,
      Constants.fullHp,
      20,
      0xb08341
    );
    this.hpBar2.setOrigin(0, 0.5);
  }

  public attack1() {
    this.scene.add.tween({
      x: Constants.player1_x + 50,
      y: Constants.player_y,
      targets: [this.player1],
      duration: 200,
      yoyo: true,
    });
    setTimeout(() => {
      this.hp2 -= 20;
      if (!this.hpBar2) return;
      this.hpBar2.width = this.hp2;
    }, 200);
  }

  public attack2() {
    setInterval(() => {
      this.scene.add.tween({
        x: Constants.player2_x - 50,
        y: Constants.player_y,
        targets: [this.player2],
        duration: 200,
        yoyo: true,
      });
      setTimeout(() => {
        this.hp1 -= 10;
        if (!this.hpBar1) return;
        this.hpBar1.width = this.hp1;
      }, 200);
    }, 5000);
  }
}
