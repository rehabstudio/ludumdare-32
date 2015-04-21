'use strict';

var Status = require('../../status');
var Config = require('../../config');
var Factory = require('../../ecs/factory');
var Systems = require('../../ecs/systems');
var Entities = require('../../ecs/entities');
var Environment = require('../../environ');
var UI = require('../../ui');

var Filters = require('../../filters');

var BaseLevel = function() {};

BaseLevel.prototype = {

    init: function(levelConfig) {
        Systems.init(this);
        this.parser = new Config.LevelParser(this, levelConfig);
    },
    preload: function() {
        this.parser.load();
    },
    create: function(a) {
        UI.create(this);
        Status.Game.lives = 3;
        this.add.audio('intro', 1).play();
        this.bells = this.add.audio('bells', 1, true).play();

        this.backdrop = new Environment.Backdrop(this.game);

        this.flags = {};
        this.shaker = new Filters.Glitch.Shaker();
        this.slitScan = new Filters.Glitch.SlitScan();
        this.glow = new Filters.Glitch.Glow();
        this.game.world.filters = [this.glow];

        this.onWaveDefeated = new Phaser.Signal();
        this.onWaveCreated = new Phaser.Signal();

        this.game.enableFilters();
        this.startLevel();
    },
    startLevel: function() {
        Systems.Controls.pause(true);
        console.log("Create level: " + this.parser.level.name);

        for (var key in this.parser.level.flags) {
            this.flags[key ] = this.parser.level.flags[key];
        }

        this.createPlayer();

        this.showDialog(this.parser.level.preDialog || [], function() {
            this.startPhase(this.parser.level.phases.slice(), function() {
                this.endLevel();
            }, this);
        }, this);

        Systems.Controls.pause(false);
    },
    endLevel: function() {
        Systems.Controls.pause(true);

        this.exitPlayer();
        this.showDialog(this.parser.level.postDialog || [], function() {
            if ('nextLevel' in this.parser.level) {
                this.game.state.start(
                    'level', true, false,
                    this.parser.level.nextLevel
                );
            }

            else {
                this.game.state.start('title');
            }
        }, this);

        Systems.Controls.pause(false);
    },
    startPhase: function(phases, callback, context){
        if (phases.length == 0) {
            callback.call(context);
            return;
        }
        console.log("Start Phase: " + phases[0].name)
        this.showDialog(phases[0].preDialog || [], function() {
            this.startWave(phases[0].waves, function() {
                this.showDialog(phases[0].postDialog || [], function() {
                    this.startPhase(phases.slice(1), callback, context);
                }, this);
            }, this);
        }, this);
    },
    startWave: function(waves, callback, context) {
        if (waves.length == 0) {
            callback.call(context);
            return;
        }

        console.log("Waves remaining: " + waves.length); 

        // horrible but getting around the problem ok
        this.onWaveDefeated.removeAll();
        this.onWaveCreated.removeAll();
        this.onWaveCreated.add(function(){
            console.log(" - wave created");
            this.onWaveCreated.removeAll();
            this.onWaveDefeated.add(function() {
                console.log(" - wave destroyed");
                this.onWaveDefeated.removeAll();
                this.startWave(waves.slice(1), callback, context);
            }, this);
        }, this);

        Entities.Enemy.createWave(
            this,
            {
                count: waves[0].count,
                delay: 250,
                x: 900,
                y: this.game.world.centerY,
                rotate: waves[0].rotate,
                formation: waves[0].formation,
                movement: waves[0].movement,
                speed: waves[0].speed,
                coeff: waves[0].coeff,
                amplitude: waves[0].amplitude,
                asset: 'enemy_' + waves[0].type,
                color: Config.gameColors[waves[0].color].substr(1)
            },
            function() {
                this.onWaveCreated.dispatch();
            },
            this
    );
    },
    createPlayer: function() {
        this.player = Entities.Player.create(this);
        this.player.sprite.body.enable = false;
        this.player.sprite.x = -600;
        this.add.tween(this.player.sprite)
            .to({x: 250}, 2000, Phaser.Easing.Quadratic.Out, false, 1000)
            .to({x: 100}, 1000, Phaser.Easing.Quadratic.InOut)
            .start()
            .onComplete.add(function() {
                this.player.sprite.body.enable = true;
            }, this);
    },
    exitPlayer: function() {
        this.player.sprite.body.enable = false;
        this.add.tween(this.player.sprite)
            .to({x: this.player.sprite.x - 150}, 1000, Phaser.Easing.Quadratic.InOut)
            .to({x: this.game.width + 600}, 2000, Phaser.Easing.Quadratic.In)
            .start();
    },
    showDialog: function(dialog, callback, context) {
        if (dialog.length == 0) {
            callback.call(context);
            return false;
        }

        this.shaker.blurY = 5;
        this.shaker.blurX = 0;
        this.slitScan.rand = 15;
        if (!this.dialogText) {
            this.dialogText = this.add.text(
                this.game.world.centerX, this.game.world.centerY,
                dialog[0],
                Config.font.baseStyle
            );
        }

        else {
            this.dialogText.setText(dialog[0]);
        }
        this.dialogText.anchor.set(0.5);
        this.dialogText.alpha = 0;
        this.dialogText.filters = [this.shaker, this.slitScan];
        this.add.tween(this.dialogText)
            .to({alpha: 1}, 1000, Phaser.Easing.Linear.None, false, 1000)
            .to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 1000)
            .start();
        this.add.tween(this.slitScan)
            .to({rand: 0.1}, 1000, Phaser.Easing.Linear.None, false, 1000)
            .to({rand: 15}, 1000, Phaser.Easing.Linear.None, false, 1000)
            .start();
        this.add.tween(this.shaker)
            .to({blurY: 0}, 1000, Phaser.Easing.Linear.None, false, 1000)
            .to({blurY: 5}, 1000, Phaser.Easing.Linear.None, false, 1000)
            .start()
            .onComplete.add(function(){
                this.showDialog(dialog.slice(1), callback, context);
            }, this);
    },
    update: function() {

        Systems.Controls.update(Factory.getAll());
        Systems.Movement.update(Factory.getAll());
        Systems.Collision.update(Factory.getAll());

        var enemies = Entities.Enemy.getGroup();

        if (enemies && enemies.countLiving() == 0) {
            this.onWaveDefeated.dispatch();
        }

        if (this.flags.unlimitedAmmo) {
            Status.Game.colorMeters.r = 100;
            Status.Game.colorMeters.g = 100;
            Status.Game.colorMeters.b = 100;
        }

        UI.bringToTop(this.game.world);
        UI.update();
    },
    render: function() {

    },
    shutdown: function() {
        Factory.clear();
        Entities.Enemy.clear();
        Entities.PlayerShot.clear();
        UI.clear();
        if (this.dialogText) {
            this.dialogText.destroy();
            this.dialogText = null;
        }
        this.bells.stop();
    }
};

module.exports = BaseLevel;
