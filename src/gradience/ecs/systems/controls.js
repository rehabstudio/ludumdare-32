'use strict';

var KeyMap = require('../../config/keymap'),
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

            entity.sprite.body.acceleration.set(0);

            if (keys.up.isDown) {
                entity.sprite.body.acceleration.add(0, -entity.moveSpeed);
            }

            if (keys.down.isDown) {
                entity.sprite.body.acceleration.add(0, entity.moveSpeed);
            }

            if (keys.left.isDown) {
                entity.sprite.body.acceleration.add(-entity.moveSpeed, 0);
            }

            if (keys.right.isDown) {
                entity.sprite.body.acceleration.add(entity.moveSpeed, 0);
            }

            if (keys.fire.isDown) {
                
                var canFire = false;
                for(var k in gameStatus.colorStates) {
                    if(gameStatus.colorStates[k]) {
                        canFire = true;
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
                    }
                }

            }

        });
    }

    return {
        init: init,
        update: update
    };

})();

module.exports = ControlsSystem;
