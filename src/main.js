/* Use multiple Scene classes (dictated by your game's style) (5) DONE
Properly transition between Scenes and allow the player to restart w/out having to reload the page (5) DONE
Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (5) DONE
Have some form of player input/control appropriate to your game design (5) DONE
Include one or more animated characters that use a texture atlas (5)
Simulate scrolling with a tileSprite (or equivalent means) (5) DONE
Implement proper collision detection (via Arcade Physics or a custom routine) (5) DONE
Have looping background music (5) DONE
Use a minimum of three sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5) DONE
Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (5) DONE
Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5) DONE
Be theoretically endless (5) DONE
Be playable for at least 15 seconds for a new player of low to moderate skill (5) DONE
Run without significant crashes or errors (5) DONE
Include in-game credits for all roles, assets, music, etc. (5) DONE
*/

/*
Creative Tilt
For this assignment I tried to make it similar to the endless dinosaur chrome game with my own twist. This is the first
time I tried using rotation effects to make it look like rocks were rolling towards the sprite.

For the design, I really like how I made the environment revolve around a crab with the beach theme. Before with my
Rocket Patrol mod assignment I had only used free assets so this was my first time actually doing a lot of in game art.

*/
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
