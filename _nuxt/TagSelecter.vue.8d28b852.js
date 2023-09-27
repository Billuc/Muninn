import{g as y,x as $,s as V,o as i,c as g,a as c,n as v,h as n,m as _,y as h,d as D,t as C,F,r as z,l as w,B as E,q as B,b as k,w as x,aS as N,aA as T,S as O,E as P,C as R,v as U}from"./entry.30a63745.js";import{_ as A,a as q}from"./Tag.3f804e8c.js";const I={class:"w-52"},L={class:"my-select peer"},j=["onClick"],G=y({__name:"SelectDropdown",props:{options:{},value:{}},emits:["update:value"],setup(p,{emit:r}){const a=p,u=$(null),t=$(null),o=V(()=>a.options.find(s=>s.value===a.value)),l=s=>{r("update:value",s),u.value.blur(),t.value.blur()};return(s,d)=>(i(),g("div",I,[c("div",L,[c("label",{ref_key:"label",ref:t,tabindex:"0",class:v(("mergeClasses"in s?s.mergeClasses:n(_))("focus:outline-none","bg-base-100","focus:bg-base-200","text-end","font-semibold","rounded-box","px-2","w-full","block"))},[h(s.$slots,"selected",{selected:n(o)},()=>{var e;return[D(C((e=n(o))==null?void 0:e.text),1)]})],2),c("div",{ref_key:"dropdown",ref:u,tabindex:"0",class:v(("mergeClasses"in s?s.mergeClasses:n(_))("my-select-content","bg-base-300","min-w-full","rounded-box","text-center","md:text-end","fixed","md:absolute","bottom-0","left-0","md:bottom-auto","md:left-auto","max-h-56","overflow-y-auto","overflow-x-visible","shadow-xl"))},[(i(!0),g(F,null,z(a.options,e=>(i(),g("div",{key:e.value},[h(s.$slots,"option",{option:e,onSelect:()=>l(e.value),selected:e.value===a.value},()=>[c("div",{onClick:()=>l(e.value),class:v(["px-2 rounded-box hover:bg-base-200",{"bg-base-100":e.value===a.value}])},C(e.text),11,j)])]))),128))],2)]),c("label",{tabindex:"0",class:v(("mergeClasses"in s?s.mergeClasses:n(_))("hidden","bg-black","opacity-0","peer-focus-within:block","peer-focus-within:opacity-20","md:peer-focus-within:hidden","fixed","top-0","bottom-0","left-0","right-0"))},null,2)]))}});const H={class:"label-text"},J={class:"flex"},K=y({inheritAttrs:!1,__name:"SelectAlt",props:{label:{},clearable:{type:Boolean},icon:{},options:{},value:{}},emits:["clear","update:value"],setup(p,{emit:r}){const a=p,u=()=>r("clear"),t=o=>r("update:value",o);return(o,l)=>{const s=P;return i(),g("div",{class:v(("mergeClasses"in o?o.mergeClasses:n(_))("label","gap-1","p-0"))},[c("div",null,[a.icon?(i(),w(n(E),{key:0,icon:a.icon,class:"mr-1"},null,8,["icon"])):B("",!0),c("span",H,C(a.label),1)]),c("div",J,[k(G,{class:"flex-shrink",options:a.options,value:a.value,"onUpdate:value":t},{selected:x(d=>[h(o.$slots,"selected",N(T(d)))]),option:x(d=>[h(o.$slots,"option",N(T(d)))]),_:3},8,["options","value"]),a.clearable?(i(),w(s,{key:0,icon:n(O),class:"btn-circle !btn-xs",onClick:u},null,8,["icon"])):B("",!0)])],2)}}}),W=y({__name:"TagSelecter",props:{selected:{},label:{},tags:{},clearable:{type:Boolean}},emits:["update:selected"],setup(p,{emit:r}){const a=p,u=V(()=>U(a.tags).chain().sortBy(l=>q.get(l.color)).map(l=>({text:l.title,value:String(l.id)})).value()),t=l=>a.tags.find(s=>s.id===Number(l)),o=l=>{a.selected===Number(l)?r("update:selected",-1):r("update:selected",Number(l))};return(l,s)=>{const d=K;return i(),w(d,{label:l.label??"Tag",icon:n(R),options:n(u),value:String(l.selected),"onUpdate:value":o,onClear:s[0]||(s[0]=()=>o("-1")),clearable:l.clearable},{selected:x(({selected:e})=>{var f,b,m;return[k(A,{color:e?(f=t(e.value))==null?void 0:f.color:void 0,icon:e?(b=t(e.value))==null?void 0:b.icon:void 0,text:e?(m=t(e.value))==null?void 0:m.title:void 0,class:"w-full !btn-xs"},null,8,["color","icon","text"])]}),option:x(({option:e,onSelect:f})=>{var b,m,S;return[k(A,{color:(b=t(e.value))==null?void 0:b.color,icon:(m=t(e.value))==null?void 0:m.icon,text:(S=t(e.value))==null?void 0:S.title,onClick:f,class:"w-full hover:scale-95"},null,8,["color","icon","text","onClick"])]}),_:1},8,["label","icon","options","value","clearable"])}}});export{G as _,W as a,K as b};
