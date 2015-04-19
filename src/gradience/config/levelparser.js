'use strict';

var yaml = require('js-yaml');

var Parser = function(scene, path) {
    this.scene = scene;
    this.path = path;
};

Parser.prototype.load = function(data) {

    this.scene.game.cache.removeText('leveldata');
    var loader = this.scene.game.load.text('leveldata', this.path, true);

    loader.onFileComplete.add(function(progress, key) {
        if (key == "leveldata") {
            this.level = yaml.load(
                this.scene.game.cache.getText('leveldata')
            ).level;
            for (var assetType in this.level.assets) {
                for (var idx in this.level.assets[assetType]) {
                    var pair = this.level.assets[assetType][idx];
                    console.log(assetType, pair);
                    this.scene.game.load[assetType](pair[0], pair[1]);
                }
            }
        }
    }, this);
};

module.exports = Parser;
