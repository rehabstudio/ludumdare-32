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
