'use strict';

var components = require('../ecs/components');
var factory = require('../ecs/factory');

var ControlsSystem = require('../ecs/systems/controls');

var LevelState = function() {};

LevelState.prototype = {
    init: function() {
        factory.initComponents(components);
        ControlsSystem.init(this.game);
    },
    preload: function() {
        this.load.spritesheet(
            'player',
            'assets/sprites/player.png',
            110, 100
        );
    },
    create: function() {
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
    },
    update: function() {
        ControlsSystem.update(factory.getAll());
    },
    render: function() {

    },
    shutdown: function() {
    }
};

module.exports = LevelState;
