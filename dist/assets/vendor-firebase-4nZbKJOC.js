var cc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kl=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},qm=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],u=r[t++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|u&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Ql={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,u=o?r[s+1]:0,c=s+2<r.length,h=c?r[s+2]:0,f=i>>2,m=(i&3)<<4|u>>4;let g=(u&15)<<2|h>>6,w=h&63;c||(w=64,o||(g=64)),n.push(t[f],t[m],t[g],t[w])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Kl(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):qm(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],u=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const m=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||u==null||h==null||m==null)throw new jm;const g=i<<2|u>>4;if(n.push(g),h!==64){const w=u<<4&240|h>>2;if(n.push(w),m!==64){const C=h<<6&192|m;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class jm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $m=function(r){const e=Kl(r);return Ql.encodeByteArray(e,!0)},Ys=function(r){return $m(r).replace(/\./g,"")},zm=function(r){try{return Ql.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gm(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Km=()=>Gm().__FIREBASE_DEFAULTS__,Qm=()=>{if(typeof process>"u"||typeof cc>"u")return;const r=cc.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Wm=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&zm(r[1]);return e&&JSON.parse(e)},gi=()=>{try{return Km()||Qm()||Wm()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Hm=r=>{var e,t;return(t=(e=gi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},Wl=r=>{const e=Hm(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Hl=()=>{var r;return(r=gi())===null||r===void 0?void 0:r.config},Qw=r=>{var e;return(e=gi())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jl(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},r);return[Ys(JSON.stringify(t)),Ys(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mn(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ww(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Mn())}function Ym(){var r;const e=(r=gi())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Hw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Xm(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Jw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Yw(){const r=Mn();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Yl(){return!Ym()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ea(){try{return typeof indexedDB=="object"}catch{return!1}}function Xl(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}function Zm(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep="FirebaseError";class ht extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=ep,Object.setPrototypeOf(this,ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_i.prototype.create)}}class _i{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?tp(i,n):"Error",u=`${this.serviceName}: ${o} (${s}).`;return new ht(s,u,n)}}function tp(r,e){return r.replace(np,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const np=/\{\$([^}]+)}/g;function Xw(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Vt(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(lc(i)&&lc(o)){if(!Vt(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function lc(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zw(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function ev(r,e){const t=new rp(r,e);return t.subscribe.bind(t)}class rp{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");sp(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=fo),s.error===void 0&&(s.error=fo),s.complete===void 0&&(s.complete=fo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function sp(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function fo(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip=1e3,op=2,ap=14400*1e3,up=.5;function hc(r,e=ip,t=op){const n=e*Math.pow(t,r),s=Math.round(up*n*(Math.random()-.5)*2);return Math.min(ap,n+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(r){return r&&r._delegate?r._delegate:r}class Ze{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cp{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Jm;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(hp(e))try{this.getOrInitializeService({instanceIdentifier:Xt})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=Xt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xt){return this.instances.has(e)}getOptions(e=Xt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);n===u&&o.resolve(s)}return s}onInit(e,t){var n;const s=this.normalizeInstanceIdentifier(t),i=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:lp(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Xt){return this.component?this.component.multipleInstances?e:Xt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function lp(r){return r===Xt?void 0:r}function hp(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dp{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new cp(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(X||(X={}));const fp={debug:X.DEBUG,verbose:X.VERBOSE,info:X.INFO,warn:X.WARN,error:X.ERROR,silent:X.SILENT},mp=X.INFO,pp={[X.DEBUG]:"log",[X.VERBOSE]:"log",[X.INFO]:"info",[X.WARN]:"warn",[X.ERROR]:"error"},gp=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=pp[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ta{constructor(e){this.name=e,this._logLevel=mp,this._logHandler=gp,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in X))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?fp[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,X.DEBUG,...e),this._logHandler(this,X.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,X.VERBOSE,...e),this._logHandler(this,X.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,X.INFO,...e),this._logHandler(this,X.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,X.WARN,...e),this._logHandler(this,X.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,X.ERROR,...e),this._logHandler(this,X.ERROR,...e)}}const _p=(r,e)=>e.some(t=>r instanceof t);let dc,fc;function yp(){return dc||(dc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ip(){return fc||(fc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Zl=new WeakMap,So=new WeakMap,eh=new WeakMap,mo=new WeakMap,na=new WeakMap;function Tp(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",o)},i=()=>{t(Pt(r.result)),s()},o=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Zl.set(t,r)}).catch(()=>{}),na.set(e,r),e}function Ep(r){if(So.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",o),r.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",o),r.addEventListener("abort",o)});So.set(r,e)}let Vo={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return So.get(r);if(e==="objectStoreNames")return r.objectStoreNames||eh.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Pt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function wp(r){Vo=r(Vo)}function vp(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(po(this),e,...t);return eh.set(n,e.sort?e.sort():[e]),Pt(n)}:Ip().includes(r)?function(...e){return r.apply(po(this),e),Pt(Zl.get(this))}:function(...e){return Pt(r.apply(po(this),e))}}function Ap(r){return typeof r=="function"?vp(r):(r instanceof IDBTransaction&&Ep(r),_p(r,yp())?new Proxy(r,Vo):r)}function Pt(r){if(r instanceof IDBRequest)return Tp(r);if(mo.has(r))return mo.get(r);const e=Ap(r);return e!==r&&(mo.set(r,e),na.set(e,r)),e}const po=r=>na.get(r);function th(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const o=indexedDB.open(r,e),u=Pt(o);return n&&o.addEventListener("upgradeneeded",c=>{n(Pt(o.result),c.oldVersion,c.newVersion,Pt(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),u}const bp=["get","getKey","getAll","getAllKeys","count"],Rp=["put","add","delete","clear"],go=new Map;function mc(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(go.get(e))return go.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=Rp.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||bp.includes(t)))return;const i=async function(o,...u){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return n&&(h=h.index(u.shift())),(await Promise.all([h[t](...u),s&&c.done]))[0]};return go.set(e,i),i}wp(r=>({...r,get:(e,t,n)=>mc(e,t)||r.get(e,t,n),has:(e,t)=>!!mc(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Sp(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Sp(r){const e=r.getComponent();return e?.type==="VERSION"}const Co="@firebase/app",pc="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at=new ta("@firebase/app"),Vp="@firebase/app-compat",Cp="@firebase/analytics-compat",Dp="@firebase/analytics",xp="@firebase/app-check-compat",kp="@firebase/app-check",Np="@firebase/auth",Op="@firebase/auth-compat",Mp="@firebase/database",Fp="@firebase/data-connect",Lp="@firebase/database-compat",Bp="@firebase/functions",Up="@firebase/functions-compat",qp="@firebase/installations",jp="@firebase/installations-compat",$p="@firebase/messaging",zp="@firebase/messaging-compat",Gp="@firebase/performance",Kp="@firebase/performance-compat",Qp="@firebase/remote-config",Wp="@firebase/remote-config-compat",Hp="@firebase/storage",Jp="@firebase/storage-compat",Yp="@firebase/firestore",Xp="@firebase/vertexai-preview",Zp="@firebase/firestore-compat",eg="firebase",tg="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xs="[DEFAULT]",ng={[Co]:"fire-core",[Vp]:"fire-core-compat",[Dp]:"fire-analytics",[Cp]:"fire-analytics-compat",[kp]:"fire-app-check",[xp]:"fire-app-check-compat",[Np]:"fire-auth",[Op]:"fire-auth-compat",[Mp]:"fire-rtdb",[Fp]:"fire-data-connect",[Lp]:"fire-rtdb-compat",[Bp]:"fire-fn",[Up]:"fire-fn-compat",[qp]:"fire-iid",[jp]:"fire-iid-compat",[$p]:"fire-fcm",[zp]:"fire-fcm-compat",[Gp]:"fire-perf",[Kp]:"fire-perf-compat",[Qp]:"fire-rc",[Wp]:"fire-rc-compat",[Hp]:"fire-gcs",[Jp]:"fire-gcs-compat",[Yp]:"fire-fst",[Zp]:"fire-fst-compat",[Xp]:"fire-vertex","fire-js":"fire-js",[eg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r=new Map,rg=new Map,Do=new Map;function gc(r,e){try{r.container.addComponent(e)}catch(t){at.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function ut(r){const e=r.name;if(Do.has(e))return at.debug(`There were multiple attempts to register component ${e}.`),!1;Do.set(e,r);for(const t of $r.values())gc(t,r);for(const t of rg.values())gc(t,r);return!0}function Bt(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function sg(r,e,t=Xs){Bt(r,e).clearInstance(t)}function tv(r){return r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ig={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},St=new _i("app","Firebase",ig);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class og{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Ze("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw St.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh=tg;function ag(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:Xs,automaticDataCollectionEnabled:!1},e),s=n.name;if(typeof s!="string"||!s)throw St.create("bad-app-name",{appName:String(s)});if(t||(t=Hl()),!t)throw St.create("no-options");const i=$r.get(s);if(i){if(Vt(t,i.options)&&Vt(n,i.config))return i;throw St.create("duplicate-app",{appName:s})}const o=new dp(s);for(const c of Do.values())o.addComponent(c);const u=new og(t,n,o);return $r.set(s,u),u}function ra(r=Xs){const e=$r.get(r);if(!e&&r===Xs&&Hl())return ag();if(!e)throw St.create("no-app",{appName:r});return e}function nv(){return Array.from($r.values())}function Ge(r,e,t){var n;let s=(n=ng[r])!==null&&n!==void 0?n:r;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const u=[`Unable to register library "${s}" with version "${e}":`];i&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&u.push("and"),o&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),at.warn(u.join(" "));return}ut(new Ze(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug="firebase-heartbeat-database",cg=1,zr="firebase-heartbeat-store";let _o=null;function rh(){return _o||(_o=th(ug,cg,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(zr)}catch(t){console.warn(t)}}}}).catch(r=>{throw St.create("idb-open",{originalErrorMessage:r.message})})),_o}async function lg(r){try{const t=(await rh()).transaction(zr),n=await t.objectStore(zr).get(sh(r));return await t.done,n}catch(e){if(e instanceof ht)at.warn(e.message);else{const t=St.create("idb-get",{originalErrorMessage:e?.message});at.warn(t.message)}}}async function _c(r,e){try{const n=(await rh()).transaction(zr,"readwrite");await n.objectStore(zr).put(e,sh(r)),await n.done}catch(t){if(t instanceof ht)at.warn(t.message);else{const n=St.create("idb-set",{originalErrorMessage:t?.message});at.warn(n.message)}}}function sh(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hg=1024,dg=720*60*60*1e3;class fg{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new pg(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=yc();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const u=new Date(o.date).valueOf();return Date.now()-u<=dg}),this._storage.overwrite(this._heartbeatsCache))}catch(n){at.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=yc(),{heartbeatsToSend:n,unsentEntries:s}=mg(this._heartbeatsCache.heartbeats),i=Ys(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return at.warn(t),""}}}function yc(){return new Date().toISOString().substring(0,10)}function mg(r,e=hg){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Ic(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ic(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class pg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ea()?Xl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await lg(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return _c(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return _c(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ic(r){return Ys(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(r){ut(new Ze("platform-logger",e=>new Pp(e),"PRIVATE")),ut(new Ze("heartbeat",e=>new fg(e),"PRIVATE")),Ge(Co,pc,r),Ge(Co,pc,"esm2017"),Ge("fire-js","")}gg("");var _g="firebase",yg="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ge(_g,yg,"app");var Tc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var on,ih;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,_){function I(){}I.prototype=_.prototype,T.D=_.prototype,T.prototype=new I,T.prototype.constructor=T,T.C=function(E,v,R){for(var y=Array(arguments.length-2),rt=2;rt<arguments.length;rt++)y[rt-2]=arguments[rt];return _.prototype[v].apply(E,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,_,I){I||(I=0);var E=Array(16);if(typeof _=="string")for(var v=0;16>v;++v)E[v]=_.charCodeAt(I++)|_.charCodeAt(I++)<<8|_.charCodeAt(I++)<<16|_.charCodeAt(I++)<<24;else for(v=0;16>v;++v)E[v]=_[I++]|_[I++]<<8|_[I++]<<16|_[I++]<<24;_=T.g[0],I=T.g[1],v=T.g[2];var R=T.g[3],y=_+(R^I&(v^R))+E[0]+3614090360&4294967295;_=I+(y<<7&4294967295|y>>>25),y=R+(v^_&(I^v))+E[1]+3905402710&4294967295,R=_+(y<<12&4294967295|y>>>20),y=v+(I^R&(_^I))+E[2]+606105819&4294967295,v=R+(y<<17&4294967295|y>>>15),y=I+(_^v&(R^_))+E[3]+3250441966&4294967295,I=v+(y<<22&4294967295|y>>>10),y=_+(R^I&(v^R))+E[4]+4118548399&4294967295,_=I+(y<<7&4294967295|y>>>25),y=R+(v^_&(I^v))+E[5]+1200080426&4294967295,R=_+(y<<12&4294967295|y>>>20),y=v+(I^R&(_^I))+E[6]+2821735955&4294967295,v=R+(y<<17&4294967295|y>>>15),y=I+(_^v&(R^_))+E[7]+4249261313&4294967295,I=v+(y<<22&4294967295|y>>>10),y=_+(R^I&(v^R))+E[8]+1770035416&4294967295,_=I+(y<<7&4294967295|y>>>25),y=R+(v^_&(I^v))+E[9]+2336552879&4294967295,R=_+(y<<12&4294967295|y>>>20),y=v+(I^R&(_^I))+E[10]+4294925233&4294967295,v=R+(y<<17&4294967295|y>>>15),y=I+(_^v&(R^_))+E[11]+2304563134&4294967295,I=v+(y<<22&4294967295|y>>>10),y=_+(R^I&(v^R))+E[12]+1804603682&4294967295,_=I+(y<<7&4294967295|y>>>25),y=R+(v^_&(I^v))+E[13]+4254626195&4294967295,R=_+(y<<12&4294967295|y>>>20),y=v+(I^R&(_^I))+E[14]+2792965006&4294967295,v=R+(y<<17&4294967295|y>>>15),y=I+(_^v&(R^_))+E[15]+1236535329&4294967295,I=v+(y<<22&4294967295|y>>>10),y=_+(v^R&(I^v))+E[1]+4129170786&4294967295,_=I+(y<<5&4294967295|y>>>27),y=R+(I^v&(_^I))+E[6]+3225465664&4294967295,R=_+(y<<9&4294967295|y>>>23),y=v+(_^I&(R^_))+E[11]+643717713&4294967295,v=R+(y<<14&4294967295|y>>>18),y=I+(R^_&(v^R))+E[0]+3921069994&4294967295,I=v+(y<<20&4294967295|y>>>12),y=_+(v^R&(I^v))+E[5]+3593408605&4294967295,_=I+(y<<5&4294967295|y>>>27),y=R+(I^v&(_^I))+E[10]+38016083&4294967295,R=_+(y<<9&4294967295|y>>>23),y=v+(_^I&(R^_))+E[15]+3634488961&4294967295,v=R+(y<<14&4294967295|y>>>18),y=I+(R^_&(v^R))+E[4]+3889429448&4294967295,I=v+(y<<20&4294967295|y>>>12),y=_+(v^R&(I^v))+E[9]+568446438&4294967295,_=I+(y<<5&4294967295|y>>>27),y=R+(I^v&(_^I))+E[14]+3275163606&4294967295,R=_+(y<<9&4294967295|y>>>23),y=v+(_^I&(R^_))+E[3]+4107603335&4294967295,v=R+(y<<14&4294967295|y>>>18),y=I+(R^_&(v^R))+E[8]+1163531501&4294967295,I=v+(y<<20&4294967295|y>>>12),y=_+(v^R&(I^v))+E[13]+2850285829&4294967295,_=I+(y<<5&4294967295|y>>>27),y=R+(I^v&(_^I))+E[2]+4243563512&4294967295,R=_+(y<<9&4294967295|y>>>23),y=v+(_^I&(R^_))+E[7]+1735328473&4294967295,v=R+(y<<14&4294967295|y>>>18),y=I+(R^_&(v^R))+E[12]+2368359562&4294967295,I=v+(y<<20&4294967295|y>>>12),y=_+(I^v^R)+E[5]+4294588738&4294967295,_=I+(y<<4&4294967295|y>>>28),y=R+(_^I^v)+E[8]+2272392833&4294967295,R=_+(y<<11&4294967295|y>>>21),y=v+(R^_^I)+E[11]+1839030562&4294967295,v=R+(y<<16&4294967295|y>>>16),y=I+(v^R^_)+E[14]+4259657740&4294967295,I=v+(y<<23&4294967295|y>>>9),y=_+(I^v^R)+E[1]+2763975236&4294967295,_=I+(y<<4&4294967295|y>>>28),y=R+(_^I^v)+E[4]+1272893353&4294967295,R=_+(y<<11&4294967295|y>>>21),y=v+(R^_^I)+E[7]+4139469664&4294967295,v=R+(y<<16&4294967295|y>>>16),y=I+(v^R^_)+E[10]+3200236656&4294967295,I=v+(y<<23&4294967295|y>>>9),y=_+(I^v^R)+E[13]+681279174&4294967295,_=I+(y<<4&4294967295|y>>>28),y=R+(_^I^v)+E[0]+3936430074&4294967295,R=_+(y<<11&4294967295|y>>>21),y=v+(R^_^I)+E[3]+3572445317&4294967295,v=R+(y<<16&4294967295|y>>>16),y=I+(v^R^_)+E[6]+76029189&4294967295,I=v+(y<<23&4294967295|y>>>9),y=_+(I^v^R)+E[9]+3654602809&4294967295,_=I+(y<<4&4294967295|y>>>28),y=R+(_^I^v)+E[12]+3873151461&4294967295,R=_+(y<<11&4294967295|y>>>21),y=v+(R^_^I)+E[15]+530742520&4294967295,v=R+(y<<16&4294967295|y>>>16),y=I+(v^R^_)+E[2]+3299628645&4294967295,I=v+(y<<23&4294967295|y>>>9),y=_+(v^(I|~R))+E[0]+4096336452&4294967295,_=I+(y<<6&4294967295|y>>>26),y=R+(I^(_|~v))+E[7]+1126891415&4294967295,R=_+(y<<10&4294967295|y>>>22),y=v+(_^(R|~I))+E[14]+2878612391&4294967295,v=R+(y<<15&4294967295|y>>>17),y=I+(R^(v|~_))+E[5]+4237533241&4294967295,I=v+(y<<21&4294967295|y>>>11),y=_+(v^(I|~R))+E[12]+1700485571&4294967295,_=I+(y<<6&4294967295|y>>>26),y=R+(I^(_|~v))+E[3]+2399980690&4294967295,R=_+(y<<10&4294967295|y>>>22),y=v+(_^(R|~I))+E[10]+4293915773&4294967295,v=R+(y<<15&4294967295|y>>>17),y=I+(R^(v|~_))+E[1]+2240044497&4294967295,I=v+(y<<21&4294967295|y>>>11),y=_+(v^(I|~R))+E[8]+1873313359&4294967295,_=I+(y<<6&4294967295|y>>>26),y=R+(I^(_|~v))+E[15]+4264355552&4294967295,R=_+(y<<10&4294967295|y>>>22),y=v+(_^(R|~I))+E[6]+2734768916&4294967295,v=R+(y<<15&4294967295|y>>>17),y=I+(R^(v|~_))+E[13]+1309151649&4294967295,I=v+(y<<21&4294967295|y>>>11),y=_+(v^(I|~R))+E[4]+4149444226&4294967295,_=I+(y<<6&4294967295|y>>>26),y=R+(I^(_|~v))+E[11]+3174756917&4294967295,R=_+(y<<10&4294967295|y>>>22),y=v+(_^(R|~I))+E[2]+718787259&4294967295,v=R+(y<<15&4294967295|y>>>17),y=I+(R^(v|~_))+E[9]+3951481745&4294967295,T.g[0]=T.g[0]+_&4294967295,T.g[1]=T.g[1]+(v+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+v&4294967295,T.g[3]=T.g[3]+R&4294967295}n.prototype.u=function(T,_){_===void 0&&(_=T.length);for(var I=_-this.blockSize,E=this.B,v=this.h,R=0;R<_;){if(v==0)for(;R<=I;)s(this,T,R),R+=this.blockSize;if(typeof T=="string"){for(;R<_;)if(E[v++]=T.charCodeAt(R++),v==this.blockSize){s(this,E),v=0;break}}else for(;R<_;)if(E[v++]=T[R++],v==this.blockSize){s(this,E),v=0;break}}this.h=v,this.o+=_},n.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var _=1;_<T.length-8;++_)T[_]=0;var I=8*this.o;for(_=T.length-8;_<T.length;++_)T[_]=I&255,I/=256;for(this.u(T),T=Array(16),_=I=0;4>_;++_)for(var E=0;32>E;E+=8)T[I++]=this.g[_]>>>E&255;return T};function i(T,_){var I=u;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=_(T)}function o(T,_){this.h=_;for(var I=[],E=!0,v=T.length-1;0<=v;v--){var R=T[v]|0;E&&R==_||(I[v]=R,E=!1)}this.g=I}var u={};function c(T){return-128<=T&&128>T?i(T,function(_){return new o([_|0],0>_?-1:0)}):new o([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return m;if(0>T)return V(h(-T));for(var _=[],I=1,E=0;T>=I;E++)_[E]=T/I|0,I*=4294967296;return new o(_,0)}function f(T,_){if(T.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(T.charAt(0)=="-")return V(f(T.substring(1),_));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=h(Math.pow(_,8)),E=m,v=0;v<T.length;v+=8){var R=Math.min(8,T.length-v),y=parseInt(T.substring(v,v+R),_);8>R?(R=h(Math.pow(_,R)),E=E.j(R).add(h(y))):(E=E.j(I),E=E.add(h(y)))}return E}var m=c(0),g=c(1),w=c(16777216);r=o.prototype,r.m=function(){if(x(this))return-V(this).m();for(var T=0,_=1,I=0;I<this.g.length;I++){var E=this.i(I);T+=(0<=E?E:4294967296+E)*_,_*=4294967296}return T},r.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(x(this))return"-"+V(this).toString(T);for(var _=h(Math.pow(T,6)),I=this,E="";;){var v=$(I,_).g;I=U(I,v.j(_));var R=((0<I.g.length?I.g[0]:I.h)>>>0).toString(T);if(I=v,C(I))return R+E;for(;6>R.length;)R="0"+R;E=R+E}},r.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(var _=0;_<T.g.length;_++)if(T.g[_]!=0)return!1;return!0}function x(T){return T.h==-1}r.l=function(T){return T=U(this,T),x(T)?-1:C(T)?0:1};function V(T){for(var _=T.g.length,I=[],E=0;E<_;E++)I[E]=~T.g[E];return new o(I,~T.h).add(g)}r.abs=function(){return x(this)?V(this):this},r.add=function(T){for(var _=Math.max(this.g.length,T.g.length),I=[],E=0,v=0;v<=_;v++){var R=E+(this.i(v)&65535)+(T.i(v)&65535),y=(R>>>16)+(this.i(v)>>>16)+(T.i(v)>>>16);E=y>>>16,R&=65535,y&=65535,I[v]=y<<16|R}return new o(I,I[I.length-1]&-2147483648?-1:0)};function U(T,_){return T.add(V(_))}r.j=function(T){if(C(this)||C(T))return m;if(x(this))return x(T)?V(this).j(V(T)):V(V(this).j(T));if(x(T))return V(this.j(V(T)));if(0>this.l(w)&&0>T.l(w))return h(this.m()*T.m());for(var _=this.g.length+T.g.length,I=[],E=0;E<2*_;E++)I[E]=0;for(E=0;E<this.g.length;E++)for(var v=0;v<T.g.length;v++){var R=this.i(E)>>>16,y=this.i(E)&65535,rt=T.i(v)>>>16,lr=T.i(v)&65535;I[2*E+2*v]+=y*lr,j(I,2*E+2*v),I[2*E+2*v+1]+=R*lr,j(I,2*E+2*v+1),I[2*E+2*v+1]+=y*rt,j(I,2*E+2*v+1),I[2*E+2*v+2]+=R*rt,j(I,2*E+2*v+2)}for(E=0;E<_;E++)I[E]=I[2*E+1]<<16|I[2*E];for(E=_;E<2*_;E++)I[E]=0;return new o(I,0)};function j(T,_){for(;(T[_]&65535)!=T[_];)T[_+1]+=T[_]>>>16,T[_]&=65535,_++}function L(T,_){this.g=T,this.h=_}function $(T,_){if(C(_))throw Error("division by zero");if(C(T))return new L(m,m);if(x(T))return _=$(V(T),_),new L(V(_.g),V(_.h));if(x(_))return _=$(T,V(_)),new L(V(_.g),_.h);if(30<T.g.length){if(x(T)||x(_))throw Error("slowDivide_ only works with positive integers.");for(var I=g,E=_;0>=E.l(T);)I=J(I),E=J(E);var v=G(I,1),R=G(E,1);for(E=G(E,2),I=G(I,2);!C(E);){var y=R.add(E);0>=y.l(T)&&(v=v.add(I),R=y),E=G(E,1),I=G(I,1)}return _=U(T,v.j(_)),new L(v,_)}for(v=m;0<=T.l(_);){for(I=Math.max(1,Math.floor(T.m()/_.m())),E=Math.ceil(Math.log(I)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),R=h(I),y=R.j(_);x(y)||0<y.l(T);)I-=E,R=h(I),y=R.j(_);C(R)&&(R=g),v=v.add(R),T=U(T,y)}return new L(v,T)}r.A=function(T){return $(this,T).h},r.and=function(T){for(var _=Math.max(this.g.length,T.g.length),I=[],E=0;E<_;E++)I[E]=this.i(E)&T.i(E);return new o(I,this.h&T.h)},r.or=function(T){for(var _=Math.max(this.g.length,T.g.length),I=[],E=0;E<_;E++)I[E]=this.i(E)|T.i(E);return new o(I,this.h|T.h)},r.xor=function(T){for(var _=Math.max(this.g.length,T.g.length),I=[],E=0;E<_;E++)I[E]=this.i(E)^T.i(E);return new o(I,this.h^T.h)};function J(T){for(var _=T.g.length+1,I=[],E=0;E<_;E++)I[E]=T.i(E)<<1|T.i(E-1)>>>31;return new o(I,T.h)}function G(T,_){var I=_>>5;_%=32;for(var E=T.g.length-I,v=[],R=0;R<E;R++)v[R]=0<_?T.i(R+I)>>>_|T.i(R+I+1)<<32-_:T.i(R+I);return new o(v,T.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,ih=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,on=o}).apply(typeof Tc<"u"?Tc:typeof self<"u"?self:typeof window<"u"?window:{});var Os=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var oh,xr,ah,$s,xo,uh,ch,lh;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,d){return a==Array.prototype||a==Object.prototype||(a[l]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Os=="object"&&Os];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var b=a[p];if(!(b in d))break e;d=d[b]}a=a[a.length-1],p=d[a],l=l(p),l!=p&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}function i(a,l){a instanceof String&&(a+="");var d=0,p=!1,b={next:function(){if(!p&&d<a.length){var S=d++;return{value:l(S,a[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}s("Array.prototype.values",function(a){return a||function(){return i(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},u=this||self;function c(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function h(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,d){return a.call.apply(a.bind,arguments)}function m(a,l,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,p),a.apply(l,b)}}return function(){return a.apply(l,arguments)}}function g(a,l,d){return g=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,g.apply(null,arguments)}function w(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function C(a,l){function d(){}d.prototype=l.prototype,a.aa=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,b,S){for(var O=Array(arguments.length-2),re=2;re<arguments.length;re++)O[re-2]=arguments[re];return l.prototype[b].apply(p,O)}}function x(a){const l=a.length;if(0<l){const d=Array(l);for(let p=0;p<l;p++)d[p]=a[p];return d}return[]}function V(a,l){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(c(p)){const b=a.length||0,S=p.length||0;a.length=b+S;for(let O=0;O<S;O++)a[b+O]=p[O]}else a.push(p)}}class U{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function j(a){return/^[\s\xa0]*$/.test(a)}function L(){var a=u.navigator;return a&&(a=a.userAgent)?a:""}function $(a){return $[" "](a),a}$[" "]=function(){};var J=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function G(a,l,d){for(const p in a)l.call(d,a[p],p,a)}function T(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function _(a){const l={};for(const d in a)l[d]=a[d];return l}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,l){let d,p;for(let b=1;b<arguments.length;b++){p=arguments[b];for(d in p)a[d]=p[d];for(let S=0;S<I.length;S++)d=I[S],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function v(a){var l=1;a=a.split(":");const d=[];for(;0<l&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function R(a){u.setTimeout(()=>{throw a},0)}function y(){var a=ji;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class rt{constructor(){this.h=this.g=null}add(l,d){const p=lr.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var lr=new U(()=>new om,a=>a.reset());class om{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let hr,dr=!1,ji=new rt,cu=()=>{const a=u.Promise.resolve(void 0);hr=()=>{a.then(am)}};var am=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){R(d)}var l=lr;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}dr=!1};function gt(){this.s=this.s,this.C=this.C}gt.prototype.s=!1,gt.prototype.ma=function(){this.s||(this.s=!0,this.N())},gt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Pe(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}Pe.prototype.h=function(){this.defaultPrevented=!0};var um=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};u.addEventListener("test",d,l),u.removeEventListener("test",d,l)}catch{}return a})();function fr(a,l){if(Pe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(J){e:{try{$(l.nodeName);var b=!0;break e}catch{}b=!1}b||(l=null)}}else d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:cm[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&fr.aa.h.call(this)}}C(fr,Pe);var cm={2:"touch",3:"pen",4:"mouse"};fr.prototype.h=function(){fr.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var gs="closure_listenable_"+(1e6*Math.random()|0),lm=0;function hm(a,l,d,p,b){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=b,this.key=++lm,this.da=this.fa=!1}function _s(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ys(a){this.src=a,this.g={},this.h=0}ys.prototype.add=function(a,l,d,p,b){var S=a.toString();a=this.g[S],a||(a=this.g[S]=[],this.h++);var O=zi(a,l,p,b);return-1<O?(l=a[O],d||(l.fa=!1)):(l=new hm(l,this.src,S,!!p,b),l.fa=d,a.push(l)),l};function $i(a,l){var d=l.type;if(d in a.g){var p=a.g[d],b=Array.prototype.indexOf.call(p,l,void 0),S;(S=0<=b)&&Array.prototype.splice.call(p,b,1),S&&(_s(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function zi(a,l,d,p){for(var b=0;b<a.length;++b){var S=a[b];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==p)return b}return-1}var Gi="closure_lm_"+(1e6*Math.random()|0),Ki={};function lu(a,l,d,p,b){if(Array.isArray(l)){for(var S=0;S<l.length;S++)lu(a,l[S],d,p,b);return null}return d=fu(d),a&&a[gs]?a.K(l,d,h(p)?!!p.capture:!1,b):dm(a,l,d,!1,p,b)}function dm(a,l,d,p,b,S){if(!l)throw Error("Invalid event type");var O=h(b)?!!b.capture:!!b,re=Wi(a);if(re||(a[Gi]=re=new ys(a)),d=re.add(l,d,p,O,S),d.proxy)return d;if(p=fm(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)um||(b=O),b===void 0&&(b=!1),a.addEventListener(l.toString(),p,b);else if(a.attachEvent)a.attachEvent(du(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function fm(){function a(d){return l.call(a.src,a.listener,d)}const l=mm;return a}function hu(a,l,d,p,b){if(Array.isArray(l))for(var S=0;S<l.length;S++)hu(a,l[S],d,p,b);else p=h(p)?!!p.capture:!!p,d=fu(d),a&&a[gs]?(a=a.i,l=String(l).toString(),l in a.g&&(S=a.g[l],d=zi(S,d,p,b),-1<d&&(_s(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete a.g[l],a.h--)))):a&&(a=Wi(a))&&(l=a.g[l.toString()],a=-1,l&&(a=zi(l,d,p,b)),(d=-1<a?l[a]:null)&&Qi(d))}function Qi(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[gs])$i(l.i,a);else{var d=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(d,p,a.capture):l.detachEvent?l.detachEvent(du(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=Wi(l))?($i(d,a),d.h==0&&(d.src=null,l[Gi]=null)):_s(a)}}}function du(a){return a in Ki?Ki[a]:Ki[a]="on"+a}function mm(a,l){if(a.da)a=!0;else{l=new fr(l,this);var d=a.listener,p=a.ha||a.src;a.fa&&Qi(a),a=d.call(p,l)}return a}function Wi(a){return a=a[Gi],a instanceof ys?a:null}var Hi="__closure_events_fn_"+(1e9*Math.random()>>>0);function fu(a){return typeof a=="function"?a:(a[Hi]||(a[Hi]=function(l){return a.handleEvent(l)}),a[Hi])}function Se(){gt.call(this),this.i=new ys(this),this.M=this,this.F=null}C(Se,gt),Se.prototype[gs]=!0,Se.prototype.removeEventListener=function(a,l,d,p){hu(this,a,l,d,p)};function Oe(a,l){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new Pe(l,a);else if(l instanceof Pe)l.target=l.target||a;else{var b=l;l=new Pe(p,a),E(l,b)}if(b=!0,d)for(var S=d.length-1;0<=S;S--){var O=l.g=d[S];b=Is(O,p,!0,l)&&b}if(O=l.g=a,b=Is(O,p,!0,l)&&b,b=Is(O,p,!1,l)&&b,d)for(S=0;S<d.length;S++)O=l.g=d[S],b=Is(O,p,!1,l)&&b}Se.prototype.N=function(){if(Se.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var d=a.g[l],p=0;p<d.length;p++)_s(d[p]);delete a.g[l],a.h--}}this.F=null},Se.prototype.K=function(a,l,d,p){return this.i.add(String(a),l,!1,d,p)},Se.prototype.L=function(a,l,d,p){return this.i.add(String(a),l,!0,d,p)};function Is(a,l,d,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var b=!0,S=0;S<l.length;++S){var O=l[S];if(O&&!O.da&&O.capture==d){var re=O.listener,Ae=O.ha||O.src;O.fa&&$i(a.i,O),b=re.call(Ae,p)!==!1&&b}}return b&&!p.defaultPrevented}function mu(a,l,d){if(typeof a=="function")d&&(a=g(a,d));else if(a&&typeof a.handleEvent=="function")a=g(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(a,l||0)}function pu(a){a.g=mu(()=>{a.g=null,a.i&&(a.i=!1,pu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class pm extends gt{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:pu(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function mr(a){gt.call(this),this.h=a,this.g={}}C(mr,gt);var gu=[];function _u(a){G(a.g,function(l,d){this.g.hasOwnProperty(d)&&Qi(l)},a),a.g={}}mr.prototype.N=function(){mr.aa.N.call(this),_u(this)},mr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ji=u.JSON.stringify,gm=u.JSON.parse,_m=class{stringify(a){return u.JSON.stringify(a,void 0)}parse(a){return u.JSON.parse(a,void 0)}};function Yi(){}Yi.prototype.h=null;function yu(a){return a.h||(a.h=a.i())}function Iu(){}var pr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Xi(){Pe.call(this,"d")}C(Xi,Pe);function Zi(){Pe.call(this,"c")}C(Zi,Pe);var Qt={},Tu=null;function Ts(){return Tu=Tu||new Se}Qt.La="serverreachability";function Eu(a){Pe.call(this,Qt.La,a)}C(Eu,Pe);function gr(a){const l=Ts();Oe(l,new Eu(l))}Qt.STAT_EVENT="statevent";function wu(a,l){Pe.call(this,Qt.STAT_EVENT,a),this.stat=l}C(wu,Pe);function Me(a){const l=Ts();Oe(l,new wu(l,a))}Qt.Ma="timingevent";function vu(a,l){Pe.call(this,Qt.Ma,a),this.size=l}C(vu,Pe);function _r(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){a()},l)}function yr(){this.g=!0}yr.prototype.xa=function(){this.g=!1};function ym(a,l,d,p,b,S){a.info(function(){if(a.g)if(S)for(var O="",re=S.split("&"),Ae=0;Ae<re.length;Ae++){var Z=re[Ae].split("=");if(1<Z.length){var Ve=Z[0];Z=Z[1];var Ce=Ve.split("_");O=2<=Ce.length&&Ce[1]=="type"?O+(Ve+"="+Z+"&"):O+(Ve+"=redacted&")}}else O=null;else O=S;return"XMLHTTP REQ ("+p+") [attempt "+b+"]: "+l+`
`+d+`
`+O})}function Im(a,l,d,p,b,S,O){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+b+"]: "+l+`
`+d+`
`+S+" "+O})}function wn(a,l,d,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Em(a,d)+(p?" "+p:"")})}function Tm(a,l){a.info(function(){return"TIMEOUT: "+l})}yr.prototype.info=function(){};function Em(a,l){if(!a.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var b=p[1];if(Array.isArray(b)&&!(1>b.length)){var S=b[0];if(S!="noop"&&S!="stop"&&S!="close")for(var O=1;O<b.length;O++)b[O]=""}}}}return Ji(d)}catch{return l}}var Es={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Au={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},eo;function ws(){}C(ws,Yi),ws.prototype.g=function(){return new XMLHttpRequest},ws.prototype.i=function(){return{}},eo=new ws;function _t(a,l,d,p){this.j=a,this.i=l,this.l=d,this.R=p||1,this.U=new mr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new bu}function bu(){this.i=null,this.g="",this.h=!1}var Ru={},to={};function no(a,l,d){a.L=1,a.v=Rs(st(l)),a.m=d,a.P=!0,Pu(a,null)}function Pu(a,l){a.F=Date.now(),vs(a),a.A=st(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),qu(d.i,"t",p),a.C=0,d=a.j.J,a.h=new bu,a.g=ic(a.j,d?l:null,!a.m),0<a.O&&(a.M=new pm(g(a.Y,a,a.g),a.O)),l=a.U,d=a.g,p=a.ca;var b="readystatechange";Array.isArray(b)||(b&&(gu[0]=b.toString()),b=gu);for(var S=0;S<b.length;S++){var O=lu(d,b[S],p||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),gr(),ym(a.i,a.u,a.A,a.l,a.R,a.m)}_t.prototype.ca=function(a){a=a.target;const l=this.M;l&&it(a)==3?l.j():this.Y(a)},_t.prototype.Y=function(a){try{if(a==this.g)e:{const Ce=it(this.g);var l=this.g.Ba();const bn=this.g.Z();if(!(3>Ce)&&(Ce!=3||this.g&&(this.h.h||this.g.oa()||Wu(this.g)))){this.J||Ce!=4||l==7||(l==8||0>=bn?gr(3):gr(2)),ro(this);var d=this.g.Z();this.X=d;t:if(Su(this)){var p=Wu(this.g);a="";var b=p.length,S=it(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Wt(this),Ir(this);var O="";break t}this.h.i=new u.TextDecoder}for(l=0;l<b;l++)this.h.h=!0,a+=this.h.i.decode(p[l],{stream:!(S&&l==b-1)});p.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,Im(this.i,this.u,this.A,this.l,this.R,Ce,d),this.o){if(this.T&&!this.K){t:{if(this.g){var re,Ae=this.g;if((re=Ae.g?Ae.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(re)){var Z=re;break t}}Z=null}if(d=Z)wn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,so(this,d);else{this.o=!1,this.s=3,Me(12),Wt(this),Ir(this);break e}}if(this.P){d=!0;let Ke;for(;!this.J&&this.C<O.length;)if(Ke=wm(this,O),Ke==to){Ce==4&&(this.s=4,Me(14),d=!1),wn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ke==Ru){this.s=4,Me(15),wn(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else wn(this.i,this.l,Ke,null),so(this,Ke);if(Su(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ce!=4||O.length!=0||this.h.h||(this.s=1,Me(16),d=!1),this.o=this.o&&d,!d)wn(this.i,this.l,O,"[Invalid Chunked Response]"),Wt(this),Ir(this);else if(0<O.length&&!this.W){this.W=!0;var Ve=this.j;Ve.g==this&&Ve.ba&&!Ve.M&&(Ve.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),lo(Ve),Ve.M=!0,Me(11))}}else wn(this.i,this.l,O,null),so(this,O);Ce==4&&Wt(this),this.o&&!this.J&&(Ce==4?tc(this.j,this):(this.o=!1,vs(this)))}else Bm(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,Me(12)):(this.s=0,Me(13)),Wt(this),Ir(this)}}}catch{}finally{}};function Su(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function wm(a,l){var d=a.C,p=l.indexOf(`
`,d);return p==-1?to:(d=Number(l.substring(d,p)),isNaN(d)?Ru:(p+=1,p+d>l.length?to:(l=l.slice(p,p+d),a.C=p+d,l)))}_t.prototype.cancel=function(){this.J=!0,Wt(this)};function vs(a){a.S=Date.now()+a.I,Vu(a,a.I)}function Vu(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=_r(g(a.ba,a),l)}function ro(a){a.B&&(u.clearTimeout(a.B),a.B=null)}_t.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Tm(this.i,this.A),this.L!=2&&(gr(),Me(17)),Wt(this),this.s=2,Ir(this)):Vu(this,this.S-a)};function Ir(a){a.j.G==0||a.J||tc(a.j,a)}function Wt(a){ro(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,_u(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function so(a,l){try{var d=a.j;if(d.G!=0&&(d.g==a||io(d.h,a))){if(!a.K&&io(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var b=p;if(b[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)xs(d),Cs(d);else break e;co(d),Me(18)}}else d.za=b[1],0<d.za-d.T&&37500>b[2]&&d.F&&d.v==0&&!d.C&&(d.C=_r(g(d.Za,d),6e3));if(1>=xu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Jt(d,11)}else if((a.K||d.g==a)&&xs(d),!j(l))for(b=d.Da.g.parse(l),l=0;l<b.length;l++){let Z=b[l];if(d.T=Z[0],Z=Z[1],d.G==2)if(Z[0]=="c"){d.K=Z[1],d.ia=Z[2];const Ve=Z[3];Ve!=null&&(d.la=Ve,d.j.info("VER="+d.la));const Ce=Z[4];Ce!=null&&(d.Aa=Ce,d.j.info("SVER="+d.Aa));const bn=Z[5];bn!=null&&typeof bn=="number"&&0<bn&&(p=1.5*bn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Ke=a.g;if(Ke){const Ns=Ke.g?Ke.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ns){var S=p.h;S.g||Ns.indexOf("spdy")==-1&&Ns.indexOf("quic")==-1&&Ns.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(oo(S,S.h),S.h=null))}if(p.D){const ho=Ke.g?Ke.g.getResponseHeader("X-HTTP-Session-Id"):null;ho&&(p.ya=ho,ie(p.I,p.D,ho))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var O=a;if(p.qa=sc(p,p.J?p.ia:null,p.W),O.K){ku(p.h,O);var re=O,Ae=p.L;Ae&&(re.I=Ae),re.B&&(ro(re),vs(re)),p.g=O}else Zu(p);0<d.i.length&&Ds(d)}else Z[0]!="stop"&&Z[0]!="close"||Jt(d,7);else d.G==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?Jt(d,7):uo(d):Z[0]!="noop"&&d.l&&d.l.ta(Z),d.v=0)}}gr(4)}catch{}}var vm=class{constructor(a,l){this.g=a,this.map=l}};function Cu(a){this.l=a||10,u.PerformanceNavigationTiming?(a=u.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Du(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function xu(a){return a.h?1:a.g?a.g.size:0}function io(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function oo(a,l){a.g?a.g.add(l):a.h=l}function ku(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Cu.prototype.cancel=function(){if(this.i=Nu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Nu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.D);return l}return x(a.i)}function Am(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var l=[],d=a.length,p=0;p<d;p++)l.push(a[p]);return l}l=[],d=0;for(p in a)l[d++]=a[p];return l}function bm(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var l=[];a=a.length;for(var d=0;d<a;d++)l.push(d);return l}l=[],d=0;for(const p in a)l[d++]=p;return l}}}function Ou(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var d=bm(a),p=Am(a),b=p.length,S=0;S<b;S++)l.call(void 0,p[S],d&&d[S],a)}var Mu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Rm(a,l){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),b=null;if(0<=p){var S=a[d].substring(0,p);b=a[d].substring(p+1)}else S=a[d];l(S,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function Ht(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Ht){this.h=a.h,As(this,a.j),this.o=a.o,this.g=a.g,bs(this,a.s),this.l=a.l;var l=a.i,d=new wr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),Fu(this,d),this.m=a.m}else a&&(l=String(a).match(Mu))?(this.h=!1,As(this,l[1]||"",!0),this.o=Tr(l[2]||""),this.g=Tr(l[3]||"",!0),bs(this,l[4]),this.l=Tr(l[5]||"",!0),Fu(this,l[6]||"",!0),this.m=Tr(l[7]||"")):(this.h=!1,this.i=new wr(null,this.h))}Ht.prototype.toString=function(){var a=[],l=this.j;l&&a.push(Er(l,Lu,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Er(l,Lu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Er(d,d.charAt(0)=="/"?Vm:Sm,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Er(d,Dm)),a.join("")};function st(a){return new Ht(a)}function As(a,l,d){a.j=d?Tr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function bs(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function Fu(a,l,d){l instanceof wr?(a.i=l,xm(a.i,a.h)):(d||(l=Er(l,Cm)),a.i=new wr(l,a.h))}function ie(a,l,d){a.i.set(l,d)}function Rs(a){return ie(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Tr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Er(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Pm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Pm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Lu=/[#\/\?@]/g,Sm=/[#\?:]/g,Vm=/[#\?]/g,Cm=/[#\?@]/g,Dm=/#/g;function wr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function yt(a){a.g||(a.g=new Map,a.h=0,a.i&&Rm(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=wr.prototype,r.add=function(a,l){yt(this),this.i=null,a=vn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function Bu(a,l){yt(a),l=vn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Uu(a,l){return yt(a),l=vn(a,l),a.g.has(l)}r.forEach=function(a,l){yt(this),this.g.forEach(function(d,p){d.forEach(function(b){a.call(l,b,p,this)},this)},this)},r.na=function(){yt(this);const a=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){const b=a[p];for(let S=0;S<b.length;S++)d.push(l[p])}return d},r.V=function(a){yt(this);let l=[];if(typeof a=="string")Uu(this,a)&&(l=l.concat(this.g.get(vn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)l=l.concat(a[d])}return l},r.set=function(a,l){return yt(this),this.i=null,a=vn(this,a),Uu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function qu(a,l,d){Bu(a,l),0<d.length&&(a.i=null,a.g.set(vn(a,l),x(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];const S=encodeURIComponent(String(p)),O=this.V(p);for(p=0;p<O.length;p++){var b=S;O[p]!==""&&(b+="="+encodeURIComponent(String(O[p]))),a.push(b)}}return this.i=a.join("&")};function vn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function xm(a,l){l&&!a.j&&(yt(a),a.i=null,a.g.forEach(function(d,p){var b=p.toLowerCase();p!=b&&(Bu(this,p),qu(this,b,d))},a)),a.j=l}function km(a,l){const d=new yr;if(u.Image){const p=new Image;p.onload=w(It,d,"TestLoadImage: loaded",!0,l,p),p.onerror=w(It,d,"TestLoadImage: error",!1,l,p),p.onabort=w(It,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=w(It,d,"TestLoadImage: timeout",!1,l,p),u.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Nm(a,l){const d=new yr,p=new AbortController,b=setTimeout(()=>{p.abort(),It(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(S=>{clearTimeout(b),S.ok?It(d,"TestPingServer: ok",!0,l):It(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(b),It(d,"TestPingServer: error",!1,l)})}function It(a,l,d,p,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),p(d)}catch{}}function Om(){this.g=new _m}function Mm(a,l,d){const p=d||"";try{Ou(a,function(b,S){let O=b;h(b)&&(O=Ji(b)),l.push(p+S+"="+encodeURIComponent(O))})}catch(b){throw l.push(p+"type="+encodeURIComponent("_badmap")),b}}function Ps(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Ps,Yi),Ps.prototype.g=function(){return new Ss(this.l,this.j)},Ps.prototype.i=(function(a){return function(){return a}})({});function Ss(a,l){Se.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Ss,Se),r=Ss.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,Ar(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,vr(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ar(this)),this.g&&(this.readyState=3,Ar(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ju(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function ju(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?vr(this):Ar(this),this.readyState==3&&ju(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,vr(this))},r.Qa=function(a){this.g&&(this.response=a,vr(this))},r.ga=function(){this.g&&vr(this)};function vr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ar(a)}r.setRequestHeader=function(a,l){this.u.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Ar(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ss.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function $u(a){let l="";return G(a,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function ao(a,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=$u(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ie(a,l,d))}function fe(a){Se.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(fe,Se);var Fm=/^https?$/i,Lm=["POST","PUT"];r=fe.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():eo.g(),this.v=this.o?yu(this.o):yu(eo),this.g.onreadystatechange=g(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(S){zu(this,S);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var b in p)d.set(b,p[b]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())d.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),b=u.FormData&&a instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Lm,l,void 0))||p||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,O]of d)this.g.setRequestHeader(S,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Qu(this),this.u=!0,this.g.send(a),this.u=!1}catch(S){zu(this,S)}};function zu(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,Gu(a),Vs(a)}function Gu(a){a.A||(a.A=!0,Oe(a,"complete"),Oe(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Oe(this,"complete"),Oe(this,"abort"),Vs(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Vs(this,!0)),fe.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Ku(this):this.bb())},r.bb=function(){Ku(this)};function Ku(a){if(a.h&&typeof o<"u"&&(!a.v[1]||it(a)!=4||a.Z()!=2)){if(a.u&&it(a)==4)mu(a.Ea,0,a);else if(Oe(a,"readystatechange"),it(a)==4){a.h=!1;try{const O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=O===0){var b=String(a.D).match(Mu)[1]||null;!b&&u.self&&u.self.location&&(b=u.self.location.protocol.slice(0,-1)),p=!Fm.test(b?b.toLowerCase():"")}d=p}if(d)Oe(a,"complete"),Oe(a,"success");else{a.m=6;try{var S=2<it(a)?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.Z()+"]",Gu(a)}}finally{Vs(a)}}}}function Vs(a,l){if(a.g){Qu(a);const d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||Oe(a,"ready");try{d.onreadystatechange=p}catch{}}}function Qu(a){a.I&&(u.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function it(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<it(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),gm(l)}};function Wu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Bm(a){const l={};a=(a.g&&2<=it(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(j(a[p]))continue;var d=v(a[p]);const b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[b]||[];l[b]=S,S.push(d)}T(l,function(p){return p.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function br(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Hu(a){this.Aa=0,this.i=[],this.j=new yr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=br("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=br("baseRetryDelayMs",5e3,a),this.cb=br("retryDelaySeedMs",1e4,a),this.Wa=br("forwardChannelMaxRetries",2,a),this.wa=br("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Cu(a&&a.concurrentRequestLimit),this.Da=new Om,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Hu.prototype,r.la=8,r.G=1,r.connect=function(a,l,d,p){Me(0),this.W=a,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=sc(this,null,this.W),Ds(this)};function uo(a){if(Ju(a),a.G==3){var l=a.U++,d=st(a.I);if(ie(d,"SID",a.K),ie(d,"RID",l),ie(d,"TYPE","terminate"),Rr(a,d),l=new _t(a,a.j,l),l.L=2,l.v=Rs(st(d)),d=!1,u.navigator&&u.navigator.sendBeacon)try{d=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&u.Image&&(new Image().src=l.v,d=!0),d||(l.g=ic(l.j,null),l.g.ea(l.v)),l.F=Date.now(),vs(l)}rc(a)}function Cs(a){a.g&&(lo(a),a.g.cancel(),a.g=null)}function Ju(a){Cs(a),a.u&&(u.clearTimeout(a.u),a.u=null),xs(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&u.clearTimeout(a.s),a.s=null)}function Ds(a){if(!Du(a.h)&&!a.s){a.s=!0;var l=a.Ga;hr||cu(),dr||(hr(),dr=!0),ji.add(l,a),a.B=0}}function Um(a,l){return xu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=_r(g(a.Ga,a,l),nc(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const b=new _t(this,this.j,a);let S=this.o;if(this.S&&(S?(S=_(S),E(S,this.S)):S=this.S),this.m!==null||this.O||(b.H=S,S=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Xu(this,b,l),d=st(this.I),ie(d,"RID",a),ie(d,"CVER",22),this.D&&ie(d,"X-HTTP-Session-Id",this.D),Rr(this,d),S&&(this.O?l="headers="+encodeURIComponent(String($u(S)))+"&"+l:this.m&&ao(d,this.m,S)),oo(this.h,b),this.Ua&&ie(d,"TYPE","init"),this.P?(ie(d,"$req",l),ie(d,"SID","null"),b.T=!0,no(b,d,null)):no(b,d,l),this.G=2}}else this.G==3&&(a?Yu(this,a):this.i.length==0||Du(this.h)||Yu(this))};function Yu(a,l){var d;l?d=l.l:d=a.U++;const p=st(a.I);ie(p,"SID",a.K),ie(p,"RID",d),ie(p,"AID",a.T),Rr(a,p),a.m&&a.o&&ao(p,a.m,a.o),d=new _t(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),l&&(a.i=l.D.concat(a.i)),l=Xu(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),oo(a.h,d),no(d,p,l)}function Rr(a,l){a.H&&G(a.H,function(d,p){ie(l,p,d)}),a.l&&Ou({},function(d,p){ie(l,p,d)})}function Xu(a,l,d){d=Math.min(a.i.length,d);var p=a.l?g(a.l.Na,a.l,a):null;e:{var b=a.i;let S=-1;for(;;){const O=["count="+d];S==-1?0<d?(S=b[0].g,O.push("ofs="+S)):S=0:O.push("ofs="+S);let re=!0;for(let Ae=0;Ae<d;Ae++){let Z=b[Ae].g;const Ve=b[Ae].map;if(Z-=S,0>Z)S=Math.max(0,b[Ae].g-100),re=!1;else try{Mm(Ve,O,"req"+Z+"_")}catch{p&&p(Ve)}}if(re){p=O.join("&");break e}}}return a=a.i.splice(0,d),l.D=a,p}function Zu(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;hr||cu(),dr||(hr(),dr=!0),ji.add(l,a),a.v=0}}function co(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=_r(g(a.Fa,a),nc(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,ec(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=_r(g(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Me(10),Cs(this),ec(this))};function lo(a){a.A!=null&&(u.clearTimeout(a.A),a.A=null)}function ec(a){a.g=new _t(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=st(a.qa);ie(l,"RID","rpc"),ie(l,"SID",a.K),ie(l,"AID",a.T),ie(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&ie(l,"TO",a.ja),ie(l,"TYPE","xmlhttp"),Rr(a,l),a.m&&a.o&&ao(l,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Rs(st(l)),d.m=null,d.P=!0,Pu(d,a)}r.Za=function(){this.C!=null&&(this.C=null,Cs(this),co(this),Me(19))};function xs(a){a.C!=null&&(u.clearTimeout(a.C),a.C=null)}function tc(a,l){var d=null;if(a.g==l){xs(a),lo(a),a.g=null;var p=2}else if(io(a.h,l))d=l.D,ku(a.h,l),p=1;else return;if(a.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var b=a.B;p=Ts(),Oe(p,new vu(p,d)),Ds(a)}else Zu(a);else if(b=l.s,b==3||b==0&&0<l.X||!(p==1&&Um(a,l)||p==2&&co(a)))switch(d&&0<d.length&&(l=a.h,l.i=l.i.concat(d)),b){case 1:Jt(a,5);break;case 4:Jt(a,10);break;case 3:Jt(a,6);break;default:Jt(a,2)}}}function nc(a,l){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*l}function Jt(a,l){if(a.j.info("Error code "+l),l==2){var d=g(a.fb,a),p=a.Xa;const b=!p;p=new Ht(p||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||As(p,"https"),Rs(p),b?km(p.toString(),d):Nm(p.toString(),d)}else Me(2);a.G=0,a.l&&a.l.sa(l),rc(a),Ju(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Me(2)):(this.j.info("Failed to ping google.com"),Me(1))};function rc(a){if(a.G=0,a.ka=[],a.l){const l=Nu(a.h);(l.length!=0||a.i.length!=0)&&(V(a.ka,l),V(a.ka,a.i),a.h.i.length=0,x(a.i),a.i.length=0),a.l.ra()}}function sc(a,l,d){var p=d instanceof Ht?st(d):new Ht(d);if(p.g!="")l&&(p.g=l+"."+p.g),bs(p,p.s);else{var b=u.location;p=b.protocol,l=l?l+"."+b.hostname:b.hostname,b=+b.port;var S=new Ht(null);p&&As(S,p),l&&(S.g=l),b&&bs(S,b),d&&(S.l=d),p=S}return d=a.D,l=a.ya,d&&l&&ie(p,d,l),ie(p,"VER",a.la),Rr(a,p),p}function ic(a,l,d){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new fe(new Ps({eb:d})):new fe(a.pa),l.Ha(a.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function oc(){}r=oc.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function ks(){}ks.prototype.g=function(a,l){return new qe(a,l)};function qe(a,l){Se.call(this),this.g=new Hu(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!j(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!j(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new An(this)}C(qe,Se),qe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},qe.prototype.close=function(){uo(this.g)},qe.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Ji(a),a=d);l.i.push(new vm(l.Ya++,a)),l.G==3&&Ds(l)},qe.prototype.N=function(){this.g.l=null,delete this.j,uo(this.g),delete this.g,qe.aa.N.call(this)};function ac(a){Xi.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}C(ac,Xi);function uc(){Zi.call(this),this.status=1}C(uc,Zi);function An(a){this.g=a}C(An,oc),An.prototype.ua=function(){Oe(this.g,"a")},An.prototype.ta=function(a){Oe(this.g,new ac(a))},An.prototype.sa=function(a){Oe(this.g,new uc)},An.prototype.ra=function(){Oe(this.g,"b")},ks.prototype.createWebChannel=ks.prototype.g,qe.prototype.send=qe.prototype.o,qe.prototype.open=qe.prototype.m,qe.prototype.close=qe.prototype.close,lh=function(){return new ks},ch=function(){return Ts()},uh=Qt,xo={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Es.NO_ERROR=0,Es.TIMEOUT=8,Es.HTTP_ERROR=6,$s=Es,Au.COMPLETE="complete",ah=Au,Iu.EventType=pr,pr.OPEN="a",pr.CLOSE="b",pr.ERROR="c",pr.MESSAGE="d",Se.prototype.listen=Se.prototype.K,xr=Iu,fe.prototype.listenOnce=fe.prototype.L,fe.prototype.getLastError=fe.prototype.Ka,fe.prototype.getLastErrorCode=fe.prototype.Ba,fe.prototype.getStatus=fe.prototype.Z,fe.prototype.getResponseJson=fe.prototype.Oa,fe.prototype.getResponseText=fe.prototype.oa,fe.prototype.send=fe.prototype.ea,fe.prototype.setWithCredentials=fe.prototype.Ha,oh=fe}).apply(typeof Os<"u"?Os:typeof self<"u"?self:typeof window<"u"?window:{});const Ec="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ee.UNAUTHENTICATED=new Ee(null),Ee.GOOGLE_CREDENTIALS=new Ee("google-credentials-uid"),Ee.FIRST_PARTY=new Ee("first-party-uid"),Ee.MOCK_USER=new Ee("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct=new ta("@firebase/firestore");function Cn(){return Ct.logLevel}function Ig(r){Ct.setLogLevel(r)}function k(r,...e){if(Ct.logLevel<=X.DEBUG){const t=e.map(sa);Ct.debug(`Firestore (${Xn}): ${r}`,...t)}}function pe(r,...e){if(Ct.logLevel<=X.ERROR){const t=e.map(sa);Ct.error(`Firestore (${Xn}): ${r}`,...t)}}function $e(r,...e){if(Ct.logLevel<=X.WARN){const t=e.map(sa);Ct.warn(`Firestore (${Xn}): ${r}`,...t)}}function sa(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(r="Unexpected state"){const e=`FIRESTORE (${Xn}) INTERNAL ASSERTION FAILED: `+r;throw pe(e),new Error(e)}function B(r,e){r||F()}function Tg(r,e){r||F()}function N(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends ht{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class dh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ee.UNAUTHENTICATED)))}shutdown(){}}class Eg{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class wg{constructor(e){this.t=e,this.currentUser=Ee.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){B(this.o===void 0);let n=this.i;const s=c=>this.i!==n?(n=this.i,t(c)):Promise.resolve();let i=new we;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new we,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const c=i;e.enqueueRetryable((async()=>{await c.promise,await s(this.currentUser)}))},u=c=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new we)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(B(typeof n.accessToken=="string"),new hh(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return B(e===null||typeof e=="string"),new Ee(e)}}class vg{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=Ee.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Ag{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new vg(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(Ee.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class fh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class bg{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){B(this.o===void 0);const n=i=>{i.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,k("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(B(typeof t.token=="string"),this.R=t.token,new fh(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}class Rg{getToken(){return Promise.resolve(new fh(""))}invalidateToken(){}start(e,t){}shutdown(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pg(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const s=Pg(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%e.length))}return n}}function z(r,e){return r<e?-1:r>e?1:0}function Fn(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}function mh(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return le.fromMillis(Date.now())}static fromDate(e){return le.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new le(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.timestamp=e}static fromTimestamp(e){return new q(e)}static min(){return new q(new le(0,0))}static max(){return new q(new le(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr{constructor(e,t,n){t===void 0?t=0:t>e.length&&F(),n===void 0?n=e.length-t:n>e.length-t&&F(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Gr.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Gr?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=e.get(s),o=t.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class W extends Gr{construct(e,t,n){return new W(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new D(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new W(t)}static emptyPath(){return new W([])}}const Sg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ae extends Gr{construct(e,t,n){return new ae(e,t,n)}static isValidIdentifier(e){return Sg.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ae.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ae(["__name__"])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new D(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new D(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,s+=2}else u==="`"?(o=!o,s++):u!=="."||o?(n+=u,s++):(i(),s++)}if(i(),o)throw new D(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ae(t)}static emptyPath(){return new ae([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(W.fromString(e))}static fromName(e){return new M(W.fromString(e).popFirst(5))}static empty(){return new M(W.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&W.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return W.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new W(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function ko(r){return r.fields.find((e=>e.kind===2))}function Zt(r){return r.fields.filter((e=>e.kind!==2))}function Vg(r,e){let t=z(r.collectionGroup,e.collectionGroup);if(t!==0)return t;for(let n=0;n<Math.min(r.fields.length,e.fields.length);++n)if(t=Cg(r.fields[n],e.fields[n]),t!==0)return t;return z(r.fields.length,e.fields.length)}Ln.UNKNOWN_ID=-1;class an{constructor(e,t){this.fieldPath=e,this.kind=t}}function Cg(r,e){const t=ae.comparator(r.fieldPath,e.fieldPath);return t!==0?t:z(r.kind,e.kind)}class Bn{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Bn(0,ze.min())}}function ph(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=q.fromTimestamp(n===1e9?new le(t+1,0):new le(t,n));return new ze(s,M.empty(),e)}function gh(r){return new ze(r.readTime,r.key,-1)}class ze{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new ze(q.min(),M.empty(),-1)}static max(){return new ze(q.max(),M.empty(),-1)}}function oa(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(r.documentKey,e.documentKey),t!==0?t:z(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class yh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ut(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==_h)throw r;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):A.reject(t)}static resolve(e){return new A(((t,n)=>{t(e)}))}static reject(e){return new A(((t,n)=>{n(e)}))}static waitFor(e){return new A(((t,n)=>{let s=0,i=0,o=!1;e.forEach((u=>{++s,u.next((()=>{++i,o&&i===s&&t()}),(c=>n(c)))})),o=!0,i===s&&t()}))}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next((s=>s?A.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new A(((n,s)=>{const i=e.length,o=new Array(i);let u=0;for(let c=0;c<i;c++){const h=c;t(e[h]).next((f=>{o[h]=f,++u,u===i&&n(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new A(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new we,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Mr(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{const s=aa(n.target.error);this.V.reject(new Mr(e,s))}}static open(e,t,n,s){try{return new yi(t,e.transaction(s,n))}catch(i){throw new Mr(t,i)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(k("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new xg(t)}}class Ye{constructor(e,t,n){this.name=e,this.version=t,this.p=n,Ye.S(Mn())===12.2&&pe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return k("SimpleDb","Removing database:",e),en(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!ea())return!1;if(Ye.v())return!0;const e=Mn(),t=Ye.S(e),n=0<t&&t<10,s=Ih(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(k("SimpleDb","Opening database:",this.name),this.db=await new Promise(((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new Mr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new D(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new D(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new Mr(e,o))},s.onupgradeneeded=i=>{k("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.p.O(o,s.transaction,i.oldVersion,this.version).next((()=>{k("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const u=yi.open(this.db,e,i?"readonly":"readwrite",n),c=s(u).next((h=>(u.g(),h))).catch((h=>(u.abort(h),A.reject(h)))).toPromise();return c.catch((()=>{})),await u.m,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&o<3;if(k("SimpleDb","Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Ih(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class Dg{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return en(this.B.delete())}}class Mr extends D{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function qt(r){return r.name==="IndexedDbTransactionError"}class xg{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(k("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(k("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),en(n)}add(e){return k("SimpleDb","ADD",this.store.name,e,e),en(this.store.add(e))}get(e){return en(this.store.get(e)).next((t=>(t===void 0&&(t=null),k("SimpleDb","GET",this.store.name,e,t),t)))}delete(e){return k("SimpleDb","DELETE",this.store.name,e),en(this.store.delete(e))}count(){return k("SimpleDb","COUNT",this.store.name),en(this.store.count())}U(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A(((o,u)=>{i.onerror=c=>{u(c.target.error)},i.onsuccess=c=>{o(c.target.result)}}))}{const i=this.cursor(n),o=[];return this.W(i,((u,c)=>{o.push(c)})).next((()=>o))}}G(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A(((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}}))}j(e,t){k("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const s=this.cursor(n);return this.W(s,((i,o,u)=>u.delete()))}J(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.W(s,t)}Y(e){const t=this.cursor({});return new A(((n,s)=>{t.onerror=i=>{const o=aa(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((u=>{u?o.continue():n()})):n()}}))}W(e,t){const n=[];return new A(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const u=o.target.result;if(!u)return void s();const c=new Dg(u),h=t(u.primaryKey,u.value,c);if(h instanceof A){const f=h.catch((m=>(c.done(),A.reject(m))));n.push(f)}c.isDone?s():c.K===null?u.continue():u.continue(c.K)}})).next((()=>A.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function en(r){return new A(((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=aa(n.target.error);t(s)}}))}let wc=!1;function aa(r){const e=Ye.S(Mn());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return wc||(wc=!0,setTimeout((()=>{throw n}),0)),n}}return r}class kg{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){k("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{k("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){qt(t)?k("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await Ut(t)}await this.X(6e4)}))}}class Ng{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.te(t,e)))}te(e,t){const n=new Set;let s=t,i=!0;return A.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!n.has(o))return k("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,s).next((u=>{s-=u,n.add(o)}));i=!1})))).next((()=>t-s))}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this.re(s,i))).next((u=>(k("IndexBackfiller",`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(e,t,u)))).next((()=>o.size))}))))}re(e,t){let n=e;return t.changes.forEach(((s,i)=>{const o=gh(i);oa(o,n)>0&&(n=o)})),new ze(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Fe.oe=-1;function ts(r){return r==null}function Kr(r){return r===0&&1/r==-1/0}function Th(r){return typeof r=="number"&&Number.isInteger(r)&&!Kr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=vc(e)),e=Og(r.get(t),e);return vc(e)}function Og(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case"":t+="";break;default:t+=i}}return t}function vc(r){return r+""}function He(r){const e=r.length;if(B(e>=2),e===2)return B(r.charAt(0)===""&&r.charAt(1)===""),W.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf("",i);switch((o<0||o>t)&&F(),r.charAt(o+1)){case"":const u=r.substring(i,o);let c;s.length===0?c=u:(s+=u,c=s,s=""),n.push(c);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:F()}i=o+2}return new W(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zs(r,e){return[r,ke(e)]}function Eh(r,e,t){return[r,ke(e),t]}const Mg={},Fg=["prefixPath","collectionGroup","readTime","documentId"],Lg=["prefixPath","collectionGroup","documentId"],Bg=["collectionGroup","readTime","prefixPath","documentId"],Ug=["canonicalId","targetId"],qg=["targetId","path"],jg=["path","targetId"],$g=["collectionId","parent"],zg=["indexId","uid"],Gg=["uid","sequenceNumber"],Kg=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Qg=["indexId","uid","orderedDocumentKey"],Wg=["userId","collectionPath","documentId"],Hg=["userId","collectionPath","largestBatchId"],Jg=["userId","collectionGroup","largestBatchId"],wh=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],Yg=[...wh,"documentOverlays"],vh=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Ah=vh,ua=[...Ah,"indexConfiguration","indexState","indexEntries"],Xg=ua,Zg=[...ua,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No extends yh{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function Ie(r,e){const t=N(r);return Ye.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bc(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function jt(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function bh(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function Rh(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||be.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,be.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,be.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ms(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ms(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ms(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ms(this.root,e,this.comparator,!0)}}class Ms{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class be{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??be.RED,this.left=s??be.EMPTY,this.right=i??be.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new be(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return be.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return be.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,be.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,be.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw F();const e=this.left.check();if(e!==this.right.check())throw F();return e+(this.isRed()?0:1)}}be.EMPTY=null,be.RED=!0,be.BLACK=!1;be.EMPTY=new class{constructor(){this.size=0}get key(){throw F()}get value(){throw F()}get color(){throw F()}get left(){throw F()}get right(){throw F()}copy(e,t,n,s,i){return this}insert(e,t,n){return new be(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Rc(this.data.getIterator())}getIteratorFrom(e){return new Rc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof te)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new te(this.comparator);return t.data=e,t}}class Rc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Rn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.fields=e,e.sort(ae.comparator)}static empty(){return new Le([])}unionWith(e){let t=new te(ae.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Le(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Fn(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e_(){return typeof atob<"u"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ph("Invalid base64 string: "+i):i}})(e);return new de(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new de(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}de.EMPTY_BYTE_STRING=new de("");const t_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ct(r){if(B(!!r),typeof r=="string"){let e=0;const t=t_.exec(r);if(B(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:ue(r.seconds),nanos:ue(r.nanos)}}function ue(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function lt(r){return typeof r=="string"?de.fromBase64String(r):de.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ii(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Ti(r){const e=r.mapValue.fields.__previous_value__;return Ii(e)?Ti(e):e}function Qr(r){const e=ct(r.mapValue.fields.__local_write_time__.timestampValue);return new le(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,t,n,s,i,o,u,c,h){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h}}class Dt{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Dt("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Dt&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bt={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Gs={nullValue:"NULL_VALUE"};function xt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ii(r)?4:Sh(r)?9007199254740991:Ei(r)?10:11:F()}function et(r,e){if(r===e)return!0;const t=xt(r);if(t!==xt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return Qr(r).isEqual(Qr(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=ct(s.timestampValue),u=ct(i.timestampValue);return o.seconds===u.seconds&&o.nanos===u.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(s,i){return lt(s.bytesValue).isEqual(lt(i.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(s,i){return ue(s.geoPointValue.latitude)===ue(i.geoPointValue.latitude)&&ue(s.geoPointValue.longitude)===ue(i.geoPointValue.longitude)})(r,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return ue(s.integerValue)===ue(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=ue(s.doubleValue),u=ue(i.doubleValue);return o===u?Kr(o)===Kr(u):isNaN(o)&&isNaN(u)}return!1})(r,e);case 9:return Fn(r.arrayValue.values||[],e.arrayValue.values||[],et);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},u=i.mapValue.fields||{};if(bc(o)!==bc(u))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(u[c]===void 0||!et(o[c],u[c])))return!1;return!0})(r,e);default:return F()}}function Wr(r,e){return(r.values||[]).find((t=>et(t,e)))!==void 0}function kt(r,e){if(r===e)return 0;const t=xt(r),n=xt(e);if(t!==n)return z(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(r.booleanValue,e.booleanValue);case 2:return(function(i,o){const u=ue(i.integerValue||i.doubleValue),c=ue(o.integerValue||o.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1})(r,e);case 3:return Pc(r.timestampValue,e.timestampValue);case 4:return Pc(Qr(r),Qr(e));case 5:return z(r.stringValue,e.stringValue);case 6:return(function(i,o){const u=lt(i),c=lt(o);return u.compareTo(c)})(r.bytesValue,e.bytesValue);case 7:return(function(i,o){const u=i.split("/"),c=o.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=z(u[h],c[h]);if(f!==0)return f}return z(u.length,c.length)})(r.referenceValue,e.referenceValue);case 8:return(function(i,o){const u=z(ue(i.latitude),ue(o.latitude));return u!==0?u:z(ue(i.longitude),ue(o.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return Sc(r.arrayValue,e.arrayValue);case 10:return(function(i,o){var u,c,h,f;const m=i.fields||{},g=o.fields||{},w=(u=m.value)===null||u===void 0?void 0:u.arrayValue,C=(c=g.value)===null||c===void 0?void 0:c.arrayValue,x=z(((h=w?.values)===null||h===void 0?void 0:h.length)||0,((f=C?.values)===null||f===void 0?void 0:f.length)||0);return x!==0?x:Sc(w,C)})(r.mapValue,e.mapValue);case 11:return(function(i,o){if(i===bt.mapValue&&o===bt.mapValue)return 0;if(i===bt.mapValue)return 1;if(o===bt.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=o.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let m=0;m<c.length&&m<f.length;++m){const g=z(c[m],f[m]);if(g!==0)return g;const w=kt(u[c[m]],h[f[m]]);if(w!==0)return w}return z(c.length,f.length)})(r.mapValue,e.mapValue);default:throw F()}}function Pc(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return z(r,e);const t=ct(r),n=ct(e),s=z(t.seconds,n.seconds);return s!==0?s:z(t.nanos,n.nanos)}function Sc(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=kt(t[s],n[s]);if(i)return i}return z(t.length,n.length)}function Un(r){return Oo(r)}function Oo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=ct(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return lt(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return M.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Oo(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${Oo(t.fields[o])}`;return s+"}"})(r.mapValue):F()}function Ks(r){switch(xt(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ti(r);return e?16+Ks(e):16;case 5:return 2*r.stringValue.length;case 6:return lt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+Ks(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return jt(n.fields,((i,o)=>{s+=i.length+Ks(o)})),s})(r.mapValue);default:throw F()}}function un(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Mo(r){return!!r&&"integerValue"in r}function Hr(r){return!!r&&"arrayValue"in r}function Vc(r){return!!r&&"nullValue"in r}function Cc(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Qs(r){return!!r&&"mapValue"in r}function Ei(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Fr(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return jt(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Fr(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Fr(r.arrayValue.values[t]);return e}return Object.assign({},r)}function Sh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const Vh={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function r_(r){return"nullValue"in r?Gs:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?un(Dt.empty(),M.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Ei(r)?Vh:{mapValue:{}}:F()}function s_(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?un(Dt.empty(),M.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Vh:"mapValue"in r?Ei(r)?{mapValue:{}}:bt:F()}function Dc(r,e){const t=kt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function xc(r,e){const t=kt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.value=e}static empty(){return new Re({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Qs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fr(t)}setAll(e){let t=ae.emptyPath(),n={},s=[];e.forEach(((o,u)=>{if(!t.isImmediateParentOf(u)){const c=this.getFieldsMap(t);this.applyChanges(c,n,s),n={},s=[],t=u.popLast()}o?n[u.lastSegment()]=Fr(o):s.push(u.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Qs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return et(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Qs(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){jt(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new Re(Fr(this.value))}}function Ch(r){const e=[];return jt(r.fields,((t,n)=>{const s=new ae([t]);if(Qs(n)){const i=Ch(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Le(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e,t,n,s,i,o,u){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=u}static newInvalidDocument(e){return new oe(e,0,q.min(),q.min(),q.min(),Re.empty(),0)}static newFoundDocument(e,t,n,s){return new oe(e,1,t,q.min(),n,s,0)}static newNoDocument(e,t){return new oe(e,2,t,q.min(),q.min(),Re.empty(),0)}static newUnknownDocument(e,t){return new oe(e,3,t,q.min(),q.min(),Re.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Re.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Re.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof oe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new oe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t){this.position=e,this.inclusive=t}}function kc(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=M.comparator(M.fromName(o.referenceValue),t.key):n=kt(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Nc(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!et(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e,t="asc"){this.field=e,this.dir=t}}function i_(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{}class H extends Dh{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new o_(e,t,n):t==="array-contains"?new c_(e,n):t==="in"?new Fh(e,n):t==="not-in"?new l_(e,n):t==="array-contains-any"?new h_(e,n):new H(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new a_(e,n):new u_(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(kt(t,this.value)):t!==null&&xt(this.value)===xt(t)&&this.matchesComparison(kt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ee extends Dh{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ee(e,t)}matches(e){return qn(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function qn(r){return r.op==="and"}function Fo(r){return r.op==="or"}function ca(r){return xh(r)&&qn(r)}function xh(r){for(const e of r.filters)if(e instanceof ee)return!1;return!0}function Lo(r){if(r instanceof H)return r.field.canonicalString()+r.op.toString()+Un(r.value);if(ca(r))return r.filters.map((e=>Lo(e))).join(",");{const e=r.filters.map((t=>Lo(t))).join(",");return`${r.op}(${e})`}}function kh(r,e){return r instanceof H?(function(n,s){return s instanceof H&&n.op===s.op&&n.field.isEqual(s.field)&&et(n.value,s.value)})(r,e):r instanceof ee?(function(n,s){return s instanceof ee&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,o,u)=>i&&kh(o,s.filters[u])),!0):!1})(r,e):void F()}function Nh(r,e){const t=r.filters.concat(e);return ee.create(t,r.op)}function Oh(r){return r instanceof H?(function(t){return`${t.field.canonicalString()} ${t.op} ${Un(t.value)}`})(r):r instanceof ee?(function(t){return t.op.toString()+" {"+t.getFilters().map(Oh).join(" ,")+"}"})(r):"Filter"}class o_ extends H{constructor(e,t,n){super(e,t,n),this.key=M.fromName(n.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class a_ extends H{constructor(e,t){super(e,"in",t),this.keys=Mh("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class u_ extends H{constructor(e,t){super(e,"not-in",t),this.keys=Mh("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Mh(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((n=>M.fromName(n.referenceValue)))}class c_ extends H{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Hr(t)&&Wr(t.arrayValue,this.value)}}class Fh extends H{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Wr(this.value.arrayValue,t)}}class l_ extends H{constructor(e,t){super(e,"not-in",t)}matches(e){if(Wr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!Wr(this.value.arrayValue,t)}}class h_ extends H{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Hr(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>Wr(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(e,t=null,n=[],s=[],i=null,o=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=u,this.ue=null}}function Bo(r,e=null,t=[],n=[],s=null,i=null,o=null){return new d_(r,e,t,n,s,i,o)}function cn(r){const e=N(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>Lo(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),ts(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>Un(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>Un(n))).join(",")),e.ue=t}return e.ue}function ns(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!i_(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!kh(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Nc(r.startAt,e.startAt)&&Nc(r.endAt,e.endAt)}function Zs(r){return M.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function ei(r,e){return r.filters.filter((t=>t instanceof H&&t.field.isEqual(e)))}function Oc(r,e,t){let n=Gs,s=!0;for(const i of ei(r,e)){let o=Gs,u=!0;switch(i.op){case"<":case"<=":o=r_(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,u=!1;break;case"!=":case"not-in":o=Gs}Dc({value:n,inclusive:s},{value:o,inclusive:u})<0&&(n=o,s=u)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Dc({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function Mc(r,e,t){let n=bt,s=!0;for(const i of ei(r,e)){let o=bt,u=!0;switch(i.op){case">=":case">":o=s_(i.value),u=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,u=!1;break;case"!=":case"not-in":o=bt}xc({value:n,inclusive:s},{value:o,inclusive:u})>0&&(n=o,s=u)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];xc({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,t=null,n=[],s=[],i=null,o="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=u,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Lh(r,e,t,n,s,i,o,u){return new dt(r,e,t,n,s,i,o,u)}function Zn(r){return new dt(r)}function Fc(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function la(r){return r.collectionGroup!==null}function Nn(r){const e=N(r);if(e.ce===null){e.ce=[];const t=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new te(ae.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((h=>{h.isInequality()&&(u=u.add(h.field))}))})),u})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Jr(i,n))})),t.has(ae.keyField().canonicalString())||e.ce.push(new Jr(ae.keyField(),n))}return e.ce}function Ne(r){const e=N(r);return e.le||(e.le=Uh(e,Nn(r))),e.le}function Bh(r){const e=N(r);return e.he||(e.he=Uh(e,r.explicitOrderBy)),e.he}function Uh(r,e){if(r.limitType==="F")return Bo(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new Jr(s.field,i)}));const t=r.endAt?new Nt(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Nt(r.startAt.position,r.startAt.inclusive):null;return Bo(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Uo(r,e){const t=r.filters.concat([e]);return new dt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function ti(r,e,t){return new dt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function rs(r,e){return ns(Ne(r),Ne(e))&&r.limitType===e.limitType}function qh(r){return`${cn(Ne(r))}|lt:${r.limitType}`}function Dn(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>Oh(s))).join(", ")}]`),ts(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>Un(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>Un(s))).join(",")),`Target(${n})`})(Ne(r))}; limitType=${r.limitType})`}function ss(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):M.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of Nn(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(o,u,c){const h=kc(o,u,c);return o.inclusive?h<=0:h<0})(n.startAt,Nn(n),s)||n.endAt&&!(function(o,u,c){const h=kc(o,u,c);return o.inclusive?h>=0:h>0})(n.endAt,Nn(n),s))})(r,e)}function jh(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function $h(r){return(e,t)=>{let n=!1;for(const s of Nn(r)){const i=f_(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function f_(r,e,t){const n=r.field.isKeyField()?M.comparator(e.key,t.key):(function(i,o,u){const c=o.data.field(i),h=u.data.field(i);return c!==null&&h!==null?kt(c,h):F()})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return F()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){jt(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return Rh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_=new se(M.comparator);function Be(){return m_}const zh=new se(M.comparator);function kr(...r){let e=zh;for(const t of r)e=e.insert(t.key,t);return e}function Gh(r){let e=zh;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function Je(){return Lr()}function Kh(){return Lr()}function Lr(){return new ft((r=>r.toString()),((r,e)=>r.isEqual(e)))}const p_=new se(M.comparator),g_=new te(M.comparator);function K(...r){let e=g_;for(const t of r)e=e.add(t);return e}const __=new te(z);function ha(){return __}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Kr(e)?"-0":e}}function Qh(r){return{integerValue:""+r}}function Wh(r,e){return Th(e)?Qh(e):da(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(){this._=void 0}}function y_(r,e,t){return r instanceof jn?(function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ii(i)&&(i=Ti(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}})(t,e):r instanceof ln?Jh(r,e):r instanceof hn?Yh(r,e):(function(s,i){const o=Hh(s,i),u=Lc(o)+Lc(s.Pe);return Mo(o)&&Mo(s.Pe)?Qh(u):da(s.serializer,u)})(r,e)}function I_(r,e,t){return r instanceof ln?Jh(r,e):r instanceof hn?Yh(r,e):t}function Hh(r,e){return r instanceof $n?(function(n){return Mo(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(e)?e:{integerValue:0}:null}class jn extends wi{}class ln extends wi{constructor(e){super(),this.elements=e}}function Jh(r,e){const t=Xh(e);for(const n of r.elements)t.some((s=>et(s,n)))||t.push(n);return{arrayValue:{values:t}}}class hn extends wi{constructor(e){super(),this.elements=e}}function Yh(r,e){let t=Xh(e);for(const n of r.elements)t=t.filter((s=>!et(s,n)));return{arrayValue:{values:t}}}class $n extends wi{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Lc(r){return ue(r.integerValue||r.doubleValue)}function Xh(r){return Hr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,t){this.field=e,this.transform=t}}function T_(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof ln&&s instanceof ln||n instanceof hn&&s instanceof hn?Fn(n.elements,s.elements,et):n instanceof $n&&s instanceof $n?et(n.Pe,s.Pe):n instanceof jn&&s instanceof jn})(r.transform,e.transform)}class E_{constructor(e,t){this.version=e,this.transformResults=t}}class ce{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ce}static exists(e){return new ce(void 0,e)}static updateTime(e){return new ce(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ws(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class vi{}function Zh(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new tr(r.key,ce.none()):new er(r.key,r.data,ce.none());{const t=r.data,n=Re.empty();let s=new te(ae.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new mt(r.key,n,new Le(s.toArray()),ce.none())}}function w_(r,e,t){r instanceof er?(function(s,i,o){const u=s.value.clone(),c=Uc(s.fieldTransforms,i,o.transformResults);u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()})(r,e,t):r instanceof mt?(function(s,i,o){if(!Ws(s.precondition,i))return void i.convertToUnknownDocument(o.version);const u=Uc(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(ed(s)),c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(r,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Br(r,e,t,n){return r instanceof er?(function(i,o,u,c){if(!Ws(i.precondition,o))return u;const h=i.value.clone(),f=qc(i.fieldTransforms,c,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(r,e,t,n):r instanceof mt?(function(i,o,u,c){if(!Ws(i.precondition,o))return u;const h=qc(i.fieldTransforms,c,o),f=o.data;return f.setAll(ed(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(r,e,t,n):(function(i,o,u){return Ws(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u})(r,e,t)}function v_(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Hh(n.transform,s||null);i!=null&&(t===null&&(t=Re.empty()),t.set(n.field,i))}return t||null}function Bc(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Fn(n,s,((i,o)=>T_(i,o)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class er extends vi{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class mt extends vi{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ed(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function Uc(r,e,t){const n=new Map;B(r.length===t.length);for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,u=e.data.field(i.field);n.set(i.field,I_(o,u,t[s]))}return n}function qc(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,y_(i,o,e))}return n}class tr extends vi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class fa extends vi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&w_(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Br(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Br(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Kh();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let u=this.applyToLocalView(o,i.mutatedFields);u=t.has(s.key)?null:u;const c=Zh(o,u);c!==null&&n.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(q.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),K())}isEqual(e){return this.batchId===e.batchId&&Fn(this.mutations,e.mutations,((t,n)=>Bc(t,n)))&&Fn(this.baseMutations,e.baseMutations,((t,n)=>Bc(t,n)))}}class pa{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){B(e.mutations.length===n.length);let s=(function(){return p_})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new pa(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ga{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(e,t,n){this.alias=e,this.aggregateType=t,this.fieldPath=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ye,Y;function nd(r){switch(r){default:return F();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function rd(r){if(r===void 0)return pe("GRPC error has no .code"),P.UNKNOWN;switch(r){case ye.OK:return P.OK;case ye.CANCELLED:return P.CANCELLED;case ye.UNKNOWN:return P.UNKNOWN;case ye.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ye.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ye.INTERNAL:return P.INTERNAL;case ye.UNAVAILABLE:return P.UNAVAILABLE;case ye.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ye.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ye.NOT_FOUND:return P.NOT_FOUND;case ye.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ye.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ye.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ye.ABORTED:return P.ABORTED;case ye.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ye.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ye.DATA_LOSS:return P.DATA_LOSS;default:return F()}}(Y=ye||(ye={}))[Y.OK=0]="OK",Y[Y.CANCELLED=1]="CANCELLED",Y[Y.UNKNOWN=2]="UNKNOWN",Y[Y.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Y[Y.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Y[Y.NOT_FOUND=5]="NOT_FOUND",Y[Y.ALREADY_EXISTS=6]="ALREADY_EXISTS",Y[Y.PERMISSION_DENIED=7]="PERMISSION_DENIED",Y[Y.UNAUTHENTICATED=16]="UNAUTHENTICATED",Y[Y.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Y[Y.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Y[Y.ABORTED=10]="ABORTED",Y[Y.OUT_OF_RANGE=11]="OUT_OF_RANGE",Y[Y.UNIMPLEMENTED=12]="UNIMPLEMENTED",Y[Y.INTERNAL=13]="INTERNAL",Y[Y.UNAVAILABLE=14]="UNAVAILABLE",Y[Y.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ni=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sd(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_=new on([4294967295,4294967295],0);function jc(r){const e=sd().encode(r),t=new ih;return t.update(e),new Uint8Array(t.digest())}function $c(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new on([t,n],0),new on([s,i],0)]}class _a{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Nr(`Invalid padding: ${t}`);if(n<0)throw new Nr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Nr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Nr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=on.fromNumber(this.Ie)}Ee(e,t,n){let s=e.add(t.multiply(on.fromNumber(n)));return s.compare(b_)===1&&(s=new on([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=jc(e),[n,s]=$c(t);for(let i=0;i<this.hashCount;i++){const o=this.Ee(n,s,i);if(!this.de(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new _a(i,s,t);return n.forEach((u=>o.insert(u))),o}insert(e){if(this.Ie===0)return;const t=jc(e),[n,s]=$c(t);for(let i=0;i<this.hashCount;i++){const o=this.Ee(n,s,i);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Nr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,as.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new os(q.min(),s,new se(z),Be(),K())}}class as{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new as(n,t,K(),K(),K())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,t,n,s){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=s}}class id{constructor(e,t){this.targetId=e,this.me=t}}class od{constructor(e,t,n=de.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class zc{constructor(){this.fe=0,this.ge=Kc(),this.pe=de.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=K(),t=K(),n=K();return this.ge.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:F()}})),new as(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=Kc()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,B(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class R_{constructor(e){this.Le=e,this.Be=new Map,this.ke=Be(),this.qe=Gc(),this.Qe=new se(z)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,(t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:F()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach(((n,s)=>{this.ze(s)&&t(s)}))}He(e){const t=e.targetId,n=e.me.count,s=this.Je(t);if(s){const i=s.target;if(Zs(i))if(n===0){const o=new M(i.path);this.Ue(t,o,oe.newNoDocument(o,q.min()))}else B(n===1);else{const o=this.Ye(t);if(o!==n){const u=this.Ze(e),c=u?this.Xe(u,e,o):1;if(c!==0){this.je(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}ni?.et((function(f,m,g,w,C){var x,V,U,j,L,$;const J={localCacheCount:f,existenceFilterCount:m.count,databaseId:g.database,projectId:g.projectId},G=m.unchangedNames;return G&&(J.bloomFilter={applied:C===0,hashCount:(x=G?.hashCount)!==null&&x!==void 0?x:0,bitmapLength:(j=(U=(V=G?.bits)===null||V===void 0?void 0:V.bitmap)===null||U===void 0?void 0:U.length)!==null&&j!==void 0?j:0,padding:($=(L=G?.bits)===null||L===void 0?void 0:L.padding)!==null&&$!==void 0?$:0,mightContain:T=>{var _;return(_=w?.mightContain(T))!==null&&_!==void 0&&_}}),J})(o,e.me,this.Le.tt(),u,c))}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,u;try{o=lt(n).toUint8Array()}catch(c){if(c instanceof Ph)return $e("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new _a(o,s,i)}catch(c){return $e(c instanceof Nr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.Ie===0?null:u}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const o=this.Le.tt(),u=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.Ue(t,i,null),s++)})),s}rt(e){const t=new Map;this.Be.forEach(((i,o)=>{const u=this.Je(o);if(u){if(i.current&&Zs(u.target)){const c=new M(u.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,oe.newNoDocument(c,e))}i.be&&(t.set(o,i.ve()),i.Ce())}}));let n=K();this.qe.forEach(((i,o)=>{let u=!0;o.forEachWhile((c=>{const h=this.Je(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(n=n.add(i))})),this.ke.forEach(((i,o)=>o.setReadTime(e)));const s=new os(e,t,this.Qe,this.ke,n);return this.ke=Be(),this.qe=Gc(),this.Qe=new se(z),s}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new zc,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new te(z),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||k("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new zc),this.Le.getRemoteKeysForTarget(e).forEach((t=>{this.Ue(e,t,null)}))}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Gc(){return new se(M.comparator)}function Kc(){return new se(M.comparator)}const P_={asc:"ASCENDING",desc:"DESCENDING"},S_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},V_={and:"AND",or:"OR"};class C_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function qo(r,e){return r.useProto3Json||ts(e)?e:{value:e}}function zn(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ad(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function D_(r,e){return zn(r,e.toTimestamp())}function ge(r){return B(!!r),q.fromTimestamp((function(t){const n=ct(t);return new le(n.seconds,n.nanos)})(r))}function ya(r,e){return jo(r,e).canonicalString()}function jo(r,e){const t=(function(s){return new W(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function ud(r){const e=W.fromString(r);return B(yd(e)),e}function Yr(r,e){return ya(r.databaseId,e.path)}function Xe(r,e){const t=ud(e);if(t.get(1)!==r.databaseId.projectId)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new D(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new M(hd(t))}function cd(r,e){return ya(r.databaseId,e)}function ld(r){const e=ud(r);return e.length===4?W.emptyPath():hd(e)}function $o(r){return new W(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function hd(r){return B(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Qc(r,e,t){return{name:Yr(r,e),fields:t.value.mapValue.fields}}function dd(r,e,t){const n=Xe(r,e.name),s=ge(e.updateTime),i=e.createTime?ge(e.createTime):q.min(),o=new Re({mapValue:{fields:e.fields}}),u=oe.newFoundDocument(n,s,i,o);return t&&u.setHasCommittedMutations(),t?u.setHasCommittedMutations():u}function x_(r,e){return"found"in e?(function(n,s){B(!!s.found),s.found.name,s.found.updateTime;const i=Xe(n,s.found.name),o=ge(s.found.updateTime),u=s.found.createTime?ge(s.found.createTime):q.min(),c=new Re({mapValue:{fields:s.found.fields}});return oe.newFoundDocument(i,o,u,c)})(r,e):"missing"in e?(function(n,s){B(!!s.missing),B(!!s.readTime);const i=Xe(n,s.missing),o=ge(s.readTime);return oe.newNoDocument(i,o)})(r,e):F()}function k_(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:F()})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(B(f===void 0||typeof f=="string"),de.fromBase64String(f||"")):(B(f===void 0||f instanceof Buffer||f instanceof Uint8Array),de.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),o=e.targetChange.cause,u=o&&(function(h){const f=h.code===void 0?P.UNKNOWN:rd(h.code);return new D(f,h.message||"")})(o);t=new od(n,s,i,u||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=Xe(r,n.document.name),i=ge(n.document.updateTime),o=n.document.createTime?ge(n.document.createTime):q.min(),u=new Re({mapValue:{fields:n.document.fields}}),c=oe.newFoundDocument(s,i,o,u),h=n.targetIds||[],f=n.removedTargetIds||[];t=new Hs(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=Xe(r,n.document),i=n.readTime?ge(n.readTime):q.min(),o=oe.newNoDocument(s,i),u=n.removedTargetIds||[];t=new Hs([],u,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=Xe(r,n.document),i=n.removedTargetIds||[];t=new Hs([],i,s,null)}else{if(!("filter"in e))return F();{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new A_(s,i),u=n.targetId;t=new id(u,o)}}return t}function Xr(r,e){let t;if(e instanceof er)t={update:Qc(r,e.key,e.value)};else if(e instanceof tr)t={delete:Yr(r,e.key)};else if(e instanceof mt)t={update:Qc(r,e.key,e.data),updateMask:B_(e.fieldMask)};else{if(!(e instanceof fa))return F();t={verify:Yr(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,o){const u=o.transform;if(u instanceof jn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof ln)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof hn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof $n)return{fieldPath:o.field.canonicalString(),increment:u.Pe};throw F()})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:D_(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:F()})(r,e.precondition)),t}function zo(r,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?ce.updateTime(ge(i.updateTime)):i.exists!==void 0?ce.exists(i.exists):ce.none()})(e.currentDocument):ce.none(),n=e.updateTransforms?e.updateTransforms.map((s=>(function(o,u){let c=null;if("setToServerValue"in u)B(u.setToServerValue==="REQUEST_TIME"),c=new jn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new ln(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new hn(f)}else"increment"in u?c=new $n(o,u.increment):F();const h=ae.fromServerFormat(u.fieldPath);return new is(h,c)})(r,s))):[];if(e.update){e.update.name;const s=Xe(r,e.update.name),i=new Re({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(c){const h=c.fieldPaths||[];return new Le(h.map((f=>ae.fromServerFormat(f))))})(e.updateMask);return new mt(s,i,o,t,n)}return new er(s,i,t,n)}if(e.delete){const s=Xe(r,e.delete);return new tr(s,t)}if(e.verify){const s=Xe(r,e.verify);return new fa(s,t)}return F()}function N_(r,e){return r&&r.length>0?(B(e!==void 0),r.map((t=>(function(s,i){let o=s.updateTime?ge(s.updateTime):ge(i);return o.isEqual(q.min())&&(o=ge(i)),new E_(o,s.transformResults||[])})(t,e)))):[]}function fd(r,e){return{documents:[cd(r,e.path)]}}function Ai(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=cd(r,s);const i=(function(h){if(h.length!==0)return _d(ee.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(g){return{field:wt(g.field),direction:M_(g.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const u=qo(r,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{_t:t,parent:s}}function md(r,e,t,n){const{_t:s,parent:i}=Ai(r,e),o={},u=[];let c=0;return t.forEach((h=>{const f=n?h.alias:"aggregate_"+c++;o[f]=h.alias,h.aggregateType==="count"?u.push({alias:f,count:{}}):h.aggregateType==="avg"?u.push({alias:f,avg:{field:wt(h.fieldPath)}}):h.aggregateType==="sum"&&u.push({alias:f,sum:{field:wt(h.fieldPath)}})})),{request:{structuredAggregationQuery:{aggregations:u,structuredQuery:s.structuredQuery},parent:s.parent},ut:o,parent:i}}function pd(r){let e=ld(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){B(n===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(m){const g=gd(m);return g instanceof ee&&ca(g)?g.getFilters():[g]})(t.where));let o=[];t.orderBy&&(o=(function(m){return m.map((g=>(function(C){return new Jr(xn(C.field),(function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(g)))})(t.orderBy));let u=null;t.limit&&(u=(function(m){let g;return g=typeof m=="object"?m.value:m,ts(g)?null:g})(t.limit));let c=null;t.startAt&&(c=(function(m){const g=!!m.before,w=m.values||[];return new Nt(w,g)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const g=!m.before,w=m.values||[];return new Nt(w,g)})(t.endAt)),Lh(e,s,o,i,u,"F",c,h)}function O_(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F()}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function gd(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=xn(t.unaryFilter.field);return H.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=xn(t.unaryFilter.field);return H.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=xn(t.unaryFilter.field);return H.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=xn(t.unaryFilter.field);return H.create(o,"!=",{nullValue:"NULL_VALUE"});default:return F()}})(r):r.fieldFilter!==void 0?(function(t){return H.create(xn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return F()}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ee.create(t.compositeFilter.filters.map((n=>gd(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F()}})(t.compositeFilter.op))})(r):F()}function M_(r){return P_[r]}function F_(r){return S_[r]}function L_(r){return V_[r]}function wt(r){return{fieldPath:r.canonicalString()}}function xn(r){return ae.fromServerFormat(r.fieldPath)}function _d(r){return r instanceof H?(function(t){if(t.op==="=="){if(Cc(t.value))return{unaryFilter:{field:wt(t.field),op:"IS_NAN"}};if(Vc(t.value))return{unaryFilter:{field:wt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Cc(t.value))return{unaryFilter:{field:wt(t.field),op:"IS_NOT_NAN"}};if(Vc(t.value))return{unaryFilter:{field:wt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:wt(t.field),op:F_(t.op),value:t.value}}})(r):r instanceof ee?(function(t){const n=t.getFilters().map((s=>_d(s)));return n.length===1?n[0]:{compositeFilter:{op:L_(t.op),filters:n}}})(r):F()}function B_(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function yd(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e,t,n,s,i=q.min(),o=q.min(),u=de.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new ot(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ot(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ot(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ot(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(e){this.ct=e}}function U_(r,e){let t;if(e.document)t=dd(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=M.fromSegments(e.noDocument.path),s=fn(e.noDocument.readTime);t=oe.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return F();{const n=M.fromSegments(e.unknownDocument.path),s=fn(e.unknownDocument.version);t=oe.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime((function(s){const i=new le(s[0],s[1]);return q.fromTimestamp(i)})(e.readTime)),t}function Wc(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:ri(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(i,o){return{name:Yr(i,o.key),fields:o.data.value.mapValue.fields,updateTime:zn(i,o.version.toTimestamp()),createTime:zn(i,o.createTime.toTimestamp())}})(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:dn(e.version)};else{if(!e.isUnknownDocument())return F();n.unknownDocument={path:t.path.toArray(),version:dn(e.version)}}return n}function ri(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function dn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function fn(r){const e=new le(r.seconds,r.nanoseconds);return q.fromTimestamp(e)}function tn(r,e){const t=(e.baseMutations||[]).map((i=>zo(r.ct,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const u=e.mutations[i+1];o.updateTransforms=u.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map((i=>zo(r.ct,i))),s=le.fromMillis(e.localWriteTimeMs);return new ma(e.batchId,s,t,n)}function Or(r){const e=fn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?fn(r.lastLimboFreeSnapshotVersion):q.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){return B(i.documents.length===1),Ne(Zn(ld(i.documents[0])))})(r.query):(function(i){return Ne(pd(i))})(r.query),new ot(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,de.fromBase64String(r.resumeToken))}function Td(r,e){const t=dn(e.snapshotVersion),n=dn(e.lastLimboFreeSnapshotVersion);let s;s=Zs(e.target)?fd(r.ct,e.target):Ai(r.ct,e.target)._t;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:cn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Ia(r){const e=pd({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?ti(e,e.limit,"L"):e}function yo(r,e){return new ga(e.largestBatchId,zo(r.ct,e.overlayMutation))}function Hc(r,e){const t=e.path.lastSegment();return[r,ke(e.path.popLast()),t]}function Jc(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:dn(n.readTime),documentKey:ke(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{getBundleMetadata(e,t){return Yc(e).get(t).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:fn(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(e,t){return Yc(e).put((function(s){return{bundleId:s.id,createTime:dn(ge(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return Xc(e).get(t).next((n=>{if(n)return(function(i){return{name:i.name,query:Ia(i.bundledQuery),readTime:fn(i.readTime)}})(n)}))}saveNamedQuery(e,t){return Xc(e).put((function(s){return{name:s.name,readTime:dn(ge(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function Yc(r){return Ie(r,"bundles")}function Xc(r){return Ie(r,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new bi(e,n)}getOverlay(e,t){return Pr(e).get(Hc(this.userId,t)).next((n=>n?yo(this.serializer,n):null))}getOverlays(e,t){const n=Je();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){const s=[];return n.forEach(((i,o)=>{const u=new ga(t,o);s.push(this.ht(e,u))})),A.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach((o=>s.add(ke(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const u=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(Pr(e).j("collectionPathOverlayIndex",u))})),A.waitFor(i)}getOverlaysForCollection(e,t,n){const s=Je(),i=ke(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Pr(e).U("collectionPathOverlayIndex",o).next((u=>{for(const c of u){const h=yo(this.serializer,c);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(e,t,n,s){const i=Je();let o;const u=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Pr(e).J({index:"collectionGroupOverlayIndex",range:u},((c,h,f)=>{const m=yo(this.serializer,h);i.size()<s||m.largestBatchId===o?(i.set(m.getKey(),m),o=m.largestBatchId):f.done()})).next((()=>i))}ht(e,t){return Pr(e).put((function(s,i,o){const[u,c,h]=Hc(i,o.mutation.key);return{userId:i,collectionPath:c,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Xr(s.ct,o.mutation)}})(this.serializer,this.userId,t))}}function Pr(r){return Ie(r,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j_{Pt(e){return Ie(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next((t=>{const n=t?.value;return n?de.fromUint8Array(n):de.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(ue(e.integerValue));else if("doubleValue"in e){const n=ue(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),Kr(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=ct(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(lt(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?Sh(e)?this.dt(t,Number.MAX_SAFE_INTEGER):Ei(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):F()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const s of Object.keys(n))this.Vt(s,t),this.Tt(n[s],t)}wt(e,t){var n,s;const i=e.fields||{};this.dt(t,53);const o="value",u=((s=(n=i[o].arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.length)||0;this.dt(t,15),t.At(ue(u)),this.Vt(o,t),this.Tt(i[o],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const s of n)this.Tt(s,t)}yt(e,t){this.dt(t,37),M.fromName(e).path.forEach((n=>{this.dt(t,60),this.Dt(n,t)}))}dt(e,t){e.At(t)}ft(e){e.At(2)}}nn.vt=new nn;function $_(r){if(r===0)return 8;let e=0;return r>>4==0&&(e+=4,r<<=4),r>>6==0&&(e+=2,r<<=2),r>>7==0&&(e+=1),e}function Zc(r){const e=64-(function(n){let s=0;for(let i=0;i<8;++i){const o=$_(255&n[i]);if(s+=o,o!==8)break}return s})(r);return Math.ceil(e/8)}class z_{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const s=t.codePointAt(0);this.Ft(240|s>>>18),this.Ft(128|63&s>>>12),this.Ft(128|63&s>>>6),this.Ft(128|63&s)}}this.Mt()}Bt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const s=t.codePointAt(0);this.Ot(240|s>>>18),this.Ot(128|63&s>>>12),this.Ot(128|63&s>>>6),this.Ot(128|63&s)}}this.Nt()}kt(e){const t=this.qt(e),n=Zc(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Kt(e){const t=this.qt(e),n=Zc(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class G_{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class K_{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Sr{constructor(){this.jt=new z_,this.Ht=new G_(this.jt),this.Jt=new K_(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t,n,s){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=s}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new rn(this.indexId,this.documentKey,this.arrayValue,n)}}function Tt(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=el(r.arrayValue,e.arrayValue),t!==0?t:(t=el(r.directionalValue,e.directionalValue),t!==0?t:M.comparator(r.documentKey,e.documentKey)))}function el(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(e){this.Xt=new te(((t,n)=>ae.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(B(e.collectionGroup===this.collectionId),this.nn)return!1;const t=ko(e);if(t!==void 0&&!this.sn(t))return!1;const n=Zt(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.sn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Xt.size>0){const u=this.Xt.getIterator().getNext();if(!s.has(u.field.canonicalString())){const c=n[i];if(!this.on(u,c)||!this._n(this.en[o++],c))return!1}++i}for(;i<n.length;++i){const u=n[i];if(o>=this.en.length||!this._n(this.en[o++],u))return!1}return!0}an(){if(this.nn)return null;let e=new te(ae.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new an(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new an(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new an(n.field,n.dir==="asc"?0:1)));return new Ln(Ln.UNKNOWN_ID,this.collectionId,t,Bn.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(r){var e,t;if(B(r instanceof H||r instanceof ee),r instanceof H){if(r instanceof Fh){const s=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map((i=>H.create(r.field,"==",i))))||[];return ee.create(s,"or")}return r}const n=r.filters.map((s=>Ed(s)));return ee.create(n,r.op)}function Q_(r){if(r.getFilters().length===0)return[];const e=Qo(Ed(r));return B(wd(e)),Go(e)||Ko(e)?[e]:e.getFilters()}function Go(r){return r instanceof H}function Ko(r){return r instanceof ee&&ca(r)}function wd(r){return Go(r)||Ko(r)||(function(t){if(t instanceof ee&&Fo(t)){for(const n of t.getFilters())if(!Go(n)&&!Ko(n))return!1;return!0}return!1})(r)}function Qo(r){if(B(r instanceof H||r instanceof ee),r instanceof H)return r;if(r.filters.length===1)return Qo(r.filters[0]);const e=r.filters.map((n=>Qo(n)));let t=ee.create(e,r.op);return t=si(t),wd(t)?t:(B(t instanceof ee),B(qn(t)),B(t.filters.length>1),t.filters.reduce(((n,s)=>Ta(n,s))))}function Ta(r,e){let t;return B(r instanceof H||r instanceof ee),B(e instanceof H||e instanceof ee),t=r instanceof H?e instanceof H?(function(s,i){return ee.create([s,i],"and")})(r,e):nl(r,e):e instanceof H?nl(e,r):(function(s,i){if(B(s.filters.length>0&&i.filters.length>0),qn(s)&&qn(i))return Nh(s,i.getFilters());const o=Fo(s)?s:i,u=Fo(s)?i:s,c=o.filters.map((h=>Ta(h,u)));return ee.create(c,"or")})(r,e),si(t)}function nl(r,e){if(qn(e))return Nh(e,r.getFilters());{const t=e.filters.map((n=>Ta(r,n)));return ee.create(t,"or")}}function si(r){if(B(r instanceof H||r instanceof ee),r instanceof H)return r;const e=r.getFilters();if(e.length===1)return si(e[0]);if(xh(r))return r;const t=e.map((s=>si(s))),n=[];return t.forEach((s=>{s instanceof H?n.push(s):s instanceof ee&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:ee.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(){this.un=new Ea}addToCollectionParentIndex(e,t){return this.un.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(ze.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(ze.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class Ea{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new te(W.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new te(W.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs=new Uint8Array(0);class H_{constructor(e,t){this.databaseId=t,this.cn=new Ea,this.ln=new ft((n=>cn(n)),((n,s)=>ns(n,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.cn.add(t)}));const i={collectionId:n,parent:ke(s)};return rl(e).put(i)}return A.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[mh(t),""],!1,!0);return rl(e).U(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;n.push(He(o.parent))}return n}))}addFieldIndex(e,t){const n=Vr(e),s=(function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map((c=>[c.fieldPath.canonicalString(),c.kind]))}})(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=Sn(e);return i.next((u=>{o.put(Jc(u,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const n=Vr(e),s=Sn(e),i=Pn(e);return n.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Vr(e),n=Pn(e),s=Sn(e);return t.j().next((()=>n.j())).next((()=>s.j()))}createTargetIndexes(e,t){return A.forEach(this.hn(t),(n=>this.getIndexType(e,n).next((s=>{if(s===0||s===1){const i=new tl(n).an();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const n=Pn(e);let s=!0;const i=new Map;return A.forEach(this.hn(t),(o=>this.Pn(e,o).next((u=>{s&&(s=!!u),i.set(o,u)})))).next((()=>{if(s){let o=K();const u=[];return A.forEach(i,((c,h)=>{k("IndexedDbIndexManager",`Using index ${(function(L){return`id=${L.indexId}|cg=${L.collectionGroup}|f=${L.fields.map(($=>`${$.fieldPath}:${$.kind}`)).join(",")}`})(c)} to execute ${cn(t)}`);const f=(function(L,$){const J=ko($);if(J===void 0)return null;for(const G of ei(L,J.fieldPath))switch(G.op){case"array-contains-any":return G.value.arrayValue.values||[];case"array-contains":return[G.value]}return null})(h,c),m=(function(L,$){const J=new Map;for(const G of Zt($))for(const T of ei(L,G.fieldPath))switch(T.op){case"==":case"in":J.set(G.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return J.set(G.fieldPath.canonicalString(),T.value),Array.from(J.values())}return null})(h,c),g=(function(L,$){const J=[];let G=!0;for(const T of Zt($)){const _=T.kind===0?Oc(L,T.fieldPath,L.startAt):Mc(L,T.fieldPath,L.startAt);J.push(_.value),G&&(G=_.inclusive)}return new Nt(J,G)})(h,c),w=(function(L,$){const J=[];let G=!0;for(const T of Zt($)){const _=T.kind===0?Mc(L,T.fieldPath,L.endAt):Oc(L,T.fieldPath,L.endAt);J.push(_.value),G&&(G=_.inclusive)}return new Nt(J,G)})(h,c),C=this.In(c,h,g),x=this.In(c,h,w),V=this.Tn(c,h,m),U=this.En(c.indexId,f,C,g.inclusive,x,w.inclusive,V);return A.forEach(U,(j=>n.G(j,t.limit).next((L=>{L.forEach(($=>{const J=M.fromSegments($.documentKey);o.has(J)||(o=o.add(J),u.push(J))}))}))))})).next((()=>u))}return A.resolve(null)}))}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=Q_(ee.create(e.filters,"and")).map((n=>Bo(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.ln.set(e,t),t)}En(e,t,n,s,i,o,u){const c=(t!=null?t.length:1)*Math.max(n.length,i.length),h=c/(t!=null?t.length:1),f=[];for(let m=0;m<c;++m){const g=t?this.dn(t[m/h]):Fs,w=this.An(e,g,n[m%h],s),C=this.Rn(e,g,i[m%h],o),x=u.map((V=>this.An(e,g,V,!0)));f.push(...this.createRange(w,C,x))}return f}An(e,t,n,s){const i=new rn(e,M.empty(),t,n);return s?i:i.Zt()}Rn(e,t,n,s){const i=new rn(e,M.empty(),t,n);return s?i.Zt():i}Pn(e,t){const n=new tl(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const u of i)n.rn(u)&&(!o||u.fields.length>o.fields.length)&&(o=u);return o}))}getIndexType(e,t){let n=2;const s=this.hn(t);return A.forEach(s,(i=>this.Pn(e,i).next((o=>{o?n!==0&&o.fields.length<(function(c){let h=new te(ae.comparator),f=!1;for(const m of c.filters)for(const g of m.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:h=h.add(g.field));for(const m of c.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&n===2?1:n))}Vn(e,t){const n=new Sr;for(const s of Zt(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.Yt(s.kind);nn.vt.It(i,o)}return n.zt()}dn(e){const t=new Sr;return nn.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new Sr;return nn.vt.It(un(this.databaseId,t),n.Yt((function(i){const o=Zt(i);return o.length===0?0:o[o.length-1].kind})(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let s=[];s.push(new Sr);let i=0;for(const o of Zt(e)){const u=n[i++];for(const c of s)if(this.fn(t,o.fieldPath)&&Hr(u))s=this.gn(s,o,u);else{const h=c.Yt(o.kind);nn.vt.It(u,h)}}return this.pn(s)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const u of s){const c=new Sr;c.seed(u.zt()),nn.vt.It(o,c.Yt(t.kind)),i.push(c)}return i}fn(e,t){return!!e.filters.find((n=>n instanceof H&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=Vr(e),s=Sn(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next((i=>{const o=[];return A.forEach(i,(u=>s.get([u.indexId,this.uid]).next((c=>{o.push((function(f,m){const g=m?new Bn(m.sequenceNumber,new ze(fn(m.readTime),new M(He(m.documentKey)),m.largestBatchId)):Bn.empty(),w=f.fields.map((([C,x])=>new an(ae.fromServerFormat(C),x)));return new Ln(f.indexId,f.collectionGroup,w,g)})(u,c))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:z(n.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const s=Vr(e),i=Sn(e);return this.yn(e).next((o=>s.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next((u=>A.forEach(u,(c=>i.put(Jc(c.indexId,this.uid,o,n))))))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,((s,i)=>{const o=n.get(s.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((u=>(n.set(s.collectionGroup,u),A.forEach(u,(c=>this.wn(e,s,c).next((h=>{const f=this.Sn(i,c);return h.isEqual(f)?A.resolve():this.bn(e,i,c,h,f)})))))))}))}Dn(e,t,n,s){return Pn(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,s){return Pn(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const s=Pn(e);let i=new te(Tt);return s.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},((o,u)=>{i=i.add(new rn(n.indexId,t,u.arrayValue,u.directionalValue))})).next((()=>i))}Sn(e,t){let n=new te(Tt);const s=this.Vn(t,e);if(s==null)return n;const i=ko(t);if(i!=null){const o=e.data.field(i.fieldPath);if(Hr(o))for(const u of o.arrayValue.values||[])n=n.add(new rn(t.indexId,e.key,this.dn(u),s))}else n=n.add(new rn(t.indexId,e.key,Fs,s));return n}bn(e,t,n,s,i){k("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return(function(c,h,f,m,g){const w=c.getIterator(),C=h.getIterator();let x=Rn(w),V=Rn(C);for(;x||V;){let U=!1,j=!1;if(x&&V){const L=f(x,V);L<0?j=!0:L>0&&(U=!0)}else x!=null?j=!0:U=!0;U?(m(V),V=Rn(C)):j?(g(x),x=Rn(w)):(x=Rn(w),V=Rn(C))}})(s,i,Tt,(u=>{o.push(this.Dn(e,t,n,u))}),(u=>{o.push(this.vn(e,t,n,u))})),A.waitFor(o)}yn(e){let t=1;return Sn(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((o,u)=>Tt(o,u))).filter(((o,u,c)=>!u||Tt(o,c[u-1])!==0));const s=[];s.push(e);for(const o of n){const u=Tt(o,e),c=Tt(o,t);if(u===0)s[0]=e.Zt();else if(u>0&&c<0)s.push(o),s.push(o.Zt());else if(c>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Cn(s[o],s[o+1]))return[];const u=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,Fs,[]],c=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,Fs,[]];i.push(IDBKeyRange.bound(u,c))}return i}Cn(e,t){return Tt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(sl)}getMinOffset(e,t){return A.mapArray(this.hn(t),(n=>this.Pn(e,n).next((s=>s||F())))).next(sl)}}function rl(r){return Ie(r,"collectionParents")}function Pn(r){return Ie(r,"indexEntries")}function Vr(r){return Ie(r,"indexConfiguration")}function Sn(r){return Ie(r,"indexState")}function sl(r){B(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;oa(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new ze(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class xe{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new xe(e,xe.DEFAULT_COLLECTION_PERCENTILE,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vd(r,e,t){const n=r.store("mutations"),s=r.store("documentMutations"),i=[],o=IDBKeyRange.only(t.batchId);let u=0;const c=n.J({range:o},((f,m,g)=>(u++,g.delete())));i.push(c.next((()=>{B(u===1)})));const h=[];for(const f of t.mutations){const m=Eh(e,f.key.path,t.batchId);i.push(s.delete(m)),h.push(f.key)}return A.waitFor(i).next((()=>h))}function ii(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw F();e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xe.DEFAULT_COLLECTION_PERCENTILE=10,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,xe.DEFAULT=new xe(41943040,xe.DEFAULT_COLLECTION_PERCENTILE,xe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),xe.DISABLED=new xe(-1,0,0);class Ri{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Fn={}}static lt(e,t,n,s){B(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new Ri(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Et(e).J({index:"userMutationsIndex",range:n},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,n,s){const i=kn(e),o=Et(e);return o.add({}).next((u=>{B(typeof u=="number");const c=new ma(u,t,n,s),h=(function(w,C,x){const V=x.baseMutations.map((j=>Xr(w.ct,j))),U=x.mutations.map((j=>Xr(w.ct,j)));return{userId:C,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:V,mutations:U}})(this.serializer,this.userId,c),f=[];let m=new te(((g,w)=>z(g.canonicalString(),w.canonicalString())));for(const g of s){const w=Eh(this.userId,g.key.path,u);m=m.add(g.key.path.popLast()),f.push(o.put(h)),f.push(i.put(w,Mg))}return m.forEach((g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))})),e.addOnCommittedListener((()=>{this.Fn[u]=c.keys()})),A.waitFor(f).next((()=>c))}))}lookupMutationBatch(e,t){return Et(e).get(t).next((n=>n?(B(n.userId===this.userId),tn(this.serializer,n)):null))}Mn(e,t){return this.Fn[t]?A.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const s=n.keys();return this.Fn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Et(e).J({index:"userMutationsIndex",range:s},((o,u,c)=>{u.userId===this.userId&&(B(u.batchId>=n),i=tn(this.serializer,u)),c.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return Et(e).J({index:"userMutationsIndex",range:t,reverse:!0},((s,i,o)=>{n=i.batchId,o.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Et(e).U("userMutationsIndex",t).next((n=>n.map((s=>tn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=zs(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return kn(e).J({range:s},((o,u,c)=>{const[h,f,m]=o,g=He(f);if(h===this.userId&&t.path.isEqual(g))return Et(e).get(m).next((w=>{if(!w)throw F();B(w.userId===this.userId),i.push(tn(this.serializer,w))}));c.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(z);const s=[];return t.forEach((i=>{const o=zs(this.userId,i.path),u=IDBKeyRange.lowerBound(o),c=kn(e).J({range:u},((h,f,m)=>{const[g,w,C]=h,x=He(w);g===this.userId&&i.path.isEqual(x)?n=n.add(C):m.done()}));s.push(c)})),A.waitFor(s).next((()=>this.xn(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=zs(this.userId,n),o=IDBKeyRange.lowerBound(i);let u=new te(z);return kn(e).J({range:o},((c,h,f)=>{const[m,g,w]=c,C=He(g);m===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(w)):f.done()})).next((()=>this.xn(e,u)))}xn(e,t){const n=[],s=[];return t.forEach((i=>{s.push(Et(e).get(i).next((o=>{if(o===null)throw F();B(o.userId===this.userId),n.push(tn(this.serializer,o))})))})),A.waitFor(s).next((()=>n))}removeMutationBatch(e,t){return vd(e._e,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.On(t.batchId)})),A.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return kn(e).J({range:n},((i,o,u)=>{if(i[0]===this.userId){const c=He(i[1]);s.push(c)}else u.done()})).next((()=>{B(s.length===0)}))}))}containsKey(e,t){return Ad(e,this.userId,t)}Nn(e){return bd(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""}))}}function Ad(r,e,t){const n=zs(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return kn(r).J({range:i,H:!0},((u,c,h)=>{const[f,m,g]=u;f===e&&m===s&&(o=!0),h.done()})).next((()=>o))}function Et(r){return Ie(r,"mutations")}function kn(r){return Ie(r,"documentMutations")}function bd(r){return Ie(r,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new mn(0)}static kn(){return new mn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next((t=>{const n=new mn(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.qn(e).next((t=>q.fromTimestamp(new le(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.qn(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.qn(e).next((s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Qn(e,s))))}addTargetData(e,t){return this.Kn(e,t).next((()=>this.qn(e).next((n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>Vn(e).delete(t.targetId))).next((()=>this.qn(e))).next((n=>(B(n.targetCount>0),n.targetCount-=1,this.Qn(e,n))))}removeTargets(e,t,n){let s=0;const i=[];return Vn(e).J(((o,u)=>{const c=Or(u);c.sequenceNumber<=t&&n.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(e,c)))})).next((()=>A.waitFor(i))).next((()=>s))}forEachTarget(e,t){return Vn(e).J(((n,s)=>{const i=Or(s);t(i)}))}qn(e){return ol(e).get("targetGlobalKey").next((t=>(B(t!==null),t)))}Qn(e,t){return ol(e).put("targetGlobalKey",t)}Kn(e,t){return Vn(e).put(Td(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next((t=>t.targetCount))}getTargetData(e,t){const n=cn(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Vn(e).J({range:s,index:"queryTargetsIndex"},((o,u,c)=>{const h=Or(u);ns(t,h.target)&&(i=h,c.done())})).next((()=>i))}addMatchingKeys(e,t,n){const s=[],i=vt(e);return t.forEach((o=>{const u=ke(o.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(e,n,o))})),A.waitFor(s)}removeMatchingKeys(e,t,n){const s=vt(e);return A.forEach(t,(i=>{const o=ke(i.path);return A.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])}))}removeMatchingKeysForTargetId(e,t){const n=vt(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=vt(e);let i=K();return s.J({range:n,H:!0},((o,u,c)=>{const h=He(o[1]),f=new M(h);i=i.add(f)})).next((()=>i))}containsKey(e,t){const n=ke(t.path),s=IDBKeyRange.bound([n],[mh(n)],!1,!0);let i=0;return vt(e).J({index:"documentTargetsIndex",H:!0,range:s},(([o,u],c,h)=>{o!==0&&(i++,h.done())})).next((()=>i>0))}ot(e,t){return Vn(e).get(t).next((n=>n?Or(n):null))}}function Vn(r){return Ie(r,"targets")}function ol(r){return Ie(r,"targetGlobal")}function vt(r){return Ie(r,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function al([r,e],[t,n]){const s=z(r,t);return s===0?z(e,n):s}class Y_{constructor(e){this.Un=e,this.buffer=new te(al),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();al(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Rd{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){k("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){qt(t)?k("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await Ut(t)}await this.Hn(3e5)}))}}class X_{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Fe.oe);const n=new Y_(t);return this.Jn.forEachTarget(e,(s=>n.zn(s.sequenceNumber))).next((()=>this.Jn.Zn(e,(s=>n.zn(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(il)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),il):this.Xn(e,t)))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,s,i,o,u,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,o=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(n=m,u=Date.now(),this.removeTargets(e,n,t)))).next((m=>(i=m,c=Date.now(),this.removeOrphanedDocuments(e,n)))).next((m=>(h=Date.now(),Cn()<=X.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(u-o)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${m} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function Pd(r,e){return new X_(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{constructor(e,t){this.db=e,this.garbageCollector=Pd(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}er(e){let t=0;return this.Zn(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,((n,s)=>t(s)))}addReference(e,t,n){return Ls(e,n)}removeReference(e,t,n){return Ls(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Ls(e,t)}nr(e,t){return(function(s,i){let o=!1;return bd(s).Y((u=>Ad(s,u,i).next((c=>(c&&(o=!0),A.resolve(!c)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.tr(e,((o,u)=>{if(u<=t){const c=this.nr(e,o).next((h=>{if(!h)return i++,n.getEntry(e,o).next((()=>(n.removeEntry(o,q.min()),vt(e).delete((function(m){return[0,ke(m.path)]})(o)))))}));s.push(c)}})).next((()=>A.waitFor(s))).next((()=>n.apply(e))).next((()=>i))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Ls(e,t)}tr(e,t){const n=vt(e);let s,i=Fe.oe;return n.J({index:"documentTargetsIndex"},(([o,u],{path:c,sequenceNumber:h})=>{o===0?(i!==Fe.oe&&t(new M(He(s)),i),i=h,s=c):i=Fe.oe})).next((()=>{i!==Fe.oe&&t(new M(He(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Ls(r,e){return vt(r).put((function(n,s){return{targetId:0,path:ke(n.path),sequenceNumber:s}})(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(){this.changes=new ft((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,oe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Yt(e).put(n)}removeEntry(e,t,n){return Yt(e).delete((function(i,o){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],ri(o),u[u.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.rr(e,n))))}getEntry(e,t){let n=oe.newInvalidDocument(t);return Yt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Cr(t))},((s,i)=>{n=this.ir(t,i)})).next((()=>n))}sr(e,t){let n={size:0,document:oe.newInvalidDocument(t)};return Yt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Cr(t))},((s,i)=>{n={document:this.ir(t,i),size:ii(i)}})).next((()=>n))}getEntries(e,t){let n=Be();return this._r(e,t,((s,i)=>{const o=this.ir(s,i);n=n.insert(s,o)})).next((()=>n))}ar(e,t){let n=Be(),s=new se(M.comparator);return this._r(e,t,((i,o)=>{const u=this.ir(i,o);n=n.insert(i,u),s=s.insert(i,ii(o))})).next((()=>({documents:n,ur:s})))}_r(e,t,n){if(t.isEmpty())return A.resolve();let s=new te(ll);t.forEach((c=>s=s.add(c)));const i=IDBKeyRange.bound(Cr(s.first()),Cr(s.last())),o=s.getIterator();let u=o.getNext();return Yt(e).J({index:"documentKeyIndex",range:i},((c,h,f)=>{const m=M.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&ll(u,m)<0;)n(u,null),u=o.getNext();u&&u.isEqual(m)&&(n(u,h),u=o.hasNext()?o.getNext():null),u?f.$(Cr(u)):f.done()})).next((()=>{for(;u;)n(u,null),u=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,u=[o.popLast().toArray(),o.lastSegment(),ri(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Yt(e).U(IDBKeyRange.bound(u,c,!0)).next((h=>{i?.incrementDocumentReadCount(h.length);let f=Be();for(const m of h){const g=this.ir(M.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);g.isFoundDocument()&&(ss(t,g)||s.has(g.key))&&(f=f.insert(g.key,g))}return f}))}getAllFromCollectionGroup(e,t,n,s){let i=Be();const o=cl(t,n),u=cl(t,ze.max());return Yt(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,u,!0)},((c,h,f)=>{const m=this.ir(M.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new ty(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return ul(e).get("remoteDocumentGlobalKey").next((t=>(B(!!t),t)))}rr(e,t){return ul(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const n=U_(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(q.min())))return n}return oe.newInvalidDocument(e)}}function Vd(r){return new ey(r)}class ty extends Sd{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new ft((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(e){const t=[];let n=0,s=new te(((i,o)=>z(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const u=this.lr.get(i);if(t.push(this.cr.removeEntry(e,i,u.readTime)),o.isValidDocument()){const c=Wc(this.cr.serializer,o);s=s.add(i.path.popLast());const h=ii(c);n+=h-u.size,t.push(this.cr.addEntry(e,i,c))}else if(n-=u.size,this.trackRemovals){const c=Wc(this.cr.serializer,o.convertToNoDocument(q.min()));t.push(this.cr.addEntry(e,i,c))}})),s.forEach((i=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.cr.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next((n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.cr.ar(e,t).next((({documents:n,ur:s})=>(s.forEach(((i,o)=>{this.lr.set(i,{size:o,readTime:n.get(i).readTime})})),n)))}}function ul(r){return Ie(r,"remoteDocumentGlobal")}function Yt(r){return Ie(r,"remoteDocumentsV14")}function Cr(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function cl(r,e){const t=e.documentKey.path.toArray();return[r,ri(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function ll(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=z(t[i],n[i]),s)return s;return s=z(t.length,n.length),s||(s=z(t[t.length-2],n[n.length-2]),s||z(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&Br(n.mutation,s,Le.empty(),le.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,K()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=K()){const s=Je();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let o=kr();return i.forEach(((u,c)=>{o=o.insert(u,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const n=Je();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,K())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,u)=>{t.set(o,u)}))}))}computeViews(e,t,n,s){let i=Be();const o=Lr(),u=(function(){return Lr()})();return t.forEach(((c,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof mt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Br(f.mutation,h,f.mutation.getFieldMask(),le.now())):o.set(h.key,Le.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>{var m;return u.set(h,new ny(f,(m=o.get(h))!==null&&m!==void 0?m:null))})),u)))}recalculateAndSaveOverlays(e,t){const n=Lr();let s=new se(((o,u)=>o-u)),i=K();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const u of o)u.keys().forEach((c=>{const h=t.get(c);if(h===null)return;let f=n.get(c)||Le.empty();f=u.applyToLocalView(h,f),n.set(c,f);const m=(s.get(u.batchId)||K()).add(c);s=s.insert(u.batchId,m)}))})).next((()=>{const o=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,m=Kh();f.forEach((g=>{if(!i.has(g)){const w=Zh(t.get(g),n.get(g));w!==null&&m.set(g,w),i=i.add(g)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return A.waitFor(o)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return(function(o){return M.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):la(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):A.resolve(Je());let u=-1,c=i;return o.next((h=>A.forEach(h,((f,m)=>(u<m.largestBatchId&&(u=m.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next((g=>{c=c.insert(f,g)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,c,h,K()))).next((f=>({batchId:u,changes:Gh(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next((n=>{let s=kr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=kr();return this.indexManager.getCollectionParents(e,i).next((u=>A.forEach(u,(c=>{const h=(function(m,g){return new dt(g,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next((f=>{f.forEach(((m,g)=>{o=o.insert(m,g)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((o=>{i.forEach(((c,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,oe.newInvalidDocument(f)))}));let u=kr();return o.forEach(((c,h)=>{const f=i.get(c);f!==void 0&&Br(f.mutation,h,Le.empty(),le.now()),ss(t,h)&&(u=u.insert(c,h))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return A.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:ge(s.createTime)}})(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(s){return{name:s.name,query:Ia(s.bundledQuery),readTime:ge(s.readTime)}})(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(){this.overlays=new se(M.comparator),this.Ir=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Je();return A.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.ht(e,t,i)})),A.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Ir.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.Ir.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const s=Je(),i=t.length+1,o=new M(t.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return A.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new se(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Je(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=Je(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((h,f)=>u.set(h,f))),!(u.size()>=s)););return A.resolve(u)}ht(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(n.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new ga(t,n));let i=this.Ir.get(t);i===void 0&&(i=K(),this.Ir.set(t,i)),this.Ir.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iy{constructor(){this.sessionToken=de.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(){this.Tr=new te(Te.Er),this.dr=new te(Te.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new Te(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Vr(new Te(e,t))}mr(e,t){e.forEach((n=>this.removeReference(n,t)))}gr(e){const t=new M(new W([])),n=new Te(t,e),s=new Te(t,e+1),i=[];return this.dr.forEachInRange([n,s],(o=>{this.Vr(o),i.push(o.key)})),i}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new M(new W([])),n=new Te(t,e),s=new Te(t,e+1);let i=K();return this.dr.forEachInRange([n,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Te(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Te{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return M.comparator(e.key,t.key)||z(e.wr,t.wr)}static Ar(e,t){return z(e.wr,t.wr)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new te(Te.Er)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new ma(i,t,n,s);this.mutationQueue.push(o);for(const u of s)this.br=this.br.add(new Te(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.vr(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Te(t,0),s=new Te(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([n,s],(o=>{const u=this.Dr(o.wr);i.push(u)})),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(z);return t.forEach((s=>{const i=new Te(s,0),o=new Te(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],(u=>{n=n.add(u.wr)}))})),A.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;M.isDocumentKey(i)||(i=i.child(""));const o=new Te(new M(i),0);let u=new te(z);return this.br.forEachWhile((c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.wr)),!0)}),o),A.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach((n=>{const s=this.Dr(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){B(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return A.forEach(t.mutations,(s=>{const i=new Te(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.br=n}))}On(e){}containsKey(e,t){const n=new Te(t,0),s=this.br.firstAfterOrEqual(n);return A.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ay{constructor(e){this.Mr=e,this.docs=(function(){return new se(M.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():oe.newInvalidDocument(t))}getEntries(e,t){let n=Be();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():oe.newInvalidDocument(s))})),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=Be();const o=t.path,u=new M(o.child("")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||oa(gh(f),n)<=0||(s.has(f.key)||ss(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(e,t,n,s){F()}Or(e,t){return A.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new uy(this)}getSize(e){return A.resolve(this.size)}}class uy extends Sd{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(n)})),A.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(e){this.persistence=e,this.Nr=new ft((t=>cn(t)),ns),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.Lr=0,this.Br=new wa,this.targetCount=0,this.kr=mn.Bn()}forEachTarget(e,t){return this.Nr.forEach(((n,s)=>t(s))),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),A.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new mn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.Kn(t),A.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.Nr.forEach(((o,u)=>{u.sequenceNumber<=t&&n.get(u.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)})),A.waitFor(i).next((()=>s))}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),A.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Fe(0),this.Kr=!1,this.Kr=!0,this.$r=new iy,this.referenceDelegate=e(this),this.Ur=new cy(this),this.indexManager=new W_,this.remoteDocumentCache=(function(s){return new ay(s)})((n=>this.referenceDelegate.Wr(n))),this.serializer=new Id(t),this.Gr=new ry(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new sy,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new oy(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){k("MemoryPersistence","Starting transaction:",e);const s=new ly(this.Qr.next());return this.referenceDelegate.zr(),n(s).next((i=>this.referenceDelegate.jr(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Hr(e,t){return A.or(Object.values(this.qr).map((n=>()=>n.containsKey(e,t))))}}class ly extends yh{constructor(e){super(),this.currentSequenceNumber=e}}class Pi{constructor(e){this.persistence=e,this.Jr=new wa,this.Yr=null}static Zr(e){return new Pi(e)}get Xr(){if(this.Yr)return this.Yr;throw F()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),A.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((s=>this.Xr.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.Xr.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Xr,(n=>{const s=M.fromPath(n);return this.ei(e,s).next((i=>{i||t.removeEntry(s,q.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return A.or([()=>A.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class oi{constructor(e,t){this.persistence=e,this.ti=new ft((n=>ke(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=Pd(this,t)}static Zr(e,t){return new oi(e,t)}zr(){}jr(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}er(e){let t=0;return this.Zn(e,(n=>{t++})).next((()=>t))}Zn(e,t){return A.forEach(this.ti,((n,s)=>this.nr(e,n,s).next((i=>i?A.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Or(e,(o=>this.nr(e,o,t).next((u=>{u||(n++,i.removeEntry(o,q.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),A.resolve()}removeReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),A.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ks(e.data.value)),t}nr(e,t,n){return A.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.ti.get(t);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hy{constructor(e){this.serializer=e}O(e,t,n,s){const i=new yi("createOrUpgrade",t);n<1&&s>=1&&((function(c){c.createObjectStore("owner")})(e),(function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Ac,{unique:!0}),c.createObjectStore("documentMutations")})(e),hl(e),(function(c){c.createObjectStore("remoteDocuments")})(e));let o=A.resolve();return n<3&&s>=3&&(n!==0&&((function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")})(e),hl(e)),o=o.next((()=>(function(c){const h=c.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return h.put("targetGlobalKey",f)})(i)))),n<4&&s>=4&&(n!==0&&(o=o.next((()=>(function(c,h){return h.store("mutations").U().next((f=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Ac,{unique:!0});const m=h.store("mutations"),g=f.map((w=>m.put(w)));return A.waitFor(g)}))})(e,i)))),o=o.next((()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)}))),n<5&&s>=5&&(o=o.next((()=>this.ni(i)))),n<6&&s>=6&&(o=o.next((()=>((function(c){c.createObjectStore("remoteDocumentGlobal")})(e),this.ri(i))))),n<7&&s>=7&&(o=o.next((()=>this.ii(i)))),n<8&&s>=8&&(o=o.next((()=>this.si(e,i)))),n<9&&s>=9&&(o=o.next((()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&s>=10&&(o=o.next((()=>this.oi(i)))),n<11&&s>=11&&(o=o.next((()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),(function(c){c.createObjectStore("namedQueries",{keyPath:"name"})})(e)}))),n<12&&s>=12&&(o=o.next((()=>{(function(c){const h=c.createObjectStore("documentOverlays",{keyPath:Wg});h.createIndex("collectionPathOverlayIndex",Hg,{unique:!1}),h.createIndex("collectionGroupOverlayIndex",Jg,{unique:!1})})(e)}))),n<13&&s>=13&&(o=o.next((()=>(function(c){const h=c.createObjectStore("remoteDocumentsV14",{keyPath:Fg});h.createIndex("documentKeyIndex",Lg),h.createIndex("collectionGroupIndex",Bg)})(e))).next((()=>this._i(e,i))).next((()=>e.deleteObjectStore("remoteDocuments")))),n<14&&s>=14&&(o=o.next((()=>this.ai(e,i)))),n<15&&s>=15&&(o=o.next((()=>(function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:zg}).createIndex("sequenceNumberIndex",Gg,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:Kg}).createIndex("documentKeyIndex",Qg,{unique:!1})})(e)))),n<16&&s>=16&&(o=o.next((()=>{t.objectStore("indexState").clear()})).next((()=>{t.objectStore("indexEntries").clear()}))),n<17&&s>=17&&(o=o.next((()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)}))),o}ri(e){let t=0;return e.store("remoteDocuments").J(((n,s)=>{t+=ii(s)})).next((()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)}))}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next((s=>A.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,-1],[i.userId,i.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",o).next((u=>A.forEach(u,(c=>{B(c.userId===i.userId);const h=tn(this.serializer,c);return vd(e,i.userId,h).next((()=>{}))}))))}))))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next((s=>{const i=[];return n.J(((o,u)=>{const c=new W(o),h=(function(m){return[0,ke(m)]})(c);i.push(t.get(h).next((f=>f?A.resolve():(m=>t.put({targetId:0,path:ke(m),sequenceNumber:s.highestListenSequenceNumber}))(c))))})).next((()=>A.waitFor(i)))}))}si(e,t){e.createObjectStore("collectionParents",{keyPath:$g});const n=t.store("collectionParents"),s=new Ea,i=o=>{if(s.add(o)){const u=o.lastSegment(),c=o.popLast();return n.put({collectionId:u,parent:ke(c)})}};return t.store("remoteDocuments").J({H:!0},((o,u)=>{const c=new W(o);return i(c.popLast())})).next((()=>t.store("documentMutations").J({H:!0},(([o,u,c],h)=>{const f=He(u);return i(f.popLast())}))))}oi(e){const t=e.store("targets");return t.J(((n,s)=>{const i=Or(s),o=Td(this.serializer,i);return t.put(o)}))}_i(e,t){const n=t.store("remoteDocuments"),s=[];return n.J(((i,o)=>{const u=t.store("remoteDocumentsV14"),c=(function(m){return m.document?new M(W.fromString(m.document.name).popFirst(5)):m.noDocument?M.fromSegments(m.noDocument.path):m.unknownDocument?M.fromSegments(m.unknownDocument.path):F()})(o).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(u.put(h))})).next((()=>A.waitFor(s)))}ai(e,t){const n=t.store("mutations"),s=Vd(this.serializer),i=new va(Pi.Zr,this.serializer.ct);return n.U().next((o=>{const u=new Map;return o.forEach((c=>{var h;let f=(h=u.get(c.userId))!==null&&h!==void 0?h:K();tn(this.serializer,c).keys().forEach((m=>f=f.add(m))),u.set(c.userId,f)})),A.forEach(u,((c,h)=>{const f=new Ee(h),m=bi.lt(this.serializer,f),g=i.getIndexManager(f),w=Ri.lt(f,this.serializer,g,i.referenceDelegate);return new Cd(s,w,m,g).recalculateAndSaveOverlaysForDocumentKeys(new No(t,Fe.oe),c).next()}))}))}}function hl(r){r.createObjectStore("targetDocuments",{keyPath:qg}).createIndex("documentTargetsIndex",jg,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",Ug,{unique:!0}),r.createObjectStore("targetGlobal")}const Io="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class Aa{constructor(e,t,n,s,i,o,u,c,h,f,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=i,this.window=o,this.document=u,this.ci=h,this.li=f,this.hi=m,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=g=>Promise.resolve(),!Aa.D())throw new D(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Z_(this,s),this.Ai=t+"main",this.serializer=new Id(c),this.Ri=new Ye(this.Ai,this.hi,new hy(this.serializer)),this.$r=new j_,this.Ur=new J_(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Vd(this.serializer),this.Gr=new q_,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&pe("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(P.FAILED_PRECONDITION,Io);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Ur.getHighestSequenceNumber(e)))})).then((e=>{this.Qr=new Fe(e,this.ci)})).then((()=>{this.Kr=!0})).catch((e=>(this.Ri&&this.Ri.close(),Promise.reject(e))))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget((async()=>{this.started&&await this.mi()})))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>Bs(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.wi(e).next((t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))))}))})).next((()=>this.Si(e))).next((t=>this.isPrimary&&!t?this.bi(e).next((()=>!1)):!!t&&this.Di(e).next((()=>!0)))))).catch((e=>{if(qt(e))return k("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return k("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.ui.enqueueRetryable((()=>this.di(e))),this.isPrimary=e}))}wi(e){return Dr(e).get("owner").next((t=>A.resolve(this.vi(t))))}Ci(e){return Bs(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=Ie(t,"clientMetadata");return n.U().next((s=>{const i=this.xi(s,18e5),o=s.filter((u=>i.indexOf(u)===-1));return A.forEach(o,(u=>n.delete(u.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.mi().then((()=>this.Fi())).then((()=>this.pi()))))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?A.resolve(!0):Dr(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new D(P.FAILED_PRECONDITION,Io);return!1}}return!(!this.networkEnabled||!this.inForeground)||Bs(e).U().next((n=>this.xi(n,5e3).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||o&&u)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&k("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],(e=>{const t=new No(e,Fe.oe);return this.bi(t).next((()=>this.Ci(t)))})),this.Ri.close(),this.qi()}xi(e,t){return e.filter((n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId)))}Qi(){return this.runTransaction("getActiveClients","readonly",(e=>Bs(e).U().next((t=>this.xi(t,18e5).map((n=>n.clientId))))))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Ri.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new H_(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return bi.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){k("IndexedDbPersistence","Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(c){return c===17?Zg:c===16?Xg:c===15?ua:c===14?Ah:c===13?vh:c===12?Yg:c===11?wh:void F()})(this.hi);let o;return this.Ri.runTransaction(e,s,i,(u=>(o=new No(u,this.Qr?this.Qr.next():Fe.oe),t==="readwrite-primary"?this.wi(o).next((c=>!!c||this.Si(o))).next((c=>{if(!c)throw pe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))),new D(P.FAILED_PRECONDITION,_h);return n(o)})).next((c=>this.Di(o).next((()=>c)))):this.Ki(o).next((()=>n(o)))))).then((u=>(o.raiseOnCommittedEvent(),u)))}Ki(e){return Dr(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(P.FAILED_PRECONDITION,Io)}))}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Dr(e).put("owner",t)}static D(){return Ye.D()}bi(e){const t=Dr(e);return t.get("owner").next((n=>this.vi(n)?(k("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):A.resolve()))}Mi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(pe(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.mi())))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;Yl()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return k("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return pe("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){pe("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Dr(r){return Ie(r,"owner")}function Bs(r){return Ie(r,"clientMetadata")}function ba(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=s}static Wi(e,t){let n=K(),s=K();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ra(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dy{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return Yl()?8:Ih(Mn())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.Yi(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.Zi(e,t,s,n).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new dy;return this.Xi(e,t,o).next((u=>{if(i.result=u,this.zi)return this.es(e,t,o,u.size)}))})).next((()=>i.result))}es(e,t,n,s){return n.documentReadCount<this.ji?(Cn()<=X.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",Dn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),A.resolve()):(Cn()<=X.DEBUG&&k("QueryEngine","Query:",Dn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Hi*s?(Cn()<=X.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",Dn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ne(t))):A.resolve())}Yi(e,t){if(Fc(t))return A.resolve(null);let n=Ne(t);return this.indexManager.getIndexType(e,n).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=ti(t,null,"F"),n=Ne(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((i=>{const o=K(...i);return this.Ji.getDocuments(e,o).next((u=>this.indexManager.getMinOffset(e,n).next((c=>{const h=this.ts(t,u);return this.ns(t,h,o,c.readTime)?this.Yi(e,ti(t,null,"F")):this.rs(e,h,t,c)}))))})))))}Zi(e,t,n,s){return Fc(t)||s.isEqual(q.min())?A.resolve(null):this.Ji.getDocuments(e,n).next((i=>{const o=this.ts(t,i);return this.ns(t,o,n,s)?A.resolve(null):(Cn()<=X.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Dn(t)),this.rs(e,o,t,ph(s,-1)).next((u=>u)))}))}ts(e,t){let n=new te($h(e));return t.forEach(((s,i)=>{ss(e,i)&&(n=n.add(i))})),n}ns(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,t,n){return Cn()<=X.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",Dn(t)),this.Ji.getDocumentsMatchingQuery(e,t,ze.min(),n)}rs(e,t,n,s){return this.Ji.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e,t,n,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new se(z),this._s=new ft((i=>cn(i)),ns),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Cd(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function xd(r,e,t,n){return new fy(r,e,t,n)}async function kd(r,e){const t=N(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.ls(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const o=[],u=[];let c=K();for(const h of s){o.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of i){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(n,c).next((h=>({hs:h,removedBatchIds:o,addedBatchIds:u})))}))}))}function my(r,e){const t=N(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.cs.newChangeBuffer({trackRemovals:!0});return(function(u,c,h,f){const m=h.batch,g=m.keys();let w=A.resolve();return g.forEach((C=>{w=w.next((()=>f.getEntry(c,C))).next((x=>{const V=h.docVersions.get(C);B(V!==null),x.version.compareTo(V)<0&&(m.applyToRemoteDocument(x,h),x.isValidDocument()&&(x.setReadTime(h.commitVersion),f.addEntry(x)))}))})),w.next((()=>u.mutationQueue.removeMutationBatch(c,m)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(u){let c=K();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function Nd(r){const e=N(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ur.getLastRemoteSnapshotVersion(t)))}function py(r,e){const t=N(r),n=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const u=[];e.targetChanges.forEach(((f,m)=>{const g=s.get(m);if(!g)return;u.push(t.Ur.removeMatchingKeys(i,f.removedDocuments,m).next((()=>t.Ur.addMatchingKeys(i,f.addedDocuments,m))));let w=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?w=w.withResumeToken(de.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(f.resumeToken,n)),s=s.insert(m,w),(function(x,V,U){return x.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0})(g,w,f)&&u.push(t.Ur.updateTargetData(i,w))}));let c=Be(),h=K();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),u.push(Od(i,o,e.documentUpdates).next((f=>{c=f.Ps,h=f.Is}))),!n.isEqual(q.min())){const f=t.Ur.getLastRemoteSnapshotVersion(i).next((m=>t.Ur.setTargetsMetadata(i,i.currentSequenceNumber,n)));u.push(f)}return A.waitFor(u).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,c,h))).next((()=>c))})).then((i=>(t.os=s,i)))}function Od(r,e,t){let n=K(),s=K();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let o=Be();return t.forEach(((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(q.min())?(e.removeEntry(u,c.readTime),o=o.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(u,c)):k("LocalStore","Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)})),{Ps:o,Is:s}}))}function gy(r,e){const t=N(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function Gn(r,e){const t=N(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.Ur.getTargetData(n,e).next((i=>i?(s=i,A.resolve(s)):t.Ur.allocateTargetId(n).next((o=>(s=new ot(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.os.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n}))}async function Kn(r,e,t){const n=N(r),s=n.os.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(o=>n.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!qt(o))throw o;k("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}n.os=n.os.remove(e),n._s.delete(s.target)}function ai(r,e,t){const n=N(r);let s=q.min(),i=K();return n.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,h,f){const m=N(c),g=m._s.get(f);return g!==void 0?A.resolve(m.os.get(g)):m.Ur.getTargetData(h,f)})(n,o,Ne(e)).next((u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(o,u.targetId).next((c=>{i=c}))})).next((()=>n.ss.getDocumentsMatchingQuery(o,e,t?s:q.min(),t?i:K()))).next((u=>(Ld(n,jh(e),u),{documents:u,Ts:i})))))}function Md(r,e){const t=N(r),n=N(t.Ur),s=t.os.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",(i=>n.ot(i,e).next((o=>o?o.target:null))))}function Fd(r,e){const t=N(r),n=t.us.get(e)||q.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.cs.getAllFromCollectionGroup(s,e,ph(n,-1),Number.MAX_SAFE_INTEGER))).then((s=>(Ld(t,e,s),s)))}function Ld(r,e,t){let n=r.us.get(e)||q.min();t.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.us.set(e,n)}async function _y(r,e,t,n){const s=N(r);let i=K(),o=Be();for(const h of t){const f=e.Es(h.metadata.name);h.document&&(i=i.add(f));const m=e.ds(h);m.setReadTime(e.As(h.metadata.readTime)),o=o.insert(f,m)}const u=s.cs.newChangeBuffer({trackRemovals:!0}),c=await Gn(s,(function(f){return Ne(Zn(W.fromString(`__bundle__/docs/${f}`)))})(n));return s.persistence.runTransaction("Apply bundle documents","readwrite",(h=>Od(h,u,o).next((f=>(u.apply(h),f))).next((f=>s.Ur.removeMatchingKeysForTargetId(h,c.targetId).next((()=>s.Ur.addMatchingKeys(h,i,c.targetId))).next((()=>s.localDocuments.getLocalViewOfDocuments(h,f.Ps,f.Is))).next((()=>f.Ps))))))}async function yy(r,e,t=K()){const n=await Gn(r,Ne(Ia(e.bundledQuery))),s=N(r);return s.persistence.runTransaction("Save named query","readwrite",(i=>{const o=ge(e.readTime);if(n.snapshotVersion.compareTo(o)>=0)return s.Gr.saveNamedQuery(i,e);const u=n.withResumeToken(de.EMPTY_BYTE_STRING,o);return s.os=s.os.insert(u.targetId,u),s.Ur.updateTargetData(i,u).next((()=>s.Ur.removeMatchingKeysForTargetId(i,n.targetId))).next((()=>s.Ur.addMatchingKeys(i,t,n.targetId))).next((()=>s.Gr.saveNamedQuery(i,e)))}))}function dl(r,e){return`firestore_clients_${r}_${e}`}function fl(r,e,t){let n=`firestore_mutations_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}function To(r,e){return`firestore_targets_${r}_${e}`}class ui{constructor(e,t,n,s){this.user=e,this.batchId=t,this.state=n,this.error=s}static Rs(e,t,n){const s=JSON.parse(n);let i,o=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return o&&s.error&&(o=typeof s.error.message=="string"&&typeof s.error.code=="string",o&&(i=new D(s.error.code,s.error.message))),o?new ui(e,t,s.state,i):(pe("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ur{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Rs(e,t){const n=JSON.parse(t);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new D(n.error.code,n.error.message))),i?new Ur(e,n.state,s):(pe("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ci{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){const n=JSON.parse(t);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=ha();for(let o=0;s&&o<n.activeTargetIds.length;++o)s=Th(n.activeTargetIds[o]),i=i.add(n.activeTargetIds[o]);return s?new ci(e,i):(pe("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}}class Pa{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Pa(t.clientId,t.onlineState):(pe("SharedClientState",`Failed to parse online state: ${e}`),null)}}class Wo{constructor(){this.activeTargetIds=ha()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Eo{constructor(e,t,n,s,i){this.window=e,this.ui=t,this.persistenceKey=n,this.ps=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new se(z),this.started=!1,this.bs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Ds=dl(this.persistenceKey,this.ps),this.vs=(function(c){return`firestore_sequence_number_${c}`})(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Wo),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=(function(c){return`firestore_online_state_${c}`})(this.persistenceKey),this.Os=(function(c){return`firestore_bundle_loaded_v2_${c}`})(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Qi();for(const n of e){if(n===this.ps)continue;const s=this.getItem(dl(this.persistenceKey,n));if(s){const i=ci.Rs(n,s);i&&(this.Ss=this.Ss.insert(i.clientId,i))}}this.Ns();const t=this.storage.getItem(this.xs);if(t){const n=this.Ls(t);n&&this.Bs(n)}for(const n of this.bs)this.ws(n);this.bs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach(((n,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,n){this.qs(e,t,n),this.Qs(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(To(this.persistenceKey,e));if(s){const i=Ur.Rs(e,s);i&&(n=i.state)}}return t&&this.Ks.fs(e),this.Ns(),n}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(To(this.persistenceKey,e))}updateQueryState(e,t,n){this.$s(e,t,n)}handleUserChange(e,t,n){t.forEach((s=>{this.Qs(s)})),this.currentUser=e,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return k("SharedClientState","READ",e,t),t}setItem(e,t){k("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){k("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){const t=e;if(t.storageArea===this.storage){if(k("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void pe("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){const n=this.Gs(t.key);return this.zs(n,null)}{const n=this.js(t.key,t.newValue);if(n)return this.zs(n.clientId,n)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){const n=this.Hs(t.key,t.newValue);if(n)return this.Js(n)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){const n=this.Ys(t.key,t.newValue);if(n)return this.Zs(n)}}else if(t.key===this.xs){if(t.newValue!==null){const n=this.Ls(t.newValue);if(n)return this.Bs(n)}}else if(t.key===this.vs){const n=(function(i){let o=Fe.oe;if(i!=null)try{const u=JSON.parse(i);B(typeof u=="number"),o=u}catch(u){pe("SharedClientState","Failed to read sequence number from WebStorage",u)}return o})(t.newValue);n!==Fe.oe&&this.sequenceNumberHandler(n)}else if(t.key===this.Os){const n=this.Xs(t.newValue);await Promise.all(n.map((s=>this.syncEngine.eo(s))))}}}else this.bs.push(t)}))}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,n){const s=new ui(this.currentUser,e,t,n),i=fl(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Vs())}Qs(e){const t=fl(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){const t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,n){const s=To(this.persistenceKey,e),i=new Ur(e,t,n);this.setItem(s,i.Vs())}Ws(e){const t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){const t=this.Cs.exec(e);return t?t[1]:null}js(e,t){const n=this.Gs(e);return ci.Rs(n,t)}Hs(e,t){const n=this.Fs.exec(e),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return ui.Rs(new Ee(i),s,t)}Ys(e,t){const n=this.Ms.exec(e),s=Number(n[1]);return Ur.Rs(s,t)}Ls(e){return Pa.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);k("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){const n=t?this.Ss.insert(e,t):this.Ss.remove(e),s=this.ks(this.Ss),i=this.ks(n),o=[],u=[];return i.forEach((c=>{s.has(c)||o.push(c)})),s.forEach((c=>{i.has(c)||u.push(c)})),this.syncEngine.io(o,u).then((()=>{this.Ss=n}))}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=ha();return e.forEach(((n,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class Bd{constructor(){this.so=new Wo,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Wo,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iy{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){k("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){k("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Us=null;function wo(){return Us===null?Us=(function(){return 268435456+Math.round(2147483648*Math.random())})():Us++,"0x"+Us.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ty={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ey{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="WebChannelConnection";class wy extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(t,n,s,i,o){const u=wo(),c=this.xo(t,n.toUriEncodedString());k("RestConnection",`Sending RPC '${t}' ${u}:`,c,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,o),this.No(t,c,h,s).then((f=>(k("RestConnection",`Received RPC '${t}' ${u}: `,f),f)),(f=>{throw $e("RestConnection",`RPC '${t}' ${u} failed with error: `,f,"url: ",c,"request:",s),f}))}Lo(t,n,s,i,o,u){return this.Mo(t,n,s,i,o)}Oo(t,n,s){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Xn})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach(((i,o)=>t[o]=i)),s&&s.headers.forEach(((i,o)=>t[o]=i))}xo(t,n){const s=Ty[t];return`${this.Do}/v1/${n}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,s){const i=wo();return new Promise(((o,u)=>{const c=new oh;c.setWithCredentials(!0),c.listenOnce(ah.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case $s.NO_ERROR:const f=c.getResponseJson();k(De,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case $s.TIMEOUT:k(De,`RPC '${e}' ${i} timed out`),u(new D(P.DEADLINE_EXCEEDED,"Request time out"));break;case $s.HTTP_ERROR:const m=c.getStatus();if(k(De,`RPC '${e}' ${i} failed with status:`,m,"response text:",c.getResponseText()),m>0){let g=c.getResponseJson();Array.isArray(g)&&(g=g[0]);const w=g?.error;if(w&&w.status&&w.message){const C=(function(V){const U=V.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(U)>=0?U:P.UNKNOWN})(w.status);u(new D(C,w.message))}else u(new D(P.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new D(P.UNAVAILABLE,"Connection failed."));break;default:F()}}finally{k(De,`RPC '${e}' ${i} completed.`)}}));const h=JSON.stringify(s);k(De,`RPC '${e}' ${i} sending request:`,s),c.send(t,"POST",h,n,15)}))}Bo(e,t,n){const s=wo(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=lh(),u=ch(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const f=i.join("");k(De,`Creating RPC '${e}' stream ${s}: ${f}`,c);const m=o.createWebChannel(f,c);let g=!1,w=!1;const C=new Ey({Io:V=>{w?k(De,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(g||(k(De,`Opening RPC '${e}' stream ${s} transport.`),m.open(),g=!0),k(De,`RPC '${e}' stream ${s} sending:`,V),m.send(V))},To:()=>m.close()}),x=(V,U,j)=>{V.listen(U,(L=>{try{j(L)}catch($){setTimeout((()=>{throw $}),0)}}))};return x(m,xr.EventType.OPEN,(()=>{w||(k(De,`RPC '${e}' stream ${s} transport opened.`),C.yo())})),x(m,xr.EventType.CLOSE,(()=>{w||(w=!0,k(De,`RPC '${e}' stream ${s} transport closed`),C.So())})),x(m,xr.EventType.ERROR,(V=>{w||(w=!0,$e(De,`RPC '${e}' stream ${s} transport errored:`,V),C.So(new D(P.UNAVAILABLE,"The operation could not be completed")))})),x(m,xr.EventType.MESSAGE,(V=>{var U;if(!w){const j=V.data[0];B(!!j);const L=j,$=L.error||((U=L[0])===null||U===void 0?void 0:U.error);if($){k(De,`RPC '${e}' stream ${s} received error:`,$);const J=$.status;let G=(function(I){const E=ye[I];if(E!==void 0)return rd(E)})(J),T=$.message;G===void 0&&(G=P.INTERNAL,T="Unknown error status: "+J+" with message "+$.message),w=!0,C.So(new D(G,T)),m.close()}else k(De,`RPC '${e}' stream ${s} received:`,j),C.bo(j)}})),x(u,uh.STAT_EVENT,(V=>{V.stat===xo.PROXY?k(De,`RPC '${e}' stream ${s} detected buffering proxy`):V.stat===xo.NOPROXY&&k(De,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{C.wo()}),0),C}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ud(){return typeof window<"u"?window:null}function Js(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function us(r){return new C_(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,t,n=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-n);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(e,t,n,s,i,o,u,c){this.ui=e,this.Ho=n,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Sa(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(pe(t.toString()),pe("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.Yo===t&&this.P_(n,s)}),(n=>{e((()=>{const s=new D(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(s)}))}))}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo((()=>{n((()=>this.listener.Eo()))})),this.stream.Ro((()=>{n((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((s=>{n((()=>this.I_(s)))})),this.stream.onMessage((s=>{n((()=>++this.e_==1?this.E_(s):this.onNext(s)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(e){return k("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget((()=>this.Yo===e?t():(k("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class vy extends qd{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=k_(this.serializer,e),n=(function(i){if(!("targetChange"in i))return q.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?ge(o.readTime):q.min()})(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=$o(this.serializer),t.addTarget=(function(i,o){let u;const c=o.target;if(u=Zs(c)?{documents:fd(i,c)}:{query:Ai(i,c)._t},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=ad(i,o.resumeToken);const h=qo(i,o.expectedCount);h!==null&&(u.expectedCount=h)}else if(o.snapshotVersion.compareTo(q.min())>0){u.readTime=zn(i,o.snapshotVersion.toTimestamp());const h=qo(i,o.expectedCount);h!==null&&(u.expectedCount=h)}return u})(this.serializer,e);const n=O_(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=$o(this.serializer),t.removeTarget=e,this.a_(t)}}class Ay extends qd{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return B(!!e.streamToken),this.lastStreamToken=e.streamToken,B(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){B(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=N_(e.writeResults,e.commitTime),n=ge(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=$o(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>Xr(this.serializer,n)))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class by extends class{}{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Mo(e,jo(t,n),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new D(P.UNKNOWN,i.toString())}))}Lo(e,t,n,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,u])=>this.connection.Lo(e,jo(t,n),s,o,u,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(P.UNKNOWN,o.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class Ry{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(pe(t),this.D_=!1):k("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Py{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o((o=>{n.enqueueAndForget((async()=>{$t(this)&&(k("RemoteStore","Restarting streams for network reachability change."),await(async function(c){const h=N(c);h.L_.add(4),await nr(h),h.q_.set("Unknown"),h.L_.delete(4),await cs(h)})(this))}))})),this.q_=new Ry(n,s)}}async function cs(r){if($t(r))for(const e of r.B_)await e(!0)}async function nr(r){for(const e of r.B_)await e(!1)}function Si(r,e){const t=N(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Da(t)?Ca(t):sr(t).r_()&&Va(t,e))}function Qn(r,e){const t=N(r),n=sr(t);t.N_.delete(e),n.r_()&&jd(t,e),t.N_.size===0&&(n.r_()?n.o_():$t(t)&&t.q_.set("Unknown"))}function Va(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}sr(r).A_(e)}function jd(r,e){r.Q_.xe(e),sr(r).R_(e)}function Ca(r){r.Q_=new R_({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),sr(r).start(),r.q_.v_()}function Da(r){return $t(r)&&!sr(r).n_()&&r.N_.size>0}function $t(r){return N(r).L_.size===0}function $d(r){r.Q_=void 0}async function Sy(r){r.q_.set("Online")}async function Vy(r){r.N_.forEach(((e,t)=>{Va(r,e)}))}async function Cy(r,e){$d(r),Da(r)?(r.q_.M_(e),Ca(r)):r.q_.set("Unknown")}async function Dy(r,e,t){if(r.q_.set("Online"),e instanceof od&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const u of i.targetIds)s.N_.has(u)&&(await s.remoteSyncer.rejectListen(u,o),s.N_.delete(u),s.Q_.removeTarget(u))})(r,e)}catch(n){k("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await li(r,n)}else if(e instanceof Hs?r.Q_.Ke(e):e instanceof id?r.Q_.He(e):r.Q_.We(e),!t.isEqual(q.min()))try{const n=await Nd(r.localStore);t.compareTo(n)>=0&&await(function(i,o){const u=i.Q_.rt(o);return u.targetChanges.forEach(((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=i.N_.get(h);f&&i.N_.set(h,f.withResumeToken(c.resumeToken,o))}})),u.targetMismatches.forEach(((c,h)=>{const f=i.N_.get(c);if(!f)return;i.N_.set(c,f.withResumeToken(de.EMPTY_BYTE_STRING,f.snapshotVersion)),jd(i,c);const m=new ot(f.target,c,h,f.sequenceNumber);Va(i,m)})),i.remoteSyncer.applyRemoteEvent(u)})(r,t)}catch(n){k("RemoteStore","Failed to raise snapshot:",n),await li(r,n)}}async function li(r,e,t){if(!qt(e))throw e;r.L_.add(1),await nr(r),r.q_.set("Offline"),t||(t=()=>Nd(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{k("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await cs(r)}))}function zd(r,e){return e().catch((t=>li(r,t,e)))}async function rr(r){const e=N(r),t=Ot(e);let n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;xy(e);)try{const s=await gy(e.localStore,n);if(s===null){e.O_.length===0&&t.o_();break}n=s.batchId,ky(e,s)}catch(s){await li(e,s)}Gd(e)&&Kd(e)}function xy(r){return $t(r)&&r.O_.length<10}function ky(r,e){r.O_.push(e);const t=Ot(r);t.r_()&&t.V_&&t.m_(e.mutations)}function Gd(r){return $t(r)&&!Ot(r).n_()&&r.O_.length>0}function Kd(r){Ot(r).start()}async function Ny(r){Ot(r).p_()}async function Oy(r){const e=Ot(r);for(const t of r.O_)e.m_(t.mutations)}async function My(r,e,t){const n=r.O_.shift(),s=pa.from(n,e,t);await zd(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await rr(r)}async function Fy(r,e){e&&Ot(r).V_&&await(async function(n,s){if((function(o){return nd(o)&&o!==P.ABORTED})(s.code)){const i=n.O_.shift();Ot(n).s_(),await zd(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await rr(n)}})(r,e),Gd(r)&&Kd(r)}async function pl(r,e){const t=N(r);t.asyncQueue.verifyOperationInProgress(),k("RemoteStore","RemoteStore received new credentials");const n=$t(t);t.L_.add(3),await nr(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await cs(t)}async function Ho(r,e){const t=N(r);e?(t.L_.delete(2),await cs(t)):e||(t.L_.add(2),await nr(t),t.q_.set("Unknown"))}function sr(r){return r.K_||(r.K_=(function(t,n,s){const i=N(t);return i.w_(),new vy(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Eo:Sy.bind(null,r),Ro:Vy.bind(null,r),mo:Cy.bind(null,r),d_:Dy.bind(null,r)}),r.B_.push((async e=>{e?(r.K_.s_(),Da(r)?Ca(r):r.q_.set("Unknown")):(await r.K_.stop(),$d(r))}))),r.K_}function Ot(r){return r.U_||(r.U_=(function(t,n,s){const i=N(t);return i.w_(),new Ay(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Ny.bind(null,r),mo:Fy.bind(null,r),f_:Oy.bind(null,r),g_:My.bind(null,r)}),r.B_.push((async e=>{e?(r.U_.s_(),await rr(r)):(await r.U_.stop(),r.O_.length>0&&(k("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))}))),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new we,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,u=new xa(e,t,o,s,i);return u.start(n),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ir(r,e){if(pe("AsyncQueue",`${e}: ${r}`),qt(r))return new D(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e){this.comparator=e?(t,n)=>e(t,n)||M.comparator(t.key,n.key):(t,n)=>M.comparator(t.key,n.key),this.keyedMap=kr(),this.sortedSet=new se(this.comparator)}static emptySet(e){return new On(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof On)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new On;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(){this.W_=new se(M.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):F():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal(((t,n)=>{e.push(n)})),e}}class Wn{constructor(e,t,n,s,i,o,u,c,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach((u=>{o.push({type:0,doc:u})})),new Wn(e,t,On.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&rs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ly{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((e=>e.J_()))}}class By{constructor(){this.queries=_l(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){const s=N(t),i=s.queries;s.queries=_l(),i.forEach(((o,u)=>{for(const c of u.j_)c.onError(n)}))})(this,new D(P.ABORTED,"Firestore shutting down"))}}function _l(){return new ft((r=>qh(r)),rs)}async function ka(r,e){const t=N(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.H_()&&e.J_()&&(n=2):(i=new Ly,n=e.J_()?0:1);try{switch(n){case 0:i.z_=await t.onListen(s,!0);break;case 1:i.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const u=ir(o,`Initialization of query '${Dn(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.j_.push(e),e.Z_(t.onlineState),i.z_&&e.X_(i.z_)&&Oa(t)}async function Na(r,e){const t=N(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function Uy(r,e){const t=N(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const u of o.j_)u.X_(s)&&(n=!0);o.z_=s}}n&&Oa(t)}function qy(r,e,t){const n=N(r),s=n.queries.get(e);if(s)for(const i of s.j_)i.onError(t);n.queries.delete(e)}function Oa(r){r.Y_.forEach((e=>{e.next()}))}var Jo,yl;(yl=Jo||(Jo={})).ea="default",yl.Cache="cache";class Ma{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new Wn(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Wn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Jo.Cache}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jy{constructor(e,t){this.aa=e,this.byteLength=t}ua(){return"metadata"in this.aa}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{constructor(e){this.serializer=e}Es(e){return Xe(this.serializer,e)}ds(e){return e.metadata.exists?dd(this.serializer,e.document,!1):oe.newNoDocument(this.Es(e.metadata.name),this.As(e.metadata.readTime))}As(e){return ge(e)}}class $y{constructor(e,t,n){this.ca=e,this.localStore=t,this.serializer=n,this.queries=[],this.documents=[],this.collectionGroups=new Set,this.progress=Qd(e)}la(e){this.progress.bytesLoaded+=e.byteLength;let t=this.progress.documentsLoaded;if(e.aa.namedQuery)this.queries.push(e.aa.namedQuery);else if(e.aa.documentMetadata){this.documents.push({metadata:e.aa.documentMetadata}),e.aa.documentMetadata.exists||++t;const n=W.fromString(e.aa.documentMetadata.name);this.collectionGroups.add(n.get(n.length-2))}else e.aa.document&&(this.documents[this.documents.length-1].document=e.aa.document,++t);return t!==this.progress.documentsLoaded?(this.progress.documentsLoaded=t,Object.assign({},this.progress)):null}ha(e){const t=new Map,n=new Il(this.serializer);for(const s of e)if(s.metadata.queries){const i=n.Es(s.metadata.name);for(const o of s.metadata.queries){const u=(t.get(o)||K()).add(i);t.set(o,u)}}return t}async complete(){const e=await _y(this.localStore,new Il(this.serializer),this.documents,this.ca.id),t=this.ha(this.documents);for(const n of this.queries)await yy(this.localStore,n,t.get(n.name));return this.progress.taskState="Success",{progress:this.progress,Pa:this.collectionGroups,Ia:e}}}function Qd(r){return{taskState:"Running",documentsLoaded:0,bytesLoaded:0,totalDocuments:r.totalDocuments,totalBytes:r.totalBytes}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e){this.key=e}}class Hd{constructor(e){this.key=e}}class Jd{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=K(),this.mutatedKeys=K(),this.Aa=$h(e),this.Ra=new On(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new gl,s=t?t.Ra:this.Ra;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,u=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,m)=>{const g=s.get(f),w=ss(this.query,m)?m:null,C=!!g&&this.mutatedKeys.has(g.key),x=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let V=!1;g&&w?g.data.isEqual(w.data)?C!==x&&(n.track({type:3,doc:w}),V=!0):this.ga(g,w)||(n.track({type:2,doc:w}),V=!0,(c&&this.Aa(w,c)>0||h&&this.Aa(w,h)<0)&&(u=!0)):!g&&w?(n.track({type:0,doc:w}),V=!0):g&&!w&&(n.track({type:1,doc:g}),V=!0,(c||h)&&(u=!0)),V&&(w?(o=o.add(w),i=x?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{Ra:o,fa:n,ns:u,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort(((f,m)=>(function(w,C){const x=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F()}};return x(w)-x(C)})(f.type,m.type)||this.Aa(f.doc,m.doc))),this.pa(n),s=s!=null&&s;const u=t&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,h=c!==this.Ea;return this.Ea=c,o.length!==0||h?{snapshot:new Wn(this.query,e.Ra,i,o,e.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:u}:{wa:u}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new gl,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach((t=>this.Ta=this.Ta.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ta=this.Ta.delete(t))),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=K(),this.Ra.forEach((n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))}));const t=[];return e.forEach((n=>{this.da.has(n)||t.push(new Hd(n))})),this.da.forEach((n=>{e.has(n)||t.push(new Wd(n))})),t}ba(e){this.Ta=e.Ts,this.da=K();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Wn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class zy{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Gy{constructor(e){this.key=e,this.va=!1}}class Ky{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new ft((u=>qh(u)),rs),this.Ma=new Map,this.xa=new Set,this.Oa=new se(M.comparator),this.Na=new Map,this.La=new wa,this.Ba={},this.ka=new Map,this.qa=mn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Qy(r,e,t=!0){const n=Vi(r);let s;const i=n.Fa.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await Yd(n,e,t,!0),s}async function Wy(r,e){const t=Vi(r);await Yd(t,e,!0,!1)}async function Yd(r,e,t,n){const s=await Gn(r.localStore,Ne(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let u;return n&&(u=await Fa(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&Si(r.remoteStore,s),u}async function Fa(r,e,t,n,s){r.Ka=(m,g,w)=>(async function(x,V,U,j){let L=V.view.ma(U);L.ns&&(L=await ai(x.localStore,V.query,!1).then((({documents:T})=>V.view.ma(T,L))));const $=j&&j.targetChanges.get(V.targetId),J=j&&j.targetMismatches.get(V.targetId)!=null,G=V.view.applyChanges(L,x.isPrimaryClient,$,J);return Yo(x,V.targetId,G.wa),G.snapshot})(r,m,g,w);const i=await ai(r.localStore,e,!0),o=new Jd(e,i.Ts),u=o.ma(i.documents),c=as.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(u,r.isPrimaryClient,c);Yo(r,t,h.wa);const f=new zy(e,t,o);return r.Fa.set(e,f),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),h.snapshot}async function Hy(r,e,t){const n=N(r),s=n.Fa.get(e),i=n.Ma.get(s.targetId);if(i.length>1)return n.Ma.set(s.targetId,i.filter((o=>!rs(o,e)))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Kn(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&Qn(n.remoteStore,s.targetId),Hn(n,s.targetId)})).catch(Ut)):(Hn(n,s.targetId),await Kn(n.localStore,s.targetId,!0))}async function Jy(r,e){const t=N(r),n=t.Fa.get(e),s=t.Ma.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Qn(t.remoteStore,n.targetId))}async function Yy(r,e,t){const n=qa(r);try{const s=await(function(o,u){const c=N(o),h=le.now(),f=u.reduce(((w,C)=>w.add(C.key)),K());let m,g;return c.persistence.runTransaction("Locally write mutations","readwrite",(w=>{let C=Be(),x=K();return c.cs.getEntries(w,f).next((V=>{C=V,C.forEach(((U,j)=>{j.isValidDocument()||(x=x.add(U))}))})).next((()=>c.localDocuments.getOverlayedDocuments(w,C))).next((V=>{m=V;const U=[];for(const j of u){const L=v_(j,m.get(j.key).overlayedDocument);L!=null&&U.push(new mt(j.key,L,Ch(L.value.mapValue),ce.exists(!0)))}return c.mutationQueue.addMutationBatch(w,h,U,u)})).next((V=>{g=V;const U=V.applyToLocalDocumentSet(m,x);return c.documentOverlayCache.saveOverlays(w,V.batchId,U)}))})).then((()=>({batchId:g.batchId,changes:Gh(m)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(o,u,c){let h=o.Ba[o.currentUser.toKey()];h||(h=new se(z)),h=h.insert(u,c),o.Ba[o.currentUser.toKey()]=h})(n,s.batchId,t),await pt(n,s.changes),await rr(n.remoteStore)}catch(s){const i=ir(s,"Failed to persist write");t.reject(i)}}async function Xd(r,e){const t=N(r);try{const n=await py(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Na.get(i);o&&(B(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?B(o.va):s.removedDocuments.size>0&&(B(o.va),o.va=!1))})),await pt(t,n,e)}catch(n){await Ut(n)}}function Tl(r,e,t){const n=N(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Fa.forEach(((i,o)=>{const u=o.view.Z_(e);u.snapshot&&s.push(u.snapshot)})),(function(o,u){const c=N(o);c.onlineState=u;let h=!1;c.queries.forEach(((f,m)=>{for(const g of m.j_)g.Z_(u)&&(h=!0)})),h&&Oa(c)})(n.eventManager,e),s.length&&n.Ca.d_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function Xy(r,e,t){const n=N(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Na.get(e),i=s&&s.key;if(i){let o=new se(M.comparator);o=o.insert(i,oe.newNoDocument(i,q.min()));const u=K().add(i),c=new os(q.min(),new Map,new se(z),o,u);await Xd(n,c),n.Oa=n.Oa.remove(i),n.Na.delete(e),Ua(n)}else await Kn(n.localStore,e,!1).then((()=>Hn(n,e,t))).catch(Ut)}async function Zy(r,e){const t=N(r),n=e.batch.batchId;try{const s=await my(t.localStore,e);Ba(t,n,null),La(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await pt(t,s)}catch(s){await Ut(s)}}async function eI(r,e,t){const n=N(r);try{const s=await(function(o,u){const c=N(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next((m=>(B(m!==null),f=m.keys(),c.mutationQueue.removeMutationBatch(h,m)))).next((()=>c.mutationQueue.performConsistencyCheck(h))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>c.localDocuments.getDocuments(h,f)))}))})(n.localStore,e);Ba(n,e,t),La(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await pt(n,s)}catch(s){await Ut(s)}}async function tI(r,e){const t=N(r);$t(t.remoteStore)||k("SyncEngine","The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");try{const n=await(function(o){const u=N(o);return u.persistence.runTransaction("Get highest unacknowledged batch id","readonly",(c=>u.mutationQueue.getHighestUnacknowledgedBatchId(c)))})(t.localStore);if(n===-1)return void e.resolve();const s=t.ka.get(n)||[];s.push(e),t.ka.set(n,s)}catch(n){const s=ir(n,"Initialization of waitForPendingWrites() operation failed");e.reject(s)}}function La(r,e){(r.ka.get(e)||[]).forEach((t=>{t.resolve()})),r.ka.delete(e)}function Ba(r,e,t){const n=N(r);let s=n.Ba[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.Ba[n.currentUser.toKey()]=s}}function Hn(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach((n=>{r.La.containsKey(n)||Zd(r,n)}))}function Zd(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(Qn(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),Ua(r))}function Yo(r,e,t){for(const n of t)n instanceof Wd?(r.La.addReference(n.key,e),nI(r,n)):n instanceof Hd?(k("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||Zd(r,n.key)):F()}function nI(r,e){const t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(k("SyncEngine","New document in limbo: "+t),r.xa.add(n),Ua(r))}function Ua(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new M(W.fromString(e)),n=r.qa.next();r.Na.set(n,new Gy(t)),r.Oa=r.Oa.insert(t,n),Si(r.remoteStore,new ot(Ne(Zn(t.path)),n,"TargetPurposeLimboResolution",Fe.oe))}}async function pt(r,e,t){const n=N(r),s=[],i=[],o=[];n.Fa.isEmpty()||(n.Fa.forEach(((u,c)=>{o.push(n.Ka(c,e,t).then((h=>{var f;if((h||t)&&n.isPrimaryClient){const m=h?!h.fromCache:(f=t?.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(c.targetId,m?"current":"not-current")}if(h){s.push(h);const m=Ra.Wi(c.targetId,h);i.push(m)}})))})),await Promise.all(o),n.Ca.d_(s),await(async function(c,h){const f=N(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>A.forEach(h,(g=>A.forEach(g.$i,(w=>f.persistence.referenceDelegate.addReference(m,g.targetId,w))).next((()=>A.forEach(g.Ui,(w=>f.persistence.referenceDelegate.removeReference(m,g.targetId,w)))))))))}catch(m){if(!qt(m))throw m;k("LocalStore","Failed to update sequence numbers: "+m)}for(const m of h){const g=m.targetId;if(!m.fromCache){const w=f.os.get(g),C=w.snapshotVersion,x=w.withLastLimboFreeSnapshotVersion(C);f.os=f.os.insert(g,x)}}})(n.localStore,i))}async function rI(r,e){const t=N(r);if(!t.currentUser.isEqual(e)){k("SyncEngine","User change. New user:",e.toKey());const n=await kd(t.localStore,e);t.currentUser=e,(function(i,o){i.ka.forEach((u=>{u.forEach((c=>{c.reject(new D(P.CANCELLED,o))}))})),i.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await pt(t,n.hs)}}function sI(r,e){const t=N(r),n=t.Na.get(e);if(n&&n.va)return K().add(n.key);{let s=K();const i=t.Ma.get(e);if(!i)return s;for(const o of i){const u=t.Fa.get(o);s=s.unionWith(u.view.Va)}return s}}async function iI(r,e){const t=N(r),n=await ai(t.localStore,e.query,!0),s=e.view.ba(n);return t.isPrimaryClient&&Yo(t,e.targetId,s.wa),s}async function oI(r,e){const t=N(r);return Fd(t.localStore,e).then((n=>pt(t,n)))}async function aI(r,e,t,n){const s=N(r),i=await(function(u,c){const h=N(u),f=N(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",(m=>f.Mn(m,c).next((g=>g?h.localDocuments.getDocuments(m,g):A.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await rr(s.remoteStore):t==="acknowledged"||t==="rejected"?(Ba(s,e,n||null),La(s,e),(function(u,c){N(N(u).mutationQueue).On(c)})(s.localStore,e)):F(),await pt(s,i)):k("SyncEngine","Cannot apply mutation batch with id: "+e)}async function uI(r,e){const t=N(r);if(Vi(t),qa(t),e===!0&&t.Qa!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),s=await El(t,n.toArray());t.Qa=!0,await Ho(t.remoteStore,!0);for(const i of s)Si(t.remoteStore,i)}else if(e===!1&&t.Qa!==!1){const n=[];let s=Promise.resolve();t.Ma.forEach(((i,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):s=s.then((()=>(Hn(t,o),Kn(t.localStore,o,!0)))),Qn(t.remoteStore,o)})),await s,await El(t,n),(function(o){const u=N(o);u.Na.forEach(((c,h)=>{Qn(u.remoteStore,h)})),u.La.pr(),u.Na=new Map,u.Oa=new se(M.comparator)})(t),t.Qa=!1,await Ho(t.remoteStore,!1)}}async function El(r,e,t){const n=N(r),s=[],i=[];for(const o of e){let u;const c=n.Ma.get(o);if(c&&c.length!==0){u=await Gn(n.localStore,Ne(c[0]));for(const h of c){const f=n.Fa.get(h),m=await iI(n,f);m.snapshot&&i.push(m.snapshot)}}else{const h=await Md(n.localStore,o);u=await Gn(n.localStore,h),await Fa(n,ef(h),o,!1,u.resumeToken)}s.push(u)}return n.Ca.d_(i),s}function ef(r){return Lh(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function cI(r){return(function(t){return N(N(t).persistence).Qi()})(N(r).localStore)}async function lI(r,e,t,n){const s=N(r);if(s.Qa)return void k("SyncEngine","Ignoring unexpected query state notification.");const i=s.Ma.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const o=await Fd(s.localStore,jh(i[0])),u=os.createSynthesizedRemoteEventForCurrentChange(e,t==="current",de.EMPTY_BYTE_STRING);await pt(s,o,u);break}case"rejected":await Kn(s.localStore,e,!0),Hn(s,e,n);break;default:F()}}async function hI(r,e,t){const n=Vi(r);if(n.Qa){for(const s of e){if(n.Ma.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){k("SyncEngine","Adding an already active target "+s);continue}const i=await Md(n.localStore,s),o=await Gn(n.localStore,i);await Fa(n,ef(i),o.targetId,!1,o.resumeToken),Si(n.remoteStore,o)}for(const s of t)n.Ma.has(s)&&await Kn(n.localStore,s,!1).then((()=>{Qn(n.remoteStore,s),Hn(n,s)})).catch(Ut)}}function Vi(r){const e=N(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Xd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=sI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Xy.bind(null,e),e.Ca.d_=Uy.bind(null,e.eventManager),e.Ca.$a=qy.bind(null,e.eventManager),e}function qa(r){const e=N(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Zy.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=eI.bind(null,e),e}function dI(r,e,t){const n=N(r);(async function(i,o,u){try{const c=await o.getMetadata();if(await(function(w,C){const x=N(w),V=ge(C.createTime);return x.persistence.runTransaction("hasNewerBundle","readonly",(U=>x.Gr.getBundleMetadata(U,C.id))).then((U=>!!U&&U.createTime.compareTo(V)>=0))})(i.localStore,c))return await o.close(),u._completeWith((function(w){return{taskState:"Success",documentsLoaded:w.totalDocuments,bytesLoaded:w.totalBytes,totalDocuments:w.totalDocuments,totalBytes:w.totalBytes}})(c)),Promise.resolve(new Set);u._updateProgress(Qd(c));const h=new $y(c,i.localStore,o.serializer);let f=await o.Ua();for(;f;){const g=await h.la(f);g&&u._updateProgress(g),f=await o.Ua()}const m=await h.complete();return await pt(i,m.Ia,void 0),await(function(w,C){const x=N(w);return x.persistence.runTransaction("Save bundle","readwrite",(V=>x.Gr.saveBundleMetadata(V,C)))})(i.localStore,c),u._completeWith(m.progress),Promise.resolve(m.Pa)}catch(c){return $e("SyncEngine",`Loading bundle failed with ${c}`),u._failWith(c),Promise.resolve(new Set)}})(n,e,t).then((s=>{n.sharedClientState.notifyBundleLoaded(s)}))}class Mt{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=us(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return xd(this.persistence,new Dd,e.initialUser,this.serializer)}Ga(e){return new va(Pi.Zr,this.serializer)}Wa(e){return new Bd}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Mt.provider={build:()=>new Mt};class fI extends Mt{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){B(this.persistence.referenceDelegate instanceof oi);const n=this.persistence.referenceDelegate.garbageCollector;return new Rd(n,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?xe.withCacheSize(this.cacheSizeBytes):xe.DEFAULT;return new va((n=>oi.Zr(n,t)),this.serializer)}}class ja extends Mt{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await qa(this.Ja.syncEngine),await rr(this.Ja.remoteStore),await this.persistence.yi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}za(e){return xd(this.persistence,new Dd,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Rd(n,e.asyncQueue,t)}Ha(e,t){const n=new Ng(t,this.persistence);return new kg(e.asyncQueue,n)}Ga(e){const t=ba(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?xe.withCacheSize(this.cacheSizeBytes):xe.DEFAULT;return new Aa(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Ud(),Js(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new Bd}}class tf extends ja{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Ja.syncEngine;this.sharedClientState instanceof Eo&&(this.sharedClientState.syncEngine={no:aI.bind(null,t),ro:lI.bind(null,t),io:hI.bind(null,t),Qi:cI.bind(null,t),eo:oI.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi((async n=>{await uI(this.Ja.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}Wa(e){const t=Ud();if(!Eo.D(t))throw new D(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=ba(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Eo(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Ft{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Tl(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=rI.bind(null,this.syncEngine),await Ho(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new By})()}createDatastore(e){const t=us(e.databaseInfo.databaseId),n=(function(i){return new wy(i)})(e.databaseInfo);return(function(i,o,u,c){return new by(i,o,u,c)})(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,o,u){return new Py(n,s,i,o,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>Tl(this.syncEngine,t,0)),(function(){return ml.D()?new ml:new Iy})())}createSyncEngine(e,t){return(function(s,i,o,u,c,h,f){const m=new Ky(s,i,o,u,c,h);return f&&(m.Qa=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(s){const i=N(s);k("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await nr(i),i.k_.shutdown(),i.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ft.provider={build:()=>new Ft};function wl(r,e=10240){let t=0;return{async read(){if(t<r.byteLength){const n={value:r.slice(t,t+e),done:!1};return t+=e,n}return{done:!0}},async cancel(){},releaseLock(){},closed:Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):pe("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(e,t){this.Xa=e,this.serializer=t,this.metadata=new we,this.buffer=new Uint8Array,this.eu=(function(){return new TextDecoder("utf-8")})(),this.tu().then((n=>{n&&n.ua()?this.metadata.resolve(n.aa.metadata):this.metadata.reject(new Error(`The first element of the bundle is not a metadata, it is
             ${JSON.stringify(n?.aa)}`))}),(n=>this.metadata.reject(n)))}close(){return this.Xa.cancel()}async getMetadata(){return this.metadata.promise}async Ua(){return await this.getMetadata(),this.tu()}async tu(){const e=await this.nu();if(e===null)return null;const t=this.eu.decode(e),n=Number(t);isNaN(n)&&this.ru(`length string (${t}) is not valid number`);const s=await this.iu(n);return new jy(JSON.parse(s),e.length+n)}su(){return this.buffer.findIndex((e=>e===123))}async nu(){for(;this.su()<0&&!await this.ou(););if(this.buffer.length===0)return null;const e=this.su();e<0&&this.ru("Reached the end of bundle when a length string is expected.");const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}async iu(e){for(;this.buffer.length<e;)await this.ou()&&this.ru("Reached the end of bundle when more is expected.");const t=this.eu.decode(this.buffer.slice(0,e));return this.buffer=this.buffer.slice(e),t}ru(e){throw this.Xa.cancel(),new Error(`Invalid bundle format: ${e}`)}async ou(){const e=await this.Xa.read();if(!e.done){const t=new Uint8Array(this.buffer.length+e.value.length);t.set(this.buffer),t.set(e.value,this.buffer.length),this.buffer=t}return e.done}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new D(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await(async function(s,i){const o=N(s),u={documents:i.map((m=>Yr(o.serializer,m)))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,W.emptyPath(),u,i.length),h=new Map;c.forEach((m=>{const g=x_(o.serializer,m);h.set(g.key.toString(),g)}));const f=[];return i.forEach((m=>{const g=h.get(m.toString());B(!!g),f.push(g)})),f})(this.datastore,e);return t.forEach((n=>this.recordVersion(n))),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new tr(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach((t=>{e.delete(t.key.toString())})),e.forEach(((t,n)=>{const s=M.fromPath(n);this.mutations.push(new fa(s,this.precondition(s)))})),await(async function(n,s){const i=N(n),o={writes:s.map((u=>Xr(i.serializer,u)))};await i.Mo("Commit",i.serializer.databaseId,W.emptyPath(),o)})(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw F();t=q.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new D(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(q.min())?ce.exists(!1):ce.updateTime(t):ce.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(q.min()))throw new D(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ce.updateTime(t)}return ce.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gI{constructor(e,t,n,s,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=s,this.deferred=i,this._u=n.maxAttempts,this.t_=new Sa(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go((async()=>{const e=new pI(this.datastore),t=this.cu(e);t&&t.then((n=>{this.asyncQueue.enqueueAndForget((()=>e.commit().then((()=>{this.deferred.resolve(n)})).catch((s=>{this.lu(s)}))))})).catch((n=>{this.lu(n)}))}))}cu(e){try{const t=this.updateFunction(e);return!ts(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget((()=>(this.uu(),Promise.resolve())))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!nd(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=Ee.UNAUTHENTICATED,this.clientId=ia.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async o=>{k("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(n,(o=>(k("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new we;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=ir(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function vo(r,e){r.asyncQueue.verifyOperationInProgress(),k("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await kd(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function vl(r,e){r.asyncQueue.verifyOperationInProgress();const t=await $a(r);k("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>pl(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>pl(e.remoteStore,s))),r._onlineComponents=e}async function $a(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){k("FirestoreClient","Using user provided OfflineComponentProvider");try{await vo(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;$e("Error using user provided cache. Falling back to memory cache: "+t),await vo(r,new Mt)}}else k("FirestoreClient","Using default OfflineComponentProvider"),await vo(r,new Mt);return r._offlineComponents}async function Di(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(k("FirestoreClient","Using user provided OnlineComponentProvider"),await vl(r,r._uninitializedComponentsProvider._online)):(k("FirestoreClient","Using default OnlineComponentProvider"),await vl(r,new Ft))),r._onlineComponents}function nf(r){return $a(r).then((e=>e.persistence))}function or(r){return $a(r).then((e=>e.localStore))}function rf(r){return Di(r).then((e=>e.remoteStore))}function za(r){return Di(r).then((e=>e.syncEngine))}function sf(r){return Di(r).then((e=>e.datastore))}async function Jn(r){const e=await Di(r),t=e.eventManager;return t.onListen=Qy.bind(null,e.syncEngine),t.onUnlisten=Hy.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Wy.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Jy.bind(null,e.syncEngine),t}function yI(r){return r.asyncQueue.enqueue((async()=>{const e=await nf(r),t=await rf(r);return e.setNetworkEnabled(!0),(function(s){const i=N(s);return i.L_.delete(0),cs(i)})(t)}))}function II(r){return r.asyncQueue.enqueue((async()=>{const e=await nf(r),t=await rf(r);return e.setNetworkEnabled(!1),(async function(s){const i=N(s);i.L_.add(0),await nr(i),i.q_.set("Offline")})(t)}))}function TI(r,e){const t=new we;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const u=await(function(h,f){const m=N(h);return m.persistence.runTransaction("read document","readonly",(g=>m.localDocuments.getDocument(g,f)))})(s,i);u.isFoundDocument()?o.resolve(u):u.isNoDocument()?o.resolve(null):o.reject(new D(P.UNAVAILABLE,"Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"))}catch(u){const c=ir(u,`Failed to get document '${i} from cache`);o.reject(c)}})(await or(r),e,t))),t.promise}function of(r,e,t={}){const n=new we;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,u,c,h){const f=new Ci({next:g=>{f.Za(),o.enqueueAndForget((()=>Na(i,m)));const w=g.docs.has(u);!w&&g.fromCache?h.reject(new D(P.UNAVAILABLE,"Failed to get document because the client is offline.")):w&&g.fromCache&&c&&c.source==="server"?h.reject(new D(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new Ma(Zn(u.path),f,{includeMetadataChanges:!0,_a:!0});return ka(i,m)})(await Jn(r),r.asyncQueue,e,t,n))),n.promise}function EI(r,e){const t=new we;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,o){try{const u=await ai(s,i,!0),c=new Jd(i,u.Ts),h=c.ma(u.documents),f=c.applyChanges(h,!1);o.resolve(f.snapshot)}catch(u){const c=ir(u,`Failed to execute query '${i} against cache`);o.reject(c)}})(await or(r),e,t))),t.promise}function af(r,e,t={}){const n=new we;return r.asyncQueue.enqueueAndForget((async()=>(function(i,o,u,c,h){const f=new Ci({next:g=>{f.Za(),o.enqueueAndForget((()=>Na(i,m))),g.fromCache&&c.source==="server"?h.reject(new D(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),m=new Ma(u,f,{includeMetadataChanges:!0,_a:!0});return ka(i,m)})(await Jn(r),r.asyncQueue,e,t,n))),n.promise}function wI(r,e,t){const n=new we;return r.asyncQueue.enqueueAndForget((async()=>{try{const s=await sf(r);n.resolve((async function(o,u,c){var h;const f=N(o),{request:m,ut:g,parent:w}=md(f.serializer,Bh(u),c);f.connection.Fo||delete m.parent;const C=(await f.Lo("RunAggregationQuery",f.serializer.databaseId,w,m,1)).filter((V=>!!V.result));B(C.length===1);const x=(h=C[0].result)===null||h===void 0?void 0:h.aggregateFields;return Object.keys(x).reduce(((V,U)=>(V[g[U]]=x[U],V)),{})})(s,e,t))}catch(s){n.reject(s)}})),n.promise}function vI(r,e){const t=new Ci(e);return r.asyncQueue.enqueueAndForget((async()=>(function(s,i){N(s).Y_.add(i),i.next()})(await Jn(r),t))),()=>{t.Za(),r.asyncQueue.enqueueAndForget((async()=>(function(s,i){N(s).Y_.delete(i)})(await Jn(r),t)))}}function AI(r,e,t,n){const s=(function(o,u){let c;return c=typeof o=="string"?sd().encode(o):o,(function(f,m){return new mI(f,m)})((function(f,m){if(f instanceof Uint8Array)return wl(f,m);if(f instanceof ArrayBuffer)return wl(new Uint8Array(f),m);if(f instanceof ReadableStream)return f.getReader();throw new Error("Source of `toByteStreamReader` has to be a ArrayBuffer or ReadableStream")})(c),u)})(t,us(e));r.asyncQueue.enqueueAndForget((async()=>{dI(await za(r),s,n)}))}function bI(r,e){return r.asyncQueue.enqueue((async()=>(function(n,s){const i=N(n);return i.persistence.runTransaction("Get named query","readonly",(o=>i.Gr.getNamedQuery(o,s)))})(await or(r),e)))}function RI(r,e){return r.asyncQueue.enqueue((async()=>(async function(n,s){const i=N(n),o=i.indexManager,u=[];return i.persistence.runTransaction("Configure indexes","readwrite",(c=>o.getFieldIndexes(c).next((h=>(function(m,g,w,C,x){m=[...m],g=[...g],m.sort(w),g.sort(w);const V=m.length,U=g.length;let j=0,L=0;for(;j<U&&L<V;){const $=w(m[L],g[j]);$<0?x(m[L++]):$>0?C(g[j++]):(j++,L++)}for(;j<U;)C(g[j++]);for(;L<V;)x(m[L++])})(h,s,Vg,(f=>{u.push(o.addFieldIndex(c,f))}),(f=>{u.push(o.deleteFieldIndex(c,f))})))).next((()=>A.waitFor(u)))))})(await or(r),e)))}function PI(r,e){return r.asyncQueue.enqueue((async()=>(function(n,s){N(n).ss.zi=s})(await or(r),e)))}function SI(r){return r.asyncQueue.enqueue((async()=>(function(t){const n=N(t),s=n.indexManager;return n.persistence.runTransaction("Delete All Indexes","readwrite",(i=>s.deleteAllFieldIndexes(i)))})(await or(r))))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uf(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(r,e,t){if(!t)throw new D(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function cf(r,e,t,n){if(e===!0&&n===!0)throw new D(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function bl(r){if(!M.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Rl(r){if(M.isDocumentKey(r))throw new D(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function xi(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":F()}function Q(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new D(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=xi(r);throw new D(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function lf(r,e){if(e<=0)throw new D(P.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new D(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new D(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}cf("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=uf((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new D(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ls{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Pl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Pl(e),e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new dh;switch(n.type){case"firstParty":return new Ag(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=Al.get(t);n&&(k("ComponentProvider","Removing Datastore"),Al.delete(t),n.terminate())})(this),Promise.resolve()}}function hf(r,e,t,n={}){var s;const i=(r=Q(r,ls))._getSettings(),o=`${e}:${t}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&$e("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),n.mockUserToken){let u,c;if(typeof n.mockUserToken=="string")u=n.mockUserToken,c=Ee.MOCK_USER;else{u=Jl(n.mockUserToken,(s=r._app)===null||s===void 0?void 0:s.options.projectId);const h=n.mockUserToken.sub||n.mockUserToken.user_id;if(!h)throw new D(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Ee(h)}r._authCredentials=new Eg(new hh(u,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new ve(this.firestore,e,this._query)}}class me{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new We(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new me(this.firestore,e,this._key)}}class We extends ve{constructor(e,t,n){super(e,t,Zn(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new me(this.firestore,null,new M(e))}withConverter(e){return new We(this.firestore,e,this._path)}}function VI(r,e,...t){if(r=_e(r),Ga("collection","path",e),r instanceof ls){const n=W.fromString(e,...t);return Rl(n),new We(r,null,n)}{if(!(r instanceof me||r instanceof We))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(W.fromString(e,...t));return Rl(n),new We(r.firestore,null,n)}}function CI(r,e){if(r=Q(r,ls),Ga("collectionGroup","collection id",e),e.indexOf("/")>=0)throw new D(P.INVALID_ARGUMENT,`Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);return new ve(r,null,(function(n){return new dt(W.emptyPath(),n)})(e))}function df(r,e,...t){if(r=_e(r),arguments.length===1&&(e=ia.newId()),Ga("doc","path",e),r instanceof ls){const n=W.fromString(e,...t);return bl(n),new me(r,null,new M(n))}{if(!(r instanceof me||r instanceof We))throw new D(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(W.fromString(e,...t));return bl(n),new me(r.firestore,r instanceof We?r.converter:null,new M(n))}}function DI(r,e){return r=_e(r),e=_e(e),(r instanceof me||r instanceof We)&&(e instanceof me||e instanceof We)&&r.firestore===e.firestore&&r.path===e.path&&r.converter===e.converter}function Ka(r,e){return r=_e(r),e=_e(e),r instanceof ve&&e instanceof ve&&r.firestore===e.firestore&&rs(r._query,e._query)&&r.converter===e.converter}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Sa(this,"async_queue_retry"),this.Vu=()=>{const n=Js();n&&k("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;const t=Js();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=Js();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new we;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!qt(e))throw e;k("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((n=>{this.Eu=n,this.du=!1;const s=(function(o){let u=o.message||"";return o.stack&&(u=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),u})(n);throw pe("INTERNAL UNHANDLED ERROR: ",s),n})).then((n=>(this.du=!1,n))))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=xa.createAndSchedule(this,e,t,n,(i=>this.yu(i)));return this.Tu.push(s),s}fu(){this.Eu&&F()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Xo(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}class ff{constructor(){this._progressObserver={},this._taskCompletionResolver=new we,this._lastProgress={taskState:"Running",totalBytes:0,totalDocuments:0,bytesLoaded:0,documentsLoaded:0}}onProgress(e,t,n){this._progressObserver={next:e,error:t,complete:n}}catch(e){return this._taskCompletionResolver.promise.catch(e)}then(e,t){return this._taskCompletionResolver.promise.then(e,t)}_completeWith(e){this._updateProgress(e),this._progressObserver.complete&&this._progressObserver.complete(),this._taskCompletionResolver.resolve(e)}_failWith(e){this._lastProgress.taskState="Error",this._progressObserver.next&&this._progressObserver.next(this._lastProgress),this._progressObserver.error&&this._progressObserver.error(e),this._taskCompletionResolver.reject(e)}_updateProgress(e){this._lastProgress=e,this._progressObserver.next&&this._progressObserver.next(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xI=-1;class ne extends ls{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Sl,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Sl(e),this._firestoreClient=void 0,await e}}}function kI(r,e,t){t||(t="(default)");const n=Bt(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(Vt(i,e))return s;throw new D(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new D(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function NI(r,e){const t=typeof r=="object"?r:ra(),n=typeof r=="string"?r:e||"(default)",s=Bt(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=Wl("firestore");i&&hf(s,...i)}return s}function he(r){if(r._terminated)throw new D(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||mf(r),r._firestoreClient}function mf(r){var e,t,n;const s=r._freezeSettings(),i=(function(u,c,h,f){return new n_(u,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,uf(f.experimentalLongPollingOptions),f.useFetchStreams)})(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=s.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new _I(r._authCredentials,r._appCheckCredentials,r._queue,i,r._componentsProvider&&(function(u){const c=u?._online.build();return{_offline:u?._offline.build(c),_online:c}})(r._componentsProvider))}function OI(r,e){$e("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return pf(r,Ft.provider,{build:n=>new ja(n,t.cacheSizeBytes,e?.forceOwnership)}),Promise.resolve()}async function MI(r){$e("enableMultiTabIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const e=r._freezeSettings();pf(r,Ft.provider,{build:t=>new tf(t,e.cacheSizeBytes)})}function pf(r,e,t){if((r=Q(r,ne))._firestoreClient||r._terminated)throw new D(P.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new D(P.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},mf(r)}function FI(r){if(r._initialized&&!r._terminated)throw new D(P.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");const e=new we;return r._queue.enqueueAndForgetEvenWhileRestricted((async()=>{try{await(async function(n){if(!Ye.D())return Promise.resolve();const s=n+"main";await Ye.delete(s)})(ba(r._databaseId,r._persistenceKey)),e.resolve()}catch(t){e.reject(t)}})),e.promise}function LI(r){return(function(t){const n=new we;return t.asyncQueue.enqueueAndForget((async()=>tI(await za(t),n))),n.promise})(he(r=Q(r,ne)))}function BI(r){return yI(he(r=Q(r,ne)))}function UI(r){return II(he(r=Q(r,ne)))}function qI(r){return sg(r.app,"firestore",r._databaseId.database),r._delete()}function jI(r,e){const t=he(r=Q(r,ne)),n=new ff;return AI(t,r._databaseId,e,n),n}function $I(r,e){return bI(he(r=Q(r,ne)),e).then((t=>t?new ve(r,null,t.query):null))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e="count",t){this._internalFieldPath=t,this.type="AggregateField",this.aggregateType=e}}class gf{constructor(e,t,n){this._userDataWriter=t,this._data=n,this.type="AggregateQuerySnapshot",this.query=e}data(){return this._userDataWriter.convertObjectMap(this._data)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Lt(de.fromBase64String(e))}catch(t){throw new D(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Lt(de.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ae(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function zI(){return new zt("__name__")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GI=/^__.*__$/;class KI{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new mt(e,this.data,this.fieldMask,t,this.fieldTransforms):new er(e,this.data,t,this.fieldTransforms)}}class _f{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new mt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function yf(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F()}}class Ni{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Ni(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:n,xu:!1});return s.Ou(e),s}Nu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:n,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return hi(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(yf(this.Cu)&&GI.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class QI{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||us(e)}Qu(e,t,n,s=!1){return new Ni({Cu:e,methodName:t,qu:n,path:ae.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function In(r){const e=r._freezeSettings(),t=us(r._databaseId);return new QI(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Oi(r,e,t,n,s,i={}){const o=r.Qu(i.merge||i.mergeFields?2:0,e,t,s);Za("Data must be an object, but it was:",o,n);const u=Ef(n,o);let c,h;if(i.merge)c=new Le(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const g=Zr(e,m,t);if(!o.contains(g))throw new D(P.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);vf(f,g)||f.push(g)}c=new Le(f),h=o.fieldTransforms.filter((m=>c.covers(m.field)))}else c=null,h=o.fieldTransforms;return new KI(new Re(u),c,h)}class ds extends Gt{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ds}}function If(r,e,t){return new Ni({Cu:3,qu:e.settings.qu,methodName:r._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Qa extends Gt{_toFieldTransform(e){return new is(e.path,new jn)}isEqual(e){return e instanceof Qa}}class Wa extends Gt{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=If(this,e,!0),n=this.Ku.map((i=>Tn(i,t))),s=new ln(n);return new is(e.path,s)}isEqual(e){return e instanceof Wa&&Vt(this.Ku,e.Ku)}}class Ha extends Gt{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=If(this,e,!0),n=this.Ku.map((i=>Tn(i,t))),s=new hn(n);return new is(e.path,s)}isEqual(e){return e instanceof Ha&&Vt(this.Ku,e.Ku)}}class Ja extends Gt{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new $n(e.serializer,Wh(e.serializer,this.$u));return new is(e.path,t)}isEqual(e){return e instanceof Ja&&this.$u===e.$u}}function Ya(r,e,t,n){const s=r.Qu(1,e,t);Za("Data must be an object, but it was:",s,n);const i=[],o=Re.empty();jt(n,((c,h)=>{const f=Mi(e,c,t);h=_e(h);const m=s.Nu(f);if(h instanceof ds)i.push(f);else{const g=Tn(h,m);g!=null&&(i.push(f),o.set(f,g))}}));const u=new Le(i);return new _f(o,u,s.fieldTransforms)}function Xa(r,e,t,n,s,i){const o=r.Qu(1,e,t),u=[Zr(e,n,t)],c=[s];if(i.length%2!=0)throw new D(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)u.push(Zr(e,i[g])),c.push(i[g+1]);const h=[],f=Re.empty();for(let g=u.length-1;g>=0;--g)if(!vf(h,u[g])){const w=u[g];let C=c[g];C=_e(C);const x=o.Nu(w);if(C instanceof ds)h.push(w);else{const V=Tn(C,x);V!=null&&(h.push(w),f.set(w,V))}}const m=new Le(h);return new _f(f,m,o.fieldTransforms)}function Tf(r,e,t,n=!1){return Tn(t,r.Qu(n?4:3,e))}function Tn(r,e){if(wf(r=_e(r)))return Za("Unsupported field value:",e,r),Ef(r,e);if(r instanceof Gt)return(function(n,s){if(!yf(s.Cu))throw s.Bu(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return(function(n,s){const i=[];let o=0;for(const u of n){let c=Tn(u,s.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}})(r,e)}return(function(n,s){if((n=_e(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Wh(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=le.fromDate(n);return{timestampValue:zn(s.serializer,i)}}if(n instanceof le){const i=new le(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:zn(s.serializer,i)}}if(n instanceof ki)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Lt)return{bytesValue:ad(s.serializer,n._byteString)};if(n instanceof me){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ya(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof hs)return(function(o,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map((c=>{if(typeof c!="number")throw u.Bu("VectorValues must only contain numeric values.");return da(u.serializer,c)}))}}}}}})(n,s);throw s.Bu(`Unsupported field value: ${xi(n)}`)})(r,e)}function Ef(r,e){const t={};return Rh(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):jt(r,((n,s)=>{const i=Tn(s,e.Mu(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function wf(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof le||r instanceof ki||r instanceof Lt||r instanceof me||r instanceof Gt||r instanceof hs)}function Za(r,e,t){if(!wf(t)||!(function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)})(t)){const n=xi(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function Zr(r,e,t){if((e=_e(e))instanceof zt)return e._internalPath;if(typeof e=="string")return Mi(r,e);throw hi("Field path arguments must be of type string or ",r,!1,void 0,t)}const WI=new RegExp("[~\\*/\\[\\]]");function Mi(r,e,t){if(e.search(WI)>=0)throw hi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new zt(...e.split("."))._internalPath}catch{throw hi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function hi(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${n}`),o&&(c+=` in document ${s}`),c+=")"),new D(P.INVALID_ARGUMENT,u+r+c)}function vf(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new me(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new HI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Fi("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class HI extends es{data(){return super.data()}}function Fi(r,e){return typeof e=="string"?Mi(r,e):e instanceof zt?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Af(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new D(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class eu{}class ar extends eu{}function JI(r,e,...t){let n=[];e instanceof eu&&n.push(e),n=n.concat(t),(function(i){const o=i.filter((c=>c instanceof En)).length,u=i.filter((c=>c instanceof ur)).length;if(o>1||o>0&&u>0)throw new D(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class ur extends ar{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new ur(e,t,n)}_apply(e){const t=this._parse(e);return Rf(e._query,t),new ve(e.firestore,e.converter,Uo(e._query,t))}_parse(e){const t=In(e.firestore);return(function(i,o,u,c,h,f,m){let g;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new D(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Cl(m,f);const w=[];for(const C of m)w.push(Vl(c,i,C));g={arrayValue:{values:w}}}else g=Vl(c,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Cl(m,f),g=Tf(u,o,m,f==="in"||f==="not-in");return H.create(h,f,g)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function YI(r,e,t){const n=e,s=Fi("where",r);return ur._create(s,n,t)}class En extends eu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new En(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:ee.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const u=i.getFlattenedFilters();for(const c of u)Rf(o,c),o=Uo(o,c)})(e._query,t),new ve(e.firestore,e.converter,Uo(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function XI(...r){return r.forEach((e=>Pf("or",e))),En._create("or",r)}function ZI(...r){return r.forEach((e=>Pf("and",e))),En._create("and",r)}class Li extends ar{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Li(e,t)}_apply(e){const t=(function(s,i,o){if(s.startAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new D(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Jr(i,o)})(e._query,this._field,this._direction);return new ve(e.firestore,e.converter,(function(s,i){const o=s.explicitOrderBy.concat([i]);return new dt(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(e._query,t))}}function eT(r,e="asc"){const t=e,n=Fi("orderBy",r);return Li._create(n,t)}class fs extends ar{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new fs(e,t,n)}_apply(e){return new ve(e.firestore,e.converter,ti(e._query,this._limit,this._limitType))}}function tT(r){return lf("limit",r),fs._create("limit",r,"F")}function nT(r){return lf("limitToLast",r),fs._create("limitToLast",r,"L")}class ms extends ar{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new ms(e,t,n)}_apply(e){const t=bf(e,this.type,this._docOrFields,this._inclusive);return new ve(e.firestore,e.converter,(function(s,i){return new dt(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,i,s.endAt)})(e._query,t))}}function rT(...r){return ms._create("startAt",r,!0)}function sT(...r){return ms._create("startAfter",r,!1)}class ps extends ar{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new ps(e,t,n)}_apply(e){const t=bf(e,this.type,this._docOrFields,this._inclusive);return new ve(e.firestore,e.converter,(function(s,i){return new dt(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),s.limit,s.limitType,s.startAt,i)})(e._query,t))}}function iT(...r){return ps._create("endBefore",r,!1)}function oT(...r){return ps._create("endAt",r,!0)}function bf(r,e,t,n){if(t[0]=_e(t[0]),t[0]instanceof es)return(function(i,o,u,c,h){if(!c)throw new D(P.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${u}().`);const f=[];for(const m of Nn(i))if(m.field.isKeyField())f.push(un(o,c.key));else{const g=c.data.field(m.field);if(Ii(g))throw new D(P.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+m.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(g===null){const w=m.field.canonicalString();throw new D(P.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${w}' (used as the orderBy) does not exist.`)}f.push(g)}return new Nt(f,h)})(r._query,r.firestore._databaseId,e,t[0]._document,n);{const s=In(r.firestore);return(function(o,u,c,h,f,m){const g=o.explicitOrderBy;if(f.length>g.length)throw new D(P.INVALID_ARGUMENT,`Too many arguments provided to ${h}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const w=[];for(let C=0;C<f.length;C++){const x=f[C];if(g[C].field.isKeyField()){if(typeof x!="string")throw new D(P.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${h}(), but got a ${typeof x}`);if(!la(o)&&x.indexOf("/")!==-1)throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${h}() must be a plain document ID, but '${x}' contains a slash.`);const V=o.path.child(W.fromString(x));if(!M.isDocumentKey(V))throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${h}() must result in a valid document path, but '${V}' is not because it contains an odd number of segments.`);const U=new M(V);w.push(un(u,U))}else{const V=Tf(c,h,x);w.push(V)}}return new Nt(w,m)})(r._query,r.firestore._databaseId,s,e,t,n)}}function Vl(r,e,t){if(typeof(t=_e(t))=="string"){if(t==="")throw new D(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!la(e)&&t.indexOf("/")!==-1)throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(W.fromString(t));if(!M.isDocumentKey(n))throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return un(r,new M(n))}if(t instanceof me)return un(r,t._key);throw new D(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${xi(t)}.`)}function Cl(r,e){if(!Array.isArray(r)||r.length===0)throw new D(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Rf(r,e){const t=(function(s,i){for(const o of s)for(const u of o.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function Pf(r,e){if(!(e instanceof ur||e instanceof En))throw new D(P.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class tu{convertValue(e,t="none"){switch(xt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ue(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(lt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return jt(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){var t,n,s;const i=(s=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.map((o=>ue(o.doubleValue)));return new hs(i)}convertGeoPoint(e){return new ki(ue(e.latitude),ue(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Ti(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Qr(e));default:return null}}convertTimestamp(e){const t=ct(e);return new le(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=W.fromString(e);B(yd(n));const s=new Dt(n.get(1),n.get(3)),i=new M(n.popFirst(5));return s.isEqual(t)||pe(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bi(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class aT extends tu{constructor(e){super(),this.firestore=e}convertBytes(e){return new Lt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new me(this.firestore,null,t)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uT(r){return new Yn("sum",Zr("sum",r))}function cT(r){return new Yn("avg",Zr("average",r))}function Sf(){return new Yn("count")}function lT(r,e){var t,n;return r instanceof Yn&&e instanceof Yn&&r.aggregateType===e.aggregateType&&((t=r._internalFieldPath)===null||t===void 0?void 0:t.canonicalString())===((n=e._internalFieldPath)===null||n===void 0?void 0:n.canonicalString())}function hT(r,e){return Ka(r.query,e.query)&&Vt(r.data(),e.data())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class pn extends es{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new qr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Fi("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class qr extends pn{data(e={}){return super.data(e)}}class gn{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Rt(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new qr(this._firestore,this._userDataWriter,n.key,n,new Rt(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((u=>{const c=new qr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Rt(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((u=>i||u.type!==3)).map((u=>{const c=new qr(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Rt(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return u.type!==0&&(h=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),f=o.indexOf(u.doc.key)),{type:dT(u.type),doc:c,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function dT(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F()}}function fT(r,e){return r instanceof pn&&e instanceof pn?r._firestore===e._firestore&&r._key.isEqual(e._key)&&(r._document===null?e._document===null:r._document.isEqual(e._document))&&r._converter===e._converter:r instanceof gn&&e instanceof gn&&r._firestore===e._firestore&&Ka(r.query,e.query)&&r.metadata.isEqual(e.metadata)&&r._snapshot.isEqual(e._snapshot)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mT(r){r=Q(r,me);const e=Q(r.firestore,ne);return of(he(e),r._key).then((t=>nu(e,r,t)))}class Kt extends tu{constructor(e){super(),this.firestore=e}convertBytes(e){return new Lt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new me(this.firestore,null,t)}}function pT(r){r=Q(r,me);const e=Q(r.firestore,ne),t=he(e),n=new Kt(e);return TI(t,r._key).then((s=>new pn(e,n,r._key,s,new Rt(s!==null&&s.hasLocalMutations,!0),r.converter)))}function gT(r){r=Q(r,me);const e=Q(r.firestore,ne);return of(he(e),r._key,{source:"server"}).then((t=>nu(e,r,t)))}function _T(r){r=Q(r,ve);const e=Q(r.firestore,ne),t=he(e),n=new Kt(e);return Af(r._query),af(t,r._query).then((s=>new gn(e,n,r,s)))}function yT(r){r=Q(r,ve);const e=Q(r.firestore,ne),t=he(e),n=new Kt(e);return EI(t,r._query).then((s=>new gn(e,n,r,s)))}function IT(r){r=Q(r,ve);const e=Q(r.firestore,ne),t=he(e),n=new Kt(e);return af(t,r._query,{source:"server"}).then((s=>new gn(e,n,r,s)))}function TT(r,e,t){r=Q(r,me);const n=Q(r.firestore,ne),s=Bi(r.converter,e,t);return cr(n,[Oi(In(n),"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,ce.none())])}function ET(r,e,t,...n){r=Q(r,me);const s=Q(r.firestore,ne),i=In(s);let o;return o=typeof(e=_e(e))=="string"||e instanceof zt?Xa(i,"updateDoc",r._key,e,t,n):Ya(i,"updateDoc",r._key,e),cr(s,[o.toMutation(r._key,ce.exists(!0))])}function wT(r){return cr(Q(r.firestore,ne),[new tr(r._key,ce.none())])}function vT(r,e){const t=Q(r.firestore,ne),n=df(r),s=Bi(r.converter,e);return cr(t,[Oi(In(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,ce.exists(!1))]).then((()=>n))}function AT(r,...e){var t,n,s;r=_e(r);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Xo(e[o])||(i=e[o],o++);const u={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Xo(e[o])){const m=e[o];e[o]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[o+1]=(n=m.error)===null||n===void 0?void 0:n.bind(m),e[o+2]=(s=m.complete)===null||s===void 0?void 0:s.bind(m)}let c,h,f;if(r instanceof me)h=Q(r.firestore,ne),f=Zn(r._key.path),c={next:m=>{e[o]&&e[o](nu(h,r,m))},error:e[o+1],complete:e[o+2]};else{const m=Q(r,ve);h=Q(m.firestore,ne),f=m._query;const g=new Kt(h);c={next:w=>{e[o]&&e[o](new gn(h,g,m,w))},error:e[o+1],complete:e[o+2]},Af(r._query)}return(function(g,w,C,x){const V=new Ci(x),U=new Ma(w,V,C);return g.asyncQueue.enqueueAndForget((async()=>ka(await Jn(g),U))),()=>{V.Za(),g.asyncQueue.enqueueAndForget((async()=>Na(await Jn(g),U)))}})(he(h),f,u,c)}function bT(r,e){return vI(he(r=Q(r,ne)),Xo(e)?e:{next:e})}function cr(r,e){return(function(n,s){const i=new we;return n.asyncQueue.enqueueAndForget((async()=>Yy(await za(n),s,i))),i.promise})(he(r),e)}function nu(r,e,t){const n=t.docs.get(e._key),s=new Kt(r);return new pn(r,s,e._key,n,new Rt(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function RT(r){return Vf(r,{count:Sf()})}function Vf(r,e){const t=Q(r.firestore,ne),n=he(t),s=bh(e,((i,o)=>new td(o,i.aggregateType,i._internalFieldPath)));return wI(n,r._query,s).then((i=>(function(u,c,h){const f=new Kt(u);return new gf(c,f,h)})(t,r,i)))}class PT{constructor(e){this.kind="memory",this._onlineComponentProvider=Ft.provider,e?.garbageCollector?this._offlineComponentProvider=e.garbageCollector._offlineComponentProvider:this._offlineComponentProvider=Mt.provider}toJSON(){return{kind:this.kind}}}class ST{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Cf(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}class VT{constructor(){this.kind="memoryEager",this._offlineComponentProvider=Mt.provider}toJSON(){return{kind:this.kind}}}class CT{constructor(e){this.kind="memoryLru",this._offlineComponentProvider={build:()=>new fI(e)}}toJSON(){return{kind:this.kind}}}function DT(){return new VT}function xT(r){return new CT(r?.cacheSizeBytes)}function kT(r){return new PT(r)}function NT(r){return new ST(r)}class OT{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ft.provider,this._offlineComponentProvider={build:t=>new ja(t,e?.cacheSizeBytes,this.forceOwnership)}}}class MT{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ft.provider,this._offlineComponentProvider={build:t=>new tf(t,e?.cacheSizeBytes)}}}function Cf(r){return new OT(r?.forceOwnership)}function FT(){return new MT}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LT={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=In(e)}set(e,t,n){this._verifyNotCommitted();const s=At(e,this._firestore),i=Bi(s.converter,t,n),o=Oi(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(o.toMutation(s._key,ce.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const i=At(e,this._firestore);let o;return o=typeof(t=_e(t))=="string"||t instanceof zt?Xa(this._dataReader,"WriteBatch.update",i._key,t,n,s):Ya(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,ce.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=At(e,this._firestore);return this._mutations=this._mutations.concat(new tr(t._key,ce.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new D(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function At(r,e){if((r=_e(r)).firestore!==e)throw new D(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf extends class{constructor(t,n){this._firestore=t,this._transaction=n,this._dataReader=In(t)}get(t){const n=At(t,this._firestore),s=new aT(this._firestore);return this._transaction.lookup([n._key]).then((i=>{if(!i||i.length!==1)return F();const o=i[0];if(o.isFoundDocument())return new es(this._firestore,s,o.key,o,n.converter);if(o.isNoDocument())return new es(this._firestore,s,n._key,null,n.converter);throw F()}))}set(t,n,s){const i=At(t,this._firestore),o=Bi(i.converter,n,s),u=Oi(this._dataReader,"Transaction.set",i._key,o,i.converter!==null,s);return this._transaction.set(i._key,u),this}update(t,n,s,...i){const o=At(t,this._firestore);let u;return u=typeof(n=_e(n))=="string"||n instanceof zt?Xa(this._dataReader,"Transaction.update",o._key,n,s,i):Ya(this._dataReader,"Transaction.update",o._key,n),this._transaction.update(o._key,u),this}delete(t){const n=At(t,this._firestore);return this._transaction.delete(n._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=At(e,this._firestore),n=new Kt(this._firestore);return super.get(e).then((s=>new pn(this._firestore,n,t._key,s._document,new Rt(!1,!1),t.converter)))}}function BT(r,e,t){r=Q(r,ne);const n=Object.assign(Object.assign({},LT),t);return(function(i){if(i.maxAttempts<1)throw new D(P.INVALID_ARGUMENT,"Max attempts must be at least 1")})(n),(function(i,o,u){const c=new we;return i.asyncQueue.enqueueAndForget((async()=>{const h=await sf(i);new gI(i.asyncQueue,h,u,o,c).au()})),c.promise})(he(r),(s=>e(new xf(r,s))),n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UT(){return new ds("deleteField")}function qT(){return new Qa("serverTimestamp")}function jT(...r){return new Wa("arrayUnion",r)}function $T(...r){return new Ha("arrayRemove",r)}function zT(r){return new Ja("increment",r)}function GT(r){return new hs(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KT(r){return he(r=Q(r,ne)),new Df(r,(e=>cr(r,e)))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QT(r,e){const t=he(r=Q(r,ne));if(!t._uninitializedComponentsProvider||t._uninitializedComponentsProvider._offline.kind==="memory")return $e("Cannot enable indexes when persistence is disabled"),Promise.resolve();const n=(function(i){const o=typeof i=="string"?(function(h){try{return JSON.parse(h)}catch(f){throw new D(P.INVALID_ARGUMENT,"Failed to parse JSON: "+f?.message)}})(i):i,u=[];if(Array.isArray(o.indexes))for(const c of o.indexes){const h=Dl(c,"collectionGroup"),f=[];if(Array.isArray(c.fields))for(const m of c.fields){const g=Mi("setIndexConfiguration",Dl(m,"fieldPath"));m.arrayConfig==="CONTAINS"?f.push(new an(g,2)):m.order==="ASCENDING"?f.push(new an(g,0)):m.order==="DESCENDING"&&f.push(new an(g,1))}u.push(new Ln(Ln.UNKNOWN_ID,h,f,Bn.empty()))}return u})(e);return RI(t,n)}function Dl(r,e){if(typeof r[e]!="string")throw new D(P.INVALID_ARGUMENT,"Missing string value for: "+e);return r[e]}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kf{constructor(e){this._firestore=e,this.type="PersistentCacheIndexManager"}}function WT(r){var e;r=Q(r,ne);const t=xl.get(r);if(t)return t;if(((e=he(r)._uninitializedComponentsProvider)===null||e===void 0?void 0:e._offline.kind)!=="persistent")return null;const n=new kf(r);return xl.set(r,n),n}function HT(r){Nf(r,!0)}function JT(r){Nf(r,!1)}function YT(r){SI(he(r._firestore)).then((e=>k("deleting all persistent cache indexes succeeded"))).catch((e=>$e("deleting all persistent cache indexes failed",e)))}function Nf(r,e){PI(he(r._firestore),e).then((t=>k(`setting persistent cache index auto creation isEnabled=${e} succeeded`))).catch((t=>$e(`setting persistent cache index auto creation isEnabled=${e} failed`,t)))}const xl=new WeakMap;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XT(r){var e;const t=(e=he(Q(r.firestore,ne))._onlineComponents)===null||e===void 0?void 0:e.datastore.serializer;return t===void 0?null:Ai(t,Ne(r._query))._t}function ZT(r,e){var t;const n=bh(e,((i,o)=>new td(o,i.aggregateType,i._internalFieldPath))),s=(t=he(Q(r.firestore,ne))._onlineComponents)===null||t===void 0?void 0:t.datastore.serializer;return s===void 0?null:md(s,Bh(r._query),n,!0).request}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(){throw new Error("instances of this class should not be created")}static onExistenceFilterMismatch(e){return ru.instance.onExistenceFilterMismatch(e)}}class ru{constructor(){this.Uu=new Map}static get instance(){return qs||(qs=new ru,(function(t){if(ni)throw new Error("a TestingHooksSpi instance is already set");ni=t})(qs)),qs}et(e){this.Uu.forEach((t=>t(e)))}onExistenceFilterMismatch(e){const t=Symbol(),n=this.Uu;return n.set(t,e),()=>n.delete(t)}}let qs=null;(function(e,t=!0){(function(s){Xn=s})(nh),ut(new Ze("firestore",((n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),u=new ne(new wg(n.getProvider("auth-internal")),new bg(n.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new D(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Dt(h.options.projectId,f)})(o,s),o);return i=Object.assign({useFetchStreams:t},i),u._setSettings(i),u}),"PUBLIC").setMultipleInstances(!0)),Ge(Ec,"4.7.3",e),Ge(Ec,"4.7.3","esm2017")})();const av=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:tu,AggregateField:Yn,AggregateQuerySnapshot:gf,Bytes:Lt,CACHE_SIZE_UNLIMITED:xI,CollectionReference:We,DocumentReference:me,DocumentSnapshot:pn,FieldPath:zt,FieldValue:Gt,Firestore:ne,FirestoreError:D,GeoPoint:ki,LoadBundleTask:ff,PersistentCacheIndexManager:kf,Query:ve,QueryCompositeFilterConstraint:En,QueryConstraint:ar,QueryDocumentSnapshot:qr,QueryEndAtConstraint:ps,QueryFieldFilterConstraint:ur,QueryLimitConstraint:fs,QueryOrderByConstraint:Li,QuerySnapshot:gn,QueryStartAtConstraint:ms,SnapshotMetadata:Rt,Timestamp:le,Transaction:xf,VectorValue:hs,WriteBatch:Df,_AutoId:ia,_ByteString:de,_DatabaseId:Dt,_DocumentKey:M,_EmptyAppCheckTokenProvider:Rg,_EmptyAuthCredentialsProvider:dh,_FieldPath:ae,_TestingHooks:eE,_cast:Q,_debugAssert:Tg,_internalAggregationQueryToProtoRunAggregationQueryRequest:ZT,_internalQueryToProtoQueryTarget:XT,_isBase64Available:e_,_logWarn:$e,_validateIsNotUsedTogether:cf,addDoc:vT,aggregateFieldEqual:lT,aggregateQuerySnapshotEqual:hT,and:ZI,arrayRemove:$T,arrayUnion:jT,average:cT,clearIndexedDbPersistence:FI,collection:VI,collectionGroup:CI,connectFirestoreEmulator:hf,count:Sf,deleteAllPersistentCacheIndexes:YT,deleteDoc:wT,deleteField:UT,disableNetwork:UI,disablePersistentCacheIndexAutoCreation:JT,doc:df,documentId:zI,enableIndexedDbPersistence:OI,enableMultiTabIndexedDbPersistence:MI,enableNetwork:BI,enablePersistentCacheIndexAutoCreation:HT,endAt:oT,endBefore:iT,ensureFirestoreConfigured:he,executeWrite:cr,getAggregateFromServer:Vf,getCountFromServer:RT,getDoc:mT,getDocFromCache:pT,getDocFromServer:gT,getDocs:_T,getDocsFromCache:yT,getDocsFromServer:IT,getFirestore:NI,getPersistentCacheIndexManager:WT,increment:zT,initializeFirestore:kI,limit:tT,limitToLast:nT,loadBundle:jI,memoryEagerGarbageCollector:DT,memoryLocalCache:kT,memoryLruGarbageCollector:xT,namedQuery:$I,onSnapshot:AT,onSnapshotsInSync:bT,or:XI,orderBy:eT,persistentLocalCache:NT,persistentMultipleTabManager:FT,persistentSingleTabManager:Cf,query:JI,queryEqual:Ka,refEqual:DI,runTransaction:BT,serverTimestamp:qT,setDoc:TT,setIndexConfiguration:QT,setLogLevel:Ig,snapshotEqual:fT,startAfter:sT,startAt:rT,sum:uT,terminate:qI,updateDoc:ET,vector:GT,waitForPendingWrites:LI,where:YI,writeBatch:KT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Of="firebasestorage.googleapis.com",tE="storageBucket",nE=120*1e3,rE=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt extends ht{constructor(e,t,n=0){super(Ao(e),`Firebase Storage: ${t} (${Ao(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,nt.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Ao(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var tt;(function(r){r.UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(tt||(tt={}));function Ao(r){return"storage/"+r}function sE(){const r="An unknown error occurred, please check the error payload for server response.";return new nt(tt.UNKNOWN,r)}function iE(){return new nt(tt.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function oE(){return new nt(tt.CANCELED,"User canceled the upload/download.")}function aE(r){return new nt(tt.INVALID_URL,"Invalid URL '"+r+"'.")}function uE(r){return new nt(tt.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.")}function kl(r){return new nt(tt.INVALID_ARGUMENT,r)}function Mf(){return new nt(tt.APP_DELETED,"The Firebase app was deleted.")}function cE(r){return new nt(tt.INVALID_ROOT_OPERATION,"The operation '"+r+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=Qe.makeFromUrl(e,t)}catch{return new Qe(e,"")}if(n.path==="")return n;throw uE(e)}static makeFromUrl(e,t){let n=null;const s="([A-Za-z0-9.\\-_]+)";function i($){$.path.charAt($.path.length-1)==="/"&&($.path_=$.path_.slice(0,-1))}const o="(/(.*))?$",u=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function h($){$.path_=decodeURIComponent($.path)}const f="v[A-Za-z0-9_]+",m=t.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",w=new RegExp(`^https?://${m}/${f}/b/${s}/o${g}`,"i"),C={bucket:1,path:3},x=t===Of?"(?:storage.googleapis.com|storage.cloud.google.com)":t,V="([^?#]*)",U=new RegExp(`^https?://${x}/${s}/${V}`,"i"),L=[{regex:u,indices:c,postModify:i},{regex:w,indices:C,postModify:h},{regex:U,indices:{bucket:1,path:2},postModify:h}];for(let $=0;$<L.length;$++){const J=L[$],G=J.regex.exec(e);if(G){const T=G[J.indices.bucket];let _=G[J.indices.path];_||(_=""),n=new Qe(T,_),J.postModify(n);break}}if(n==null)throw aE(e);return n}}class lE{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hE(r,e,t){let n=1,s=null,i=null,o=!1,u=0;function c(){return u===2}let h=!1;function f(...V){h||(h=!0,e.apply(null,V))}function m(V){s=setTimeout(()=>{s=null,r(w,c())},V)}function g(){i&&clearTimeout(i)}function w(V,...U){if(h){g();return}if(V){g(),f.call(null,V,...U);return}if(c()||o){g(),f.call(null,V,...U);return}n<64&&(n*=2);let L;u===1?(u=2,L=0):L=(n+Math.random())*1e3,m(L)}let C=!1;function x(V){C||(C=!0,g(),!h&&(s!==null?(V||(u=2),clearTimeout(s),m(0)):V||(u=1)))}return m(0),i=setTimeout(()=>{o=!0,x(!0)},t),x}function dE(r){r(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fE(r){return r!==void 0}function Nl(r,e,t,n){if(n<e)throw kl(`Invalid value for '${r}'. Expected ${e} or greater.`);if(n>t)throw kl(`Invalid value for '${r}'. Expected ${t} or less.`)}function mE(r){const e=encodeURIComponent;let t="?";for(const n in r)if(r.hasOwnProperty(n)){const s=e(n)+"="+e(r[n]);t=t+s+"&"}return t=t.slice(0,-1),t}var di;(function(r){r[r.NO_ERROR=0]="NO_ERROR",r[r.NETWORK_ERROR=1]="NETWORK_ERROR",r[r.ABORT=2]="ABORT"})(di||(di={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pE(r,e){const t=r>=500&&r<600,s=[408,429].indexOf(r)!==-1,i=e.indexOf(r)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(e,t,n,s,i,o,u,c,h,f,m,g=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=u,this.errorCallback_=c,this.timeout_=h,this.progressCallback_=f,this.connectionFactory_=m,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((w,C)=>{this.resolve_=w,this.reject_=C,this.start_()})}start_(){const e=(n,s)=>{if(s){n(!1,new js(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=u=>{const c=u.loaded,h=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,h)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const u=i.getErrorCode()===di.NO_ERROR,c=i.getStatus();if(!u||pE(c,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===di.ABORT;n(!1,new js(!1,null,f));return}const h=this.successCodes_.indexOf(c)!==-1;n(!0,new js(h,i))})},t=(n,s)=>{const i=this.resolve_,o=this.reject_,u=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(u,u.getResponse());fE(c)?i(c):i()}catch(c){o(c)}else if(u!==null){const c=sE();c.serverResponse=u.getErrorText(),this.errorCallback_?o(this.errorCallback_(u,c)):o(c)}else if(s.canceled){const c=this.appDelete_?Mf():oE();o(c)}else{const c=iE();o(c)}};this.canceled_?t(!1,new js(!1,null,!0)):this.backoffId_=hE(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&dE(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class js{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function _E(r,e){e!==null&&e.length>0&&(r.Authorization="Firebase "+e)}function yE(r,e){r["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function IE(r,e){e&&(r["X-Firebase-GMPID"]=e)}function TE(r,e){e!==null&&(r["X-Firebase-AppCheck"]=e)}function EE(r,e,t,n,s,i,o=!0){const u=mE(r.urlParams),c=r.url+u,h=Object.assign({},r.headers);return IE(h,e),_E(h,t),yE(h,i),TE(h,n),new gE(c,r.method,h,r.body,r.successCodes,r.additionalRetryCodes,r.handler,r.errorHandler,r.timeout,r.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wE(r){if(r.length===0)return null;const e=r.lastIndexOf("/");return e===-1?"":r.slice(0,e)}function vE(r){const e=r.lastIndexOf("/",r.length-2);return e===-1?r:r.slice(e+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,t){this._service=e,t instanceof Qe?this._location=t:this._location=Qe.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new fi(e,t)}get root(){const e=new Qe(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return vE(this._location.path)}get storage(){return this._service}get parent(){const e=wE(this._location.path);if(e===null)return null;const t=new Qe(this._location.bucket,e);return new fi(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw cE(e)}}function Ol(r,e){const t=e?.[tE];return t==null?null:Qe.makeFromBucketSpec(t,r)}function AE(r,e,t,n={}){r.host=`${e}:${t}`,r._protocol="http";const{mockUserToken:s}=n;s&&(r._overrideAuthToken=typeof s=="string"?s:Jl(s,r.app.options.projectId))}class bE{constructor(e,t,n,s,i){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=Of,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=nE,this._maxUploadRetryTime=rE,this._requests=new Set,s!=null?this._bucket=Qe.makeFromBucketSpec(s,this._host):this._bucket=Ol(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Qe.makeFromBucketSpec(this._url,e):this._bucket=Ol(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Nl("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Nl("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new fi(this,e)}_makeRequest(e,t,n,s,i=!0){if(this._deleted)return new lE(Mf());{const o=EE(e,this._appId,n,s,t,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[n,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,s).getPromise()}}const Ml="@firebase/storage",Fl="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ff="storage";function uv(r=ra(),e){r=_e(r);const n=Bt(r,Ff).getImmediate({identifier:e}),s=Wl("storage");return s&&RE(n,...s),n}function RE(r,e,t,n={}){AE(r,e,t,n)}function PE(r,{instanceIdentifier:e}){const t=r.getProvider("app").getImmediate(),n=r.getProvider("auth-internal"),s=r.getProvider("app-check-internal");return new bE(t,n,s,e,nh)}function SE(){ut(new Ze(Ff,PE,"PUBLIC").setMultipleInstances(!0)),Ge(Ml,Fl,""),Ge(Ml,Fl,"esm2017")}SE();const Lf="@firebase/installations",su="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf=1e4,Uf=`w:${su}`,qf="FIS_v2",VE="https://firebaseinstallations.googleapis.com/v1",CE=3600*1e3,DE="installations",xE="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kE={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},_n=new _i(DE,xE,kE);function jf(r){return r instanceof ht&&r.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f({projectId:r}){return`${VE}/projects/${r}/installations`}function zf(r){return{token:r.token,requestStatus:2,expiresIn:OE(r.expiresIn),creationTime:Date.now()}}async function Gf(r,e){const n=(await e.json()).error;return _n.create("request-failed",{requestName:r,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Kf({apiKey:r}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":r})}function NE(r,{refreshToken:e}){const t=Kf(r);return t.append("Authorization",ME(e)),t}async function Qf(r){const e=await r();return e.status>=500&&e.status<600?r():e}function OE(r){return Number(r.replace("s","000"))}function ME(r){return`${qf} ${r}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FE({appConfig:r,heartbeatServiceProvider:e},{fid:t}){const n=$f(r),s=Kf(r),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={fid:t,authVersion:qf,appId:r.appId,sdkVersion:Uf},u={method:"POST",headers:s,body:JSON.stringify(o)},c=await Qf(()=>fetch(n,u));if(c.ok){const h=await c.json();return{fid:h.fid||t,registrationStatus:2,refreshToken:h.refreshToken,authToken:zf(h.authToken)}}else throw await Gf("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wf(r){return new Promise(e=>{setTimeout(e,r)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LE(r){return btoa(String.fromCharCode(...r)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BE=/^[cdef][\w-]{21}$/,Zo="";function UE(){try{const r=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(r),r[0]=112+r[0]%16;const t=qE(r);return BE.test(t)?t:Zo}catch{return Zo}}function qE(r){return LE(r).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ui(r){return`${r.appName}!${r.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf=new Map;function Jf(r,e){const t=Ui(r);Yf(t,e),jE(t,e)}function Yf(r,e){const t=Hf.get(r);if(t)for(const n of t)n(e)}function jE(r,e){const t=$E();t&&t.postMessage({key:r,fid:e}),zE()}let sn=null;function $E(){return!sn&&"BroadcastChannel"in self&&(sn=new BroadcastChannel("[Firebase] FID Change"),sn.onmessage=r=>{Yf(r.data.key,r.data.fid)}),sn}function zE(){Hf.size===0&&sn&&(sn.close(),sn=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GE="firebase-installations-database",KE=1,yn="firebase-installations-store";let bo=null;function iu(){return bo||(bo=th(GE,KE,{upgrade:(r,e)=>{switch(e){case 0:r.createObjectStore(yn)}}})),bo}async function mi(r,e){const t=Ui(r),s=(await iu()).transaction(yn,"readwrite"),i=s.objectStore(yn),o=await i.get(t);return await i.put(e,t),await s.done,(!o||o.fid!==e.fid)&&Jf(r,e.fid),e}async function Xf(r){const e=Ui(r),n=(await iu()).transaction(yn,"readwrite");await n.objectStore(yn).delete(e),await n.done}async function qi(r,e){const t=Ui(r),s=(await iu()).transaction(yn,"readwrite"),i=s.objectStore(yn),o=await i.get(t),u=e(o);return u===void 0?await i.delete(t):await i.put(u,t),await s.done,u&&(!o||o.fid!==u.fid)&&Jf(r,u.fid),u}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ou(r){let e;const t=await qi(r.appConfig,n=>{const s=QE(n),i=WE(r,s);return e=i.registrationPromise,i.installationEntry});return t.fid===Zo?{installationEntry:await e}:{installationEntry:t,registrationPromise:e}}function QE(r){const e=r||{fid:UE(),registrationStatus:0};return Zf(e)}function WE(r,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(_n.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const t={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},n=HE(r,t);return{installationEntry:t,registrationPromise:n}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:JE(r)}:{installationEntry:e}}async function HE(r,e){try{const t=await FE(r,e);return mi(r.appConfig,t)}catch(t){throw jf(t)&&t.customData.serverCode===409?await Xf(r.appConfig):await mi(r.appConfig,{fid:e.fid,registrationStatus:0}),t}}async function JE(r){let e=await Ll(r.appConfig);for(;e.registrationStatus===1;)await Wf(100),e=await Ll(r.appConfig);if(e.registrationStatus===0){const{installationEntry:t,registrationPromise:n}=await ou(r);return n||t}return e}function Ll(r){return qi(r,e=>{if(!e)throw _n.create("installation-not-found");return Zf(e)})}function Zf(r){return YE(r)?{fid:r.fid,registrationStatus:0}:r}function YE(r){return r.registrationStatus===1&&r.registrationTime+Bf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XE({appConfig:r,heartbeatServiceProvider:e},t){const n=ZE(r,t),s=NE(r,t),i=e.getImmediate({optional:!0});if(i){const h=await i.getHeartbeatsHeader();h&&s.append("x-firebase-client",h)}const o={installation:{sdkVersion:Uf,appId:r.appId}},u={method:"POST",headers:s,body:JSON.stringify(o)},c=await Qf(()=>fetch(n,u));if(c.ok){const h=await c.json();return zf(h)}else throw await Gf("Generate Auth Token",c)}function ZE(r,{fid:e}){return`${$f(r)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function au(r,e=!1){let t;const n=await qi(r.appConfig,i=>{if(!em(i))throw _n.create("not-registered");const o=i.authToken;if(!e&&nw(o))return i;if(o.requestStatus===1)return t=ew(r,e),i;{if(!navigator.onLine)throw _n.create("app-offline");const u=sw(i);return t=tw(r,u),u}});return t?await t:n.authToken}async function ew(r,e){let t=await Bl(r.appConfig);for(;t.authToken.requestStatus===1;)await Wf(100),t=await Bl(r.appConfig);const n=t.authToken;return n.requestStatus===0?au(r,e):n}function Bl(r){return qi(r,e=>{if(!em(e))throw _n.create("not-registered");const t=e.authToken;return iw(t)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e})}async function tw(r,e){try{const t=await XE(r,e),n=Object.assign(Object.assign({},e),{authToken:t});return await mi(r.appConfig,n),t}catch(t){if(jf(t)&&(t.customData.serverCode===401||t.customData.serverCode===404))await Xf(r.appConfig);else{const n=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await mi(r.appConfig,n)}throw t}}function em(r){return r!==void 0&&r.registrationStatus===2}function nw(r){return r.requestStatus===2&&!rw(r)}function rw(r){const e=Date.now();return e<r.creationTime||r.creationTime+r.expiresIn<e+CE}function sw(r){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},r),{authToken:e})}function iw(r){return r.requestStatus===1&&r.requestTime+Bf<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ow(r){const e=r,{installationEntry:t,registrationPromise:n}=await ou(e);return n?n.catch(console.error):au(e).catch(console.error),t.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aw(r,e=!1){const t=r;return await uw(t),(await au(t,e)).token}async function uw(r){const{registrationPromise:e}=await ou(r);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cw(r){if(!r||!r.options)throw Ro("App Configuration");if(!r.name)throw Ro("App Name");const e=["projectId","apiKey","appId"];for(const t of e)if(!r.options[t])throw Ro(t);return{appName:r.name,projectId:r.options.projectId,apiKey:r.options.apiKey,appId:r.options.appId}}function Ro(r){return _n.create("missing-app-config-values",{valueName:r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tm="installations",lw="installations-internal",hw=r=>{const e=r.getProvider("app").getImmediate(),t=cw(e),n=Bt(e,"heartbeat");return{app:e,appConfig:t,heartbeatServiceProvider:n,_delete:()=>Promise.resolve()}},dw=r=>{const e=r.getProvider("app").getImmediate(),t=Bt(e,tm).getImmediate();return{getId:()=>ow(t),getToken:s=>aw(t,s)}};function fw(){ut(new Ze(tm,hw,"PUBLIC")),ut(new Ze(lw,dw,"PRIVATE"))}fw();Ge(Lf,su);Ge(Lf,su,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi="analytics",mw="firebase_id",pw="origin",gw=60*1e3,_w="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",uu="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ue=new ta("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yw={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},je=new _i("analytics","Analytics",yw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iw(r){if(!r.startsWith(uu)){const e=je.create("invalid-gtag-resource",{gtagURL:r});return Ue.warn(e.message),""}return r}function nm(r){return Promise.all(r.map(e=>e.catch(t=>t)))}function Tw(r,e){let t;return window.trustedTypes&&(t=window.trustedTypes.createPolicy(r,e)),t}function Ew(r,e){const t=Tw("firebase-js-sdk-policy",{createScriptURL:Iw}),n=document.createElement("script"),s=`${uu}?l=${r}&id=${e}`;n.src=t?t?.createScriptURL(s):s,n.async=!0,document.head.appendChild(n)}function ww(r){let e=[];return Array.isArray(window[r])?e=window[r]:window[r]=e,e}async function vw(r,e,t,n,s,i){const o=n[s];try{if(o)await e[o];else{const c=(await nm(t)).find(h=>h.measurementId===s);c&&await e[c.appId]}}catch(u){Ue.error(u)}r("config",s,i)}async function Aw(r,e,t,n,s){try{let i=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const u=await nm(t);for(const c of o){const h=u.find(m=>m.measurementId===c),f=h&&e[h.appId];if(f)i.push(f);else{i=[];break}}}i.length===0&&(i=Object.values(e)),await Promise.all(i),r("event",n,s||{})}catch(i){Ue.error(i)}}function bw(r,e,t,n){async function s(i,...o){try{if(i==="event"){const[u,c]=o;await Aw(r,e,t,u,c)}else if(i==="config"){const[u,c]=o;await vw(r,e,t,n,u,c)}else if(i==="consent"){const[u,c]=o;r("consent",u,c)}else if(i==="get"){const[u,c,h]=o;r("get",u,c,h)}else if(i==="set"){const[u]=o;r("set",u)}else r(i,...o)}catch(u){Ue.error(u)}}return s}function Rw(r,e,t,n,s){let i=function(...o){window[n].push(arguments)};return window[s]&&typeof window[s]=="function"&&(i=window[s]),window[s]=bw(i,r,e,t),{gtagCore:i,wrappedGtag:window[s]}}function Pw(r){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(uu)&&t.src.includes(r))return t;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sw=30,Vw=1e3;class Cw{constructor(e={},t=Vw){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const rm=new Cw;function Dw(r){return new Headers({Accept:"application/json","x-goog-api-key":r})}async function xw(r){var e;const{appId:t,apiKey:n}=r,s={method:"GET",headers:Dw(n)},i=_w.replace("{app-id}",t),o=await fetch(i,s);if(o.status!==200&&o.status!==304){let u="";try{const c=await o.json();!((e=c.error)===null||e===void 0)&&e.message&&(u=c.error.message)}catch{}throw je.create("config-fetch-failed",{httpStatus:o.status,responseMessage:u})}return o.json()}async function kw(r,e=rm,t){const{appId:n,apiKey:s,measurementId:i}=r.options;if(!n)throw je.create("no-app-id");if(!s){if(i)return{measurementId:i,appId:n};throw je.create("no-api-key")}const o=e.getThrottleMetadata(n)||{backoffCount:0,throttleEndTimeMillis:Date.now()},u=new Mw;return setTimeout(async()=>{u.abort()},gw),sm({appId:n,apiKey:s,measurementId:i},o,u,e)}async function sm(r,{throttleEndTimeMillis:e,backoffCount:t},n,s=rm){var i;const{appId:o,measurementId:u}=r;try{await Nw(n,e)}catch(c){if(u)return Ue.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${c?.message}]`),{appId:o,measurementId:u};throw c}try{const c=await xw(r);return s.deleteThrottleMetadata(o),c}catch(c){const h=c;if(!Ow(h)){if(s.deleteThrottleMetadata(o),u)return Ue.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${u} provided in the "measurementId" field in the local Firebase config. [${h?.message}]`),{appId:o,measurementId:u};throw c}const f=Number((i=h?.customData)===null||i===void 0?void 0:i.httpStatus)===503?hc(t,s.intervalMillis,Sw):hc(t,s.intervalMillis),m={throttleEndTimeMillis:Date.now()+f,backoffCount:t+1};return s.setThrottleMetadata(o,m),Ue.debug(`Calling attemptFetch again in ${f} millis`),sm(r,m,n,s)}}function Nw(r,e){return new Promise((t,n)=>{const s=Math.max(e-Date.now(),0),i=setTimeout(t,s);r.addEventListener(()=>{clearTimeout(i),n(je.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Ow(r){if(!(r instanceof ht)||!r.customData)return!1;const e=Number(r.customData.httpStatus);return e===429||e===500||e===503||e===504}class Mw{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function Fw(r,e,t,n,s){if(s&&s.global){r("event",t,n);return}else{const i=await e,o=Object.assign(Object.assign({},n),{send_to:i});r("event",t,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lw(){if(ea())try{await Xl()}catch(r){return Ue.warn(je.create("indexeddb-unavailable",{errorInfo:r?.toString()}).message),!1}else return Ue.warn(je.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Bw(r,e,t,n,s,i,o){var u;const c=kw(r);c.then(w=>{t[w.measurementId]=w.appId,r.options.measurementId&&w.measurementId!==r.options.measurementId&&Ue.warn(`The measurement ID in the local Firebase config (${r.options.measurementId}) does not match the measurement ID fetched from the server (${w.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(w=>Ue.error(w)),e.push(c);const h=Lw().then(w=>{if(w)return n.getId()}),[f,m]=await Promise.all([c,h]);Pw(i)||Ew(i,f.measurementId),s("js",new Date);const g=(u=o?.config)!==null&&u!==void 0?u:{};return g[pw]="firebase",g.update=!0,m!=null&&(g[mw]=m),s("config",f.measurementId,g),f.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uw{constructor(e){this.app=e}_delete(){return delete jr[this.app.options.appId],Promise.resolve()}}let jr={},Ul=[];const ql={};let Po="dataLayer",qw="gtag",jl,im,$l=!1;function jw(){const r=[];if(Xm()&&r.push("This is a browser extension environment."),Zm()||r.push("Cookies are not available."),r.length>0){const e=r.map((n,s)=>`(${s+1}) ${n}`).join(" "),t=je.create("invalid-analytics-context",{errorInfo:e});Ue.warn(t.message)}}function $w(r,e,t){jw();const n=r.options.appId;if(!n)throw je.create("no-app-id");if(!r.options.apiKey)if(r.options.measurementId)Ue.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${r.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw je.create("no-api-key");if(jr[n]!=null)throw je.create("already-exists",{id:n});if(!$l){ww(Po);const{wrappedGtag:i,gtagCore:o}=Rw(jr,Ul,ql,Po,qw);im=i,jl=o,$l=!0}return jr[n]=Bw(r,Ul,ql,e,jl,Po,t),new Uw(r)}function cv(r=ra()){r=_e(r);const e=Bt(r,pi);return e.isInitialized()?e.getImmediate():zw(r)}function zw(r,e={}){const t=Bt(r,pi);if(t.isInitialized()){const s=t.getImmediate();if(Vt(e,t.getOptions()))return s;throw je.create("already-initialized")}return t.initialize({options:e})}function Gw(r,e,t,n){r=_e(r),Fw(im,jr[r.app.options.appId],e,t,n).catch(s=>Ue.error(s))}const zl="@firebase/analytics",Gl="0.10.8";function Kw(){ut(new Ze(pi,(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate();return $w(n,s,t)},"PUBLIC")),ut(new Ze("analytics-internal",r,"PRIVATE")),Ge(zl,Gl),Ge(zl,Gl,"esm2017");function r(e){try{const t=e.getProvider(pi).getImmediate();return{logEvent:(n,s,i)=>Gw(t,n,s,i)}}catch(t){throw je.create("interop-component-reg-failed",{reason:t})}}}Kw();export{df as A,mT as B,Ze as C,TT as D,_i as E,ht as F,qT as G,ET as H,AT as I,VI as J,JI as K,ta as L,eT as M,_T as N,YI as O,KT as P,vT as Q,wT as R,nh as S,le as T,zT as U,av as V,ut as _,Jw as a,Xm as b,tv as c,_e as d,ev as e,X as f,Qw as g,Mn as h,Ww as i,zm as j,Bt as k,Hm as l,ra as m,Vt as n,Yw as o,Xw as p,Zw as q,Ge as r,Hw as s,uv as t,cv as u,nv as v,ag as w,kI as x,kT as y,NI as z};
//# sourceMappingURL=vendor-firebase-4nZbKJOC.js.map
