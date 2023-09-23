import{g as v,bR as E,x as g,o as m,c as b,b as s,h as e,bS as T,E as p,w as c,d as _,t as x,bT as w,a as N,M as B,v as R,n as $,m as k,b$ as S,u as V,l as P,q as A,c2 as D}from"./entry.49f3b586.js";import{_ as H}from"./Tag.5085e303.js";import{_ as O}from"./Background.vue.c25db773.js";import{P as U}from"./PageHeading.ad0b6c3e.js";import{u as h}from"./noteStore.15379009.js";import{a as I,_ as q}from"./Dialog.vue.5d645579.js";import{_ as z}from"./TagSelecter.vue.634bd37e.js";import{_ as F}from"./MultilineField.vue.bf94f80d.js";const L={class:"inline-block"},W=v({__name:"DeleteNote",props:{note:{}},setup(i){const n=i,a=h(),r=E(),t=g(!1),l=()=>t.value=!0,o=()=>t.value=!1;function u(){a.removeNote(n.note.id),r.push({path:"/notes"}),o()}return(d,C)=>(m(),b("div",L,[s(p,{icon:e(T),onClick:l,class:"text-error btn-ghost"},null,8,["icon"]),s(I,{"is-opened":e(t),onClose:o},{title:c(()=>[_(' Are you sure you want to remove note "'+x(n.note.title)+'" ? ',1)]),actions:c(()=>[s(p,{class:"btn-error",onClick:o},{default:c(()=>[_("No")]),_:1}),s(p,{class:"btn-success ml-2",onClick:u},{default:c(()=>[_("Yes")]),_:1})]),_:1},8,["is-opened"])]))}}),Y={class:"inline-block"},j={class:"form-control gap-y-2"},G=v({__name:"EditNote",props:{note:{}},setup(i){const n=i,a=h(),r=a.tagArray,t=g(!1),l=g(n.note.title),o=g(n.note.tagId),u=()=>t.value=!0,d=()=>t.value=!1,C=f=>l.value=f,y=f=>o.value=f;function M(){a.editNote(n.note.id,l.value,n.note.text,o.value),d()}return(f,X)=>(m(),b("div",Y,[s(p,{icon:e(w),onClick:u,class:"text-info btn-ghost"},null,8,["icon"]),s(I,{"is-opened":e(t),onClose:d},{title:c(()=>[_('Edit note "'+x(n.note.title)+'"',1)]),default:c(()=>[N("div",j,[s(q,{label:"Note name",value:e(l),placeholder:"Enter name...","input-class":"border-primary",onInput:C},null,8,["value"]),s(z,{tags:e(r),selected:e(o),"onUpdate:selected":y},null,8,["tags","selected"])])]),actions:c(()=>[s(p,{class:"btn-success",onClick:M},{default:c(()=>[_("Save")]),_:1})]),_:1},8,["is-opened"])]))}}),J=v({__name:"Note",props:{note:{}},setup(i){const n=i,{note:a}=B(n),r=h();function t(o){console.log(o),r.editNote(a.value.id,a.value.title,o,a.value.tagId)}const l=R.debounce(t,2e3);return(o,u)=>{const d=F;return m(),b("div",{class:$(("mergeClasses"in o?o.mergeClasses:e(k))("flex","flex-col","flex-nowrap","gap-y-2"))},[s(d,{value:e(a).text,placeholder:"Write here...",onInput:e(l),class:$(("mergeClasses"in o?o.mergeClasses:e(k))("textarea","textarea-md","bg-base-200","shadow-md"))},null,8,["value","onInput","class"])],2)}}}),K={class:"mx-2"},Q={class:"inline-block"},ce=v({__name:"index",setup(i){const n=S(),a=h(),r=Number(n.params.id),t=a.getNote(r),l=a.tags.get(t.tagId);return V({title:`Notes - ${t.title}`}),(o,u)=>(m(),b("div",null,[s(U,null,{prepend:c(()=>[e(l)?(m(),P(H,{key:0,text:e(l).title,color:e(l).color,icon:e(l).icon},null,8,["text","color","icon"])):A("",!0)]),append:c(()=>[N("div",Q,[s(G,{note:e(t)},null,8,["note"]),s(W,{note:e(t)},null,8,["note"])])]),default:c(()=>[N("span",K,x(e(t).title),1)]),_:1}),s(O,{icon:e(D)},null,8,["icon"]),s(J,{note:e(t)},null,8,["note"])]))}});export{ce as default};
