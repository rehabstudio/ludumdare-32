'use strict';

var Score = require('./score');
var Lives = require('./lives');
var Weapon = require('./weapon');
var Meters = require('./meter');
var Scanlines = require('./scanlines');


var UI = (function() {

    var group;

    function create(scene) {
        if (group === undefined) {
            group = new Phaser.Group(scene);

            var score = Score.create(scene);
            group.addChild(score);

            var lives = Lives.create(scene);
            group.addChild(lives);

            var weapon = Weapon.create(scene, 10, scene.game.height - 40);
            group.addChild(weapon);

            var meters = Meters.create(scene, 22, scene.game.height - 120);
            group.addChild(meters);

            var scanlines = Scanlines.create(scene);
            group.addChild(scanlines);
        }

        return group;
    }

    function update() {
        Score.update();
        Lives.update();
        Weapon.update();
        Meters.update();
    }

    return {
        Score: Score,
        Lives: Lives,
        Weapon: Weapon,
        Meters: Meters,
        Scanlines: Scanlines,

        create: create,
        update: update
    };

})();

module.exports = UI;
