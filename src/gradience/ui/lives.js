var config = require('../config/'),
	gameStatus = require('../status/gamestatus');

var Lives = function(scene) {

    this.value = gameStatus.lives;

    var style = config.font.baseStyle;

    this.text = scene.add.text(10, 30, 'Lives: '+this.value.toString(), style);
    this.text.fixedToCamera = true;

};

Lives.prototype.update = function() {
    this.text.setText('Lives: '+gameStatus.lives.toString());

};

module.exports = Lives;