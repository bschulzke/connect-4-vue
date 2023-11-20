(function(){"use strict";var e={5952:function(e,t,r){var n=r(9963),i=r(6252);function a(e,t,r,n,a,o){const l=(0,i.up)("ConnectFour");return(0,i.wg)(),(0,i.j4)(l)}var o=r(3577);const l=e=>((0,i.dD)("data-v-44ce95d5"),e=e(),(0,i.Cn)(),e),s={class:"options"},d={class:"player-selection"},u={class:"dropdown-wrapper"},p=l((()=>(0,i._)("div",{class:"red-circle tile"},null,-1))),h=["disabled"],c=l((()=>(0,i._)("option",null,"Human",-1))),m=l((()=>(0,i._)("option",null,"AI",-1))),g=[c,m],v={key:0,class:"slider-wrapper"},y=l((()=>(0,i._)("label",{disabled:"true",for:"a1"},"Difficulty",-1))),f=["disabled"],w={class:"player-selection"},O={class:"dropdown-wrapper"},b=l((()=>(0,i._)("div",{class:"yellow-circle tile"},null,-1))),k=["disabled"],_=l((()=>(0,i._)("option",null,"Human",-1))),T=l((()=>(0,i._)("option",null,"AI",-1))),M=[_,T],S={key:0,class:"slider-wrapper"},D=l((()=>(0,i._)("label",{disabled:"true",for:"a1"},"Difficulty",-1))),H={class:"loader-wrapper"},R={key:0,class:"throbber-loader"},P={style:{height:"2rem","padding-top":"0.5rem"}},W={class:"connect-four"},j=["onClick"];function L(e,t,r,a,l,c){return(0,i.wg)(),(0,i.iD)("div",{style:(0,o.j5)({"--red":l.red,"--yellow":l.yellow,"--border":l.border,"--green":l.green,"--green-hover":l.greenHover,"--white":l.white})},[(0,i._)("div",s,[(0,i._)("div",d,[(0,i._)("div",u,[p,(0,i.wy)((0,i._)("select",{disabled:c.gameStarted&&!c.gameOver,"onUpdate:modelValue":t[0]||(t[0]=e=>l.playerOneOption=e)},g,8,h),[[n.bM,l.playerOneOption]])]),"AI"==l.playerOneOption?((0,i.wg)(),(0,i.iD)("div",v,[(0,i.wy)((0,i._)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>l.playerOneLevel=e),type:"range",id:"al",name:"a1",min:"1",max:"5"},null,512),[[n.nr,l.playerOneLevel]]),y])):(0,i.kq)("",!0)]),(0,i._)("button",{disabled:c.buttonDisabled,class:"button",role:"button",onClick:t[2]||(t[2]=(...e)=>c.startOrRestart&&c.startOrRestart(...e))},(0,o.zw)(c.buttonText),9,f),(0,i._)("div",w,[(0,i._)("div",O,[b,(0,i.wy)((0,i._)("select",{disabled:c.gameStarted&&!c.gameOver,"onUpdate:modelValue":t[3]||(t[3]=e=>l.playerTwoOption=e)},M,8,k),[[n.bM,l.playerTwoOption]])]),"AI"==l.playerTwoOption?((0,i.wg)(),(0,i.iD)("div",S,[(0,i.wy)((0,i._)("input",{"onUpdate:modelValue":t[4]||(t[4]=e=>l.playerTwoLevel=e),type:"range",id:"al",name:"a1",min:"1",max:"5"},null,512),[[n.nr,l.playerTwoLevel]]),D])):(0,i.kq)("",!0)])]),(0,i._)("div",H,[l.isLoading?((0,i.wg)(),(0,i.iD)("div",R)):(0,i.kq)("",!0)]),(0,i._)("div",P,(0,o.zw)(c.victoryText),1),(0,i._)("div",W,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.game,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{onClick:e=>c.playerMove(t),key:t,id:"col-0",class:(0,o.C_)(["column",{y:c.validateYellow&&c.isValidMove(t)},{r:c.validateRed&&c.isValidMove(t)}])},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e,((e,r)=>((0,i.wg)(),(0,i.iD)("div",{key:r,class:(0,o.C_)([{red:1==l.game[t][r],yellow:2==l.game[t][r],"most-recent":l.mostRecent[0]==t&&l.mostRecent[1]==r},"circle"])},null,2)))),128))],10,j)))),128))])],4)}r(560);var C=r(2262);let F=new Worker("agent.js");var x={name:"Connect Four",data(){return{game:[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],redPlayer:!0,mostRecent:[-1,-1],playerOneOption:"Human",playerTwoOption:"AI",isLoading:!1,playerOneLevel:3,playerTwoLevel:3,red:"rgb(250, 86, 86)",yellow:"rgb(255, 255, 121)",border:"rgb(157, 157, 157)",green:"#5df0ba",greenHover:"#50cc9f",white:"#FFFFFF"}},methods:{makeMove(e){!this.gameOver&&this.isValidMove(e)?(this.placeTile(e),this.redPlayer=!this.redPlayer,this.redPlayer&&"Human"!=this.playerOneOption&&!this.gameOver?this.agentMove():this.redPlayer||"Human"==this.playerTwoOption||this.gameOver||this.agentMove()):this.restartWorker()},restartWorker(){F.terminate(),F=new Worker("agent.js"),this.loading=!1},playerMove(e){this.boardUnlocked&&this.makeMove(e)},resetGame(){this.redPlayer=!0,this.mostRecent[1]=-1,this.restartWorker(),this.game=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]},startOrRestart(){"Human"==this.playerOneOption||this.gameStarted?this.resetGame():this.agentMove()},getValidMoves(){const e=[];for(let t=0;t<7;t++)this.board.some((e=>0===e[t]))&&e.push(t);return e},agentMove(){let e=this.getValidMoves(),t=[e,(0,C.IU)(this.game),this.player,this.otherPlayer,this.playerDepth];console.log("Starting up the worker..."),F.postMessage(t),this.isLoading=!0,F.onmessage=e=>{console.log("Agent worker chose move: "+e.data),this.makeMove(e.data),this.isLoading=!1}},placeTile(e){if(0==this.game[e][0]){let t=this.getRowForMove(e);this.mostRecent[0]=e,this.mostRecent[1]=t,this.game[e][t]=this.player}},isValidMove(e){return this.game[e].includes(0)},getRowForMove(e){return 0==this.game[e][5]?5:0==this.game[e][4]?4:0==this.game[e][3]?3:0==this.game[e][2]?2:0==this.game[e][1]?1:0==this.game[e][0]?0:void 0},isWinningState(e){const t=`${e}${e}${e}${e}`;function r(e){for(const r of e)if(r.join("").includes(t))return!0;return!1}function n(e){return r(e[0].map(((t,r)=>e.map((e=>e[r])))))}function i(e){for(let r of[null,e=>[...e].map((e=>e.reverse()))]){let n=r?r([...e]):[...e],i=n.map(((e,t)=>e[t])).map(Number);if(i.join("").includes(t))return!0;for(let r=1;r<=e[0].length-3;r++)for(let e of[r,-r]){let r=n.map(((t,r)=>t[r+e])).map(Number);if(r.join("").includes(t))return!0}}return!1}return r(this.board)||n(this.board)||i(this.board)}},computed:{player(){return this.gameOver?0:this.redPlayer?1:2},otherPlayer(){return this.gameOver?0:this.redPlayer?2:1},playerDepth(){return this.redPlayer?this.playerOneLevel:this.playerTwoLevel},redWon(){return this.isWinningState(1)},yellowWon(){return this.isWinningState(2)},victoryText(){return this.redWon?"Red wins!":this.yellowWon?"Yellow wins!":this.tied?"Cat's game!":""},gameStarted(){for(let e of this.game)if(e.includes(1)||e.includes(2))return!0;return!1},tied(){for(let e of this.game)if(e.includes(0))return!1;return!0},gameOver(){return this.redWon||this.yellowWon||this.tied},board(){return JSON.parse(JSON.stringify(this.game))},validateYellow(){return 2==this.player&&"Human"==this.playerTwoOption},validateRed(){return 1==this.player&&"Human"==this.playerOneOption},buttonDisabled(){return!this.gameStarted&&!this.aiStarts},aiStarts(){return"Human"!=this.playerOneOption},buttonText(){return this.aiStarts&&!this.gameStarted?"Start":"Restart"},boardUnlocked(){return!this.isLoading&&this.humanTurn},humanTurn(){return this.redPlayer?"Human"==this.playerOneOption:"Human"==this.playerTwoOption}}},V=r(3744);const A=(0,V.Z)(x,[["render",L],["__scopeId","data-v-44ce95d5"]]);var I=A,U={name:"App",components:{ConnectFour:I}};const Y=(0,V.Z)(U,[["render",a]]);var N=Y;(0,n.ri)(N).mount("#app")}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,r),a.exports}r.m=e,function(){var e=[];r.O=function(t,n,i,a){if(!n){var o=1/0;for(u=0;u<e.length;u++){n=e[u][0],i=e[u][1],a=e[u][2];for(var l=!0,s=0;s<n.length;s++)(!1&a||o>=a)&&Object.keys(r.O).every((function(e){return r.O[e](n[s])}))?n.splice(s--,1):(l=!1,a<o&&(o=a));if(l){e.splice(u--,1);var d=i();void 0!==d&&(t=d)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,i,a]}}(),function(){r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,n){var i,a,o=n[0],l=n[1],s=n[2],d=0;if(o.some((function(t){return 0!==e[t]}))){for(i in l)r.o(l,i)&&(r.m[i]=l[i]);if(s)var u=s(r)}for(t&&t(n);d<o.length;d++)a=o[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(u)},n=self["webpackChunkpyscript_vue"]=self["webpackChunkpyscript_vue"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(5952)}));n=r.O(n)})();
//# sourceMappingURL=app.7ccb4107.js.map