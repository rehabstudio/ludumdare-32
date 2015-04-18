/**
 * Game state to be stored here - lives, weapon state, score, etc.
 * To be passed around as a require() where needed.
 **/

var gameStatus = {};

// Active status of the three color wells.
gameStatus.colorStates = {
    r: false,
    g: true,
    b: false
};

// Currnt active mixed color
gameStatus.activeColor = '#ffffff';


module.exports = gameStatus;