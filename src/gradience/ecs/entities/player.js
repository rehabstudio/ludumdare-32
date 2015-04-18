
var factory = require('../factory');

function createPlayer(game) {
    var player = factory.create();
    player.addComponent(
        'Sprite',
        {
            game: game,
            x: 10,
            y: 240,
            asset: 'player'
        }
    );
    player.addComponent('Physics', game);
    player.addComponent('Drag', 1500);
    player.addComponent('Velocity', { x: 500, y: 500});
    player.addComponent('ControlsArrows', 2000);
    player.addComponent('CollideWorld');

    return player;
}


module.exports = { create: createPlayer };