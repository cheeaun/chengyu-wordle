var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,l=(t,n,i)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[n]=i,a=(e,t)=>{for(var n in t||(t={}))o.call(t,n)&&l(e,n,t[n]);if(i)for(var n of i(t))r.call(t,n)&&l(e,n,t[n]);return e},s=(e,i)=>t(e,n(i));export function __vite_legacy_guard(){import("data:text/javascript,")}import{j as c,a as d,F as h,u,l as m,y as p,d as g,s as f,b,T as w,t as y,c as v,e as k,i as C,B as I,f as z,S as L}from"./vendor.9ce3bf16.js";import{p as S}from"./pinyin.6666f6b3.js";import{i as $}from"./all-idioms.effcc4de.js";import{d as P}from"./game-idioms.4b614f9d.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const D=c,M=d,T=h,x=e=>S(e,{segment:!0,group:!0}).flat().join(" ").trim(),R=e=>y(e),E=(e,t=(()=>{}))=>{var n;(null==(n=navigator.clipboard)?void 0:n.writeText)?navigator.clipboard.writeText(e).then(t).catch((e=>{})):(k(e),t())},G=e=>{try{return localStorage.getItem(e)}catch(t){return null}},N=(e,t)=>{try{return localStorage.setItem(e,t)}catch(n){return null}},A=e=>{try{return localStorage.removeItem(e)}catch(t){return null}},j=$.split("\n"),O=P.slice(1).map((e=>({id:e[0],idiom:e[1]})));window.clearGames=()=>{for(let e=0;e<localStorage.length;e++){const t=localStorage.key(e);t.startsWith("cywd-")&&localStorage.removeItem(t)}},window.allGames=()=>{const e=new Map;for(let t=0;t<localStorage.length;t++){const n=localStorage.key(t);if(n.startsWith("cywd-")){const t=JSON.parse(localStorage.getItem(n));e.set(n.replace("cywd-",""),t)}}return e};const B=(e,t)=>{const n="string"==typeof t?t.split(""):t,i="string"==typeof e?e.split(""):e,o=n.length,r=Array.from({length:o},(()=>"⬜"));if(o!==i.length)throw new Error("idioms must have the same length");const l=[];for(let s=0;s<o;s++){n[s]===i[s]&&(r[s]="🟩",l.push(s))}const a=[];for(let s=0;s<o;s++){const e=n[s];if(e!==i[s]){const t=i.indexOf(e);-1===t||l.includes(t)||a.includes(t)||(r[s]="🟧",a.push(t))}}return r};window.getIdiomStates=B;const H=e=>{if(e.some((e=>!!e.length&&e.every((e=>"🟩"===e)))))return"won";const t=e[e.length-1];return!!t.length&&t.every((e=>"🟩"!==e))?"lost":null},_=()=>Array.from({length:6},(()=>({v:Array.from({length:4},(()=>"")),s:!1}))),W=(e,t,n,i=0)=>{var o;let r=t||new Set;r.add(e);let l=n||new Set;const a=e.split("");a.forEach((e=>l.add(e)));let s=0;e:for(let c=0;c<O.length;c++){const e=a[(c+1)%4],t=O.find((({idiom:t})=>!r.has(t)&&t.includes(e)));if(t){for(let e=0;e<t.idiom.length;e++)if(l.add(t.idiom[e]),l.size>=20)break e;r.add(t.idiom),s=0}else{if(s>=5)break e;s+=1}}if(l.size<20||r.size<6){const e=[...r][++i];if(e){const{passedIdioms:t,keys:n}=W(e,r,l,i);r=t,l=n}}if(l.size<20||r.size<6){const e=O[Math.floor(Math.random()*O.length)].idiom;if(e){const{passedIdioms:t,keys:n}=W(e,r,l,0);r=t,l=n}}if(l.size<20||r.size<6){const t=null==(o=O.find((t=>t.idiom===e)))?void 0:o.id;console.error(t,{possibleIdioms:r.size,keySize:l.size,consecutiveFailures:s})}return{passedIdioms:r,keys:l}},U=e=>M("svg",s(a({viewBox:"0 0 20 20",fill:"currentColor"},e),{children:[D("title",{children:"▶️"}),D("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})]})),F=e=>M("svg",s(a({viewBox:"0 0 24 24"},e),{children:[D("title",{children:"✖️"}),D("path",{fill:"currentColor",d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})]})),K=new Date(2022,0,27),J=()=>{const e=(new Date).setHours(0,0,0,0)-K,t=Math.floor(e/864e5);return O[Math.max(0,t%O.length)]},q=()=>{const{t:e}=u();let t=(new Date).setHours(0,0,0,0)+864e5;const n=new Date(+K+864e5);t<n&&(t=n);const[i,o]=m("00"),[r,l]=m("00"),[a,s]=m("00"),[c,d]=m(!1);return p((()=>{const e=setInterval((()=>{const n=t-new Date;if(n<=0)return d(!0),void clearInterval(e);o(Math.floor(n/36e5).toString().padStart(2,"0")),l(Math.floor(n/6e4%60).toString().padStart(2,"0")),s(Math.floor(n/1e3%60).toString().padStart(2,"0"))}),1e3);return()=>clearInterval(e)}),[]),c?D("a",{href:"./",children:e("ui.countdownNow")}):M("time",{class:"countdown",children:[i,":",r,":",a]})},V=({code:e,url:t})=>{const{t:n}=u();return e&&D("input",{readOnly:!0,value:e,class:"idiom-code",onClick:i=>{i.target.focus(),i.target.select(),E(t||e,(()=>{R(n("ui.copiedURL"))}))}})},X="matchMedia"in window&&"not all"!==window.matchMedia("(prefers-color-scheme: dark)").media;var Y={about:{about1:"<0>Built</0> by <1>Chee Aun</1>. <2>Wordle</2> © <3>Josh Wardle</3>.",heading:"About"},app:{description:"Wordle, for Chinese idioms - 成语 (chéngyǔ). Guess the idiom in 6 tries.",title:"Chengyu Wordle"},common:{choose:"Choose",enter:"Enter",play:"Play",random:"Random",share:"Share",tweet:"Tweet"},debugging:{clearDB:"Clear database",confirmClearDB:"Are you sure?",confirmResetGame:"Are you sure?",heading:"Debugging",resetGame:"Reset current idiom game"},feedback:{githubDiscussions:"<0>GitHub Discussions</0> (for developers)",githubIssues:"<0>GitHub Issues</0> (for bugs)",heading:"Feedback",telegram:"@cheeaun on Telegram",telegramGroup:"Telegram Group",twitter:"@cheeaun on Twitter"},glossary:{baidu:"Baidu",zdic:"ZDIC"},hints:{abbreviatedPinyin:"✨ Abbreviated pinyin: {{pinyinHint}}",absentLetter:"❌ The letter {{letter}} ({{pinyin}}) is NOT in the idiom.",presentLetter:"✅ The letter {{letter}} ({{pinyin}}) is in the idiom."},howToPlay:{heading:"How to play",how1:"Guess the idiom in 6 tries.",how2:"Each guess must be a valid 4-letter idiom. Hit the enter button to submit.",how3:"After each guess, the color of the tiles will change to show how close your guess was to the idiom.",how4:"A new idiom will be available every day.",spotAbsent:"Gray = not in any spot",spotCorrect:"Green = correct spot",spotPresent:"Yellow = wrong spot"},ui:{confirmRandom:"Are you sure you want to start a new random game?",copiedResults:"Copied results to clipboard",copiedURL:"Copied URL to clipboard",countdownNow:"Now!",hint:"I'm stuck",idiomId:"Idiom ID:",nextIdiom:"Next Idiom: <0/>",playTodayGame:"Play today's game!",promptIdiom:"Enter idiom ID/URL:",startPlay:"Let's play!"}};var Z={about:{about1:"由 <1>志安</1> <0>建造</0>。 <2>Wordle</2> © <3>Josh Wardle</3>。",heading:"关于"},app:{description:"Wordle，用于汉语成语——成语（chéngyǔ）。在 6 次尝试中猜出成语。",title:"成语Wordle"},common:{choose:"选择",enter:"Enter",play:"玩",random:"随机的",share:"分享",tweet:"鸣叫"},debugging:{clearDB:"清除数据库",confirmClearDB:"你确定吗？",confirmResetGame:"你确定吗？",heading:"调试",resetGame:"重置当前的成语游戏"},feedback:{githubDiscussions:"<0>GitHub 讨论</0>（针对开发者）",githubIssues:"<0>GitHub 问题</0>（针对错误）",heading:"回馈",telegram:"电报上的 @cheeaun",telegramGroup:"电报群",twitter:"推特上的 @cheeaun"},glossary:{baidu:"百度",zdic:"汉典"},hints:{abbreviatedPinyin:"✨ 缩写拼音：{{pinyinHint}}",absentLetter:"❌ 成语中没有字母 {{letter}} ({{pinyin}})。",presentLetter:"✅ 字母 {{letter}} ({{pinyin}}) 在成语中。"},howToPlay:{heading:"怎么玩",how1:"在 6 次尝试中猜出成语。",how2:"每个猜测都必须是有效的 4 字母习语。点击回车按钮提交。",how3:"每次猜测后，图块的颜色会发生变化，以显示您的猜测与成语的接近程度。",how4:"每天都会有一个新的成语出现。",spotAbsent:"灰色 = 不在任何地方",spotCorrect:"绿色 = 正确位置",spotPresent:"黄色 = 错误的位置"},ui:{confirmRandom:"您确定要开始新的随机游戏吗？",copiedResults:"将结果复制到剪贴板",copiedURL:"将 URL 复制到剪贴板",countdownNow:"现在！",hint:"我被困住了",idiomId:"成语ID:",nextIdiom:"下一个成语：<0/>",playTodayGame:"玩今天的游戏！",promptIdiom:"输入成语 ID/URL：",startPlay:"让我们玩！"}};C.use(I).use(z).init({resources:{en:{translation:Y},zh:{translation:Z}},fallbackLng:"en",debug:/localhost/i.test(location.hostname),detection:{lookupLocalStorage:"locale",lookupCookie:"locale"},interpolation:{escapeValue:!1}}).then((e=>{const t=()=>{document.documentElement.lang=C.resolvedLanguage,document.title=document.querySelector('meta[name="title"]').content=e("app.title"),document.querySelector('meta[name="description"]').content=e("app.description")};C.on("languageChanged",t),t()})),L(D((function(){var e;const{t:t,i18n:n}=u(),[i,o]=m(G("cywd-colorScheme")||"auto");p((()=>{if(!X)return;const e=document.querySelector("html");"dark"===i?(e.classList.add("dark-mode"),e.classList.remove("light-mode")):"light"===i?(e.classList.add("light-mode"),e.classList.remove("dark-mode")):e.classList.remove("dark-mode","light-mode")}),[i]);const[r,l]=m(G("cywd-skipFirstTime")||!1),[a,s]=m(O.find((e=>e.id===location.hash.slice(1)))||J());p((()=>{window.addEventListener("hashchange",(()=>{s(O.find((e=>e.id===location.hash.slice(1)))||J())}))}),[]);const[c,d]=m((null==(e=JSON.parse(G(`cywd-${a.id}`)))?void 0:e.board)||_());p((()=>{const e=G(`cywd-${a.id}`);d(e?JSON.parse(e).board:_())}),[a.id]);const h=g((()=>c.map(((e,t)=>e.s?B(a.idiom,e.v):[]))),[c]);p((()=>{c&&c.some((e=>e.v.some((e=>e))))&&N(`cywd-${a.id}`,JSON.stringify({board:c,gameState:H(h)}))}),[h]);const[k,C]=m(null);p((()=>{C(null),fetch(`https://baidu-hanyu-idiom.cheeaun.workers.dev/?wd=${a.idiom}`).then((e=>e.json())).then((e=>{e.definition&&C(e.definition)})).catch((()=>{}))}),[a.idiom]);const I=(null==c?void 0:c.findIndex((e=>!1===e.s)))||0,[z,L]=m(!1),[S,$]=m(!1),[P,K]=m(!1),Y=g((()=>{const{keys:e}=W(a.idiom),t=j.filter((t=>t.split("").every((t=>e.has(t))))).map((e=>`${e} (${x(e)})`)).sort(((e,t)=>e.localeCompare(t,"zh")));return console.groupCollapsed&&(console.groupCollapsed(`${t.length} Possible Idioms [${a.id}] (${e.size} keys):`),console.log(`${t.map(((e,t)=>`${t+1}. ${e}`)).join("\n")}\n\n🚨SPOILER🚨 Type 'ANSWER' to see the answer.`),console.groupEnd()),window.ANSWER=`${a.idiom} (${x(a.idiom)})`,[...e].sort(((e,t)=>e.localeCompare(t,"zh")))}),[a.idiom]),Z=(e,t=!1)=>{if(!c[I])return;if(ie)return;const n=[...c];let i=n[I].v.findIndex((e=>""===e));t&&(-1===i?i=3:i--),-1!==i&&(n[I].v[i]=e,d(n))},Q=new Set,ee=new Set,te=new Set;c.forEach(((e,t)=>{e.s&&e.v.forEach(((e,n)=>{const i=h[t][n];"🟩"===i?Q.add(e):"🟧"===i?ee.add(e):"⬜"===i&&te.add(e)}))}));const ne=()=>{if(ie)return;console.log("handleEnter"),L(!1);const e=c[I];if(!e)return;const t=e.v.join(""),n=j.includes(t);n?(e.s=!0,d([...c])):setTimeout((()=>{L(!0)}),10),console.log({currentIdiom:t,valid:n})},ie=g((()=>H(h)),[h]);p((()=>{$("won"===ie?"won":"lost"===ie&&"lost")}),[ie]);const oe=()=>{if(ie)return;const e=[...c],t=e[I];if(!t||t.s)return;let n=-1;for(let i=t.v.length-1;i>=0;i--)if(""!==t.v[i]){n=i;break}-1!==n&&(t.v[n]="",d(e))};p((()=>{const e=e=>{if(ie)return;if(e.metaKey||e.ctrlKey||!e.key)return;const t=e.key.toLowerCase();if("enter"===t)e.preventDefault(),e.stopPropagation(),ne();else if("backspace"===t)e.preventDefault(),oe();else if(/^arrow(left|right)/i.test(t)){const e=[...c[I].v].reverse().find((e=>""!==e));if(e){const n=x(e)[0],i=Y.filter((e=>x(e)[0]===n));if(i.length<=1)return;const o=i.indexOf(e),r="arrowright"===t?i[(o+1)%i.length]:i[(o+i.length-1)%i.length];r&&Z(r,!0)}}else{const n=Y.find((e=>0===x(e)[0].localeCompare(t,"en",{sensitivity:"base"})));n&&(e.preventDefault(),Z(n))}};return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)}}),[Y,c,I,ie]);const re=location.origin+location.pathname+"#"+a.id,le=location.host+location.pathname+"#"+a.id,ae=h.map((e=>e.join(""))).join("\n").trim(),se="won"===ie?ae.split("\n").length:"X",ce=`${`${t("app.title")} [${a.id}] ${se}/6\n\n${ae}`}\n\n${le}`,de=g((()=>{const e=[],n=a.idiom.split(""),i=Y.filter((e=>!n.includes(e)&&!te.has(e))).slice(0,-1).slice(0,3).map((e=>t("hints.absentLetter",{letter:e,pinyin:x(e)}))).sort((()=>Math.random()-.5));e.push(...i),(null==k?void 0:k.zh)&&n.filter((e=>k.zh.includes(e))).length<=2&&e.push(`ℹ️ ${k.zh}`),(null==k?void 0:k.en)&&e.push(`ℹ️ ${k.en}`);const o=n.filter((e=>!Q.has(e)&&!ee.has(e))).slice(0,-1).map((e=>t("hints.presentLetter",{letter:e,pinyin:x(e)}))).sort((()=>Math.random()-.5));e.push(...o);const r=n.map((e=>x(e)[0])).join("").normalize("NFD").replace(/[\u0300-\u036f]/g,"");return e.push(t("hints.abbreviatedPinyin",{pinyinHint:r})),e}),[Q,a.idiom,k]),he=f(0);p((()=>{he.current=0}),[a.idiom]);const{toasts:ue}=b();return p((()=>{ue.filter(((e,t)=>e.visible&&t>=1)).forEach((e=>y.dismiss(e.id)))}),[ue]),M(T,{children:[D("header",{children:M("div",{class:"inner",children:[D("button",{type:"button",onClick:()=>{K(!0)},children:M("svg",{width:"16",height:"16",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[D("title",{children:"ℹ️"}),D("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})]})}),D("h1",{children:t("app.title")}),D("button",{type:"button",onClick:()=>{$(ie||"play")},children:ie?t("common.play"):D("svg",{width:"16",height:"16",viewBox:"0 0 290 290",children:D("path",{fill:"currentColor",d:"M255 110a35 35 0 1 0 0 70 35 35 0 0 0 0-70zM35 110a35 35 0 1 0 0 70 35 35 0 0 0 0-70zM145 110a35 35 0 1 0 0 70 35 35 0 0 0 0-70z"})})})]})}),D("div",{id:"board",children:c.map(((e,t)=>D("div",{className:`row ${I===t&&z?"error":""} ${I===t?"current":""}`,children:e.v.map(((e,n)=>{var i;return D("div",{className:`letter ${e?"lettered":""} ${null!=(i=h[t][n])?i:""} ${h[t][n]?"🌈":""}`,children:M("ruby",{children:[e||D("span",{style:{opacity:0},children:"一"}),D("rp",{children:"("}),D("rt",{children:x(e)||D(T,{children:" "})}),D("rp",{children:")"})]})},n)}))},t)))}),D("div",{id:"keyboard",children:M("div",{class:"inner",children:[D("div",{class:"keys",children:Y.map(((e,t)=>D("button",{class:`${Q.has(e)?"🟩":""} ${ee.has(e)?"🟧":""} ${te.has(e)?"⬜":""}`,type:"button",tabIndex:-1,onClick:()=>{Z(e)},children:M("ruby",{children:[e,D("rp",{children:"("}),D("rt",{children:x(e)}),D("rp",{children:")"})]})})))}),M("div",{class:"row",children:[D("button",{type:"button",onClick:ne,tabIndex:-1,children:t("common.enter")}),D("button",{type:"button",class:"stuck",onClick:()=>{if(ie)return;const e=de[he.current];he.current=(he.current+1)%de.length,R(e)},children:t("ui.hint")}),D("button",{type:"button",onClick:oe,tabIndex:-1,children:D("svg",{height:"24",viewBox:"0 0 24 24",width:"24",children:D("path",{fill:"currentColor",d:"M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"})})})]})]})}),M("div",{id:"modal",class:S?"appear":"",onClick:e=>{e.target===e.currentTarget&&$(null)},children:[D(F,{height:"24",width:"24",class:"close",onClick:()=>{$(null)}}),M("div",{class:"content",children:[D("h2",{children:"won"===S?"🎉🎉🎉":"lost"===S?"😭😭😭":"🐯🐯🐯"}),"play"===S&&M("p",{children:[t("ui.idiomId")," ",D(V,{code:a.id,url:re})]}),/(won|lost)/i.test(S)&&M(T,{children:[M("p",{children:[D("b",{class:"answer",children:M("ruby",{children:[a.idiom,D("rp",{children:"("}),D("rt",{children:x(a.idiom)}),D("rp",{children:")"})]})}),M("div",{class:"definition",children:[(null==k?void 0:k.zh)?k.zh.split("").map((e=>x(e)===e?e:M("ruby",{children:[e,D("rp",{children:"("}),D("rt",{children:x(e)}),D("rp",{children:")"})]}))):"",(null==k?void 0:k.zh)&&(null==k?void 0:k.en)&&D("br",{}),null==k?void 0:k.en]}),M("small",{children:[M("a",{href:`https://hanyu.baidu.com/s?wd=${a.idiom}&from=zici`,target:"_blank",children:["📖 ",t("glossary.baidu")]}),"   ",M("a",{href:`https://www.zdic.net/hans/${a.idiom}`,target:"_blank",children:["📖 ",t("glossary.zdic")]})]})]}),D("div",{class:"results",children:ce}),M("button",{id:"share",onClick:async()=>{try{if(/edge?\//i.test(navigator.userAgent)||/windows/.test(navigator.userAgent))throw new Error("Web Share API not working well here");E(ce),await navigator.share({text:ce})}catch(e){E(ce,(()=>{R(t("ui.copiedResults"))}))}},children:[t("common.share")," ",D("svg",{height:"16",width:"16",viewBox:"0 0 24 24",children:D("path",{fill:"currentColor",d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"})})]})," ",D("a",{class:"button facebook",href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(re)}&hashtag=${encodeURIComponent("#chengyuwordle")}`,target:"_blank",onClick:()=>{E(ce)},children:M("svg",{width:"16",height:"16",viewBox:"0 0 96.1 96.1",children:[D("title",{children:"Facebook"}),D("path",{fill:"currentColor",d:"M72 0H59.7c-14 0-23 9.3-23 23.7v10.9H24c-1 0-2 .8-2 2v15.7c0 1.1 1 2 2 2h12.6v39.9c0 1 .8 2 2 2h16.3c1 0 2-1 2-2v-40h14.6c1 0 2-.8 2-1.9V36.5a2 2 0 0 0-2-2H56.8v-9.2c0-4.4 1.1-6.7 6.9-6.7H72c1 0 2-.9 2-2V2c0-1.1-1-2-2-2z"})]})})," ",D("a",{class:"button tweet",href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(ce)}`,target:"_blank",children:M("svg",{height:"16",width:"16",viewBox:"0 0 24 24",children:[D("title",{children:t("common.tweet")}),D("path",{fill:"currentColor",d:"M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"})]})})," ",D(V,{code:a.id,url:re})]}),M("div",{class:"footer",children:[/won|lost/i.test(ie)&&J().id===a.id&&D("p",{children:D("big",{children:D(w,{i18nKey:"ui.nextIdiom",components:[D(q,{})]})})}),M("div",{children:[J().id!==a.id&&M(T,{children:[M("a",{href:"./",class:"button strong",children:[D(U,{width:20,height:20})," ",t("ui.playTodayGame")]}),D("br",{})]}),M("button",{type:"button",onClick:()=>{if(confirm(t("ui.confirmRandom"))){const e=Math.round(Math.random()*(O.length-1)),t=O[e];location.hash=`#${t.id}`,$(null)}},children:[D(U,{width:20,height:20})," ",t("common.random")]})," ",M("button",{type:"button",onClick:()=>{let e=prompt(t("ui.promptIdiom"));try{e=new URL(e).hash.slice(1)}catch(n){}if(e){const t=O.find((t=>t.id===e));t?(location.hash=`#${t.id}`,$(null)):R("Invalid idiom ID")}},children:[D(U,{width:20,height:20})," ",t("common.choose")]})]})]})]})]}),M("div",{id:"info-modal",class:P||!r?"appear":"",children:[r&&D(F,{height:"32",width:"32",class:"close",onClick:()=>{K(!1)}}),M("div",{class:"content",children:[X&&M("p",{class:"color-scheme-selector",children:[D("button",{type:"button",class:"dark"===i?"active":"",onClick:()=>{N("cywd-colorScheme","dark"),o("dark")},children:"🌑"})," ",D("button",{type:"button",class:"auto"===i?"active":"",onClick:()=>{A("cywd-colorScheme"),o("auto")},children:"🌓"})," ",D("button",{type:"button",class:"light"===i?"active":"",onClick:()=>{N("cywd-colorScheme","light"),o("light")},children:"🌕"})]})," ",M("p",{class:"locale-selector",children:["🌐"," ",D("a",{href:"./?lng=en",hreflang:"en",rel:"en"===n.resolvedLanguage?void 0:"alternate",class:""+("en"===n.resolvedLanguage?"selected":""),onClick:e=>{e.preventDefault(),n.changeLanguage("en")},children:"English"})," ","⋅"," ",D("a",{href:"./?lng=zh-CN",hreflang:"zh-CN",rel:"zh"===n.resolvedLanguage?void 0:"alternate",class:""+("zh"===n.resolvedLanguage?"selected":""),onClick:e=>{e.preventDefault(),n.changeLanguage("zh-CN")},children:"中文"})]}),D("h2",{children:t("howToPlay.heading")}),D("p",{children:t("howToPlay.how1")}),D("p",{children:t("howToPlay.how2")}),D("p",{children:t("howToPlay.how3")}),M("ul",{children:[M("li",{children:["🟩⬜⬜⬜ ",t("howToPlay.spotCorrect")]}),M("li",{children:["⬜🟧⬜⬜ ",t("howToPlay.spotPresent")]}),M("li",{children:["⬜⬜",D("span",{style:{filter:"contrast(0)"},children:"⬛"}),"⬜"," ",t("howToPlay.spotAbsent")]})]}),D("p",{children:t("howToPlay.how4")}),r?M(T,{children:[D("h2",{children:t("about.heading")}),D("p",{children:D(w,{i18nKey:"about.about1",components:[D("a",{href:"https://github.com/cheeaun/chengyu-wordle/",target:"_blank"}),D("a",{href:"https://cheeaun.com",target:"_blank"}),D("a",{href:"https://www.powerlanguage.co.uk/wordle/",target:"_blank"}),D("a",{href:"https://powerlanguage.co.uk/",target:"_blank"})]})}),D("h2",{children:t("feedback.heading")}),M("ul",{children:[D("li",{children:D("a",{href:"https://t.me/+ykuhfiImLd1kNjk1",target:"_blank",children:t("feedback.telegramGroup")})}),D("li",{children:D(w,{i18nKey:"feedback.githubDiscussions",components:[D("a",{href:"https://github.com/cheeaun/chengyu-wordle/discussions",target:"_blank"})]})}),D("li",{children:D(w,{i18nKey:"feedback.githubIssues",components:[D("a",{href:"https://github.com/cheeaun/chengyu-wordle/issues",target:"_blank"})]})}),D("li",{children:D("a",{href:"https://twitter.com/cheeaun",target:"_blank",children:t("feedback.twitter")})}),D("li",{children:D("a",{href:"https://t.me/cheeaun",target:"_blank",children:t("feedback.telegram")})})]}),M("details",{id:"debugging-container",children:[M("summary",{children:[t("debugging.heading")," (","3dbcfdd",")"]}),D("button",{type:"button",onClick:()=>{confirm(t("debugging.confirmResetGame"))&&(A("cywd-"+a.id),location.reload())},children:t("debugging.resetGame")})," ",D("button",{type:"button",onClick:()=>{confirm(t("debugging.confirmClearDB"))&&(clearGames(),location.reload())},children:t("debugging.clearDB")})]})]}):D("p",{children:M("button",{type:"button",class:"large",onClick:()=>{K(!1),N("cywd-skipFirstTime",1),l(!0)},children:[D(U,{width:"20",height:"20"})," ",t("ui.startPlay")]})})]})]}),D(v,{containerStyle:{top:"3.5em"},toastOptions:{className:"toast",style:{pointerEvents:"none"}}})]})}),{}),document.getElementById("app"));
//# sourceMappingURL=index.60288998.js.map
