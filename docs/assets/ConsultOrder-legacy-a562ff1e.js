System.register(["./index-legacy-04b56afa.js","./index-legacy-76c8b560.js","./McNavBar-legacy-163ae2a7.js","./index-legacy-38ccaefa.js","./consult-legacy-47466b10.js","./useDeleteConsultOrder-legacy-257fe821.js","./avatar-doctor-legacy-b54bf544.js","./request-legacy-49611e85.js","./useShowPrescription-legacy-84668b03.js","./index-legacy-784a89ae.js","./_plugin-vue_export-helper-legacy-762b7923.js","./index-legacy-7ed2e303.js","./use-id-legacy-3fcff666.js","./use-route-legacy-047c5dd8.js","./use-refs-legacy-92ed6c7b.js","./interceptor-legacy-9047adcd.js","./use-placeholder-legacy-3f8d867f.js","./function-call-legacy-85d542e3.js","./index-legacy-1e717b33.js"],(function(e,t){"use strict";var l,a,o,s,d,n,r,i,u,c,v,p,y,b,m,g,f,w,O,h,_,C,j,x,k,z,I,$,L,P,T,D,S,F=document.createElement("style");return F.textContent=".consult-item[data-v-381098bb]{border-radius:1.06667vw;box-shadow:0 0 5.86667vw rgba(245,245,245,.1);background-color:#fff;margin-bottom:2.66667vw}.consult-item .head[data-v-381098bb]{display:flex;align-items:center;height:13.33333vw;padding:0 4vw}.consult-item .head .img[data-v-381098bb]{width:5.33333vw;height:5.33333vw}.consult-item .head>p[data-v-381098bb]{flex:1;font-size:4vw;padding-left:2.66667vw}.consult-item .head>span[data-v-381098bb]{color:var(--mc-tag)}.consult-item .head>span.orange[data-v-381098bb]{color:#f2994a}.consult-item .head>span.green[data-v-381098bb]{color:var(--mc-primary)}.consult-item .body[data-v-381098bb]{padding:4vw 4vw 2.13333vw}.consult-item .body .body-row[data-v-381098bb]{display:flex;margin-bottom:1.86667vw}.consult-item .body .body-row .body-label[data-v-381098bb]{width:16.53333vw;font-size:3.46667vw;color:var(--mc-tip)}.consult-item .body .body-row .body-value[data-v-381098bb]{width:66.66667vw}.consult-item .body .body-row .body-value.tip[data-v-381098bb]{color:var(--mc-tip)}.consult-item .foot[data-v-381098bb]{padding:4vw;padding-top:0;display:flex;justify-content:flex-end;align-items:center}.consult-item .foot .van-button[data-v-381098bb]{margin-left:2.66667vw;padding:0 4.26667vw}.consult-item .foot .van-button.gray[data-v-381098bb]{color:var(--mc-text3);background-color:var(--mc-bg)}.consult-item .foot .more[data-v-381098bb]{flex:1;color:var(--cp-tag);font-size:3.46667vw}.consult-list[data-v-b75f24a2]{padding:2.66667vw 4vw}.consult-page[data-v-93084bbd]{padding-top:11.73333vw;background-color:var(--mc-bg);min-height:calc(100vh - 11.73333vw)}\n",document.head.appendChild(F),{setters:[e=>{l=e.d,a=e.v,o=e.r,s=e.a,d=e.o,n=e.e,r=e.h,i=e.t,u=e.A,c=e.u,v=e.c,p=e.w,y=e.i,b=e.s,m=e.k,g=e.p,f=e.f,w=e.F,O=e.j},e=>{h=e.L,_=e.T,C=e.a},e=>{j=e._},e=>{x=e.O,k=e.C},e=>{z=e.g},e=>{I=e.u,$=e.a,L=e.P},e=>{P=e._},null,e=>{T=e.u},e=>{D=e.B},e=>{S=e._},null,null,null,null,null,null,null,null],execute:function(){const t=e=>(g("data-v-381098bb"),e=e(),f(),e),F={class:"consult-item"},M={class:"head van-hairline--bottom"},W=t((()=>r("img",{class:"img",src:P,alt:"doctor avatar"},null,-1))),q={class:"body-row"},B=t((()=>r("div",{class:"body-label"},"病情描述",-1))),N={class:"body-value"},U={class:"body-row"},A=t((()=>r("div",{class:"body-label"},"价格",-1))),E={class:"body-value"},G={class:"body-row"},J=t((()=>r("div",{class:"body-label"},"创建时间",-1))),K={class:"body-value tip"},V={key:0,class:"foot"},H={key:1,class:"foot"},Q={key:2,class:"foot"},R={key:3,class:"foot"},X={class:"more"},Y={key:4,class:"foot"},Z=S(l({__name:"ConsultItem",props:{consultOrder:null},emits:["on-delete"],setup(e,{emit:t}){const l=e,g=a(),{cancelLoading:f,cancelConsultOrder:w}=I(),{deleteLoading:O,deleteConsultOrder:h}=$((()=>{t("on-delete",l.consultOrder.id)})),{showPrescription:_}=T(),C=o(!1),j=s((()=>[{text:"查看处方",disabled:!l.consultOrder.prescriptionId},{text:"删除订单"}])),k=(e,t)=>{0===t&&_(l.consultOrder.prescriptionId),1===t&&h(l.consultOrder)};return(t,l)=>{const a=D,o=L;return d(),n("div",F,[r("div",M,[W,r("p",null,i(e.consultOrder.docInfo?.name||"极速问诊（自动分配医生）"),1),r("span",{class:u({orange:e.consultOrder.status===c(x).ConsultPayWait,green:e.consultOrder.status===c(x).ConsultChat})},i(e.consultOrder.statusValue),3)]),r("div",{class:"body",onClick:l[0]||(l[0]=t=>c(g).push(`/user/consult/${e.consultOrder.id}`))},[r("div",q,[B,r("div",N,i(e.consultOrder.illnessDesc),1)]),r("div",U,[A,r("div",E,"¥ "+i(e.consultOrder.payment.toFixed(2)),1)]),r("div",G,[J,r("div",K,i(e.consultOrder.createTime),1)])]),e.consultOrder.status===c(x).ConsultPayWait?(d(),n("div",V,[v(a,{loading:c(f),onClick:l[1]||(l[1]=t=>c(w)(e.consultOrder)),class:"gray",plain:"",size:"small",round:""},{default:p((()=>[y(" 取消问诊 ")])),_:1},8,["loading"]),v(a,{to:`/user/consult/${e.consultOrder.id}`,type:"primary",plain:"",size:"small",round:""},{default:p((()=>[y(" 去支付 ")])),_:1},8,["to"])])):b("",!0),e.consultOrder.status===c(x).ConsultWait?(d(),n("div",H,[v(a,{loading:c(f),onClick:l[2]||(l[2]=t=>c(w)(e.consultOrder)),class:"gray",plain:"",size:"small",round:""},{default:p((()=>[y(" 取消问诊 ")])),_:1},8,["loading"]),v(a,{to:`/room?orderId=${e.consultOrder.id}`,type:"primary",plain:"",size:"small",round:""},{default:p((()=>[y(" 继续沟通 ")])),_:1},8,["to"])])):b("",!0),e.consultOrder.status===c(x).ConsultChat?(d(),n("div",Q,[e.consultOrder.prescriptionId?(d(),m(a,{key:0,onClick:l[3]||(l[3]=t=>c(_)(e.consultOrder.prescriptionId)),class:"gray",plain:"",size:"small",round:""},{default:p((()=>[y(" 查看处方 ")])),_:1})):b("",!0),v(a,{to:`/room?orderId=${e.consultOrder.id}`,type:"primary",plain:"",size:"small",round:""},{default:p((()=>[y(" 继续沟通 ")])),_:1},8,["to"])])):b("",!0),e.consultOrder.status===c(x).ConsultComplete?(d(),n("div",R,[r("div",X,[v(o,{actions:c(j),onSelect:k,placement:"top-start",show:C.value,"onUpdate:show":l[4]||(l[4]=e=>C.value=e)},{reference:p((()=>[y("更多")])),_:1},8,["actions","show"])]),v(a,{to:`/room?orderId=${e.consultOrder.id}`,class:"gray",plain:"",size:"small",round:""},{default:p((()=>[y(" 问诊记录 ")])),_:1},8,["to"]),e.consultOrder.evaluateId?(d(),m(a,{key:1,to:`/room?orderId=${e.consultOrder.id}`,class:"gray",plain:"",size:"small",round:""},{default:p((()=>[y(" 查看评价 ")])),_:1},8,["to"])):(d(),m(a,{key:0,to:`/room?orderId=${e.consultOrder.id}`,type:"primary",plain:"",size:"small",round:""},{default:p((()=>[y(" 去评价 ")])),_:1},8,["to"]))])):b("",!0),e.consultOrder.status===c(x).ConsultCancel?(d(),n("div",Y,[v(a,{loading:c(O),onClick:l[5]||(l[5]=t=>c(h)(e.consultOrder)),class:"gray",plain:"",size:"small",round:""},{default:p((()=>[y(" 删除订单 ")])),_:1},8,["loading"]),v(a,{type:"primary",plain:"",size:"small",round:"",to:"/"},{default:p((()=>[y("咨询其他医生")])),_:1})])):b("",!0)])}}}),[["__scopeId","data-v-381098bb"]]),ee={class:"consult-list"},te=S(l({__name:"ConsultList",props:{type:null},setup(e){const t=o({type:e.type,current:1,pageSize:5}),l=o(!1),a=o(!1),s=o([]),r=async()=>{const e=await z(t.value);s.value.push(...e.rows),t.value.current<e.pageTotal?t.value.current++:a.value=!0,l.value=!1},i=e=>{s.value=s.value.filter((t=>t.id!==e))};return(e,t)=>{const o=h;return d(),n("div",ee,[v(o,{loading:l.value,"onUpdate:loading":t[0]||(t[0]=e=>l.value=e),finished:a.value,finishedText:"没有更多了",onLoad:r},{default:p((()=>[(d(!0),n(w,null,O(s.value,(e=>(d(),n(w,{key:e.id},[e?(d(),m(Z,{key:0,consultOrder:e,onOnDelete:i},null,8,["consultOrder"])):b("",!0)],64)))),128))])),_:1},8,["loading","finished"])])}}}),[["__scopeId","data-v-b75f24a2"]]),le={class:"consult-page"};e("default",S(l({__name:"ConsultOrder",setup:e=>(e,t)=>{const l=j,a=_,o=C;return d(),n("div",le,[v(l,{middleTitle:"问诊记录"}),v(o,{sticky:""},{default:p((()=>[v(a,{title:"极速问诊"},{default:p((()=>[v(te,{type:c(k).Fast},null,8,["type"])])),_:1}),v(a,{title:"找医生"},{default:p((()=>[v(te,{type:c(k).Doctor},null,8,["type"])])),_:1}),v(a,{title:"开药问诊"},{default:p((()=>[v(te,{type:c(k).Medication},null,8,["type"])])),_:1})])),_:1})])}}),[["__scopeId","data-v-93084bbd"]]))}}}));