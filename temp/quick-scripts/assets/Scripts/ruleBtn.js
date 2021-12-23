(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/ruleBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fd8e5LHUBRBe4pky6zX+j0T', 'ruleBtn', __filename);
// Scripts/ruleBtn.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        onBtn: cc.Button,
        ofBtn: cc.Button
    },

    onLoad: function onLoad() {
        this.node.active = false;
    },
    onRuleBtn: function onRuleBtn() {
        this.node.active = true;
        this.node.getComponent(cc.PageView).scrollToPage(0, 0.01);
    },
    offRuleBtn: function offRuleBtn() {
        this.node.active = false;
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
        //# sourceMappingURL=ruleBtn.js.map
        