(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){"use strict";t.r(n);var o=t(17),c=t.n(o),r=t(8),a=t(3),u=t(2),i=t(0),s=function(e){var n=e.person,t=e.onDelete;return Object(i.jsxs)("li",{children:[n.name," @ ",n.number," ",Object(i.jsx)("button",{onClick:t(n),children:"delete"})]})},l=function(e){var n=e.persons,t=e.onDelete;return console.log(t),n.map((function(e){return Object(i.jsx)(s,{person:e,onDelete:t},e.id)}))},d=function(e){var n=e.value,t=e.onChange;return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{value:n,onChange:t})]})},j=function(e){return Object(i.jsxs)("form",{children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:e.nameValue,onChange:e.nameOnChange})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:e.numberValue,onChange:e.numberOnChange})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",onClick:e.onClick,children:"add"})})]})},b=t(4),f=t.n(b),h=function(){return f.a.get("/api/persons").then((function(e){return e.data}))},O=function(e){return f.a.post("/api/persons",e).then((function(e){return e.data}))},m=function(e){return f.a.delete("/api/persons/".concat(e.id)).then((function(e){return e.data}))},p=function(e){return f.a.put("/api/persons/".concat(e.id),e).then((function(e){return e.data}))},g=function(e){var n=e.alertMessage;return n?Object(i.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n}):Object(i.jsx)("div",{})};var x=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],o=n[1],c=Object(u.useState)(""),s=Object(a.a)(c,2),b=s[0],f=s[1],x=Object(u.useState)(""),v=Object(a.a)(x,2),C=v[0],w=v[1],k=Object(u.useState)(""),y=Object(a.a)(k,2),S=y[0],D=y[1],V=Object(u.useState)(null),T=Object(a.a)(V,2),B=T[0],E=T[1];return Object(u.useEffect)((function(){console.log("effect"),h().then((function(e){console.log("promise fulfilled"),o(e),console.log(e)}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(g,{alertMessage:B}),Object(i.jsx)(d,{value:S,onChange:function(e){D(e.target.value)}}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(j,{nameValue:b,nameOnChange:function(e){f(e.target.value)},numberValue:C,numberOnChange:function(e){w(e.target.value)},onClick:function(e){e.preventDefault();var n=t.find((function(e){return e.name===b}));t.find((function(e){return e.name===b}))?window.confirm("".concat(b," already exists. Do you want to update their number?"))&&p(Object(r.a)(Object(r.a)({},n),{},{number:C})).then((function(e){console.log("update fulfilled"),console.log(e),o(t.map((function(n){return n.id!==e.id?n:e})))})).catch((function(e){E("".concat(b," was already deleted")),setTimeout((function(){E(null)}),3e3)})):O({name:b,number:C}).then((function(e){console.log(e),o(t.concat(e)),w(""),f(""),E("Added ".concat(e.name)),setTimeout((function(){E(null)}),3e3)}))}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)("ul",{children:Object(i.jsx)(l,{persons:t.filter((function(e){return e.name.toLowerCase().startsWith(S.toLowerCase())})),onDelete:function(e){return function(){m(e).then((function(n){o(t.filter((function(n){return n.id!==e.id})))})).catch((function(n){E("".concat(e.name," was already deleted")),setTimeout((function(){E(null)}),3e3)}))}}})})]})};c.a.render(Object(i.jsx)(x,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.7d6ec2f3.chunk.js.map