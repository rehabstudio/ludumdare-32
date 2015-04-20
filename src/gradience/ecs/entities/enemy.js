'use strict';

var factory = require('../factory'),
    config = require('../../config');

var Filters = require('../../filters');

var Enemy = (function() {

    var enemyGroup,
        colorIds = Object.keys(config.gameColors);

    function getRndColor() {
        var k = Phaser.ArrayUtils.getRandomItem(colorIds);
        return config.gameColors[k];
    }

    function shieldFlash() {
        var cutFilter = new Filters.Glitch.CutSlider();
        cutFilter.rand = 0;
        cutFilter.val1 = 1;
        cutFilter.val2 = 1;

        this.filters = [cutFilter];
        this.game.add.tween(cutFilter)
            .to({rand: 10}, 500)
            .to({rand: 0}, 500)
            .start();
    }

    function dieFlash() {
        this.dying = true;
        var slit = new Filters.Glitch.SlitScan();
        slit.rand = 0.1;
        var shaker = new Filters.Glitch.Shaker();
        shaker.blurY = 0;
        shaker.blurX = 0;
        var convergence = new Filters.Glitch.Convergence();
        convergence.rand = 0;

        this.filters = [slit, shaker, convergence];
        this.game.add.tween(this)
            .to({alpha: 0}, 750)
            .start();
        this.game.add.tween(convergence)
            .to({rand: 1}, 750)
            .start();
        this.game.add.tween(slit)
            .to({rand: 10}, 750)
            .start();
        this.game.add.tween(shaker)
            .to({blurY: 5}, 750)
            .start()
            .onComplete.add(function() {
                this.kill();
            }, this);
    }

    function create(game, params) {

        if (!enemyGroup) {
            enemyGroup = game.add.group();
        }

        var enemy = factory.create([
            ['Sprite', {
                game: game,
                x: params.x,
                y: params.y,
                asset: params.asset,
                group: enemyGroup,
                tint: parseInt(params.color || getRndColor().substr(1), 16)
            }],
            ['Physics', game],
            ['Rotates', params.rotate],
            ['Velocity', {x: params.speed, y: 0, maxX: Math.abs(params.speed), maxY: 0}],
            ['FuncMovement', {
                equation: params.movement,
                speed: params.speed,
                coeff: params.coeff,
                amplitude: params.amplitude
            },
            ['Killable', game]]
        ]);

        enemy.sprite.shieldFlash = shieldFlash;
        enemy.sprite.dieFlash = dieFlash;

        return enemy;
    }

    function createWave(game, params, callback, context) {
        var timer = game.time.create(true, callback);

        for (var idx = 0; idx < params.count; idx++) {
            timer.add(params.delay * idx, create, null, game, params);
        }
        timer.add(params.delay * idx, callback, context);
        timer.start();
    }

    function getGroup() {
        return enemyGroup;
    }

    function clearEnemies() {
        enemyGroup.destroy();
        enemyGroup = null;
    }

    return {
        create: create,
        createWave: createWave,
        getGroup: getGroup,
        clear: clearEnemies
    };
})();

module.exports = Enemy;
