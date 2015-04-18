var UI = {
    Weapon: require('../ui/weapon'),
    Score: require('../ui/score')
};


var LevelState = function(){};

LevelState.prototype = {
    init: function(args){

        this.score = new UI.Score(this);
        this.weaponUI = new UI.Weapon(this);

    },
    preload: function(){

    },
    create: function(){

        console.log("LEVEL!");
        this.score.addAmount(0);

    },
    update: function(){

        this.score.update();
        this.weaponUI.update();

    },
    render: function(){

    },
    shutdown: function(){
        
    },
};

module.exports = LevelState;
