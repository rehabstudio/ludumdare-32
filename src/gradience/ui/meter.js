'use strict';

var config = require('../config/'),
    gameStatus = require('../status/gamestatus');

var MeterUI = function(scene, x, y, color, group) {
    this.color = color;
    this.bar = scene.add.graphics(x, y, group);
    this.bar.beginFill(
        Phaser.Color.hexToRGB(config.gameColors[color])
    );
    this.bar.drawRect(0, 0, 10, config.meterSize);
    this.bar.endFill();
};

MeterUI.prototype.update = function() {
    this.bar.scale.y = gameStatus.colorMeters[this.color] * 0.01;
    this.bar.y = config.meterSize - (config.meterSize * this.bar.scale.y);

    if (gameStatus.colorStates[this.color]) {
        this.bar.alpha = 1;
    } else {
        this.bar.alpha = 0.1;
    }
};

module.exports = MeterUI;
