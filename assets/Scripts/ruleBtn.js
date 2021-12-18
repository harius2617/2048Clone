
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
    },

    offRuleBtn() {
        this.node.active = false;
    },

    start () {

    },
});
