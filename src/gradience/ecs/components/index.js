'use strict';
/**
 * Components that we can apply to Entities.
 * Do nothing by themselves - Systems use them to
 * provide behaviour and functionality.
 * TODO: come up with something nicer than no-ops
 * for components without params
 **/
var Components = {

    ControlsArrows: function(moveSpeed) {
        this.moveSpeed = moveSpeed || 3;
    },
    Sprite: function(params) {
        this.sprite = params.game.add.sprite(params.x, params.y, params.asset);
    },
    StageBounce: function(damping) {
        this.damping = damping || 0;
    },
    StageConstrain: null,
    StageWrap: null,
    Velocity: function(vels) {
        if (vels === undefined) {
            vels = { vx: 0, vy: 0, vmax: 10 };
        }
        this.vx = vels.vx;
        this.vy = vels.vy;
        this.vmax = vels.max;
    }
};

module.exports = Components;
