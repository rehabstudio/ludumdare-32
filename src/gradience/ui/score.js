'use strict';

var config = require('../config/'),
	gameStatus = require('../status/gamestatus');


module.exports = (function() {

    var instance;

    function create(scene) {
        if (!instance) {
            var style = config.font.baseStyle;
            instance = scene.add.text(5, 5, gameStatus.score.toString(), style);
        }

        return instance;
    }

    function update() {
        instance.setText(gameStatus.score.toString());
        instance.x = instance.game.width - instance.width - 5;
        instance.y = 0;
    }

    function add(value) {
        gameStatus.score += value;
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
        add: add,
        destroy: destroy,
        bringToTop: bringToTop
    };

})();
