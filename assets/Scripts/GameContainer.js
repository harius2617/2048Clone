// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Prefab,
        lbl2: cc.Prefab,
        _padX: 10,
        _padY: 10,
        i: 0
        // _newItem: null,
        // _arr: [],
        // _indexItem: [],
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
        // cc.log(this.i)
        // this.i++
        this._newItem = cc.instantiate(this.lbl2);
        this.node.addChild(this._newItem)
        // cc.log(this._newItem.getComponent(cc.Sprite).x)
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
    onLoad() {
        // cc.warn(this.node.getComponent(cc.Prefab))
        this.createItem();
        this.createNewItem();
        // this.createNewItem();
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyRight, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyLeft, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.warn(this.item.node.position)
    },

    start() {
    },
});
