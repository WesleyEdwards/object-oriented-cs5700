import {
  CANVAS_BORDER,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  initialKeyStatus,
} from "./helpers/constants";
import { addEventListeners } from "./helpers/utils";
import { Player } from "./gameObjects/Player";
import { Keys } from "./helpers/types";
import { colorPalette } from "./helpers/drawingHelpers";

export class GameState {
  private keys: Keys = initialKeyStatus;
  private player: Player;
  private context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    addEventListeners(this.keys);
    this.player = new Player(context);
    this.context = context;
  }

  updateAll(elapsedTime: number, handleWin: (score: number) => void) {
    this.player.update(this.keys, elapsedTime);
  }

  drawAll() {
    this.drawBackground();
    this.player.draw();
  }

  drawBackground() {
    this.context.fillStyle = colorPalette.background;
    this.context.strokeStyle = colorPalette.border;
    this.context.lineWidth = CANVAS_BORDER;
    this.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.context.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
