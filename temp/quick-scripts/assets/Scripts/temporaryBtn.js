(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/temporaryBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bfab7HsWnlAypY212bYyez8', 'temporaryBtn', __filename);
// Scripts/temporaryBtn.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // scoreWin: cc.Label,
    },

    checkGameWin: function checkGameWin() {
        this.node.active = false;
    },
    start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=temporaryBtn.js.map
        