import{c as l,C as m,n as r,w as i,R as w,h as v,m as _,t as u}from"./index-7bbc97cb.js";import{d,c as e,m as g,F as y}from"./index-f5f1119c.js";const[A,P]=l("skeleton-title"),p={round:Boolean,titleWidth:r};var T=d({name:A,props:p,setup(t){return()=>e("h3",{class:P([{round:t.round}]),style:{width:m(t.titleWidth)}},null)}});const z=i(T);var b=z;const[B,R]=l("skeleton-avatar"),x={avatarSize:r,avatarShape:v("round")};var D=d({name:B,props:x,setup(t){return()=>e("div",{class:R([t.avatarShape]),style:w(t.avatarSize)},null)}});const F=i(D);var N=F;const s="100%",C={round:Boolean,rowWidth:{type:r,default:s}},[I,L]=l("skeleton-paragraph");var U=d({name:I,props:C,setup(t){return()=>e("div",{class:L([{round:t.round}]),style:{width:t.rowWidth}},null)}});const E=i(U);var H=E;const[O,c]=l("skeleton"),V="60%",j={row:_(0),round:Boolean,title:Boolean,titleWidth:r,avatar:Boolean,avatarSize:r,avatarShape:v("round"),loading:u,animate:u,rowWidth:{type:[Number,String,Array],default:s}};var q=d({name:O,inheritAttrs:!1,props:j,setup(t,{slots:o,attrs:h}){const f=()=>{if(t.avatar)return e(N,{avatarShape:t.avatarShape,avatarSize:t.avatarSize},null)},S=()=>{if(t.title)return e(b,{round:t.round,titleWidth:t.titleWidth},null)},k=n=>{const{rowWidth:a}=t;return a===s&&n===+t.row-1?V:Array.isArray(a)?a[n]:a},W=()=>Array(+t.row).fill("").map((n,a)=>e(H,{key:a,round:t.round,rowWidth:m(k(a))},null)),$=()=>o.template?o.template():e(y,null,[f(),e("div",{class:c("content")},[S(),W()])]);return()=>{var n;return t.loading?e("div",g({class:c({animate:t.animate,round:t.round})},h),[$()]):(n=o.default)==null?void 0:n.call(o)}}});const K=i(q);export{K as S};
