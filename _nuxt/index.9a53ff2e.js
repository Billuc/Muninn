import{g as m,bL as x,bD as F,h as a,o as r,l as C,c as _,b as n,w as d,q as T,d as h,t as D,n as b,m as v,e as I,x as g,D as V,a as N,E as B,c1 as E,s as L,F as P,r as S,u as U,c2 as A}from"./entry.49f3b586.js";import{_ as G}from"./Background.vue.c25db773.js";import{P as H}from"./PageHeading.ad0b6c3e.js";import{u as $}from"./noteStore.15379009.js";import{_ as y}from"./TagSelecter.vue.634bd37e.js";import{_ as M}from"./Tag.5085e303.js";import{_ as j,a as q}from"./Dialog.vue.5d645579.js";import{_ as z}from"./FABButton.vue.ce35e567.js";const O=m({__name:"NoteTagFilter",props:{selected:{}},emits:["update:selected"],setup(c,{emit:t}){const s=c,e=$().tagArray,i=o=>t("update:selected",o);return(o,p)=>x((r(),C(y,{tags:a(e),selected:s.selected,label:"","onUpdate:selected":i},null,8,["tags","selected"])),[[F,a(e).length]])}}),R=m({__name:"NotesGridElement",props:{label:{},href:{},tag:{}},emits:["click"],setup(c,{emit:t}){const s=c;function l(e){s.href||(e.preventDefault(),t("click"))}return(e,i)=>{const o=I;return r(),_("li",{class:b(("mergeClasses"in e?e.mergeClasses:a(v))("card","bg-base-200","hover:bg-base-300","transition-colors","duration-300","list-none","w-full","h-full","py-1","-skew-y-2","origin-top-right","border-2","border-secondary","hover:border-secondary-focus")),onClick:l},[n(o,{class:b(("mergeClasses"in e?e.mergeClasses:a(v))("w-full","h-full","flex","justify-center","items-center","gap-2","m-0","no-underline","text-lg")),href:s.href},{default:d(()=>[s.tag?(r(),C(M,{key:0,icon:s.tag.icon,color:s.tag.color},null,8,["icon","color"])):T("",!0),h(" "+D(s.label),1)]),_:1},8,["class","href"])],2)}}}),J={class:"form-control gap-y-2"},K=m({__name:"CreateNote",setup(c){const t=$(),s=t.tagArray,l=g(!1),e=g(""),i=g(-1),o=()=>l.value=!0,p=()=>l.value=!1,u=f=>e.value=f,k=f=>i.value=f,w=()=>{t.newNote(e.value,i.value),p()};return(f,ee)=>(r(),_("div",null,[n(z,{icon:a(V),onClick:o,class:"btn-primary -bottom-6 right-4"},null,8,["icon"]),n(q,{"is-opened":a(l),onClose:p},{title:d(()=>[h("Create a new note")]),default:d(()=>[N("div",J,[n(j,{label:"Note name",value:a(e),placeholder:"Enter name...","input-class":"border-primary",onInput:u},null,8,["value"]),n(y,{tags:a(s),selected:a(i),"onUpdate:selected":k},null,8,["tags","selected"])])]),actions:d(()=>[n(B,{class:"btn-success",onClick:w},{default:d(()=>[h("Create")]),_:1})]),_:1},8,["is-opened"])]))}}),Q={class:"py-2"},W=m({__name:"NotesGrid",props:{tagFilter:{}},setup(c){const t=c,s=$(),{notes:l}=E(s),e=L(()=>[...l.value.values()].filter(o=>t.tagFilter<0||t.tagFilter===o.tagId)),i=o=>s.tags.get(o);return(o,p)=>(r(),_("div",Q,[N("ul",{class:b(("mergeClasses"in o?o.mergeClasses:a(v))("grid","grid-cols-1","md:grid-cols-2","gap-1","p-0","relative"))},[(r(!0),_(P,null,S(a(e),u=>(r(),C(R,{key:`note-${u.id}`,label:u.title,href:`/notes/${u.id}`,tag:i(u.tagId)},null,8,["label","href","tag"]))),128)),n(K)],2)]))}}),X={class:"flex flex-col items-center gap-2"},Y=m({__name:"NotesVue",setup(c){const t=g(-1);return(s,l)=>(r(),_("div",X,[n(O,{selected:a(t),"onUpdate:selected":l[0]||(l[0]=e=>t.value=e)},null,8,["selected"]),n(W,{"tag-filter":a(t),class:"w-full"},null,8,["tag-filter"])]))}}),Z=N("span",null,"Notes",-1),ie=m({__name:"index",setup(c){return U({title:"Notes"}),(t,s)=>(r(),_("div",null,[n(H,null,{default:d(()=>[Z]),_:1}),n(G,{icon:a(A)},null,8,["icon"]),n(Y)]))}});export{ie as default};
