'use strict';

module.exports = {
    sine: function(t, amplitude) {
        return [t, Math.sin(t) * amplitude];
    },
    loop: function(t, coeff) {
        return [(t / coeff) + Math.cos(t),  Math.sin(t)];
    },
    zig: function(t, coeff) {
        return [(t / coeff) + Math.sin(t), Math.sin(t)];
    }
};
