class Platform extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height) {
      super(scene, x, y, width, height, 0xff0000);
  
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enable(this);
  
      this.body.setImmovable(true);
      this.body.allowGravity = false;
    }
  
    update() {
      this.x -= 3;
  
      if (this.x < -this.width) {
        this.destroy();
      }
    }
  
    static generate(scene, x, y, width = 200, height = 20) {
      const xPos = x || 850;
      const yPos = y || Phaser.Math.Between(300, 550);
      const platformWidth = width || 200;
      const platformHeight = height || 20;
      const platform = new Platform(scene, xPos, yPos, platformWidth, platformHeight);
      return platform;
    }
  }
  