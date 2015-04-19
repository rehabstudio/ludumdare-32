'use strict';

var Entities = {
    Player: require('../entities/player'),
    PlayerShot: require('../entities/playershot'),
    Enemy: require('../entities/enemy')
};

var CollisionSystem = (function() {

    var start, game;

    function init(gameInstance) {
        game = gameInstance;
    }

    function update(ents) {

        game.physics.arcade.collide(Entities.Player.get(), Entities.Enemy.getGroup(), function(p, e) {
            console.log('Player hit enemy', p, e);
            p.kill();
        }, null, game);

        game.physics.arcade.collide(Entities.PlayerShot.getGroup(), Entities.Enemy.getGroup(), function(b, e) {
            b.kill();
            if(b.tint === e.tint) {
                console.log('Bullet hit enemy', b, e);
                e.kill();    
            }
        }, null, game);

        
    }

    return {
        init: init,
        update: update
    };

})();

module.exports = CollisionSystem;
