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
        lbl2: cc.Sprite,
        
    },
    
    createItem(){
        const padX = 10;
        const padY = 10;
        for(let i = 1; i < 5; i++) {
            for(let j = 1; j < 5; j ++) {
                let itemGame = cc.instantiate(this.item);
                this.node.addChild(itemGame);
                itemGame.setPosition(cc.v2((itemGame.width+padX)*i-(itemGame.width)/2, (itemGame.height+padY)*j-(itemGame.height)/2))
            }
        }

    },

    onKeyRight: function(event){
        switch(event.keyCode){
            case cc.macro.KEY.right:
                cc.log("right");
                if(this.lbl2.node.x == 390) {
                    this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x, this.lbl2.node.y))
                }else {
                    this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x+110,this.lbl2.node.y))
                }
                break;
        }
    },

    onKeyLeft: function(event){
        switch(event.keyCode){
            case cc.macro.KEY.left:
                cc.log("left");
                if(this.lbl2.node.x == 60) {
                    this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x, this.lbl2.node.y))
                }else {
                    this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x-110,this.lbl2.node.y))
                }
                break;
        }
    },

    onKeyUp: function(event){
        switch(event.keyCode){
            case cc.macro.KEY.up:
                cc.log("up");
                if(this.lbl2.node.y == 390) {
                    this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x, this.lbl2.node.y))
                }else {
                    this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x,this.lbl2.node.y+110))
                }
                break;
        }
    },
    onKeyDown: function(event){
        switch(event.keyCode){
            case cc.macro.KEY.down:
                cc.log("down");
                if(this.lbl2.node.y == 60) {
                    this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x, this.lbl2.node.y))
                }else {
                    this.lbl2.node.setPosition(cc.v2(this.lbl2.node.x,this.lbl2.node.y-110))
                }
                break;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.createItem();
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
