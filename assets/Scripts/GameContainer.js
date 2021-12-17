
cc.Class({
    extends: cc.Component,

    properties: {
        lbl2: cc.Prefab,
        item: cc.Prefab,
        _padX: 10,
        _padY: 10,
    },

    createItem() {
        for (let i = 1; i < 5; i++) {
            for (let j = 1; j < 5; j++) {
                let itemBg = cc.instantiate(this.item);
                this.node.addChild(itemBg);
                itemBg.setPosition(cc.v2((itemBg.width + this._padX) * i - (itemBg.width) / 2, (itemBg.height + this._padY) * j - (itemBg.height) / 2))
            }
        }

    },

    createNewItem() {
        this._newItem = cc.instantiate(this.lbl2);
        this.node.addChild(this._newItem)
        let posX = Math.floor(Math.random() * 4) + 1;
        let posY = Math.floor(Math.random() * 4) + 1;
        this._newItem.setPosition(cc.v2((this._newItem.width + this._padX) * posX - (this._newItem.width) / 2, (this._newItem.height + this._padY) * posY - (this._newItem.height) / 2))
    },

    onKeyDown: function (event) {
        cc.tween(this.node)
            .delay(1.2)
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
        this.createNewItem();
    },

    quitGame() {
        cc.game.end();
    },

    onLoad() {
        this.createItem();
        cc.log(this.item);
        this.createNewItem();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    start() {
    },
});
