System.register(["./index-legacy-7ed2e303.js","./request-legacy-49611e85.js","./index-legacy-04b56afa.js"],(function(e,r){"use strict";var t,a,n,s,l,i,o,d,u,m;return{setters:[e=>{t=e.c,a=e.u,n=e.n,s=e.t,l=e.F,i=e.p,o=e.w},e=>{d=e.u},e=>{u=e.d,m=e.c}],execute:function(){const[r,c]=t("form"),g={colon:Boolean,disabled:Boolean,readonly:Boolean,showError:Boolean,labelWidth:n,labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,submitOnEnter:s,showErrorMessage:s,errorMessageAlign:String,validateTrigger:{type:[String,Array],default:"onBlur"}};var h=u({name:r,props:g,emits:["submit","failed"],setup(e,{emit:r,slots:t}){const{children:n,linkChildren:s}=a(l),o=e=>e?n.filter((r=>e.includes(r.name))):n,u=r=>{return"string"==typeof r?(e=>{const r=n.find((r=>r.name===e));return r?new Promise(((e,t)=>{r.validate().then((r=>{r?t(r):e()}))})):Promise.reject()})(r):e.validateFirst?(t=r,new Promise(((e,r)=>{const a=[];o(t).reduce(((e,r)=>e.then((()=>{if(!a.length)return r.validate().then((e=>{e&&a.push(e)}))}))),Promise.resolve()).then((()=>{a.length?r(a):e()}))}))):(e=>new Promise(((r,t)=>{const a=o(e);Promise.all(a.map((e=>e.validate()))).then((e=>{(e=e.filter(Boolean)).length?t(e):r()}))})))(r);var t},g=(e,r)=>{n.some((t=>t.name===e&&(t.$el.scrollIntoView(r),!0)))},h=()=>n.reduce(((e,r)=>(void 0!==r.name&&(e[r.name]=r.formValue.value),e)),{}),p=()=>{const t=h();u().then((()=>r("submit",t))).catch((a=>{r("failed",{values:t,errors:a}),e.scrollToError&&a[0].name&&g(a[0].name)}))},v=e=>{i(e),p()};return s({props:e}),d({submit:p,validate:u,getValues:h,scrollToField:g,resetValidation:e=>{"string"==typeof e&&(e=[e]),o(e).forEach((e=>{e.resetValidation()}))},getValidationStatus:()=>n.reduce(((e,r)=>(e[r.name]=r.getValidationStatus(),e)),{})}),()=>{var e;return m("form",{class:c(),onSubmit:v},[null==(e=t.default)?void 0:e.call(t)])}}});e("F",o(h)),e("a",(e=>e.replace(/(^\d{6})(\d{8})([Xx\d]{4}$)/,"$1******$3")));const p=/^[1-9]\d{5}(19\d{2}|20([0-1]\d|2[0-2]))((0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[01])|(02)(0[1-9]|[1-2]\d))(?!000)\d{3}[0-9Xx]$/;e("i",(e=>!!e.match(p))),e("e",(e=>{const r=e[e.length-2];return Number(r)%2==1?1:0})),e("m",[{required:!0,message:"请输入手机号"},{pattern:/^1[3-9]\d{9}$/,message:"手机号格式不正确"}]),e("p",[{required:!0,message:"请输入密码"},{pattern:/^[a-zA-Z0-9]{8,24}$/,message:"密码需包含8-24个字符"}]),e("v",[{required:!0,message:"请输入正确的验证码"},{pattern:/^\d{6}$/,message:"6位数字验证码"}]),e("b",[{required:!0,message:"请输入身份证号"},{pattern:p,message:"身份证号码格式不对"}])}}}));
