'use strict';

var factory = require('../factory');

var Enemy = (function() {

    function create(game, params) {
        var enemy = factory.create([
            ['Sprite', {
                game: game,
                x: params.x,
                y: params.y,
                asset: params.asset
            }],
            ['Physics', game],
            ['Velocity', {x: params.speed, y: 0, maxX: Math.abs(params.speed), maxY: 0}],
            ['SineMovement', {
                axis: 'y',
                phase: params.phase || 0.0,
                amplitude: params.amplitude || 100,
                frequency: params.frequency || 5
            }]
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

    return {
        create: create,
        createWave: createWave
    };
})();

module.exports = Enemy;
