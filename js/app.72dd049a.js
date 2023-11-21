(function(){"use strict";var e={8381:function(e,r,t){var i=t(9963),a=t(6252);function o(e,r,t,i,o,n){const l=(0,a.up)("ConnectFour");return(0,a.wg)(),(0,a.j4)(l)}var n=t(3577);const l=e=>((0,a.dD)("data-v-376975b9"),e=e(),(0,a.Cn)(),e),s={key:0,class:"color-picker"},d={key:1,class:"color-picker"},c={class:"options"},u={class:"player-selection"},p={class:"dropdown-wrapper"},h=l((()=>(0,a._)("div",{class:"red-circle tile"},null,-1))),m=["disabled"],y=l((()=>(0,a._)("option",null,"Human",-1))),g=l((()=>(0,a._)("option",null,"AI",-1))),v=[y,g],w={key:0,class:"slider-wrapper"},f=l((()=>(0,a._)("label",{disabled:"true",for:"a1"},"Difficulty",-1))),b=["disabled"],O={class:"player-selection"},k={class:"dropdown-wrapper"},M=l((()=>(0,a._)("div",{class:"yellow-circle tile"},null,-1))),_=["disabled"],T=l((()=>(0,a._)("option",null,"Human",-1))),F=l((()=>(0,a._)("option",null,"AI",-1))),C=[T,F],P={key:0,class:"slider-wrapper"},D=l((()=>(0,a._)("label",{disabled:"true",for:"a1"},"Difficulty",-1))),S={class:"loader-wrapper"},x={key:0,class:"throbber-loader"},H={class:"victory-text"},R={class:"connect-four"},W=["onClick"];function j(e,r,t,o,l,y){return(0,a.wg)(),(0,a.iD)("div",{style:(0,n.j5)({"--red":y.red,"--yellow":y.yellow,"--border":y.border,"--green":y.green,"--green-hover":l.greenHover,"--white":l.white,"--overlay":l.overlay,"--grey":l.grey,"--text-color":y.textColor})},[l.playerOneColorPicker||l.playerTwoColorPicker?((0,a.wg)(),(0,a.iD)("div",{key:0,onClick:r[0]||(r[0]=e=>{l.playerOneColorPicker=!1,l.playerTwoColorPicker=!1}),class:"overlay"},[l.playerOneColorPicker?((0,a.wg)(),(0,a.iD)("div",s)):(0,a.kq)("",!0),l.playerTwoColorPicker?((0,a.wg)(),(0,a.iD)("div",d)):(0,a.kq)("",!0)])):(0,a.kq)("",!0),(0,a._)("div",c,[(0,a._)("div",u,[(0,a._)("div",p,[h,(0,a.wy)((0,a._)("select",{disabled:y.gameStarted&&!y.gameOver,"onUpdate:modelValue":r[1]||(r[1]=e=>l.playerOneOption=e)},v,8,m),[[i.bM,l.playerOneOption]])]),"AI"==l.playerOneOption?((0,a.wg)(),(0,a.iD)("div",w,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":r[2]||(r[2]=e=>l.playerOneLevel=e),type:"range",id:"al",name:"a1",min:"1",max:"5"},null,512),[[i.nr,l.playerOneLevel]]),f])):(0,a.kq)("",!0)]),(0,a._)("button",{disabled:y.buttonDisabled,class:"button",role:"button",onClick:r[3]||(r[3]=(...e)=>y.startOrRestart&&y.startOrRestart(...e))},(0,n.zw)(y.buttonText),9,b),(0,a._)("div",O,[(0,a._)("div",k,[M,(0,a.wy)((0,a._)("select",{disabled:y.gameStarted&&!y.gameOver,"onUpdate:modelValue":r[4]||(r[4]=e=>l.playerTwoOption=e)},C,8,_),[[i.bM,l.playerTwoOption]])]),"AI"==l.playerTwoOption?((0,a.wg)(),(0,a.iD)("div",P,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":r[5]||(r[5]=e=>l.playerTwoLevel=e),type:"range",id:"al",name:"a1",min:"1",max:"5"},null,512),[[i.nr,l.playerTwoLevel]]),D])):(0,a.kq)("",!0)])]),(0,a._)("div",S,[l.isLoading?((0,a.wg)(),(0,a.iD)("div",x)):(0,a.kq)("",!0)]),(0,a._)("div",H,(0,n.zw)(y.victoryText),1),(0,a._)("div",R,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.game,((e,r)=>((0,a.wg)(),(0,a.iD)("div",{onClick:e=>y.playerMove(r),key:r,id:"col-0",class:(0,n.C_)(["column",{y:y.validateYellow&&y.isValidMove(r)},{r:y.validateRed&&y.isValidMove(r)}])},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e,((e,t)=>((0,a.wg)(),(0,a.iD)("div",{key:t,class:(0,n.C_)([{red:1==l.game[r][t],yellow:2==l.game[r][t],"most-recent":l.mostRecent[0]==r&&l.mostRecent[1]==t},"circle"])},null,2)))),128))],10,W)))),128))])],4)}t(560);var L=t(2262);let V=new Worker("agent.js");var A={name:"Connect Four",data(){return{game:[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],redPlayer:!0,mostRecent:[-1,-1],playerOneOption:"Human",playerTwoOption:"AI",isLoading:!1,playerOneLevel:3,playerTwoLevel:3,playerOneColorPicker:!1,playerTwoColorPicker:!1,greenHover:"#50cc9f",white:"#FFFFFF",overlay:"rgba(0, 0, 0, 0.5)",grey:"rgb(157, 157, 157)"}},methods:{makeMove(e){!this.gameOver&&this.isValidMove(e)?(this.placeTile(e),this.redPlayer=!this.redPlayer,this.redPlayer&&"Human"!=this.playerOneOption&&!this.gameOver?this.agentMove():this.redPlayer||"Human"==this.playerTwoOption||this.gameOver||this.agentMove()):this.restartWorker()},restartWorker(){V.terminate(),V=new Worker("agent.js"),this.loading=!1},playerMove(e){this.boardUnlocked&&this.makeMove(e)},resetGame(){this.redPlayer=!0,this.mostRecent[1]=-1,this.restartWorker(),this.game=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]},startOrRestart(){"Human"==this.playerOneOption||this.gameStarted?this.resetGame():this.agentMove()},getValidMoves(){const e=[];for(let r=0;r<7;r++)this.board.some((e=>0===e[r]))&&e.push(r);return e},agentMove(){let e=this.getValidMoves(),r=[e,(0,L.IU)(this.game),this.player,this.otherPlayer,this.playerDepth];console.log("Starting up the worker..."),V.postMessage(r),this.isLoading=!0,V.onmessage=e=>{console.log("Agent worker chose move: "+e.data),this.makeMove(e.data),this.isLoading=!1}},placeTile(e){if(0==this.game[e][0]){let r=this.getRowForMove(e);this.mostRecent[0]=e,this.mostRecent[1]=r,this.game[e][r]=this.player}},isValidMove(e){return this.game[e].includes(0)},getRowForMove(e){return 0==this.game[e][5]?5:0==this.game[e][4]?4:0==this.game[e][3]?3:0==this.game[e][2]?2:0==this.game[e][1]?1:0==this.game[e][0]?0:void 0},isWinningState(e){const r=`${e}${e}${e}${e}`;function t(e){for(const t of e)if(t.join("").includes(r))return!0;return!1}function i(e){return t(e[0].map(((r,t)=>e.map((e=>e[t])))))}function a(e){for(let t of[null,e=>[...e].map((e=>e.reverse()))]){let i=t?t([...e]):[...e],a=i.map(((e,r)=>e[r])).map(Number);if(a.join("").includes(r))return!0;for(let t=1;t<=e[0].length-3;t++)for(let e of[t,-t]){let t=i.map(((r,t)=>r[t+e])).map(Number);if(t.join("").includes(r))return!0}}return!1}return t(this.board)||i(this.board)||a(this.board)}},computed:{player(){return this.gameOver?0:this.redPlayer?1:2},otherPlayer(){return this.gameOver?0:this.redPlayer?2:1},playerDepth(){return this.redPlayer?this.playerOneLevel:this.playerTwoLevel},redWon(){return this.isWinningState(1)},yellowWon(){return this.isWinningState(2)},victoryText(){return this.redWon?"Red wins!":this.yellowWon?"Yellow wins!":this.tied?"Cat's game!":""},gameStarted(){for(let e of this.game)if(e.includes(1)||e.includes(2))return!0;return!1},tied(){for(let e of this.game)if(e.includes(0))return!1;return!0},gameOver(){return this.redWon||this.yellowWon||this.tied},board(){return JSON.parse(JSON.stringify(this.game))},validateYellow(){return 2==this.player&&"Human"==this.playerTwoOption},validateRed(){return 1==this.player&&"Human"==this.playerOneOption},buttonDisabled(){return!this.gameStarted&&!this.aiStarts},aiStarts(){return"Human"!=this.playerOneOption},buttonText(){return this.aiStarts&&!this.gameStarted?"Start":"Restart"},boardUnlocked(){return!this.isLoading&&this.humanTurn},humanTurn(){return this.redPlayer?"Human"==this.playerOneOption:"Human"==this.playerTwoOption},red(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"rgb(255, 49, 49)":"rgb(250, 86, 86)"},yellow(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"rgb(199, 255, 79)":"rgb(255, 255, 121)"},green(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"rgb(56, 167, 126)":"#5df0ba"},border(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"#FFFFFF":"rgb(157, 157, 157)"},textColor(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"#FFFFFF":"black"}}},I=t(3744);const U=(0,I.Z)(A,[["render",j],["__scopeId","data-v-376975b9"]]);var q=U,Y={name:"App",components:{ConnectFour:q}};const N=(0,I.Z)(Y,[["render",o]]);var $=N;(0,i.ri)($).mount("#app")}},r={};function t(i){var a=r[i];if(void 0!==a)return a.exports;var o=r[i]={exports:{}};return e[i].call(o.exports,o,o.exports,t),o.exports}t.m=e,function(){var e=[];t.O=function(r,i,a,o){if(!i){var n=1/0;for(c=0;c<e.length;c++){i=e[c][0],a=e[c][1],o=e[c][2];for(var l=!0,s=0;s<i.length;s++)(!1&o||n>=o)&&Object.keys(t.O).every((function(e){return t.O[e](i[s])}))?i.splice(s--,1):(l=!1,o<n&&(n=o));if(l){e.splice(c--,1);var d=a();void 0!==d&&(r=d)}}return r}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[i,a,o]}}(),function(){t.d=function(e,r){for(var i in r)t.o(r,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:r[i]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)}}(),function(){var e={143:0};t.O.j=function(r){return 0===e[r]};var r=function(r,i){var a,o,n=i[0],l=i[1],s=i[2],d=0;if(n.some((function(r){return 0!==e[r]}))){for(a in l)t.o(l,a)&&(t.m[a]=l[a]);if(s)var c=s(t)}for(r&&r(i);d<n.length;d++)o=n[d],t.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return t.O(c)},i=self["webpackChunkpyscript_vue"]=self["webpackChunkpyscript_vue"]||[];i.forEach(r.bind(null,0)),i.push=r.bind(null,i.push.bind(i))}();var i=t.O(void 0,[998],(function(){return t(8381)}));i=t.O(i)})();
//# sourceMappingURL=app.72dd049a.js.map