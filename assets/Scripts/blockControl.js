
cc.Class({
    extends: cc.Component,

    properties: {
        numLabel: cc.Label,
        _value: 0,
        _coordinateX: 0,
        _coordinateX: 0,
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
        this._value = value;
    },

    getValue(){
        return this._value;
    },   
});
