(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[537],{4020:function(a){"use strict";var b="%[a-f0-9]{2}",c=new RegExp(b,"gi"),d=new RegExp("("+b+")+","gi");function e(a,b){try{return decodeURIComponent(a.join(""))}catch(c){}if(1===a.length)return a;b=b||1;var d=a.slice(0,b),f=a.slice(b);return Array.prototype.concat.call([],e(d),e(f))}function f(a){try{return decodeURIComponent(a)}catch(b){for(var d=a.match(c),f=1;f<d.length;f++)d=(a=e(d,f).join("")).match(c);return a}}a.exports=function(a){if("string"!=typeof a)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof a+"`");try{return a=a.replace(/\+/g," "),decodeURIComponent(a)}catch(b){return(function(a){for(var b={"%FE%FF":"��","%FF%FE":"��"},c=d.exec(a);c;){try{b[c[0]]=decodeURIComponent(c[0])}catch(e){var g=f(c[0]);g!==c[0]&&(b[c[0]]=g)}c=d.exec(a)}b["%C2"]="�";for(var h=Object.keys(b),i=0;i<h.length;i++){var j=h[i];a=a.replace(new RegExp(j,"g"),b[j])}return a})(a)}}},2806:function(a){"use strict";a.exports=function(a,b){for(var c={},d=Object.keys(a),e=Array.isArray(b),f=0;f<d.length;f++){var g=d[f],h=a[g];(e?-1!==b.indexOf(g):b(g,h,a))&&(c[g]=h)}return c}},1752:function(a,b,c){a.exports=c(8027)},7563:function(a,b,c){"use strict";const d=c(610),e=c(4020),f=c(500),g=c(2806),h=a=>null==a,i=Symbol("encodeFragmentIdentifier");function j(a){if("string"!=typeof a||1!==a.length)throw new TypeError("arrayFormatSeparator must be single character string")}function k(a,b){return b.encode?b.strict?d(a):encodeURIComponent(a):a}function l(a,b){return b.decode?e(a):a}function m(a){return Array.isArray(a)?a.sort():"object"==typeof a?m(Object.keys(a)).sort((a,b)=>Number(a)-Number(b)).map(b=>a[b]):a}function n(a){const b=a.indexOf("#");return -1!==b&&(a=a.slice(0,b)),a}function o(a){a=n(a);const b=a.indexOf("?");return -1===b?"":a.slice(b+1)}function p(a,b){return b.parseNumbers&&!Number.isNaN(Number(a))&&"string"==typeof a&&""!==a.trim()?a=Number(a):b.parseBooleans&&null!==a&&("true"===a.toLowerCase()||"false"===a.toLowerCase())&&(a="true"===a.toLowerCase()),a}function q(a,b){j((b=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},b)).arrayFormatSeparator);const c=function(a){let b;switch(a.arrayFormat){case"index":return(a,c,d)=>{if(b=/\[(\d*)\]$/.exec(a),a=a.replace(/\[\d*\]$/,""),!b){d[a]=c;return}void 0===d[a]&&(d[a]={}),d[a][b[1]]=c};case"bracket":return(a,c,d)=>{if(b=/(\[\])$/.exec(a),a=a.replace(/\[\]$/,""),!b){d[a]=c;return}if(void 0===d[a]){d[a]=[c];return}d[a]=[].concat(d[a],c)};case"colon-list-separator":return(a,c,d)=>{if(b=/(:list)$/.exec(a),a=a.replace(/:list$/,""),!b){d[a]=c;return}if(void 0===d[a]){d[a]=[c];return}d[a]=[].concat(d[a],c)};case"comma":case"separator":return(b,c,d)=>{const e="string"==typeof c&&c.includes(a.arrayFormatSeparator),f="string"==typeof c&&!e&&l(c,a).includes(a.arrayFormatSeparator);c=f?l(c,a):c;const g=e||f?c.split(a.arrayFormatSeparator).map(b=>l(b,a)):null===c?c:l(c,a);d[b]=g};case"bracket-separator":return(b,c,d)=>{const e=/(\[\])$/.test(b);if(b=b.replace(/\[\]$/,""),!e){d[b]=c?l(c,a):c;return}const f=null===c?[]:c.split(a.arrayFormatSeparator).map(b=>l(b,a));if(void 0===d[b]){d[b]=f;return}d[b]=[].concat(d[b],f)};default:return(a,b,c)=>{if(void 0===c[a]){c[a]=b;return}c[a]=[].concat(c[a],b)}}}(b),d=Object.create(null);if("string"!=typeof a)return d;if(!(a=a.trim().replace(/^[?#&]/,"")))return d;for(const e of a.split("&")){if(""===e)continue;let[g,h]=f(b.decode?e.replace(/\+/g," "):e,"=");h=void 0===h?null:["comma","separator","bracket-separator"].includes(b.arrayFormat)?h:l(h,b),c(l(g,b),h,d)}for(const i of Object.keys(d)){const k=d[i];if("object"==typeof k&&null!==k)for(const n of Object.keys(k))k[n]=p(k[n],b);else d[i]=p(k,b)}return!1===b.sort?d:(!0===b.sort?Object.keys(d).sort():Object.keys(d).sort(b.sort)).reduce((a,b)=>{const c=d[b];return Boolean(c)&&"object"==typeof c&&!Array.isArray(c)?a[b]=m(c):a[b]=c,a},Object.create(null))}b.extract=o,b.parse=q,b.stringify=(a,b)=>{if(!a)return"";j((b=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},b)).arrayFormatSeparator);const c=c=>b.skipNull&&h(a[c])||b.skipEmptyString&&""===a[c],d=function(a){switch(a.arrayFormat){case"index":return b=>(c,d)=>{const e=c.length;return void 0===d||a.skipNull&&null===d||a.skipEmptyString&&""===d?c:null===d?[...c,[k(b,a),"[",e,"]"].join("")]:[...c,[k(b,a),"[",k(e,a),"]=",k(d,a)].join("")]};case"bracket":return b=>(c,d)=>void 0===d||a.skipNull&&null===d||a.skipEmptyString&&""===d?c:null===d?[...c,[k(b,a),"[]"].join("")]:[...c,[k(b,a),"[]=",k(d,a)].join("")];case"colon-list-separator":return b=>(c,d)=>void 0===d||a.skipNull&&null===d||a.skipEmptyString&&""===d?c:null===d?[...c,[k(b,a),":list="].join("")]:[...c,[k(b,a),":list=",k(d,a)].join("")];case"comma":case"separator":case"bracket-separator":{const b="bracket-separator"===a.arrayFormat?"[]=":"=";return c=>(d,e)=>void 0===e||a.skipNull&&null===e||a.skipEmptyString&&""===e?d:(e=null===e?"":e,0===d.length)?[[k(c,a),b,k(e,a)].join("")]:[[d,k(e,a)].join(a.arrayFormatSeparator)]}default:return b=>(c,d)=>void 0===d||a.skipNull&&null===d||a.skipEmptyString&&""===d?c:null===d?[...c,k(b,a)]:[...c,[k(b,a),"=",k(d,a)].join("")]}}(b),e={};for(const f of Object.keys(a))c(f)||(e[f]=a[f]);const g=Object.keys(e);return!1!==b.sort&&g.sort(b.sort),g.map(c=>{const e=a[c];return void 0===e?"":null===e?k(c,b):Array.isArray(e)?0===e.length&&"bracket-separator"===b.arrayFormat?k(c,b)+"[]":e.reduce(d(c),[]).join("&"):k(c,b)+"="+k(e,b)}).filter(a=>a.length>0).join("&")},b.parseUrl=(a,b)=>{b=Object.assign({decode:!0},b);const[c,d]=f(a,"#");return Object.assign({url:c.split("?")[0]||"",query:q(o(a),b)},b&&b.parseFragmentIdentifier&&d?{fragmentIdentifier:l(d,b)}:{})},b.stringifyUrl=(a,c)=>{c=Object.assign({encode:!0,strict:!0,[i]:!0},c);const d=n(a.url).split("?")[0]||"",e=b.extract(a.url),f=b.parse(e,{sort:!1}),g=Object.assign(f,a.query);let h=b.stringify(g,c);h&&(h=`?${h}`);let j=function(a){let b="";const c=a.indexOf("#");return -1!==c&&(b=a.slice(c)),b}(a.url);return a.fragmentIdentifier&&(j=`#${c[i]?k(a.fragmentIdentifier,c):a.fragmentIdentifier}`),`${d}${h}${j}`},b.pick=(a,c,d)=>{d=Object.assign({parseFragmentIdentifier:!0,[i]:!1},d);const{url:e,query:f,fragmentIdentifier:h}=b.parseUrl(a,d);return b.stringifyUrl({url:e,query:g(f,c),fragmentIdentifier:h},d)},b.exclude=(a,c,d)=>{const e=Array.isArray(c)?a=>!c.includes(a):(a,b)=>!c(a,b);return b.pick(a,e,d)}},500:function(a){"use strict";a.exports=(a,b)=>{if(!("string"==typeof a&&"string"==typeof b))throw new TypeError("Expected the arguments to be of type `string`");if(""===b)return[a];const c=a.indexOf(b);return -1===c?[a]:[a.slice(0,c),a.slice(c+b.length)]}},610:function(a){"use strict";a.exports=a=>encodeURIComponent(a).replace(/[!'()*]/g,a=>`%${a.charCodeAt(0).toString(16).toUpperCase()}`)},8100:function(a,b,c){"use strict";c.d(b,{ZP:function(){return T}});var d=c(7294);function e(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(b){f(b)}}function h(a){try{i(d.throw(a))}catch(b){f(b)}}function i(a){var b;a.done?e(a.value):((b=a.value)instanceof c?b:new c(function(a){a(b)})).then(g,h)}i((d=d.apply(a,b||[])).next())})}function f(a,b){var c,d,e,f,g={label:0,sent:function(){if(1&e[0])throw e[1];return e[1]},trys:[],ops:[]};return f={next:h(0),"throw":h(1),"return":h(2)},"function"==typeof Symbol&&(f[Symbol.iterator]=function(){return this}),f;function h(a){return function(b){return i([a,b])}}function i(f){if(c)throw new TypeError("Generator is already executing.");for(;g;)try{if(c=1,d&&(e=2&f[0]?d.return:f[0]?d.throw||((e=d.return)&&e.call(d),0):d.next)&&!(e=e.call(d,f[1])).done)return e;switch(d=0,e&&(f=[2&f[0],e.value]),f[0]){case 0:case 1:e=f;break;case 4:return g.label++,{value:f[1],done:!1};case 5:g.label++,d=f[1],f=[0];continue;case 7:f=g.ops.pop(),g.trys.pop();continue;default:if(!(e=(e=g.trys).length>0&&e[e.length-1])&&(6===f[0]||2===f[0])){g=0;continue}if(3===f[0]&&(!e||f[1]>e[0]&&f[1]<e[3])){g.label=f[1];break}if(6===f[0]&&g.label<e[1]){g.label=e[1],e=f;break}if(e&&g.label<e[2]){g.label=e[2],g.ops.push(f);break}e[2]&&g.ops.pop(),g.trys.pop();continue}f=b.call(a,g)}catch(h){f=[6,h],d=0}finally{c=e=0}if(5&f[0])throw f[1];return{value:f[0]?f[1]:void 0,done:!0}}}var g=function(){},h=g(),i=Object,j=function(a){return a===h},k=function(a){return"function"==typeof a},l=function(a,b){return i.assign({},a,b)},m="undefined",n=function(){return typeof window!=m},o=new WeakMap(),p=0,q=function(a){var b,c,d=typeof a,e=a&&a.constructor,f=e==Date;if(i(a)!==a||f||e==RegExp)b=f?a.toJSON():"symbol"==d?a.toString():"string"==d?JSON.stringify(a):""+a;else{if(b=o.get(a))return b;if(b=++p+"~",o.set(a,b),e==Array){for(c=0,b="@";c<a.length;c++)b+=q(a[c])+",";o.set(a,b)}if(e==i){b="#";for(var g=i.keys(a).sort();!j(c=g.pop());)j(a[c])||(b+=c+":"+q(a[c])+",");o.set(a,b)}}return b},r=!0,s=n(),t=typeof document!=m,u=s&&window.addEventListener?window.addEventListener.bind(window):g,v=t?document.addEventListener.bind(document):g,w=s&&window.removeEventListener?window.removeEventListener.bind(window):g,x=t?document.removeEventListener.bind(document):g,y={initFocus:function(a){return v("visibilitychange",a),u("focus",a),function(){x("visibilitychange",a),w("focus",a)}},initReconnect:function(a){var b=function(){r=!0,a()},c=function(){r=!1};return u("online",b),u("offline",c),function(){w("online",b),w("offline",c)}}},z=!n()||"Deno"in window,A=z?d.useEffect:d.useLayoutEffect,B="undefined"!=typeof navigator&&navigator.connection,C=!z&&B&&(["slow-2g","2g"].includes(B.effectiveType)||B.saveData),D=function(a){if(k(a))try{a=a()}catch(b){a=""}var c=[].concat(a);return[a="string"==typeof a?a:(Array.isArray(a)?a.length:a)?q(a):"",c,a?"$swr$"+a:""]},E=new WeakMap(),F=function(a,b,c,d,e,f,g){void 0===g&&(g=!0);var h=E.get(a),i=h[0],j=h[1],k=h[3],l=i[b],m=j[b];if(g&&m)for(var n=0;n<m.length;++n)m[n](c,d,e);return f&&(delete k[b],l&&l[0])?l[0](2).then(function(){return a.get(b)}):a.get(b)},G=0,H=function(){return++G},I=function(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];return e(void 0,void 0,void 0,function(){var b,c,d,e,g,i,m,n,o,p,q,r,s,t,u,v,w,x,y,z;return f(this,function(f){switch(f.label){case 0:if(b=a[0],c=a[1],d=a[2],i=!1!==(g="boolean"==typeof(e=a[3])?{revalidate:e}:e||{}).populateCache,m=!1!==g.revalidate,n=!1!==g.rollbackOnError,o=g.optimisticData,q=(p=D(c))[0],r=p[2],!q)return[2];if(t=(s=E.get(b))[2],a.length<3)return[2,F(b,q,b.get(q),h,h,m,i)];if(u=d,w=H(),t[q]=[w,0],x=!j(o),y=b.get(q),x&&(b.set(q,o),F(b,q,o)),k(u))try{u=u(b.get(q))}catch(A){v=A}if(!(u&&k(u.then)))return[3,2];return[4,u.catch(function(a){v=a})];case 1:if(u=f.sent(),w!==t[q][0]){if(v)throw v;return[2,u]}v&&x&&n&&(i=!0,u=y,b.set(q,y)),f.label=2;case 2:return i&&(v||b.set(q,u),b.set(r,l(b.get(r),{error:v}))),t[q][1]=H(),[4,F(b,q,u,v,h,m,i)];case 3:if(z=f.sent(),v)throw v;return[2,i?z:u]}})})},J=function(a,b){for(var c in a)a[c][0]&&a[c][0](b)},K=function(a,b){if(!E.has(a)){var c=l(y,b),d={},e=I.bind(h,a),f=g;if(E.set(a,[d,{},{},{},e]),!z){var i=c.initFocus(setTimeout.bind(h,J.bind(h,d,0))),j=c.initReconnect(setTimeout.bind(h,J.bind(h,d,1)));f=function(){i&&i(),j&&j(),E.delete(a)}}return[a,e,f]}return[a,E.get(a)[4]]},L=K(new Map()),M=L[0],N=l({onLoadingSlow:g,onSuccess:g,onError:g,onErrorRetry:function(a,b,c,d,e){var f=c.errorRetryCount,g=e.retryCount,h=~~((Math.random()+0.5)*(1<<(g<8?g:8)))*c.errorRetryInterval;!j(f)&&g>f||setTimeout(d,h,e)},onDiscarded:g,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:C?10e3:5000,focusThrottleInterval:5000,dedupingInterval:2000,loadingTimeout:C?5000:3000,compare:function(a,b){return q(a)==q(b)},isPaused:function(){return!1},cache:M,mutate:L[1],fallback:{}},{isOnline:function(){return r},isVisible:function(){var a=t&&document.visibilityState;return j(a)||"hidden"!==a}}),O=function(a,b){var c=l(a,b);if(b){var d=a.use,e=a.fallback,f=b.use,g=b.fallback;d&&f&&(c.use=d.concat(f)),e&&g&&(c.fallback=l(e,g))}return c},P=(0,d.createContext)({}),Q=function(a,b){var c=(0,d.useState)({})[1],e=(0,d.useRef)(a),f=(0,d.useRef)({data:!1,error:!1,isValidating:!1}),g=(0,d.useCallback)(function(a){var d=!1,g=e.current;for(var h in a){var i=h;g[i]!==a[i]&&(g[i]=a[i],f.current[i]&&(d=!0))}d&&!b.current&&c({})},[]);return A(function(){e.current=a}),[e,f.current,g]},R=function(a,b,c){var d=b[a]||(b[a]=[]);return d.push(c),function(){var a=d.indexOf(c);a>=0&&(d[a]=d[d.length-1],d.pop())}},S={dedupe:!0};i.defineProperty(function(a){var b=a.value,c=O((0,d.useContext)(P),b),e=b&&b.provider,f=(0,d.useState)(function(){return e?K(e(c.cache||M),b):h})[0];return f&&(c.cache=f[0],c.mutate=f[1]),A(function(){return f?f[2]:h},[]),(0,d.createElement)(P.Provider,l(a,{value:c}))},"default",{value:N});var T=function(a){return function(){for(var b=[],c=0;c<arguments.length;c++)b[c]=arguments[c];var e,f=l(N,(0,d.useContext)(P)),g=k((e=b)[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(null===e[1]?e[2]:e[1])||{}],h=g[0],i=g[1],j=g[2],m=O(f,j),n=a,o=m.use;if(o)for(var p=o.length;p-- >0;)n=o[p](n);return n(h,i||m.fetcher,m)}}(function(a,b,c){var g=c.cache,i=c.compare,o=c.fallbackData,p=c.suspense,q=c.revalidateOnMount,r=c.refreshInterval,s=c.refreshWhenHidden,t=c.refreshWhenOffline,u=E.get(g),v=u[0],w=u[1],x=u[2],y=u[3],B=D(a),C=B[0],G=B[1],J=B[2],K=(0,d.useRef)(!1),L=(0,d.useRef)(!1),M=(0,d.useRef)(C),N=(0,d.useRef)(b),O=(0,d.useRef)(c),P=function(){return O.current},T=function(){return P().isVisible()&&P().isOnline()},U=function(a){return g.set(J,l(g.get(J),a))},V=g.get(C),W=j(o)?c.fallback[C]:o,X=j(V)?W:V,Y=g.get(J)||{},Z=Y.error,$=function(){return j(q)?!P().isPaused()&&(p?!j(X):j(X)||c.revalidateIfStale):q},_=!!C&&!!b&&(!!Y.isValidating|| !K.current&&$()),aa=Q({data:X,error:Z,isValidating:_},L),ba=aa[0],ca=aa[1],da=aa[2],ea=(0,d.useCallback)(function(a){return e(void 0,void 0,void 0,function(){var b,d,e,l,m,n,o,p,q,r,s,t,u;return f(this,function(f){switch(f.label){case 0:if(b=N.current,!C||!b||L.current||P().isPaused())return[2,!1];l=!0,m=a||{},n=!y[C]||!m.dedupe,o=function(){return!L.current&&C===M.current&&K.current},p=function(){var a=y[C];a&&a[1]===e&&delete y[C]},q={isValidating:!1},r=function(){U({isValidating:!1}),o()&&da(q)},U({isValidating:!0}),da({isValidating:!0}),f.label=1;case 1:return f.trys.push([1,3,,4]),n&&(F(g,C,ba.current.data,ba.current.error,!0),c.loadingTimeout&&!g.get(C)&&setTimeout(function(){l&&o()&&P().onLoadingSlow(C,c)},c.loadingTimeout),y[C]=[b.apply(void 0,G),H()]),d=(u=y[C])[0],e=u[1],[4,d];case 2:if(d=f.sent(),n&&setTimeout(p,c.dedupingInterval),!y[C]||y[C][1]!==e)return n&&o()&&P().onDiscarded(C),[2,!1];if(U({error:h}),q.error=h,!j(s=x[C])&&(e<=s[0]||e<=s[1]||0===s[1]))return r(),n&&o()&&P().onDiscarded(C),[2,!1];return i(ba.current.data,d)?q.data=ba.current.data:q.data=d,i(g.get(C),d)||g.set(C,d),n&&o()&&P().onSuccess(d,C,c),[3,4];case 3:return t=f.sent(),p(),!P().isPaused()&&(U({error:t}),q.error=t,n&&o()&&(P().onError(t,C,c),("boolean"==typeof c.shouldRetryOnError&&c.shouldRetryOnError||k(c.shouldRetryOnError)&&c.shouldRetryOnError(t))&&T()&&P().onErrorRetry(t,C,c,ea,{retryCount:(m.retryCount||0)+1,dedupe:!0}))),[3,4];case 4:return l=!1,r(),o()&&n&&F(g,C,q.data,q.error,!1),[2,!0]}})})},[C]),fa=(0,d.useCallback)(I.bind(h,g,function(){return M.current}),[]);if(A(function(){N.current=b,O.current=c}),A(function(){if(C){var a,b=K.current,c=ea.bind(h,S),d=function(a,b,c){da(l({error:b,isValidating:c},i(ba.current.data,a)?h:{data:a}))},e=0,f=function(a){if(0==a){var b=Date.now();P().revalidateOnFocus&&b>e&&T()&&(e=b+P().focusThrottleInterval,c())}else if(1==a)P().revalidateOnReconnect&&T()&&c();else if(2==a)return ea()},g=R(C,w,d),k=R(C,v,f);return L.current=!1,M.current=C,K.current=!0,b&&da({data:X,error:Z,isValidating:_}),$()&&(j(X)||z?c():(a=c,n()&& typeof window.requestAnimationFrame!=m?window.requestAnimationFrame(a):setTimeout(a,1))),function(){L.current=!0,g(),k()}}},[C,ea]),A(function(){var a;function b(){var b=k(r)?r(X):r;b&& -1!==a&&(a=setTimeout(c,b))}function c(){!ba.current.error&&(s||P().isVisible())&&(t||P().isOnline())?ea(S).then(b):b()}return b(),function(){a&&(clearTimeout(a),a=-1)}},[r,s,t,ea]),(0,d.useDebugValue)(X),p&&j(X)&&C)throw N.current=b,O.current=c,j(Z)?ea(S):Z;return{mutate:fa,get data(){return ca.data=!0,X},get error(){return ca.error=!0,Z},get isValidating(){return ca.isValidating=!0,_}}})}}])