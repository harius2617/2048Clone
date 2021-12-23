(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/GameContainer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9ff73FtRepAK4fEw68UUb4y', 'GameContainer', __filename);
// Scripts/GameContainer.js

"use strict";

var Emitter = require('mEmitter');

var PAD_X = 10;
var PAD_Y = 10;
var ROWS = 4;
var COLS = 4;
var MIN_LENGTH = 5;

cc.Class({
    extends: cc.Component,

    properties: {
        block2: cc.Prefab,
        cell: cc.Prefab,
        currScore: cc.Label,
        bestScore: cc.Label,
        spriteArr: [cc.SpriteFrame],
        soundOn: cc.Button,
        bgBox: cc.Node,
        _newGameFlag: false,
        _lstBlock: [],
        _lstPosition: [],
        _lstEmptySlot: [],
        _posX: null,
        _posY: null,
        canMove: {
            default: true,
            visible: false
        },
        _isFirstWin: false
    },

    onLoad: function onLoad() {
        Emitter.instance.registerEvent("RIGHT", this.blockMoveRight.bind(this));
        Emitter.instance.registerEvent("LEFT", this.blockMoveLeft.bind(this));
        Emitter.instance.registerEvent("UP", this.blockMoveUp.bind(this));
        Emitter.instance.registerEvent("DOWN", this.blockMoveDown.bind(this));
        Emitter.instance.registerEvent("CONTINUE", this.continueGame.bind(this));
        Emitter.instance.registerEvent("STOPMOVE", this.stopMove.bind(this));
        this._isFirstWin = true;
    },
    start: function start() {
        this.createArray();
        this.createBlockBg();
        this.createNewBlock();
        this.createNewBlock();
        this.getScoreStorge();
        this.touchHandler();
        this.canMove = true;
    },
    createBlockBg: function createBlockBg() {
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {
                var itemBg = cc.instantiate(this.cell);
                this.node.addChild(itemBg);
                var posX = itemBg.width / 2 + itemBg.width * i + PAD_X * (i + 1);
                var posY = -(itemBg.height / 2 + itemBg.height * j + PAD_Y * (j + 1));
                itemBg.setPosition(cc.v2(posX, posY));
                this._lstPosition[j][i] = itemBg.position;
            }
        }
    },
    createArray: function createArray() {
        this._lstBlock = [];
        this._lstPosition = [];
        this._lstEmptySlot = [];
        for (var i = 0; i < 4; i++) {
            this._lstPosition[i] = [];
            this._lstBlock[i] = [];
            for (var j = 0; j < 4; j++) {
                this._lstPosition[i][j] = 0;
                this._lstBlock[i][j] = null;
                this._lstEmptySlot.push({ i: i, j: j });
            }
        }
    },
    randomPosition: function randomPosition() {
        this.updateEmptyList();
        if (this._lstEmptySlot.length <= 0) return;
        var slot = Math.floor(Math.random() * this._lstEmptySlot.length);
        var data = {
            i: this._lstEmptySlot[slot].i,
            j: this._lstEmptySlot[slot].j,
            posX: this._lstPosition[this._lstEmptySlot[slot].i][this._lstEmptySlot[slot].j].x,
            posY: this._lstPosition[this._lstEmptySlot[slot].i][this._lstEmptySlot[slot].j].y
        };
        this._lstEmptySlot.splice(slot, 1);
        return data;
    },
    createNewBlock: function createNewBlock() {
        var newBlock = cc.instantiate(this.block2);
        this.node.addChild(newBlock);
        var data = this.randomPosition();
        newBlock.setPosition(data.posX, data.posY);
        this._lstBlock[data.i][data.j] = newBlock;
        newBlock.getComponent("blockControl").init();
        newBlock.getComponent("blockControl").setCoordinates(data.i, data.j);
        if (newBlock.getComponent("blockControl").getValue() === 4) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[1];
        }
    },
    updateEmptyList: function updateEmptyList() {
        this._lstEmptySlot = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this._lstBlock[i][j] === null) {
                    this._lstEmptySlot.push({ i: i, j: j });
                }
            }
        }
    },
    updateScore: function updateScore(val) {
        if (this._newGameFlag) {
            this.currScore.getComponent("Score").setValue(val);
        } else {
            this.currScore.getComponent("Score").updateValue(val);
        }
    },
    moveFinish: function moveFinish(canCreateBlock, lstBlock) {
        if (canCreateBlock) {
            this.createNewBlock();
            this.checkBestScore();
        }
        for (var i = 0; i < this._lstBlock.length; i++) {
            for (var j = 0; j < this._lstBlock[i].length; j++) {
                this._lstBlock[i][j] && this._lstBlock[i][j].getComponent('blockControl').setCanCombine(true);
            }
        }
        if (this.checkGameWin()) {
            this.canMove = false;
            Emitter.instance.emit("WIN");
        } else {
            this.canMove = true;
        }
        if (this.checkGameLose()) {
            Emitter.instance.emit("LOSE");
        }
    },
    blockMoveRight: function blockMoveRight() {
        var _this = this;

        if (!this.canMove) return;
        this.canMove = false;
        var canCreateNewBlock = false;
        var moveCalculator = function moveCalculator(block, callBack) {
            var currBlock = block.getComponent("blockControl");
            var currI = currBlock.getCoordinates().i;
            var currJ = currBlock.getCoordinates().j;
            if (currJ === 3) {
                callBack && callBack();
                return;
            } else if (_this._lstBlock[currI][currJ + 1] == null) {
                _this._lstBlock[currI][currJ + 1] = block;
                _this._lstBlock[currI][currJ] = null;
                currBlock.setCoordinates(currI, currJ + 1);
                currBlock.move(_this._lstPosition[currI][currJ + 1], function () {
                    moveCalculator(block, callBack);
                });
                canCreateNewBlock = true;
            } else if (_this._lstBlock[currI][currJ + 1] != null) {
                var nextBlock = _this._lstBlock[currI][currJ + 1];
                var _currBlock = _this._lstBlock[currI][currJ];
                if (nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue() && nextBlock.getComponent('blockControl').getCanCombine()) {
                    var newI = nextBlock.getComponent('blockControl').getCoordinates().i;
                    var newJ = nextBlock.getComponent('blockControl').getCoordinates().j;
                    var oldI = _currBlock.getComponent('blockControl').getCoordinates().i;
                    var oldJ = _currBlock.getComponent('blockControl').getCoordinates().j;
                    _this._lstBlock[oldI][oldJ] = null;
                    var callBack2 = function callBack2() {
                        _this.makeCombine(block, nextBlock, newI, newJ, callBack);
                    };
                    block.getComponent('blockControl').move(_this._lstPosition[currI][currJ + 1], callBack2);
                    canCreateNewBlock = true;
                } else {
                    callBack && callBack();
                }
            }
        };
        var countBlock = 0;
        var lstBlock = this.getListBlockByTypeMove("RIGHT");
        for (var i = 0; i < lstBlock.length; i++) {
            var callBack = function callBack() {
                countBlock++;
                if (countBlock == lstBlock.length) {
                    _this.moveFinish(canCreateNewBlock, lstBlock);
                }
            };
            moveCalculator(lstBlock[i], callBack);
        }
    },
    blockMoveLeft: function blockMoveLeft() {
        var _this2 = this;

        if (!this.canMove) return;
        this.canMove = false;
        var canCreateNewBlock = false;
        var moveCalculator = function moveCalculator(block, callBack) {
            var currBlock = block.getComponent("blockControl");
            var currI = currBlock.getCoordinates().i;
            var currJ = currBlock.getCoordinates().j;
            if (currJ === 0) {
                callBack && callBack();
                return;
            } else if (_this2._lstBlock[currI][currJ - 1] === null) {
                _this2._lstBlock[currI][currJ - 1] = block;
                _this2._lstBlock[currI][currJ] = null;
                currBlock.setCoordinates(currI, currJ - 1);
                currBlock.move(_this2._lstPosition[currI][currJ - 1], function () {
                    moveCalculator(block, callBack);
                });
                canCreateNewBlock = true;
            } else if (_this2._lstBlock[currI][currJ - 1] != null) {
                var nextBlock = _this2._lstBlock[currI][currJ - 1];
                var _currBlock2 = _this2._lstBlock[currI][currJ];
                if (nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue() && nextBlock.getComponent('blockControl').getCanCombine()) {
                    var newI = nextBlock.getComponent('blockControl').getCoordinates().i;
                    var newJ = nextBlock.getComponent('blockControl').getCoordinates().j;
                    var oldI = _currBlock2.getComponent('blockControl').getCoordinates().i;
                    var oldJ = _currBlock2.getComponent('blockControl').getCoordinates().j;
                    _this2._lstBlock[oldI][oldJ] = null;
                    var callBack2 = function callBack2() {
                        _this2.makeCombine(block, nextBlock, newI, newJ, callBack);
                    };
                    block.getComponent('blockControl').move(_this2._lstPosition[currI][currJ - 1], callBack2);
                    canCreateNewBlock = true;
                } else {
                    callBack && callBack();
                }
            }
        };
        var countBlock = 0;
        var lstBlock = this.getListBlockByTypeMove("LEFT");
        for (var i = 0; i < lstBlock.length; i++) {
            var callBack = function callBack() {
                countBlock++;
                if (countBlock == lstBlock.length) {
                    _this2.moveFinish(canCreateNewBlock, lstBlock);
                }
            };
            moveCalculator(lstBlock[i], callBack);
        }
    },
    blockMoveUp: function blockMoveUp() {
        var _this3 = this;

        if (!this.canMove) return;
        this.canMove = false;
        var canCreateNewBlock = false;
        var moveCalculator = function moveCalculator(block, callBack) {
            var currBlock = block.getComponent("blockControl");
            var currI = currBlock.getCoordinates().i;
            var currJ = currBlock.getCoordinates().j;
            if (currI === 0) {
                callBack && callBack();
                return;
            } else if (_this3._lstBlock[currI - 1][currJ] == null) {
                _this3._lstBlock[currI - 1][currJ] = block;
                _this3._lstBlock[currI][currJ] = null;
                currBlock.setCoordinates(currI - 1, currJ);
                currBlock.move(_this3._lstPosition[currI - 1][currJ], function () {
                    moveCalculator(block, callBack);
                });
                canCreateNewBlock = true;
            } else if (_this3._lstBlock[currI - 1][currJ] != null) {
                var nextBlock = _this3._lstBlock[currI - 1][currJ];
                var _currBlock3 = _this3._lstBlock[currI][currJ];
                if (nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue() && nextBlock.getComponent('blockControl').getCanCombine()) {
                    var newI = nextBlock.getComponent('blockControl').getCoordinates().i;
                    var newJ = nextBlock.getComponent('blockControl').getCoordinates().j;
                    var oldI = _currBlock3.getComponent('blockControl').getCoordinates().i;
                    var oldJ = _currBlock3.getComponent('blockControl').getCoordinates().j;
                    _this3._lstBlock[oldI][oldJ] = null;
                    var callBack2 = function callBack2() {
                        _this3.makeCombine(block, nextBlock, newI, newJ, callBack);
                    };
                    block.getComponent('blockControl').move(_this3._lstPosition[currI - 1][currJ], callBack2);
                    canCreateNewBlock = true;
                } else {
                    callBack && callBack();
                }
            }
        };
        var countBlock = 0;
        var lstBlock = this.getListBlockByTypeMove("UP");
        for (var i = 0; i < lstBlock.length; i++) {
            var callBack = function callBack() {
                countBlock++;
                if (countBlock == lstBlock.length) {
                    _this3.moveFinish(canCreateNewBlock, lstBlock);
                }
            };
            moveCalculator(lstBlock[i], callBack);
        }
    },
    blockMoveDown: function blockMoveDown() {
        var _this4 = this;

        if (!this.canMove) return;
        this.canMove = false;
        var canCreateNewBlock = false;
        var moveCalculator = function moveCalculator(block, callBack) {
            var currBlock = block.getComponent("blockControl");
            var currI = currBlock.getCoordinates().i;
            var currJ = currBlock.getCoordinates().j;
            if (currI === 3) {
                callBack && callBack();
                return;
            } else if (_this4._lstBlock[currI + 1][currJ] == null) {
                _this4._lstBlock[currI + 1][currJ] = block;
                _this4._lstBlock[currI][currJ] = null;
                currBlock.setCoordinates(currI + 1, currJ);
                currBlock.move(_this4._lstPosition[currI + 1][currJ], function () {
                    moveCalculator(block, callBack);
                });
                canCreateNewBlock = true;
            } else if (_this4._lstBlock[currI + 1][currJ] != null) {
                var nextBlock = _this4._lstBlock[currI + 1][currJ];
                var _currBlock4 = _this4._lstBlock[currI][currJ];
                if (nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue() && nextBlock.getComponent('blockControl').getCanCombine()) {
                    var newI = nextBlock.getComponent('blockControl').getCoordinates().i;
                    var newJ = nextBlock.getComponent('blockControl').getCoordinates().j;
                    var oldI = _currBlock4.getComponent('blockControl').getCoordinates().i;
                    var oldJ = _currBlock4.getComponent('blockControl').getCoordinates().j;
                    _this4._lstBlock[oldI][oldJ] = null;
                    var callBack2 = function callBack2() {
                        _this4.makeCombine(block, nextBlock, newI, newJ, callBack);
                    };
                    block.getComponent('blockControl').move(_this4._lstPosition[currI + 1][currJ], callBack2);
                    canCreateNewBlock = true;
                } else {
                    callBack && callBack();
                }
            }
        };
        var countBlock = 0;
        var lstBlock = this.getListBlockByTypeMove("DOWN");
        for (var i = 0; i < lstBlock.length; i++) {
            var callBack = function callBack() {
                countBlock++;
                if (countBlock == lstBlock.length) {
                    _this4.moveFinish(canCreateNewBlock, lstBlock);
                }
            };
            moveCalculator(lstBlock[i], callBack);
        }
    },
    makeCombine: function makeCombine(block1, block2, i, j, callBack) {
        var newBlock = cc.instantiate(this.block2);
        this.node.addChild(newBlock);
        newBlock.setPosition(this._lstPosition[i][j]);
        this._lstBlock[i][j] = newBlock;
        var val = block2.getComponent('blockControl').getValue();
        newBlock.getComponent("blockControl").setValue(val * 2);
        newBlock.getComponent("blockControl").setCanCombine(false);
        newBlock.getComponent("blockControl").setCoordinates(i, j);
        if (val == 2) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[1];
        } else if (val == 4) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[2];
        } else if (val == 8) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[3];
        } else if (val == 16) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[4];
        } else if (val == 32) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[5];
        } else if (val == 64) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[6];
        } else if (val == 128) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[7];
        } else if (val >= 256) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[8];
        }
        callBack && callBack();
        this.updateScore(val);
        block1.destroy();
        block2.destroy();
        if (this.soundOn.node.active === true) {
            Emitter.instance.emit("SOUND");
        }
    },
    getListBlockByTypeMove: function getListBlockByTypeMove(type) {
        var lstBlock = [];
        switch (type) {
            case "RIGHT":
                for (var j = COLS - 1; j >= 0; j--) {
                    for (var i = 0; i < ROWS; i++) {
                        if (this._lstBlock[i][j] != null) {
                            lstBlock.push(this._lstBlock[i][j]);
                        }
                    }
                }
                return lstBlock;
            case "LEFT":
                for (var _j = 0; _j < COLS; _j++) {
                    for (var _i = 0; _i < ROWS; _i++) {
                        if (this._lstBlock[_i][_j] != null) {
                            lstBlock.push(this._lstBlock[_i][_j]);
                        }
                    }
                }
                return lstBlock;
            case "UP":
                for (var _i2 = 0; _i2 < ROWS; _i2++) {
                    for (var _j2 = 0; _j2 < COLS; _j2++) {
                        if (this._lstBlock[_i2][_j2] != null) {
                            lstBlock.push(this._lstBlock[_i2][_j2]);
                        }
                    }
                }
                return lstBlock;
            case "DOWN":
                for (var _i3 = ROWS - 1; _i3 >= 0; _i3--) {
                    for (var _j3 = 0; _j3 < COLS; _j3++) {
                        if (this._lstBlock[_i3][_j3] != null) {
                            lstBlock.push(this._lstBlock[_i3][_j3]);
                        }
                    }
                }
                return lstBlock;
            default:
                break;
        }
    },
    checkGameWin: function checkGameWin() {
        for (var i = 0; i < this._lstBlock.length; i++) {
            for (var j = 0; j < this._lstBlock[i].length; j++) {
                if (this._lstBlock[i][j] && this._lstBlock[i][j].getComponent('blockControl').getValue() === 16 && this._isFirstWin) {
                    this._isFirstWin = false;
                    return true;
                }
            }
        }
        return false;
    },
    showGameWin: function showGameWin() {
        this.soundWin.play(this.soundWin, false, 1);
        this.winNoti.active = true;
        cc.tween(this.winNoti).to(1, { scale: 1 }).start();
    },
    continueGame: function continueGame() {
        this.canMove = true;
    },
    stopMove: function stopMove() {
        this.canMove = false;
    },
    checkGameLose: function checkGameLose() {
        this.updateEmptyList();
        if (this._lstEmptySlot.length === 0) {
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    var num = this._lstBlock[i][j].getComponent("blockControl").getValue();

                    var numRight = this._lstBlock[i + 1] ? this._lstBlock[i + 1][j].getComponent("blockControl").getValue() : null;
                    var numLeft = this._lstBlock[i - 1] ? this._lstBlock[i - 1][j].getComponent("blockControl").getValue() : null;
                    var numUp = this._lstBlock[i][j - 1] ? this._lstBlock[i][j - 1].getComponent("blockControl").getValue() : null;
                    var numDown = this._lstBlock[i][j + 1] ? this._lstBlock[i][j + 1].getComponent("blockControl").getValue() : null;

                    if (i < 3 && num === numRight) return false;
                    if (i > 0 && num === numLeft) return false;
                    if (j < 3 && num === numDown) return false;
                    if (j > 0 && num === numUp) return false;
                }
            }
            return true;
        } else {
            return false;
        }
    },
    getScoreStorge: function getScoreStorge() {
        var scoreStorge = cc.sys.localStorage.getItem('bestScore');
        if (scoreStorge !== null) {
            this.bestScore.string = JSON.parse(scoreStorge);
        } else {
            this.bestScore.string = "0";
        }
    },
    checkBestScore: function checkBestScore() {
        var newScore = Number(this.currScore.getComponent("Score").getValue());
        if (newScore > Number(this.bestScore.string)) {
            cc.sys.localStorage.setItem('bestScore', JSON.stringify(newScore));
            this.bestScore.string = newScore;
            Emitter.instance.emit("HIGHSCORE");
        }
    },
    newGame: function newGame() {
        this._newGameFlag = true;
        var a = this.node.children.length;
        for (var i = 0; i <= a; i++) {
            this.node.removeChild(this.node.children[0]);
        }
        this.createArray();
        this.createBlockBg();
        this.createNewBlock();
        this.createNewBlock();
        this.updateScore(0);
        this._newGameFlag = false;
        this.canMove = true;
        this._isFirstWin = true;
    },
    quitGame: function quitGame() {
        cc.game.end();
    },
    touchHandler: function touchHandler() {
        var _this5 = this;

        if (cc.sys.isMobile || cc.sys.IOS || cc.sys.ANDROID) {
            this.bgBox.on("touchstart", function (event) {
                _this5._startPoint = event.getLocation();
            });
            this.bgBox.on("touchend", function (event) {
                _this5._endPoint = event.getLocation();
                _this5.reflectTouch();
            });
            this.bgBox.on("touchcancel", function (event) {
                _this5._endPoint = event.getLocation();
                _this5.reflectTouch();
            });
        }
    },
    reflectTouch: function reflectTouch() {
        var startVec = this._startPoint;
        var endVec = this._endPoint;
        var pointsVec = endVec.sub(startVec);
        var vecLength = pointsVec.mag();
        if (vecLength > MIN_LENGTH) {
            if (Math.abs(pointsVec.x) > Math.abs(pointsVec.y)) {
                if (pointsVec.x > 0) this.blockMoveRight();else this.blockMoveLeft();
            } else {
                if (pointsVec.y > 0) this.blockMoveUp();else this.blockMoveDown();
            }
        }
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
        //# sourceMappingURL=GameContainer.js.map
        