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
        
    },
    
    createItem(){
        const padX = 10;
        const padY = 10;

        for(let i = 1; i < 5; i++) {
            for(let j = 1; j < 5; j ++) {
                let itemGame = cc.instantiate(this.item);
                this.node.addChild(itemGame);
                itemGame.setPosition(cc.v2(-100*i, 100*j))
            }
        }

    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.createItem();
        // cc.warn(this.item.node.position)
    },

    start () {

    },

    // update (dt) {},
});
