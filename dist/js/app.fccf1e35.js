(function(){"use strict";var e={3732:function(e,t,r){var n=r(9963),i=r(6252);function o(e,t,r,n,o,a){const s=(0,i.up)("ConnectFour");return(0,i.wg)(),(0,i.j4)(s)}var a=r(3577);const s=e=>((0,i.dD)("data-v-3fdfd74a"),e=e(),(0,i.Cn)(),e),l={class:"options"},u=["disabled"],d=s((()=>(0,i._)("option",null,"Human",-1))),h=s((()=>(0,i._)("option",null,"AI",-1))),c=[d,h],p=["disabled"],m=["disabled"],g=s((()=>(0,i._)("option",null,"Human",-1))),v=s((()=>(0,i._)("option",null,"AI",-1))),f=[g,v],y={class:"loader-wrapper"},O={key:0,class:"throbber-loader"},b={style:{height:"2rem","padding-top":"0.5rem"}},w={class:"connect-four"},k=["onClick"];function M(e,t,r,o,s,d){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",l,[(0,i.wy)((0,i._)("select",{disabled:d.gameStarted,"onUpdate:modelValue":t[0]||(t[0]=e=>s.playerOneOption=e)},c,8,u),[[n.bM,s.playerOneOption]]),(0,i._)("button",{disabled:d.buttonDisabled,class:"button",role:"button",onClick:t[1]||(t[1]=(...e)=>d.startOrRestart&&d.startOrRestart(...e))},(0,a.zw)(d.buttonText),9,p),(0,i.wy)((0,i._)("select",{disabled:d.gameStarted,"onUpdate:modelValue":t[2]||(t[2]=e=>s.playerTwoOption=e)},f,8,m),[[n.bM,s.playerTwoOption]])]),(0,i._)("div",y,[s.isLoading?((0,i.wg)(),(0,i.iD)("div",O)):(0,i.kq)("",!0)]),(0,i._)("div",b,(0,a.zw)(d.victoryText),1),(0,i._)("div",w,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(s.game,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{onClick:e=>d.playerMove(t),key:t,id:"col-0",class:(0,a.C_)(["column",{y:d.validateYellow&&d.isValidMove(t)},{r:d.validateRed&&d.isValidMove(t)}])},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e,((e,r)=>((0,i.wg)(),(0,i.iD)("div",{key:r,class:(0,a.C_)([{red:1==s.game[t][r],yellow:2==s.game[t][r],"most-recent":s.mostRecent[0]==t&&s.mostRecent[1]==r},"circle"])},null,2)))),128))],10,k)))),128))])],64)}r(560);var _=r(2262);let S=new Worker("agent.js");var T={name:"Connect Four",data(){return{game:[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],redPlayer:!0,mostRecent:[-1,-1],playerOneOption:"Human",playerTwoOption:"AI",isLoading:!1}},methods:{makeMove(e){!this.gameOver&&this.isValidMove(e)?(this.placeTile(e),this.redPlayer=!this.redPlayer,this.redPlayer&&"Human"!=this.playerOneOption&&!this.gameOver?this.agentMove():this.redPlayer||"Human"==this.playerTwoOption||this.gameOver||this.agentMove()):this.restartWorker()},restartWorker(){S.terminate(),S=new Worker("agent.js"),this.loading=!1},playerMove(e){this.boardUnlocked&&this.makeMove(e)},resetGame(){this.redPlayer=!0,this.mostRecent[1]=-1,this.restartWorker(),this.game=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]},startOrRestart(){"Human"==this.playerOneOption||this.gameStarted?this.resetGame():this.agentMove()},getValidMoves(){const e=[];for(let t=0;t<7;t++)this.board.some((e=>0===e[t]))&&e.push(t);return e},agentMove(){let e=this.getValidMoves(),t=[e,(0,_.IU)(this.game),this.player,this.otherPlayer,4];console.log("Starting up the worker..."),S.postMessage(t),this.isLoading=!0,S.onmessage=e=>{console.log("Agent worker chose move: "+e.data),this.makeMove(e.data),this.isLoading=!1}},placeTile(e){if(0==this.game[e][0]){let t=this.getRowForMove(e);this.mostRecent[0]=e,this.mostRecent[1]=t,this.game[e][t]=this.player}},isValidMove(e){return this.game[e].includes(0)},getRowForMove(e){return 0==this.game[e][5]?5:0==this.game[e][4]?4:0==this.game[e][3]?3:0==this.game[e][2]?2:0==this.game[e][1]?1:0==this.game[e][0]?0:void 0},isWinningState(e){const t=`${e}${e}${e}${e}`;function r(e){for(const r of e)if(r.join("").includes(t))return!0;return!1}function n(e){return r(e[0].map(((t,r)=>e.map((e=>e[r])))))}function i(e){for(let r of[null,e=>[...e].map((e=>e.reverse()))]){let n=r?r([...e]):[...e],i=n.map(((e,t)=>e[t])).map(Number);if(i.join("").includes(t))return!0;for(let r=1;r<=e[0].length-3;r++)for(let e of[r,-r]){let r=n.map(((t,r)=>t[r+e])).map(Number);if(r.join("").includes(t))return!0}}return!1}return r(this.board)||n(this.board)||i(this.board)}},computed:{player(){return this.gameOver?0:this.redPlayer?1:2},otherPlayer(){return this.gameOver?0:this.redPlayer?2:1},redWon(){return this.isWinningState(1)},yellowWon(){return this.isWinningState(2)},victoryText(){return this.redWon?"Red wins!":this.yellowWon?"Yellow wins!":this.tied?"Cat's game!":""},gameStarted(){for(let e of this.game)if(e.includes(1)||e.includes(2))return!0;return!1},tied(){for(let e of this.game)if(e.includes(0))return!1;return!0},gameOver(){return this.redWon||this.yellowWon||this.tied},board(){return JSON.parse(JSON.stringify(this.game))},winningColor(){return this.redWon?"rgb(250, 86, 86);":"rgb(255, 255, 121)"},validateYellow(){return 2==this.player&&"Human"==this.playerTwoOption},validateRed(){return 1==this.player&&"Human"==this.playerOneOption},buttonDisabled(){return!this.gameStarted&&!this.aiStarts},aiStarts(){return"Human"!=this.playerOneOption},buttonText(){return this.aiStarts&&!this.gameStarted?"Start":"Restart"},boardUnlocked(){return!this.isLoading&&this.humanTurn},humanTurn(){return this.redPlayer?"Human"==this.playerOneOption:"Human"==this.playerTwoOption}}},R=r(3744);const W=(0,R.Z)(T,[["render",M],["__scopeId","data-v-3fdfd74a"]]);var H=W,C={name:"App",components:{ConnectFour:H}};const P=(0,R.Z)(C,[["render",o]]);var j=P;(0,n.ri)(j).mount("#app")}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}r.m=e,function(){var e=[];r.O=function(t,n,i,o){if(!n){var a=1/0;for(d=0;d<e.length;d++){n=e[d][0],i=e[d][1],o=e[d][2];for(var s=!0,l=0;l<n.length;l++)(!1&o||a>=o)&&Object.keys(r.O).every((function(e){return r.O[e](n[l])}))?n.splice(l--,1):(s=!1,o<a&&(a=o));if(s){e.splice(d--,1);var u=i();void 0!==u&&(t=u)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,i,o]}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,o,a=n[0],s=n[1],l=n[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(i in s)r.o(s,i)&&(r.m[i]=s[i]);if(l)var d=l(r)}for(t&&t(n);u<a.length;u++)o=a[u],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(d)},n=self["webpackChunkpyscript_vue"]=self["webpackChunkpyscript_vue"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(3732)}));n=r.O(n)})();
//# sourceMappingURL=app.fccf1e35.js.map