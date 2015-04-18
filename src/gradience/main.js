var states = {
    boot: require('./states/boot'),
    title: require('./states/title'),
    mainMenu: require('./states/main-menu'),
    level: require('./states/level')
};

var Gradience = function(){
    var game = new Phaser.Game(800, 600, Phaser.AUTO);

    game.state.add('boot', states.boot);
    game.state.add('title', states.title);
    game.state.add('main-menu', states.mainMenu);
    game.state.add('level', states.level);

    game.state.start('boot');
};

module.exports = Gradience
