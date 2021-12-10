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
        
    },
    
    createItem(){
        for(let i = 1; i < 5; i++) {
            for(let j = 1; j < 5; j ++) {
                let itemBg = cc.instantiate(this.item);
                this.node.addChild(itemBg);
                itemBg.setPosition(cc.v2((itemBg.width+this._padX)*i-(itemBg.width)/2, (itemBg.height+this._padY)*j-(itemBg.height)/2))
            }
        }

    },

    createNewItem() {
        let newItem = cc.instantiate(this.lbl2);
        this.node.addChild(newItem)
        let arr = Math.floor(Math.random()+1)*4
        newItem.setPosition(cc.v2((newItem.width+this._padX)*arr/2-(newItem.width)/2, (newItem.height+this._padY)*arr-(newItem.height)/2))
    },

    onKeyRight: function(event){
        switch(event.keyCode){
            case cc.macro.KEY.right:
                cc.log("right");
                if(this.lbl2.x == 390) {
                    this.lbl2.setPosition(cc.v2(this.lbl2.x, this.lbl2.y))
                }else {
                    this.lbl2.setPosition(cc.v2(390,this.lbl2.y))
                }
                break;
        }
    },

    onKeyLeft: function(event){
        // switch(event.keyCode){
        //     case cc.macro.KEY.left:
        //         cc.log("left");
        //         if(this.lbl2.node.x == 60) {
        //             this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x, this.lbl2.node.y))
        //         }else {
        //             this.lbl2.node.setPosition(cc.v2(60,this.lbl2.node.y))
        //         }
        //         break;
        // }
    },

    onKeyUp: function(event){
        // switch(event.keyCode){
        //     case cc.macro.KEY.up:
        //         cc.log("up");
        //         if(this.lbl2.node.y == 390) {
        //             this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x, this.lbl2.node.y))
        //         }else {
        //             this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x,390))
        //         }
        //         break;
        // }
    },
    onKeyDown: function(event){
        // switch(event.keyCode){
        //     case cc.macro.KEY.down:
        //         cc.log("down");
        //         if(this.lbl2.node.y == 60) {
        //             this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x, this.lbl2.node.y))
        //         }else {
        //             this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x,60))
        //         }
        //         break;
        // }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.createItem();
        this.createNewItem();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyRight, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyLeft, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.warn(this.item.node.position)
    },

    start () {

    },

    // update (dt) {},
});
