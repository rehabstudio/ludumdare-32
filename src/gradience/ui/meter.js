'use strict';

var config = require('../config/'),
    gameStatus = require('../status/gamestatus');

module.exports = (function() {

    var group;

    function createBar(scene, x, y, color, group) {
        var instance = scene.add.graphics(x, y, group);
        instance.colorKey = color;

        instance.fixedToCamera = true;
        instance.beginFill(
            Phaser.Color.hexToRGB(config.gameColors[color])
        );
        instance.drawRect(0, 0, 10, config.meterSize);
        instance.endFill();

        return instance;
    }

    function create(scene, x, y) {
        if (group === undefined) {
            group = new Phaser.Group(scene);
            group.x = x;
            group.y = y;
            createBar(scene, 0, 0, 'r', group);
            createBar(scene, 14, 0, 'g', group);
            createBar(scene, 28, 0, 'b', group);
        }

        return group;
    }

    function update() {
        group.children.forEach(function(instance) {
            instance.scale.y = gameStatus.colorMeters[instance.colorKey] * 0.01;
            instance.y = config.meterSize - (config.meterSize * instance.scale.y);

            if (gameStatus.colorStates[instance.colorKey]) {
                instance.alpha = 1;
            }

            else {
                instance.alpha = 0.1;
            }
        });
    }

    return {
        create: create,
        update: update
    };

})();
