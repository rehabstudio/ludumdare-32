'use strict';

var config = require('../../config');
var factory = require('../factory');

var Powerup = (function() {

    var group;

    function create(game, params) {
        if (group === undefined){
            group = game.add.group();
        }
        var powerup = factory.create([
            ['Sprite', {
                game: game,
                x: game.width + 50,
                y: Math.floor(Math.random() * game.height),
                asset: 'powerup',
                group: group
            }],
            ['Physics', game],
            ['Velocity', {
                x: params.speed || -100,
                y: 0,
                maxX: Math.abs(params.speed || -100),
                maxY: 0
            }],
            ['SineMovement', {
                axis: 'y',
                phase: params.phase || 0.0,
                amplitude: params.amplitude || 10,
                frequency: params.frequency || 0.01
            }]
        ]);

        powerup.amount = 30;
        powerup.colorKey = config.gameColorKeys[Math.floor(Math.random() * 3)];
        powerup.sprite.tint = Phaser.Color.hexToRGB(
            config.gameColors[powerup.colorKey]
        );

        return powerup;
    }

    function getGroup() {
        return group;
    }

    return {
        create: create,
        getGroup: getGroup
    };
})();

module.exports = Powerup;
