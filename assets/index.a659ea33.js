var Qe=Object.create;var te=Object.defineProperty,et=Object.defineProperties,tt=Object.getOwnPropertyDescriptor,nt=Object.getOwnPropertyDescriptors,ot=Object.getOwnPropertyNames,ee=Object.getOwnPropertySymbols,rt=Object.getPrototypeOf,pe=Object.prototype.hasOwnProperty,ze=Object.prototype.propertyIsEnumerable;var Me=(e,o,i)=>o in e?te(e,o,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[o]=i,M=(e,o)=>{for(var i in o||(o={}))pe.call(o,i)&&Me(e,i,o[i]);if(ee)for(var i of ee(o))ze.call(o,i)&&Me(e,i,o[i]);return e},H=(e,o)=>et(e,nt(o)),it=e=>te(e,"__esModule",{value:!0});var Ae=(e,o)=>{var i={};for(var l in e)pe.call(e,l)&&o.indexOf(l)<0&&(i[l]=e[l]);if(e!=null&&ee)for(var l of ee(e))o.indexOf(l)<0&&ze.call(e,l)&&(i[l]=e[l]);return i};var st=(e,o,i,l)=>{if(o&&typeof o=="object"||typeof o=="function")for(let r of ot(o))!pe.call(e,r)&&(i||r!=="default")&&te(e,r,{get:()=>o[r],enumerable:!(l=tt(o,r))||l.enumerable});return e},at=(e,o)=>st(it(te(e!=null?Qe(rt(e)):{},"default",!o&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);import{j as lt,a as ct,F as dt,t as ht,b as ut,u as W,l as E,y as T,h as V,c as Ge,d as Y,s as ie,e as mt,A as pt,T as _,S as gt,f as ft,g as yt,i as bt,k as ge,B as wt,m as vt,n as kt}from"./vendor.4c67874c.js";import{t as Z}from"./pinyin.7b731678.js";import{i as Ct}from"./all-idioms.effcc4de.js";import{d as It}from"./game-idioms.357fe011.js";function Cn(){Promise.resolve().then(()=>at(require("data:text/javascript,")))}const St=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const g of c.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&l(g)}).observe(document,{childList:!0,subtree:!0});function i(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function l(r){if(r.ep)return;r.ep=!0;const c=i(r);fetch(r.href,c)}};St();const $t={about1:"<0>Built</0> by <1>Chee Aun</1>. <2>Wordle</2> \xA9 The New York Times Company.",about2:"Enjoying the game? <0>Buy me a coffee!</0>",heading:"About"},Et={description:"Wordle, for Chinese idioms - \u6210\u8BED (ch\xE9ngy\u01D4). Guess the idiom in 6 tries.",title:"Chengyu Wordle"},Lt={choose:"Choose",enter:"Enter",image:"Image",play:"Play",random:"Random",share:"Share",tweet:"Tweet"},Tt={heading:"Congratulations, you've made it! {{gamesCount}}+ games!",subheading:"Here you have access to ALL idiom games, including the ones you might have not played. Click on the box to play a specific idiom game.",totalGamesPlayed:"Total games played: <0>{{gamesCountOverTotal}}</0>",wonLost:"\u{1F7E9} Won: <0>{{wonCount}}</0> \xB7 \u{1F7E7} Lost: <1>{{lostCount}}</1>"},Ft={clearDB:"Clear database",confirmClearDB:"Are you sure?",confirmResetGame:"Are you sure?",heading:"Debugging",resetGame:"Reset current idiom game"},xt={githubDiscussions:"<0>GitHub Discussions</0> (for developers)",githubIssues:"<0>GitHub Issues</0> (for bugs)",heading:"Feedback",telegram:"@cheeaun on Telegram",telegramGroup:"Telegram Group",twitter:"@cheeaun on Twitter"},Dt={baidu:"Baidu",zdic:"ZDIC"},Pt={abbreviatedPinyin:"\u2728 Abbreviated pinyin: {{pinyinHint}}",absentLetter:"\u274C The letter {{letter}} ({{pinyin}}) is NOT in the idiom.",presentLetter:"\u2705 The letter {{letter}} ({{pinyin}}) is in the idiom."},Mt={heading:"How to play",how1:"Guess the idiom in 6 tries.",how2:"Each guess must be a valid 4-letter idiom. Hit the enter button to submit.",how3:"After each guess, the color of the tiles will change to show how close your guess was to the idiom.",how4:"A new idiom will be available every day.",spotAbsent:"Gray = not in any spot",spotCorrect:"Green = correct spot",spotPresent:"Yellow = wrong spot"},zt={avoidSpoilers:"Please don't share answers to avoid spoilers!",confirmRandom:"Are you sure you want to start a new random game?",copiedResults:"Copied results to clipboard",copiedURL:"Copied URL to clipboard",countdownNow:"Now!",countPlaying:"{{count}} playing",easyEnableHardMode:'Too easy? Tap \u24D8 to enable "Hard mode \u{1F525}"!',gamesPlayed:"\u{1F4CA} Games played: <0/>",hardMode:"Hard mode \u{1F525}",hint:"I'm stuck",idiomId:"Idiom ID:",nextIdiom:"Next Idiom: <0/>",playTodayGame:"Play today's game!",promptIdiom:"Enter idiom ID/URL:",soundEffects:"Sound effects",startPlay:"Let's play!"};var At={about:$t,app:Et,common:Lt,dashboard:Tt,debugging:Ft,feedback:xt,glossary:Dt,hints:Pt,howToPlay:Mt,ui:zt};const Gt={about1:"\u7531 <1>\u5FD7\u5B89</1> <0>\u5EFA\u9020</0>\u3002 <2>Wordle</2> \xA9 The New York Times Company\u3002",about2:"\u4EAB\u53D7\u6E38\u620F\u5417\uFF1F <0>\u8BF7\u6211\u559D\u676F\u5496\u5561\uFF01</0> ",heading:"\u5173\u4E8E"},Ht={description:"Wordle\uFF0C\u7528\u4E8E\u6C49\u8BED\u6210\u8BED\u2014\u2014\u6210\u8BED\uFF08ch\xE9ngy\u01D4\uFF09\u3002\u5728 6 \u6B21\u5C1D\u8BD5\u4E2D\u731C\u51FA\u6210\u8BED\u3002",title:"\u6210\u8BEDWordle"},Rt={choose:"\u9009\u62E9",enter:"Enter",image:"\u56FE\u7247",play:"\u73A9",random:"\u968F\u673A\u7684",share:"\u5206\u4EAB",tweet:"\u9E23\u53EB"},Bt={heading:"\u606D\u559C\u4F60\uFF0C\u4F60\u6210\u529F\u4E86\uFF01 {{gamesCount}}+\u6E38\u620F\uFF01",subheading:"\u5728\u8FD9\u91CC\uFF0C\u60A8\u53EF\u4EE5\u8BBF\u95EE\u6240\u6709\u6210\u8BED\u6E38\u620F\uFF0C\u5305\u62EC\u60A8\u53EF\u80FD\u6CA1\u6709\u73A9\u8FC7\u7684\u6E38\u620F\u3002 \u5355\u51FB\u8BE5\u6846\u4EE5\u73A9\u7279\u5B9A\u7684\u6210\u8BED\u6E38\u620F\u3002",totalGamesPlayed:"\u5DF2\u73A9\u6E38\u620F\u603B\u6570\uFF1A<0>{{gamesCountOverTotal}}</0>",wonLost:"\u{1F7E9} \u83B7\u80DC\uFF1A<0>{{wonCount}}</0> \xB7 \u{1F7E7} \u5931\u8D25\uFF1A<1>{{lostCount}}</1>"},Nt={clearDB:"\u6E05\u9664\u6570\u636E\u5E93",confirmClearDB:"\u4F60\u786E\u5B9A\u5417\uFF1F",confirmResetGame:"\u4F60\u786E\u5B9A\u5417\uFF1F",heading:"\u8C03\u8BD5",resetGame:"\u91CD\u7F6E\u5F53\u524D\u7684\u6210\u8BED\u6E38\u620F"},_t={githubDiscussions:"<0>GitHub \u8BA8\u8BBA</0>\uFF08\u9488\u5BF9\u5F00\u53D1\u8005\uFF09",githubIssues:"<0>GitHub \u95EE\u9898</0>\uFF08\u9488\u5BF9\u9519\u8BEF\uFF09",heading:"\u56DE\u9988",telegram:"\u7535\u62A5\u4E0A\u7684 @cheeaun",telegramGroup:"\u7535\u62A5\u7FA4",twitter:"\u63A8\u7279\u4E0A\u7684 @cheeaun"},Ot={baidu:"\u767E\u5EA6",zdic:"\u6C49\u5178"},jt={abbreviatedPinyin:"\u2728 \u7F29\u5199\u62FC\u97F3\uFF1A{{pinyinHint}}",absentLetter:"\u274C \u6210\u8BED\u4E2D\u6CA1\u6709\u5B57\u6BCD {{letter}} ({{pinyin}})\u3002",presentLetter:"\u2705 \u5B57\u6BCD {{letter}} ({{pinyin}}) \u5728\u6210\u8BED\u4E2D\u3002"},Kt={heading:"\u600E\u4E48\u73A9",how1:"\u5728 6 \u6B21\u5C1D\u8BD5\u4E2D\u731C\u51FA\u6210\u8BED\u3002",how2:"\u6BCF\u4E2A\u731C\u6D4B\u90FD\u5FC5\u987B\u662F\u6709\u6548\u7684 4 \u5B57\u6BCD\u4E60\u8BED\u3002\u70B9\u51FB\u56DE\u8F66\u6309\u94AE\u63D0\u4EA4\u3002",how3:"\u6BCF\u6B21\u731C\u6D4B\u540E\uFF0C\u56FE\u5757\u7684\u989C\u8272\u4F1A\u53D1\u751F\u53D8\u5316\uFF0C\u4EE5\u663E\u793A\u60A8\u7684\u731C\u6D4B\u4E0E\u6210\u8BED\u7684\u63A5\u8FD1\u7A0B\u5EA6\u3002",how4:"\u6BCF\u5929\u90FD\u4F1A\u6709\u4E00\u4E2A\u65B0\u7684\u6210\u8BED\u51FA\u73B0\u3002",spotAbsent:"\u7070\u8272 = \u4E0D\u5728\u4EFB\u4F55\u5730\u65B9",spotCorrect:"\u7EFF\u8272 = \u6B63\u786E\u4F4D\u7F6E",spotPresent:"\u9EC4\u8272 = \u9519\u8BEF\u7684\u4F4D\u7F6E"},Ut={avoidSpoilers:"\u8BF7\u52FF\u5206\u4EAB\u7B54\u6848\u4EE5\u514D\u5267\u900F\uFF01",confirmRandom:"\u60A8\u786E\u5B9A\u8981\u5F00\u59CB\u65B0\u7684\u968F\u673A\u6E38\u620F\u5417\uFF1F",copiedResults:"\u5C06\u7ED3\u679C\u590D\u5236\u5230\u526A\u8D34\u677F",copiedURL:"\u5C06 URL \u590D\u5236\u5230\u526A\u8D34\u677F",countdownNow:"\u73B0\u5728\uFF01",countPlaying:"{{count}}\u5728\u73A9",easyEnableHardMode:"\u592A\u5BB9\u6613\u4E86\uFF1F \u70B9\u51FB\u24D8\u542F\u7528\u201C\u56F0\u96BE\u6A21\u5F0F\u{1F525}\u201D\uFF01 ",gamesPlayed:"\u{1F4CA} \u73A9\u8FC7\u7684\u6E38\u620F\uFF1A<0/>",hardMode:"\u56F0\u96BE\u6A21\u5F0F \u{1F525}",hint:"\u6211\u88AB\u56F0\u4F4F\u4E86",idiomId:"\u6210\u8BEDID:",nextIdiom:"\u4E0B\u4E00\u4E2A\u6210\u8BED\uFF1A<0/>",playTodayGame:"\u73A9\u4ECA\u5929\u7684\u6E38\u620F\uFF01",promptIdiom:"\u8F93\u5165\u6210\u8BED ID/URL\uFF1A",soundEffects:"\u58F0\u97F3\u7279\u6548",startPlay:"\u8BA9\u6211\u4EEC\u73A9\uFF01"};var Vt={about:Gt,app:Ht,common:Rt,dashboard:Bt,debugging:Nt,feedback:_t,glossary:Ot,hints:jt,howToPlay:Kt,ui:Ut},Wt="./assets/keypress-delete.faeb84ff.mp3",qt="./assets/keypress-return.cbbc8f21.mp3",Jt="./assets/keypress-standard.8f78f698.mp3";const t=lt,a=ct,O=dt;var Xt=e=>t("svg",H(M({viewBox:"0 0 24 24",fill:"currentColor"},e),{children:t("path",{d:"M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"})})),fe=e=>a("svg",H(M({viewBox:"0 0 24 24"},e),{children:[t("title",{children:"\u2716\uFE0F"}),t("path",{fill:"currentColor",d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})]})),U=e=>ht(e),se=(e,o=()=>{})=>{navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(e).then(o).catch(i=>{}):(ut(e),o())},A=(...e)=>{window.plausible&&plausible(...e)},He=({code:e,url:o})=>{const{t:i}=W();return e&&t("input",{type:"text",readOnly:!0,value:e,class:"idiom-code",onClick:l=>{l.target.focus(),l.target.select(),se(o||e,()=>{U(i("ui.copiedURL"))}),A("Click: Share",{props:{type:"idiom-code"}})}})},Yt=()=>{const{t:e}=W();let o=new Date().setHours(0,0,0,0)+24*60*60*1e3;const[i,l]=E("00"),[r,c]=E("00"),[g,m]=E("00"),[v,y]=E(!1);return T(()=>{const k=setInterval(()=>{const I=o-new Date;if(I<=0){y(!0),clearInterval(k);return}l(Math.floor(I/36e5).toString().padStart(2,"0")),c(Math.floor(I/6e4%60).toString().padStart(2,"0")),m(Math.floor(I/1e3%60).toString().padStart(2,"0"))},1e3);return()=>clearInterval(k)},[]),v?t("a",{href:"./",children:e("ui.countdownNow")}):a("time",{class:"countdown",children:[i,":",r,":",g]})},Zt=()=>{const{t:e}=W(),[o,i]=E(0);return T(()=>{let l,r;const c=()=>{fetch("https://chengyu-wordle-realtime-visitors.cheeaun.workers.dev/").then(g=>{if(!g.ok)throw Error(g.statusText);return g.text()}).then(g=>{const m=+g;if(!m)throw Error("Zero or NaN");i(m)}).catch(g=>{i(0)}),l=setTimeout(()=>{r=requestAnimationFrame(c)},12e4)};return c(),()=>{clearTimeout(l),cancelAnimationFrame(r)}},[]),o<=1?null:t("div",{id:"current-playing",children:e("ui.countPlaying",{count:o})})},Qt=e=>a("svg",H(M({viewBox:"0 0 330 330",fill:"currentColor"},e),{children:[t("title",{children:"\u2B07\uFE0F"}),t("path",{d:"m154 256 1 1h2v1h1l1 1h2v1h8v-1h2l1-1h1v-1h2l1-1 70-70a15 15 0 0 0-22-22l-44 45V25a15 15 0 0 0-30 0v184l-44-45a15 15 0 1 0-22 22z"}),t("path",{d:"M315 160c-8 0-15 7-15 15v115H30V175a15 15 0 0 0-30 0v130c0 8 7 15 15 15h300c8 0 15-7 15-15V175c0-8-7-15-15-15z"})]})),en=e=>a("svg",H(M({viewBox:"0 0 96.1 96.1",fill:"currentColor"},e),{children:[t("title",{children:"Facebook"}),t("path",{d:"M72 0H59.7c-14 0-23 9.3-23 23.7v10.9H24c-1 0-2 .8-2 2v15.7c0 1.1 1 2 2 2h12.6v39.9c0 1 .8 2 2 2h16.3c1 0 2-1 2-2v-40h14.6c1 0 2-.8 2-1.9V36.5a2 2 0 0 0-2-2H56.8v-9.2c0-4.4 1.1-6.7 6.9-6.7H72c1 0 2-.9 2-2V2c0-1.1-1-2-2-2z"})]})),tn=e=>a("svg",H(M({fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},e),{children:[t("title",{children:"\u2139\uFE0F"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})]})),nn=e=>a("svg",H(M({viewBox:"0 0 290 290",fill:"currentColor"},e),{children:[t("title",{children:"..."}),t("path",{d:"M255 110a35 35 0 1 0 0 70 35 35 0 0 0 0-70zM35 110a35 35 0 1 0 0 70 35 35 0 0 0 0-70zM145 110a35 35 0 1 0 0 70 35 35 0 0 0 0-70z"})]})),ne=e=>a("svg",H(M({viewBox:"0 0 20 20",fill:"currentColor"},e),{children:[t("title",{children:"\u25B6\uFE0F"}),t("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})]})),on=e=>t("svg",H(M({viewBox:"0 0 24 24",fill:"currentColor"},e),{children:t("path",{d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"})}));const rn=Z;var oe=({letter:e,pinyin:o,state:i})=>t("div",{class:`letter ${e?"lettered":""} ${i!=null?i:""} ${i?"\u{1F308}":""}`,children:a("ruby",{children:[e||t("span",{style:{opacity:0},children:"\u4E00"}),t("rp",{children:"("}),t("rt",{children:o||rn(e)||t(O,{children:"\xA0"})}),t("rp",{children:")"})]})}),sn=e=>a("svg",H(M({viewBox:"0 0 24 24",fill:"currentColor"},e),{children:[t("title",{children:e.title}),t("path",{d:"M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"})]}));const b="cywd-",x={getItem:e=>{try{return localStorage.getItem(e)}catch(o){return null}},setItem:(e,o)=>{try{return localStorage.setItem(e,o)}catch(i){return null}},removeItem:e=>{try{return localStorage.removeItem(e)}catch(o){return null}}};var an=e=>{const[o,i]=E(V.Howler.volume());return a("span",{children:[o>.66?"\u{1F50A}":o>.33?"\u{1F509}":o>0?"\u{1F508}":"\u{1F507}"," ",t("input",M({type:"range",min:"0",max:"1",step:"0.1",value:o,onChange:l=>{const r=+l.target.value;isNaN(r)||(V.Howler.volume(r),i(r),x.setItem(`${b}volume`,r))}},e))]})},_e=()=>{const e=Date.now()+2e3,o=["#008000","#FFA500"];(function i(){Ge({particleCount:2,angle:60,spread:80,origin:{x:0,y:1},colors:o,shapes:["square"],disableForReducedMotion:!0}),Ge({particleCount:2,angle:120,spread:80,origin:{x:1,y:1},colors:o,shapes:["square"],disableForReducedMotion:!0}),Date.now()<e&&requestAnimationFrame(i)})()},ln=(e,o)=>{if(e==null||o==null)return[];const i=typeof o=="string"?o.split(""):o,l=typeof e=="string"?e.split(""):e,r=i.length,c=Array.from({length:r},()=>"\u2B1C");if(r!==l.length)throw new Error("Words must have the same length");const g=[];for(let v=0;v<r;v++){const y=i[v],k=l[v];y===k&&(c[v]="\u{1F7E9}",g.push(v))}const m=[];for(let v=0;v<r;v++){const y=i[v],k=l[v];if(y!==k){const I=l.findIndex((w,D)=>w===y&&!g.includes(D)&&!m.includes(D));I!==-1&&(c[v]="\u{1F7E7}",m.push(I))}}return c},be="matchMedia"in window&&window.matchMedia("(prefers-color-scheme: dark)").media!=="not all",cn=()=>{let e,o;"hidden"in document?(e="hidden",o="visibilitychange"):"mozHidden"in document?(e="mozHidden",o="mozvisibilitychange"):"webkitHidden"in document&&(e="webkitHidden",o="webkitvisibilitychange");const[i,l]=E(!document[e]);return T(()=>{const r=()=>l(!document[e]);try{document.addEventListener(o,r)}catch(c){}return()=>{try{document.removeEventListener(o,r)}catch(c){}}},[]),i};const z=Z;window.pinyin=Z;const R=JSON.parse(x.getItem(`${b}hardMode`)||!1),Oe=5e3,we=4,re=R?40:20,je=6,ye=R?10:6;R&&A("Hard mode");const Re=Ct.split(`
`),F=It.slice(1).map(e=>({id:e[0],idiom:e[1]}));V.Howler.volume(JSON.parse(x.getItem(`${b}volume`))||.5);const dn=new V.Howl({src:[Jt]}),hn=new V.Howl({src:[Wt]}),un=new V.Howl({src:[qt]});window.clearGames=()=>{try{const{length:e}=localStorage;for(let o=0;o<e;o++){const i=localStorage.key(o);(i==null?void 0:i.startsWith(b))&&localStorage.removeItem(i)}}catch(e){}};window.allGames=()=>{const e=new Map,{length:o}=localStorage;for(let i=0;i<o;i++){const l=localStorage.key(i);if(l.startsWith(b)){const r=JSON.parse(localStorage.getItem(l));e.set(l.replace(b,""),r)}}return e};const mn=()=>{try{return Object.entries(localStorage).filter(([o,i])=>{const l=o.startsWith(b);if(!l)return!1;const r=o.slice(b.length);return l&&F.find(c=>c.id===r)}).map(([o,i])=>{const l=o.slice(b.length),r=JSON.parse(i);return M({id:l},r)})}catch(e){}},pn=(e,o=!1)=>{try{e.forEach(i=>{const c=i,{id:l}=c,r=Ae(c,["id"]);(o||!localStorage.getItem(`${b}${l}`))&&x.setItem(`${b}${l}`,JSON.stringify(r))})}catch(i){}},Be=e=>{if(e.some(r=>!!r.length&&r.every(c=>c==="\u{1F7E9}")))return"won";const i=e[e.length-1];return!!i.length&&i.every(r=>r!=="\u{1F7E9}")?"lost":null},Ne=()=>Array.from({length:je},()=>({v:Array.from({length:we},()=>""),s:!1})),ve=(e,o,i,l=0)=>{var v;let r=o||new Set;r.add(e);let c=i||new Set;const g=e.split("");g.forEach(y=>c.add(y));let m=0;e:for(let y=0;y<F.length;y++){const k=g[(y+1)%we],I=F.find(({idiom:w})=>!r.has(w)&&w.includes(k));if(I){for(let w=0;w<I.idiom.length;w++)if(c.add(I.idiom[w]),c.size>=re)break e;r.add(I.idiom),m=0}else{if(m>=we+1)break e;m+=1}}if(c.size<re||r.size<ye){const y=[...r][++l];if(y){const{passedIdioms:k,keys:I}=ve(y,r,c,l);r=k,c=I}}if(c.size<re||r.size<ye){const y=F[Math.floor(Math.random()*F.length)].idiom;if(y){const{passedIdioms:k,keys:I}=ve(y,r,c,0);r=k,c=I}}if(c.size<re||r.size<ye){const y=(v=F.find(k=>k.idiom===e))==null?void 0:v.id;console.error(y,{possibleIdioms:r.size,keySize:c.size,consecutiveFailures:m})}return{passedIdioms:r,keys:c}},gn=new Date(2022,0,27),K=()=>{const o=new Date().setHours(0,0,0,0)-gn,i=Math.floor(o/(1e3*60*60*24));return F[Math.max(0,i%F.length)]},fn=()=>{const{t:e}=W();let o=0,i=0;const l=F.map(r=>{const c=JSON.parse(x.getItem(`${b}${r.id}`));if(c&&c.gameState){const{board:g,gameState:m}=c;return m==="won"?o++:m==="lost"&&i++,t("a",{href:`/#${r.id}`,class:`board ${m}`,title:`${r.id} (${m})`,children:m==="won"?"\u{1F7E9}":"\u{1F7E7}"})}else return t("a",{href:`/#${r.id}`,class:"board",title:`${r.id}`,children:"\u2B1C"})});return T(()=>{_e()},[]),a(O,{children:[t("h2",{children:e("dashboard.heading",{gamesCount:Oe})}),t("p",{children:e("dashboard.subheading")}),a("p",{children:[t(_,{i18nKey:"dashboard.totalGamesPlayed",values:{gamesCountOverTotal:`${o+i} / ${F.length}`},components:[t("b",{})]}),t("br",{}),t(_,{i18nKey:"dashboard.wonLost",values:{wonCount:o,lostCount:i},components:[t("b",{}),t("b",{})]})]}),t("div",{class:"boards",children:l})]})},yn=({header:e,footer:o,boardStates:i,id:l})=>{const{t:r}=W(),c=ie(null),[g,m]=E(null),v={canvasWidth:1080,canvasHeight:1080,quality:.5},[y,k]=E();T(()=>{if(!be)return;const w=window.matchMedia("(prefers-color-scheme: dark)"),D=u=>{k(u.matches)};try{w.addEventListener("change",D)}catch(u){w.addListener(D)}return()=>{try{w.removeEventListener("change",D)}catch(u){w.removeListener(D)}}}),T(()=>{let w=!0;return m(null),yt(c.current,v).then(D=>{w&&m(D)}).catch(D=>{w&&m(null)}),()=>{w=!1}},[i,l,y]);const I=`chengyu-wordle-${l}.jpg`;return a(O,{children:[!!g&&a("a",{id:"share-image-button",class:"button",href:g,download:I,target:"_blank",onClick:()=>{A("Click: Share",{props:{type:"image"}})},children:[r("common.image")," ",t(Qt,{width:"12",height:"12"})]}),t("div",{id:"share-image-container",children:a("div",{id:"share-image",ref:c,children:[t("p",{class:"header",children:t("b",{children:e})}),t("div",{class:"board",children:i.map(w=>t("div",{children:w.map(D=>t("span",{class:`tile ${D}`}))}))}),t("p",{class:"footer",children:o})]})})]})};function bn(){var xe;const{t:e,i18n:o}=W(),[i,l]=E(!1),[r,c]=E(!1),[g,m]=E(!1),[v,y]=E(!1),[k,I]=E(x.getItem(`${b}colorScheme`)||"auto");T(()=>{if(!be)return;const n=document.querySelector("html");k==="dark"?(n.classList.add("dark-mode"),n.classList.remove("light-mode")):k==="light"?(n.classList.add("light-mode"),n.classList.remove("dark-mode")):n.classList.remove("dark-mode","light-mode")},[k]);const[w,D]=E(x.getItem(`${b}skipFirstTime`)||!1),[u,Ke]=E(F.find(n=>n.id===location.hash.slice(1))||K());T(()=>{window.addEventListener("hashchange",()=>{Ke(F.find(n=>n.id===location.hash.slice(1))||K()),l(!1)})},[]);const[L,q]=E(((xe=JSON.parse(x.getItem(`${b}${u.id}`)))==null?void 0:xe.board)||Ne());T(()=>{const n=x.getItem(`${b}${u.id}`);q(n?JSON.parse(n).board:Ne())},[u.id]);const B=Y(()=>L.map((n,s)=>n.s?ln(u.idiom,n.v):[]),[L]);T(()=>{L&&L.some(n=>n.v.some(s=>s))&&x.setItem(`${b}${u.id}`,JSON.stringify({board:L,gameState:Be(B)}))},[B]);const[C,ke]=E(null);T(()=>{ke(null),fetch(`https://baidu-hanyu-idiom.cheeaun.workers.dev/?wd=${u.idiom}`).then(n=>n.json()).then(n=>{n.definition&&ke(n.definition)}).catch(()=>{})},[u.idiom]);const G=(L==null?void 0:L.findIndex(n=>n.s===!1))||0,[ae,J]=Y(()=>{const{keys:n}=ve(u.idiom),s=Re.filter(d=>d.split("").every($=>n.has($))),h=new Map;s.forEach(d=>{Z(d,{type:"array"}).forEach((j,P)=>{h.has(d[P])?h.get(d[P]).add(j):h.set(d[P],new Set([j]))})}),h.forEach((d,$)=>{d.add(z($))});const p=s.map(d=>`${d} (${z(d)})`).sort((d,$)=>d.localeCompare($,"zh"));return console.groupCollapsed&&(console.groupCollapsed(`${p.length} Possible Idioms [${u.id}] (${n.size} keys):`),console.log(`${p.map((d,$)=>`${$+1}. ${d}`).join(`
`)}

\u{1F6A8}SPOILER\u{1F6A8} Type 'HINTS' to see all hints. Type 'ANSWER' to see the answer.`),console.groupEnd()),window.ANSWER=`${u.idiom} (${z(u.idiom)})`,[[...n].sort((d,$)=>d.localeCompare($,"zh")),h]},[u.idiom]),le=(n,s=!1)=>{if(!L[G]||S)return;c(!1);const h=[...L];let p=h[G].v.findIndex(f=>f==="");s&&(p===-1?p=3:p--),p!==-1&&(h[G].v[p]=n,q(h))},ce=new Set,de=new Set,he=new Set;L.forEach((n,s)=>{!n.s||n.v.forEach((h,p)=>{const f=B[s][p];f==="\u{1F7E9}"?ce.add(h):f==="\u{1F7E7}"?de.add(h):f==="\u2B1C"&&he.add(h)})});const Ce=()=>{if(S)return;console.log("handleEnter"),c(!1);const n=L[G];if(!n)return;const s=n.v.join(""),h=Re.includes(s);h?(n.s=!0,q([...L])):setTimeout(()=>{c(!0)},10),console.log({currentIdiom:s,valid:h})},S=Y(()=>Be(B),[B]);T(()=>{let n;return S==="won"?n=setTimeout(()=>{m("won")},600):m(S==="lost"?"lost":!1),()=>{clearTimeout(n)}},[S]);const Ue=ie(K()),Ie=ie(!0),Se=cn();T(()=>{var s;let n;return Se&&(Ie.current||K().id!==((s=Ue.current)==null?void 0:s.id)&&/(won|lost)/i.test(S)&&(n=setTimeout(()=>{m(S)},600)),Ie.current=!1),()=>{clearTimeout(n)}},[Se,S]);const $e=()=>{if(S)return;const n=[...L],s=n[G];if(!s||s.s)return;let h=-1;for(let p=s.v.length-1;p>=0;p--)if(s.v[p]!==""){h=p;break}h!==-1&&(s.v[h]="",q(n))};T(()=>{const n=s=>{if(S||s.metaKey||s.ctrlKey||!s.key)return;const h=s.key.toLowerCase();if(h==="enter")s.preventDefault(),s.stopPropagation(),Ce();else if(h==="backspace")s.preventDefault(),$e();else if(/^arrow(left|right)/i.test(h)){const d=[...L[G].v].reverse().find($=>$!=="");if(d){const $=z(d)[0],j=new Set;J.forEach((Xe,Ye)=>{Xe.forEach(Ze=>{Ze[0].localeCompare($,"en",{sensitivity:"base"})===0&&j.add(Ye)})});const P=[...j];if(P.length<=1)return;const De=P.indexOf(d),Pe=h==="arrowright"?P[(De+1)%P.length]:P[(De+P.length-1)%P.length];Pe&&le(Pe,!0)}}else if(/[a-z]/i.test(h)){let f=!1;J.forEach((d,$)=>{f||d.forEach(j=>{if(f)return;j[0].localeCompare(h,"en",{sensitivity:"base"})===0&&(s.preventDefault(),f=!0,le($))})})}const p=document.getElementById("board");if(p==null?void 0:p.querySelector){const f=p.querySelector(`.row:nth-child(${G+1})`);(f==null?void 0:f.scrollIntoView)&&f.scrollIntoView({behavior:"smooth",block:"nearest"})}};return document.addEventListener("keydown",n),()=>{document.removeEventListener("keydown",n)}},[ae,J,L,G,S]);const ue=location.origin+location.pathname+"#"+u.id,Ve=location.host+location.pathname+"#"+u.id,Ee=B.map(n=>n.join("")).join(`
`).trim(),me=S==="won"?Ee.split(`
`).length:"X",Le=`${me}/${je}`,X=`${`${e("app.title")} [${u.id}]${R?" \u{1F525}":""} ${Le}

${Ee}`}

${Ve}`,Te=Y(()=>{const n=[],s=u.idiom.split(""),h=ae.filter(d=>!s.includes(d)&&!he.has(d)).slice(0,-1).slice(0,3).map(d=>e("hints.absentLetter",{letter:d,pinyin:z(d)})).sort(()=>Math.random()-.5);n.push(...h),(C==null?void 0:C.zh)&&s.filter(d=>C.zh.includes(d)).length<=2&&n.push(`\u2139\uFE0F ${C.zh}`),(C==null?void 0:C.en)&&n.push(`\u2139\uFE0F ${C.en}`);const p=s.filter(d=>!ce.has(d)&&!de.has(d)).slice(0,-1).map(d=>e("hints.presentLetter",{letter:d,pinyin:z(d)})).sort(()=>Math.random()-.5);n.push(...p);const f=z(u.idiom,{pattern:"first",type:"array"}).join("");return n.push(e("hints.abbreviatedPinyin",{pinyinHint:f})),window.HINTS=n,n},[u.idiom,C]),Q=ie(0);T(()=>{Q.current=0},[u.idiom]);const We=()=>{if(S)return;const n=Te[Q.current];Q.current=(Q.current+1)%Te.length,U(n)},{toasts:Fe}=mt(),qe=1;T(()=>{Fe.filter((n,s)=>n.visible&&s>=qe).forEach(n=>bt.dismiss(n.id))},[Fe]);const N=Y(()=>{if(!!v)try{return Object.keys(localStorage).filter(s=>{const h=s.startsWith(b);if(!h)return!1;const p=s.slice(b.length);return h&&F.find(f=>f.id===p)}).length}catch(n){}},[v]);T(()=>{if(!N||N<10)return;const n=N<100?1:2,s=+N.toPrecision(n);A("Games Played",{props:{count:s}})},[N]);const Je=pt(()=>a("b",{children:[N,N>=Oe&&a(O,{children:[" ","/"," ",t("a",{href:"#",onClick:n=>{n.preventDefault(),y(!1),l(!0)},children:F.length})]})]}),[N]);return a(O,{children:[t("header",{children:a("div",{class:"inner",children:[t("button",{type:"button",onClick:()=>{y(!0)},children:t(tn,{width:"16",height:"16"})}),a("span",{children:[t("h1",{children:e("app.title")}),t(Zt,{})]}),t("button",{type:"button",onClick:()=>{m(S||"play")},children:S?e("common.play"):t(nn,{width:"16",height:"16"})})]})}),t("div",{id:"board",class:`${S} ${R?"hard-mode":""}`,children:L.map((n,s)=>{const h=Z(n.v.join(""),{type:"array"});return t("div",{className:`row ${G===s&&r?"error":""} ${G===s?"current":""} ${B[s].join("")}`,children:n.v.map((p,f)=>t(oe,{letter:p,pinyin:h[f],state:B[s][f]},f))},s)})}),t("div",{id:"keyboard",class:`${S} ${R?"hard-mode":""}`,children:a("div",{class:"inner",children:[t("div",{class:"keys",children:ae.map((n,s)=>t("button",{class:`${ce.has(n)?"\u{1F7E9}":""} ${de.has(n)?"\u{1F7E7}":""} ${he.has(n)?"\u2B1C":""}`,type:"button",tabIndex:-1,onClick:()=>{dn.play(),le(n)},children:a("ruby",{children:[n,t("rp",{children:"("}),t("rt",{children:J.has(n)?[...J.get(n)].sort((h,p)=>h.localeCompare(p,"zh")).join(" \u2E31 "):z(n)}),t("rp",{children:")"})]})}))}),a("div",{class:"row",children:[t("button",{type:"button",onClick:()=>{Ce(),un.play()},tabIndex:-1,children:e("common.enter")}),R?t("b",{class:"hard",children:e("ui.hardMode")}):t("button",{type:"button",class:"stuck",onClick:We,children:e("ui.hint")}),t("button",{type:"button",onClick:()=>{$e(),hn.play()},tabIndex:-1,children:t(Xt,{width:"24",height:"24"})})]})]})}),a("div",{id:"modal",class:g?"appear":"",onClick:n=>{n.target===n.currentTarget&&m(null)},children:[t(fe,{height:"24",width:"24",class:"close",onClick:()=>{m(null)}}),a("div",{class:"content",children:[t("h2",{children:g==="won"?"\u{1F389}\u{1F389}\u{1F389}":g==="lost"?"\u{1F62D}\u{1F62D}\u{1F62D}":"\u{1F42F}\u{1F42F}\u{1F42F}"}),g==="play"&&a("p",{class:"block",children:[e("ui.idiomId")," ",t(He,{code:u.id,url:ue})]}),/(won|lost)/i.test(g)&&a(O,{children:[a("p",{class:"block",children:[t("b",{class:"answer",children:a("ruby",{children:[u.idiom,t("rp",{children:"("}),t("rt",{children:z(u.idiom)}),t("rp",{children:")"})]})}),a("div",{class:"definition",children:[(C==null?void 0:C.zh)?C.zh.split("").map(n=>z(n)===n?n:a("ruby",{children:[n,t("rp",{children:"("}),t("rt",{children:z(n)}),t("rp",{children:")"})]})):"",(C==null?void 0:C.zh)&&(C==null?void 0:C.en)&&t("br",{}),C==null?void 0:C.en]}),a("small",{children:[a("a",{href:`https://hanyu.baidu.com/s?wd=${u.idiom}&from=zici`,target:"_blank",children:["\u{1F4D6} ",e("glossary.baidu")]}),"\xA0 \xA0",a("a",{href:`https://www.zdic.net/hans/${u.idiom}`,target:"_blank",children:["\u{1F4D6} ",e("glossary.zdic")]})]})]}),t("p",{class:"block warning",children:e("ui.avoidSpoilers")}),a("div",{class:"block",children:[a("div",{children:[a("button",{id:"share",onClick:async()=>{try{if(/edge?\//i.test(navigator.userAgent)||/windows/.test(navigator.userAgent))throw new Error("Web Share API not working well here");se(X),await navigator.share({text:X})}catch(n){se(X,()=>{U(e("ui.copiedResults"))})}A("Click: Share",{props:{type:"share"}})},children:[e("common.share")," ",t(on,{width:"16",height:"16"})]}),"\xA0",t(yn,{id:u.id,header:e("app.title"),footer:`[${u.id}]${R?" \u{1F525}":""} ${Le}`,boardStates:B}),"\xA0",t("a",{class:"button facebook",href:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ue)}&hashtag=${encodeURIComponent("#chengyuwordle")}`,target:"_blank",onClick:()=>{se(X),A("Click: Share",{props:{type:"facebook"}})},children:t(en,{width:"16",height:"16"})}),"\xA0",t("a",{class:"button tweet",href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(X)}`,target:"_blank",onClick:()=>{A("Click: Share",{props:{type:"twitter"}})},children:t(sn,{width:"16",height:"16",title:e("common.tweet")})})]}),a("p",{children:[e("ui.idiomId")," ",t(He,{code:u.id,url:ue})]})]})]}),S==="won"&&me<=2&&!R&&t("p",{class:"block alert",onClick:()=>{m(null),setTimeout(()=>{y(!0)},300)},children:e("ui.easyEnableHardMode")}),g==="won"&&S==="won"&&me>=5&&_e(),a("div",{class:"block",children:[/won|lost/i.test(S)&&K().id===u.id&&t("p",{children:t("big",{children:t(_,{i18nKey:"ui.nextIdiom",components:[t(Yt,{})]})})}),a("div",{children:[K().id!==u.id&&a(O,{children:[a("a",{href:"./",class:"button strong",children:[t(ne,{width:20,height:20})," ",e("ui.playTodayGame")]}),t("br",{})]}),a("button",{type:"button",onClick:()=>{if(A("Click: Random"),confirm(e("ui.confirmRandom"))){const s=Math.round(Math.random()*(F.length-1)),h=F[s];location.hash=`#${h.id}`,m(null),A("Game load: Random")}},children:[t(ne,{width:20,height:20})," ",e("common.random")]})," ",a("button",{type:"button",onClick:()=>{A("Click: Idiom ID");let n=prompt(e("ui.promptIdiom"));try{n=new URL(n).hash.slice(1)}catch(s){}if(n){const s=F.find(h=>h.id===n);s?(location.hash=`#${s.id}`,m(null),A("Game load: Idiom ID")):U("Invalid idiom ID")}},children:[t(ne,{width:20,height:20})," ",e("common.choose")]})]})]})]})]}),a("div",{id:"info-modal",class:v||!w?"appear":"",children:[w&&t(fe,{height:"32",width:"32",class:"close",onClick:()=>{y(!1)}}),a("div",{class:"content",children:[be&&a("p",{class:"color-scheme-selector",children:[t("button",{type:"button",class:k==="dark"?"active":"",onClick:()=>{x.setItem(`${b}colorScheme`,"dark"),I("dark")},children:"\u{1F311}"})," ",t("button",{type:"button",class:k==="auto"?"active":"",onClick:()=>{x.removeItem(`${b}colorScheme`),I("auto")},children:"\u{1F313}"})," ",t("button",{type:"button",class:k==="light"?"active":"",onClick:()=>{x.setItem(`${b}colorScheme`,"light"),I("light")},children:"\u{1F315}"})]})," ",a("p",{class:"locale-selector",children:["\u{1F310}"," ",t("a",{href:"./?lng=en",hreflang:"en",rel:o.resolvedLanguage==="en"?void 0:"alternate",class:`${o.resolvedLanguage==="en"?"selected":""}`,onClick:n=>{n.preventDefault(),o.changeLanguage("en")},children:"English"})," ","\u22C5"," ",t("a",{href:"./?lng=zh-CN",hreflang:"zh-CN",rel:o.resolvedLanguage==="zh"?void 0:"alternate",class:`${o.resolvedLanguage==="zh"?"selected":""}`,onClick:n=>{n.preventDefault(),o.changeLanguage("zh-CN")},children:"\u4E2D\u6587"})]}),w&&N>0&&a("div",{id:"stats",children:[t("p",{children:t(_,{i18nKey:"ui.gamesPlayed",components:[t(Je,{})]})}),a("div",{id:"config",children:[t("p",{children:a("label",{children:[e("ui.hardMode"),t(gt,{defaultChecked:R,onChange:n=>{x.setItem(`${b}hardMode`,n?"true":"false"),setTimeout(()=>{location.reload()},310)}})]})}),t("p",{children:a("label",{children:[e("ui.soundEffects"),t(an,{class:"config-slider"})]})})]})]}),t("h2",{children:e("howToPlay.heading")}),t("p",{children:e("howToPlay.how1")}),t("p",{children:e("howToPlay.how2")}),t("p",{children:e("howToPlay.how3")}),t("div",{class:"example-idiom",children:"\u4E5D\u725B\u4E00\u6BDB".split("").map((n,s)=>t(oe,{letter:n,state:s===0?"\u{1F7E9}":""},n))}),t("p",{children:e("howToPlay.spotCorrect")}),t("div",{class:"example-idiom",children:"\u7406\u6240\u5F53\u7136".split("").map((n,s)=>t(oe,{letter:n,state:s===1?"\u{1F7E7}":""},n))}),t("p",{children:e("howToPlay.spotPresent")}),t("div",{class:"example-idiom",children:"\u7231\u4E0D\u91CA\u624B".split("").map((n,s)=>t(oe,{letter:n,state:s===2?"\u2B1C":""},n))}),t("p",{children:e("howToPlay.spotAbsent")}),t("p",{children:e("howToPlay.how4")}),w?a(O,{children:[t("h2",{children:e("about.heading")}),t("p",{children:t(_,{i18nKey:"about.about1",components:[t("a",{href:"https://github.com/cheeaun/chengyu-wordle/",target:"_blank"}),t("a",{href:"https://cheeaun.com/projects/",target:"_blank"}),t("a",{href:"https://www.nytimes.com/games/wordle/",target:"_blank"})]})}),t("p",{children:t(_,{i18nKey:"about.about2",components:[t("a",{href:"https://www.buymeacoffee.com/cheeaun",target:"_blank"})]})}),t("h2",{children:e("feedback.heading")}),a("ul",{children:[t("li",{children:t("a",{href:"https://t.me/+ykuhfiImLd1kNjk1",target:"_blank",children:e("feedback.telegramGroup")})}),t("li",{children:t(_,{i18nKey:"feedback.githubDiscussions",components:[t("a",{href:"https://github.com/cheeaun/chengyu-wordle/discussions",target:"_blank"})]})}),t("li",{children:t(_,{i18nKey:"feedback.githubIssues",components:[t("a",{href:"https://github.com/cheeaun/chengyu-wordle/issues",target:"_blank"})]})}),t("li",{children:t("a",{href:"https://twitter.com/cheeaun",target:"_blank",children:e("feedback.twitter")})}),t("li",{children:t("a",{href:"https://t.me/cheeaun",target:"_blank",children:e("feedback.telegram")})})]}),a("details",{id:"debugging-container",children:[a("summary",{children:[e("debugging.heading")," (","335c613",")"]}),a("div",{children:["Game data:"," ",t("button",{type:"button",onClick:()=>{const n=mn(),s=JSON.stringify({version:1,exportDate:new Date,data:n}),h=new TextEncoder().encode(s),p=new Blob([h],{type:"application/json;charset=utf-8"}),f=URL.createObjectURL(p),d=document.createElement("a");document.body.appendChild(d),d.style="display: none",d.href=f,d.download="chengyu-wordle.gamedata.json",d.click(),URL.revokeObjectURL(f),d.remove()},children:"Export"})," ",a("label",{class:"input-file-button",children:[t("input",{type:"file",accept:".json",onChange:n=>{if(window.FileReader){if(confirm("Are you sure you want to import?"))try{const h=n.target.files[0],p=new FileReader;p.addEventListener("load",f=>{const d=JSON.parse(f.target.result).data,$=confirm("If there are conflicting games data, override them? (Cancel to keep them)");pn(d,$)}),p.readAsText(h)}catch(s){U("Unable to import.")}}else U("Import feature is not supported by the current browser.")}}),t("button",{type:"button",children:"Import"})]})]}),t("button",{type:"button",onClick:()=>{confirm(e("debugging.confirmResetGame"))&&(x.removeItem(b+u.id),location.reload())},children:e("debugging.resetGame")}),"\xA0",t("button",{type:"button",onClick:()=>{confirm(e("debugging.confirmClearDB"))&&(clearGames(),location.reload())},children:e("debugging.clearDB")})]})]}):t("p",{children:a("button",{type:"button",class:"large",onClick:()=>{y(!1),x.setItem(b+"skipFirstTime",1),D(!0)},children:[t(ne,{width:"20",height:"20"})," ",e("ui.startPlay")]})})]})]}),i&&a("div",{id:"dashboard-modal",children:[t(fe,{height:"24",width:"24",class:"close",onClick:()=>{l(!1)}}),t(fn,{})]}),t(ft,{containerStyle:{top:"3.5em"},toastOptions:{className:"toast",style:{pointerEvents:"none"}}})]})}ge.use(wt).use(vt).init({resources:{en:{translation:At},zh:{translation:Vt}},fallbackLng:"en",debug:/localhost/i.test(location.hostname),detection:{lookupLocalStorage:"locale",lookupCookie:"locale"},interpolation:{escapeValue:!1}}).then(e=>{const o=()=>{document.documentElement.lang=ge.resolvedLanguage,document.title=document.querySelector('meta[property="og:title"]').content=e("app.title"),document.querySelector('meta[name="description"]').content=document.querySelector('meta[property="og:description"]').content=e("app.description")};ge.on("languageChanged",o),o()});kt(t(bn,{}),document.getElementById("app"));export{Cn as __vite_legacy_guard};
//# sourceMappingURL=index.a659ea33.js.map
