'use strict';

var config = require('../../config'),
    KeyMap = require('../../config/keymap'),
    gameStatus = require('../../status/gamestatus');

var Entities = {
    PlayerShot: require('../entities/playershot')
}

var PlayerShotData;

var ControlsSystem = (function() {

    var keys = {},
        game;

    function init(gameInstance) {

        game = gameInstance;

        PlayerShotData = {
            fireRate: 200,
            _lastFireTime: game.time.now
        }

        for(var k in KeyMap.playerControls) {
            keys[k] = game.input.keyboard.addKey(KeyMap.playerControls[k]);
        }
    }

    function update(ents) {
        ents.forEach(function(entity) {

            if (!entity.has('ControlsArrows') || !entity.has('Sprite')) {
                return;
            }

            entity.sprite.body.velocity.set(0);

            if (keys.up.isDown) {
                entity.sprite.body.velocity.add(0, -entity.moveSpeed);
            }

            if (keys.down.isDown) {
                entity.sprite.body.velocity.add(0, entity.moveSpeed);
            }

            if (keys.left.isDown) {
                entity.sprite.body.velocity.add(-entity.moveSpeed, 0);
            }

            if (keys.right.isDown) {
                entity.sprite.body.velocity.add(entity.moveSpeed, 0);
            }

            if (keys.fire.isDown) {
                
                var share = gameStatus.colorStates.r + gameStatus.colorStates.g + gameStatus.colorStates.b;
                if (share == 0) {
                    return false;
                }

                var shotCost = config.shotCost / share;
                var canFire = true;

                for (var k in gameStatus.colorMeters) {
                    if (gameStatus.colorStates[k] && gameStatus.colorMeters[k] < shotCost){
                        canFire = false;
                        break;
                    }
                }

                if (!canFire) return false;

                if (game.time.now > PlayerShotData._lastFireTime)
                {
                    var bullet = Entities.PlayerShot.create(game, entity.sprite.x + entity.sprite.width * 0.5, entity.sprite.y);

                    if (bullet)
                    {
                        PlayerShotData._lastFireTime = game.time.now + PlayerShotData.fireRate;

                        if (gameStatus.colorStates.r) {
                            console.log(config.shotCost, share);
                            gameStatus.colorMeters.r -= config.shotCost / share;
                            if (gameStatus.colorMeters.r < 0) {
                                gameStatus.colorMeters.r = 0;
                            }
                        }
                        if (gameStatus.colorStates.g) {
                            gameStatus.colorMeters.g -= config.shotCost / share;
                            if (gameStatus.colorMeters.g < 0) {
                                gameStatus.colorMeters.g = 0;
                            }
                        }
                        if (gameStatus.colorStates.b) {
                            gameStatus.colorMeters.b -= config.shotCost / share;
                            if (gameStatus.colorMeters.b < 0) {
                                gameStatus.colorMeters.b = 0;
                            }
                        }
                    }
                }

            }

            //adds natural tilt movement to player sprite 
            //can be moved to top of method to apply to all sprites
            entity.sprite.angle = (entity.sprite.body.velocity.y/entity.sprite.body.maxVelocity.y) * 1.5;

        });
    }

    return {
        init: init,
        update: update
    };

})();

module.exports = ControlsSystem;
