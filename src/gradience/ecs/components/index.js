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
        this.sprite = params.game.add.sprite(params.x, params.y, params.asset, 0, params.group);
        if(params.tint) this.sprite.tint = params.tint;
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite._entity = this;
    },
    Physics: function(game) {
        if (!this.has('Sprite')) {
            return;
        }
        game.physics.enable(this.sprite, PHYSICS);

    },
    CollideWorld: function(game) {
        if (!this.has('Sprite')) {
            return;
        }
        this.sprite.body.collideWorldBounds = true;
    },
    Killable: function(game) {
        if (!this.has('Sprite')) {
            return;
        }
        var self = this;
        this.die = function() {
            self.sprite.kill();
            console.log('Entity died');
        }
    },
    Drag: function(drag) {
        if (!this.has('Sprite')) {
            return;
        }
        this.sprite.body.drag.set(drag);
    },
    Velocity: function(params) {
        if (!this.has('Sprite')) {
            return;
        }
        this.sprite.body.velocity.set(params.x, params.y);
        if(params.maxX !== undefined && params.maxY !== undefined) {
            this.sprite.body.maxVelocity.set(params.maxX, params.maxY);
        }
        
    },
    SineMovement: function(params) {
        this._sine = JSON.parse(JSON.stringify(params));
        this._sine.base = this.sprite[this._sine.axis];
        this._sine.start = Date.now();
        this._sine.frequency = 1000 / this._sine.frequency;
        this._sine.phase = this._sine.phase * this._sine.frequency;
    }
};

module.exports = Components;
