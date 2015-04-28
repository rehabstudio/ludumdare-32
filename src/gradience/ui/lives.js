'use strict';

var config = require('../config/'),
	gameStatus = require('../status/gamestatus');


module.exports = (function() {

    var instance;
    var lives;

    var SPRITE_SCALE = 0.4

    function create(scene) {
        if (!instance) {
            lives = [];
            instance = scene.add.group();
            lives[0] = scene.add.sprite(0, 0, 'player', 0, instance);
            lives[0].scale.set(SPRITE_SCALE);
            lives[1] = scene.add.sprite(30, 0, 'player', 0, instance);
            lives[1].scale.set(SPRITE_SCALE);
            lives[2] = scene.add.sprite(60, 0, 'player', 0, instance);
            lives[2].scale.set(SPRITE_SCALE);
            instance.x = 5;
            instance.y = 5;
        }

        return instance;
    }

    function update() {
        lives[0].alpha = lives[1].alpha = lives[2].alpha = 1;

        if (gameStatus.lives == 3) {
            return;
        }

        if (gameStatus.lives <= 2) {
            lives[2].alpha = 0.1;
        }

        if (gameStatus.lives <= 1) {
            lives[1].alpha = 0.1;
        }

        if (gameStatus.lives == 0) {
            instance.game.startGlitch();            
            lives[0].alpha = 0.1;
        }

        else {
            instance.game.stopGlitch();
        }
    }

    function add(value) {
        gameStatus.lives += value;
    }

    function remove(value) {
        gameStatus.lives -= value;
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
