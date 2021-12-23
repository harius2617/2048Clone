const Emitter = require('mEmitter');
const DIRECTION = cc.Enum({
    RIGHT: -1,
    LEFT: -1,
    UP: -1,
    DOWN: -1
});

cc.Class({
    extends: cc.Component,
    onLoad: function () {
        cc.systemEvent.on(cc.Node.EventType.TOUCH_MOVE, this.touchEvent, this);
    },

    touchEvent(direction) {
            switch (direction) {
                case DIRECTION.RIGHT: {
                    this.moveRight();
                    break;
                }
                case DIRECTION.LEFT: {
                    this.moveLeft();
                    break;
                }
                case DIRECTION.UP: {
                    this.moveUp();
                    break;
                }
                case DIRECTION.DOWN: {
                    this.moveDown();
                    break;
                }
            }
    },

    moveRight() {
        Emitter.instance.emit('RIGHT');
    },

    moveLeft() {
        Emitter.instance.emit('LEFT');
    },
    moveUp() {
        Emitter.instance.emit("UP");
    },
    moveDown() {
        Emitter.instance.emit("DOWN");
    }
});