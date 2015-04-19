'use strict';

var Factory = require('../factory');
var Filters = require('../../filters');

var player, PLAYER_SPEED = 200;

function dieFlash() {
    var slit = new Filters.Glitch.SlitScan();
    slit.rand = 0.1;
    var shaker = new Filters.Glitch.Shaker();
    shaker.blurY = 0;

    this.filters = [slit, shaker];
    this.game.add.tween(slit)
        .to({rand: 5}, 500)
        .start();
    this.game.add.tween(shaker)
        .to({blurY: 5}, 500)
        .start()
        .onComplete.add(function() {
            this.kill();
        }, this);
}


function createPlayer(game) {

    player = Factory.create([
        ['Sprite', {game: game, x: 10, y: 240, asset: 'player'}],
        ['Physics', game],
        ['Velocity', { x: 0, y: 0, maxX: PLAYER_SPEED, maxY: PLAYER_SPEED }],
        ['ControlsArrows', 2000],
        ['CollideWorld']
    ]);
    player.sprite.bringToTop();
    player.sprite.dieFlash = dieFlash;

    return player;
}

function getPlayer() {
    return player.sprite;
}

module.exports = { 
    create: createPlayer,
    get: getPlayer 
};
