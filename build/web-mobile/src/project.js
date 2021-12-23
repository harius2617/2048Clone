window.__require=function t(e,o,n){function i(r,c){if(!o[r]){if(!e[r]){var l=r.split("/");if(l=l[l.length-1],!e[l]){var a="function"==typeof __require&&__require;if(!c&&a)return a(l,!0);if(s)return s(l,!0);throw new Error("Cannot find module '"+r+"'")}}var h=o[r]={exports:{}};e[r][0].call(h.exports,function(t){return i(e[r][1][t]||t)},h,h.exports,t,e,o,n)}return o[r].exports}for(var s="function"==typeof __require&&__require,r=0;r<n.length;r++)i(n[r]);return i}({1:[function(t,e,o){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(t){return"function"==typeof t}function s(t){return"number"==typeof t}function r(t){return"object"==typeof t&&null!==t}function c(t){return void 0===t}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(t){if(!s(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},n.prototype.emit=function(t){var e,o,n,s,l,a;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var h=new Error('Uncaught, unspecified "error" event. ('+e+")");throw h.context=e,h}if(c(o=this._events[t]))return!1;if(i(o))switch(arguments.length){case 1:o.call(this);break;case 2:o.call(this,arguments[1]);break;case 3:o.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),o.apply(this,s)}else if(r(o))for(s=Array.prototype.slice.call(arguments,1),n=(a=o.slice()).length,l=0;l<n;l++)a[l].apply(this,s);return!0},n.prototype.addListener=function(t,e){var o;if(!i(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,i(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned&&(o=c(this._maxListeners)?n.defaultMaxListeners:this._maxListeners)&&o>0&&this._events[t].length>o&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(t,e){if(!i(e))throw TypeError("listener must be a function");var o=!1;function n(){this.removeListener(t,n),o||(o=!0,e.apply(this,arguments))}return n.listener=e,this.on(t,n),this},n.prototype.removeListener=function(t,e){var o,n,s,c;if(!i(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(s=(o=this._events[t]).length,n=-1,o===e||i(o.listener)&&o.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(o)){for(c=s;c-- >0;)if(o[c]===e||o[c].listener&&o[c].listener===e){n=c;break}if(n<0)return this;1===o.length?(o.length=0,delete this._events[t]):o.splice(n,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},n.prototype.removeAllListeners=function(t){var e,o;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(i(o=this._events[t]))this.removeListener(t,o);else if(o)for(;o.length;)this.removeListener(t,o[o.length-1]);return delete this._events[t],this},n.prototype.listeners=function(t){return this._events&&this._events[t]?i(this._events[t])?[this._events[t]]:this._events[t].slice():[]},n.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(i(e))return 1;if(e)return e.length}return 0},n.listenerCount=function(t,e){return t.listenerCount(e)}},{}],GameContainer:[function(t,e,o){"use strict";cc._RF.push(e,"9ff73FtRepAK4fEw68UUb4y","GameContainer");var n=t("mEmitter");cc.Class({extends:cc.Component,properties:{block2:cc.Prefab,cell:cc.Prefab,currScore:cc.Label,bestScore:cc.Label,winNoti:cc.Node,soundWin:cc.AudioSource,conntinueBtn:cc.Button,_newGameFlag:!1,_lstBlock:[],_lstPosition:[],_lstEmptySlot:[],_posX:null,_posY:null,canMove:{default:!0,visible:!1},_isFirstWin:!1},onLoad:function(){n.instance.registerEvent("RIGHT",this.blockMoveRight.bind(this)),n.instance.registerEvent("LEFT",this.blockMoveLeft.bind(this)),n.instance.registerEvent("UP",this.blockMoveUp.bind(this)),n.instance.registerEvent("DOWN",this.blockMoveDown.bind(this)),this.winNoti.scale=0,this.winNoti.active=!1,this._isFirstWin=!0},start:function(){this.createArray(),this.createBlockBg(),this.createNewBlock(),this.createNewBlock(),this.getScoreStorge(),this.canMove=!0},createBlockBg:function(){for(var t=0;t<4;t++)for(var e=0;e<4;e++){var o=cc.instantiate(this.cell);this.node.addChild(o);var n=o.width/2+o.width*e+10*(e+1),i=-(o.height/2+o.height*t+10*(t+1));o.setPosition(cc.v2(n,i)),this._lstPosition[t][e]=o.position}},createArray:function(){this._lstBlock=[],this._lstPosition=[],this._lstEmptySlot=[];for(var t=0;t<4;t++){this._lstPosition[t]=[],this._lstBlock[t]=[];for(var e=0;e<4;e++)this._lstPosition[t][e]=0,this._lstBlock[t][e]=null,this._lstEmptySlot.push({i:t,j:e})}},randomPosition:function(){if(this.updateEmptyList(),!(this._lstEmptySlot.length<=0)){var t=Math.floor(Math.random()*this._lstEmptySlot.length),e={i:this._lstEmptySlot[t].i,j:this._lstEmptySlot[t].j,posX:this._lstPosition[this._lstEmptySlot[t].i][this._lstEmptySlot[t].j].x,posY:this._lstPosition[this._lstEmptySlot[t].i][this._lstEmptySlot[t].j].y};return this._lstEmptySlot.splice(t,1),e}},createNewBlock:function(){var t=cc.instantiate(this.block2);this.node.addChild(t);var e=this.randomPosition();t.setPosition(e.posX,e.posY),this._lstBlock[e.i][e.j]=t,t.getComponent("blockControl").init(),t.getComponent("blockControl").setCoordinates(e.i,e.j)},updateEmptyList:function(){this._lstEmptySlot=[];for(var t=0;t<4;t++)for(var e=0;e<4;e++)null===this._lstBlock[t][e]&&this._lstEmptySlot.push({i:t,j:e})},updateScore:function(t){this._newGameFlag?this.currScore.getComponent("Score").setValue(t):this.currScore.getComponent("Score").updateValue(t)},moveFinish:function(t,e){t&&(this.createNewBlock(),this.checkBestScore());for(var o=0;o<this._lstBlock.length;o++)for(var i=0;i<this._lstBlock[o].length;i++)this._lstBlock[o][i]&&this._lstBlock[o][i].getComponent("blockControl").setCanCombine(!0);this.checkGameWin()?(this.canMove=!1,this.showGameWin()):this.canMove=!0,this.checkGameLose()&&n.instance.emit("LOSE")},blockMoveRight:function(){var t=this;if(this.canMove){this.canMove=!1;for(var e=!1,o=function o(n,i){var s=n.getComponent("blockControl"),r=s.getCoordinates().i,c=s.getCoordinates().j;if(3!==c){if(null==t._lstBlock[r][c+1])t._lstBlock[r][c+1]=n,t._lstBlock[r][c]=null,s.setCoordinates(r,c+1),s.move(t._lstPosition[r][c+1],function(){o(n,i)}),e=!0;else if(null!=t._lstBlock[r][c+1]){var l=t._lstBlock[r][c+1],a=t._lstBlock[r][c];if(l.getComponent("blockControl").getValue()===n.getComponent("blockControl").getValue()&&l.getComponent("blockControl").getCanCombine()){var h=l.getComponent("blockControl").getCoordinates().i,u=l.getComponent("blockControl").getCoordinates().j,m=a.getComponent("blockControl").getCoordinates().i,f=a.getComponent("blockControl").getCoordinates().j;t._lstBlock[m][f]=null;n.getComponent("blockControl").move(t._lstPosition[r][c+1],function(){t.makeCombine(n,l,h,u,i)}),e=!0}else i&&i()}}else i&&i()},n=0,i=this.getListBlockByTypeMove("RIGHT"),s=0;s<i.length;s++){o(i[s],function(){++n==i.length&&t.moveFinish(e,i)})}}},blockMoveLeft:function(){var t=this;if(this.canMove){this.canMove=!1;for(var e=!1,o=function o(n,i){var s=n.getComponent("blockControl"),r=s.getCoordinates().i,c=s.getCoordinates().j;if(0!==c){if(null===t._lstBlock[r][c-1])t._lstBlock[r][c-1]=n,t._lstBlock[r][c]=null,s.setCoordinates(r,c-1),s.move(t._lstPosition[r][c-1],function(){o(n,i)}),e=!0;else if(null!=t._lstBlock[r][c-1]){var l=t._lstBlock[r][c-1],a=t._lstBlock[r][c];if(l.getComponent("blockControl").getValue()===n.getComponent("blockControl").getValue()&&l.getComponent("blockControl").getCanCombine()){var h=l.getComponent("blockControl").getCoordinates().i,u=l.getComponent("blockControl").getCoordinates().j,m=a.getComponent("blockControl").getCoordinates().i,f=a.getComponent("blockControl").getCoordinates().j;t._lstBlock[m][f]=null;n.getComponent("blockControl").move(t._lstPosition[r][c-1],function(){t.makeCombine(n,l,h,u,i)}),e=!0}else i&&i()}}else i&&i()},n=0,i=this.getListBlockByTypeMove("LEFT"),s=0;s<i.length;s++){o(i[s],function(){++n==i.length&&t.moveFinish(e,i)})}}},blockMoveUp:function(){var t=this;if(this.canMove){this.canMove=!1;for(var e=!1,o=function o(n,i){var s=n.getComponent("blockControl"),r=s.getCoordinates().i,c=s.getCoordinates().j;if(0!==r){if(null==t._lstBlock[r-1][c])t._lstBlock[r-1][c]=n,t._lstBlock[r][c]=null,s.setCoordinates(r-1,c),s.move(t._lstPosition[r-1][c],function(){o(n,i)}),e=!0;else if(null!=t._lstBlock[r-1][c]){var l=t._lstBlock[r-1][c],a=t._lstBlock[r][c];if(l.getComponent("blockControl").getValue()===n.getComponent("blockControl").getValue()&&l.getComponent("blockControl").getCanCombine()){var h=l.getComponent("blockControl").getCoordinates().i,u=l.getComponent("blockControl").getCoordinates().j,m=a.getComponent("blockControl").getCoordinates().i,f=a.getComponent("blockControl").getCoordinates().j;t._lstBlock[m][f]=null;n.getComponent("blockControl").move(t._lstPosition[r-1][c],function(){t.makeCombine(n,l,h,u,i)}),e=!0}else i&&i()}}else i&&i()},n=0,i=this.getListBlockByTypeMove("UP"),s=0;s<i.length;s++){o(i[s],function(){++n==i.length&&t.moveFinish(e,i)})}}},blockMoveDown:function(){var t=this;if(this.canMove){this.canMove=!1;for(var e=!1,o=function o(n,i){var s=n.getComponent("blockControl"),r=s.getCoordinates().i,c=s.getCoordinates().j;if(3!==r){if(null==t._lstBlock[r+1][c])t._lstBlock[r+1][c]=n,t._lstBlock[r][c]=null,s.setCoordinates(r+1,c),s.move(t._lstPosition[r+1][c],function(){o(n,i)}),e=!0;else if(null!=t._lstBlock[r+1][c]){var l=t._lstBlock[r+1][c],a=t._lstBlock[r][c];if(l.getComponent("blockControl").getValue()===n.getComponent("blockControl").getValue()&&l.getComponent("blockControl").getCanCombine()){var h=l.getComponent("blockControl").getCoordinates().i,u=l.getComponent("blockControl").getCoordinates().j,m=a.getComponent("blockControl").getCoordinates().i,f=a.getComponent("blockControl").getCoordinates().j;t._lstBlock[m][f]=null;n.getComponent("blockControl").move(t._lstPosition[r+1][c],function(){t.makeCombine(n,l,h,u,i)}),e=!0}else i&&i()}}else i&&i()},n=0,i=this.getListBlockByTypeMove("DOWN"),s=0;s<i.length;s++){o(i[s],function(){++n==i.length&&t.moveFinish(e,i)})}}},makeCombine:function(t,e,o,n,i){var s=cc.instantiate(this.block2);this.node.addChild(s),s.setPosition(this._lstPosition[o][n]),this._lstBlock[o][n]=s;var r=e.getComponent("blockControl").getValue();s.getComponent("blockControl").setValue(2*r),s.getComponent("blockControl").setCanCombine(!1),s.getComponent("blockControl").setCoordinates(o,n),cc.warn(s),i&&i(),this.updateScore(r),t.destroy(),e.destroy()},getListBlockByTypeMove:function(t){var e=[];switch(t){case"RIGHT":for(var o=3;o>=0;o--)for(var n=0;n<4;n++)null!=this._lstBlock[n][o]&&e.push(this._lstBlock[n][o]);return e;case"LEFT":for(var i=0;i<4;i++)for(var s=0;s<4;s++)null!=this._lstBlock[s][i]&&e.push(this._lstBlock[s][i]);return e;case"UP":for(var r=0;r<4;r++)for(var c=0;c<4;c++)null!=this._lstBlock[r][c]&&e.push(this._lstBlock[r][c]);return e;case"DOWN":for(var l=3;l>=0;l--)for(var a=0;a<4;a++)null!=this._lstBlock[l][a]&&e.push(this._lstBlock[l][a]);return e}},checkGameWin:function(){for(var t=0;t<this._lstBlock.length;t++)for(var e=0;e<this._lstBlock[t].length;e++)if(this._lstBlock[t][e]&&16===this._lstBlock[t][e].getComponent("blockControl").getValue()&&this._isFirstWin)return this._isFirstWin=!1,!0;return!1},showGameWin:function(){this.soundWin.play(this.soundWin,!1,1),this.winNoti.active=!0,cc.tween(this.winNoti).to(1,{scale:1}).start()},continueGame:function(){this.winNoti.active=!1,this.canMove=!0},checkGameLose:function(){if(this.updateEmptyList(),0===this._lstEmptySlot.length){for(var t=0;t<4;t++)for(var e=0;e<4;e++){var o=this._lstBlock[t][e].getComponent("blockControl").getValue(),n=this._lstBlock[t+1]?this._lstBlock[t+1][e].getComponent("blockControl").getValue():null,i=this._lstBlock[t-1]?this._lstBlock[t-1][e].getComponent("blockControl").getValue():null,s=this._lstBlock[t][e-1]?this._lstBlock[t][e-1].getComponent("blockControl").getValue():null,r=this._lstBlock[t][e+1]?this._lstBlock[t][e+1].getComponent("blockControl").getValue():null;if(t<3&&o===n)return!1;if(t>0&&o===i)return!1;if(e<3&&o===r)return!1;if(e>0&&o===s)return!1}return!0}return!1},getScoreStorge:function(){var t=cc.sys.localStorage.getItem("bestScore");this.bestScore.string=null!==t?JSON.parse(t):"0"},checkBestScore:function(){var t=Number(this.currScore.getComponent("Score").getValue());t>Number(this.bestScore.string)&&(cc.sys.localStorage.setItem("bestScore",JSON.stringify(t)),this.bestScore.string=t,n.instance.emit("HIGHSCORE"))},newGame:function(){this._newGameFlag=!0;for(var t=this.node.children.length,e=0;e<=t;e++)this.node.removeChild(this.node.children[0]);this.createArray(),this.createBlockBg(),this.createNewBlock(),this.createNewBlock(),this.updateScore(0),this._newGameFlag=!1,this.winNoti.active=!1,this.canMove=!0,this._isFirstWin=!0},quitGame:function(){cc.game.end()}}),cc._RF.pop()},{mEmitter:"mEmitter"}],GameCotroller:[function(t,e,o){"use strict";cc._RF.push(e,"316e3LeXuVK7K4optp5GFTl","GameCotroller");var n=t("mEmitter");cc.Class({extends:cc.Component,properties:{soundOnBtn:cc.Button,soundOffBtn:cc.Button,userNameBox:cc.EditBox,tooltipName:cc.Label,enterButton:cc.Button,ruleLayout:cc.PageView,loseLayout:cc.Node,newHigh:cc.Node,leaderboard:cc.Node,topUser:cc.Prefab,content:cc.Node,soundOn:!0,soundOff:!1,soundBg:cc.AudioSource},onLoad:function(){n.instance=new n,this.soundOnBtn.node.active=!0,this.soundOffBtn.node.active=!1,this.ruleLayout.node.active=!1,this.loseLayout.scale=1,this.tooltipName.node.active=!1,this.enterBtn.interacterble=!1,this.loseLayout.active=!1,this.newHigh.scale=0,this.soundBg.play(this.soundBg,!0,1),n.instance.registerEvent("LOSE",this.loseGame.bind(this)),this.notiNewHighScore()},soundOnFunc:function(){this.soundOnBtn.node.active=!0,this.soundOffBtn.active=!1,this.soundBg.play(this.soundBg,!0,1)},soundOffFunc:function(){this.soundOnBtn.node.active=!1,this.soundOffBtn.node.active=!0,this.soundBg.stop(this.soundBg,!0,1)},onRule:function(){this.ruleLayout.node.active=!0,this.ruleLayout.node.getComponent(cc.PageView).scrollToPage(0,.01)},offRule:function(){this.ruleLayout.node.active=!1},loseGame:function(t){this.loseLayout.active=!0,cc.tween(this.loseLayout).to(1,{scale:1}).start()},notiNewHighScore:function(){this.newHigh.active=!0,cc.tween(this.newHigh).to(0,1,{scale:1}).to(1,{opacity:50}).to(1,{opacity:255}).to(1,{scale:0}).start()},userNameCheck:function(){return 0===this.userNameBox.string.length?(this.tooltipName.node.active=!0,this.tooltipName.string="Username must have at least 1 letters"):this.tooltipName.node.active=!1,!0},enterBtn:function(){if(this.userNameCheck){this.enterButton.interacterble=!0;var t=cc.instantiate(this.topUser);this.content.addChild(t),t.getComponent(cc.Label).string=this.userNameBox.getComponent(cc.EditBox).string+" :(("}this.loseLayout.active=!1},onLeaderboard:function(){this.leaderboard.active=!0},offLeaderboard:function(){this.leaderboard.active=!1}}),cc._RF.pop()},{mEmitter:"mEmitter"}],Score:[function(t,e,o){"use strict";cc._RF.push(e,"a08ceFjZbRLPbjMwpMlnGws","Score"),cc.Class({extends:cc.Component,properties:{score:cc.Label,bestScore:cc.Label,scoreArr:[],_value:0,_valueBest:0},onLoad:function(){},init:function(){this._value=num,this._valueBest=numBest,this.score.string=num.toString(),this.bestScore.string=numBest.toString()},setValue:function(t){this._value=t,this.score.string=this._value.toString()},getValue:function(){return this._value},updateValue:function(t){this._value+=2*t,this.score.string=this._value.toString(),this.scoreArr.push(this.score.string)}}),cc._RF.pop()},{}],blockControl:[function(t,e,o){"use strict";cc._RF.push(e,"fb76cKRzV1DG6k2i0q6YcJ5","blockControl"),cc.Class({extends:cc.Component,properties:{numLabel:cc.Label,_value:0,_coordinateX:0,_coordinateY:0,_canMove:!0,_isCombine:!0},init:function(){var t=Math.random()<=.9?2:4;this._value=t,this.numLabel.string=t.toString(),this._isCombine=!0},setCanCombine:function(t){return this._isCombine=t,this._isCombine},getCanCombine:function(){return this._isCombine},setCoordinates:function(t,e){this._coordinateX=t,this._coordinateY=e},getCoordinates:function(){return{i:this._coordinateX,j:this._coordinateY}},setValue:function(t){this._value=t,this.numLabel.string=t.toString()},getValue:function(){return this._value},move:function(t,e){this.node.stopAllActions();var o=cc.moveTo(.1,t),n=cc.callFunc(function(){e&&e()});this.node.runAction(cc.sequence(o,n))}}),cc._RF.pop()},{}],keyBoard:[function(t,e,o){"use strict";cc._RF.push(e,"b47ecS9tLpFCokg9wO/44LN","keyBoard");var n=t("mEmitter");cc.Class({extends:cc.Component,onLoad:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this)},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.down:this.moveDown();break;case cc.macro.KEY.right:this.moveRight();break;case cc.macro.KEY.left:this.moveLeft();break;case cc.macro.KEY.up:this.moveUp()}},moveRight:function(){n.instance.emit("RIGHT")},moveLeft:function(){n.instance.emit("LEFT")},moveUp:function(){n.instance.emit("UP")},moveDown:function(){n.instance.emit("DOWN")}}),cc._RF.pop()},{mEmitter:"mEmitter"}],mEmitter:[function(t,e,o){"use strict";cc._RF.push(e,"fba99y+D7VOGJ69FlupcmLz","mEmitter");var n=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}();function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var s=t("events"),r=function(){function t(){i(this,t),this._emiter=new s,this._emiter.setMaxListeners(100)}return n(t,[{key:"emit",value:function(){var t;(t=this._emiter).emit.apply(t,arguments)}},{key:"registerEvent",value:function(t,e){this._emiter.on(t,e)}},{key:"registerOnce",value:function(t,e){this._emiter.once(t,e)}},{key:"removeEvent",value:function(t,e){this._emiter.removeListener(t,e)}},{key:"destroy",value:function(){this._emiter.removeAllListeners(),this._emiter=null,t.instance=null}}]),t}();r.instance=null,e.exports=r,cc._RF.pop()},{events:1}],ruleBtn:[function(t,e,o){"use strict";cc._RF.push(e,"fd8e5LHUBRBe4pky6zX+j0T","ruleBtn"),cc.Class({extends:cc.Component,properties:{onBtn:cc.Button,ofBtn:cc.Button},onLoad:function(){this.node.active=!1},onRuleBtn:function(){this.node.active=!0,this.node.getComponent(cc.PageView).scrollToPage(0,.01)},offRuleBtn:function(){this.node.active=!1}}),cc._RF.pop()},{}],temporaryBtn:[function(t,e,o){"use strict";cc._RF.push(e,"bfab7HsWnlAypY212bYyez8","temporaryBtn"),cc.Class({extends:cc.Component,properties:{},checkGameWin:function(){this.node.active=!1},start:function(){}}),cc._RF.pop()},{}]},{},["GameContainer","GameCotroller","Score","blockControl","keyBoard","mEmitter","ruleBtn","temporaryBtn"]);