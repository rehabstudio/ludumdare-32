'use strict';

var Controls = require('./controls');
var Movement = require('./movement');
var Collision =  require('./collision');

function init(game) {
    Controls.init(game);
    Movement.init(game);
    Collision.init(game);
}

module.exports = {
    Controls: Controls,
    Movement: Movement,
    Collision: Collision,

    init: init
};
