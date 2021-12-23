"use strict";
cc._RF.push(module, 'fb76cKRzV1DG6k2i0q6YcJ5', 'blockControl');
// Scripts/blockControl.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        numLabel: cc.Label,
        _value: 0,
        _coordinateX: 0,
        _coordinateY: 0,
        _canMove: true,
        _isCombine: true
    },
    init: function init() {
        var num = Math.random() <= 0.9 ? 2 : 4;
        this._value = num;
        this.numLabel.string = num.toString();
        this._isCombine = true;
    },
    setCanCombine: function setCanCombine(val) {
        this._isCombine = val;
        return this._isCombine;
    },
    getCanCombine: function getCanCombine() {
        return this._isCombine;
    },
    setCoordinates: function setCoordinates(i, j) {
        this._coordinateX = i;
        this._coordinateY = j;
    },
    getCoordinates: function getCoordinates() {
        return { i: this._coordinateX, j: this._coordinateY };
    },
    setValue: function setValue(val) {
        this._value = val;
        this.numLabel.string = val.toString();
    },
    getValue: function getValue() {
        return this._value;
    },
    move: function move(pos, callBack) {
        this.node.stopAllActions();
        var move = cc.moveTo(0.1, pos);
        var end = cc.callFunc(function () {
            callBack && callBack();
        });
        this.node.runAction(cc.sequence(move, end));
    }
});

cc._RF.pop();