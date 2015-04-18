var Starfield = function(game){

    var starImg = this._createStarImage();
    game.cache.addImage('star', null, starImg);

   // this.alpha = 0.6;

    var emitter = game.add.emitter(game.width, game.height / 2, 400);

    emitter.width = game.width;
    emitter.height = game.height;

    console.log(emitter.x);

    emitter.makeParticles('star');

    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;

    emitter.setXSpeed(-300, -500);
    emitter.setYSpeed(0, 0);

    emitter.gravity = 0;

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.fixedToCamera = false;

    emitter.start(false, 3000, 5, 0);

    console.log('emitter', emitter);

};

Starfield.prototype = Object.create(Phaser.Sprite.prototype);
Starfield.prototype.constructor = Starfield;

Starfield.prototype._createStarImage = function() {

    var c = document.createElement('canvas');
    c.width = 2, c.height=6;
    var ctx = c.getContext('2d');

    var grd = ctx.createLinearGradient(0,0,0,c.height-1);
    grd.addColorStop(0,"transparent");
    grd.addColorStop(0.5,"#A4ACB3");
    ctx.fillStyle = '#ffffff'; //grd;
    ctx.fillRect(0, 0, c.width, c.height);

    var cimg = new Image;
    cimg.src = c.toDataURL('image/png');
    return cimg;
}


module.exports = Starfield;