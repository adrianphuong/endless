class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'crabAtlas', 'crab.png');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setGravityY(450);

        scene.anims.create({
            key: 'crabAnimation',
            frames: scene.anims.generateFrameNames('crabAtlas', {
                frames: ['crab.png', 'crab2.png']
            }),
            frameRate: 5,
            repeat: -1
        });

        this.play('crabAnimation'); // Start playing the animation
    }

    jump() {
        this.setVelocityY(-250);
        this.scene.sound.play('jump');
    }

    update() {
        // Add any player-specific update logic here
    }
}
