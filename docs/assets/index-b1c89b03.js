import{c as B,C as u,x as $,f as C,n as d,t as P,h as b,I as j,w as D}from"./index-99c93d2d.js";import{d as _,r as f,g as N,a as R,E as U,C as V,l as F,G as z,c as n,K as G,V as K,m as E}from"./index-62acf543.js";const[M,t]=B("image"),O={src:String,alt:String,fit:String,position:String,round:Boolean,block:Boolean,width:d,height:d,radius:d,lazyLoad:Boolean,iconSize:d,showError:P,errorIcon:b("photo-fail"),iconPrefix:String,showLoading:P,loadingIcon:b("photo")};var T=_({name:M,props:O,emits:["load","error"],setup(r,{emit:v,slots:s}){const i=f(!1),o=f(!0),a=f(),{$Lazyload:l}=N().proxy,S=R(()=>{const e={width:u(r.width),height:u(r.height)};return $(r.radius)&&(e.overflow="hidden",e.borderRadius=u(r.radius)),e});U(()=>r.src,()=>{i.value=!1,o.value=!0});const g=e=>{o.value&&(o.value=!1,v("load",e))},m=()=>{const e=new Event("load");Object.defineProperty(e,"target",{value:a.value,enumerable:!0}),g(e)},h=e=>{i.value=!0,o.value=!1,v("error",e)},w=(e,c,L)=>L?L():n(j,{name:e,size:r.iconSize,class:c,classPrefix:r.iconPrefix},null),x=()=>{if(o.value&&r.showLoading)return n("div",{class:t("loading")},[w(r.loadingIcon,t("loading-icon"),s.loading)]);if(i.value&&r.showError)return n("div",{class:t("error")},[w(r.errorIcon,t("error-icon"),s.error)])},k=()=>{if(i.value||!r.src)return;const e={alt:r.alt,class:t("img"),style:{objectFit:r.fit,objectPosition:r.position}};return r.lazyLoad?G(n("img",E({ref:a},e),null),[[K("lazy"),r.src]]):n("img",E({ref:a,src:r.src,onLoad:g,onError:h},e),null)},y=({el:e})=>{const c=()=>{e===a.value&&o.value&&m()};a.value?c():z(c)},I=({el:e})=>{e===a.value&&!i.value&&h()};return l&&C&&(l.$on("loaded",y),l.$on("error",I),V(()=>{l.$off("loaded",y),l.$off("error",I)})),F(()=>{z(()=>{var e;(e=a.value)!=null&&e.complete&&m()})}),()=>{var e;return n("div",{class:t({round:r.round,block:r.block}),style:S.value},[k(),x(),(e=s.default)==null?void 0:e.call(s)])}}});const H=D(T);export{H as I};
