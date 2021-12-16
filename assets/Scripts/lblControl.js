

cc.Class({
    extends: cc.Component,

    properties: {
        lbl2: cc.Prefab,
        _padX: 10,
        _padY: 10,
        _newItem: null,
    },


    onLoad() {
        // this.createNewItem();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyRight, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyLeft, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    start() {
    },
    createNewItem() {
        // cc.log(2)
        this._newItem = cc.instantiate(this.lbl2);
        this.node.addChild(this._newItem)
        let posX = Math.floor(Math.random() * 4) + 1;
        let posY = Math.floor(Math.random() * 4) + 1;
        this._newItem.setPosition(cc.v2((this._newItem.width + this._padX) * posX - (this._newItem.width) / 2, (this._newItem.height + this._padY) * posY - (this._newItem.height) / 2))

    },


    onKeyRight: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                // cc.log("right");
                if(this.node.x === 390){
                    return;
                }else{
                    // cc.tween(this.node)
                    //     .by(0.5, {position: cc.v2(this.node.width + this._padX,0)})
                    //     .start()
                    cc.tween(this.node)
                        .to(1, { position: cc.v2(390, this.node.y) })
                        .start()
                    }
                break;
        }
    },

    onKeyLeft: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                // cc.log("left");
                if(this.node.x === 60){
                    return
                }else{
                    
                    cc.tween(this.node)
                        .to(1, { position: cc.v2(60, this.node.y) })
                        .start()
                }
                break
        }
    },

    onKeyUp: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.up:
                // cc.log("up");
                if(this.node.y == 390) {
                    return;
                }else {
                    cc.tween(this.node)
                        .to(1, { position: cc.v2(this.node.x, 390) })
                        .start()
                    
                    }
                // this.createNewItem();

                break;
        }
    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.down:
                // cc.log("down");

                if(this.node.y == 60) {
                    return;
                }else {
                    // cc.tween(this.node)
                    //     .by(0.5, {position: cc.v2(0,-(this.node.height + this._padY))})
                    //     .start()
                    cc.tween(this.node)
                        .to(1, { position: cc.v2(this.node.x, 60) })
                        .start()

                    }
                // this.createNewItem();
                break;
        }
    },

    // update (dt) {},
});
