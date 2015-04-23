var Filters = require('../filters');

var BootState = function(){};

BootState.prototype = {
    init: function(args){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 800;
        this.scale.minHeight = 480;
        this.scale.refresh();
        this.scale.maxWidth = 1000;
        this.scale.maxHeight = 600;
    },
    preload: function(){
        this.game.load.image('star', 'assets/sprites/lazer_hit.png');
    },
    create: function(){
        this.game.startGlitch = function() {
            this.isGlitching = true;
            this.glitch();
        };
        this.game.stopGlitch = function() {
            this.isGlitching = false;
            this.filters.heavyGlow.blur = 2;
            this.filters.convergence.rand = 0.15;
            this.filters.slitScan.rand = 1;
        }
        this.game.glitch = function() {
            this.add.tween(this.filters.slitScan)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random() * 15}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: 1}, 10, Phaser.Easing.Linear.None, false, 100)
                .start();
            this.add.tween(this.filters.convergence)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: Math.random()}, 10, Phaser.Easing.Linear.None, false, 100)
                .to({rand: 0.15}, 10, Phaser.Easing.Linear.None, false, 100)
                .start()
                .onComplete.add(function() {
                    //console.log(this);
                    if (!this.isGlitching) {
                        return;
                    }
                    var timer = this.time.create(true);
                    timer.add(Math.random() * 5000, this.glitch, this);
                    timer.start();
                }, this);
        };
        this.game.enableFilters = function(){
            this.world.filters = [
                this.filters.heavyGlow,
                this.filters.convergence,
                this.filters.slitScan
            ];
        };

        this.game.filters = {
            heavyGlow: new Filters.Glitch.Glow(),
            convergence: new Filters.Glitch.Convergence(),
            slitScan: new Filters.Glitch.SlitScan()
        };
        this.game.filters.heavyGlow.blur = 2;
        this.game.filters.convergence.rand = 0.15;
        this.game.filters.slitScan.rand = 1;


        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        if (window.location.hash == "#sandbox") {
            this.game.state.start('sandbox');
        } 
        
        else if (window.location.hash.indexOf("#level") === 0) {
            var level = window.location.hash.split('|')[1];
            this.game.state.start('level', true, true, level);
        }

        else {
            this.game.state.start('title');
        }
    }
};

module.exports = BootState;
