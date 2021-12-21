const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,
    onLoad: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },


    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.down:
                this.moveDown();
                break;
            case cc.macro.KEY.right:
                this.moveRight();
                break;
            case cc.macro.KEY.left:
                this.moveLeft();
                break;
            case cc.macro.KEY.up:
                this.moveUp();
                break;
        }
    },
    moveRight() {
        cc.warn(1)
        Emitter.instance.emit('RIGHT');
    },

    moveLeft() {
        Emitter.instance.emit('LEFT');
    },
    moveUp() {
        Emitter.instance.emit("UP");
    },
    moveDown() {
        Emitter.instance.emit("DOWN")
    }
});