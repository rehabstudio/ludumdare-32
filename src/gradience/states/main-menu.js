var MainMenuState = function(){};

MainMenuState.prototype = {
    init: function(args){
    },
    preload: function(){
    },
    create: function(){
        this.game.state.start('level');
    },
    update: function(){
    },
    render: function(){
    },
    shutdown: function(){
    },
};

module.exports = MainMenuState;
