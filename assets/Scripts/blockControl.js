
cc.Class({
    extends: cc.Component,

    properties: {
        numLabel: cc.Label,
        _value: 0,
        _coordinateX: 0,
        _coordinateY: 0,
    },

    init(){
        const num = Math.random() <= 0.9 ? 2 : 4;
        this._value = num;
        this.numLabel.string = num.toString();
    },

    setCoordinates(i, j){
        this._coordinateX = i;
        this._coordinateY = j;
    },

    getCoordinates(){
        return {i: this._coordinateX, j: this._coordinateY};
    },

    setValue(val){
        this._value = val;
        this.numLabel.string = val.toString();
    },

    getValue(){
        return this._value;
    },  
    
    move(pos, callBack) {
        this.node.stopAllActions();
        const move = cc.moveTo(0.5, pos)
        const end = cc.callFunc(() => {callBack && callBack()})
        this.node.runAction(cc.sequence(move, end))
    }
});
