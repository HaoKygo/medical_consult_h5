System.register(["./index-legacy-04b56afa.js","./use-placeholder-legacy-3f8d867f.js","./index-legacy-7ed2e303.js","./_plugin-vue_export-helper-legacy-762b7923.js"],(function(a,t){"use strict";var e,n,r,i,o,l,v,c,s,d,b,g,f,h,p,x,u=document.createElement("style");return u.textContent=":root{--van-nav-bar-height: 12.26667vw;--van-nav-bar-background: var(--van-background-2);--van-nav-bar-arrow-size: 4.26667vw;--van-nav-bar-icon-color: var(--van-primary-color);--van-nav-bar-text-color: var(--van-primary-color);--van-nav-bar-title-font-size: var(--van-font-size-lg);--van-nav-bar-title-text-color: var(--van-text-color);--van-nav-bar-z-index: 1}.van-nav-bar{position:relative;z-index:var(--van-nav-bar-z-index);line-height:var(--van-line-height-lg);text-align:center;background:var(--van-nav-bar-background);-webkit-user-select:none;user-select:none}.van-nav-bar--fixed{position:fixed;top:0;left:0;width:100%}.van-nav-bar--safe-area-inset-top{padding-top:constant(safe-area-inset-top);padding-top:env(safe-area-inset-top)}.van-nav-bar .van-icon{color:var(--van-nav-bar-icon-color)}.van-nav-bar__content{position:relative;display:flex;align-items:center;height:var(--van-nav-bar-height)}.van-nav-bar__arrow{margin-right:var(--van-padding-base);font-size:var(--van-nav-bar-arrow-size)}.van-nav-bar__title{max-width:60%;margin:0 auto;color:var(--van-nav-bar-title-text-color);font-weight:var(--van-font-bold);font-size:var(--van-nav-bar-title-font-size)}.van-nav-bar__left,.van-nav-bar__right{position:absolute;top:0;bottom:0;display:flex;align-items:center;padding:0 var(--van-padding-md);font-size:var(--van-font-size-md)}.van-nav-bar__left{left:0}.van-nav-bar__right{right:0}.van-nav-bar__text{color:var(--van-nav-bar-text-color)}[data-v-34b12258] .van-nav-bar__content{height:11.73333vw}[data-v-34b12258] .van-nav-bar__arrow{font-size:4.8vw;color:var(--mc-text1)}\n",document.head.appendChild(u),{setters:[a=>{e=a.d,n=a.r,r=a.c,i=a.v,o=a.o,l=a.k},a=>{v=a.u},a=>{c=a.c,s=a.n,d=a.t,b=a.g,g=a.a3,f=a.Z,h=a.I,p=a.w},a=>{x=a._}],execute:function(){const[t,u]=c("nav-bar"),_={title:String,fixed:Boolean,zIndex:s,border:d,leftText:String,rightText:String,leftArrow:Boolean,placeholder:Boolean,safeAreaInsetTop:Boolean,clickable:d};var m=e({name:t,props:_,emits:["clickLeft","clickRight"],setup(a,{emit:t,slots:e}){const i=n(),o=v(i,u),l=a=>t("clickLeft",a),c=a=>t("clickRight",a),s=()=>{const{title:t,fixed:n,border:o,zIndex:v}=a,s=b(v),d=a.leftArrow||a.leftText||e.left,p=a.rightText||e.right;return r("div",{ref:i,style:s,class:[u({fixed:n}),{[f]:o,"van-safe-area-top":a.safeAreaInsetTop}]},[r("div",{class:u("content")},[d&&r("div",{class:[u("left"),a.clickable?g:""],onClick:l},[e.left?e.left():[a.leftArrow&&r(h,{class:u("arrow"),name:"arrow-left"},null),a.leftText&&r("span",{class:u("text")},[a.leftText])]]),r("div",{class:[u("title"),"van-ellipsis"]},[e.title?e.title():t]),p&&r("div",{class:[u("right"),a.clickable?g:""],onClick:c},[e.right?e.right():r("span",{class:u("text")},[a.rightText])])])])};return()=>a.fixed&&a.placeholder?o(s):s()}});const k=p(m);a("_",x(e({__name:"McNavBar",props:{middleTitle:null,rightText:null,back:{type:Function}},emits:["click-right"],setup(a,{emit:t}){const e=a,n=i(),r=()=>{if(e.back)return e.back();history.state.back?n.back():n.push("/")};return(e,n)=>{const i=k;return o(),l(i,{onClickLeft:r,onClickRight:n[0]||(n[0]=a=>t("click-right")),title:a.middleTitle,"right-text":a.rightText,"left-arrow":"",fixed:""},null,8,["title","right-text"])}}}),[["__scopeId","data-v-34b12258"]]))}}}));
