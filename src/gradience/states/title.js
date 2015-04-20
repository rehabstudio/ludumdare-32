'use strict';

var Config = require('../config');
var Environment = require('../environ');
var Filters = require('../filters');


var TitleState = function() {};


function goTutorial() {
    this.game.state.start('level', true, false, 'assets/levels/tutorial.yaml');
}

function goNormal() {
    this.game.state.start('level', true, false, 'assets/levels/level_1.yaml');
}

function goSandbox() {
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
        sandbox: makeButton(this, "SANDBOX", goSandbox, this)
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
            ['assets/audio/intro.mp3',
             'assets/audio/intro.opus']
        );
        this.load.audio(
            'bells',
            ['assets/audio/backing-bell.mp3',
             'assets/audio/backing-bell.opus']
        );
        this.load.audio(
            'title_loop',
            ['assets/audio/title_loop.mp3']
        );
        this.load.audio(
            'laser_shot',
            ['assets/audio/fire_laser.mp3']
        );
        this.load.audio(
            'laser_hit',
            ['assets/audio/laser_hit.mp3']
        );
        this.load.audio(
            'fizzle',
            ['assets/audio/fizzle.mp3']
        );
        this.load.image('title', 'assets/sprites/logo.png');
        this.load.image('button', 'assets/sprites/button_back.png');
    },
    create: function() {

        _playIntroMusic.call(this);

        var filters = {
            heavyGlow: new Filters.Glitch.Glow(),
            convergence: new Filters.Glitch.Convergence(),
            slitScan: new Filters.Glitch.SlitScan()
        };
        filters.heavyGlow.blur = 2;
        filters.convergence.rand = 0.15;
        filters.slitScan.rand = 1;

        function glitch() {
            this.add.tween(filters.slitScan)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: 1}, 10, Phaser.Easing.Linear.None, false, 100)
                .start();
            this.add.tween(filters.convergence)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: 0.15}, 10, Phaser.Easing.Linear.None, false, 100)
                .start()
                .onComplete.add(function() {
                    var timer = this.game.time.create(true);
                    timer.add(Math.random() * 5000, glitch, this);
                    timer.start();
                }, this);
        }

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

        this.game.world.filters = [
            filters.heavyGlow,
            filters.convergence,
            filters.slitScan
        ];
        this.add.tween(this.title)
            .to({alpha: 1}, 1200, Phaser.Easing.Quadratic.Out)
            .start();
        this.add.tween(this.title.scale)
            .to({x: 1, y: 1}, 1500, Phaser.Easing.Elastic.Out)
            .start();
        this.add.tween(filters.heavyGlow)
            .to({blur: 10}, 1000, Phaser.Easing.Quadratic.Out)
            .to({blur: 6}, 1000, Phaser.Easing.Quadratic.InOut)
            .start()
            .onComplete.add(function() {
                if (this.menuOpen) {
                    return;
                }
                this.text = this.add.text(
                    this.game.world.centerX,
                    this.game.world.height - 80,
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



        glitch.call(this);
    },
    update: function() {
        _waitForStart.call(this);
    },
    render: function() {
    },
    shutdown: function() {
        this.intromusic.stop();
    }
};

module.exports = TitleState;
