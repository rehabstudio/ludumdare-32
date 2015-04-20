var Starfield = function(game){

    var emitter = game.add.emitter(game.width, game.height / 2, 400);

    emitter.width = game.width;
    emitter.height = game.height;
    emitter.x = 1200;

    emitter.makeParticles('star');

    emitter.minParticleScale = 0.05;
    emitter.maxParticleScale = 0.3;

    emitter.setXSpeed(-300, -500);
    emitter.setYSpeed(0, 0);

    emitter.gravity = 0;

    emitter.minRotation = 0;
    emitter.maxRotation = 0;

    emitter.fixedToCamera = false;

    emitter.start(false, 3000, 5, 0);

    this.emitter = emitter;
};

Starfield.prototype = Object.create(Phaser.Sprite.prototype);
Starfield.prototype.constructor = Starfield;

module.exports = Starfield;
