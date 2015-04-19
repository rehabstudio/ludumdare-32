'use strict';

var Scanlines = function(game){

    var limg = this._createImage(game.width, game.height);
    game.cache.addImage('scanlines', null, limg);

    Phaser.Sprite.call(this, game, 0, 0, 'scanlines', 0);

    this.alpha = 0.2;
    this.fixedToCamera = true;

};

Scanlines.prototype = Object.create(Phaser.Sprite.prototype);
Scanlines.prototype.constructor = Scanlines;

Scanlines.prototype.update = function() {
    this.alpha = (Math.random() * 0.05) + 0.2;
}

Scanlines.prototype._createImage = function(w, h) {

    var c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    var ctx = c.getContext('2d');

    // make image
    ctx.fillStyle = '#444';
    for(var i = 0; i < c.height; i++) {
        if (i % 2) ctx.fillRect(0, i, c.width, 1);
    }

    var cimg = new Image;
    cimg.src = c.toDataURL('image/png');
    return cimg;

}

module.exports = Scanlines;