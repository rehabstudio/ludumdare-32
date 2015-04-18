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

// Current active mixed color
gameStatus.activeColor = '#ffffff';

// Current active hexint color, for sprite.tint
gameStatus.activeTintColor = 0xffffff;

// Function to toggle color status.
gameStatus.toggleColor = function(colorKey) {
    console.log(colorKey);
    this.colorStates[colorKey] = !this.colorStates[colorKey];
    this.updateActiveColor();
}

// Updates the active color to match the toggled flags
gameStatus.updateActiveColor = function() {
    var r = (this.colorStates.r) ? 'FF' : '00',
        g = (this.colorStates.g) ? 'FF' : '00',
        b = (this.colorStates.b) ? 'FF' : '00';
    this.activeColor = '#' + r + g + b;
    this.activeTintColor = parseInt(r + g + b, 16);
}

gameStatus.updateActiveColor();

module.exports = gameStatus;