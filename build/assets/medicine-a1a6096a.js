import{r}from"./request-1e49b8c9.js";const i=e=>r.get("/patient/medicine/order/pre",{params:e}),d=()=>r.get("/patient/order/address"),n=e=>r.post("/patient/medicine/order",e),s=e=>r.get(`/patient/medicine/order/detail/${e}`),a=e=>r.get(`/patient/order/${e}/logistics`);export{d as a,s as b,n as c,a as d,i as g};
