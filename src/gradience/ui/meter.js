'use strict';

var Config = require('../config');
var Status = require('../status');
var Filters = require('../filters');

module.exports = (function() {

    var instance;
    var activeHeight = 5;
    var colorHeight = 20;
    var filter;

    function create(scene) {
        if (!instance) {
            instance = scene.add.graphics();
            instance.x = 0;
            instance.y = (
                instance.game.height - activeHeight * 4 - colorHeight
            );
            instance.fixedToCamera = true;
            filter = new Filters.Glitch.Shaker();
            filter.blurY = 0;
            filter.blurX = 0;
            instance.filters = [filter];
        }

        return instance;
    }

    function update() {
        var position = 0;
        var currentX = 0;
        var activeAlpha = 0;
        filter.blurX = 0;

        var start = (
            instance.game.world.centerX - (
                Status.Game.colorMeters.r + Status.Game.colorMeters.g + Status.Game.colorMeters.b
            ) * 0.5
        );
        instance.clear();
        for (var key in Status.Game.colorMeters) {
            instance.beginFill(
                Phaser.Color.hexToRGB(Config.gameColors[key].substr(1)),
                Status.Game.colorStates[key] ? 1 : 0.1
            );
            if (Status.Game.colorStates[key]) {
                activeAlpha = 1;
                filter.blurX += 1;
            }
            instance.drawRect(
                start + currentX,
                activeHeight,
                Status.Game.colorMeters[key],
                colorHeight
            );
            instance.endFill();
            currentX += Status.Game.colorMeters[key];
        }
        instance
            .beginFill(Status.Game.activeTintColor, activeAlpha)
            .drawRect(start, 0, currentX, activeHeight)
            .endFill();
        instance
            .beginFill(Status.Game.activeTintColor, activeAlpha)
            .drawRect(start, colorHeight + activeHeight, currentX, activeHeight)
            .endFill();
    }

    function destroy() {
        instance.destroy();
        instance = null;
    }

    function bringToTop(scene) {
        scene.bringToTop(instance);
    }

    return {
        create: create,
        update: update,
        destroy: destroy,
        bringToTop: bringToTop
    };

})();
