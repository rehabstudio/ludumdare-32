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

            if (entity.has('SineMovement')) {
                var millis = (
                    Date.now() - entity._sine.start + entity._sine.phase
                ) % entity._sine.frequency;
                var phase = (millis / entity._sine.frequency) * 360;
                var offset = entity._sine.amplitude * Math.sin(phase);
                entity.sprite[entity._sine.axis] = entity._sine.base + offset;
            }

        });
    }

    return {
        init: init,
        update: update
    };

})();

module.exports = MovementSystem;
