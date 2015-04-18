'use strict';

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

        this.score = new UI.Score(this);
        this.weaponUI = new UI.Weapon(this);
    },
    preload: function() {
        this.load.spritesheet(
            'player',
            'assets/sprites/player.png',
            110, 100
        );
    },
    create: function() {

        this.rain = new Environment.Starfield(this.game);

        var player = factory.create();
        player.addComponent(
            'Sprite',
            {
                game: this.game,
                x: 10,
                y: 240,
                asset: 'player'
            }
        );
        player.addComponent('ControlsArrows');

        
        this.score.addAmount(0);

    },
    update: function(){
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
