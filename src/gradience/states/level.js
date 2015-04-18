'use strict';

var KeyMap = require('../config/keymap'),
    gameStatus = require('../status/gamestatus');

var components = require('../ecs/components');
var factory = require('../ecs/factory');

var Environment = {
    Starfield: require('../environ/backdrop')
};

var Systems = {
    Controls: require('../ecs/systems/controls'),
    Movement: require('../ecs/systems/movement')
};

var Entities = {
    Player: require('../ecs/entities/player'),
    Enemy: require('../ecs/entities/enemy')
};

var UI = {
    Weapon: require('../ui/weapon'),
    Score: require('../ui/score')
};


var LevelState = function() {};


LevelState.prototype = {

    init: function() {

        factory.initComponents(components);
        Systems.Controls.init(this.game);
        Systems.Movement.init(this.game);

        var self = this;

        // Setup UI
        this.score = new UI.Score(this);
        this.weaponUI = new UI.Weapon(this);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Bind controls to color mixer
        this.controls = {};

        for (var k in KeyMap.colorToggles) {
            console.log(k);
            this.controls['toggle' + k] = this.game.input.keyboard.addKey(KeyMap.colorToggles[k]);
            (function(color) {
                self.controls['toggle' + color].onDown.add(function(key) {
                    gameStatus.toggleColor(color);
                }, self);
            })(k);
        }

    },
    preload: function() {
        this.load.image('player', 'assets/sprites/player.png');
        this.load.image('enemy_orb', 'assets/sprites/enemy_orb.png');
        this.load.image('enemy_ship', 'assets/sprites/enemy_ship.png');
        this.load.image('enemy_tri', 'assets/sprites/enemy_tri.png');
        this.load.audio(
            'music',
            ['assets/audio/backing-bell.mp3',
             'assets/audio/backing-bell.opus']
        );
    },
    create: function() {

        console.log('LEVEL');

        this.starfield = new Environment.Starfield(this.game);

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
                    count: 10,
                    delay: 300,
                    x: 900,
                    y: Math.floor(Math.random() * 480) - 50,
                    speed: -200,
                    amplitude: Math.random() * 50 + 10,
                    frequency: 0.01,
                    phase: (Math.random() * 2) - 1,
                    asset: asset
                }
            );
        }

        createEnemyWave.call(this);
        this.timer.loop(4500, createEnemyWave, this);

        this.score.addAmount(0);
        this.music.play();

    },
    update: function() {

        Systems.Controls.update(factory.getAll());
        Systems.Movement.update(factory.getAll());
        this.score.update();
        this.weaponUI.update();

    },
    render: function() {

    },
    shutdown: function() {
    }
};

module.exports = LevelState;
