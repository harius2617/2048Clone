
cc.Class({
    extends: cc.Component,

    properties: {
        // block2: cc.Prefab,
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyRight, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyLeft, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // this.init()
    },
    

    onKeyRight: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                // this.init()
                if(this.node.x === 390){
                    return;
                }else{
                    cc.tween(this.node)
                        .to(0.5, { position: cc.v2(390, this.node.y) })
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
                        .to(0.5, { position: cc.v2(60, this.node.y) })
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
                        .to(0.5, { position: cc.v2(this.node.x, 390) })
                        .start()
                    }
                break;
        }
    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.down:
                if(this.node.y == 60 && this.node.x === 60) {

                    return;
                }else {
                    cc.tween(this.node)
                        .to(0.5, { position: cc.v2(this.node.x, 60) })
                        .start()
                    }
                break;
        }
    },
});
