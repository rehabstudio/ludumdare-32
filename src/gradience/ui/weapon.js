'use strict';

var config = require('../config/'),
    gameStatus = require('../status/gamestatus');

// A string to represent our color indicators.
var indString = '# R G B';

var Weapon = (function() {

    var instance;

    function create(scene, x, y) {
        if (!instance) {
            var style = Object.create(config.font.baseStyle);
            style.fill = config.inactiveColor;
            style.fontSize = '14px';

            instance = scene.add.text(x, y, indString, style);
            instance.fixedToCamera = true;
        }

        return instance;
    }

    function update() {
        var isActive = false;

        for (var k in gameStatus.colorStates) {
            if (gameStatus.colorStates[k]) {
                isActive = true;
                break;
            }
        }
        var activeColor = (isActive) ? gameStatus.activeColor : config.inactiveColor;

        instance.addColor(activeColor, 0);

        var pos = 2;
        var x = 0;
        ['r', 'g', 'b'].forEach(function(k) {
            var icol = (gameStatus.colorStates[k]) ? config.gameColors[k] : config.inactiveColor;
            instance.addColor(icol, pos + x);
            x += 2;
        });
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


module.exports = Weapon;
