class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, null);
  
      this.scene = scene;
  
      this.playerShape = new Phaser.GameObjects.Ellipse(scene, x, y, 50, 50, 0x00ff00);
      scene.add.existing(this.playerShape);
  
      scene.physics.world.enable(this);
      this.setCircle(25);
      this.setCollideWorldBounds(true);
  
      scene.physics.world.enable(this.playerShape);
      this.playerShape.body.setCircle(25);
      this.playerShape.body.setCollideWorldBounds(true);
    }
  
    update(spaceBar, rKey) {
      this.playerShape.body.velocity.x = this.body.velocity.x;
      this.playerShape.body.velocity.y = this.body.velocity.y;
  
      if (Phaser.Input.Keyboard.JustDown(spaceBar) && this.playerShape.body.touching.down) {
        this.playerShape.setVelocityY(-300);
      }
  
      if (Phaser.Input.Keyboard.JustDown(rKey)) {
        this.scene.scene.restart();
      }
    }
  }
  