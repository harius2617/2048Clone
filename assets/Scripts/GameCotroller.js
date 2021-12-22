const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        soundOnBtn: cc.Button,
        soundOffBtn: cc.Button,
        userNameBox: cc.EditBox,
        tooltipName: cc.Label,
        enterButton: cc.Button,
        // onRuleBtn: cc.Button,
        // offRuleBtn: cc.Button,
        ruleLayout: cc.PageView,
        loseLayout: cc.Node,
        topUser: cc.Prefab,
        content: cc.Node,
        soundOn: true,
        soundOff: false,
        soundBg: cc.AudioSource,
    },

    onLoad () {
        cc.warn(this.node);
        Emitter.instance = new Emitter();
        this.soundOnBtn.node.active = true;
        this.soundOffBtn.node.active = false;
        this.ruleLayout.node.active = false;
        this.loseLayout.scale = 0;
        this.tooltipName.node.active = false;
        this.enterBtn.interacterble = false;
        // this.loseLayout.active = true;
        this.soundBg.play(this.soundBg, true,1);
        Emitter.instance.registerEvent("LOSE", this.loseGame.bind(this));
        cc.warn(this.userNameBox.string)
    },
    soundOnFunc() {
        this.soundOnBtn.node.active = true;
        this.soundOffBtn.active = false;
        this.soundBg.play(this.soundBg, true,1)
    },

    soundOffFunc() {
        this.soundOnBtn.node.active = false;
        this.soundOffBtn.node.active = true;
        this.soundBg.stop(this.soundBg, true,1)
    },

    onRule () {
        this.ruleLayout.node.active = true;
        this.ruleLayout.node.getComponent(cc.PageView).scrollToPage(0, 0.01);
    },

    offRule() {
        this.ruleLayout.node.active = false;
    },

    loseGame(score) {
        cc.warn(score)
        this.loseLayout.active = true;
        cc.tween(this.loseLayout)
            .to(1, {scale: 1})
            .start()
    },

    userNameCheck() {
        const name = this.userNameBox.string;
        if(name.length === 0) {
            this.tooltipName.node.active = true;
            this.tooltipName.string = "Username must have at least 1 letters";
        }else {
            this.tooltipName.node.active = false;
        }
        return true;
    },

    enterBtn() {
        if(this.userNameCheck) {
            this.enterButton.interacterble = true;
            let userInput = cc.instantiate(this.topUser);
            this.content.addChild(userInput)
            cc.warn(userInput.getComponent(cc.Label).string)
        }
    },
});
