System.register(["./index-legacy-04b56afa.js","./index-legacy-8ea1b784.js","./McIcon-legacy-3fed9db7.js","./index-legacy-9d303c5d.js","./index-legacy-1d59c969.js","./McNavBar-legacy-163ae2a7.js","./formRules-legacy-8d5e3d0a.js","./user-legacy-6afce405.js","./request-legacy-49611e85.js","./index-legacy-7ed2e303.js","./index-legacy-784a89ae.js","./_plugin-vue_export-helper-legacy-762b7923.js","./use-route-legacy-047c5dd8.js","./use-id-legacy-3fcff666.js","./use-placeholder-legacy-3f8d867f.js","./interceptor-legacy-9047adcd.js"],(function(e,a){"use strict";var l,n,t,o,u,i,v,s,r,d,c,f,g,m,p,y,w,h,j,x,_,V,b,k,C,I,U,q,z,F,B,E,M,R,S=document.createElement("style");return S.textContent=".login[data-v-a40f2f88]{padding-top:11.73333vw}.login-head[data-v-a40f2f88]{padding:6.66667vw 4vw 12vw;display:flex;justify-content:space-between;align-items:flex-end;line-height:1}.login-head h3[data-v-a40f2f88]{font-weight:400;font-size:6.4vw}.login-head a[data-v-a40f2f88]{font-size:4.26667vw}.login .van-form .get-verification-code[data-v-a40f2f88]{color:var(--mc-primary)}.login .van-form .mc-agree[data-v-a40f2f88]{padding:4vw 0 5.6vw 4.26667vw}.login .van-form .mc-agree a[data-v-a40f2f88]{padding:0 1.33333vw;font-size:3.73333vw;color:var(--mc-primary)}.login .van-form .mc-login[data-v-a40f2f88]{padding:0 4.26667vw;font-size:4.26667vw}.login .van-form .mc-forget[data-v-a40f2f88]{display:flex;justify-content:center;padding:4vw 4.26667vw}.login .van-form .mc-forget a[data-v-a40f2f88]{color:var(--mc-text3)}\n",document.head.appendChild(S),{setters:[e=>{l=e.d,n=e.r,t=e.q,o=e.x,u=e.o,i=e.e,v=e.c,s=e.h,r=e.t,d=e.w,c=e.u,f=e.k,g=e.i,m=e.F,p=e.y,y=e.v,w=e.p,h=e.f},e=>{j=e.C},e=>{x=e._},null,e=>{_=e.F},e=>{V=e._},e=>{b=e.F,k=e.m,C=e.p,I=e.v},e=>{U=e.l,q=e.a,z=e.s},e=>{F=e.s,B=e.a},e=>{E=e.I},e=>{M=e.B},e=>{R=e._},null,null,null,null],execute:function(){const a=e=>(w("data-v-a40f2f88"),e=e(),h(),e),S={class:"login"},A={class:"login-head"},G={class:"mc-agree"},H=a((()=>s("span",null,"我已同意",-1))),N=a((()=>s("a",{href:"javascript:;"},"用户协议",-1))),T=a((()=>s("span",null,"及",-1))),$=a((()=>s("a",{href:"javascript:;"},"隐私条款",-1))),D={class:"mc-login"},J=a((()=>s("div",{class:"mc-forget"},[s("a",{href:"javascript:;"},"忘记密码？")],-1)));e("default",R(l({__name:"index",setup(e){const a=n(!0),l=n(""),w=n(""),h=n(""),R=n(!1),K=n(!1),L=t(),O=p(),P=y(),Q=async()=>{if(!K.value)return F("请勾选我已同意");const e=a.value?await U(l.value,w.value):await q(l.value,h.value);L.setUser(e),P.push(O.query.returnUrl||"/user"),B("登录成功")},W=n(),X=n(0);let Y;const Z=async()=>{X.value>0||(await(W.value?.validate("mobile")),await z(l.value,"login"),B("发送成功"),window.clearInterval(Y),X.value=60,Y=window.setInterval((()=>{X.value--,X.value<=0&&window.clearInterval(Y)}),1e3))};o((()=>{window.clearInterval(Y)}));const ee=()=>{console.log("点击了注册")};return(e,n)=>{const t=V,o=E,p=_,y=x,U=j,q=M,z=b;return u(),i(m,null,[v(t,{rightText:"注册",onClickRight:ee}),s("div",S,[s("div",A,[s("h3",null,r(a.value?"密码登录":"手机验证码登录"),1),s("a",{href:"javascript:;",onClick:n[0]||(n[0]=e=>a.value=!a.value)},[s("span",null,r(a.value?"手机验证码登录":"密码登录"),1),v(o,{name:"arrow"})])]),v(z,{onSubmit:Q,autocomplete:"false"},{default:d((()=>[v(p,{modelValue:l.value,"onUpdate:modelValue":n[1]||(n[1]=e=>l.value=e),name:"mobile",placeholder:"请输入手机号码",type:"tel",rules:c(k)},null,8,["modelValue","rules"]),a.value?(u(),f(p,{key:0,modelValue:w.value,"onUpdate:modelValue":n[3]||(n[3]=e=>w.value=e),placeholder:"请输入密码",type:R.value?"text":"password",rules:c(C)},{button:d((()=>[v(y,{onClick:n[2]||(n[2]=e=>R.value=!R.value),name:"login-eye-"+(R.value?"on":"off")},null,8,["name"])])),_:1},8,["modelValue","type","rules"])):(u(),f(p,{key:1,modelValue:h.value,"onUpdate:modelValue":n[4]||(n[4]=e=>h.value=e),placeholder:"请输入短信验证码",rules:c(I)},{button:d((()=>[s("span",{onClick:Z,class:"get-verification-code"},r(X.value>0?`${X.value}s`:"获取验证码"),1)])),_:1},8,["modelValue","rules"])),s("div",G,[v(U,{modelValue:K.value,"onUpdate:modelValue":n[5]||(n[5]=e=>K.value=e)},{default:d((()=>[H,N,T,$])),_:1},8,["modelValue"])]),s("div",D,[v(q,{block:"",round:"",type:"primary","native-type":"submit"},{default:d((()=>[g("登录")])),_:1})]),J])),_:1})])],64)}}}),[["__scopeId","data-v-a40f2f88"]]))}}}));
