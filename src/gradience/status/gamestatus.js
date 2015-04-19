var config = require('../config');
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

gameStatus.colorMeters = {
    r: 100,
    g: 100,
    b: 100
}

// Current active mixed color
gameStatus.activeColor = '#ffffff';

// Current active hexint color, for sprite.tint
gameStatus.activeTintColor = 0xffffff;

// Function to toggle color status.
gameStatus.toggleColor = function(colorKey) {
    this.colorStates[colorKey] = !this.colorStates[colorKey];
    this.updateActiveColor();
}

// Updates the active color to match the toggled flags
gameStatus.updateActiveColor = function() {
    var str = '', self = this;
    config.gameColorKeys.forEach(function(k) {
        if(self.colorStates[k]) str += k;
    });
    var col;
    if (str === 'rgb') {
        col = '#aa77fa';
    } else if (str === '') {
        col = config.inactiveColor;
    } else {
        col = config.gameColors[str];
    }
    this.activeColor = col;
    this.activeTintColor = parseInt(col.substr(1), 16);
}

gameStatus.updateActiveColor();

module.exports = gameStatus;
