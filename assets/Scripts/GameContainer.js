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
        _newItem: null,
        _arr: [],
        _indexItem: [],
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
        this._newItem = cc.instantiate(this.lbl2);
        this.node.addChild(this._newItem)
        let posX = Math.floor(Math.random()*4)+1;
        let posY = Math.floor(Math.random()*4)+1;
        this._newItem.setPosition(cc.v2((this._newItem.width+this._padX)*posX-(this._newItem.width)/2, (this._newItem.height+this._padY)*posY-(this._newItem.height)/2))
        cc.log(this._newItem.position)
        cc.warn(this.node)

    },


    onKeyRight: function(event){
        switch(event.keyCode){
            case cc.macro.KEY.right:
                cc.log("right");
                if(this._newItem.x === 390){
                    return;
                }else{
                    cc.tween(this._newItem)
                        .by(0.5, {position: cc.v2(this._newItem.width + this._padX,0)})
                        .start()
                    }
                // this.createNewItem();
                break;
        }
    },

    onKeyLeft: function(event){
        switch(event.keyCode){
            case cc.macro.KEY.left:
                cc.log("left");
                if(this._newItem.x === 60){
                    return
                }else{
                    cc.tween(this._newItem)
                            .by(0.5, {position: cc.v2(-(this._newItem.width + this._padX),0)})
                            .start()
                }
                // this.createNewItem();
                break
        }
    },

    onKeyUp: function(event){
        switch(event.keyCode){
            case cc.macro.KEY.up:
                cc.log("up");
                if(this._newItem.y == 390) {
                    return;
                }else {
                    cc.tween(this._newItem)
                        .by(0.5, {position: cc.v2(0,this._newItem.height + this._padY)})
                        .start()
                    }
                    // this.createNewItem();
                break;
        }
    },
    onKeyDown: function(event){
        switch(event.keyCode){
            case cc.macro.KEY.down:
                cc.log("down");

                if(this._newItem.y == 60) {
                    return;
                }else {
                    cc.tween(this._newItem)
                        .by(0.5, {position: cc.v2(0,-(this._newItem.height + this._padY))})
                        .start()
                    }
                    // this.createNewItem();

                break;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.createItem();
        this.createNewItem();
        // this.createNewItem();
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
