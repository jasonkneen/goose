import{r as a,l as c}from"./chunk-HA7DTUK3-BgcCul64.js";/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),l=(...e)=>e.filter((t,o,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===o).join(" ").trim();/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var x={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=a.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:s="",children:n,iconNode:d,...p},m)=>a.createElement("svg",{ref:m,...x,width:t,height:t,stroke:e,strokeWidth:r?Number(o)*24/Number(t):o,className:l("lucide",s),...p},[...d.map(([u,y])=>a.createElement(u,y)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=(e,t)=>{const o=a.forwardRef(({className:r,...s},n)=>a.createElement(f,{ref:n,iconNode:t,className:l(`lucide-${g(e)}`,r),...s}));return o.displayName=`${e}`,o};/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],v=i("Download",$);/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],I=i("Info",h);/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],S=i("Star",b);/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]],j=i("Terminal",C),N=({children:e,className:t="",variant:o="default"})=>{const r="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",s={default:"bg-purple-100 text-purple-800",secondary:"bg-gray-100 text-gray-800"};return c.jsx("span",{className:`${r} ${s[o]} ${t}`,children:e})},R=({children:e,className:t="",...o})=>c.jsx("div",{className:`bg-bgApp p-4 rounded-2xl border border-borderSubtle
       ${t}`,...o,children:e}),U=({children:e,className:t="",...o})=>c.jsx("div",{className:`text-[18px] leading-[24px] mb-2 ${t}`,...o,children:e}),q=({children:e,className:t="",...o})=>c.jsx("div",{className:`${t}`,...o,children:e});function L(e){if(e.is_builtin)return`goose://extension?${["cmd=goosed","arg=mcp",`arg=${encodeURIComponent(e.id)}`,`description=${encodeURIComponent(e.id)}`].join("&")}`;const t=e.command.split(" "),o=t[0],r=t.slice(1);return`goose://extension?${[`cmd=${encodeURIComponent(o)}`,...r.map(n=>`arg=${encodeURIComponent(n)}`),`id=${encodeURIComponent(e.id)}`,`name=${encodeURIComponent(e.name)}`,`description=${encodeURIComponent(e.description)}`,...e.environmentVariables.filter(n=>n.required).map(n=>`env=${encodeURIComponent(`${n.name}=${n.description}`)}`)].join("&")}`}async function w(){try{const t=await fetch("https://block.github.io/goose/v1/extensions/servers.json");if(!t.ok)throw new Error(`Failed to fetch servers: ${t.status} ${t.statusText}`);const o=await t.text();return JSON.parse(o).sort((s,n)=>n.githubStars-s.githubStars)}catch(e){throw console.error("Error fetching servers:",e),e}}async function _(e){const t=await w(),o=e.toLowerCase().split(" ").filter(r=>r.length>0);return t.filter(r=>{const s=`${r.name} ${r.description}`.toLowerCase();return o.every(n=>s.includes(n))})}export{N as B,R as C,v as D,I,S,j as T,U as a,q as b,i as c,w as f,L as g,_ as s};
