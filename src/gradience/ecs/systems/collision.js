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
            game.physics.arcade.overlap(
                player,
                enemies,
                function(p, e) {
                    console.log('Player hit enemy', p, e);
                    if (!e.dying) { 
                        gameStatus.updateLives(-1);
                    }
                    if(gameStatus.lives === 0) {
                        p.dieFlash();
                        game.state.start('game-over');
                    } else {
                        e.dieFlash();
                    }
                },
                null,
                game
            );
        }

        if (shots && enemies) {
            game.physics.arcade.overlap(
                shots,
                enemies,
                function(b, e) {
                    if(b.tint === e.tint) {
                        console.log('Bullet hit enemy', b, e);
                        game.physics.arcade.collide(b, e);
                        e.dieFlash();
                        gameStatus.updateScore(10);
                    }

                    else {
                        e.shieldFlash();
                    }
                    b.kill();
                },
                null,
                game
            );
        }

        if (player && powerups) {
            game.physics.arcade.overlap(
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

        // might as well kill when off screen here too
        if (enemies) {
            enemies.forEach(function(enemy) {
                if (enemy.x < -100 && enemy.alive) {
                    console.log('Enemy exited screen: ', enemy);
                    enemy.kill();
                }
            }, this);
        }

    }

    return {
        init: init,
        update: update
    };

})();

module.exports = CollisionSystem;
