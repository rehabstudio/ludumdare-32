var Keymap = require('../config/keymap'),
    Strings = require('../config/strings');


var TitleState = function(){};

function _displayStartText() {
    var style = {
        fontSize: '20px',
        fill: '#3f8'
    };
    var text = this.add.text(this.game.width * 0.5, 50, Strings.startText, style);
    text.anchor.setTo(0.5);
};

function _waitForStart() {
    if (this.input.keyboard.isDown(Keymap.Start) || this.input.activePointer.isDown){
        this.game.state.start('level');
    }
};

TitleState.prototype = {
    init: function(args){
    },
    preload: function(){
    },
    create: function(){
        console.log('TITLE');

        _displayStartText.call(this);

    },
    update: function(){
        _waitForStart.call(this);
    },
    render: function(){
    },
    shutdown: function(){
    },
};

module.exports = TitleState;
