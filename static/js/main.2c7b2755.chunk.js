(this["webpackJsonprandom-english"]=this["webpackJsonprandom-english"]||[]).push([[0],{34:function(e,t,a){e.exports=a(48)},39:function(e,t,a){},40:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},41:function(e,t,a){},42:function(e,t,a){},48:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(29),r=a.n(l),s=(a(39),a(10)),m=(a(40),a(41),a(2)),i=(a(42),a(21)),c=a(8),d=function(e){var t,a,n=c.b().shape({Email:c.d().required().email(),password:c.d().required().max(45)}),l=Object(i.a)({validationSchema:n}),r=l.register,s=l.handleSubmit,d=l.errors;return e.login?o.a.createElement(m.a,{to:"/profile"}):o.a.createElement("div",{className:"h-screen flex justify-center items-center flex-col"},o.a.createElement("div",{className:"flex my-3 items-center"},o.a.createElement("img",{src:"".concat("/random-english-fe","/dice.png"),alt:"logo",width:"50"}),o.a.createElement("h2",{className:"ml-3 text-2xl text-gray-700 font-bold"},"Random English")),o.a.createElement("form",{className:"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",onSubmit:s((function(t){fetch(e.apiEndpoint+"/users/login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:t.Email,password:t.password})}).then((function(e){return e.json()})).then((function(t){if(t.data&&null!=t.data.token){var a=new Date;a.setTime(a.getTime()+9e5),localStorage.setItem("login","true"),e.setCookie("authentication",t.data.token,{expires:a,path:"/",httpOnly:!1})}}))}))},o.a.createElement("div",{className:"mb-4"},o.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"Email"},"Email"),o.a.createElement("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"Email",name:"Email",type:"text",placeholder:"Email",ref:r}),o.a.createElement("p",{className:"text-left text-red-700 text-xs"},null===d||void 0===d||null===(t=d.Email)||void 0===t?void 0:t.message)),o.a.createElement("div",{className:"mb-6"},o.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"password"},"Password"),o.a.createElement("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"password",name:"password",type:"password",placeholder:"******************",ref:r}),o.a.createElement("p",{className:"text-left text-red-700 text-xs"},null===d||void 0===d||null===(a=d.password)||void 0===a?void 0:a.message)),o.a.createElement("div",{className:"flex items-center justify-between",style:{justifyContent:"center"}},o.a.createElement("button",{className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",type:"submit"},"Login"))),o.a.createElement("p",{className:"text-center text-gray-500 text-xs"},"\xa92020 Acme Corp. All rights reserved."))},u=function(e){var t,a,n,l,r,s=c.b().shape({Email:c.d().required().email(),password:c.d().required().max(45),passwordConfirmation:c.d().required().oneOf([c.c("password"),null],"Password must match"),name:c.d().required().max(20),phoneNumber:c.a().typeError("Must be a number").required().test("minlen","Must be more than 8 characters",(function(e){return e.toString().length>=8})).test("maxlen","Must be less than 15 characters",(function(e){return e.toString().length<=15}))}),d=Object(i.a)({validationSchema:s}),u=d.register,p=d.handleSubmit,b=d.errors;return e.login?o.a.createElement(m.a,{to:"/profile"}):o.a.createElement("div",{className:"h-screen flex justify-center items-center flex-col"},o.a.createElement("div",{className:"flex my-3 items-center"},o.a.createElement("img",{src:"".concat("/random-english-fe","/dice.png"),alt:"logo",width:"50"}),o.a.createElement("h2",{className:"ml-3 text-2xl text-gray-700 font-bold"},"Random English")),o.a.createElement("form",{className:"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",onSubmit:p((function(t){fetch(e.apiEndpoint+"/users/register",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:t.Email,password:t.password,name:t.name,numberPhone:t.phoneNumber.toString()})}).then((function(e){return e.json()})).then((function(t){if(console.log(t),t.data&&null!=t.data.token){var a=new Date;a.setTime(a.getTime()+9e5),localStorage.setItem("login","true"),e.setCookie("authentication",t.data.token,{expires:a,path:"/",httpOnly:!1})}}))}))},o.a.createElement("div",{className:"mb-4"},o.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"Email"},"Email"),o.a.createElement("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"Email",name:"Email",type:"text",placeholder:"example@gmail.com",ref:u}),o.a.createElement("p",{className:"text-left text-red-700 text-xs"},null===b||void 0===b||null===(t=b.Email)||void 0===t?void 0:t.message)),o.a.createElement("div",{className:"mb-4"},o.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"password"},"Password"),o.a.createElement("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline",name:"password",id:"password",type:"password",placeholder:"******************",ref:u}),o.a.createElement("p",{className:"text-left text-red-700 text-xs"},null===b||void 0===b||null===(a=b.password)||void 0===a?void 0:a.message)),o.a.createElement("div",{className:"mb-4"},o.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"passwordConfirmation"},"Re-Password"),o.a.createElement("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline",name:"passwordConfirmation",id:"passwordConfirmation",type:"password",placeholder:"******************",ref:u}),o.a.createElement("p",{className:"text-left text-red-700 text-xs"},null===b||void 0===b||null===(n=b.passwordConfirmation)||void 0===n?void 0:n.message)),o.a.createElement("div",{className:"mb-4"},o.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"name"},"Full Name"),o.a.createElement("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline",name:"name",id:"name",type:"text",placeholder:"Kha Tran Minh",ref:u}),o.a.createElement("p",{className:"text-left text-red-700 text-xs"},null===b||void 0===b||null===(l=b.name)||void 0===l?void 0:l.message)),o.a.createElement("div",{className:"mb-4"},o.a.createElement("label",{className:"block text-gray-700 text-sm font-bold mb-2",htmlFor:"phoneNumber"},"Phone Number (Raw numbers)"),o.a.createElement("input",{className:"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline",name:"phoneNumber",id:"phoneNumber",type:"text",placeholder:"0482246257",ref:u}),o.a.createElement("p",{className:"text-left text-red-700 text-xs"},null===b||void 0===b||null===(r=b.phoneNumber)||void 0===r?void 0:r.message)),o.a.createElement("div",{className:"flex items-center justify-between",style:{justifyContent:"center"}},o.a.createElement("button",{className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",type:"submit"},"Register"))),o.a.createElement("p",{className:"text-center text-gray-500 text-xs"},"\xa92020 Acme Corp. All rights reserved."))};var p=function(e){return e.text().then((function(t){console.log(t);var a=JSON.parse(t);return e.ok?a.data:(-1!==[400,401,403].indexOf(e.status)&&(localStorage.removeItem("login"),window.location.reload()),!1)}))},b=function(e){return Object(n.useEffect)((function(){fetch(e.apiEndpoint+"/users/profile",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+e.cookie}}).then((function(e){return p(e)})).then((function(t){console.log(t),e.setNewData(t)}))}),[]),!1===e.data?o.a.createElement(m.a,{to:"/login"}):o.a.createElement("div",{className:"w-full max-w-xs",style:{margin:"50px auto"}},o.a.createElement("form",{className:"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"},o.a.createElement("div",{className:"mb-4"},o.a.createElement("label",{className:"block text-gray-500 text-sm font-bold mb-2"},"Email"),o.a.createElement("p",{className:"block text-gray-700 text-sm font-bold mb-2"},e.data&&e.data.email)),o.a.createElement("div",{className:"mb-4"},o.a.createElement("label",{className:"block text-gray-500 text-sm font-bold mb-2"},"Full Name"),o.a.createElement("p",{className:"block text-gray-700 text-sm font-bold mb-2"},e.data&&e.data.name)),o.a.createElement("div",{className:"mb-4"},o.a.createElement("label",{className:"block text-gray-500 text-sm font-bold mb-2"},"Phone Number"),o.a.createElement("p",{className:"block text-gray-700 text-sm font-bold mb-2"},e.data&&e.data.numberPhone))),o.a.createElement("p",{className:"text-center text-gray-500 text-xs"},"\xa92020 Acme Corp. All rights reserved."))},h=a(50);var f=function(){var e="true"===localStorage.getItem("login"),t="https://random-english.herokuapp.com/api",a=Object(h.a)(["authentication"]),l=Object(s.a)(a,3),r=l[0],i=l[1],c=(l[2],function(e,t,a){return i(e,t,a)}),p=r.authentication,f=Object(n.useState)(null),x=Object(s.a)(f,2),g=x[0],E=x[1],w=function(e){return E(e)};return o.a.createElement("div",{className:"App"},o.a.createElement(m.d,null,o.a.createElement(m.b,{exact:!0,path:"/login",render:function(a){return o.a.createElement(d,{login:e,setCookie:c,apiEndpoint:t})}}),o.a.createElement(m.b,{exact:!0,path:"/profile",render:function(a){return e?o.a.createElement(b,{cookie:p,data:g,setNewData:w,apiEndpoint:t}):o.a.createElement(m.a,{to:"/login"})}}),o.a.createElement(m.b,{exact:!0,path:"/Register",render:function(a){return o.a.createElement(u,{login:e,setCookie:c,apiEndpoint:t})}}),o.a.createElement(m.b,{path:"/",render:function(a){return e?o.a.createElement(b,{cookie:p,data:g,setNewData:w,apiEndpoint:t}):o.a.createElement(m.a,{to:"/login"})}})))},x=a(14);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(x.a,{basename:"random-english-fe"},o.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[34,1,2]]]);
//# sourceMappingURL=main.2c7b2755.chunk.js.map