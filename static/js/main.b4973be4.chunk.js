(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{212:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(18),c=n.n(i),o=(n(96),n(90)),u=(n(97),n(80)),l=n.n(u),d=n(81),s=n.n(d),f=n(76),m=n.n(f),p=n(82),y=n.n(p),v=n(79),E=n.n(v),g=n(78),h=n.n(g),I={o:"android",x:"directions_walk",mounted:"direction_bike",grass:"crop_free",tree:"nature",water:"waves",rock:"landscape",dead:"airline_seat_flat",farm:"home",crop:"local_florist",planted:"minimize"},b=function(e){return e.hp<1?I.dead:I[e.type]||"crop_free"},T=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=arguments.length>1?arguments[1]:void 0,n=[],a=0;a<e;a++){n[a]=[];for(var r=0;r<e;r++)n[a][r]=x(t,r,a)}return n},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0;return e.find(function(e){return e.x===t&&e.y===n})||{x:t,y:n,type:"."}};function O(e){var t,n=e.elem,i=Object(a.useContext)(Ge).dispatch;return r.a.createElement(m.a,null,r.a.createElement(h.a,{onClick:(t=n.id,function(){i({type:"SET_SELECTED",payload:t})})},r.a.createElement(E.a,null,b(n))))}function C(){var e=Object(a.useContext)(Ge).state.items,t=T(10,e);return r.a.createElement("div",{className:"PlayingField"},r.a.createElement(l.a,{padding:"none"},r.a.createElement(s.a,null,t.map(function(e){return r.a.createElement(y.a,{key:e[0].y},e.map(function(e){return r.a.createElement(O,{key:"x"+e.x+"y"+e.y,elem:e})}))}))))}var j=n(26),A=n.n(j),_=n(27),k=n.n(_),w=n(17),N=n.n(w),R=n(9),P=["human","ai"],D=function(){console.log("generate state");var e=F();return{turn:0,activePlayerId:P[0],items:e,selectedId:e[0].id,winner:void 0,events:[{type:"ENEMY_SPOTTED",itemId:e[1].id},{type:"GAME_STARTED"}],behaviors:{},training:!1}},M=0,S=function(){return++M},F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,t=[{id:S(),hp:5,type:"x",playerId:"human",ap:1},{id:S(),hp:5,type:"o",playerId:"ai",ap:1}],n=[{id:S(),type:"tree"},{id:S(),type:"tree"},{id:S(),type:"tree"},{id:S(),type:"tree"},{id:S(),type:"tree"},{id:S(),type:"tree"},{id:S(),type:"rock"},{id:S(),type:"rock"},{id:S(),type:"rock"},{id:S(),type:"water"},{id:S(),type:"water"},{id:S(),type:"water"}],a=B(e);return a(t).concat(a(n.concat(function(e){for(var t=[],n=0;n<e;n++)t.push({id:S(),type:"grass"});return t}(e*e-n.length))))},B=function(e){return function(t){var n=L(e);return t.map(function(e){return Object(R.a)({},e,n.shift())})}},L=function(e){var t=Array.from(Array(e).keys()),n=t.map(function(e){return t.map(function(t){return{x:e,y:t}})}).flat();return V(n),n},V=function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),a=[e[n],e[t]];e[t]=a[0],e[n]=a[1]}},H=function(e,t){return t.playerId===e},U=function(e){return K(e.selectedId,e.items)},K=function(e,t){return t.find(function(t){return t.id===e})},W=function(e,t){return t.filter(function(e){return function(t){return H(e,t)}}(e))},z=function(e){return function(t){return function(n){return G(function(e){return function(t){var n=t.x,a=t.y;return e.filter(function(e){return e.x===n&&e.y===a})}}(e)(t))(n)}}},G=function(e){return function(t){return e.find(function(e){return e.type===t})}},J=function(e,t){return t.filter(function(t){return t.id!==e})},Y=function(e){return P.filter(function(t){return e.activePlayerId!==t}).flatMap(function(t){return W(t,e.items)})},$=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Math.abs(t.x-e.x)+Math.abs(t.y-e.y)<=n},q=function(e,t){var n=t.items.map(Z(e));return Object(R.a)({},t,{items:n})},Q=function(e){return function(t){return function(n){return n.map(X(e)(t))}}},X=function(e){return function(t){return function(n){return e(n)?Object(R.a)({},n,t):n}}},Z=function(e){return X(function(t){return e.id===t.id})(e)},ee=function(e){var t=U(e);return t.ap>0&&t.playerId===e.activePlayerId},te=function(e){return e.items.some(function(t){return"farm"===t.type&&t.builderId===e.selectedId})},ne=function(e,t){return function(e,t){var n=K(t.selectedId,t.items).action;return n&&e===n.type}(e,t)?"primary":"default"};function ae(){var e,t=Object(a.useContext)(Ge),n=t.state,i=t.dispatch,c=n.items,o=n.activePlayerId;return r.a.createElement(N.a,{onClick:(e=o,function(){W(e,c).filter(function(e){return e.action&&e.ap}).forEach(function(e){return e.condition(n)?i(e.action):void 0}),i({type:"END_TURN",payload:e})})},"Turn(",o,"): ",n.turn)}function re(e){var t=e.targetId,n=Object(a.useContext)(Ge),i=n.state,c=n.dispatch,o=ee;if(!o(i))return null;var u=ne("ATTACK",i);return r.a.createElement(N.a,{color:u,onClick:function(){c({type:"ATTACK",payload:{agentId:i.selectedId,targetId:t,condition:o}})}},"Attack Enemy")}function ie(e){var t=e.areaId,n=Object(a.useContext)(Ge),i=n.state,c=n.dispatch,o=ee;if(!o(i))return null;var u=ne("DEFEND",i);return r.a.createElement(N.a,{color:u,onClick:function(){c({type:"DEFEND",payload:{agentId:i.selectedId,areaId:t,condition:o}})}},"Defend Area ",t)}function ce(){var e=Object(a.useContext)(Ge),t=e.state,n=e.dispatch,i=function(e){return ee(e)&&!te(e)&&z(e.items)(U(e))("grass")};if(!i(t))return null;return r.a.createElement(N.a,{color:"default",onClick:function(){n({type:"BUILD_FARM",payload:{agentId:t.selectedId,condition:i}})}},"Build farm")}function oe(){var e=Object(a.useContext)(Ge),t=e.state,n=e.dispatch,i=function(e){return ee(e)&&te(e)&&z(e.items)(U(e))("grass")};if(!i(t))return null;return r.a.createElement(N.a,{color:"default",onClick:function(){n({type:"PLANT_CROP",payload:{agentId:t.selectedId,condition:i}})}},"PlantCrop")}function ue(){var e=Object(a.useContext)(Ge),t=e.state,n=e.dispatch,i=U(t),c=z(t.items)(i)("crop"),o=function(e){var t=U(e),n=z(e.items)(t)("crop");return ee(e)&&!!n};if(!o(t))return null;return r.a.createElement(N.a,{color:"default",onClick:function(){n({type:"HARVEST_CROP",payload:{agentId:t.selectedId,targetId:c.id,condition:o}})}},"HarvestCrop")}function le(){var e=Object(a.useContext)(Ge).state;return r.a.createElement("div",null,r.a.createElement(A.a,null,r.a.createElement(k.a,null,r.a.createElement(ae,null),Y(e).map(function(e){return r.a.createElement(re,{key:e.id,targetId:e.id})}),r.a.createElement(ie,{areaId:5}),r.a.createElement(ce,null),r.a.createElement(oe,null),r.a.createElement(ue,null))))}var de=n(16),se=n.n(de),fe=n(83),me=n.n(fe);function pe(){var e=Object(a.useContext)(Ge).state,t=e.selectedId,n=e.items;if(void 0===t)return null;var i=K(t,n),c=i.id,o=i.playerId,u=i.x,l=i.y,d=i.hp,s=i.ap,f=i.type,m=d/5*100,p={type:"DEFAULT_EVENT",itemId:t};return r.a.createElement(A.a,null,r.a.createElement(k.a,null,r.a.createElement(se.a,null,"id:",c),r.a.createElement(se.a,null,"player:",o),r.a.createElement(se.a,null,"x:",u),r.a.createElement(se.a,null,"y:",l),r.a.createElement(se.a,null,"hp:",d),r.a.createElement(se.a,null,"ap:",s),r.a.createElement(se.a,null,"type:",f),r.a.createElement(me.a,{variant:"determinate",value:m}),r.a.createElement(ye,{event:p}),r.a.createElement(ve,null)))}function ye(e){var t=e.event,n=Object(a.useContext)(Ge),i=n.state,c=n.dispatch;if(void 0===i.selectedId)return null;return r.a.createElement(N.a,{color:"default",onClick:function(){c({type:"TRAIN_EVENT",payload:{agentId:t.itemId,event:t}})}},"Train Default Behavior")}function ve(){var e=Object(a.useContext)(Ge),t=e.state,n=e.dispatch;if(void 0===t.selectedId)return null;return r.a.createElement(N.a,{color:"default",onClick:function(){n({type:"FINISH_TRAIN_EVENT",payload:{agentId:t.selectedId}})}},"Finish train Default Behavior")}function Ee(e){var t=e.event,n=Object(a.useContext)(Ge).state.items,i=t.itemId?K(t.itemId,n):{},c=i.x,o=i.y,u=i.type;return r.a.createElement(A.a,null,r.a.createElement(k.a,null,r.a.createElement(se.a,null,"type:",t.type),r.a.createElement(se.a,null,"x:",c),r.a.createElement(se.a,null,"y:",o),r.a.createElement(se.a,null,"itemType:",u)))}function ge(){return Object(a.useContext)(Ge).state.events.map(function(e,t){return r.a.createElement(Ee,{key:"event"+t,event:e})})}function he(){return r.a.createElement("div",null,r.a.createElement(pe,null),r.a.createElement(ge,null))}var Ie=n(89),be=n.n(Ie),Te=n(28),xe=n.n(Te),Oe=n(84),Ce=n.n(Oe),je=n(88),Ae=n.n(je),_e=n(86),ke=n.n(_e),we=n(87),Ne=n.n(we),Re=n(85),Pe=n.n(Re);function De(){var e=Object(a.useContext)(Ge),t=e.state,n=e.dispatch;return r.a.createElement("div",null,r.a.createElement(Ce.a,{open:!!t.winner,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},r.a.createElement(Pe.a,{id:"alert-dialog-title"},"The winner is ".concat(t.winner,"!")),r.a.createElement(ke.a,null,r.a.createElement(Ne.a,{id:"alert-dialog-description"},"Play another round?")),r.a.createElement(Ae.a,null,r.a.createElement(N.a,{onClick:function(){return n({type:"RESTART",payload:void 0})},color:"primary"},"Yes"))))}var Me=n(25),Se=n(46),Fe=function(e){return function(t){var n=e.x-t.x,a=e.y-t.y;return Math.abs(n)>Math.abs(a)?{x:Math.sign(n),y:0}:{x:0,y:Math.sign(a)}}},Be=function(e,t){var n=t(e),a=n.x,r=n.y;return Object(R.a)({},e,{x:e.x+a,y:e.y+r})},Le=function(e){var t=P.findIndex(function(t){return t===e});return P[(t+1)%P.length]},Ve=function(e){return He("ai",e.items)?"human":He("human",e.items)?"ai":void 0},He=function(e,t){return W(e,t).every(function(e){return e.hp<=0})},Ue=function(e,t){var n=e.payload.condition,a=Object(R.a)({},K(e.payload.agentId,t.items),{ap:0,action:e,condition:n});if(a.training){var r={action:e,condition:n};a.behaviorTraining.conditionalActions.push(r)}return q(a,t)},Ke=function(e,t,n){var a=K(e,n.items),r=z(n.items)(a)("grass"),i=J(r.id,n.items),c={id:S(),builderId:e,x:a.x,y:a.y,type:t,createdTurn:n.turn};return Object(R.a)({},n,{items:[].concat(Object(Se.a)(i),[c])})},We=function(e){return function(t){return"planted"===t.type&&t.createdTurn+5<=e}},ze=function(e,t){console.log("Action"),console.log(t),console.log(e);var n,a,r=t.payload;switch(t.type){case"END_TURN":var i=Q(function(e){return H(r,e)})({ap:1})(e.items),c=i.filter(We(e.turn)),o=Q(We(e.turn))({type:"crop"})(c),u=function(e){return function(t){return e.map(function(e){return t.find(function(t){return t.id===e.id})||e})}}(i)(o),l=o.map(function(e){return{type:"CROP_GROWN",itemId:e.id}});return Object(R.a)({},e,{items:u,turn:(n=e.turn,a=e.activePlayerId,P.slice(-1)[0]===a?n+1:n),activePlayerId:Le(e.activePlayerId),winner:Ve(e),events:l});case"RESTART":return D();case"SET_SELECTED":return Object(R.a)({},e,{selectedId:r});case"ATTACK":var d=r.agentId,s=r.targetId,f=Ue(t,e),m=K(d,f.items),p=K(s,f.items);return $(m,p)?(console.log("target in range!"),q(Object(R.a)({},p,{hp:p.hp-1}),f)):(console.log("target not in range!"),q(Be(m,Fe(p)),f));case"DEFEND":var y=r.agentId,v=r.areaId,E=Ue(t,e),g=K(y,E.items),h=K(v,E.items),I=Y(e).find(function(e){return $(g,e)});return I?(console.log("target in range!"),q(Object(R.a)({},I,{hp:I.hp-1}),E)):(console.log("target not in range!"),q(Be(g,Fe(h)),E));case"BUILD_FARM":return Ke(r.agentId,"farm",Ue(t,e));case"PLANT_CROP":return Ke(r.agentId,"planted",Ue(t,e));case"HARVEST_CROP":var b=Ue(t,e),T=K(r.targetId,e.items),x=T.x,O=T.y,C={id:S(),x:x,y:O,type:"grass"};return Object(R.a)({},b,{items:[].concat(Object(Se.a)(J(r.targetId,b.items)),[C])});case"TRAIN_EVENT":var j=r.agentId,A=r.event;return q({id:j,behaviorTraining:{name:"farmer",eventType:A.type,conditionalActions:[]},training:!0},e);case"FINISH_TRAIN_EVENT":var _=r.agentId,k=K(_,e.items),w=e.behaviors[k.behaviorTraining.name]||{},N=Object(R.a)({},w,Object(Me.a)({},k.behaviorTraining.eventType,{conditionalActions:k.behaviorTraining.conditionalActions})),M=Object(R.a)({},e,{behaviors:Object(R.a)({},e.behaviors,Object(Me.a)({},k.behaviorTraining.name,N))});return q(Object(R.a)({},k,{behaviorTraining:{},training:!1}),M);default:return e}},Ge=r.a.createContext(null),Je=D();Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(function(){var e=Object(a.useReducer)(ze,Je),t=Object(o.a)(e,2),n=t[0],i=t[1];return r.a.createElement("div",{className:"App"},r.a.createElement(be.a,null),r.a.createElement(xe.a,{container:!0,justify:"center",direction:"row",spacing:24},r.a.createElement(Ge.Provider,{value:{state:n,dispatch:i}},r.a.createElement(De,null),r.a.createElement(xe.a,{item:!0,xs:!0},r.a.createElement(he,null)),r.a.createElement(xe.a,{item:!0,xs:!0},r.a.createElement(C,{size:"10"})),r.a.createElement(xe.a,{item:!0,xs:4},r.a.createElement(le,null)))))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},91:function(e,t,n){e.exports=n(212)},96:function(e,t,n){},97:function(e,t,n){}},[[91,1,2]]]);
//# sourceMappingURL=main.b4973be4.chunk.js.map