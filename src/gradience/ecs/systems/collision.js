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
                    if (!e.dying) { 
                        game.add.audio('glitch', 1).play();
                        if ('game' in game) {
                            game.game.glitch();
                        }
                        
                        else {
                            game.glitch();
                        }
                        gameStatus.updateLives(-1);
                    }
                    if(gameStatus.lives === 0) {
                        p.dieFlash();
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
                    if (!e.dying) { 
                        if(b.tint === e.tint) {
                            game.physics.arcade.collide(b, e);
                            e.dieFlash();
                            game.add.audio('laser_hit', 0.5).play();
                            gameStatus.updateScore(10);
                        }

                        else {
                            e.shieldFlash();
                            game.add.audio('fizzle', 0.5).play();
                        }
                        b.kill();
                    }
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
