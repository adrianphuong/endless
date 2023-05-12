let config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 400,
  scene: [Menu, Play, Credits],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT;
