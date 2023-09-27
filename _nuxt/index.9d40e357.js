import{g as b,o as u,c as g,a as _,t as E,b as a,h as o,i as Z,j as ee,k as oe,F as V,r as D,n as S,m as A,l as O,q as L,s as T,v as j,x as f,y as U,z as te,A as se,w as m,B as G,d as C,C as h,D as J,E as B,G as Q,u as le,H as ne}from"./entry.30a63745.js";import{_ as X}from"./Background.vue.4ae15c7b.js";import{T as N,_ as M,a as ae}from"./Tag.3f804e8c.js";import{u as W}from"./eventStore.243cdb41.js";import{_ as Y,a as ce}from"./Input.vue.b759a88a.js";import{_ as P}from"./Dialog.vue.6aa04ba9.js";import{u as R}from"./noteStore.7b1c0dec.js";import{P as re}from"./PageHeading.85ead6ba.js";import"./index.f3feb017.js";const ie=["data-set-theme","data-theme"],ue={class:"my-1"},de=b({__name:"ThemeDisplay",props:{themeName:{}},setup(p){const i=p;return(e,l)=>(u(),g("button",{"data-key":"theme","data-set-theme":i.themeName,"data-theme":i.themeName,"data-act-class":"outline",class:"rounded-box p-2 border-2 border-primary relative outline-offset-2"},[_("div",ue,E(i.themeName),1),a(X,{icon:o(Z)},null,8,["icon"])],8,ie))}}),pe=b({__name:"ThemeSelector",setup(p){const i=["light","dark","synthwave","valentine","cupcake"];return ee(()=>oe.themeChange(!1)),(e,l)=>(u(),g("div",{class:S(("mergeClasses"in e?e.mergeClasses:o(A))("grid","grid-cols-2","sm:grid-cols-3","md:grid-cols-4","lg:grid-cols-5","gap-4","pl-4"))},[(u(),g(V,null,D(i,n=>a(de,{"theme-name":n,key:"select-"+n},null,8,["theme-name"])),64))],2))}}),q=b({__name:"TextInput",props:{label:{},value:{},inputClass:{},placeholder:{}},emits:["input"],setup(p,{emit:i}){const e=p;function l(n){i("input",n.target.value)}return(n,s)=>(u(),O(Y,{label:e.label,type:"text",placeholder:e.placeholder,onChange:l,value:e.value},null,8,["label","placeholder","value"]))}}),me={class:"w-full"},_e=["value"],ve={disabled:"",selected:""},ge=["value"],fe=b({__name:"Select",props:{label:{},value:{},placeholder:{},class:{},options:{}},emits:["input"],setup(p,{emit:i}){const e=p,l=n=>i("input",n.target.value);return(n,s)=>(u(),g("div",me,[e.label?(u(),O(ce,{key:0,label:e.label},null,8,["label"])):L("",!0),_("select",{class:S(("mergeClasses"in n?n.mergeClasses:o(A))("select","select-bordered","w-full","hover:brightness-95","focus:brightness-100","transition-all","duration-200",e.class)),value:e.value,onInput:l},[_("option",ve,E(e.placeholder??"Pick one"),1),(u(!0),g(V,null,D(e.options,c=>(u(),g("option",{value:c},[_("div",null,E(c),1)],8,ge))),256))],42,_e)]))}}),F=b({__name:"TagColorInput",props:{disabledColors:{},value:{}},emits:["input"],setup(p,{emit:i}){const e=p,l=T(()=>j.difference(Object.values(N),e.disabledColors)),n=s=>{i("input",s)};return(s,c)=>(u(),O(fe,{label:"Tag Color",placeholder:"Choose a tag color",value:e.value,options:o(l),onInput:n},null,8,["value","options"]))}}),he=["onClick"],Ce={key:1},be=b({__name:"Autocomplete",props:{label:{},inputClass:{},placeholder:{},options:{},textKey:{},valueKey:{},lazy:{type:Boolean}},emits:["input","newOption"],setup(p,{emit:i}){const e=p,l=f(""),n=T(()=>e.options.filter(r=>{const d=r[e.textKey??"text"]??"";return(!e.lazy||d.toLowerCase()===l.value.toLowerCase()||l.value.length>=3)&&j.includes(d.toLowerCase(),l.value.toLowerCase())})),s=r=>l.value=r.target.value,c=r=>i("input",r[e.valueKey??"value"]),t=()=>i("newOption",l.value);return(r,d)=>(u(),g("div",{class:S(("mergeClasses"in r?r.mergeClasses:o(A))("w-full","dropdown"))},[a(Y,{label:e.label,type:"text",placeholder:e.placeholder,onInput:s,value:o(l),class:S(e.inputClass)},null,8,["label","placeholder","value","class"]),_("ul",{class:S(("mergeClasses"in r?r.mergeClasses:o(A))("dropdown-content","menu","border","z-10","p-2","shadow","bg-base-100","rounded-box","w-56","max-h-52","flex","flex-col","flex-nowrap","overflow-y-auto"))},[o(n).length>0?(u(!0),g(V,{key:0},D(o(n),(x,$)=>(u(),g("li",{key:`autocomplete-option-${$}`},[U(r.$slots,"option",{option:x,index:$,textKey:e.textKey,selectOption:()=>c(x)},()=>[_("button",{onClick:()=>c(x)},E(x[e.textKey??"text"]),9,he)])]))),128)):(u(),g("li",Ce,[U(r.$slots,"no-option",{newOption:t,inputValue:o(l)},()=>[_("button",{onClick:t},"New option : "+E(o(l)),1)])]))],2)],2))}}),xe={class:"flex-grow"},ye=["onClick"],Te={key:0},H=b({__name:"IconInput",props:{icon:{}},emits:["input"],setup(p,{emit:i}){const e=p,l=[...Object.values(te),...Object.values(se)].map(s=>({text:s.iconName,value:[s.prefix,s.iconName]})),n=s=>i("input",s);return(s,c)=>(u(),g("div",{class:S(("mergeClasses"in s?s.mergeClasses:o(A))("flex","flex-wrap","items-center","justify-center","gap-x-4","gap-y-2","w-full"))},[_("div",xe,[a(be,{label:"Icon",placeholder:"Search icons...",options:o(l),onInput:n,lazy:""},{option:m(({option:t,selectOption:r})=>[_("div",{onClick:r,tabindex:"0"},[a(o(G),{icon:t.value},null,8,["icon"]),C(" "+E(t.text),1)],8,ye)]),"no-option":m(()=>[C(" No icon found... ")]),_:1},8,["options"])]),e.icon?(u(),g("div",Te,[a(o(G),{icon:e.icon},null,8,["icon"]),C(" "+E(e.icon[1]),1)])):L("",!0)],2))}}),$e={class:"form-control gap-y-2"},ke=b({__name:"CreateEventTag",props:{disabledColors:{}},setup(p){const i=p,e=W(),l=f(!1),n=f(""),s=f(N.red),c=f([h.prefix,h.iconName]),t=()=>l.value=!0,r=()=>l.value=!1,d=w=>n.value=w,x=w=>s.value=w,$=w=>c.value=w,k=()=>{e.newTag(n.value,s.value,c.value),r(),y()},y=()=>{d(""),x(N.red),$([h.prefix,h.iconName])};return(w,v)=>{const I=q,K=P;return u(),g("div",null,[a(M,{class:"w-full",onClick:t,icon:o(J)},null,8,["icon"]),a(K,{"is-opened":o(l),onClose:r},{title:m(()=>[C("Create a new tag")]),default:m(()=>[_("div",$e,[a(I,{label:"Tag name",value:o(n),placeholder:"Enter name...","input-class":"border-primary",onInput:d},null,8,["value"]),a(F,{"disabled-colors":i.disabledColors,value:o(s),onInput:x},null,8,["disabled-colors","value"]),a(H,{icon:o(c),onInput:$},null,8,["icon"])])]),actions:m(()=>[a(B,{class:"btn-success",onClick:k},{default:m(()=>[C("Create")]),_:1})]),_:1},8,["is-opened"])])}}}),we={class:"form-control my-4 gap-y-2"},Ie=b({__name:"EditEventTag",props:{tag:{},disabledColors:{}},emits:["close"],setup(p,{emit:i}){const e=p,l=W(),n=T(()=>!!e.tag),s=f(""),c=f(N.red),t=f([h.prefix,h.iconName]),r=T(()=>e.disabledColors.filter(v=>{var I;return v!==((I=e.tag)==null?void 0:I.color)})),d=v=>s.value=v,x=v=>c.value=v,$=v=>t.value=v,k=()=>i("close"),y=()=>{e.tag&&(l.editTag(e.tag.id,s.value,c.value,t.value),k())},w=()=>{e.tag&&(l.removeTag(e.tag.id),k())};return Q(()=>{e.tag?(s.value=e.tag.title,c.value=e.tag.color,t.value=e.tag.icon):(s.value="",c.value=N.red,t.value=[h.prefix,h.iconName])}),(v,I)=>{const K=q;return u(),O(P,{"is-opened":o(n),onClose:k},{title:m(()=>{var z;return[C(" Edit tag '"+E((z=e.tag)==null?void 0:z.title)+"'",1)]}),default:m(()=>[_("div",we,[a(K,{label:"Tag name",value:o(s),placeholder:"Enter name...","input-class":"border-primary",onInput:d},null,8,["value"]),a(F,{"disabled-colors":o(r),value:o(c),onInput:x},null,8,["disabled-colors","value"]),a(H,{icon:o(t),onInput:$},null,8,["icon"])])]),actions:m(()=>[a(B,{class:"btn-error ml-2",onClick:w},{default:m(()=>[C("Remove")]),_:1}),a(B,{class:"btn-success ml-2",onClick:y},{default:m(()=>[C("Save")]),_:1})]),_:1},8,["is-opened"])}}}),Ne={class:"pl-4"},Ee=_("h3",{class:"text-xl font-bold mb-4"},"Tags",-1),Oe=b({__name:"EventsConfig",setup(p){const i=W(),e=f(null),l=T(()=>j.sortBy(i.tagArray,t=>ae.get(t.color))),n=T(()=>j.uniq(l.value.map(t=>t.color))),s=T(()=>j.some(Object.values(N),t=>!n.value.includes(t))),c=t=>e.value=t;return(t,r)=>(u(),g("div",Ne,[Ee,_("div",{class:S(("mergeClasses"in t?t.mergeClasses:o(A))("grid","grid-cols-2","md:grid-cols-3","gap-2"))},[(u(!0),g(V,null,D(o(l),d=>(u(),O(M,{color:d.color,icon:d.icon,text:d.title,onClick:()=>c(d)},null,8,["color","icon","text","onClick"]))),256)),o(s)?(u(),O(ke,{key:0,"disabled-colors":o(n)},null,8,["disabled-colors"])):L("",!0),a(Ie,{tag:o(e),onClose:r[0]||(r[0]=d=>e.value=null),"disabled-colors":o(n)},null,8,["tag","disabled-colors"])],2)]))}}),Se={class:"form-control gap-y-2"},je=b({__name:"CreateNoteTag",props:{disabledColors:{}},setup(p){const i=p,e=R(),l=f(!1),n=f(""),s=f(N.red),c=f([h.prefix,h.iconName]),t=()=>l.value=!0,r=()=>l.value=!1,d=y=>n.value=y,x=y=>s.value=y,$=y=>c.value=y,k=()=>{e.newTag(n.value,s.value,c.value),r()};return(y,w)=>{const v=q,I=P;return u(),g("div",null,[a(M,{class:"w-full",onClick:t,icon:o(J)},null,8,["icon"]),a(I,{"is-opened":o(l),onClose:r},{title:m(()=>[C("Create a new tag")]),default:m(()=>[_("div",Se,[a(v,{label:"Tag name",value:o(n),placeholder:"Enter name...","input-class":"border-primary",onInput:d},null,8,["value"]),a(F,{"disabled-colors":i.disabledColors,value:o(s),onInput:x},null,8,["disabled-colors","value"]),a(H,{icon:o(c),onInput:$},null,8,["icon"])])]),actions:m(()=>[a(B,{class:"btn-success",onClick:k},{default:m(()=>[C("Create")]),_:1})]),_:1},8,["is-opened"])])}}}),Ae={class:"form-control my-4 gap-y-2"},Be=b({__name:"EditNoteTag",props:{tag:{},disabledColors:{}},emits:["close"],setup(p,{emit:i}){const e=p,l=R(),n=T(()=>!!e.tag),s=f(""),c=f(N.red),t=f([h.prefix,h.iconName]),r=T(()=>e.disabledColors.filter(v=>{var I;return v!==((I=e.tag)==null?void 0:I.color)})),d=v=>s.value=v,x=v=>c.value=v,$=v=>t.value=v,k=()=>i("close"),y=()=>{e.tag&&(l.editTag(e.tag.id,s.value,c.value,t.value),k())},w=()=>{e.tag&&(l.removeTag(e.tag.id),k())};return Q(()=>{e.tag?(s.value=e.tag.title,c.value=e.tag.color,t.value=e.tag.icon):(s.value="",c.value=N.red,t.value=[h.prefix,h.iconName])}),(v,I)=>{const K=q;return u(),O(P,{"is-opened":o(n),onClose:k},{title:m(()=>{var z;return[C(" Edit tag '"+E((z=e.tag)==null?void 0:z.title)+"'",1)]}),default:m(()=>[_("div",Ae,[a(K,{label:"Tag name",value:o(s),placeholder:"Enter name...","input-class":"border-primary",onInput:d},null,8,["value"]),a(F,{"disabled-colors":o(r),value:o(c),onInput:x},null,8,["disabled-colors","value"]),a(H,{icon:o(t),onInput:$},null,8,["icon"])])]),actions:m(()=>[a(B,{class:"btn-error ml-2",onClick:w},{default:m(()=>[C("Remove")]),_:1}),a(B,{class:"btn-success ml-2",onClick:y},{default:m(()=>[C("Save")]),_:1})]),_:1},8,["is-opened"])}}}),Ke={class:"pl-4"},ze=_("h3",{class:"text-xl font-bold mb-4"},"Tags",-1),Ve=b({__name:"NotesConfig",setup(p){const i=R(),e=f(null),l=T(()=>i.tagArray),n=T(()=>j.uniq(l.value.map(t=>t.color))),s=T(()=>j.some(Object.values(N),t=>!n.value.includes(t))),c=t=>e.value=t;return(t,r)=>(u(),g("div",Ke,[ze,_("div",{class:S(("mergeClasses"in t?t.mergeClasses:o(A))("grid","grid-cols-2","md:grid-cols-3","gap-2"))},[(u(!0),g(V,null,D(o(l),d=>(u(),O(M,{color:d.color,icon:d.icon,text:d.title,onClick:()=>c(d)},null,8,["color","icon","text","onClick"]))),256)),o(s)?(u(),O(je,{key:0,"disabled-colors":o(n)},null,8,["disabled-colors"])):L("",!0),a(Be,{tag:o(e),onClose:r[0]||(r[0]=d=>e.value=null),"disabled-colors":o(n)},null,8,["tag","disabled-colors"])],2)]))}}),De={class:"relative"},Le=_("h2",{class:"text-2xl font-bold my-4"},"Theme",-1),Me=_("h2",{class:"text-2xl font-bold my-4"},"Events",-1),Pe=_("h2",{class:"text-2xl font-bold my-4"},"Notes",-1),Xe=b({__name:"index",setup(p){return le({title:"Configuration"}),(i,e)=>(u(),g("div",null,[a(re,null,{default:m(()=>[C("Configuration")]),_:1}),a(X,{icon:o(ne)},null,8,["icon"]),_("div",De,[Le,a(pe),Me,a(Oe),Pe,a(Ve)])]))}});export{Xe as default};
