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

        var player = Entities.Player.get();
        var shots = Entities.PlayerShot.getGroup();
        var enemies = Entities.Enemy.getGroup();
        var powerups = Entities.Powerup.getGroup();

        if (player && enemies) {
            game.physics.arcade.collide(
                player,
                enemies,
                function(p, e) {
                    console.log('Player hit enemy', p, e);
                    p.kill();
                },
                null,
                game
            );
        }

        if (shots && enemies) {
            game.physics.arcade.collide(
                shots,
                enemies,
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
        }

        if (player && powerups) {
            game.physics.arcade.collide(
                player,
                powerups,
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

    }

    return {
        init: init,
        update: update
    };

})();

module.exports = CollisionSystem;
