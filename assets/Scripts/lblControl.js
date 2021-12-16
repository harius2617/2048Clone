

cc.Class({
    extends: cc.Component,

    properties: {
        // lbl2: cc.Prefab,
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

    onKeyRight: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                // cc.log("right");
                // cc.log(this.node.position)
                cc.log(this.node.children)
                if(this.node.x === 390){
                    return;
                }else{
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
                if(this.node.y == 390 && this.node.x === 60) {
                    return;
                }else {
                    cc.tween(this.node)
                        .to(1, { position: cc.v2(this.node.x, 390) })
                        .start()
                    
                    }

                break;
        }
    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.down:
                // cc.log("down");

                if(this.node.y == 60 && this.node.x === 60) {
                    cc.log(1)
                    return;
                }else {
                    cc.tween(this.node)
                        .to(1, { position: cc.v2(this.node.x, 60) })
                        .start()

                    }
                break;
        }
    },
});
