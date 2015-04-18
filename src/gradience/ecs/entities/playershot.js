
var factory = require('../factory'),
    gameStatus = require('../../status/gamestatus');

var c = document.createElement('canvas'),
    ctx = c.getContext('2d');

c.width = 32;
c.height = 4;

function _createShotImage() {
    ctx.fillStyle = '#ffffff'; 
    ctx.fillRect(0, 0, c.width, c.height);

    var cimg = new Image;
    cimg.src = c.toDataURL('image/png');
    return cimg;
}

var shotImg;

function createPlayerShot(game, x, y) {

    if(!shotImg) {
        shotImg = _createShotImage();
        game.cache.addImage('playershot', null, shotImg);
    }

    var playerShot = factory.create([
        ['Sprite', {game: game, x: x, y: y, asset: 'playershot'}],
        ['Physics', game],
        ['Velocity', {x: 600, y: 0 }],
    ]);

    console.log('COLOR', gameStatus.activeColor, gameStatus.activeTintColor);
    playerShot.sprite.tint = gameStatus.activeTintColor;

    console.log('PLAYERSHOT', playerShot);
    return playerShot;
}


module.exports = { create: createPlayerShot };