'use strict';

var Config = require('../config');
var Status = require('../status');
var Environment = require('../environ');


var TitleState = function() {};


function goTutorial() {
    this.menuOpen = false;
    this.game.stopGlitch();
    this.game.state.start('level', true, false, 'assets/levels/tutorial.yaml');
}

function goNormal() {
    this.menuOpen = false;
    this.game.stopGlitch();
    this.game.state.start('level', true, false, 'assets/levels/level_1.yaml');
}

function goSandbox() {
    this.menuOpen = false;
    this.game.stopGlitch();
    this.game.state.start('level', true, false, 'assets/levels/sandbox.yaml');
}

function makeButton(scene, text, callback, context){
    var group = new Phaser.Group(scene);
    scene.add.button(0, 0, 'button', callback, context, 0, 0, 0, 0, group);
    var text = scene.add.text(65, 31, text, Config.font.baseStyle);
    text.anchor.set(0.5);
    group.add(text);
    return group;
}

function showMenu() {
    if (this.menuOpen) {
        return;
    }
    this.menuOpen = true;
    var buttons = {
        tutorial: makeButton(this, "TUTORIAL", goTutorial, this),
        normal: makeButton(this, "NORMAL", goNormal, this),
        sandbox: makeButton(this, "ENDLESS", goSandbox, this)
    };
    buttons.tutorial.x = buttons.normal.x = buttons.sandbox.x = 900;
    buttons.tutorial.y = 110;
    buttons.normal.y = 210;
    buttons.sandbox.y = 310;
    if (this.text) {
        this.add.tween(this.text)
            .to({alpha: 0}, 500, Phaser.Easing.Quadratic.In, true);
    }
    this.add.tween(this.title)
        .to({x: 300}, 1000, Phaser.Easing.Quadratic.Out, true);
    this.add.tween(buttons.tutorial)
        .to({x: 600}, 800, Phaser.Easing.Quadratic.Out, true, 1000);
    this.add.tween(buttons.normal)
        .to({x: 600}, 800, Phaser.Easing.Quadratic.Out, true, 1200);
    this.add.tween(buttons.sandbox)
        .to({x: 600}, 800, Phaser.Easing.Quadratic.Out, true, 1400);
    this.addFlavourText();
}

function _waitForStart() {
    if (this.input.keyboard.isDown(Config.Keymap.Start) || this.input.activePointer.isDown) {
        showMenu.call(this);
    }
}


function _playIntroMusic() {
    this.introsound = this.add.audio('intro');
    this.introsound.play();
    this.intromusic = this.add.audio('title_loop', 1, true);
    this.intromusic.play();
}

TitleState.prototype = {
    init: function() {
    },
    preload: function() {
        this.load.audio(
            'intro',
            [
                'assets/audio/intro.mp3',
                'assets/audio/intro.opus'
            ]
        );
        this.load.audio(
            'gameover',
            [
                'assets/audio/game-over.mp3',
                'assets/audio/game-over.opus'
            ]
        );
        this.load.audio(
            'title_loop',
            [
                'assets/audio/title_loop.mp3',
                'assets/audio/title_loop.opus'
            ]
        );
        this.load.audio(
            'laser_shot',
            [
                'assets/audio/fire_laser.mp3',
                'assets/audio/fire_laser.opus'
            ]
        );
        this.load.audio(
            'laser_hit',
            [
                'assets/audio/laser_hit.mp3',
                'assets/audio/laser_hit.opus'
            ]
        );
        this.load.audio(
            'fizzle',
            [
                'assets/audio/fizzle.mp3',
                'assets/audio/fizzle.opus'
            ]
        );
        this.load.audio(
            'glitch',
            [
                'assets/audio/glitch.mp3',
                'assets/audio/glitch.opus'
            ]
        );
        this.load.image('title', 'assets/sprites/logo.png');
        this.load.image('button', 'assets/sprites/button_back.png');
    },
    create: function() {

        _playIntroMusic.call(this);

        this.backdrop = new Environment.Backdrop(this.game);

        this.title = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'title'
        );
        this.title.anchor.set(0.5);
        this.title.scale.set(0.8);
        this.title.alpha = 0;

        // fudge to ensure font is loaded
        this.add.text(
            this.game.world.centerX,
            this.game.world.height - 80,
            Config.Strings.startText,
            Config.font.baseStyle
        ).destroy();

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
                if (this.menuOpen) {
                    return;
                }
                this.text = this.add.text(
                    this.game.world.centerX,
                    this.game.world.height - 100,
                    Config.Strings.startText,
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
                        true,
                        3000
                    );
            }, this);


        this.game.enableFilters();

        this.game.startGlitch();
    },
    update: function() {
        _waitForStart.call(this);
    },
    render: function() {
    },
    shutdown: function() {
        this.intromusic.stop();
    },
    addFlavourText: function() {
        var flavour = this.add.group();
        var hi = this.add.text(0, 0, 'HI 000567800', Config.font.baseStyle);
        hi.y = 5;
        hi.x = this.game.width - hi.width - 5;
        flavour.add(hi);
        var credit = this.add.text(0, 0, 'CREDIT 01', Config.font.baseStyle);
        credit.y = this.game.height - credit.height - 5;
        credit.x = this.game.width - credit.width - 5;
        flavour.add(hi);
        flavour.add(credit);
        flavour.alpha = 0;
        this.add.tween(flavour).to({alpha: 0.5}, 1000).start();
    }
};

module.exports = TitleState;
