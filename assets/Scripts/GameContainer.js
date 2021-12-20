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
        // _newItem: null,
        _posX: null,
        _posY: null,
        canMove: {
            default: true,
            visible: false
        }
    },
    createBlockBg() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let itemBg = cc.instantiate(this.cell);
                this.node.addChild(itemBg);
                const posX = (itemBg.width / 2) + (itemBg.width * i) + PAD_X * (i +1);
                const posY = -((itemBg.height / 2) + (itemBg.height * j) + PAD_Y * (j + 1));
                itemBg.setPosition(cc.v2(posX, posY))
                this._lstPosition[j][i] = itemBg.position;
            }
        }
    },

    // randomAdd() { 
    //     this._posX = Math.floor(Math.random() * 4) + 1;
    //     this._posY = Math.floor(Math.random() * 4) + 1;
    //     return this._posX, this._posY
    // },

    createArray() {
        this._lstBlock = [];
        this._lstPosition = [];
        this._lstEmptySlot = [];
        for(let i = 0; i < 4; i++) {
            this._lstPosition[i] = [];
            this._lstBlock[i] = [];
            for(let j = 0; j < 4; j++) {
                this._lstPosition[i][j] = 0;
                this._lstBlock[i][j] = null;
                this._lstEmptySlot.push({i,j});
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
        let newBlock = cc.instantiate(this.block2);
        this.node.addChild(newBlock)
        // this.randomAdd();
        let data = this.randomPosition();
        newBlock.setPosition(cc.v2(data.posX, data.posY))
        // this.arr[this._posX - 1][this._posY - 1] = newItem
        // cc.warn(this.arr)
        this._lstBlock[data.i][data.j] = newBlock;
        newBlock.getComponent("blockControl").init();
        newBlock.getComponent("blockControl").setCoordinates(data.i, data.j);

    },

    onKeyDown: function (event) {
        // cc.log(event.keyCode)
        // cc.tween(this.node)
        //     .delay(1)
        //     .call(()=>{
        //         this.createNewBlock()
        //     })
        //     .start()
        // if(!this.canMove) return;
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                this.canMove = false
                this.blockMoveRight();
                break;
            case cc.macro.KEY.left:
                // this.blockMoveLeft();
                break;
            case cc.macro.KEY.up:
                // this.blockMoveUp();
                break;
            case cc.macro.KEY.down:
                // this.blockMoveDown();
                break;
        }
    },

    blockMoveRight() {
        cc.warn('moveRight')
        const moveCalculator = function(){

        }

        const lstBlock =this.getListBlockByTypeMove("RIGHT");
        cc.warn(lstBlock);
        for(let i = 0; i < lstBlock.length; i++){
            const callBack = () => {};
            moveCalculator(lstBlock[i], callBack)
        }
    },

    newGame() {
        const a = this.node.children.length;
        for(let i = 0; i <= a ; i ++){
            this.node.removeChild(this.node.children[0]);
        }
        this.arr = []
        this.createItem();
        this.createNewBlock();
        cc.log(this._posX, this._posY)
        // this.createNewBlock();
        
    },

    quitGame() {
        cc.game.end();
    },

    onLoad() {
        // this.createArrBlock()
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    
    start() {
        this.createArray();
        this.createBlockBg();
        this.createNewBlock();
        this.createNewBlock();

        
    },
});
