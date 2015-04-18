'use strict';

/**
 * Module to create an Entity
 **/
var EntityFactory = (function() {

    var entityCount = 0,
        entities = [],
        ComponentCollection = {};

    var Entity = function() {
        this.uid = Date.now() + Math.floor(
            Math.random() * 100000
        ) + '_' + entityCount;
        this._components = [];
    };

    Entity.prototype = {
        addComponent: function(componentId, params) {
            this._components[componentId] = params;

            if (typeof ComponentCollection[componentId] === 'function') {
                ComponentCollection[componentId].call(this, params);
            }
        },
        removeComponent: function(componentId) {
            if (this._components.hasOwnProperty(componentId)) {
                this._components[componentId] = undefined;
                delete this._components[componentId];
            }
        },
        has: function(componentId) {
            return this._components.hasOwnProperty(componentId);
        }
    };

    function createEntity(componentList) {
        var entity = new Entity(componentList);
        entities.push(entity);
        entityCount = entities.length;

        return entity;
    }

    function getEntities() {
        return entities;
    }

    function initComponents(components) {
        ComponentCollection = components;
    }

    return {
        create: createEntity,
        getAll: getEntities,
        initComponents: initComponents
    };

})();

module.exports = EntityFactory;
