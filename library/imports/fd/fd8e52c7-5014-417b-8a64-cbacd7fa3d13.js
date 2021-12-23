"use strict";
cc._RF.push(module, 'fd8e5LHUBRBe4pky6zX+j0T', 'ruleBtn');
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