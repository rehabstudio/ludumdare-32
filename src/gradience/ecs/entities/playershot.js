
var factory = require('../factory'),
    gameStatus = require('../../status/gamestatus');

var c = document.createElement('canvas'),
    ctx = c.getContext('2d');

c.width = 32;
c.height = 4;

var bulletGroup;

function createPlayerShot(game, x, y) {

    if(!bulletGroup) {
        bulletGroup = game.add.group();
    }

    var playerShot = factory.create([
        ['Sprite', {game: game, x: x, y: y + 7, asset: 'laser', group: bulletGroup}],
        ['Physics', game],
        ['Velocity', {x: 800, y: 0 }],
    ]);
    playerShot.sprite.scale.x = 2;
    playerShot.sprite.emitter = game.add.emitter(x, y, 20);
    playerShot.sprite.emitter.makeParticles('star');
    playerShot.sprite.emitter.setRotation(0, 0);
    playerShot.sprite.emitter.setAlpha(0.3, 0.7);
    playerShot.sprite.emitter.setScale(0.1, 0.5);
    playerShot.sprite.emitter.setYSpeed(-20, 20);
    playerShot.sprite.emitter.setXSpeed(0, 100);
    playerShot.sprite.emitter.gravity = 0;
    playerShot.sprite.emitter.forEach(function(particle){
        particle.tint = gameStatus.activeTintColor;
    });
    playerShot.sprite.emitter.start(false, 1000, 50, 100);

    playerShot.sprite.tint = gameStatus.activeTintColor;
    game.add.audio('laser_shot', 0.5).play();
    return playerShot;
}

function getGroup() {
    return bulletGroup;
}

function clear() {
    if (bulletGroup) {
        bulletGroup.destroy();
        bulletGroup = null;
    }
}


module.exports = { 
    create: createPlayerShot,
    getGroup: getGroup,
    clear: clear
};
