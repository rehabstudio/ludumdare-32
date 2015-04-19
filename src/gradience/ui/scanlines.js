'use strict';

var Scanlines = (function() {

    var instance;

    function create(scene) {

        var limg = createImage(scene.game.width, scene.game.height);
        scene.game.cache.addImage('scanlines', null, limg);
        instance = scene.add.sprite(0, 0, 'scanlines');

        instance.alpha = 0.2;
        instance.fixedToCamera = true;

        return instance;
    }

    function update() {
        instance.alpha = (Math.random() * 0.05) + 0.2;
    }

    function createImage(w, h) {

        var c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        var ctx = c.getContext('2d');

        // make image
        ctx.fillStyle = '#444';

        for (var i = 0; i < c.height; i++) {
            if (i % 2) {
                ctx.fillRect(0, i, c.width, 1);
            }
        }

        var cimg = new Image;
        cimg.src = c.toDataURL('image/png');

        return cimg;

    }

    return {
        create: create,
        update: update
    }

})();

module.exports = Scanlines;
