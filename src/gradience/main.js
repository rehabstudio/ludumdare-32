var States = {
    Boot: require('./states/boot'),
    Title: require('./states/title'),
    MainMenu: require('./states/main-menu'),
    Sandbox: require('./states/sandbox'),
    GameOver: require('./states/game-over')
};

var Gradience = function(){
    var game = new Phaser.Game(800, 480, Phaser.AUTO);

    game.state.add('boot', States.Boot);
    game.state.add('title', States.Title);
    game.state.add('main-menu', States.MainMenu);
    game.state.add('sandbox', States.Sandbox);
    game.state.add('game-over', States.GameOver);

    game.state.start('boot');
};

module.exports = Gradience
