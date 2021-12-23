(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/keyBoard.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b47ecS9tLpFCokg9wO/44LN', 'keyBoard', __filename);
// Scripts/keyBoard.js

'use strict';

var Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,
    onLoad: function onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    onKeyDown: function onKeyDown(event) {
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=keyBoard.js.map
        