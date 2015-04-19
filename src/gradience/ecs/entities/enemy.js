'use strict';

var factory = require('../factory'),
    config = require('../../config');

var Enemy = (function() {

    var enemyGroup,
        colorIds = Object.keys(config.gameColors);

    function getRndColor() {
        var k = Phaser.ArrayUtils.getRandomItem(colorIds);
        return config.gameColors[k];
    }

    function create(game, params) {

        if(!enemyGroup) enemyGroup = game.add.group();

        var enemy = factory.create([
            ['Sprite', {
                game: game,
                x: params.x,
                y: params.y,
                asset: params.asset,
                group: enemyGroup,
                tint: parseInt(getRndColor().substr(1), 16)
            }],
            ['Physics', game],
            ['Velocity', {x: params.speed, y: 0, maxX: Math.abs(params.speed), maxY: 0}],
            ['SineMovement', {
                axis: 'y',
                phase: params.phase || 0.0,
                amplitude: params.amplitude || 100,
                frequency: params.frequency || 5
            },
            ['Killable', game]]
        ]);

        return enemy;
    }

    function createWave(game, params) {
        var timer = game.time.create(true);

        for (var idx = 0; idx < params.count; idx++) {
            timer.add(params.delay * idx, create, null, game, params);
        }
        timer.start();
    }

    function getGroup() {
        return enemyGroup;
    }

    return {
        create: create,
        createWave: createWave,
        getGroup: getGroup
    };
})();

module.exports = Enemy;
