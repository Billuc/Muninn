import{g as v,bW as R,x as g,o as m,c as b,b as s,h as e,bX as w,E as d,w as c,d as p,t as C,bY as B,K as h,R as E,v as V,n as k,m as $,c3 as P,s as S,u as T,l as U,q as D,a as I,c6 as H}from"./entry.30a63745.js";import{_ as O}from"./Tag.3f804e8c.js";import{_ as W}from"./Background.vue.4ae15c7b.js";import{P as Y}from"./PageHeading.85ead6ba.js";import{u as x}from"./noteStore.7b1c0dec.js";import{_ as y}from"./Dialog.vue.6aa04ba9.js";import{_ as q}from"./NoteForm.vue.ebb4b253.js";import{_ as z}from"./MultilineField.vue.e59b4415.js";import"./InputAlt.vue.10a64f9a.js";import"./TagSelecter.vue.8d28b852.js";const A={class:"inline-block"},F=v({__name:"DeleteNote",props:{note:{}},setup(r){const a=r,l=x(),i=R(),t=g(!1),n=()=>t.value=!0,o=()=>t.value=!1;function u(){l.removeNote(a.note.id),i.push({path:"/notes"}),o()}return(_,M)=>(m(),b("div",A,[s(d,{icon:e(w),onClick:n,class:"text-error btn-ghost"},null,8,["icon"]),s(y,{"is-opened":e(t),onClose:o},{title:c(()=>[p(' Are you sure you want to remove note "'+C(a.note.title)+'" ? ',1)]),actions:c(()=>[s(d,{class:"btn-error",onClick:o},{default:c(()=>[p("No")]),_:1}),s(d,{class:"btn-success ml-2",onClick:u},{default:c(()=>[p("Yes")]),_:1})]),_:1},8,["is-opened"])]))}}),K={class:"inline-block"},L=v({__name:"EditNote",props:{note:{}},setup(r){const a=r,l=x(),i=g(!1),t=g(a.note.title),n=g(a.note.tagId),o=()=>i.value=!0,u=()=>i.value=!1;function _(){l.editNote(a.note.id,t.value,a.note.text,n.value),u()}return(M,f)=>(m(),b("div",K,[s(d,{icon:e(B),onClick:o,class:"text-info btn-ghost"},null,8,["icon"]),s(y,{"is-opened":e(i),onClose:u},{title:c(()=>[p('Edit note "'+C(a.note.title)+'"',1)]),default:c(()=>[s(q,{name:e(t),"onUpdate:name":f[0]||(f[0]=N=>h(t)?t.value=N:null),"tag-id":e(n),"onUpdate:tagId":f[1]||(f[1]=N=>h(n)?n.value=N:null)},null,8,["name","tag-id"])]),actions:c(()=>[s(d,{class:"btn-success",onClick:_},{default:c(()=>[p("Save")]),_:1})]),_:1},8,["is-opened"])]))}}),X=v({__name:"Note",props:{note:{}},setup(r){const a=r,{note:l}=E(a),i=x();function t(o){console.log(o),i.editNote(l.value.id,l.value.title,o,l.value.tagId)}const n=V.debounce(t,2e3);return(o,u)=>{const _=z;return m(),b("div",{class:k(("mergeClasses"in o?o.mergeClasses:e($))("flex","flex-col","flex-nowrap","gap-y-2"))},[s(_,{value:e(l).text,placeholder:"Write here...",onInput:e(n),class:k(("mergeClasses"in o?o.mergeClasses:e($))("textarea","textarea-md","bg-base-200","shadow-md"))},null,8,["value","onInput","class"])],2)}}}),j={class:"mx-2"},G={class:"inline-block"},ce=v({__name:"index",setup(r){const a=P(),l=x(),i=Number(a.params.id),t=l.getNote(i),n=S(()=>l.tags.get(t.tagId));return T({title:`Notes - ${t.title}`}),(o,u)=>(m(),b("div",null,[s(Y,null,{prepend:c(()=>[e(n)?(m(),U(O,{key:0,text:e(n).title,color:e(n).color,icon:e(n).icon},null,8,["text","color","icon"])):D("",!0)]),append:c(()=>[I("div",G,[s(L,{note:e(t)},null,8,["note"]),s(F,{note:e(t)},null,8,["note"])])]),default:c(()=>[I("span",j,C(e(t).title),1)]),_:1}),s(W,{icon:e(H)},null,8,["icon"]),s(X,{note:e(t)},null,8,["note"])]))}});export{ce as default};
