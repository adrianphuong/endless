class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });

    this.player = new Player(this, 100, 450);
    this.platforms = this.physics.add.staticGroup();

    this.platforms.add(Platform.generate(this, 100, 550, 1200, 20));

    this.physics.add.collider(this.player.playerShape, this.platforms, this.incrementScore, null, this);

    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.time.delayedCall(3000, () => {
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          const platform = Platform.generate(this);
          this.platforms.add(platform);
        },
        callbackScope: this,
        loop: true
      });
    }, [], this);
  }

  update() {
    this.player.update(this.spaceBar, this.rKey);
    this.platforms.getChildren().forEach((platform) => {
      platform.update();
    });

    if (this.player.playerShape.y > this.sys.game.config.height - this.player.playerShape.height / 2) {
      this.gameOver();
    }
  }

  incrementScore(playerShape, platform) {
    platform.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
  }

  gameOver() {
    this.physics.pause();
    this.add.text(300, 300, 'Game Over', { fontSize: '48px', fill: '#ffffff' });
    this.add.text(275, 350, 'Press R to Restart', { fontSize: '24px', fill: '#ffffff' });
  }
}
