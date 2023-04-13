import{d as O,a as B,r as k,n as H,l as J,o as i,e as d,c as o,u as m,s as p,F as K,j as Q,w as v,i as W,z as X,k as Y,y as Z,v as ee,A as ae,h as s,t as w,p as te,f as oe}from"./index-065e17f8.js";import{C as ne}from"./index-05700f99.js";import{_ as se}from"./McRadioBtn-a308d3e4.js";import"./index-834d3738.js";import{F as le}from"./index-638daae8.js";import{_ as ie}from"./McIcon-6ebf4c62.js";import{_ as de}from"./McNavBar-ba5c8ffd.js";import{b as ue,e as re,c as ce,d as _e}from"./user-dd7f1628.js";import{i as me,e as pe,F as ve,a as fe,b as ge}from"./formRules-417c4a56.js";import{A as he,a as Ce}from"./index-b40dee38.js";import{s as f,a as I,P as ke}from"./request-7d32c2d7.js";import{s as we}from"./function-call-b20e09aa.js";import{B as ye}from"./index-3a701df8.js";import{_ as Pe}from"./_plugin-vue_export-helper-c27b6911.js";import"./index-e7e15f08.js";import"./use-route-b6d29d8b.js";import"./use-id-eeb4c899.js";import"./use-placeholder-5af40b98.js";import"./interceptor-832f03c0.js";const y=h=>(te("data-v-4345287a"),h=h(),oe(),h),be={class:"patient-page"},Ve={key:0,class:"patient-change"},Fe=y(()=>s("h3",null,"请选择患者信息",-1)),xe=y(()=>s("p",null,"以便医生给出更准确的治疗，信息仅医生可见",-1)),Be=[Fe,xe],Ie={key:1,class:"patient-list"},Te=["onClick"],Se={class:"info"},Ne={class:"name"},Re={class:"id"},Ue={class:"gender"},$e={class:"age"},Ae=["onClick"],Le={key:0,class:"default-tag"},Me=y(()=>s("p",null,"添加患者",-1)),ze=y(()=>s("div",{class:"patient-tip"},"最多可添加 6 人",-1)),De={key:3,class:"patient-next"},je=O({__name:"PatientInfo",setup(h){const T=Z(),g=B(()=>T.query.isChange==="1"),u=k(),S=n=>{g.value&&(u.value=n.id)},N=H(),R=ee(),U=async()=>{if(!u.value)return f("请选择问诊患者");N.setPatient(u.value),R.push("/consult/pay")},l=k(),P=async()=>{const n=await ue();if(l.value=n,g.value&&l.value.length){const t=l.value.find(c=>c.defaultFlag===1);t?u.value=t.id:u.value=l.value[0].id}};J(()=>{P()});const F={name:"",idCard:"",defaultFlag:0,gender:void 0},e=k({...F}),b=B({get(){return e.value.defaultFlag===1},set(n){e.value.defaultFlag=n?1:0}}),$=async()=>{if(!e.value.name)return f("请输入真实姓名");if(!e.value.idCard)return f("请输入身份证号");if(e.value.gender===void 0)return f("请选择性别");if(!me(e.value.idCard))return f("身份证格式错误");const n=pe(e.value.idCard);if(e.value.gender!==n)return f("性别与身份证不符");e.value.id?await re(e.value):await ce(e.value),r.value=!1,await P(),I(e.value.id?"编辑成功":"添加成功")},A=async()=>{e.value.id&&(await we({title:"温馨提示",message:`您确认要删除 ${e.value.name} 患者信息吗？`}),await _e(e.value.id),r.value=!1,await P(),I("删除成功"))},r=k(!1),x=n=>{if(n){const{id:t,name:c,idCard:C,defaultFlag:V,gender:_}=n;e.value={id:t,name:c,idCard:C,defaultFlag:V,gender:_}}else e.value={...F};r.value=!0},L=[{label:"男",value:1},{label:"女",value:0}];return(n,t)=>{const c=de,C=ie,V=ye,_=le,M=se,z=ne,D=ve,j=he,q=Ce,E=ke;return i(),d("div",be,[o(c,{middleTitle:m(g)?"选择患者":"家庭档案"},null,8,["middleTitle"]),m(g)?(i(),d("div",Ve,Be)):p("",!0),l.value?(i(),d("div",Ie,[(i(!0),d(K,null,Q(l.value,a=>(i(),d("div",{class:ae(["patient-item",{selected:u.value===a.id}]),key:a.id,onClick:G=>S(a)},[s("div",Se,[s("span",Ne,w(a.name),1),s("span",Re,w(m(fe)(a.idCard)),1),s("span",Ue,w(a.genderValue),1),s("span",$e,w(a.age?`${a.age}岁`:""),1)]),s("div",{onClick:G=>x(a),class:"icon"},[o(C,{name:"user-edit"})],8,Ae),a.defaultFlag===1?(i(),d("div",Le,"默认")):p("",!0)],10,Te))),128))])):p("",!0),!l.value||l.value&&l.value.length<6?(i(),d("div",{key:2,class:"patient-add",onClick:t[0]||(t[0]=a=>x())},[o(C,{name:"user-add"}),Me])):p("",!0),ze,m(g)?(i(),d("div",De,[o(V,{onClick:U,type:"primary",round:"",block:""},{default:v(()=>[W("下一步")]),_:1})])):p("",!0),o(E,{show:r.value,"onUpdate:show":t[5]||(t[5]=a=>r.value=a),position:"right"},{default:v(()=>[o(c,{back:()=>r.value=!1,middleTitle:e.value.id?"编辑患者":"添加患者",rightText:"保存",onClickRight:$},null,8,["back","middleTitle"]),o(D,{autocomplete:"off"},{default:v(()=>[o(_,{modelValue:e.value.name,"onUpdate:modelValue":t[1]||(t[1]=a=>e.value.name=a),label:"真实姓名",placeholder:"请输入真实姓名"},null,8,["modelValue"]),o(_,{modelValue:e.value.idCard,"onUpdate:modelValue":t[2]||(t[2]=a=>e.value.idCard=a),label:"身份证号",placeholder:"请输入身份证号",rules:m(ge)},null,8,["modelValue","rules"]),o(_,{label:"性别"},{input:v(()=>[o(M,{modelValue:e.value.gender,"onUpdate:modelValue":t[3]||(t[3]=a=>e.value.gender=a),options:L},null,8,["modelValue"])]),_:1}),o(_,{label:"默认就诊人"},{input:v(()=>[o(z,{modelValue:m(b),"onUpdate:modelValue":t[4]||(t[4]=a=>X(b)?b.value=a:null),round:""},null,8,["modelValue"])]),_:1})]),_:1}),e.value.id?(i(),Y(q,{key:0},{default:v(()=>[o(j,{onClick:A,type:"danger",text:"删除"})]),_:1})):p("",!0)]),_:1},8,["show"])])}}});const ia=Pe(je,[["__scopeId","data-v-4345287a"]]);export{ia as default};