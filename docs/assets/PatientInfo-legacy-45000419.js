System.register(["./index-legacy-04b56afa.js","./index-legacy-8ea1b784.js","./McRadioBtn-legacy-23a61fec.js","./index-legacy-9d303c5d.js","./index-legacy-1d59c969.js","./McIcon-legacy-3fed9db7.js","./McNavBar-legacy-163ae2a7.js","./user-legacy-6afce405.js","./formRules-legacy-8d5e3d0a.js","./index-legacy-1dd98c17.js","./request-legacy-49611e85.js","./function-call-legacy-8023bfe1.js","./index-legacy-784a89ae.js","./_plugin-vue_export-helper-legacy-762b7923.js","./index-legacy-7ed2e303.js","./use-route-legacy-047c5dd8.js","./use-id-legacy-3fcff666.js","./use-placeholder-legacy-3f8d867f.js","./interceptor-legacy-9047adcd.js"],(function(a,e){"use strict";var l,t,i,n,d,o,r,u,v,c,s,p,g,m,f,w,y,h,b,x,k,C,j,_,V,F,z,T,U,B,I,q,A,M,P,R,E,$,D,G,H,N,S,J,K,L=document.createElement("style");return L.textContent=".patient-page[data-v-4345287a]{padding:12.26667vw 0 21.33333vw}.patient-page[data-v-4345287a] .van-popup{box-sizing:border-box;width:100%;height:100%;padding-top:11.73333vw}.patient-change[data-v-4345287a]{padding:4vw}.patient-change>h3[data-v-4345287a]{font-weight:400;margin-bottom:1.33333vw}.patient-change>p[data-v-4345287a]{color:var(--mc-text3)}.patient-next[data-v-4345287a]{box-sizing:border-box;width:100%;height:21.33333vw;padding:4vw;background-color:#fff;position:fixed;left:0;bottom:0}.patient-list[data-v-4345287a]{padding:4vw;padding-bottom:0}.patient-item[data-v-4345287a]{display:flex;align-items:center;padding:4vw;background-color:var(--mc-bg);border-radius:2.13333vw;margin-bottom:4vw;position:relative;border:1px solid var(--mc-bg);transition:all .3s;overflow:hidden}.patient-item .info[data-v-4345287a]{display:flex;align-items:center;row-gap:2.66667vw;flex-wrap:wrap;flex:1}.patient-item .info span[data-v-4345287a]{color:var(--mc-tip);margin-right:5.33333vw}.patient-item .info span.name[data-v-4345287a]{font-size:4.26667vw;color:var(--mc-text1);width:21.33333vw;margin-right:0}.patient-item .info span.id[data-v-4345287a]{color:var(--mc-text2);width:48vw}.patient-item .icon[data-v-4345287a]{color:var(--mc-tag);width:5.33333vw;text-align:center}.patient-item .default-tag[data-v-4345287a]{position:absolute;right:16vw;top:5.6vw;width:8vw;height:4.26667vw;font-size:2.66667vw;color:#fff;background-color:var(--mc-primary);border-radius:.53333vw;display:flex;align-items:center;justify-content:center}.patient-item.selected[data-v-4345287a]{border-color:var(--mc-primary);background-color:var(--mc-plain)}.patient-item.selected .icon[data-v-4345287a]{color:var(--mc-primary)}.patient-add[data-v-4345287a]{background-color:var(--mc-bg);color:var(--mc-primary);text-align:center;margin:0 4vw;padding:4vw 0;border-radius:2.13333vw}.patient-add .mc-icon[data-v-4345287a]{font-size:7.46667vw}.patient-tip[data-v-4345287a]{color:var(--mc-tag);padding:4vw}\n",document.head.appendChild(L),{setters:[a=>{l=a.d,t=a.a,i=a.r,n=a.n,d=a.l,o=a.o,r=a.e,u=a.c,v=a.u,c=a.s,s=a.F,p=a.j,g=a.w,m=a.i,f=a.z,w=a.k,y=a.y,h=a.v,b=a.A,x=a.h,k=a.t,C=a.p,j=a.f},a=>{_=a.C},a=>{V=a._},null,a=>{F=a.F},a=>{z=a._},a=>{T=a._},a=>{U=a.b,B=a.e,I=a.c,q=a.d},a=>{A=a.i,M=a.e,P=a.F,R=a.a,E=a.b},a=>{$=a.A,D=a.a},a=>{G=a.s,H=a.a,N=a.P},a=>{S=a.s},a=>{J=a.B},a=>{K=a._},null,null,null,null,null],execute:function(){const e=a=>(C("data-v-4345287a"),a=a(),j(),a),L={class:"patient-page"},O={key:0,class:"patient-change"},Q=[e((()=>x("h3",null,"请选择患者信息",-1))),e((()=>x("p",null,"以便医生给出更准确的治疗，信息仅医生可见",-1)))],W={key:1,class:"patient-list"},X=["onClick"],Y={class:"info"},Z={class:"name"},aa={class:"id"},ea={class:"gender"},la={class:"age"},ta=["onClick"],ia={key:0,class:"default-tag"},na=e((()=>x("p",null,"添加患者",-1))),da=e((()=>x("div",{class:"patient-tip"},"最多可添加 6 人",-1))),oa={key:3,class:"patient-next"};a("default",K(l({__name:"PatientInfo",setup(a){const e=y(),l=t((()=>"1"===e.query.isChange)),C=i(),j=n(),K=h(),ra=async()=>{if(!C.value)return G("请选择问诊患者");j.setPatient(C.value),K.push("/consult/pay")},ua=i(),va=async()=>{const a=await U();if(ua.value=a,l.value&&ua.value.length){const a=ua.value.find((a=>1===a.defaultFlag));C.value=a?a.id:ua.value[0].id}};d((()=>{va()}));const ca={name:"",idCard:"",defaultFlag:0,gender:void 0},sa=i({...ca}),pa=t({get:()=>1===sa.value.defaultFlag,set(a){sa.value.defaultFlag=a?1:0}}),ga=async()=>{if(!sa.value.name)return G("请输入真实姓名");if(!sa.value.idCard)return G("请输入身份证号");if(void 0===sa.value.gender)return G("请选择性别");if(!A(sa.value.idCard))return G("身份证格式错误");const a=M(sa.value.idCard);if(sa.value.gender!==a)return G("性别与身份证不符");sa.value.id?await B(sa.value):await I(sa.value),fa.value=!1,await va(),H(sa.value.id?"编辑成功":"添加成功")},ma=async()=>{sa.value.id&&(await S({title:"温馨提示",message:`您确认要删除 ${sa.value.name} 患者信息吗？`}),await q(sa.value.id),fa.value=!1,await va(),H("删除成功"))},fa=i(!1),wa=a=>{if(a){const{id:e,name:l,idCard:t,defaultFlag:i,gender:n}=a;sa.value={id:e,name:l,idCard:t,defaultFlag:i,gender:n}}else sa.value={...ca};fa.value=!0},ya=[{label:"男",value:1},{label:"女",value:0}];return(a,e)=>{const t=T,i=z,n=J,d=F,y=V,h=_,j=P,U=$,B=D,I=N;return o(),r("div",L,[u(t,{middleTitle:v(l)?"选择患者":"家庭档案"},null,8,["middleTitle"]),v(l)?(o(),r("div",O,Q)):c("",!0),ua.value?(o(),r("div",W,[(o(!0),r(s,null,p(ua.value,(a=>(o(),r("div",{class:b(["patient-item",{selected:C.value===a.id}]),key:a.id,onClick:e=>(a=>{l.value&&(C.value=a.id)})(a)},[x("div",Y,[x("span",Z,k(a.name),1),x("span",aa,k(v(R)(a.idCard)),1),x("span",ea,k(a.genderValue),1),x("span",la,k(a.age?`${a.age}岁`:""),1)]),x("div",{onClick:e=>wa(a),class:"icon"},[u(i,{name:"user-edit"})],8,ta),1===a.defaultFlag?(o(),r("div",ia,"默认")):c("",!0)],10,X)))),128))])):c("",!0),!ua.value||ua.value&&ua.value.length<6?(o(),r("div",{key:2,class:"patient-add",onClick:e[0]||(e[0]=a=>wa())},[u(i,{name:"user-add"}),na])):c("",!0),da,v(l)?(o(),r("div",oa,[u(n,{onClick:ra,type:"primary",round:"",block:""},{default:g((()=>[m("下一步")])),_:1})])):c("",!0),u(I,{show:fa.value,"onUpdate:show":e[5]||(e[5]=a=>fa.value=a),position:"right"},{default:g((()=>[u(t,{back:()=>fa.value=!1,middleTitle:sa.value.id?"编辑患者":"添加患者",rightText:"保存",onClickRight:ga},null,8,["back","middleTitle"]),u(j,{autocomplete:"off"},{default:g((()=>[u(d,{modelValue:sa.value.name,"onUpdate:modelValue":e[1]||(e[1]=a=>sa.value.name=a),label:"真实姓名",placeholder:"请输入真实姓名"},null,8,["modelValue"]),u(d,{modelValue:sa.value.idCard,"onUpdate:modelValue":e[2]||(e[2]=a=>sa.value.idCard=a),label:"身份证号",placeholder:"请输入身份证号",rules:v(E)},null,8,["modelValue","rules"]),u(d,{label:"性别"},{input:g((()=>[u(y,{modelValue:sa.value.gender,"onUpdate:modelValue":e[3]||(e[3]=a=>sa.value.gender=a),options:ya},null,8,["modelValue"])])),_:1}),u(d,{label:"默认就诊人"},{input:g((()=>[u(h,{modelValue:v(pa),"onUpdate:modelValue":e[4]||(e[4]=a=>f(pa)?pa.value=a:null),round:""},null,8,["modelValue"])])),_:1})])),_:1}),sa.value.id?(o(),w(B,{key:0},{default:g((()=>[u(U,{onClick:ma,type:"danger",text:"删除"})])),_:1})):c("",!0)])),_:1},8,["show"])])}}}),[["__scopeId","data-v-4345287a"]]))}}}));
