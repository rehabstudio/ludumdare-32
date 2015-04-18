// Player goes here
var KeyMap = require('../config/keymap'),
    gameStatus = require('../status/gamestatus');


var c = document.createElement('canvas'),
    ctx = c.getContext('2d');

c.width = 200;
c.height = 10;

function _createShotImage() {
    ctx.fillStyle = '#00ff00'; 
    ctx.fillRect(0, 0, c.width, c.height);

    var cimg = new Image;
    cimg.src = c.toDataURL('image/png');
    return cimg;
}


function _setupPlayerBullets() {
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(20, 'playershot', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('lifespan', this.bulletLifespan);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
}



var Player = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'player');

    var shotImg = _createShotImage();
    game.cache.addImage('playershot', null, shotImg);

    this.speed = 5;

    this.bulletSpeed = 2000;
    this.bulletLifespan = 1000;

    this.fireRate = 200;
    this._lastFireTime = this.game.time.now;

    this._init();
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype._init = function() {
    this._bindControls();
};

Player.prototype._bindControls = function(){
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.fireButton = this.game.input.keyboard.addKey(KeyMap.playerFire);
    console.log('_bindControls');
};

Player.prototype.update = function(){
    if (this.cursors.up.isDown){
        this.y -= this.speed;
    }
    if (this.cursors.down.isDown){
        this.y += this.speed;
    }
    if(this.fireButton.isDown) {
        this.fire();
    }

    if (this.y < 0){
        this.y = 0;
    }
    else if (this.y > this.game.height - this.height){
        this.y = this.game.height - this.height;
    }
};

Player.prototype.fire = function() {

    console.log('Fire');

    var canFire = false;
    for(var k in gameStatus.colorStates) {
        if(gameStatus.colorStates[k]) {
            canFire = true;
            break;
        }
    }
    if (!canFire) return false;

    if (this.game.time.now > this._lastFireTime)
    {
        var bullet = this.bullets.getFirstExists(false);

        if (bullet)
        {
            //this.sounds.fire.play();
            bullet.reset(this.x, this.y);
            bullet.velocity = this.bulletSpeed;
            this._lastFireTime = this.game.time.now + this.fireRate;
        }
    }

}



module.exports = Player;
