(this.webpackJsonpmonth_food=this.webpackJsonpmonth_food||[]).push([[0],{22:function(t,e,n){},41:function(t,e,n){},43:function(t,e,n){"use strict";n.r(e);var o=n(2),a=n.n(o),r=n(16),s=n.n(r),c=(n(22),n(17)),l=n(6),i=n.n(l),m=(n(41),n(7)),u=n.n(m),g=n(0);var d=function(){var t=Object(o.useState)({fdmtNm:null,rtnFileCours:null,rtnStreFileNm:null,cntntsNo:null,storageMethod:null}),e=Object(c.a)(t,2),n=e[0],a=e[1];Object(o.useEffect)((function(){i.a.post("monthFdmtLst",null,{params:{thisYear:"2015",thisMonth:"09",apiKey:"20210927YDGGO5VZ65DA9GRKISG"}}).then((function(t){var e;e=(new u.a).parseFromString(t.data).getElementsByTagName("item").map((function(t){return{fdmtNm:t.getElementsByTagName("fdmtNm")[0].value.replace(/ >/g,""),rtnFileCours:t.getElementsByTagName("rtnFileCours")[0].value.replace(/ >/g,"").split("|")[0],rtnStreFileNm:t.getElementsByTagName("rtnStreFileNm")[0].value.replace(/ >/g,"").split("|")[0],cntntsNo:t.getElementsByTagName("cntntsNo")[0].value.replace(/ >/g,"")}})),r(e)})).catch((function(t){console.log(t)}))}),[]);var r=function(t){t.map((function(e,n){i.a.post("monthFdmtDtl",null,{params:{cntntsNo:e.cntntsNo,apiKey:"20210927YDGGO5VZ65DA9GRKISG"}}).then((function(e){var o=(new u.a).parseFromString(e.data).getElementsByTagName("cstdyMthDtl");t[n].storageMethod=o[0].value.split("\u25a0 \uc190\uc9c8\ubc95")[0],console.log("arr",t),a(t)})).catch((function(t){console.log(t)}))}))};return console.log("monthFoodList",n),console.log("monthFoodList[0]",n[0]),n[0]&&console.log("www.nongsaro.go.kr/".concat(n[0].rtnFileCours,"/").concat(n[0].rtnStreFileNm)),Object(g.jsx)("div",{className:"ThisMonthFoods",children:Object(g.jsx)("div",{className:"container",children:Object(g.jsxs)("div",{className:"box",children:[Object(g.jsx)("div",{className:"imgBx",children:Array.isArray(n)&&Object(g.jsx)("img",{src:"https://www.nongsaro.go.kr/".concat(n[0].rtnFileCours,"/").concat(n[0].rtnStreFileNm),alt:"img1"})}),Object(g.jsxs)("div",{className:"content",children:[Object(g.jsx)("h3",{children:Array.isArray(n)&&n[0].fdmtNm}),Object(g.jsx)("p",{children:Array.isArray(n)&&n[0].storageMethod})]})]})})})};var h=function(){return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(d,{})})},j=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(e){var n=e.getCLS,o=e.getFID,a=e.getFCP,r=e.getLCP,s=e.getTTFB;n(t),o(t),a(t),r(t),s(t)}))};s.a.render(Object(g.jsx)(a.a.StrictMode,{children:Object(g.jsx)(h,{})}),document.getElementById("root")),j()}},[[43,1,2]]]);
//# sourceMappingURL=main.6e07cd1d.chunk.js.map