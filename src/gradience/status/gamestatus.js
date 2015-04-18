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

// Currnt active mixed color
gameStatus.activeColor = '#ffffff';

// Function to toggle color status.
gameStatus.toggleColor = function(colorKey) {
  console.log(colorKey);
  this.colorStates[colorKey] = !this.colorStates[colorKey];
  this.updateActiveColor();
}

// Updates the active color to match the toggled flags
gameStatus.updateActiveColor = function() {
  var r = (this.colorStates.r) ? 255 : 0,
      g = (this.colorStates.g) ? 255 : 0,
      b = (this.colorStates.b) ? 255 : 0;
  this.activeColor = 'rgba(' + r + ',' + g + ',' + b + ',1)';
}

gameStatus.updateActiveColor();

module.exports = gameStatus;