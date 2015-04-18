
'use strict';

var KeyMap = require('../config/keymap'),
    gameStatus = require('../status/gamestatus');

var components = require('../ecs/components');
var factory = require('../ecs/factory');

var ControlsSystem = require('../ecs/systems/controls');

var Environment = {
    Starfield: require('../environ/backdrop')
};


var UI = {
    Weapon: require('../ui/weapon'),
    Score: require('../ui/score')
};


var LevelState = function() {};


LevelState.prototype = {
    
    init: function() {

        factory.initComponents(components);
        ControlsSystem.init(this.game);

        var self = this;

        // Setup UI
        this.score = new UI.Score(this);
        this.weaponUI = new UI.Weapon(this);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Bind controls to color mixer
        this.controls = {};
        for(var k in KeyMap.colorToggles) {
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

        this.rain = new Environment.Starfield(this.game);

        var player = factory.create([
            ['Sprite', {game: this.game, x: 10, y: 240, asset: 'player'}],
            ['Physics', this.game],
            ['Drag', 1500],
            ['Velocity', {x: 500, y: 500}],
            ['ControlsArrows', 2000],
            ['CollideWorld']
        ]);

        this.score.addAmount(0);

    },
    update: function() {
        ControlsSystem.update(factory.getAll());
        this.score.update();
        this.weaponUI.update();
    },
    render: function() {

    },
    shutdown: function() {
    }
};

module.exports = LevelState;
