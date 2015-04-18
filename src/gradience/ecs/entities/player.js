
var factory = require('../factory');

function createPlayer(game) {

    var player = factory.create([
        ['Sprite', {game: game, x: 10, y: 240, asset: 'player'}],
        ['Physics', game],
        ['Drag', 1500],
        ['Velocity', {x: 500, y: 500}],
        ['ControlsArrows', 2000],
        ['CollideWorld']
    ]);

    return player;
}


module.exports = { create: createPlayer };