'use strict';

var ControlsSystem = (function() {

    var keys;

    function init(game) {
        keys = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D)
        };
    }

    function update(ents) {
        ents.forEach(function(entity) {

            if (!entity.has('ControlsArrows') || !entity.has('Sprite')) {
                return;
            }

            if (keys.up.isDown) {
                entity.sprite.y -= entity.moveSpeed;
            }

            if (keys.down.isDown) {
                entity.sprite.y += entity.moveSpeed;
            }

            if (keys.left.isDown) {
                entity.sprite.x -= entity.moveSpeed;
            }

            if (keys.right.isDown) {
                entity.sprite.x += entity.moveSpeed;
            }
        });
    }

    return {
        init: init,
        update: update
    };

})();

module.exports = ControlsSystem;
