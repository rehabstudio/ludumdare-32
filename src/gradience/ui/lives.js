'use strict';

var config = require('../config/'),
	gameStatus = require('../status/gamestatus');


module.exports = (function() {

    var instance;

    function create(scene) {
        if (instance === undefined) {
            var style = config.font.baseStyle;
            instance = scene.add.text(10, 30, 'Lives: '+gameStatus.lives.toString(), style);
            instance.fixedToCamera = true;
        }

        return instance;
    }

    function update() {
        instance.setText('Lives: '+gameStatus.lives.toString());
    }

    function add(value) {
        gameStatus.lives += value;
    }

    function remove(value) {
        gameStatus.lives -= value;
    }

    return {
        create: create,
        update: update,
        add: add
    };

})();
