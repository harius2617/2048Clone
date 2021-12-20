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
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    
    start() {
        this.createArray();
        this.createBlockBg();
        this.createNewBlock();
        this.createNewBlock(); 
        cc.log(this._lstBlock)
        // cc.log(this._lstPosition)
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
        if(this._lstEmptySlot.length <= 0) return;
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
    },

    onKeyDown: function (event) {
        // if(!this.canMove) return;
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                this.canMove = false
                this.blockMoveRight();
                this.createNewBlock();
                // cc.log("lstPos",this._lstPosition)
                // cc.log("lstBlock",this._lstBlock)
                // cc.log("lstEmpty",this._lstEmptySlot)
                break;
            case cc.macro.KEY.left:
                this.blockMoveLeft();
                this.createNewBlock();
                break;
            case cc.macro.KEY.up:
                this.blockMoveUp();
                break;
            case cc.macro.KEY.down:
                this.blockMoveDown();
                break;
        }
    },

    blockMoveRight() {
        cc.warn('moveRight')
        let arr = this._lstBlock
        let posBlock = this._lstPosition
        // cc.log("lstBlock1",this._lstBlock)
        const moveCalculator = function(){
            for(let i =0; i <4; i++) {
                for(let j = 0; j <4; j ++) {
                    if(arr[i][j+1] === null && arr[i][j] != null){
                        arr[i][j+1] = arr[i][j];
                        arr[i][j] = null;
                        arr[i][j+1].setPosition(cc.v2(posBlock[i][j+1].x, posBlock[i][j+1].y))
                        cc.warn(posBlock[i][j+1].x)
                    }
                }
            }
        }
        cc.warn("lstBlock2",this._lstBlock)
        cc.warn("lstPos",this._lstPosition)
        const lstBlock =this.getListBlockByTypeMove("RIGHT");
        // cc.warn(lstBlock);
        for(let i = 0; i < lstBlock.length; i++){
            const callBack = () => {};
            moveCalculator(lstBlock[i], callBack)
        }
    },

    blockMoveLeft() {
        cc.warn('moveLeft')
        let arr = this._lstBlock
        let posBlock = this._lstPosition
        cc.log("lstBlock1",this._lstBlock)
        let moveCalculator = function(){
            for(let i = 0; i <4; i++) {
                for(let j = 3; j > 0; j --) {
                    if(arr[i][j-1] === null && arr[i][j] != null){
                        cc.log(arr[i][j])
                        arr[i][j-1] = arr[i][j];
                        arr[i][j] = null
                        arr[i][j-1].setPosition(cc.v2(posBlock[i][j-1].x, posBlock[i][j-1].y))
                    }
                }
            }
        }
        cc.warn("lstBlock2",this._lstBlock)
        // cc.warn("lstPos",this._lstPosition)
        const lstBlock =this.getListBlockByTypeMove("LEFT");
        cc.log(lstBlock)
        // cc.warn(lstBlock);
        for(let i = 0; i < lstBlock.length; i++){
            const callBack = () => {};
            moveCalculator(lstBlock[i], callBack)
        }
    },

    blockMoveUp() {
        cc.warn('moveUp')
        let arr = this._lstBlock
        let posBlock = this._lstPosition
        cc.log("lstBlock1",this._lstBlock)
        const moveCalculator = function(){
            for(let i = 0; i <4; i++) {
                for(let j = 0; j < 4; j ++) {
                    if(arr[i+1][j] === null){
                        arr[i+1][j] = arr[i][j];
                        arr[i][j] = null
                    } 
                }
            }
        }
        cc.warn("lstBlock2",this._lstBlock)
        cc.warn("lstPos",this._lstPosition)
        const lstBlock =this.getListBlockByTypeMove("UP");
        cc.warn(lstBlock);
        for(let i = 0; i < lstBlock.length; i++){
            const callBack = () => {};
            moveCalculator(lstBlock[i], callBack)
        }
    },

    blockMoveDown() {
        cc.warn('moveDown')
        let arr = this._lstBlock
        let posBlock = this._lstPosition
        // cc.log("lstBlock1",this._lstBlock)
        const moveCalculator = function(){
            for(let i =0; i <4; i++) {
                for(let j = 0; j <4; j ++) {
                    let block = arr[i][j]
                    // cc.log(block)
                    if(arr[i+1][j] === null){
                        arr[i+1][j] = arr[i][j];
                        arr[i][j] = null
                    }
                    
                }
            }
        }
        // cc.warn("lstBlock2",this._lstBlock)
        // cc.warn("lstPos",this._lstPosition)
        const lstBlock =this.getListBlockByTypeMove("DOWN");
        // cc.warn(lstBlock);
        for(let i = 0; i < lstBlock.length; i++){
            const callBack = () => {};
            moveCalculator(lstBlock[i], callBack)
        }
    },

    getListBlockByTypeMove(type){
        const lstBlock =[];
        switch(type){
            case "RIGHT":
                for(let i = 0; i < ROWS; i++){
                    for(let j = COLS - 1; j >= 0; j--){
                        // cc.warn(i, j)
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
                cc.log(1)
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