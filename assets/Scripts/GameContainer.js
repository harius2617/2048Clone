cc.Class({
    extends: cc.Component,

    properties: {
        cell: cc.Prefab,
        _padX: 10,
        _padY: 10,
        // _newItem: null,
        arr: [],
        _posX: null,
        _posY: null,
    },
    createItem() {
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                let itemBg = cc.instantiate(this.cell);
                this.node.addChild(itemBg);
                itemBg.setPosition(cc.v2((itemBg.width + this._padX) * i - (itemBg.width) / 2, (itemBg.height + this._padY) * j - (itemBg.height) / 2))
            }
        }
    },

    randomAdd() {
        this._posX = Math.floor(Math.random() * 4) + 1;
        this._posY = Math.floor(Math.random() * 4) + 1;
    },

    createArrBlock() {
        for(let i = 0; i < 4; i ++) {
            this.arr[i] = []
            for(let j = 0; j < 4; j++) {
                this.arr[i][j] = 0
            }
        }
    },

    createNewItem() {
        let newItem = cc.instantiate(this.block2);
        this.node.addChild(newItem)
        this.randomAdd();
        newItem.setPosition(cc.v2((newItem.width + this._padX) * this._posX - (newItem.width) / 2, (newItem.height + this._padY) * this._posY - (newItem.height) / 2))
        cc.log(this._posX-1, this._posY-1)
        this.arr[this._posX - 1][this._posY-1] = newItem
        cc.warn(this.arr)
    },

    onKeyDown: function (event) {
        // cc.log(event.keyCode)
        cc.tween(this.node)
            .delay(1)
            .call(()=>{
                this.createNewItem()
            })
            .start()
    },

    newGame() {
        const a = this.node.children.length;
        for(let i = 0; i <= a ; i ++){
            this.node.removeChild(this.node.children[0]);
        }
        this.createItem();
        // this.createNewItem();
    },

    quitGame() {
        cc.game.end();
    },

    onLoad() {
        this.createArrBlock()
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    
    start() {
        this.createNewItem();
        this.createItem();
        
    },
});
