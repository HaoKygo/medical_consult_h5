import{d as S,c as t,U as h}from"./index-f5f1119c.js";import{c as k,t as x,h as B,a3 as I,I as P,w as T}from"./index-7bbc97cb.js";const[v,s]=k("tag"),w={size:String,mark:Boolean,show:x,type:B("default"),color:String,plain:Boolean,round:Boolean,textColor:String,closeable:Boolean};var y=S({name:v,props:w,emits:["close"],setup(o,{slots:n,emit:r}){const c=e=>{e.stopPropagation(),r("close",e)},i=()=>o.plain?{color:o.textColor||o.color,borderColor:o.color}:{color:o.textColor,background:o.color},d=()=>{var e;const{type:u,mark:m,plain:g,round:f,size:a,closeable:C}=o,l={mark:m,plain:g,round:f};a&&(l[a]=a);const b=C&&t(P,{name:"cross",class:[s("close"),I],onClick:c},null);return t("span",{style:i(),class:s([l,u])},[(e=n.default)==null?void 0:e.call(n),b])};return()=>t(h,{name:o.closeable?"van-fade":void 0},{default:()=>[o.show?d():null]})}});const z=T(y);export{z as T};
