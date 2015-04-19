'use strict';

var factory = require('../factory');

var PLAYER_SPEED = 200;

function createPlayer(game) {

    var player = factory.create([
        ['Sprite', {game: game, x: 10, y: 240, asset: 'player'}],
        ['Physics', game],
        ['Velocity', { x: 0, y: 0, maxX: PLAYER_SPEED, maxY: PLAYER_SPEED }],
        ['ControlsArrows', 2000],
        ['CollideWorld']
    ]);
    player.sprite.bringToTop();

    return player;
}


module.exports = { create: createPlayer };
