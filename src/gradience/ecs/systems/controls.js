'use strict';

var Config = require('../../config');
var Status = require('../../status');

var Entities = {
    PlayerShot: require('../entities/playershot')
}

var PlayerShotData;

var ControlsSystem = (function() {

    var game;
    var keys = {};
    var controls = {};
    var paused = false;

    function init(gameInstance) {

        game = gameInstance;

        PlayerShotData = {
            fireRate: 200,
            _lastFireTime: game.time.now
        }

        for (var k in Config.Keymap.playerControls) {
            keys[k] = game.input.keyboard.addKey(
                Config.Keymap.playerControls[k]
            );
        }

        for (var k in Config.Keymap.colorToggles) {
            controls['toggle_' + k] = game.input.keyboard.addKey(
                Config.Keymap.colorToggles[k]
            );
            (function(color) {
                controls['toggle_' + k].onDown.add(function(key) {
                    Status.Game.toggleColor(color);
                }, this);
            })(k);

        }
    }


    function update(ents) {
        if (paused) {
            return;
        }
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
                
                var share = Status.Game.colorStates.r + Status.Game.colorStates.g + Status.Game.colorStates.b;
                if (share == 0) {
                    return false;
                }

                var shotCost = Config.shotCost / share;
                var canFire = true;

                for (var k in Status.Game.colorMeters) {
                    if (Status.Game.colorStates[k] && Status.Game.colorMeters[k] < shotCost){
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

                        if (Status.Game.colorStates.r) {
                            Status.Game.colorMeters.r -= Config.shotCost / share;
                            if (Status.Game.colorMeters.r < 0) {
                                Status.Game.colorMeters.r = 0;
                            }
                        }
                        if (Status.Game.colorStates.g) {
                            Status.Game.colorMeters.g -= Config.shotCost / share;
                            if (Status.Game.colorMeters.g < 0) {
                                Status.Game.colorMeters.g = 0;
                            }
                        }
                        if (Status.Game.colorStates.b) {
                            Status.Game.colorMeters.b -= Config.shotCost / share;
                            if (Status.Game.colorMeters.b < 0) {
                                Status.Game.colorMeters.b = 0;
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

    function pause(_paused) {
        paused = _paused;
    }

    return {
        init: init,
        update: update,
        pause: pause
    };

})();

module.exports = ControlsSystem;
