var BootState = function(){};

BootState.prototype = {
    init: function(args){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 800;
        this.scale.minHeight = 480;
        this.scale.refresh();
        // do we even want max?
        // this.scale.maxWidth = 1920;
        // this.scale.maxHeight = 1080;
    },
    preload: function(){
        this.game.load.image('star', 'assets/sprites/lazer_hit.png');
    },
    create: function(){
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
