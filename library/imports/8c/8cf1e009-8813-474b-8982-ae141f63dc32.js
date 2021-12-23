"use strict";
cc._RF.push(module, '8cf1eAJiBNHS4mCrhQfY9wy', 'touchPad');
// Scripts/touchPad.js

'use strict';

var Emitter = require('mEmitter');
var DIRECTION = cc.Enum({
    RIGHT: -1,
    LEFT: -1,
    UP: -1,
    DOWN: -1
});

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        cc.systemEvent.on(cc.Node.EventType.TOUCH_MOVE, this.touchEvent, this);
    },

    touchEvent: function touchEvent(direction) {
        switch (direction) {
            case DIRECTION.RIGHT:
                {
                    this.moveRight();
                    break;
                }
            case DIRECTION.LEFT:
                {
                    this.moveLeft();
                    break;
                }
            case DIRECTION.UP:
                {
                    this.moveUp();
                    break;
                }
            case DIRECTION.DOWN:
                {
                    this.moveDown();
                    break;
                }
        }
    },
    moveRight: function moveRight() {
        Emitter.instance.emit('RIGHT');
    },
    moveLeft: function moveLeft() {
        Emitter.instance.emit('LEFT');
    },
    moveUp: function moveUp() {
        Emitter.instance.emit("UP");
    },
    moveDown: function moveDown() {
        Emitter.instance.emit("DOWN");
    }
});

cc._RF.pop();