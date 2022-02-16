"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[56],{56:function(a,b,c){c.r(b),c.d(b,{"default":function(){return C}});var d=c(5893),e=c(7294),f=c(9545),g=c(1163),h=c(7563),i=function(){var a=(0,g.useRouter)().asPath,b=new URLSearchParams(a.replace(/^.*?\?/,"")),c=(0,h.parse)(b.toString()||""),d=Array.isArray(c.tags)?c.tags.join(", "):c.tags,f=(0,e.useState)(c.fileType||"png"),i=f[0],j=f[1],k=(0,e.useState)(c.theme||"light"),l=k[0],m=k[1],n=(0,e.useState)(c.timestamp||new Date().toUTCString().split(/\s/).slice(2,4).join(".")),o=n[0],p=n[1],q=(0,e.useState)(c.title||"**Hello** World"),r=q[0],s=q[1],t=(0,e.useState)(d||""),u=t[0],v=t[1],w=(0,e.useState)(c.copyright||""),x=w[0],y=w[1],z=(0,e.useState)(c.logo||"https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-".concat("light"===l?"black":"white",".svg")),A=z[0],B=z[1],C=(0,e.useState)(c.avater||""),D=C[0],E=C[1],F=(0,e.useState)(c.author||""),G=F[0],H=F[1],I=(0,e.useState)(c.aka||""),J=I[0],K=I[1],L=(0,e.useState)(c.site||""),M=L[0],N=L[1];return{fileType:i,setFileType:j,theme:l,setTheme:m,timestamp:o,setTimestamp:p,title:r,setTitle:s,tags:u,setTags:v,copyright:x,setCopyright:y,logo:A,setLogo:B,avater:D,setAvater:E,author:G,setAuthor:H,aka:J,setAka:K,site:M,setSite:N}},j=c(8100),k=function(a){return fetch(a,{mode:"cors",redirect:"follow"}).then(function(a){return a.ok&&200===a.status})},l=function(a){var b=(0,j.ZP)(a,k,{refreshInterval:2000}),c=b.data,d=b.error;return{isLoading:!d&&!c,isError:d}},m=function(){return(0,d.jsx)("div",{className:"loader-wrap",style:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",background:"lightgray"},children:(0,d.jsx)("div",{className:"loader"})})},n=function(){return(0,d.jsx)("div",{children:(0,d.jsx)("p",{children:"failed to load"})})},o=function(a){var b=a.src,c=a.setToast,e=a.onClick,f=l(b),g=f.isLoading,h=f.isError;return g?(0,d.jsx)(m,{}):h?(c({show:!0,message:"Oops, an error occurred"}),(0,d.jsx)(n,{})):(0,d.jsx)("a",{className:"image-wrapper",href:b,onClick:e,children:(0,d.jsx)("img",{id:"og-image",src:b,alt:"Preview of the generated img",title:"Click to copy image URL to clipboard"})})},p=function(a){var b=a.show,c=a.message;return(0,d.jsx)("div",{className:"toast-area",children:(0,d.jsx)("div",{className:"toast-outer",style:{transform:b?"translate3d(0,-0px,-0px) scale(1)":""},children:(0,d.jsx)("div",{className:"toast-inner",children:(0,d.jsx)("div",{className:"toast-message",children:c})})})})},q=function(a){var b=a.label,c=a.input;return(0,d.jsx)("div",{className:"field",children:(0,d.jsxs)("label",{children:[(0,d.jsx)("div",{className:"field-label",children:b}),(0,d.jsx)("div",{className:"field-value",children:c})]})})},r=function(a){var b=a.options,c=a.value,e=a.onChange,f=a.small;return(0,d.jsxs)("div",{className:f?"select-wrapper small":"select-wrapper",children:[(0,d.jsx)("select",{value:c,onChange:function(a){return e(a.target.value)},children:b.map(function(a,b){return(0,d.jsx)("option",{value:a.value,children:a.text},"".concat(b,"-").concat(a.value))})}),(0,d.jsx)("div",{className:f?"select-arrow small":"select-arrow",children:"▼"})]})},s=function(a){var b=a.type,c=a.value,e=a.onInput;return(0,d.jsx)("div",{className:"input-outer-wrapper",children:(0,d.jsx)("div",{className:"input-inner-wrapper",children:(0,d.jsx)("input",{type:void 0===b?"text":b,value:c,onInput:function(a){return e(a.target.value)}})})})},t=[{text:"Light",value:"light"},{text:"Dark",value:"dark"}],u=[{text:"PNG",value:"png"},{text:"JPEG",value:"jpeg"}],v=/https:\/\/assets\.vercel\.com\/image\/upload\/front\/assets\/design\/vercel-triangle-(white|black)\.svg/i,w=function(a){var b=a.theme,c=a.setTheme,e=a.logo,f=a.setLogo;return(0,d.jsx)(q,{label:"Theme",input:(0,d.jsx)(r,{options:t,value:b,onChange:function(a){c(a),v.test(e)&&f("https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-".concat("dark"===a?"white":"black",".svg"))}})})},x=function(a){var b=a.fileType,c=a.setFileType;return(0,d.jsx)(q,{label:"File Type",input:(0,d.jsx)(r,{options:u,value:b,onChange:function(a){return c(a)}})})},y=function(a){var b=a.type,c=a.label,f=a.state,g=a.setState,h=(0,e.useState)(f),i=h[0],j=h[1];return(0,e.useEffect)(function(){var a=setTimeout(function(){console.log("onInput "+i),g(i)},650);return function(){return clearTimeout(a)}},[i]),(0,d.jsx)(q,{label:c,input:(0,d.jsx)(s,{type:b,value:i,onInput:function(a){j(a)}})})};function z(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var A=function(a){var b=a.setState,c=i(),g=c.fileType,h=c.setFileType,j=c.theme,k=c.setTheme,l=c.timestamp,m=c.setTimestamp,n=c.title,o=c.setTitle,p=c.tags,q=c.setTags,r=c.copyright,s=c.setCopyright,t=c.logo,u=c.setLogo,v=c.avater,z=c.setAvater,A=c.author,B=c.setAuthor,C=c.aka,D=c.setAka,E=c.site,F=c.setSite;return(0,e.useEffect)(function(){var a,c=new URLSearchParams({theme:j,timestamp:l,title:n,tags:p,copyright:r,logo:t,avater:v,author:A,aka:C,site:E}),d=new URL("".concat(window.location.protocol,"//").concat("custom-og-image-generator.vercel.app"));((0,f.B8)().basePath||"").replace(/^\//,"").replace(/\/$/,""),d.pathname="/".concat("api","/").concat(encodeURIComponent(n),".").concat(g),c.delete("title"),p.length&&(c.delete("tags"),console.log(void 0===p?"undefined":(a=p)&&"undefined"!=typeof Symbol&&a.constructor===Symbol?"symbol":typeof a),console.log(p),p.split(/[,，\s]+/).map(function(a){return c.append("tags",a)})),d.search=c.toString(),c.forEach(function(a,b){a.length||d.searchParams.delete(b)}),console.log("url is set ".concat(d.href)),b(d.href)},[C,A,v,r,g,t,E,p,j,l,n]),(0,d.jsx)("div",{className:"pull-left",children:(0,d.jsxs)("div",{children:[(0,d.jsx)(w,{theme:j,setTheme:k,logo:t,setLogo:u}),(0,d.jsx)(x,{fileType:g,setFileType:h}),(0,d.jsx)(y,{state:l,setState:m,label:"Timestamp"}),(0,d.jsx)(y,{state:n,setState:o,label:"Title"}),(0,d.jsx)(y,{state:p,setState:q,label:"Tags"}),(0,d.jsx)(y,{state:r,setState:s,label:"Copyright"}),(0,d.jsx)(y,{state:t,setState:u,label:"Logo",type:"url"}),(0,d.jsx)(y,{state:v,setState:z,label:"Avater URL",type:"url"}),(0,d.jsx)(y,{state:A,setState:B,label:"Author name"}),(0,d.jsx)(y,{state:C,setState:D,label:"Alt name"}),(0,d.jsx)(y,{state:E,setState:F,label:"Site name"})]})})},B=function(a){var b=a.src,c=a.setToast;return(0,d.jsx)("div",{className:"pull-right",children:(0,d.jsx)(o,{src:b,setToast:c,onClick:function(a){a.preventDefault(),navigator.clipboard.writeText(b).then(function(){c({show:!0,message:"Copied image URL to clipboard"}),setTimeout(function(){return c({show:!1,message:""})},3000),console.log("Async: Copying to clipboard was successful!")},function(a){window.open(b,"_blank"),console.error("Async: Could not copy text: ",a)})}})})},C=function(a){var b=a.source,c=a.setSource,f=(0,e.useState)({show:!1,message:""}),g=f[0],h=f[1];return(0,d.jsxs)("div",{className:"split",children:[(0,d.jsx)(A,{setState:c}),(0,d.jsx)(B,{src:b,setToast:h}),(0,d.jsx)(p,function(a){for(var b=1;b<arguments.length;b++){var c=null!=arguments[b]?arguments[b]:{},d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){z(a,b,c[b])})}return a}({},g))]})}}}])