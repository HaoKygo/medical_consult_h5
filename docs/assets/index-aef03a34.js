import{d as A,c as i,r as q,C as K,K as Q,L as X,m as $,D as H}from"./index-89f95841.js";import{c as J,Q as D,L as W,n as Y,y as Z,I as F,R as V,x as ee,e as C,m as R,h as P,t as I,S as ae,P as te,T as ne,G as k,w as le}from"./index-3ac92062.js";import{L as ie,u as re}from"./request-64361350.js";import{s as oe}from"./function-call-fed217ea.js";import{I as se}from"./index-f69948ed.js";import{c as ce}from"./interceptor-9d6b5497.js";const[ue,r,de]=J("uploader");function U(e,t){return new Promise(o=>{if(t==="file"){o();return}const c=new FileReader;c.onload=v=>{o(v.target.result)},t==="dataUrl"?c.readAsDataURL(e):t==="text"&&c.readAsText(e)})}function O(e,t){return D(e).some(o=>o.file?W(t)?t(o.file):o.file.size>+t:!1)}function fe(e,t){const o=[],c=[];return e.forEach(v=>{O(v,t)?c.push(v):o.push(v)}),{valid:o,invalid:c}}const ve=/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|avif)/i,me=e=>ve.test(e);function B(e){return e.isImage?!0:e.file&&e.file.type?e.file.type.indexOf("image")===0:e.url?me(e.url):typeof e.content=="string"?e.content.indexOf("data:image")===0:!1}var ge=A({props:{name:Y,item:Z(Object),index:Number,imageFit:String,lazyLoad:Boolean,deletable:Boolean,previewSize:[Number,String,Array],beforeDelete:Function},emits:["delete","preview"],setup(e,{emit:t,slots:o}){const c=()=>{const{status:n,message:u}=e.item;if(n==="uploading"||n==="failed"){const w=n==="failed"?i(F,{name:"close",class:r("mask-icon")},null):i(ie,{class:r("loading")},null),f=ee(u)&&u!=="";return i("div",{class:r("mask")},[w,f&&i("div",{class:r("mask-message")},[u])])}},v=n=>{const{name:u,item:w,index:f,beforeDelete:x}=e;n.stopPropagation(),ce(x,{args:[w,{name:u,index:f}],done:()=>t("delete")})},m=()=>t("preview"),h=()=>{if(e.deletable&&e.item.status!=="uploading"){const n=o["preview-delete"];return i("div",{role:"button",class:r("preview-delete",{shadow:!n}),tabindex:0,"aria-label":de("delete"),onClick:v},[n?n():i(F,{name:"cross",class:r("preview-delete-icon")},null)])}},b=()=>{if(o["preview-cover"]){const{index:n,item:u}=e;return i("div",{class:r("preview-cover")},[o["preview-cover"](C({index:n},u))])}},y=()=>{const{item:n,lazyLoad:u,imageFit:w,previewSize:f}=e;return B(n)?i(se,{fit:w,src:n.content||n.url,class:r("preview-image"),width:Array.isArray(f)?f[0]:f,height:Array.isArray(f)?f[1]:f,lazyLoad:u,onClick:m},{default:b}):i("div",{class:r("file"),style:V(e.previewSize)},[i(F,{class:r("file-icon"),name:"description"},null),i("div",{class:[r("file-name"),"van-ellipsis"]},[n.file?n.file.name:n.url]),b()])};return()=>i("div",{class:r("preview")},[y(),c(),h()])}});const we={name:R(""),accept:P("image/*"),capture:String,multiple:Boolean,disabled:Boolean,readonly:Boolean,lazyLoad:Boolean,maxCount:R(1/0),imageFit:P("cover"),resultType:P("dataUrl"),uploadIcon:P("photograph"),uploadText:String,deletable:I,afterRead:Function,showUpload:I,modelValue:ae(),beforeRead:Function,beforeDelete:Function,previewSize:[Number,String,Array],previewImage:I,previewOptions:Object,previewFullImage:I,maxSize:{type:[Number,String,Function],default:1/0}};var pe=A({name:ue,props:we,emits:["delete","oversize","clickUpload","closePreview","clickPreview","update:modelValue"],setup(e,{emit:t,slots:o}){const c=q(),v=[],m=(a=e.modelValue.length)=>({name:e.name,index:a}),h=()=>{c.value&&(c.value.value="")},b=a=>{if(h(),O(a,e.maxSize))if(Array.isArray(a)){const l=fe(a,e.maxSize);if(a=l.valid,t("oversize",l.invalid,m()),!a.length)return}else{t("oversize",a,m());return}a=H(a),t("update:modelValue",[...e.modelValue,...D(a)]),e.afterRead&&e.afterRead(a,m())},y=a=>{const{maxCount:l,modelValue:d,resultType:s}=e;if(Array.isArray(a)){const g=+l-d.length;a.length>g&&(a=a.slice(0,g)),Promise.all(a.map(p=>U(p,s))).then(p=>{const G=a.map((_,S)=>{const L={file:_,status:"",message:""};return p[S]&&(L.content=p[S]),L});b(G)})}else U(a,s).then(g=>{const p={file:a,status:"",message:""};g&&(p.content=g),b(p)})},n=a=>{const{files:l}=a.target;if(e.disabled||!l||!l.length)return;const d=l.length===1?l[0]:[].slice.call(l);if(e.beforeRead){const s=e.beforeRead(d,m());if(!s){h();return}if(ne(s)){s.then(g=>{y(g||d)}).catch(h);return}}y(d)};let u;const w=()=>t("closePreview"),f=a=>{if(e.previewFullImage){const l=e.modelValue.filter(B),d=l.map(s=>(s.file&&!s.url&&s.status!=="failed"&&(s.url=URL.createObjectURL(s.file),v.push(s.url)),s.url)).filter(Boolean);u=oe(C({images:d,startPosition:l.indexOf(a),onClose:w},e.previewOptions))}},x=()=>{u&&u.close()},j=(a,l)=>{const d=e.modelValue.slice(0);d.splice(l,1),t("update:modelValue",d),t("delete",a,m(l))},N=(a,l)=>{const d=["imageFit","deletable","previewSize","beforeDelete"],s=C(k(e,d),k(a,d,!0));return i(ge,$({item:a,index:l,onClick:()=>t("clickPreview",a,m(l)),onDelete:()=>j(a,l),onPreview:()=>f(a)},k(e,["name","lazyLoad"]),s),k(o,["preview-cover","preview-delete"]))},E=()=>{if(e.previewImage)return e.modelValue.map(N)},z=a=>t("clickUpload",a),T=()=>{if(e.modelValue.length>=+e.maxCount)return;const a=e.readonly?null:i("input",{ref:c,type:"file",class:r("input"),accept:e.accept,capture:e.capture,multiple:e.multiple,disabled:e.disabled,onChange:n},null);return o.default?i("div",{class:r("input-wrapper"),onClick:z},[o.default(),a]):Q(i("div",{class:r("upload",{readonly:e.readonly}),style:V(e.previewSize),onClick:z},[i(F,{name:e.uploadIcon,class:r("upload-icon")},null),e.uploadText&&i("span",{class:r("upload-text")},[e.uploadText]),a]),[[X,e.showUpload]])},M=()=>{c.value&&!e.disabled&&c.value.click()};return K(()=>{v.forEach(a=>URL.revokeObjectURL(a))}),re({chooseFile:M,closeImagePreview:x}),te(()=>e.modelValue),()=>i("div",{class:r()},[i("div",{class:r("wrapper",{disabled:e.disabled})},[E(),T()])])}});const Fe=le(pe);export{Fe as U};