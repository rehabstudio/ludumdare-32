'use strict';

var MovementSystem = (function() {

    var start;

    function init() {
        start = Date.now();
    }

    function update(ents) {

        ents.forEach(function(entity) {

            if (!entity.has('Sprite')) {
                return;
            }

            if (entity.has('FuncMovement')) {
                var delta = (Date.now() - entity._func.start) * 0.001;
                var pos = entity._func.equation(delta, entity._func.coeff);
                entity.sprite.x = entity.sprite.game.width - pos[0] * entity._func.speed;
                entity.sprite.y = entity._func.baseY + pos[1] * entity._func.amplitude;
            }

            if (entity.has('Rotates')) {
                entity.sprite.body.rotation += entity._rotationSpeed;
            }

        });
    }

    return {
        init: init,
        update: update
    };

})();

module.exports = MovementSystem;
