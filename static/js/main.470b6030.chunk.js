(this.webpackJsonpwanted=this.webpackJsonpwanted||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a.p+"static/media/win.89043896.mp3"},function(e,t,a){e.exports=a.p+"static/media/lose.44afdfdc.mp3"},function(e,t,a){e.exports=a.p+"static/media/shoot.1278f802.mp3"},function(e,t,a){e.exports=a.p+"static/media/prepare.6b68e6d1.mp3"},function(e,t,a){e.exports=a(21)},,,,,function(e,t,a){},,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),c=a(5),l=a.n(c),s=(a(16),a(6)),r=a(3),i=a(2),u=a(7),m=a.n(u),p=a(8),f=a.n(p),b=new Audio(m.a),v=new Audio(f.a),h=new i.d({paused:!0,autoRemoveChildren:!0}),d=function(e){h.set(".message-wrap",{autoAlpha:0}).set(".message",{scale:.2,autoAlpha:0}).to(".message-wrap",.5,{autoAlpha:1}).to(".message",.6,{scale:1,autoAlpha:1,ease:i.a.easeOut.config(4)},"-=0.5").to(".message-wrap",.5,{autoAlpha:0},"+=3").to(".message",.5,{scale:.2,autoAlpha:0,ease:i.a.easeIn.config(4),onComplete:function(){return e()}},"-=0.5").play()},g=function(e,t){h.to(t,0,{bezier:{curviness:3,values:[{x:0,y:0}]},scale:1,rotation:0}).to(".bullets",.3,{autoAlpha:0,onComplete:function(){e.style="",t.style=""}})},w=Object(n.memo)((function(e){var t=e.value,a=e.className,c=e.collect,l=e.animTo,s=e.onChange,u=Object(n.useState)(0),m=Object(r.a)(u,2),p=m[0],f=m[1],b=Object(n.useState)({val:t}),v=Object(r.a)(b,2),h=v[0],d=v[1];Object(n.useEffect)((function(){f(t),d({val:t})}),[t]),Object(n.useEffect)((function(){g()}),[c]);var g=function(){var e,t,a,n;c&&(console.log("Collecting..."),e=h,t=l,a=f,n=s,i.e.to(e,2,{val:t,onUpdate:function(){return a(e.val.toFixed(0))},ease:i.c.easeOut,onComplete:function(){return n&&n(t)}}))};return o.a.createElement("span",{className:a},p)})),y=function(e){var t=e.status;return o.a.createElement("div",{className:"message-wrap"},o.a.createElement("div",{className:"message"},o.a.createElement("span",null,"You"),o.a.createElement("span",null,"".concat(t,"!"))))},O=function(e){var t=e.message,a=e.action,n=e.label;return o.a.createElement("div",{className:"message-action"},o.a.createElement("div",{className:"action-wrap"},o.a.createElement("span",null,t),o.a.createElement("span",{className:"action",onClick:function(){return a()}},n)))},E=(a(19),a(9)),A=a.n(E),j=a(10),N=a.n(j);function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function C(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(a,!0).forEach((function(t){Object(s.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var k={choice:null,balance:100},S={outcome:null,win:0},P=new Audio(A.a),D=new Audio(N.a),T=function(){var e=Object(n.useState)(k),t=Object(r.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(S),s=Object(r.a)(l,2),u=s[0],m=s[1],p=Object(n.useState)(!1),f=Object(r.a)(p,2),E=f[0],A=f[1],j=Object(n.useRef)(null),N=Object(n.useRef)(null);Object(n.useEffect)((function(){var e,t;a.choice&&(D.play(),e=j,t=x,h.to(e,1,{repeat:-1,rotation:-360,ease:i.b.easeNone}).to(e,5,{x:-1e3,ease:i.b.easeNone},0).set(e,{x:0,rotation:0,delay:2,onComplete:function(){h.clear(),t()}}).play()),a.choice||0!==a.balance||z()}),[a]),Object(n.useEffect)((function(){R()}),[u]);var x=function(){var e=Math.floor(10*Math.random())+1,t=e>5?"won":"lost",a=e>5?20:0;console.log(P.play()),m({outcome:t,win:a})},T=function(e){var t={balance:e||a.balance};c(C({},k,{},t)),m(C({},S))},I=function(){return A(!0)},J=function(){g(j,N),T()},R=function(){var e;u.outcome&&("won"===u.outcome?function(e,t,a){var n=function(e){var t={};switch(e){case"left":t.path=[{x:0,y:0},{x:100,y:-50},{x:200,y:-80},{x:300,y:-100},{x:500,y:-120}],t.rotation=360;break;case"right":t.path=[{x:0,y:0},{x:-100,y:-50},{x:-200,y:-80},{x:-300,y:-100},{x:-500,y:-120}],t.rotation=-360;break;default:t.path=[],t.rotation=0}return t}(t);h.to(e,1.5,{bezier:{curviness:3,values:n.path},scale:.3,ease:i.b.easeOut,onComplete:function(){h.clear(),b.play(),d(a)}}).to(e,1,{repeat:-1,rotation:n.rotation,ease:i.b.easeNone},0).play()}(N,a.choice,I):(e=J,h.set(".bullets",{autoAlpha:0}).to(".bullets",.2,{autoAlpha:1,onComplete:function(){setTimeout((function(){v.play(),d(e)}),2e3)}})))},B=function(e){var t=C({},a);t.choice=e,t.balance=t.balance-10,c(t)},z=function(){console.log("STANJE JE",a),0===a.balance&&(console.log("BLAAAAAAAAAA"),h.set(".message-action",{autoAlpha:0}).set(".action-wrap",{scale:.2,autoAlpha:0}).to(".message-action",.5,{autoAlpha:1}).to(".action-wrap",.6,{scale:1,autoAlpha:1,ease:i.a.easeOut.config(4)},"-=0.5").play())};return o.a.createElement("div",{className:"game"},o.a.createElement(O,{label:"ADD CREDITS",message:"You lost all your credits. Click the button below to refill your balance.",action:function(){c(C({},a,{balance:100})),h.to(".message-action",.5,{autoAlpha:0}).to(".action-wrap",.5,{scale:.2,autoAlpha:0,ease:i.a.easeIn.config(4)},"-=0.5").play()}}),o.a.createElement(y,{status:u.outcome}),o.a.createElement(w,{className:"stats win-amount",value:u.win,collect:E,animTo:0}),o.a.createElement(w,{className:"stats balance",value:a.balance,collect:E,animTo:a.balance+20,onChange:function(e){setTimeout((function(){g(j,N),A(!1),T(e)}),1e3)}}),o.a.createElement("div",{className:"bullets"}),o.a.createElement("div",{className:"hat",ref:function(e){return N=e}}),o.a.createElement("div",{className:"cowboy ".concat(u.outcome?u.outcome:"idle")}),!a.choice&&o.a.createElement("div",{className:"guns"},o.a.createElement("div",{className:"gun left-gun",onClick:function(){return B("left")}}),o.a.createElement("div",{className:"gun right-gun",onClick:function(){return B("right")}})),o.a.createElement("div",{className:"tumbleweed",ref:function(e){return j=e}}))};a(20);var I=function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"game-wrapper"},o.a.createElement(T,null),o.a.createElement("div",{className:"frame"})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[11,1,2]]]);
//# sourceMappingURL=main.470b6030.chunk.js.map