var states = {
    boot: require('./states/boot'),
    title: require('./states/title'),
    mainMenu: require('./states/main-menu'),
    level: require('./states/level'),
    gameOver: require('./states/gameover')
};

var Gradience = function(){
    var game = new Phaser.Game(800, 480, Phaser.AUTO);

    game.state.add('boot', states.boot);
    game.state.add('title', states.title);
    game.state.add('main-menu', states.mainMenu);
    game.state.add('level', states.level);
    game.state.add('gameOver', states.gameOver);

    game.state.start('boot');
};

module.exports = Gradience
