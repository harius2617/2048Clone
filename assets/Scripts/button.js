// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        soundOnBtn: true,
        soundOffBtn: false,
        soundBg: cc.AudioSource,
        _sound: null,
    },

    onLoad () {
        this.node.children[0].active = true;
        this.node.children[1].active = false;
        // this._sound = cc.audioEngine;
    },
    soundOn() {
        this.node.children[0].active = true;
        this.node.children[1].active = false;
        this.soundBg.play(this.soundBg, false,1)
    },

    soundOff() {
        this.node.children[0].active = false;
        this.node.children[1].active = true;
        this.soundBg.stop(this.soundBg, true,1)
    },
    start () {

    },

    // update (dt) {},
});
