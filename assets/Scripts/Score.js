cc.Class ({
    extends: cc.Component,

    properties: {
        score: cc.Label,
        bestScore: cc.Label,
        scoreArr: [],
        _value: 0,
        _valueBest: 0,
    },

    onLoad() {

    },

    init(){
        this._value = num;
        this._valueBest = numBest;
        this.score.string = num.toString();
        this.bestScore.string = numBest.toString();
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
        this.scoreArr.push(this.score.string)
    },

})