import{d as M,r as t,q as P,x as q,o as g,e as D,c as s,h as e,t as h,w as u,u as y,k as V,i as E,F as L,y as z,v as A,p as G,f as H}from"./index-89f95841.js";import{C as J}from"./index-21e31875.js";import{_ as K}from"./McIcon-1c305fdc.js";import"./index-58e3ae5a.js";import{F as O}from"./index-2c433fd5.js";import{_ as Q}from"./McNavBar-6d2b9b42.js";import{F as W,m as X,p as Y,v as Z}from"./formRules-0bae9696.js";import{l as ee,a as oe,s as ae}from"./user-268519da.js";import{s as te,a as k}from"./request-64361350.js";import{I as se}from"./index-3ac92062.js";import{B as ne}from"./index-cbbe86d0.js";import{_ as le}from"./plugin-vueexport-helper-c27b6911.js";import"./use-route-fce4f8c0.js";import"./use-id-245dcc35.js";import"./use-placeholder-79b597dc.js";import"./interceptor-9d6b5497.js";const c=d=>(G("data-v-a40f2f88"),d=d(),H(),d),re={class:"login"},ie={class:"login-head"},ue={class:"mc-agree"},ce=c(()=>e("span",null,"我已同意",-1)),de=c(()=>e("a",{href:"javascript:;"},"用户协议",-1)),me=c(()=>e("span",null,"及",-1)),pe=c(()=>e("a",{href:"javascript:;"},"隐私条款",-1)),ve={class:"mc-login"},_e=c(()=>e("div",{class:"mc-forget"},[e("a",{href:"javascript:;"},"忘记密码？")],-1)),fe=M({__name:"index",setup(d){const n=t(!0),r=t(""),v=t(""),_=t(""),m=t(!1),f=t(!1),x=P(),b=z(),C=A(),I=async()=>{if(!f.value)return te("请勾选我已同意");const i=n.value?await ee(r.value,v.value):await oe(r.value,_.value);x.setUser(i),C.push(b.query.returnUrl||"/user"),k("登录成功")},B=t(),l=t(0);let p;const S=async()=>{var i;l.value>0||(await((i=B.value)==null?void 0:i.validate("mobile")),await ae(r.value,"login"),k("发送成功"),window.clearInterval(p),l.value=60,p=window.setInterval(()=>{l.value--,l.value<=0&&window.clearInterval(p)},1e3))};q(()=>{window.clearInterval(p)});const U=()=>{console.log("点击了注册")};return(i,o)=>{const F=Q,R=se,w=O,$=K,j=J,N=ne,T=W;return g(),D(L,null,[s(F,{rightText:"注册",onClickRight:U}),e("div",re,[e("div",ie,[e("h3",null,h(n.value?"密码登录":"手机验证码登录"),1),e("a",{href:"javascript:;",onClick:o[0]||(o[0]=a=>n.value=!n.value)},[e("span",null,h(n.value?"手机验证码登录":"密码登录"),1),s(R,{name:"arrow"})])]),s(T,{onSubmit:I,autocomplete:"false"},{default:u(()=>[s(w,{modelValue:r.value,"onUpdate:modelValue":o[1]||(o[1]=a=>r.value=a),name:"mobile",placeholder:"请输入手机号码",type:"tel",rules:y(X)},null,8,["modelValue","rules"]),n.value?(g(),V(w,{key:0,modelValue:v.value,"onUpdate:modelValue":o[3]||(o[3]=a=>v.value=a),placeholder:"请输入密码",type:`${m.value?"text":"password"}`,rules:y(Y)},{button:u(()=>[s($,{onClick:o[2]||(o[2]=a=>m.value=!m.value),name:`login-eye-${m.value?"on":"off"}`},null,8,["name"])]),_:1},8,["modelValue","type","rules"])):(g(),V(w,{key:1,modelValue:_.value,"onUpdate:modelValue":o[4]||(o[4]=a=>_.value=a),placeholder:"请输入短信验证码",rules:y(Z)},{button:u(()=>[e("span",{onClick:S,class:"get-verification-code"},h(l.value>0?`${l.value}s`:"获取验证码"),1)]),_:1},8,["modelValue","rules"])),e("div",ue,[s(j,{modelValue:f.value,"onUpdate:modelValue":o[5]||(o[5]=a=>f.value=a)},{default:u(()=>[ce,de,me,pe]),_:1},8,["modelValue"])]),e("div",ve,[s(N,{block:"",round:"",type:"primary","native-type":"submit"},{default:u(()=>[E("登录")]),_:1})]),_e]),_:1})])],64)}}});const je=le(fe,[["__scopeId","data-v-a40f2f88"]]);export{je as default};