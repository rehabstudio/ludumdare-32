'use strict';

var KeyMap = require('../../config/keymap');

var ControlsSystem = (function() {

    var keys = {};

    function init(game) {
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
            
        });
    }

    return {
        init: init,
        update: update
    };

})();

module.exports = ControlsSystem;
