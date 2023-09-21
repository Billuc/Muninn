import{g as _,o,c,b as a,w as i,d as f,t as b,s as p,h as l,v as d,e as $,B as C,a as g,I as w,c2 as x,q as y,r as B,x as N,u as E,j as S}from"./entry.2fb70ca1.js";import{_ as V}from"./Background.vue.226a9024.js";import{P as j}from"./PageHeading.99ada2df.js";import{u as k}from"./listStore.044056dc.js";import{_ as q,a as D}from"./Dialog.vue.04f2e674.js";const v=_({__name:"ListGridElement",props:{label:{},href:{}},emits:["click"],setup(u,{emit:r}){const e=u;function n(s){e.href||(s.preventDefault(),r("click"))}return(s,m)=>{const t=$;return o(),c("li",{class:p(("mergeClasses"in s?s.mergeClasses:l(d))("btn","btn-primary","list-none","-skew-y-3","my-0","w-full","h-full")),onClick:n},[a(t,{class:p(("mergeClasses"in s?s.mergeClasses:l(d))("w-full","h-full","flex","justify-center","items-center","m-0","no-underline","text-lg")),href:e.href},{default:i(()=>[f(b(e.label),1)]),_:1},8,["class","href"])],2)}}}),G=_({__name:"CreateList",setup(u){const r=k(),e=C(!1),n=C(""),s=()=>e.value=!0,m=()=>e.value=!1,t=h=>n.value=h;function L(){r.newList(n.value),m()}return(h,M)=>(o(),c("div",null,[a(v,{label:"+",onClick:s}),a(D,{"is-opened":l(e),onClose:m},{title:i(()=>[f("Create a new list")]),default:i(()=>[g("div",null,[a(q,{label:"List name",value:l(n),placeholder:"Enter name...","input-class":"input-primary",onInput:t},null,8,["value"])])]),actions:i(()=>[a(w,{class:"btn-success",onClick:L},{default:i(()=>[f("Create")]),_:1})]),_:1},8,["is-opened"])]))}}),H=_({__name:"ListGrid",setup(u){const r=k(),{lists:e}=x(r);return(n,s)=>(o(),c("ul",{class:p(("mergeClasses"in n?n.mergeClasses:l(d))("grid","grid-cols-1","md:grid-cols-2","gap-1","p-0"))},[(o(!0),c(y,null,B(l(e),([m,t])=>(o(),N(v,{key:`list-${t.id}`,label:t.title,href:`/lists/${t.id}`},null,8,["label","href"]))),128)),a(G)],2))}}),I=g("span",null,"Lists",-1),R=_({__name:"index",setup(u){return E({title:"Lists"}),(r,e)=>(o(),c("div",null,[a(j,null,{default:i(()=>[I]),_:1}),a(V,{icon:l(S)},null,8,["icon"]),a(H)]))}});export{R as default};
