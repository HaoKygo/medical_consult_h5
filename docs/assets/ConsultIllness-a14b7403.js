import{d as B,r as p,a as F,n as k,l as M,o as v,e as f,c as a,h as l,s as N,w as S,i as U,u as w,v as A,p as R,f as O}from"./index-f5f1119c.js";import{U as q}from"./index-0b1c75d6.js";import{_ as H}from"./McRadioBtn-c4d1d2f8.js";import"./index-4f9393da.js";import{F as Y}from"./index-337c3c8c.js";import{_ as z}from"./McIcon-58689b11.js";import{_ as E}from"./McNavBar-136131ff.js";import{_ as L}from"./avatar-doctor-206a2b5c.js";import{b as d}from"./index-37606aa6.js";import{u as P}from"./consult-df834d4c.js";import{s as W}from"./function-call-c4d2aba7.js";import{B as j}from"./index-8f5ab0a4.js";import{_ as G}from"./_plugin-vue_export-helper-c27b6911.js";import"./index-7bbc97cb.js";import"./request-1e49b8c9.js";import"./interceptor-1f6677ae.js";import"./function-call-36cfbf3d.js";import"./index-289f4697.js";import"./use-route-1cfc7fa9.js";import"./use-id-b3b21262.js";import"./use-placeholder-ca6656c1.js";import"./index-b9168585.js";const i=c=>(R("data-v-9372bfa1"),c=c(),O(),c),J={class:"consult-illness-page"},K={class:"illness-tip van-hairline--bottom"},Q=i(()=>l("img",{class:"img",src:L,alt:"doctor img"},null,-1)),X={class:"info"},Z=i(()=>l("p",{class:"title"},"在线医生",-1)),$=i(()=>l("p",{class:"tip"}," 请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助 ",-1)),ee={class:"safe"},se=i(()=>l("span",null,"内容仅医生可见",-1)),oe={class:"illness-form"},le={class:"question"},te=i(()=>l("p",null,"本次患病多久了？",-1)),ne={class:"question"},ae=i(()=>l("p",null,"此次病情是否去医院就诊过？",-1)),ie={class:"illness-img"},ue={key:0,class:"tip"},ce=B({__name:"ConsultIllness",setup(c){const g=p([{label:"一周内",value:d.Week},{label:"一月内",value:d.Month},{label:"半年内",value:d.HalfYear},{label:"大于半年",value:d.AfterHalfYear}]),h=p([{label:"就诊过",value:1},{label:"未就诊过",value:0}]),s=p({illnessDesc:"",illnessTime:void 0,consultFlag:void 0,pictures:[]}),u=p([]),b=o=>{Array.isArray(o)||o.file&&(o.status="uploading",o.message="上传中...",P(o.file).then(e=>{var t;o.status="done",o.message=void 0,o.url=e.url,(t=s.value.pictures)==null||t.push(e)}).catch(()=>{o.status="failed",o.message="上传失败"}))},V=o=>{var e;s.value.pictures=(e=s.value.pictures)==null?void 0:e.filter(t=>t.url!==o.url)},x=F(()=>!s.value.illnessDesc||!s.value.illnessTime||s.value.consultFlag===void 0),m=k(),C=A(),I=()=>{m.setIllness(s.value),C.push("/user/patient?isChange=1")};return M(()=>{m.consult.illnessDesc&&W({title:"提示",message:"您之前有填写病情描述的记录，需要回现吗？",closeOnPopstate:!1}).then(()=>{const{illnessDesc:o,illnessTime:e,consultFlag:t,pictures:r}=m.consult;s.value={illnessDesc:o,illnessTime:e,consultFlag:t},s.value.pictures=r||[],u.value=r||[]})}),(o,e)=>{const t=E,r=z,D=Y,_=H,T=q,y=j;return v(),f("div",J,[a(t,{middleTitle:"图文问诊"}),l("div",K,[Q,l("div",X,[Z,$,l("p",ee,[a(r,{name:"consult-safe"}),se])])]),l("div",oe,[a(D,{modelValue:s.value.illnessDesc,"onUpdate:modelValue":e[0]||(e[0]=n=>s.value.illnessDesc=n),type:"textarea",rows:"3",placeholder:"请详细描述您的病情，病情描述不能为空"},null,8,["modelValue"]),l("div",le,[te,a(_,{modelValue:s.value.illnessTime,"onUpdate:modelValue":e[1]||(e[1]=n=>s.value.illnessTime=n),options:g.value},null,8,["modelValue","options"])]),l("div",ne,[ae,a(_,{modelValue:s.value.consultFlag,"onUpdate:modelValue":e[2]||(e[2]=n=>s.value.consultFlag=n),options:h.value},null,8,["modelValue","options"])]),l("div",ie,[a(T,{modelValue:u.value,"onUpdate:modelValue":e[3]||(e[3]=n=>u.value=n),onDelete:V,afterRead:b,maxCount:"9",maxSize:"5 * 1024 * 1024",uploadIcon:"photo-o",uploadText:"上传图片"},null,8,["modelValue"]),u.value&&u.value.length>0?N("",!0):(v(),f("p",ue," 上传内容仅医生可见,最多9张图,最大5MB "))]),a(y,{disabled:w(x),onClick:I,block:"",round:"",type:"primary"},{default:S(()=>[U(" 下一步 ")]),_:1},8,["disabled"])])])}}});const Se=G(ce,[["__scopeId","data-v-9372bfa1"]]);export{Se as default};