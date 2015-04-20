'use strict';

var Score = require('./score');
var Lives = require('./lives');
var Weapon = require('./weapon');
var Meters = require('./meter');
var Scanlines = require('./scanlines');


var UI = (function() {

    var elements;
    function create(scene) {
        if (!elements) {
            elements = {};
            elements.score = Score.create(scene);
            elements.lives = Lives.create(scene);
            elements.weapon = Weapon.create(scene, 10, scene.game.height - 40);
            elements.meters = Meters.create(scene, 22, scene.game.height - 120);
            elements.scanlines = Scanlines.create(scene);
        }

        return elements;
    }

    function update() {
        Score.update();
        Lives.update();
        Weapon.update();
        Meters.update();
    }

    function bringToTop(scene) {
        Score.bringToTop(scene);
        Lives.bringToTop(scene);
        Weapon.bringToTop(scene);
        Meters.bringToTop(scene);
    }

    function clear(){
        Score.destroy();
        Lives.destroy();
        Weapon.destroy();
        Meters.destroy();
        elements = null;
    }

    return {
        Score: Score,
        Lives: Lives,
        Weapon: Weapon,
        Meters: Meters,
        Scanlines: Scanlines,

        create: create,
        update: update,
        clear: clear,
        bringToTop: bringToTop
    };

})();

module.exports = UI;
