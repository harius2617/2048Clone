"use strict";
cc._RF.push(module, 'a08ceFjZbRLPbjMwpMlnGws', 'Score');
// Scripts/Score.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        score: cc.Label,
        bestScore: cc.Label,
        scoreArr: [],
        _value: 0,
        _valueBest: 0
    },

    onLoad: function onLoad() {
        // this.updateBestScore()
    },
    init: function init() {
        this._value = num;
        this._valueBest = numBest;
        this.score.string = num.toString();
        this.bestScore.string = numBest.toString();
    },
    setValue: function setValue(val) {
        this._value = val;
        this.score.string = this._value.toString();
    },
    getValue: function getValue() {
        return this._value;
    },
    updateValue: function updateValue(val) {
        this._value += val * 2;
        this.score.string = this._value.toString();
        this.scoreArr.push(this.score.string);
        // this.updateBestScore();
        // cc.warn(this.updateBestScore())
    }
}

// updateBestScore(){
//     this._valueBest = Math.max(this.scoreArr);
//     cc.sys.localStorage.setItem('best', this._valueBest);
//     this._valueBest = JSON.parse(cc.sys.localStorage.getItem('best'))
//     this.bestScore.string = this._valueBest;
// cc.warn(this._valueBest)
// },
);

cc._RF.pop();