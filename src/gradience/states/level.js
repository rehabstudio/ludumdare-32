
'use strict';

var KeyMap = require('../config/keymap'),
    gameStatus = require('../status/gamestatus');

var components = require('../ecs/components');
var factory = require('../ecs/factory');

var ControlsSystem = require('../ecs/systems/controls');

var Environment = {
    Starfield: require('../environ/backdrop')
};

var Entities = {
    Player: require('../ecs/entities/player')
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

        this.score.addAmount(0);
        this.music.play();

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
