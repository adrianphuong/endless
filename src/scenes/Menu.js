class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.image('background', './assets/background.png');
        this.load.image(`button`, `./assets/playButton.png`);
        this.load.image('subtitle', './assets/press.png');
        this.load.image('title', './assets/crabrun.png');
        this.load.audio('sfx_select', './assets/blip_select12.wav');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 800, 400, 'background').setOrigin(0, 0);
        //this.cameras.main.setBackgroundColor('#7dc7f4');

        // Set menu text style and add title and instructions text
        let menuConfig = {
            fontFamily: 'Fantasy',
            fontSize: '50px',
            color: '#fff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };

        //this.add.text(game.config.width/2, game.config.height/2, 'Endless Runner', menuConfig).setOrigin(0.5);
        this.add.image(game.config.width/2, game.config.height/2, 'title');

        //menuConfig.fontSize = '24px';
        //this.add.text(game.config.width/2, game.config.height/2 + 50, 'Press SPACE to jump and avoid obstacles', menuConfig).setOrigin(0.5);

        this.add.image(game.config.width/2, game.config.height/2+50, 'subtitle');

        // Set start game text style and add start game text
        //menuConfig.fontSize = '28px';
        //menuConfig.backgroundColor = '#1c5fa5';
        //this.add.text(game.config.width/2, game.config.height/2 + 150, 'Press → to START', menuConfig).setOrigin(0.5);
        this.add.image(game.config.width/2, game.config.height/2+120, 'button');

        // Add keyboard input
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        this.background.tilePositionX += 2;
        if (Phaser.Input.Keyboard.JustDown(this.keyRIGHT)) {
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        else if (Phaser.Input.Keyboard.JustDown(this.keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start("creditScene");
        }
    }
}
