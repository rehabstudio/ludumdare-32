var BootState = function(){};

BootState.prototype = {
    init: function(args){
    },
    preload: function(){
    },
    create: function(){
        this.game.state.start('title');
    }
};

module.exports = BootState;
