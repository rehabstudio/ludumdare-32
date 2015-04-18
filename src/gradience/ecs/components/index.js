'use strict';
/**
 * Components that we can apply to Entities.
 * Do nothing by themselves - Systems use them to
 * provide behaviour and functionality.
 * TODO: come up with something nicer than no-ops
 * for components without params
 **/

var PHYSICS = Phaser.Physics.ARCADE;

var Components = {

    ControlsArrows: function(moveSpeed) {
        this.moveSpeed = moveSpeed || 3;
    },
    Sprite: function(params) {
        this.sprite = params.game.add.sprite(params.x, params.y, params.asset);
    },
    Physics: function(game) {
        if (!this.has('Sprite')) {
            return;
        }
        game.physics.enable(this.sprite, PHYSICS);
    },
    Drag: function(drag) {
        if (!this.has('Sprite')) {
            return;
        }
        this.sprite.body.drag.set(drag);
    },
    Velocity: function(maxVelocity){
        if (!this.has('Sprite')) {
            return;
        }
        this.sprite.body.maxVelocity.set(maxVelocity.x, maxVelocity.y);
    }
};

module.exports = Components;
