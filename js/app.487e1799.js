(function(){"use strict";var e={933:function(e,t,r){var o=r(9963),i=r(6252);function n(e,t,r,o,n,a){const l=(0,i.up)("ConnectFour");return(0,i.wg)(),(0,i.j4)(l)}var a=r(3577);const l=e=>((0,i.dD)("data-v-75d931c3"),e=e(),(0,i.Cn)(),e),s={href:"https://github.com/bschulzke/connect-4-vue",target:"_blank"},d=["onClick"],c=["onClick"],p={class:"options"},h={class:"player-selection"},u={class:"dropdown-wrapper"},y=["disabled"],g=l((()=>(0,i._)("option",null,"Human",-1))),m=l((()=>(0,i._)("option",null,"AI",-1))),v=[g,m],w={key:0,class:"slider-wrapper"},f=["disabled"],b=l((()=>(0,i._)("label",{disabled:"true",for:"a1"},"Difficulty",-1))),O=["disabled"],k={class:"player-selection"},C={class:"dropdown-wrapper"},T=["disabled"],D=l((()=>(0,i._)("option",null,"Human",-1))),P=l((()=>(0,i._)("option",null,"AI",-1))),_=[D,P],M={key:0,class:"slider-wrapper"},F=["disabled"],H=l((()=>(0,i._)("label",{disabled:"true",for:"a1"},"Difficulty",-1))),S={class:"loader-wrapper"},W={key:0,class:"throbber-loader"},x={class:"victory-text"},L={class:"connect-four"},j=["onClick"];function R(e,t,r,n,l,g){const m=(0,i.up)("font-awesome-icon");return(0,i.wg)(),(0,i.iD)("div",{style:(0,a.j5)({"--p1":l.playerOneColor,"--yellow":l.playerTwoColor,"--border":g.border,"--green":g.green,"--green-hover":l.greenHover,"--white":l.white,"--overlay":l.overlay,"--grey":l.grey,"--text-color":g.textColor})},[(0,i.Wm)(m,{disabled:!g.humanTurn,role:"button",onClick:g.getHint,icon:"fa-solid fa-lightbulb"},null,8,["disabled","onClick"]),(0,i._)("a",s,[(0,i.Wm)(m,{icon:"fa-brands fa-github"})]),l.playerOneColorPicker||l.playerTwoColorPicker?((0,i.wg)(),(0,i.iD)("div",{key:0,onClick:t[4]||(t[4]=e=>{l.playerOneColorPicker=!1,l.playerTwoColorPicker=!1}),class:"overlay"},[l.playerOneColorPicker?((0,i.wg)(),(0,i.iD)("div",{key:0,onClick:t[1]||(t[1]=(0,o.iM)((()=>{}),["prevent","stop"])),class:"color-picker"},[(0,i.Wm)(m,{onClick:t[0]||(t[0]=e=>l.playerOneColorPicker=!1),icon:"fa-solid fa-x"}),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(g.p1ColorOptions,(e=>((0,i.wg)(),(0,i.iD)("div",{key:e,class:(0,a.C_)(["big-tile",{"green-border":e==l.playerOneColor}]),style:(0,a.j5)({"background-color":e}),onClick:t=>l.playerOneColor=e},null,14,d)))),128))])):(0,i.kq)("",!0),l.playerTwoColorPicker?((0,i.wg)(),(0,i.iD)("div",{key:1,onClick:t[3]||(t[3]=(0,o.iM)((()=>{}),["prevent","stop"])),class:"color-picker"},[(0,i.Wm)(m,{onClick:t[2]||(t[2]=e=>l.playerTwoColorPicker=!1),icon:"fa-solid fa-x"}),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(g.p2ColorOptions,(e=>((0,i.wg)(),(0,i.iD)("div",{key:e,class:(0,a.C_)(["big-tile",{"green-border":e==l.playerTwoColor}]),style:(0,a.j5)({"background-color":e}),onClick:t=>l.playerTwoColor=e},null,14,c)))),128))])):(0,i.kq)("",!0)])):(0,i.kq)("",!0),(0,i._)("div",p,[(0,i._)("div",h,[(0,i._)("div",u,[(0,i._)("div",{onClick:t[5]||(t[5]=e=>l.playerOneColorPicker=!0),class:"red-circle small-tile"}),(0,i.wy)((0,i._)("select",{disabled:g.optionsDisabled,"onUpdate:modelValue":t[6]||(t[6]=e=>l.playerOneOption=e)},v,8,y),[[o.bM,l.playerOneOption]])]),"AI"==l.playerOneOption?((0,i.wg)(),(0,i.iD)("div",w,[(0,i.wy)((0,i._)("input",{disabled:g.optionsDisabled,"onUpdate:modelValue":t[7]||(t[7]=e=>l.playerOneLevel=e),type:"range",id:"al",name:"a1",min:"0",max:"5"},null,8,f),[[o.nr,l.playerOneLevel]]),b])):(0,i.kq)("",!0)]),(0,i._)("button",{disabled:g.buttonDisabled,class:"button",role:"button",onClick:t[8]||(t[8]=(...e)=>g.startOrRestart&&g.startOrRestart(...e))},(0,a.zw)(g.buttonText),9,O),(0,i._)("div",k,[(0,i._)("div",C,[(0,i._)("div",{onClick:t[9]||(t[9]=e=>l.playerTwoColorPicker=!0),class:"yellow-circle small-tile"}),(0,i.wy)((0,i._)("select",{disabled:g.optionsDisabled,"onUpdate:modelValue":t[10]||(t[10]=e=>l.playerTwoOption=e)},_,8,T),[[o.bM,l.playerTwoOption]])]),"AI"==l.playerTwoOption?((0,i.wg)(),(0,i.iD)("div",M,[(0,i.wy)((0,i._)("input",{disabled:g.optionsDisabled,"onUpdate:modelValue":t[11]||(t[11]=e=>l.playerTwoLevel=e),type:"range",id:"al",name:"a1",min:"0",max:"5"},null,8,F),[[o.nr,l.playerTwoLevel]]),H])):(0,i.kq)("",!0)])]),(0,i._)("div",S,[l.isLoading?((0,i.wg)(),(0,i.iD)("div",W)):(0,i.kq)("",!0)]),(0,i._)("div",x,(0,a.zw)(g.victoryText),1),(0,i._)("div",L,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(l.game,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{onClick:e=>g.playerMove(t),key:t,id:"col-0",class:(0,a.C_)(["column",{y:g.validateYellow&&g.isValidMove(t)},{r:g.validateRed&&g.isValidMove(t)},{hint:l.hint==t}])},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e,((e,r)=>((0,i.wg)(),(0,i.iD)("div",{key:r,class:(0,a.C_)([{red:1==l.game[t][r],yellow:2==l.game[t][r],"green-border":l.mostRecent[0]==t&&l.mostRecent[1]==r},"circle"])},null,2)))),128))],10,j)))),128))])],4)}r(560);var I=r(7810),N=r(2262);let V=new Worker("agent.js");var A={name:"Connect Four",components:{FontAwesomeIcon:I.GN},data(){return{game:[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],redPlayer:!0,mostRecent:[-1,-1],playerOneOption:"Human",playerTwoOption:"AI",isLoading:!1,playerOneLevel:1,playerTwoLevel:1,playerOneColorPicker:!1,playerTwoColorPicker:!1,greenHover:"#50cc9f",white:"#FFFFFF",overlay:"rgba(0, 0, 0, 0.5)",grey:"rgb(157, 157, 157)",playerOneColor:"rgb(255, 45, 45)",playerTwoColor:"rgb(255, 255, 121)",colorOptions:["rgb(255, 45, 45)","rgb(255, 255, 121)","#E6E6FA","#f88379","#9FE2BF","#89cff0"],hint:null}},methods:{makeMove(e){!this.gameOver&&this.isValidMove(e)?(this.placeTile(e),this.redPlayer=!this.redPlayer,this.redPlayer&&"Human"!=this.playerOneOption&&!this.gameOver?this.agentMove():this.redPlayer||"Human"==this.playerTwoOption||this.gameOver||this.agentMove()):this.restartWorker(),this.hint=null},restartWorker(){V.terminate(),V=new Worker("agent.js"),this.loading=!1},playerMove(e){this.boardUnlocked&&this.makeMove(e)},getHint(){let e=this.getValidMoves();console.log("Hint depth: "+this.hintDepth);let t=[e,(0,N.IU)(this.game),this.player,this.otherPlayer,this.hintDepth];console.log("Starting up the worker to get a hint..."),V.postMessage(t),this.isLoading=!0,V.onmessage=e=>{console.log("Hint is column: "+e.data),this.hint=e.data,this.isLoading=!1}},resetGame(){this.redPlayer=!0,this.mostRecent[1]=-1,this.restartWorker(),this.game=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]},startOrRestart(){"Human"==this.playerOneOption||this.gameStarted?this.resetGame():this.agentMove(),this.hint=null},getValidMoves(){const e=[];for(let t=0;t<7;t++)this.board.some((e=>0===e[t]))&&e.push(t);return e},agentMove(){let e=this.getValidMoves(),t=[e,(0,N.IU)(this.game),this.player,this.otherPlayer,this.playerDepth];console.log("Starting up the worker..."),V.postMessage(t),this.isLoading=!0,V.onmessage=e=>{console.log("Agent worker chose move: "+e.data),this.makeMove(e.data),this.isLoading=!1}},placeTile(e){if(0==this.game[e][0]){let t=this.getRowForMove(e);this.mostRecent[0]=e,this.mostRecent[1]=t,this.game[e][t]=this.player}},isValidMove(e){return this.game[e].includes(0)},getRowForMove(e){return 0==this.game[e][5]?5:0==this.game[e][4]?4:0==this.game[e][3]?3:0==this.game[e][2]?2:0==this.game[e][1]?1:0==this.game[e][0]?0:void 0},isWinningState(e){const t=`${e}${e}${e}${e}`;function r(e){for(const r of e)if(r.join("").includes(t))return!0;return!1}function o(e){return r(e[0].map(((t,r)=>e.map((e=>e[r])))))}function i(e){for(let r of[null,e=>[...e].map((e=>e.reverse()))]){let o=r?r([...e]):[...e],i=o.map(((e,t)=>e[t])).map(Number);if(i.join("").includes(t))return!0;for(let r=1;r<=e[0].length-3;r++)for(let e of[r,-r]){let r=o.map(((t,r)=>t[r+e])).map(Number);if(r.join("").includes(t))return!0}}return!1}return r(this.board)||o(this.board)||i(this.board)}},computed:{player(){return this.gameOver?0:this.redPlayer?1:2},otherPlayer(){return this.gameOver?0:this.redPlayer?2:1},playerDepth(){return this.redPlayer?this.playerOneLevel:this.playerTwoLevel},otherPlayerDepth(){return this.redPlayer?Number(this.playerTwoLevel):Number(this.playerOneLevel)},hintDepth(){let e=Number(this.otherPlayerDepth);return e<1&&(e=1),e<5&&(e+=2),e},redWon(){return this.isWinningState(1)},yellowWon(){return this.isWinningState(2)},victoryText(){return this.redWon?"Player One wins!":this.yellowWon?"Player Two wins!":this.tied?"Cat's game!":""},gameStarted(){for(let e of this.game)if(e.includes(1)||e.includes(2))return!0;return!1},tied(){for(let e of this.game)if(e.includes(0))return!1;return!0},gameOver(){return this.redWon||this.yellowWon||this.tied},board(){return JSON.parse(JSON.stringify(this.game))},validateYellow(){return 2==this.player&&"Human"==this.playerTwoOption},validateRed(){return 1==this.player&&"Human"==this.playerOneOption},buttonDisabled(){return!this.gameStarted&&!this.aiStarts},aiStarts(){return"Human"!=this.playerOneOption},buttonText(){return this.aiStarts&&!this.gameStarted?"Start":"Restart"},boardUnlocked(){return!this.isLoading&&this.humanTurn},humanTurn(){return!this.gameStarted||(this.redPlayer?"Human"==this.playerOneOption:"Human"==this.playerTwoOption)},optionsDisabled(){return this.gameStarted&&!this.gameOver},green(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"rgb(56, 167, 126)":"#5df0ba"},border(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"#FFFFFF":"rgb(157, 157, 157)"},textColor(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"#FFFFFF":"black"},p1ColorOptions(){let e=JSON.parse(JSON.stringify(this.colorOptions));return e.filter((e=>e!==this.playerTwoColor))},p2ColorOptions(){let e=JSON.parse(JSON.stringify(this.colorOptions));return e.filter((e=>e!==this.playerOneColor))}}},U=r(3744);const q=(0,U.Z)(A,[["render",R],["__scopeId","data-v-75d931c3"]]);var J=q,Y=r(3636),E=r(9417),G=r(1417);Y.vI.add(E.EOp),Y.vI.add(E.X8G),Y.vI.add(G.zhw);var z={name:"App",components:{ConnectFour:J,FontAwesomeIcon:I.GN}};const K=(0,U.Z)(z,[["render",n]]);var $=K;(0,o.ri)($).mount("#app")}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,r),n.exports}r.m=e,function(){var e=[];r.O=function(t,o,i,n){if(!o){var a=1/0;for(c=0;c<e.length;c++){o=e[c][0],i=e[c][1],n=e[c][2];for(var l=!0,s=0;s<o.length;s++)(!1&n||a>=n)&&Object.keys(r.O).every((function(e){return r.O[e](o[s])}))?o.splice(s--,1):(l=!1,n<a&&(a=n));if(l){e.splice(c--,1);var d=i();void 0!==d&&(t=d)}}return t}n=n||0;for(var c=e.length;c>0&&e[c-1][2]>n;c--)e[c]=e[c-1];e[c]=[o,i,n]}}(),function(){r.d=function(e,t){for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,o){var i,n,a=o[0],l=o[1],s=o[2],d=0;if(a.some((function(t){return 0!==e[t]}))){for(i in l)r.o(l,i)&&(r.m[i]=l[i]);if(s)var c=s(r)}for(t&&t(o);d<a.length;d++)n=a[d],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(c)},o=self["webpackChunkpyscript_vue"]=self["webpackChunkpyscript_vue"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=r.O(void 0,[998],(function(){return r(933)}));o=r.O(o)})();
//# sourceMappingURL=app.487e1799.js.map