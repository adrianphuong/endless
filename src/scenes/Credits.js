class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }
    preload() {
        this.load.image('background', './assets/background.png');
        this.load.image('credits', './assets/credits.png');
    }
    create() {
        this.background = this.add.tileSprite(0, 0, 800, 400, 'background').setOrigin(0, 0);
        this.add.image(game.config.width/2, game.config.height/2, 'credits');
        this.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyM)) {
            this.scene.start("menuScene");
        }
        this.background.tilePositionX += 2;
    }
}