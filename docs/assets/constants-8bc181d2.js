import{_ as u,c as m,m as p,h as S,t as h,$ as v,w as b}from"./index-99c93d2d.js";import{u as H}from"./request-985d172c.js";import{d as w,a as D,E as C,c as f}from"./index-62acf543.js";import{b as o}from"./index-58f495e8.js";function g(e,l){const{days:n}=l;let{hours:s,minutes:i,seconds:a,milliseconds:t}=l;if(e.includes("DD")?e=e.replace("DD",u(n)):s+=n*24,e.includes("HH")?e=e.replace("HH",u(s)):i+=s*60,e.includes("mm")?e=e.replace("mm",u(i)):a+=i*60,e.includes("ss")?e=e.replace("ss",u(a)):t+=a*1e3,e.includes("S")){const c=u(t,3);e.includes("SSS")?e=e.replace("SSS",c):e.includes("SS")?e=e.replace("SS",c.slice(0,2)):e=e.replace("S",c.charAt(0))}return e}const[x,P]=m("count-down"),k={time:p(0),format:S("HH:mm:ss"),autoStart:h,millisecond:Boolean};var N=w({name:x,props:k,emits:["change","finish"],setup(e,{emit:l,slots:n}){const{start:s,pause:i,reset:a,current:t}=v({time:+e.time,millisecond:e.millisecond,onChange:r=>l("change",r),onFinish:()=>l("finish")}),c=D(()=>g(e.format,t.value)),d=()=>{a(+e.time),e.autoStart&&s()};return C(()=>e.time,d,{immediate:!0}),H({start:s,pause:i,reset:d}),()=>f("div",{role:"timer",class:P()},[n.default?n.default(t.value):c.value])}});const T=b(N);const Y=[{label:"一周内",value:o.Week},{label:"一月内",value:o.Month},{label:"半年内",value:o.HalfYear},{label:"大于半年",value:o.AfterHalfYear}],_=[{label:"就诊过",value:1},{label:"没就诊过",value:0}];export{T as C,_ as f,Y as t};