System.register(["./index-legacy-7ed2e303.js","./index-legacy-04b56afa.js"],(function(a,t){"use strict";var n,e,r,o,i,l,v,s,d,p,u,h,k=document.createElement("style");return k.textContent=":root{--van-skeleton-title-width: 40%}.van-skeleton-title{height:var(--van-skeleton-paragraph-height);background:var(--van-skeleton-paragraph-background)}.van-skeleton-title--round{border-radius:var(--van-radius-max)}.van-skeleton-title{width:var(--van-skeleton-title-width);margin:0}.van-skeleton-title+.van-skeleton-paragraph{margin-top:5.33333vw}:root{--van-skeleton-avatar-size: 8.53333vw;--van-skeleton-avatar-background: var(--van-active-color)}.van-skeleton-avatar{flex-shrink:0;width:var(--van-skeleton-avatar-size);height:var(--van-skeleton-avatar-size);margin-right:var(--van-padding-md);background:var(--van-skeleton-avatar-background)}.van-skeleton-avatar--round{border-radius:var(--van-radius-max)}.van-skeleton-avatar+.van-skeleton__content{padding-top:var(--van-padding-xs)}:root{--van-skeleton-paragraph-height: 4.26667vw;--van-skeleton-paragraph-background: var(--van-active-color);--van-skeleton-paragraph-margin-top: var(--van-padding-sm)}.van-skeleton-paragraph{height:var(--van-skeleton-paragraph-height);background:var(--van-skeleton-paragraph-background)}.van-skeleton-paragraph--round{border-radius:var(--van-radius-max)}.van-skeleton-paragraph:not(:first-child){margin-top:var(--van-skeleton-paragraph-margin-top)}:root{--van-skeleton-duration: 1.2s}.van-skeleton{display:flex;padding:0 var(--van-padding-md)}.van-skeleton__content{width:100%}.van-skeleton--animate{animation:van-skeleton-blink var(--van-skeleton-duration) ease-in-out infinite}@keyframes van-skeleton-blink{50%{opacity:.6}}\n",document.head.appendChild(k),{setters:[a=>{n=a.c,e=a.C,r=a.n,o=a.w,i=a.R,l=a.h,v=a.m,s=a.t},a=>{d=a.d,p=a.c,u=a.m,h=a.F}],execute:function(){const[t,k]=n("skeleton-title"),g={round:Boolean,titleWidth:r};var c=d({name:t,props:g,setup:a=>()=>p("h3",{class:k([{round:a.round}]),style:{width:e(a.titleWidth)}},null)}),m=o(c);const[w,y]=n("skeleton-avatar"),b={avatarSize:r,avatarShape:l("round")};var f=d({name:w,props:b,setup:a=>()=>p("div",{class:y([a.avatarShape]),style:i(a.avatarSize)},null)}),S=o(f);const x="100%",W={round:Boolean,rowWidth:{type:r,default:x}},[z,A]=n("skeleton-paragraph");var B=d({name:z,props:W,setup:a=>()=>p("div",{class:A([{round:a.round}]),style:{width:a.rowWidth}},null)}),_=o(B);const[C,j]=n("skeleton"),E={row:v(0),round:Boolean,title:Boolean,titleWidth:r,avatar:Boolean,avatarSize:r,avatarShape:l("round"),loading:s,animate:s,rowWidth:{type:[Number,String,Array],default:x}};var F=d({name:C,inheritAttrs:!1,props:E,setup(a,{slots:t,attrs:n}){const r=()=>{if(a.avatar)return p(S,{avatarShape:a.avatarShape,avatarSize:a.avatarSize},null)},o=()=>{if(a.title)return p(m,{round:a.round,titleWidth:a.titleWidth},null)},i=t=>{const{rowWidth:n}=a;return n===x&&t===+a.row-1?"60%":Array.isArray(n)?n[t]:n};return()=>{var l;return a.loading?p("div",u({class:j({animate:a.animate,round:a.round})},n),[t.template?t.template():p(h,null,[r(),p("div",{class:j("content")},[o(),Array(+a.row).fill("").map(((t,n)=>p(_,{key:n,round:a.round,rowWidth:e(i(n))},null)))])])]):null==(l=t.default)?void 0:l.call(t)}}});a("S",o(F))}}}));