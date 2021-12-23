const Emitter = require('mEmitter');

const PAD_X = 10;
const PAD_Y = 10;
const ROWS = 4;
const COLS = 4;
const MIN_LENGTH = 5;

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

    onLoad() {
        Emitter.instance.registerEvent("RIGHT", this.blockMoveRight.bind(this));
        Emitter.instance.registerEvent("LEFT", this.blockMoveLeft.bind(this));
        Emitter.instance.registerEvent("UP", this.blockMoveUp.bind(this));
        Emitter.instance.registerEvent("DOWN", this.blockMoveDown.bind(this));
        Emitter.instance.registerEvent("CONTINUE", this.continueGame.bind(this));
        Emitter.instance.registerEvent("STOPMOVE", this.stopMove.bind(this));
        this._isFirstWin = true;
    },

    start() {
        this.createArray();
        this.createBlockBg();
        this.createNewBlock();
        this.createNewBlock();
        this.getScoreStorge();
        this.touchHandler();
        this.canMove = true;
    },

    createBlockBg() {
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                let itemBg = cc.instantiate(this.cell);
                this.node.addChild(itemBg);
                const posX = (itemBg.width / 2) + (itemBg.width * i) + PAD_X * (i + 1);
                const posY = -((itemBg.height / 2) + (itemBg.height * j) + PAD_Y * (j + 1));
                itemBg.setPosition(cc.v2(posX, posY));
                this._lstPosition[j][i] = itemBg.position;
            }
        }
    },

    createArray() {
        this._lstBlock = [];
        this._lstPosition = [];
        this._lstEmptySlot = [];
        for (let i = 0; i < 4; i++) {
            this._lstPosition[i] = [];
            this._lstBlock[i] = [];
            for (let j = 0; j < 4; j++) {
                this._lstPosition[i][j] = 0;
                this._lstBlock[i][j] = null;
                this._lstEmptySlot.push({ i, j });
            }
        }
    },

    randomPosition() {
        this.updateEmptyList()
        if (this._lstEmptySlot.length <= 0) return;
        const slot = Math.floor(Math.random() * this._lstEmptySlot.length);
        const data = {
            i: this._lstEmptySlot[slot].i,
            j: this._lstEmptySlot[slot].j,
            posX: this._lstPosition[this._lstEmptySlot[slot].i][this._lstEmptySlot[slot].j].x,
            posY: this._lstPosition[this._lstEmptySlot[slot].i][this._lstEmptySlot[slot].j].y
        }
        this._lstEmptySlot.splice(slot, 1);
        return data;
    },

    createNewBlock() {
        const newBlock = cc.instantiate(this.block2);
        this.node.addChild(newBlock);
        const data = this.randomPosition();
        newBlock.setPosition(data.posX, data.posY);
        this._lstBlock[data.i][data.j] = newBlock;
        newBlock.getComponent("blockControl").init();
        newBlock.getComponent("blockControl").setCoordinates(data.i, data.j);
        if (newBlock.getComponent("blockControl").getValue() === 4) {
            newBlock.getComponent(cc.Sprite).spriteFrame = this.spriteArr[1]
        }
    },

    updateEmptyList() {
        this._lstEmptySlot = []
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this._lstBlock[i][j] === null) {
                    this._lstEmptySlot.push({ i, j });
                }
            }
        }
    },

    updateScore(val) {
        if (this._newGameFlag) {
            this.currScore.getComponent("Score").setValue(val);
        } else {
            this.currScore.getComponent("Score").updateValue(val);
        }
    },

    moveFinish(canCreateBlock, lstBlock) {
        if (canCreateBlock) {
            this.createNewBlock();
            this.checkBestScore();
        }
        for (let i = 0; i < this._lstBlock.length; i++) {
            for (let j = 0; j < this._lstBlock[i].length; j++) {
                this._lstBlock[i][j] && this._lstBlock[i][j].getComponent('blockControl').setCanCombine(true)
            }
        }
        if (this.checkGameWin()) {
            this.canMove = false;
            Emitter.instance.emit("WIN")
        } else {
            this.canMove = true;
        }
        if (this.checkGameLose()) {
            Emitter.instance.emit("LOSE")
        }
    },

    blockMoveRight() {
        if (!this.canMove) return;
        this.canMove = false;
        let canCreateNewBlock = false;
        const moveCalculator = (block, callBack) => {
            const currBlock = block.getComponent("blockControl");
            const currI = currBlock.getCoordinates().i;
            const currJ = currBlock.getCoordinates().j;
            if (currJ === 3) {
                callBack && callBack()
                return;
            } else if (this._lstBlock[currI][currJ + 1] == null) {
                this._lstBlock[currI][currJ + 1] = block;
                this._lstBlock[currI][currJ] = null
                currBlock.setCoordinates(currI, currJ + 1);
                currBlock.move(this._lstPosition[currI][currJ + 1], () => {
                    moveCalculator(block, callBack)
                });
                canCreateNewBlock = true
            } else if (this._lstBlock[currI][currJ + 1] != null) {
                const nextBlock = this._lstBlock[currI][currJ + 1];
                const currBlock = this._lstBlock[currI][currJ];
                if (nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue() && nextBlock.getComponent('blockControl').getCanCombine()) {
                    const newI = nextBlock.getComponent('blockControl').getCoordinates().i;
                    const newJ = nextBlock.getComponent('blockControl').getCoordinates().j;
                    const oldI = currBlock.getComponent('blockControl').getCoordinates().i;
                    const oldJ = currBlock.getComponent('blockControl').getCoordinates().j;
                    this._lstBlock[oldI][oldJ] = null;
                    const callBack2 = () => {
                        this.makeCombine(block, nextBlock, newI, newJ, callBack);
                    }
                    block.getComponent('blockControl').move(this._lstPosition[currI][currJ + 1], callBack2)
                    canCreateNewBlock = true;
                } else {
                    callBack && callBack();
                }
            }
        }
        let countBlock = 0;
        const lstBlock = this.getListBlockByTypeMove("RIGHT");
        for (let i = 0; i < lstBlock.length; i++) {
            let callBack = () => {
                countBlock++
                if (countBlock == lstBlock.length) {
                    this.moveFinish(canCreateNewBlock, lstBlock)
                }
            }
            moveCalculator(lstBlock[i], callBack)
        }
    },

    blockMoveLeft() {
        if (!this.canMove) return;
        this.canMove = false;
        let canCreateNewBlock = false;
        const moveCalculator = (block, callBack) => {
            const currBlock = block.getComponent("blockControl");
            const currI = currBlock.getCoordinates().i;
            const currJ = currBlock.getCoordinates().j;
            if (currJ === 0) {
                callBack && callBack()
                return;
            } else if (this._lstBlock[currI][currJ - 1] === null) {
                this._lstBlock[currI][currJ - 1] = block;
                this._lstBlock[currI][currJ] = null;
                currBlock.setCoordinates(currI, currJ - 1);
                currBlock.move(this._lstPosition[currI][currJ - 1], () => {
                    moveCalculator(block, callBack);
                });
                canCreateNewBlock = true;
            } else if (this._lstBlock[currI][currJ - 1] != null) {
                const nextBlock = this._lstBlock[currI][currJ - 1];
                const currBlock = this._lstBlock[currI][currJ];
                if (nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue() && nextBlock.getComponent('blockControl').getCanCombine()) {
                    const newI = nextBlock.getComponent('blockControl').getCoordinates().i;
                    const newJ = nextBlock.getComponent('blockControl').getCoordinates().j;
                    const oldI = currBlock.getComponent('blockControl').getCoordinates().i;
                    const oldJ = currBlock.getComponent('blockControl').getCoordinates().j;
                    this._lstBlock[oldI][oldJ] = null;
                    const callBack2 = () => {
                        this.makeCombine(block, nextBlock, newI, newJ, callBack)
                    }
                    block.getComponent('blockControl').move(this._lstPosition[currI][currJ - 1], callBack2)
                    canCreateNewBlock = true;
                } else {
                    callBack && callBack();
                }
            }
        }
        let countBlock = 0;
        const lstBlock = this.getListBlockByTypeMove("LEFT");
        for (let i = 0; i < lstBlock.length; i++) {
            const callBack = () => {
                countBlock++
                if (countBlock == lstBlock.length) {
                    this.moveFinish(canCreateNewBlock, lstBlock)
                }
            };
            moveCalculator(lstBlock[i], callBack)
        }
    },

    blockMoveUp() {
        if (!this.canMove) return;
        this.canMove = false;
        let canCreateNewBlock = false;
        const moveCalculator = (block, callBack) => {
            const currBlock = block.getComponent("blockControl");
            const currI = currBlock.getCoordinates().i;
            const currJ = currBlock.getCoordinates().j;
            if (currI === 0) {
                callBack && callBack()
                return;
            } else if (this._lstBlock[currI - 1][currJ] == null) {
                this._lstBlock[currI - 1][currJ] = block;
                this._lstBlock[currI][currJ] = null
                currBlock.setCoordinates(currI - 1, currJ);
                currBlock.move(this._lstPosition[currI - 1][currJ], () => {
                    moveCalculator(block, callBack)
                });
                canCreateNewBlock = true;
            } else if (this._lstBlock[currI - 1][currJ] != null) {
                const nextBlock = this._lstBlock[currI - 1][currJ];
                const currBlock = this._lstBlock[currI][currJ];
                if (nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue() && nextBlock.getComponent('blockControl').getCanCombine()) {
                    const newI = nextBlock.getComponent('blockControl').getCoordinates().i;
                    const newJ = nextBlock.getComponent('blockControl').getCoordinates().j;
                    const oldI = currBlock.getComponent('blockControl').getCoordinates().i;
                    const oldJ = currBlock.getComponent('blockControl').getCoordinates().j;
                    this._lstBlock[oldI][oldJ] = null;
                    const callBack2 = () => {
                        this.makeCombine(block, nextBlock, newI, newJ, callBack)
                    }
                    block.getComponent('blockControl').move(this._lstPosition[currI - 1][currJ], callBack2)
                    canCreateNewBlock = true;
                } else {
                    callBack && callBack();
                }
            }
        }
        let countBlock = 0;
        const lstBlock = this.getListBlockByTypeMove("UP");
        for (let i = 0; i < lstBlock.length; i++) {
            const callBack = () => {
                countBlock++;
                if (countBlock == lstBlock.length) {
                    this.moveFinish(canCreateNewBlock, lstBlock)
                }
            };
            moveCalculator(lstBlock[i], callBack)
        }
    },

    blockMoveDown() {
        if (!this.canMove) return;
        this.canMove = false;
        let canCreateNewBlock = false;
        const moveCalculator = (block, callBack) => {
            const currBlock = block.getComponent("blockControl");
            const currI = currBlock.getCoordinates().i;
            const currJ = currBlock.getCoordinates().j;
            if (currI === 3) {
                callBack && callBack()
                return;
            } else if (this._lstBlock[currI + 1][currJ] == null) {
                this._lstBlock[currI + 1][currJ] = block;
                this._lstBlock[currI][currJ] = null
                currBlock.setCoordinates(currI + 1, currJ);
                currBlock.move(this._lstPosition[currI + 1][currJ], () => {
                    moveCalculator(block, callBack)
                });
                canCreateNewBlock = true;
            } else if (this._lstBlock[currI + 1][currJ] != null) {
                const nextBlock = this._lstBlock[currI + 1][currJ];
                const currBlock = this._lstBlock[currI][currJ];
                if (nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue() && nextBlock.getComponent('blockControl').getCanCombine()) {
                    const newI = nextBlock.getComponent('blockControl').getCoordinates().i;
                    const newJ = nextBlock.getComponent('blockControl').getCoordinates().j;
                    const oldI = currBlock.getComponent('blockControl').getCoordinates().i;
                    const oldJ = currBlock.getComponent('blockControl').getCoordinates().j;
                    this._lstBlock[oldI][oldJ] = null;
                    const callBack2 = () => {
                        this.makeCombine(block, nextBlock, newI, newJ, callBack)
                    }
                    block.getComponent('blockControl').move(this._lstPosition[currI + 1][currJ], callBack2)
                    canCreateNewBlock = true;
                } else {
                    callBack && callBack();
                }
            }
        }
        let countBlock = 0;
        const lstBlock = this.getListBlockByTypeMove("DOWN");
        for (let i = 0; i < lstBlock.length; i++) {
            const callBack = () => {
                countBlock++;
                if (countBlock == lstBlock.length) {
                    this.moveFinish(canCreateNewBlock, lstBlock)
                }
            };
            moveCalculator(lstBlock[i], callBack)
        }
    },

    makeCombine(block1, block2, i, j, callBack) {
        const newBlock = cc.instantiate(this.block2);
        this.node.addChild(newBlock);
        newBlock.setPosition(this._lstPosition[i][j]);
        this._lstBlock[i][j] = newBlock;
        const val = block2.getComponent('blockControl').getValue();
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
        callBack && callBack()
        this.updateScore(val)
        block1.destroy();
        block2.destroy();
        if (this.soundOn.node.active === true) {
            Emitter.instance.emit("SOUND");
        }
    },

    getListBlockByTypeMove(type) {
        const lstBlock = [];
        switch (type) {
            case "RIGHT":
                for (let j = COLS - 1; j >= 0; j--) {
                    for (let i = 0; i < ROWS; i++) {
                        if (this._lstBlock[i][j] != null) {
                            lstBlock.push(this._lstBlock[i][j]);
                        }
                    }
                }
                return lstBlock;
            case "LEFT":
                for (let j = 0; j < COLS; j++) {
                    for (let i = 0; i < ROWS; i++) {
                        if (this._lstBlock[i][j] != null) {
                            lstBlock.push(this._lstBlock[i][j]);
                        }
                    }
                }
                return lstBlock;
            case "UP":
                for (let i = 0; i < ROWS; i++) {
                    for (let j = 0; j < COLS; j++) {
                        if (this._lstBlock[i][j] != null) {
                            lstBlock.push(this._lstBlock[i][j]);
                        }
                    }
                }
                return lstBlock;
            case "DOWN":
                for (let i = ROWS - 1; i >= 0; i--) {
                    for (let j = 0; j < COLS; j++) {
                        if (this._lstBlock[i][j] != null) {
                            lstBlock.push(this._lstBlock[i][j]);
                        }
                    }
                }
                return lstBlock;
            default: break;
        }
    },

    checkGameWin() {
        for (let i = 0; i < this._lstBlock.length; i++) {
            for (let j = 0; j < this._lstBlock[i].length; j++) {
                if (this._lstBlock[i][j] && this._lstBlock[i][j].getComponent('blockControl').getValue() === 16 && this._isFirstWin) {
                    this._isFirstWin = false;
                    return true;
                }
            }
        }
        return false;
    },

    showGameWin() {
        this.soundWin.play(this.soundWin, false, 1)
        this.winNoti.active = true
        cc.tween(this.winNoti)
            .to(1, { scale: 1 })
            .start()
    },

    continueGame() {
        this.canMove = true;
    },

    stopMove() {
        this.canMove = false;
    },

    checkGameLose() {
        this.updateEmptyList();
        if (this._lstEmptySlot.length === 0) {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    let num = this._lstBlock[i][j].getComponent("blockControl").getValue();

                    let numRight = this._lstBlock[i + 1] ? this._lstBlock[i + 1][j].getComponent("blockControl").getValue() : null;
                    let numLeft = this._lstBlock[i - 1] ? this._lstBlock[i - 1][j].getComponent("blockControl").getValue() : null;
                    let numUp = this._lstBlock[i][j - 1] ? this._lstBlock[i][j - 1].getComponent("blockControl").getValue() : null;
                    let numDown = this._lstBlock[i][j + 1] ? this._lstBlock[i][j + 1].getComponent("blockControl").getValue() : null;

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

    getScoreStorge() {
        let scoreStorge = cc.sys.localStorage.getItem('bestScore');
        if (scoreStorge !== null) {
            this.bestScore.string = JSON.parse(scoreStorge);
        } else {
            this.bestScore.string = "0";
        }
    },

    checkBestScore() {
        let newScore = Number(this.currScore.getComponent("Score").getValue())
        if (newScore > Number(this.bestScore.string)) {
            cc.sys.localStorage.setItem('bestScore', JSON.stringify(newScore));
            this.bestScore.string = newScore;
            Emitter.instance.emit("HIGHSCORE")
        }
    },


    newGame() {
        this._newGameFlag = true;
        const a = this.node.children.length;
        for (let i = 0; i <= a; i++) {
            this.node.removeChild(this.node.children[0]);
        }
        this.createArray();
        this.createBlockBg();
        this.createNewBlock();
        this.createNewBlock();
        this.updateScore(0);
        this._newGameFlag = false;
        this.canMove = true;
        this._isFirstWin = true
    },

    quitGame() {
        cc.game.end();
    },

    touchHandler() {
        if (cc.sys.isMobile) {
        this.bgBox.on("touchstart", (event) => {
            this._startPoint = event.getLocation();
        })
        this.bgBox.on("touchend", (event) => {
            this._endPoint = event.getLocation();
            this.reflectTouch();
        })
        this.bgBox.on("touchcancel", (event) => {
            this._endPoint = event.getLocation();
            this.reflectTouch();
        })
    }
    },

    reflectTouch() {
        let startVec = this._startPoint;
        let endVec = this._endPoint;
        let pointsVec = endVec.sub(startVec);
        let vecLength = pointsVec.mag();
        if (vecLength > MIN_LENGTH) {
            if (Math.abs(pointsVec.x) > Math.abs(pointsVec.y)) {
                if (pointsVec.x > 0) this.blockMoveRight();
                else this.blockMoveLeft();
            } else {
                if (pointsVec.y > 0) this.blockMoveUp();
                else this.blockMoveDown();
            }
        }
    },


});