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
        this.load.spritesheet(
            'player',
            'assets/sprites/player.png',
            110, 100
        );
        this.load.spritesheet(
            'enemy',
            'assets/sprites/enemy.png',
            100, 100
        );
    },
    create: function() {

        console.log('LEVEL');

        this.starfield = new Environment.Starfield(this.game);

        this.player = Entities.Player.create(this.game);

        this.timer = this.game.time.create();
        this.timer.start();

        function createEnemyWave() {
            Entities.Enemy.createWave(
                this.game,
                {
                    count: 20,
                    delay: 500,
                    x: 900,
                    y: Math.floor(Math.random() * 400) + 40,
                    speed: -100,
                    amplitude: 60,
                    frequency: 0.01,
                    phase: (Math.random() * 2) - 1,
                    asset: 'enemy'
                }
            );
        }

        createEnemyWave.call(this);
        this.timer.loop(2000, createEnemyWave, this);

        this.score.addAmount(0);

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
