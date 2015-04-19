'use strict';

var Status = require('../../status');
var Config = require('../../config');
var Factory = require('../../ecs/factory');
var Systems = require('../../ecs/systems');
var Entities = require('../../ecs/entities');
var Environment = require('../../environ');
var UI = require('../../ui');

var BaseLevel = function() {};

BaseLevel.prototype = {

    init: function(levelConfig) {
        Systems.init(this.game);
        UI.create(this);

        this.parser = new Config.LevelParser(this, levelConfig);
    },
    preload: function() {
        this.parser.load();
    },
    create: function() {
        this.backdrop = new Environment.Backdrop(this.game);
        this.player = Entities.Player.create(this.game);

        this.music = this.add.audio('music');
        this.music.loop = true;
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

module.exports = BaseLevel;
