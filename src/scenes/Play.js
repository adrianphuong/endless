class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        this.load.image('background', './assets/background.png');
        this.load.atlas('crabAtlas', './assets/crab.png', './assets/crab.json');
        this.load.image('rock', './assets/rock.png');
        this.load.image('sand', './assets/sand.png');
        this.load.audio('music', './assets/music.wav');
        this.load.audio('jump', './assets/jumpo.mp3');
        this.load.audio('oof', './assets/oof.mp3');
    }

    create() {
        // Play the music and set it to loop
        this.music = this.sound.add('music', { loop: true });
        this.music.play();
        this.background = this.add.tileSprite(0, 0, 800, 400, 'background').setOrigin(0, 0);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //this.cameras.main.setBackgroundColor('#7dc7f4');
        this.platform = this.add.tileSprite(400, 350, 800, 20, `sand`);
        this.physics.add.existing(this.platform, true);
    
        this.nextObstacleTime = 1500;

        this.player = new Player(this, 100, 250);
        this.obstacles = this.add.group();
        this.score = 0;
        if (!this.sys.game.highScore) {
            this.sys.game.highScore = 0;
        }        
        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontFamily: 'Arial', fontSize: '24px', color: '#fff' });
        this.highScoreText = this.add.text(10, 40, 'High Score: ' + this.sys.game.highScore, { fontFamily: 'Arial', fontSize: '24px', color: '#fff' });

    
        this.physics.add.collider(this.player, this.platform);

        //this.powerups = this.add.group();

        this.spawnObstacle();
        //this.spawnPowerup();
        
    }
    
    spawnObstacle() {
        let obstacle = new Obstacle(this, game.config.width, 325);
        this.obstacles.add(obstacle);
    
        // Set random delay based on player's score
        let delay = Phaser.Math.Between(2500 - this.score * 50, 3000 - this.score * 50);
        delay -= this.score * 10;
        if (delay < 500) {
            delay = 500;
        }
    
        // Add event to spawn next obstacle
        this.time.addEvent({
            delay: delay,
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: false
        });
    
        this.physics.add.collider(this.player, obstacle, () => {
            this.gameOver();
        });
    
        // Increase difficulty every 10 points
        if (this.score > 0 && this.score % 10 == 0) {
            this.time.delayedCall(5000, () => {
                this.time.removeAllEvents();
                this.time.addEvent({
                    delay: Phaser.Math.Between(2000 - this.score * 50, 2500 - this.score * 50),
                    callback: this.spawnObstacle,
                    callbackScope: this,
                    loop: false
                });
            }, null, this);
        }
    }
    
    gameOver() {
        this.sound.play('oof');
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.scoreText.setText(`Score: ${this.score}\nPress R to restart`);
        this.scoreText.setOrigin(0.5);
        this.scoreText.x = game.config.width / 2;
        this.scoreText.y = game.config.height / 2;
        if (this.score > this.sys.game.highScore) {
            this.sys.game.highScore = this.score;
            this.highScoreText.setText(`High Score: ${this.sys.game.highScore}`);
        }        
        this.highScoreText.setOrigin(0.5);
        this.highScoreText.x = game.config.width / 2;
        this.highScoreText.y = game.config.height / 2 + 50;
        this.obstacles.clear(true, true);
        this.music.stop();
    }
    
    update() {
        this.player.update();
    
        if (!this.player.active) {
            return;
        }
        
        if (this.score % 10 === 0 && this.score > 0) {
            this.nextObstacleTime -= 100;
        }
        this.background.tilePositionX += 2;
        this.platform.tilePositionX += 2;
        // Remove obstacles that have gone off-screen and update the score
        for (let i = this.obstacles.children.size - 1; i >= 0; i--) {
            let obstacle = this.obstacles.children.entries[i];
            if (obstacle.x < -obstacle.width) {
                this.score++;
                this.scoreText.setText(`Score: ${this.score}`);
                if (this.score > this.sys.game.highScore) {
                    this.sys.game.highScore = this.score;
                    this.highScoreText.setText(`High Score: ${this.sys.game.highScore}`);
                }                
                obstacle.destroy();
            }
        }
    
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE) && this.player.body.touching.down) {
            this.sound.play('jump');
            this.player.jump();
        }
    
        if (this.keyR.isDown) {
            this.scene.restart();
        }
    }
}    