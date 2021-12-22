cc.Class ({
    extends: cc.Component,

    properties: {
        score: cc.Label,
        _value: 0,
    },

    init(){
        this._value = num;
        this.score.string = num.toString();
    },

    setValue(val){
        this._value = val;
        this.score.string = this._value.toString();
    },

    getValue(){
        return this._value;
    }, 

    updateValue(val) {
        this._value += val*2;
        this.score.string = this._value.toString();
    }
})