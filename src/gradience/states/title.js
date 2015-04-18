var TitleState = function(){};

TitleState.prototype = {
    init: function(args){
    },
    preload: function(){
    },
    create: function(){
        this.game.state.start('main-menu');
    },
    update: function(){
    },
    render: function(){
    },
    shutdown: function(){
    },
};

module.exports = TitleState;
