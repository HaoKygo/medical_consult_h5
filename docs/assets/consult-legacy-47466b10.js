System.register(["./request-legacy-49611e85.js"],(function(t,e){"use strict";var r;return{setters:[t=>{r=t.r}],execute:function(){t("a",(()=>r.get("/dep/all"))),t("u",(t=>{const e=new FormData;return e.append("file",t),r.post("/upload",e)})),t("b",(t=>r.get("/patient/consult/order/pre",{params:t}))),t("c",(t=>r.post("/patient/consult/order",t))),t("j",(t=>r.post("/patient/consult/pay",t))),t("d",(t=>r.get("/patient/consult/order/detail",{params:{orderId:t}}))),t("i",(t=>r.get(`/patient/consult/prescription/${t}`))),t("e",(t=>r.post("/patient/order/evaluate",t))),t("g",(t=>r.get("/patient/consult/order/list",{params:t}))),t("f",(t=>r.put(`/patient/order/cancel/${t}`))),t("h",(t=>r.delete(`/patient/order/${t}`)))}}}));