// Player goes here

var Player = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.speed = 5;
    this._init();
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype._init = function(){
    this._bindControls();
};

Player.prototype._bindControls = function(){
    this.cursors = this.game.input.keyboard.createCursorKeys();
};

Player.prototype.update = function(){
    if (this.cursors.up.isDown){
        this.y -= this.speed;
    }
    if (this.cursors.down.isDown){
        this.y += this.speed;
    }

    if (this.y < 0){
        this.y = 0;
    }
    else if (this.y > this.game.height - this.height){
        this.y = this.game.height - this.height;
    }
};



module.exports = Player;
