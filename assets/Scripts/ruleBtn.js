
cc.Class({
    extends: cc.Component,

    properties: {
        onBtn: cc.Button,
        ofBtn: cc.Button,
    },

    onLoad () {
        this.node.active = false;
    },

    onRuleBtn() {
        this.node.active = true;
        this.node.getComponent(cc.PageView).scrollToPage(0, 0.01)
    },

    offRuleBtn() {      
        this.node.active = false;
    },

    start () {

    },
});
