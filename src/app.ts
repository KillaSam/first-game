import * as Phaser from "phaser";
import { SelectChar } from "./selectChar"
import { DialogSys } from "./dialogSys"

export const config: Phaser.Types.Core.GameConfig = {
    title: "FirstGame", 
    type: Phaser.AUTO,
    scale: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    dom: {
        createContainer: true
    },
    scene: [SelectChar, DialogSys],
    parent: "game"
}

export class FirstGame extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
      super(config);
    }
}

window.onload = () => {
    var game = new FirstGame(config);
  };