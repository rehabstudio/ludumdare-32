'use strict';

var gameStatus = require('../../status/gamestatus');

var Entities = {
    Player: require('../entities/player'),
    PlayerShot: require('../entities/playershot'),
    Powerup: require('../entities/powerup'),
    Enemy: require('../entities/enemy')
};

var CollisionSystem = (function() {

    var start, game;

    function init(gameInstance) {
        game = gameInstance;
    }

    function update(ents) {

        game.physics.arcade.collide(
            Entities.Player.get(),
            Entities.Enemy.getGroup(),
            function(p, e) {
                console.log('Player hit enemy', p, e);
                p.kill();
            },
            null,
            game
        );

        game.physics.arcade.collide(
            Entities.PlayerShot.getGroup(),
            Entities.Enemy.getGroup(),
            function(b, e) {
                if(b.tint === e.tint) {
                    console.log('Bullet hit enemy', b, e);
                    e.kill();
                    gameStatus.updateScore(10);
                }
                b.kill();
            },
            null,
            game
        );

        game.physics.arcade.collide(
            Entities.Player.get(),
            Entities.Powerup.getGroup(),
            function(p, pu) {
                console.log('Player collected power', p, pu);
                gameStatus.colorMeters[pu.colorKey] += pu.amount;

                if (gameStatus.colorMeters[pu.colorKey] > 100) {
                    gameStatus.colorMeters[pu.colorKey] = 100;
                }
                pu.kill();
            },
            null,
            game
        );

    }

    return {
        init: init,
        update: update
    };

})();

module.exports = CollisionSystem;
