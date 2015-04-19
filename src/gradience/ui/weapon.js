/**
 * Weapon UI goes here
 **/

var config = require('../config/'),
    gameStatus = require('../status/gamestatus');

// A string to represent our color indicators.
var indString = '# R G B';

var WeaponUI = function(scene) {

    var style = Object.create(config.font.baseStyle);
    style.fill = config.inactiveColor;
    style.fontSize = '14px';

    var x = 10, y = scene.game.height - 40;

    this.indicators = scene.add.text(x, y, indString, style),
    this.indicators.fixedToCamera = true;

    console.log(this.indicators);

};

/**
 * Check the active status of our colors and
 * add color stops to the indicator string accordingly.
 **/
WeaponUI.prototype.update = function() {

    var isActive = false;
    for(var k in gameStatus.colorStates) {
        if(gameStatus.colorStates[k]) {
            isActive = true;
            break;
        }
    }
    var activeColor = (isActive) ? gameStatus.activeColor : config.inactiveColor;

    this.indicators.addColor(activeColor, 0);

    var self = this;
    var pos = 2, x = 0;
    ['r','g','b'].forEach(function(k) {
        var icol = (gameStatus.colorStates[k]) ? config.gameColors[k] : config.inactiveColor;
        self.indicators.addColor(icol, pos + x);
        x += 2;
    });

};

module.exports = WeaponUI;