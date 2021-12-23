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
        this.newHigh.scale = 0;
        this.soundBg.play(this.soundBg, true, 1);
        Emitter.instance.registerEvent("LOSE", this.loseGame.bind(this));
        Emitter.instance.registerEvent("WIN", this.winGame.bind(this));
        cc.warn(this.winLayout.scale);
        // Emitter.instance.registerEvent("HIGHSCORE", this.notiNewHighScore.bind(this));
    },
    soundOnFunc: function soundOnFunc() {
        this.soundOnBtn.node.active = true;
        this.soundOffBtn.active = false;
        this.soundBg.play(this.soundBg, true, 1);
    },
    soundOffFunc: function soundOffFunc() {
        this.soundOnBtn.node.active = false;
        this.soundOffBtn.node.active = true;
        this.soundBg.stop(this.soundBg, true, 1);
    },
    onRule: function onRule() {
        this.ruleLayout.node.active = true;
        this.ruleLayout.node.getComponent(cc.PageView).scrollToPage(0, 0.01);
    },
    offRule: function offRule() {
        this.ruleLayout.node.active = false;
    },
    loseGame: function loseGame(score) {
        this.loseLayout.active = true;
        cc.tween(this.loseLayout).to(1, { scale: 1 }).start();
    },
    winGame: function winGame() {
        // cc.log(this.winLayout)
        this.soundWin.play(this.soundWin, false, 1);
        this.winLayout.active = true;
        cc.tween(this.winLayout).to(1, { scale: 1 }).start();
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
        this.leaderboard.active = true;
    },
    offLeaderboard: function offLeaderboard() {
        this.leaderboard.active = false;
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
        