import{T as r,K as p}from"./index-7bbc97cb.js";function e(l,{args:t=[],done:i,canceled:s}){if(l){const f=l.apply(null,t);r(f)?f.then(o=>{o?i():s&&s()}).catch(p):f?i():s&&s()}else i()}export{e as c};
