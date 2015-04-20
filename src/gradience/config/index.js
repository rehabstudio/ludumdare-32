module.exports = {

    Keymap: require('./keymap'),
    LevelParser: require('./levelparser'),
    Strings: require('./strings'),

    shotCost: 8,
    meterSize: 80,
    killScore: 10,

    font: {
        baseStyle: {
            font: "24px Arial",
            fill: "#caa",
            stroke: "#000",
            strokeThickness: 1,
            align: "center"
        }
    },

    gameColors: {
        r: '#e02500',
        g: '#3bff21',
        b: '#314aff',
        rg: '#f6ff01',
        rb: '#c600ff',
        gb: '#59f1ff'
    },

    inactiveColor: '#444',

    gameColorKeys: ['r', 'g', 'b']


};
