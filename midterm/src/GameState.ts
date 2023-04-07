import { initialKeyStatus } from "./helpers/constants";
import { addEventListeners } from "./helpers/utils";
import { Player } from "./gameObjects/Player";
import { Keys } from "./helpers/types";
import { Blocks } from "./gameObjects/Blocks";
import { drawBackground, drawPlayBorder } from "./helpers/drawBackground";

export class GameState {
  private keys: Keys = initialKeyStatus;
  private player: Player;
  private context: CanvasRenderingContext2D;
  private blocks: Blocks;
  private totalTime: number = 0;

  constructor(context: CanvasRenderingContext2D) {
    addEventListeners(this.keys);
    this.player = new Player(context);
    this.blocks = new Blocks(context);
    this.context = context;
  }

  updateAll(elapsedTime: number, handleWin: (score: number) => void) {
    this.totalTime += elapsedTime;
    this.player.update(this.keys, elapsedTime);
    this.blocks.update(elapsedTime);

    if (this.blocks.checkCollision(this.player.pos)) {
      handleWin(this.totalTime);
    }
  }

  drawAll() {
    drawBackground(this.context, this.totalTime);
    this.player.draw();
    this.blocks.draw();
    drawPlayBorder(this.context);
  }
}
