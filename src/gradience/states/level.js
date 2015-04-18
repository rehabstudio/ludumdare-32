var KeyMap = require('../config/keymap'),
    gameStatus = require('../status/gamestatus');

var UI = {
    Weapon: require('../ui/weapon'),
    Score: require('../ui/score')
};


function _checkColorKeys() {


}


var LevelState = function(){};

LevelState.prototype = {
    init: function(args){

        var self = this;

        // Setup UI
        this.score = new UI.Score(this);
        this.weaponUI = new UI.Weapon(this);

        // Bind controls to color mixer
        this.controls = {};
        for(var k in KeyMap.colorToggles) {
            console.log(k);
            this.controls['toggle' + k] = this.game.input.keyboard.addKey(KeyMap.colorToggles[k]);
            (function(color) {
                self.controls['toggle' + color].onDown.add(function(key) {
                    gameStatus.toggleColor(color); 
                }, self);
            })(k);
        }
        
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
