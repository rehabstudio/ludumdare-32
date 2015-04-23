module.exports = {

    Keymap: require('./keymap'),
    LevelParser: require('./levelparser'),
    Strings: require('./strings'),
    Movements: require('./movementfunctions'),

    shotCost: 8,
    meterSize: 80,
    killScore: 10,

    font: {
        baseStyle: {
            font: "24px Iceland",
            fill: "#caa",
            stroke: "#000",
            strokeThickness: 1,
            align: "center"
        },
        scrollStyle: {
            font: "16px Iceland",
            fill: "#aca",
            stroke: "#000",
            strokeThickness: 1,
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
