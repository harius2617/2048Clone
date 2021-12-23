(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/GameCotroller.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '316e3LeXuVK7K4optp5GFTl', 'GameCotroller', __filename);
// Scripts/GameCotroller.js

"use strict";

var Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        soundOnBtn: cc.Button,
        soundOffBtn: cc.Button,
        userNameBox: cc.EditBox,
        tooltipName: cc.Label,
        enterButton: cc.Button,
        ruleLayout: cc.PageView,
        loseLayout: cc.Node,
        newHigh: cc.Node,
        leaderboard: cc.Node,
        winLayout: cc.Node,
        topUser: cc.Prefab,
        content: cc.Node,
        soundOn: true,
        soundOff: false,
        soundBg: cc.AudioSource,
        soundWin: cc.AudioSource
    },

    onLoad: function onLoad() {
        Emitter.instance = new Emitter();
        this.soundOnBtn.node.active = true;
        this.soundOffBtn.node.active = false;
        this.ruleLayout.node.active = false;
        this.tooltipName.node.active = false;
        this.enterBtn.interacterble = false;
        this.winLayout.scale = 0;
        this.winLayout.active = false;
        this.loseLayout.scale = 0;
        this.loseLayout.active = false;
        this.newHigh.active = false;
        this.newHigh.scale = 1;
        this.soundBg.play(this.soundBg, true, 1);
        Emitter.instance.registerEvent("LOSE", this.loseGame.bind(this));
        Emitter.instance.registerEvent("WIN", this.winGame.bind(this));
        Emitter.instance.registerEvent("HIGHSCORE", this.notiNewHighScore.bind(this));
        Emitter.instance.registerEvent("SOUND", this.soundOnFunc.bind(this));
    },
    soundOnFunc: function soundOnFunc() {
        this.soundOnBtn.node.active = true;
        this.soundOffBtn.active = false;
        this.soundBg.play(this.soundBg, false, 1);
    },
    soundOffFunc: function soundOffFunc() {
        this.soundOnBtn.node.active = false;
        this.soundOffBtn.node.active = true;
        this.soundBg.stop(this.soundBg, true, 1);
    },
    onRule: function onRule() {
        this.ruleLayout.node.active = true;
        this.leaderboard.active = false;
        this.ruleLayout.node.getComponent(cc.PageView).scrollToPage(0, 0.01);
        Emitter.instance.emit("STOPMOVE");
    },
    offRule: function offRule() {
        this.ruleLayout.node.active = false;
        Emitter.instance.emit("CONTINUE");
    },
    loseGame: function loseGame(score) {
        this.loseLayout.active = true;
        cc.tween(this.loseLayout).to(1, { scale: 1 }).start();
    },
    winGame: function winGame() {
        var _this = this;

        if (this.soundOnBtn.node.active === true) {
            this.soundWin.play(this.soundWin, false, 1);
        }
        cc.tween(this.winLayout).call(function () {
            _this.winLayout.active = true;
        }).to(1, { scale: 1 }).start();
    },
    continueGame: function continueGame() {
        this.winLayout.active = false;
        Emitter.instance.emit("CONTINUE");
    },
    notiNewHighScore: function notiNewHighScore() {
        this.newHigh.active = true;
        cc.tween(this.newHigh).to(0, 1, { scale: 1 }).to(1, { opacity: 50 }).to(1, { opacity: 255 }).to(1, { scale: 0 }).start();
    },
    userNameCheck: function userNameCheck() {
        var name = this.userNameBox.string;
        if (name.length === 0) {
            this.tooltipName.node.active = true;
            this.tooltipName.string = "Username must have at least 1 letters";
        } else {
            this.tooltipName.node.active = false;
        }
        return true;
    },
    enterBtn: function enterBtn() {
        if (this.userNameCheck) {
            this.enterButton.interacterble = true;
            var userInput = cc.instantiate(this.topUser);
            this.content.addChild(userInput);
            userInput.getComponent(cc.Label).string = this.userNameBox.getComponent(cc.EditBox).string + " :((";
        }
        this.loseLayout.active = false;
    },
    onLeaderboard: function onLeaderboard() {
        this.ruleLayout.node.active = false;
        this.leaderboard.active = true;
        Emitter.instance.emit("STOPMOVE");
    },
    offLeaderboard: function offLeaderboard() {
        this.leaderboard.active = false;
        Emitter.instance.emit("CONTINUE");
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
        //# sourceMappingURL=GameCotroller.js.map
        