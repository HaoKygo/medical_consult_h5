System.register(["./index-legacy-7ed2e303.js","./index-legacy-04b56afa.js"],(function(e,t){"use strict";var a,n,l,f,o,i,r,c,s,v,x,m=document.createElement("style");return m.textContent=".van-row{display:flex;flex-wrap:wrap}.van-row--nowrap{flex-wrap:nowrap}.van-row--justify-center{justify-content:center}.van-row--justify-end{justify-content:flex-end}.van-row--justify-space-between{justify-content:space-between}.van-row--justify-space-around{justify-content:space-around}.van-row--align-center{align-items:center}.van-row--align-bottom{align-items:flex-end}.van-col{display:block;box-sizing:border-box;min-height:1px}.van-col--1{flex:0 0 4.16666667%;max-width:4.16666667%}.van-col--offset-1{margin-left:4.16666667%}.van-col--2{flex:0 0 8.33333333%;max-width:8.33333333%}.van-col--offset-2{margin-left:8.33333333%}.van-col--3{flex:0 0 12.5%;max-width:12.5%}.van-col--offset-3{margin-left:12.5%}.van-col--4{flex:0 0 16.66666667%;max-width:16.66666667%}.van-col--offset-4{margin-left:16.66666667%}.van-col--5{flex:0 0 20.83333333%;max-width:20.83333333%}.van-col--offset-5{margin-left:20.83333333%}.van-col--6{flex:0 0 25%;max-width:25%}.van-col--offset-6{margin-left:25%}.van-col--7{flex:0 0 29.16666667%;max-width:29.16666667%}.van-col--offset-7{margin-left:29.16666667%}.van-col--8{flex:0 0 33.33333333%;max-width:33.33333333%}.van-col--offset-8{margin-left:33.33333333%}.van-col--9{flex:0 0 37.5%;max-width:37.5%}.van-col--offset-9{margin-left:37.5%}.van-col--10{flex:0 0 41.66666667%;max-width:41.66666667%}.van-col--offset-10{margin-left:41.66666667%}.van-col--11{flex:0 0 45.83333333%;max-width:45.83333333%}.van-col--offset-11{margin-left:45.83333333%}.van-col--12{flex:0 0 50%;max-width:50%}.van-col--offset-12{margin-left:50%}.van-col--13{flex:0 0 54.16666667%;max-width:54.16666667%}.van-col--offset-13{margin-left:54.16666667%}.van-col--14{flex:0 0 58.33333333%;max-width:58.33333333%}.van-col--offset-14{margin-left:58.33333333%}.van-col--15{flex:0 0 62.5%;max-width:62.5%}.van-col--offset-15{margin-left:62.5%}.van-col--16{flex:0 0 66.66666667%;max-width:66.66666667%}.van-col--offset-16{margin-left:66.66666667%}.van-col--17{flex:0 0 70.83333333%;max-width:70.83333333%}.van-col--offset-17{margin-left:70.83333333%}.van-col--18{flex:0 0 75%;max-width:75%}.van-col--offset-18{margin-left:75%}.van-col--19{flex:0 0 79.16666667%;max-width:79.16666667%}.van-col--offset-19{margin-left:79.16666667%}.van-col--20{flex:0 0 83.33333333%;max-width:83.33333333%}.van-col--offset-20{margin-left:83.33333333%}.van-col--21{flex:0 0 87.5%;max-width:87.5%}.van-col--offset-21{margin-left:87.5%}.van-col--22{flex:0 0 91.66666667%;max-width:91.66666667%}.van-col--offset-22{margin-left:91.66666667%}.van-col--23{flex:0 0 95.83333333%;max-width:95.83333333%}.van-col--offset-23{margin-left:95.83333333%}.van-col--24{flex:0 0 100%;max-width:100%}.van-col--offset-24{margin-left:100%}\n",document.head.appendChild(m),{setters:[e=>{a=e.c,n=e.h,l=e.t,f=e.m,o=e.u,i=e.n,r=e.a,c=e.w},e=>{s=e.d,v=e.a,x=e.c}],execute:function(){const[t,m]=a("row"),u=Symbol(t),d={tag:n("div"),wrap:l,align:String,gutter:f(0),justify:String};var g=s({name:t,props:d,setup(e,{slots:t}){const{children:a,linkChildren:n}=o(u),l=v((()=>{const e=[[]];let t=0;return a.forEach(((a,n)=>{t+=Number(a.span),t>24?(e.push([n]),t-=24):e[e.length-1].push(n)})),e})),f=v((()=>{const t=Number(e.gutter),a=[];return t?(l.value.forEach((e=>{const n=t*(e.length-1)/e.length;e.forEach(((e,l)=>{if(0===l)a.push({right:n});else{const l=t-a[e-1].right,f=n-l;a.push({left:l,right:f})}}))})),a):a}));return n({spaces:f}),()=>{const{tag:a,wrap:n,align:l,justify:f}=e;return x(a,{class:m({[`align-${l}`]:l,[`justify-${f}`]:f,nowrap:!n})},{default:()=>{var e;return[null==(e=t.default)?void 0:e.call(t)]}})}}});const[h,w]=a("col"),p={tag:n("div"),span:f(0),offset:i};var y=s({name:h,props:p,setup(e,{slots:t}){const{parent:a,index:n}=r(u),l=v((()=>{if(!a)return;const{spaces:e}=a;if(e&&e.value&&e.value[n.value]){const{left:t,right:a}=e.value[n.value];return{paddingLeft:t?`${t}px`:null,paddingRight:a?`${a}px`:null}}}));return()=>{const{tag:a,span:n,offset:f}=e;return x(a,{style:l.value,class:w({[n]:n,[`offset-${f}`]:f})},{default:()=>{var e;return[null==(e=t.default)?void 0:e.call(t)]}})}}});e("C",c(y)),e("R",c(g))}}}));
