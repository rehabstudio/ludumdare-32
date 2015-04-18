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
        this.load.audio('titleMusic', ['assets/audio/intro.mp3', 'assets/audio/intro.opus']);
    },
    create: function(){
        this.game.state.start('title');
    }
};

module.exports = BootState;
