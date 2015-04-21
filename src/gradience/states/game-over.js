'use strict';

var Config = require('../config');
var Environment = require('../environ');


var TitleState = function() {};

function _waitForStart() {
    if (this.input.keyboard.isDown(Config.Keymap.Start) || this.input.activePointer.isDown) {
        this.game.state.start('title', true, false);
    }
}

function _playIntroMusic() {
    this.add.audio('intro').play();
    this.gameover = this.add.audio('gameover', 1, true).play();
}

TitleState.prototype = {
    init: function() {
    },
    preload: function() {
        this.load.image('gameover', 'assets/sprites/gameover.png');
    },
    create: function() {

        _playIntroMusic.call(this);

        this.backdrop = new Environment.Backdrop(this.game);

        this.title = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'gameover'
        );
        this.title.anchor.set(0.5);
        this.title.scale.set(0.8);
        this.title.alpha = 0;

        this.add.tween(this.title)
            .to({alpha: 1}, 1200, Phaser.Easing.Quadratic.Out)
            .start();
        this.add.tween(this.title.scale)
            .to({x: 1, y: 1}, 1500, Phaser.Easing.Elastic.Out)
            .start();
        this.add.tween(this.game.filters.heavyGlow)
            .to({blur: 10}, 1000, Phaser.Easing.Quadratic.Out)
            .to({blur: 6}, 1000, Phaser.Easing.Quadratic.InOut)
            .start()
            .onComplete.add(function() {
                this.text = this.add.text(
                    this.game.world.centerX,
                    this.game.world.height - 80,
                    Config.Strings.gameOverText,
                    Config.font.baseStyle
                );
                this.text.anchor.set(0.5);
                this.text.alpha = 0;
                this.text.y += 40;
                this.add.tween(this.text)
                    .to(
                        {alpha: 1, y: "-40"},
                        1000,
                        Phaser.Easing.Quadratic.Out,
                        true
                );
            }, this);


        this.game.enableFilters();
        this.game.startGlitch();

        this.timeOut = this.game.time.create(true);
        this.timeOut.add(15000, function() {
            this.game.state.start('title', true, false);
        }, this);
        this.timeOut.start();
    },
    update: function() {
        _waitForStart.call(this);
    },
    render: function() {
    },
    shutdown: function() {
        this.gameover.stop();
        this.game.stopGlitch();
    }
};

module.exports = TitleState;
