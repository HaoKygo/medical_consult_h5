System.register(["./index-legacy-7ed2e303.js","./request-legacy-49611e85.js","./index-legacy-04b56afa.js"],(function(e,t){"use strict";var a,i,l,n,o,r,c,u,s,v,d,f,h,p,g,C,m,w,y,M,P,x,W,b,S,N,T,z,E;return{setters:[e=>{a=e.c,i=e.t,l=e.n,n=e.m,o=e.u,r=e.z,c=e.a2,u=e.a4,s=e.A,v=e.l,d=e.q,f=e.J,h=e.p,p=e.a0,g=e.w,C=e.a},e=>{m=e.d,w=e.u},e=>{y=e.d,M=e.r,P=e.D,x=e.a,W=e.E,b=e.l,S=e.H,N=e.B,T=e.C,z=e.c,E=e.G}],execute:function(){const[t,I]=a("swipe"),Y={loop:i,width:l,height:l,vertical:Boolean,autoplay:n(0),duration:n(500),touchable:i,lazyRender:Boolean,initialSwipe:n(0),indicatorColor:String,showIndicators:i,stopPropagation:i},$=Symbol(t);var D=y({name:t,props:Y,emits:["change","dragStart","dragEnd"],setup(e,{emit:t,slots:a}){const i=M(),l=M(),n=P({rect:null,width:0,height:0,offset:0,active:0,swiping:!1});let g=!1;const C=m(),{children:y,linkChildren:Y}=o($),D=x((()=>y.length)),H=x((()=>n[e.vertical?"height":"width"])),k=x((()=>e.vertical?C.deltaY.value:C.deltaX.value)),O=x((()=>n.rect?(e.vertical?n.rect.height:n.rect.width)-H.value*D.value:0)),A=x((()=>H.value?Math.ceil(Math.abs(O.value)/H.value):D.value)),R=x((()=>D.value*H.value)),X=x((()=>(n.active+D.value)%D.value)),j=x((()=>{const t=e.vertical?"vertical":"horizontal";return C.direction.value===t})),B=x((()=>{const t={transitionDuration:`${n.swiping?0:e.duration}ms`,transform:`translate${e.vertical?"Y":"X"}(${n.offset}px)`};if(H.value){const a=e.vertical?"height":"width",i=e.vertical?"width":"height";t[a]=`${R.value}px`,t[i]=e[i]?`${e[i]}px`:""}return t})),q=(t,a=0)=>{let i=t*H.value;e.loop||(i=Math.min(i,-O.value));let l=a-i;return e.loop||(l=p(l,O.value,0)),l},F=({pace:a=0,offset:i=0,emitChange:l})=>{if(D.value<=1)return;const{active:o}=n,r=(t=>{const{active:a}=n;return t?e.loop?p(a+t,-1,D.value):p(a+t,0,A.value):a})(a),c=q(r,i);if(e.loop){if(y[0]&&c!==O.value){const e=c<O.value;y[0].setOffset(e?R.value:0)}if(y[D.value-1]&&0!==c){const e=c>0;y[D.value-1].setOffset(e?-R.value:0)}}n.active=r,n.offset=c,l&&r!==o&&t("change",X.value)},G=()=>{n.swiping=!0,n.active<=-1?F({pace:D.value}):n.active>=D.value&&F({pace:-D.value})},J=()=>{G(),C.reset(),f((()=>{n.swiping=!1,F({pace:1,emitChange:!0})}))};let K;const L=()=>clearTimeout(K),Q=()=>{L(),+e.autoplay>0&&D.value>1&&(K=setTimeout((()=>{J(),Q()}),+e.autoplay))},U=(t=+e.initialSwipe)=>{if(!i.value)return;const a=()=>{var a,l;if(!d(i)){const t={width:i.value.offsetWidth,height:i.value.offsetHeight};n.rect=t,n.width=+(null!=(a=e.width)?a:t.width),n.height=+(null!=(l=e.height)?l:t.height)}D.value&&-1===(t=Math.min(D.value-1,t))&&(t=D.value-1),n.active=t,n.swiping=!0,n.offset=q(t),y.forEach((e=>{e.setOffset(0)})),Q()};d(i)?E().then(a):a()},V=()=>U(n.active);let Z;const _=t=>{!e.touchable||t.touches.length>1||(C.start(t),g=!1,Z=Date.now(),L(),G())},ee=()=>{if(!e.touchable||!n.swiping)return;const a=Date.now()-Z,i=k.value/a;if((Math.abs(i)>.25||Math.abs(k.value)>H.value/2)&&j.value){const t=e.vertical?C.offsetY.value:C.offsetX.value;let a=0;a=e.loop?t>0?k.value>0?-1:1:0:-Math[k.value>0?"ceil":"floor"](k.value/H.value),F({pace:a,emitChange:!0})}else k.value&&F({pace:0});g=!1,n.swiping=!1,t("dragEnd",{index:X.value}),Q()},te=(t,a)=>{const i=a===X.value,l=i?{backgroundColor:e.indicatorColor}:void 0;return z("i",{style:l,class:I("indicator",{active:i})},null)};return w({prev:()=>{G(),C.reset(),f((()=>{n.swiping=!1,F({pace:-1,emitChange:!0})}))},next:J,state:n,resize:V,swipeTo:(t,a={})=>{G(),C.reset(),f((()=>{let i;i=e.loop&&t===D.value?0===n.active?0:t:t%D.value,a.immediate?f((()=>{n.swiping=!1})):n.swiping=!1,F({pace:i-n.active,emitChange:!0})}))}}),Y({size:H,props:e,count:D,activeIndicator:X}),W((()=>e.initialSwipe),(e=>U(+e))),W(D,(()=>U(n.active))),W((()=>e.autoplay),Q),W([r,c],V),W(u(),(e=>{"visible"===e?Q():L()})),b(U),S((()=>U(n.active))),s((()=>U(n.active))),N(L),T(L),v("touchmove",(a=>{e.touchable&&n.swiping&&(C.move(a),j.value)&&(!e.loop&&(0===n.active&&k.value>0||n.active===D.value-1&&k.value<0)||(h(a,e.stopPropagation),F({offset:k.value}),g||(t("dragStart",{index:X.value}),g=!0)))}),{target:l}),()=>{var t;return z("div",{ref:i,class:I()},[z("div",{ref:l,style:B.value,class:I("track",{vertical:e.vertical}),onTouchstartPassive:_,onTouchend:ee,onTouchcancel:ee},[null==(t=a.default)?void 0:t.call(a)]),a.indicator?a.indicator({active:X.value,total:D.value}):e.showIndicators&&D.value>1?z("div",{class:I("indicators",{vertical:e.vertical})},[Array(D.value).fill("").map(te)]):void 0])}}});e("S",g(D));const[H,k]=a("swipe-item");var O=y({name:H,setup(e,{slots:t}){let a;const i=P({offset:0,inited:!1,mounted:!1}),{parent:l,index:n}=C($);if(!l)return;const o=x((()=>{const e={},{vertical:t}=l.props;return l.size.value&&(e[t?"height":"width"]=`${l.size.value}px`),i.offset&&(e.transform=`translate${t?"Y":"X"}(${i.offset}px)`),e})),r=x((()=>{const{loop:e,lazyRender:t}=l.props;if(!t||a)return!0;if(!i.mounted)return!1;const o=l.activeIndicator.value,r=l.count.value-1,c=0===o&&e?r:o-1,u=o===r&&e?0:o+1;return a=n.value===o||n.value===c||n.value===u,a}));return b((()=>{E((()=>{i.mounted=!0}))})),w({setOffset:e=>{i.offset=e}}),()=>{var e;return z("div",{class:k(),style:o.value},[r.value?null==(e=t.default)?void 0:e.call(t):null])}}});e("a",g(O));var A=e("C",(e=>(e[e.Doctor=1]="Doctor",e[e.Fast=2]="Fast",e[e.Medication=3]="Medication",e))(A||{})),R=e("b",(e=>(e[e.Week=1]="Week",e[e.Month=2]="Month",e[e.HalfYear=3]="HalfYear",e[e.AfterHalfYear=4]="AfterHalfYear",e))(R||{})),X=e("M",(e=>(e[e.MsgText=1]="MsgText",e[e.MsgImage=4]="MsgImage",e[e.CardPatient=21]="CardPatient",e[e.CardPrescription=22]="CardPrescription",e[e.CardNotEva=23]="CardNotEva",e[e.CardEva=24]="CardEva",e[e.Notify=31]="Notify",e[e.NotifyTip=32]="NotifyTip",e[e.NotifyCancel=33]="NotifyCancel",e))(X||{})),j=e("P",(e=>(e[e.NotPay=1]="NotPay",e[e.Payed=2]="Payed",e[e.Invalid=3]="Invalid",e))(j||{})),B=e("O",(e=>(e[e.ConsultPayWait=1]="ConsultPayWait",e[e.ConsultWait=2]="ConsultWait",e[e.ConsultChat=3]="ConsultChat",e[e.ConsultComplete=4]="ConsultComplete",e[e.ConsultCancel=5]="ConsultCancel",e[e.MedicinePayWait=10]="MedicinePayWait",e[e.MedicineSendWait=11]="MedicineSendWait",e[e.MedicineReceiveWait=12]="MedicineReceiveWait",e[e.MedicineComplete=13]="MedicineComplete",e[e.MedicineCancel=14]="MedicineCancel",e))(B||{}))}}}));