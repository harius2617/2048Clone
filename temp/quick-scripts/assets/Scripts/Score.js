(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Score.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a08ceFjZbRLPbjMwpMlnGws', 'Score', __filename);
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

    onLoad: function onLoad() {},
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
        //# sourceMappingURL=Score.js.map
        