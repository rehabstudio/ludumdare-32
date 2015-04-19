var Keymap = require('../config/keymap'),
    Strings = require('../config/strings');


var GameOverState = function(){};

function _displayGameOverText() {
    var style = {
        fontSize: '20px',
        fill: '#3f8'
    };
    var text = this.add.text(this.game.width * 0.5, 50, Strings.gameOverText, style);
    text.anchor.setTo(0.5);
};

function _waitForRestart() {
    // if (this.input.keyboard.isDown(Keymap.Start) || this.input.activePointer.isDown){
    //     this.game.state.start('sandbox', true, false);
    // }
};

function _playGameOverMusic() {
    this.gameOverMusic = this.add.audio('gameover');
    this.gameOverMusic.play();
}

GameOverState.prototype = {
    init: function(args){
    },
    preload: function(){
        this.load.audio(
            'gameover',
            ['assets/audio/intro.mp3',
             'assets/audio/intro.opus']
        );
    },
    create: function(){
        console.log('GAME OVER');

        _playGameOverMusic.call(this);
        _displayGameOverText.call(this);

    },
    update: function(){
        _waitForRestart.call(this);
    },
    render: function(){
    },
    shutdown: function(){
    },
};

module.exports = GameOverState;
