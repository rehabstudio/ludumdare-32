'use strict';

var Score = require('./score');
var Lives = require('./lives');
var Meters = require('./meter');

var UI = (function() {

    var elements;
    function create(scene) {
        if (!elements) {
            elements = {};
            elements.score = Score.create(scene);
            elements.lives = Lives.create(scene);
            elements.meters = Meters.create(scene);
        }

        return elements;
    }

    function update() {
        Score.update();
        Lives.update();
        Meters.update();
    }

    function bringToTop(scene) {
        Score.bringToTop(scene);
        Lives.bringToTop(scene);
        Meters.bringToTop(scene);
    }

    function clear(){
        Score.destroy();
        Lives.destroy();
        Meters.destroy();
        elements = null;
    }

    return {
        Score: Score,
        Lives: Lives,
        Meters: Meters,

        create: create,
        update: update,
        clear: clear,
        bringToTop: bringToTop
    };

})();

module.exports = UI;
