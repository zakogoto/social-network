"use strict";(self.webpackChunkreact_app_01=self.webpackChunkreact_app_01||[]).push([[627],{9627:(e,t,n)=>{n.r(t),n.d(t,{default:()=>A});var o=n(5043),r=n(3923),s=n(3003),i=n(5718);const l={wrap:"Users_wrap__Iy1kG",user:"Users_user__bxcup",userPreview:"Users_userPreview__3QZAY",userInfo:"Users_userInfo__S9ZSh",btn:"Users_btn__qYwcv",followed:"Users_followed__MLH0C",currentPage:"Users_currentPage__UpP7h"};var c=n(4774);const a={currentPage:"Pagination_currentPage__nQsEi",pageBtn:"Pagination_pageBtn__TA7Pc"};var u=n(579);function p(e){let{onPageChanged:t,currentPage:n,totalItemsCount:r,pageSize:s,portionSize:i=10}=e,[l,c]=(0,o.useState)(1);const p=[],f=Math.ceil(r/s);for(let o=1;o<=f;o++)p.push(o);const g=Math.ceil(f/i),d=(l-1)*i+1,m=l*i;return(0,u.jsxs)("div",{children:[l>1&&(0,u.jsx)("button",{className:a.pageBtn,onClick:()=>c(1),children:"1"}),l>1&&(0,u.jsx)("button",{className:a.pageBtn,onClick:()=>c(l-1),children:"<<"}),p.filter((e=>e>=d&&e<=m)).map((e=>(0,u.jsx)("button",{className:n===e?"".concat(a.currentPage," ").concat(a.pageBtn):a.pageBtn,onClick:()=>t(e),children:e}))),g>l&&(0,u.jsx)("button",{className:a.pageBtn,onClick:()=>c(l+1),children:">>"})]})}var f=n(4415),g=n(5475);function d(e){let{followingInProgress:t,onUnfollow:n,onFollow:o,user:r}=e;return(0,u.jsxs)("div",{className:l.user,children:[(0,u.jsxs)("div",{className:l.userPreview,children:[(0,u.jsx)(g.k2,{to:"/profile/".concat(r.id),children:(0,u.jsx)("img",{src:r.imgURL?r.imgURL:f,alt:r.name})}),r.followed?(0,u.jsx)("button",{disabled:t.some((e=>e===r.id)),onClick:()=>n(r.id),className:"".concat(l.btn," ").concat(l.followed),children:"UNFOLLOW"}):(0,u.jsx)("button",{disabled:t.some((e=>e===r.id)),onClick:()=>o(r.id),className:l.btn,children:"FOLLOW"})]}),(0,u.jsxs)("div",{className:l.userInfo,children:[(0,u.jsxs)("span",{children:[(0,u.jsx)("div",{children:r.name}),(0,u.jsx)("div",{children:r.status?r.status:"no status"})]}),(0,u.jsx)("span",{})]})]},r.id)}function m(e){const{totalUsersCount:t,pageSize:n,users:o,isFetching:r,onPageChanged:s,currentPage:i,onUnfollow:a,onFollow:f,followingInProgress:g,portionSize:m}=e;return(0,u.jsxs)("div",{className:l.wrap,children:[r?(0,u.jsx)(c.A,{}):o.map((e=>(0,u.jsx)(d,{followingInProgress:g,onUnfollow:a,onFollow:f,user:e},e.id))),(0,u.jsx)("span",{children:(0,u.jsx)(p,{portionSize:m,pageSize:n,totalItemsCount:t,onPageChanged:s,currentPage:i})})]})}n(9526);function h(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"expected a function, instead received ".concat(typeof e);if("function"!==typeof e)throw new TypeError(t)}var y=e=>Array.isArray(e)?e:[e];function v(e){const t=Array.isArray(e[0])?e[0]:e;return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"expected all items to be functions, instead received the following types: ";if(!e.every((e=>"function"===typeof e))){const n=e.map((e=>"function"===typeof e?"function ".concat(e.name||"unnamed","()"):typeof e)).join(", ");throw new TypeError("".concat(t,"[").concat(n,"]"))}}(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}Symbol(),Object.getPrototypeOf({});var w="undefined"!==typeof WeakRef?WeakRef:class{constructor(e){this.value=e}deref(){return this.value}},b=0,P=1;function j(){return{s:b,v:void 0,o:null,p:null}}function _(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=j();const{resultEqualityCheck:o}=t;let r,s=0;function i(){let t=n;const{length:i}=arguments;for(let e=0,n=i;e<n;e++){const n=arguments[e];if("function"===typeof n||"object"===typeof n&&null!==n){let e=t.o;null===e&&(t.o=e=new WeakMap);const o=e.get(n);void 0===o?(t=j(),e.set(n,t)):t=o}else{let e=t.p;null===e&&(t.p=e=new Map);const o=e.get(n);void 0===o?(t=j(),e.set(n,t)):t=o}}const l=t;let c;if(t.s===P?c=t.v:(c=e.apply(null,arguments),s++),l.s=P,o){var a,u,p;const e=null!==(a=null===(u=r)||void 0===u||null===(p=u.deref)||void 0===p?void 0:p.call(u))&&void 0!==a?a:r;null!=e&&o(e,c)&&(c=e,0!==s&&s--);r="object"===typeof c&&null!==c||"function"===typeof c?new w(c):c}return l.v=c,c}return i.clearCache=()=>{n=j(),i.resetResultsCount()},i.resultsCount=()=>s,i.resetResultsCount=()=>{s=0},i}function S(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];const r="function"===typeof e?{memoize:e,memoizeOptions:n}:e,s=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];let o,s=0,i=0,l={},c=t.pop();"object"===typeof c&&(l=c,c=t.pop()),h(c,"createSelector expects an output function after the inputs, but received: [".concat(typeof c,"]"));const a={...r,...l},{memoize:u,memoizeOptions:p=[],argsMemoize:f=_,argsMemoizeOptions:g=[],devModeChecks:d={}}=a,m=y(p),w=y(g),b=v(t),P=u((function(){return s++,c.apply(null,arguments)}),...m);const j=f((function(){i++;const e=function(e,t){const n=[],{length:o}=e;for(let r=0;r<o;r++)n.push(e[r].apply(null,t));return n}(b,arguments);return o=P.apply(null,e),o}),...w);return Object.assign(j,{resultFunc:c,memoizedResultFunc:P,dependencies:b,dependencyRecomputations:()=>i,resetDependencyRecomputations:()=>{i=0},lastResult:()=>o,recomputations:()=>s,resetRecomputations:()=>{s=0},memoize:u,argsMemoize:f})};return Object.assign(s,{withTypes:()=>s}),s}var x=S(_),C=Object.assign((function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:x;!function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"expected an object, instead received ".concat(typeof e);if("object"!==typeof e)throw new TypeError(t)}(e,"createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ".concat(typeof e));const n=Object.keys(e),o=t(n.map((t=>e[t])),(function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return t.reduce(((e,t,o)=>(e[n[o]]=t,e)),{})}));return o}),{withTypes:()=>C});const U=x((e=>e.usersPage.users),(e=>e.filter((e=>e)))),z=e=>e.usersPage.totalUsersCount,k=e=>e.usersPage.pageSize,I=e=>e.usersPage.portionSize,F=e=>e.usersPage.currentPage,N=e=>e.usersPage.isFetching,O=e=>e.usersPage.followingInProgress,A=(0,r.Zz)((0,s.Ng)((e=>({users:U(e),totalUsersCount:z(e),pageSize:k(e),portionSize:I(e),currentPage:F(e),isFetching:N(e),followingInProgress:O(e)})),{followUser:i.pV,unfollowUser:i.Qt,setCurrentPage:i.Tm,setUsers:i.v5,toggleIsFetching:i.nZ,toggleIsFollowing:i.q0,requestUsers:i.AI}))((e=>{let{users:t,currentPage:n,totalUsersCount:r,pageSize:s,followingInProgress:i,isFetching:l,requestUsers:c,setCurrentPage:a,unfollowUser:p,followUser:f,portionSize:g}=e;(0,o.useEffect)((()=>{c(n,s)}),[n]);return(0,u.jsx)(m,{users:t,currentPage:n,isFetching:l,totalUsersCount:r,pageSize:s,portionSize:g,followingInProgress:i,onPageChanged:e=>{a(e),c(e,s)},onFollow:f,onUnfollow:p})}))},9526:(e,t,n)=>{function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function r(e){var t=function(e,t){if("object"!=o(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=o(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==o(t)?t:String(t)}n.d(t,{A:()=>r})}}]);
//# sourceMappingURL=627.86ecba77.chunk.js.map