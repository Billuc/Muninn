import{g as u,c6 as C,o,i as h,j as t,ci as k,A as v,c as i,a as c,b as r,d as f,t as p,w,n as _,e as B,cj as $,G as d,m,z as g,B as b,ck as y}from"./entry.4537cad6.js";function R(a){return typeof a=="string"?a:a[0]??""}const S=u({__name:"BackButton",props:{to:{},toParams:{},label:{}},setup(a){const e=a,s=C(),l=()=>s.push({name:e.to,params:e.toParams});return(n,x)=>(o(),h(v,{icon:t(k),label:e.label??"Back",class:"back-button btn-ghost",onClick:l},null,8,["icon","label"]))}});const A={class:"text-4xl font-semibold"},N={class:"text-xl font-light"},U=u({__name:"ErrorPage",props:{code:{},message:{},fallbackUrl:{}},setup(a){const e=a;return(s,l)=>{const n=B;return o(),i("div",{class:_(("mergeClasses"in s?s.mergeClasses:t(m))("absolute","top-1/2","left-1/2","-translate-x-1/2","-translate-y-1/2","text-center"))},[c("div",A,[r(t(d),{icon:t($),class:"text-error"},null,8,["icon"]),f(" "+p(e.code),1)]),c("div",N,p(e.message),1),r(n,{href:e.fallbackUrl,class:_(("mergeClasses"in s?s.mergeClasses:t(m))("btn","flex-row","flex-nowrap","mt-4"))},{default:w(()=>[r(t(d),{icon:t(k)},null,8,["icon"]),f(" Return ")]),_:1},8,["href","class"])],2)}}}),P={key:1},D=u({__name:"Action",props:{label:{},icon:{},iconClass:{}},emits:["click"],setup(a,{emit:e}){const s=a,l=()=>e("click");return(n,x)=>(o(),i("div",{class:_(("mergeClasses"in n?n.mergeClasses:t(m))("w-full","px-4","py-2","hover:bg-base-300","rounded-box"))},[c("div",{onClick:l,class:"flex gap-2 cursor-pointer items-center"},[s.icon?(o(),h(t(d),{key:0,icon:s.icon,class:_(s.iconClass)},null,8,["icon","class"])):g("",!0),s.label?(o(),i("span",P,p(s.label),1)):g("",!0)]),b(n.$slots,"dialog")],2))}}),z={class:"dropdown dropdown-end"},E={tabindex:"0"},V={class:"btn btn-circle btn-sm"},j={tabindex:"0",class:"dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52"},F=u({__name:"Actions",setup(a){return(e,s)=>(o(),i("div",z,[c("label",E,[b(e.$slots,"activator",{},()=>[c("div",V,[r(t(d),{icon:t(y)},null,8,["icon"])])])]),c("ul",j,[b(e.$slots,"default")])]))}});export{D as _,F as a,U as b,S as c,R as g};
