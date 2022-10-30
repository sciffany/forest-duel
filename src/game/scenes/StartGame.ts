import Phaser from "phaser";
import { CharacterManager } from "../managers/CharacterManager";
import eventsCenter from "../managers/EventsEmitter";
export default class StartGame extends Phaser.Scene {
  private question: string;
  private questionSprite?: Phaser.GameObjects.Text;
  private characterManager: CharacterManager;

  constructor(props: any) {
    super(props);
    this.question = "Hello";
    this.characterManager = new CharacterManager(this);
  }

  public preload() {
    this.load.image("background", "../assets/background.png");
    this.load.image("grass", "../assets/grass.png");

    this.load.image("player1", "../assets/axolotl2.png");
    this.load.image("player2", "../assets/axolotl2.png");
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
    this.characterManager.create();

    // Setup questions
    this.add.rectangle(400, 350, 600, 80, 0x001253);
    this.add.image(400, 390, "grass");
    this.questionSprite = this.add.text(400, 350, this.question, {
      fontSize: "20px",
      fontFamily: "Arial",
    });
    this.questionSprite.setOrigin(0.5);

    // Set events
    eventsCenter.on("set-question", this.setQuestion, this);
    eventsCenter.on("attack", this.attack, this);
  }

  private setQuestion(question: string) {
    if (!this.questionSprite) {
      return;
    }
    this.questionSprite.text = question;
  }

  private attack() {
    this.characterManager.attack1();
  }

  update() {}
}
