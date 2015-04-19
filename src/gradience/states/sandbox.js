'use strict';

var Status = require('../status');
var Config = require('../config');
var Factory = require('../ecs/factory');
var Systems = require('../ecs/systems');
var Entities = require('../ecs/entities');
var Environment = require('../environ');
var UI = require('../ui');


var LevelState = function() {};

LevelState.prototype = {

    init: function() {

        Systems.init(this.game);
        UI.create(this);

        var self = this;

        // Bind controls to color mixer
        this.controls = {};

        for (var k in Config.Keymap.colorToggles) {
            console.log(k);
            this.controls['toggle' + k] = this.game.input.keyboard.addKey(
                Config.Keymap.colorToggles[k]
            );
            (function(color) {
                self.controls['toggle' + color].onDown.add(function(key) {
                    Status.Game.toggleColor(color);
                }, self);
            })(k);
        }

    },
    preload: function() {
        this.load.image('player', 'assets/sprites/player.png');
        this.load.image('enemy_orb', 'assets/sprites/enemy_orb.png');
        this.load.image('enemy_ship', 'assets/sprites/enemy_ship.png');
        this.load.image('enemy_tri', 'assets/sprites/enemy_tri.png');
        this.load.image('powerup', 'assets/sprites/lazer_start.png');
        this.load.audio(
            'music',
            ['assets/audio/backing-bell.mp3',
             'assets/audio/backing-bell.opus']
        );
    },
    create: function() {

        console.log('LEVEL');

        this.backdrop = new Environment.Backdrop(this.game);

        this.player = Entities.Player.create(this.game);

        this.music = this.add.audio('music');
        this.music.loop = true;

        this.timer = this.game.time.create();
        this.timer.start();

        function createEnemyWave() {
            var asset = ['enemy_orb', 'enemy_ship', 'enemy_tri'][
                Math.floor(Math.random() * 3)
            ];
            Entities.Enemy.createWave(
                this.game,
                {
                    count: 15,
                    delay: 250,
                    x: 900,
                    y: Math.floor(Math.random() * 350) + 50,
                    speed: -200,
                    amplitude: Math.random() * 50 + 10,
                    frequency: 0.01,
                    phase: (Math.random() * 2) - 1,
                    asset: asset
                }
            );
        }

        function createRandomPowerup() {
            if (Math.random() < 0.7) {
                return false;
            }
            Entities.Powerup.create(this.game, {asset: 'powerup'});
        }

        createEnemyWave.call(this);
        this.timer.loop(4500, createEnemyWave, this);
        this.timer.loop(1000, createRandomPowerup, this);

        UI.Score.add(0);
        this.music.play();
    },
    update: function() {

        Systems.Controls.update(Factory.getAll());
        Systems.Movement.update(Factory.getAll());
        Systems.Collision.update(Factory.getAll());
        
        this.game.world.bringToTop(UI.create());
        UI.update();
    },
    render: function() {

    },
    shutdown: function() {
    }
};

module.exports = LevelState;
