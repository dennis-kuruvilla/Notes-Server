(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{41:function(t,n,e){"use strict";e.r(n);var c=e(16),r=e.n(c),o=e(7),a=e(3),i=e(1),u=e(4),s=e.n(u),j=e(0),f=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"make not important":"make important";return Object(j.jsxs)("li",{children:[n.content,Object(j.jsx)("button",{onClick:e,children:c})]})},l="/api/notes",b=function(){return s.a.get(l).then((function(t){return t.data}))},d=function(t){return s.a.post(l,t).then((function(t){return t.data}))},p=function(t,n){return s.a.put("".concat(l,"/").concat(t),n).then((function(t){return t.data}))},h=function(){var t=Object(i.useState)([]),n=Object(a.a)(t,2),e=n[0],c=n[1],r=Object(i.useState)(""),u=Object(a.a)(r,2),s=u[0],l=u[1],h=Object(i.useState)(!0),O=Object(a.a)(h,2),m=O[0],v=O[1];Object(i.useEffect)((function(){b().then((function(t){c(t)}))}),[]);var g=m?e:e.filter((function(t){return!0===t.important}));return Object(j.jsxs)("div",{children:[Object(j.jsx)("h1",{children:"Notes"}),Object(j.jsx)("div",{children:Object(j.jsxs)("button",{onClick:function(){return v(!m)},children:["show ",m?"important":"all"]})}),Object(j.jsx)("ul",{children:g.map((function(t){return Object(j.jsx)(f,{note:t,toggleImportance:function(){return function(t){var n=e.find((function(n){return n.id===t})),r=Object(o.a)(Object(o.a)({},n),{},{important:!n.important});p(t,r).then((function(n){c(e.map((function(e){return e.id!==t?e:n})))})).catch((function(r){alert("the note '".concat(n.content,"' was already deleted from server")),c(e.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(j.jsxs)("form",{onSubmit:function(t){t.preventDefault(),console.log("button clicked",t.target);var n={content:s,date:(new Date).toISOString(),important:Math.random()<.5};d(n).then((function(t){c(e.concat(t)),l("")}))},children:[Object(j.jsx)("input",{value:s,onChange:function(t){console.log(t.target.value),l(t.target.value)}}),Object(j.jsx)("button",{type:"submit",children:"save"})]})]})};r.a.render(Object(j.jsx)(h,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.78d522ef.chunk.js.map