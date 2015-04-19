var config = require('../config/'),
	gameStatus = require('../status/gamestatus');

var Score = function(scene) {

    this.value = gameStatus.score;

    var style = config.font.baseStyle;

    this.text = scene.add.text(10, 10, this.value.toString(), style);
    this.text.fixedToCamera = true;

};

Score.prototype.addAmount = function(amt) {

    this.value += amt;
    this.update();
}

Score.prototype.update = function() {
    this.text.setText(gameStatus.score.toString());

};

module.exports = Score;