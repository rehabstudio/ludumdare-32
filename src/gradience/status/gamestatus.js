/**
 * Game state to be stored here - lives, weapon state, score, etc.
 * To be passed around as a require() where needed.
 **/

var gameStatus = {};

// Active status of the three color wells.
gameStatus.colorStates = {
    r: false,
    g: false,
    b: false
};

module.exports = gameStatus;