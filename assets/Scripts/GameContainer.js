const Emitter = require('mEmitter');

const PAD_X = 10;
const PAD_Y = 10;
const ROWS = 4;
const COLS = 4;

cc.Class({
    extends: cc.Component,
    
    properties: {
        block2: cc.Prefab,
        cell: cc.Prefab,
        _lstBlock: [],
        _lstPosition: [],
        _lstEmptySlot: [],
        _posX: null,
        _posY: null,
        canMove: {
            default: true,
            visible: false
        }
    },
    
    onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("RIGHT", this.blockMoveRight.bind(this));
        Emitter.instance.registerEvent("LEFT", this.blockMoveLeft.bind(this));
        Emitter.instance.registerEvent("UP", this.blockMoveUp.bind(this));
        Emitter.instance.registerEvent("DOWN", this.blockMoveDown.bind(this));
    },
    
    start() {
        this.createArray();
        this.createBlockBg();
        this.createNewBlock();
        this.createNewBlock(); 
    },
    
    createBlockBg() {
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                let itemBg = cc.instantiate(this.cell);
                this.node.addChild(itemBg);
                const posX = (itemBg.width / 2) + (itemBg.width * i) + PAD_X * (i +1);
                const posY = -((itemBg.height / 2) + (itemBg.height * j) + PAD_Y * (j + 1));
                itemBg.setPosition(cc.v2(posX, posY));
                this._lstPosition[j][i] = itemBg.position;
            }
        }
    },
    
    createArray(){
        this._lstBlock = [];
        this._lstPosition = [];
        this._lstEmptySlot = [];
        for(let i = 0; i < 4; i++){
            this._lstPosition[i] = [];
            this._lstBlock[i] = [];
            for(let j = 0; j < 4; j++){
                this._lstPosition[i][j] = 0;
                this._lstBlock[i][j] = null;
                this._lstEmptySlot.push({i, j});
            }
        }
    },
    
    randomPosition() {
        this.updateEmptyList()
        if(this._lstEmptySlot.length <= 0) return;
        // cc.warn(this.updateEmptyList());

        const slot = Math.floor(Math.random() * this._lstEmptySlot.length);
        const data = {
            i: this._lstEmptySlot[slot].i,
            j: this._lstEmptySlot[slot].j,
            posX: this._lstPosition[this._lstEmptySlot[slot].i][this._lstEmptySlot[slot].j].x,
            posY: this._lstPosition[this._lstEmptySlot[slot].i][this._lstEmptySlot[slot].j].y
        }
        this._lstEmptySlot.splice(slot, 1);
        cc.warn(this._lstEmptySlot)
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
    },
    
    updateEmptyList() {
        for(let i = 0; i < 4; i++){;
            for(let j = 0; j < 4; j++){
                if (this._lstBlock[i][j] = null) {
                    this._lstEmptySlot.push({i, j});
                }
            }
            return this._lstEmptySlot;
        }
    },
    
    // onKeyDown: function (event) {
        //     switch (event.keyCode) {
            //         case cc.macro.KEY.right:
            //             this.canMove = false
            //             this.blockMoveRight();
            //             break;
            //         case cc.macro.KEY.left:
            //             this.blockMoveLeft();
            //             break;
            //         case cc.macro.KEY.up:
            //             this.blockMoveUp();
            //             break;
            //         case cc.macro.KEY.down:
            //             this.blockMoveDown();
            //             break;
            //     }
            // },
            
            moveFinish(flag){
                if(flag) {
                    cc.warn('moveDone')

                }
            },

            blockMoveRight() {
                cc.warn('moveRight')
                let flagMove = false;
                const moveCalculator = (block, callBack) =>{
                    const currBlock = block.getComponent("blockControl");
                    const currI =  currBlock.getCoordinates().i;
                    const currJ =  currBlock.getCoordinates().j;
                    if(currJ === 3) {
                        callBack && callBack()
                        return;
                    }else if (this._lstBlock[currI][currJ + 1] == null) {
                        this._lstBlock[currI][currJ + 1] = block;
                        this._lstBlock[currI][currJ] = null
                        currBlock.setCoordinates(currI, currJ + 1);
                        currBlock.move(this._lstPosition[currI][currJ + 1],callBack);
                        moveCalculator(block, callBack)
                        flagMove = true;
                    }else if(this._lstBlock[currI][currJ + 1] != null) {
                        const nextBlock = this._lstBlock[currI][currJ + 1];
                        if(nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue()){
                            flagMove = true;
                            const callBack2 = () => {
                                this.makeCombine(block, nextBlock)
                            }
                            block.getComponent('blockControl').move(this._lstPosition[currI][currJ + 1], callBack2)
                        } else {
                            callBack && callBack()
                        }
                    } else {
                        callBack && callBack();
                    }
                }
                const lstBlock =this.getListBlockByTypeMove("RIGHT");
                for(let i = 0; i < lstBlock.length; i++){
                    let callBack = () => {
                        // if(i === lstBlock.lstBlock.length - 1){
                        //     this.moveFinish(flagMove)
                        // }
                    };
                    moveCalculator(lstBlock[i], callBack)
                }
            },
            
            blockMoveLeft() {
                cc.warn('moveLeft')
                const moveCalculator = (block, callBack) => {
                    const currBlock = block.getComponent("blockControl");
                    const currI =  currBlock.getCoordinates().i;
                    const currJ =  currBlock.getCoordinates().j;
                    if(currJ === 0) {
                        return;
                    }else if(this._lstBlock[currI][currJ - 1] === null) {
                        this._lstBlock[currI][currJ - 1] = block;
                        this._lstBlock[currI][currJ] = null;
                        currBlock.setCoordinates(currI, currJ -1);
                        currBlock.move(this._lstPosition[currI][currJ-1], callBack);
                        moveCalculator(block, callBack);
                    }else if(this._lstBlock[currI][currJ - 1] != null) {
                        const nextBlock = this._lstBlock[currI][currJ - 1];
                        if(nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue()){
                            const callBack = () => {
                                this.makeCombine(block, nextBlock)
                            }
                            block.getComponent('blockControl').move(this._lstPosition[currI][currJ - 1], callBack)
                        } else {
                            callBack && callBack()
                        }
                    }
                }   
                const lstBlock =this.getListBlockByTypeMove("LEFT");
                for(let i = 0; i < lstBlock.length; i++){
                    const callBack = () => {};
                    moveCalculator(lstBlock[i], callBack)
                }
            },
            
            blockMoveUp() {
                cc.warn('moveUp')
                const moveCalculator = (block, callBack) =>{
                    const currBlock = block.getComponent("blockControl");
                    const currI =  currBlock.getCoordinates().i;
                    const currJ =  currBlock.getCoordinates().j;
                    if(currI === 0) {
                        return;
                    }else if (this._lstBlock[currI - 1][currJ] == null) {
                        this._lstBlock[currI - 1][currJ] = block;
                        this._lstBlock[currI][currJ] = null
                        currBlock.setCoordinates(currI - 1, currJ);
                        currBlock.move(this._lstPosition[currI - 1][currJ],callBack);
                        moveCalculator(block, callBack)
                    }else if(this._lstBlock[currI -1][currJ] != null) {
                        const nextBlock = this._lstBlock[currI - 1][currJ];
                        if(nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue()){
                            const callBack = () => {
                                this.makeCombine(block, nextBlock)
                            }
                            block.getComponent('blockControl').move(this._lstPosition[currI - 1][currJ], callBack)
                        } else {
                            callBack && callBack()
                        }
                    }
                }
                const lstBlock =this.getListBlockByTypeMove("UP");
                for(let i = 0; i < lstBlock.length; i++){
                    const callBack = () => {};
                    moveCalculator(lstBlock[i], callBack)
                }
            },
            
            blockMoveDown() {
                cc.warn('moveDown')
                const moveCalculator = (block, callBack) =>{
                    const currBlock = block.getComponent("blockControl");
                    const currI =  currBlock.getCoordinates().i;
                    const currJ =  currBlock.getCoordinates().j;
                    if(currI === 3) {
                        return;
                    }else if (this._lstBlock[currI + 1][currJ] == null) {
                        this._lstBlock[currI + 1][currJ] = block;
                        this._lstBlock[currI][currJ] = null
                        currBlock.setCoordinates(currI + 1, currJ);
                        currBlock.move(this._lstPosition[currI + 1][currJ],callBack);
                        moveCalculator(block, callBack)
                    }else if(this._lstBlock[currI + 1][currJ] != null) {
                        const nextBlock = this._lstBlock[currI + 1][currJ];
                        if(nextBlock.getComponent('blockControl').getValue() === block.getComponent('blockControl').getValue()){
                            const callBack = () => {
                                this.makeCombine(block, nextBlock)
                            }
                            block.getComponent('blockControl').move(this._lstPosition[currI + 1][currJ], callBack)
                        } else {
                            callBack && callBack()
                        }
                    }
                }
                const lstBlock =this.getListBlockByTypeMove("DOWN");
                for(let i = 0; i < lstBlock.length; i++){
                    const callBack = () => {};
                    moveCalculator(lstBlock[i], callBack)
                }
            },
            
            makeCombine(block1, block2){
                const newBlock = cc.instantiate(this.block2);
                this.node.addChild(newBlock);
                const newI = block2.getComponent('blockControl').getCoordinates().i;
                const newJ = block2.getComponent('blockControl').getCoordinates().j
                newBlock.setPosition(this._lstPosition[newI][newJ]);
                this._lstBlock[newI][newJ] = newBlock;
                if(newJ === 3) {
                    this._lstBlock[newI][newJ - 1] = null;
                }else if(newJ === 0) {
                    this._lstBlock[newI][newJ + 1] = null;
                }
                if(newI === 3) {
                    this._lstBlock[newI - 1][newJ] = null;
                }else if(newI === 0) {
                    this._lstBlock[newI + 1][newJ] = null;
                }
                const val = block2.getComponent('blockControl').getValue();
                newBlock.getComponent("blockControl").setValue(val * 2);
                newBlock.getComponent("blockControl").setCoordinates(newI, newJ);
                block1.destroy();
                block2.destroy();
            },
            
            getListBlockByTypeMove(type){
                const lstBlock =[];
                switch(type){
                    case "RIGHT":
                        for(let i = 0; i < ROWS; i++){
                            for(let j = COLS - 1; j >= 0; j--){
                                if(this._lstBlock[i][j] != null){
                                    lstBlock.push(this._lstBlock[i][j]);
                                }
                            }
                        }
                        return lstBlock;
                        case "LEFT":
                            for(let i = 0; i < ROWS; i++){
                    for(let j = 0; j < COLS; j++){
                        if(this._lstBlock[i][j] != null){
                            lstBlock.push(this._lstBlock[i][j]);
                        }
                    }
                }
                return lstBlock;
            case "UP":
                for(let i = 0; i < ROWS; i++){
                    for(let j = 0; j < COLS; j++){
                        if(this._lstBlock[i][j] != null){
                            lstBlock.push(this._lstBlock[i][j]);
                        }
                    }
                }
                return lstBlock;
            case "DOWN":
                for(let i = ROWS - 1; i >= 0; i--){
                    for(let j = 0; j < COLS; j++){
                        if(this._lstBlock[i][j] != null){
                            lstBlock.push(this._lstBlock[i][j]);
                            cc.log(lstBlock)
                        }
                    }
                }
                return lstBlock;
            default: break;
        }
    },

    newGame() {
        const a = this.node.children.length;
        for(let i = 0; i <= a ; i ++){
            this.node.removeChild(this.node.children[0]);
        }
        this.createArray();
        this.createBlockBg();
        this.createNewBlock();
        this.createNewBlock();
    },

    quitGame() {
        cc.game.end();
    },

});