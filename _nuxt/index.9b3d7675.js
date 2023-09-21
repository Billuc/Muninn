import{g as v,bT as M,B as g,o as m,c as b,b as s,h as e,bU as T,I as p,w as c,d as _,t as x,bV as V,a as N,Q as w,A as E,s as $,v as k,c1 as A,u as P,x as R,y as S,l as U}from"./entry.2fb70ca1.js";import{_ as D}from"./Tag.vue.a23b0b30.js";import{_ as H}from"./Background.vue.226a9024.js";import{P as O}from"./PageHeading.99ada2df.js";import{u as h}from"./noteStore.8bc90c06.js";import{a as I,_ as z}from"./Dialog.vue.04f2e674.js";import{_ as F}from"./TagSelecter.vue.9198336c.js";import{_ as L}from"./MultilineField.vue.048823b1.js";const Q={class:"inline-block"},W=v({__name:"DeleteNote",props:{note:{}},setup(i){const n=i,a=h(),r=M(),t=g(!1),l=()=>t.value=!0,o=()=>t.value=!1;function u(){a.removeNote(n.note.id),r.push({path:"/notes"}),o()}return(d,C)=>(m(),b("div",Q,[s(p,{icon:e(T),onClick:l,class:"text-error btn-ghost"},null,8,["icon"]),s(I,{"is-opened":e(t),onClose:o},{title:c(()=>[_(' Are you sure you want to remove note "'+x(n.note.title)+'" ? ',1)]),actions:c(()=>[s(p,{class:"btn-error",onClick:o},{default:c(()=>[_("No")]),_:1}),s(p,{class:"btn-success ml-2",onClick:u},{default:c(()=>[_("Yes")]),_:1})]),_:1},8,["is-opened"])]))}}),Y={class:"inline-block"},j={class:"form-control gap-y-2"},q=v({__name:"EditNote",props:{note:{}},setup(i){const n=i,a=h(),r=a.tagArray,t=g(!1),l=g(n.note.title),o=g(n.note.tagId),u=()=>t.value=!0,d=()=>t.value=!1,C=f=>l.value=f,y=f=>o.value=f;function B(){a.editNote(n.note.id,l.value,n.note.text,o.value),d()}return(f,X)=>(m(),b("div",Y,[s(p,{icon:e(V),onClick:u,class:"text-info btn-ghost"},null,8,["icon"]),s(I,{"is-opened":e(t),onClose:d},{title:c(()=>[_('Edit note "'+x(n.note.title)+'"',1)]),default:c(()=>[N("div",j,[s(z,{label:"Note name",value:e(l),placeholder:"Enter name...","input-class":"border-primary",onInput:C},null,8,["value"]),s(F,{tags:e(r),selected:e(o),"onUpdate:selected":y},null,8,["tags","selected"])])]),actions:c(()=>[s(p,{class:"btn-success",onClick:B},{default:c(()=>[_("Save")]),_:1})]),_:1},8,["is-opened"])]))}}),G=v({__name:"Note",props:{note:{}},setup(i){const n=i,{note:a}=w(n),r=h();function t(o){console.log(o),r.editNote(a.value.id,a.value.title,o,a.value.tagId)}const l=E.debounce(t,2e3);return(o,u)=>{const d=L;return m(),b("div",{class:$(("mergeClasses"in o?o.mergeClasses:e(k))("flex","flex-col","flex-nowrap","gap-y-2"))},[s(d,{value:e(a).text,placeholder:"Write here...",onInput:e(l),class:$(("mergeClasses"in o?o.mergeClasses:e(k))("textarea","textarea-md","bg-base-200","shadow-md"))},null,8,["value","onInput","class"])],2)}}}),J={class:"mx-2"},K={class:"inline-block"},ce=v({__name:"index",setup(i){const n=A(),a=h(),r=Number(n.params.id),t=a.getNote(r),l=a.tags.get(t.tagId);return P({title:`Notes - ${t.title}`}),(o,u)=>(m(),b("div",null,[s(O,null,{prepend:c(()=>[e(l)?(m(),R(D,{key:0,text:e(l).title,color:e(l).color,icon:e(l).icon},null,8,["text","color","icon"])):S("",!0)]),append:c(()=>[N("div",K,[s(q,{note:e(t)},null,8,["note"]),s(W,{note:e(t)},null,8,["note"])])]),default:c(()=>[N("span",J,x(e(t).title),1)]),_:1}),s(H,{icon:e(U)},null,8,["icon"]),s(G,{note:e(t)},null,8,["note"])]))}});export{ce as default};
