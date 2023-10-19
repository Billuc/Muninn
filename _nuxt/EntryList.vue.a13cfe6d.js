import{X as g,g as p,o as l,c as d,b as u,j as i,Y as S,K as y,r as E,N as $,x as b,a as C,Z as v,z as J,q as B,J as K,s as M,h as N,F as j,n as k,i as A}from"./entry.fdeab8e2.js";import{v as R}from"./PageHeading.bc1d6c96.js";import{f as T}from"./index.504780f4.js";import{_ as w}from"./MultilineInput.vue.537991f1.js";const c=t=>T(t,"yyyy-MM-dd"),_=g("journal",{state:()=>({entries:new Map}),actions:{getEntries(t){return this.entries.get(c(t))},newEntry(t,e){const s=c(t);this.entries.has(s)||this.entries.set(s,new Map);const n={date:t,id:R(),text:e};this.entries.get(s).set(n.id,n)},editEntry(t,e,s){if(!this.entries.has(c(t)))throw new Error(`[Journal] Key ${t} not found`);const n=this.entries.get(c(t));if(!n.has(e))throw new Error(`[Journal] Entry with ID ${e} not found`);n.set(e,{date:t,id:e,text:s})},removeEntry(t,e){if(!this.entries.has(c(t)))throw new Error(`[Journal] Key ${t} not found`);if(!this.entries.get(c(t)).delete(e))throw new Error(`[Journal] Entry with ID ${e} not found`)}}}),U={class:"flex flex-nowrap"},z=p({__name:"EntryActions",emits:["remove"],setup(t,{emit:e}){const s=()=>e("remove");return(n,r)=>{const o=y;return l(),d("div",U,[u(o,{icon:i(S),class:"btn-circle !btn-xs",onClick:s},null,8,["icon"])])}}}),D={class:"m-0 marker:text-neutral"},F={class:"flex flex-nowrap"},I=p({__name:"Entry",props:{entry:{},id:{},date:{}},setup(t){const e=t,s=E(e.entry),n=_(),r=$(),o=h=>{s.value=h,r.setSyncStatus(v.Syncing),f()},a=()=>n.removeEntry(e.date,e.id),m=()=>{s.value?n.editEntry(e.date,e.id,s.value):n.removeEntry(e.date,e.id),r.setSyncStatus(v.Synced)},f=b.debounce(m,2e3),x=()=>{f.cancel(),m()};return(h,V)=>(l(),d("li",D,[C("div",F,[u(w,{value:i(s),placeholder:"Write here...",class:"w-full","detect-enter":"",onEnter:x,"onUpdate:value":o},null,8,["value"]),u(z,{onRemove:a})])]))}}),L=p({__name:"AddEntry",props:{date:{}},setup(t){const e=t,s=_(),n=E(""),r=()=>{n.value.trim()&&s.newEntry(e.date,n.value.trim()),n.value=""};return(o,a)=>(l(),d("li",{class:B(("mergeClasses"in o?o.mergeClasses:i(M))("m-0","marker:text-base-300","flex","flex-nowrap","items-center","gap-x-2"))},[u(w,{value:i(n),"onUpdate:value":a[0]||(a[0]=m=>J(n)?n.value=m:null),placeholder:"Write here...",class:"w-full","detect-enter":"",onEnter:r},null,8,["value"]),u(y,{icon:i(K),class:"btn-circle !btn-xs",onClick:r},null,8,["icon"])],2))}}),P={class:"list-disc pl-8"},Y=p({__name:"EntryList",props:{date:{}},setup(t){const e=t,s=_(),n=N(()=>{var r;return[...((r=s.getEntries(e.date))==null?void 0:r.values())??[]]});return(r,o)=>(l(),d("ul",P,[(l(!0),d(j,null,k(i(n),a=>(l(),A(I,{entry:a.text,id:a.id,date:a.date,key:`entry-${a.id}`},null,8,["entry","id","date"]))),128)),u(L,{date:e.date},null,8,["date"])]))}});export{Y as _};
