'use strict';

var config = require('../config/'),
	gameStatus = require('../status/gamestatus');


module.exports = (function() {

    var instance;

    function create(scene) {
        if (instance === undefined) {
            var style = config.font.baseStyle;
            instance = scene.add.text(10, 10, gameStatus.score.toString(), style);
            instance.fixedToCamera = true;
        }

        return instance;
    }

    function update() {
        instance.setText(gameStatus.score.toString());
    }

    function add(value) {
        gameStatus.score += value;
    }

    return {
        create: create,
        update: update,
        add: add
    };

})();
