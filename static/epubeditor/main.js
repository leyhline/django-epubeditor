function t(t,e,o,i){var s,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,o,n):s(e,o))||n);return r>3&&n&&Object.defineProperty(e,o,n),n}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},o=globalThis,i=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let n=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&r.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new n(o,t,s)},l=(t,e)=>{if(i)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),s=o.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}},c=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:u,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:g}=Object,f=globalThis,b=f.trustedTypes,v=b?b.emptyScript:"",y=f.reactiveElementPolyfillSupport,w=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},x=(t,e)=>!d(t,e),k={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:x};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=k){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:s}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);s?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??k}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,e=[...p(t),...m(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:_).toAttribute(e,o.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i;const r=s.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){const i=this.constructor,s=this[t];if(o??=i.getPropertyOptions(t),!((o.hasChanged??x)(s,e)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:s},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[w("elementProperties")]=new Map,C[w("finalized")]=new Map,y?.({ReactiveElement:C}),(f.reactiveElementVersions??=[]).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:x},S=(t=$,e,o)=>{const{kind:i,metadata:s}=o;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,s,t)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const s=this[i];e.call(this,o),this.requestUpdate(i,s,t)}}throw Error("Unsupported decorator location: "+i)};function E(t){return(e,o)=>"object"==typeof o?S(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function A(t){return E({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function z(t,e){return(e,o,i)=>((t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o))(e,o,{get(){return(e=>e.renderRoot?.querySelector(t)??null)(this)}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=Symbol();let M=class{get taskComplete(){return this.t||(1===this.i?this.t=new Promise((t,e)=>{this.o=t,this.h=e}):3===this.i?this.t=Promise.reject(this.l):this.t=Promise.resolve(this.u)),this.t}constructor(t,e,o){this.p=0,this.i=0,(this._=t).addController(this);const i="object"==typeof e?e:{task:e,args:o};this.v=i.task,this.j=i.args,this.m=i.argsEqual??L,this.k=i.onComplete,this.A=i.onError,this.autoRun=i.autoRun??!0,"initialValue"in i&&(this.u=i.initialValue,this.i=2,this.O=this.T?.())}hostUpdate(){!0===this.autoRun&&this.S()}hostUpdated(){"afterUpdate"===this.autoRun&&this.S()}T(){if(void 0===this.j)return;const t=this.j();if(!Array.isArray(t))throw Error("The args function must return an array");return t}async S(){const t=this.T(),e=this.O;this.O=t,t===e||void 0===t||void 0!==e&&this.m(e,t)||await this.run(t)}async run(t){let e,o;t??=this.T(),this.O=t,1===this.i?this.q?.abort():(this.t=void 0,this.o=void 0,this.h=void 0),this.i=1,"afterUpdate"===this.autoRun?queueMicrotask(()=>this._.requestUpdate()):this._.requestUpdate();const i=++this.p;this.q=new AbortController;let s=!1;try{e=await this.v(t,{signal:this.q.signal})}catch(t){s=!0,o=t}if(this.p===i){if(e===T)this.i=0;else{if(!1===s){try{this.k?.(e)}catch{}this.i=2,this.o?.(e)}else{try{this.A?.(o)}catch{}this.i=3,this.h?.(o)}this.u=e,this.l=o}this._.requestUpdate()}}abort(t){1===this.i&&this.q?.abort(t)}get value(){return this.u}get error(){return this.l}get status(){return this.i}render(t){switch(this.i){case 0:return t.initial?.();case 1:return t.pending?.();case 2:return t.complete?.(this.value);case 3:return t.error?.(this.error);default:throw Error("Unexpected status: "+this.i)}}};const L=(t,e)=>t===e||t.length===e.length&&t.every((t,o)=>!x(t,e[o])),P=globalThis,O=P.trustedTypes,B=O?O.createPolicy("lit-html",{createHTML:t=>t}):void 0,D="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+R,F=`<${I}>`,N=document,V=()=>N.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,W="[ \t\n\f\r]",j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,q=/-->/g,K=/>/g,G=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),X=/'/g,Y=/"/g,Z=/^(?:script|style|textarea|title)$/i,J=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),Q=Symbol.for("lit-noChange"),tt=Symbol.for("lit-nothing"),et=new WeakMap,ot=N.createTreeWalker(N,129);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function it(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==B?B.createHTML(e):e}const st=(t,e)=>{const o=t.length-1,i=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=j;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,d=0;for(;d<o.length&&(n.lastIndex=d,l=n.exec(o),null!==l);)d=n.lastIndex,n===j?"!--"===l[1]?n=q:void 0!==l[1]?n=K:void 0!==l[2]?(Z.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=G):void 0!==l[3]&&(n=G):n===G?">"===l[0]?(n=s??j,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?G:'"'===l[3]?Y:X):n===Y||n===X?n=G:n===q||n===K?n=j:(n=G,s=void 0);const h=n===G&&t[e+1].startsWith("/>")?" ":"";r+=n===j?o+F:c>=0?(i.push(a),o.slice(0,c)+D+o.slice(c)+R+h):o+R+(-2===c?e:h)}return[it(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class rt{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[l,c]=st(t,e);if(this.el=rt.createElement(l,o),ot.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=ot.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(D)){const e=c[r++],o=i.getAttribute(t).split(R),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:o,ctor:"."===n[1]?dt:"?"===n[1]?ht:"@"===n[1]?ut:ct}),i.removeAttribute(t)}else t.startsWith(R)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(Z.test(i.tagName)){const t=i.textContent.split(R),e=t.length-1;if(e>0){i.textContent=O?O.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],V()),ot.nextNode(),a.push({type:2,index:++s});i.append(t[e],V())}}}else if(8===i.nodeType)if(i.data===I)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(R,t+1));)a.push({type:7,index:s}),t+=R.length-1}s++}}static createElement(t,e){const o=N.createElement("template");return o.innerHTML=t,o}}function nt(t,e,o=t,i){if(e===Q)return e;let s=void 0!==i?o._$Co?.[i]:o._$Cl;const r=U(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=s:o._$Cl=s),void 0!==s&&(e=nt(t,s._$AS(t,e.values),s,i)),e}class at{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??N).importNode(e,!0);ot.currentNode=i;let s=ot.nextNode(),r=0,n=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new lt(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new pt(s,this,t)),this._$AV.push(e),a=o[++n]}r!==a?.index&&(s=ot.nextNode(),r++)}return ot.currentNode=N,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class lt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=tt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=nt(this,t,e),U(t)?t===tt||null==t||""===t?(this._$AH!==tt&&this._$AR(),this._$AH=tt):t!==this._$AH&&t!==Q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==tt&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=rt.createElement(it(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new at(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=et.get(t.strings);return void 0===e&&et.set(t.strings,e=new rt(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new lt(this.O(V()),this.O(V()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ct{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,s){this.type=1,this._$AH=tt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=tt}_$AI(t,e=this,o,i){const s=this.strings;let r=!1;if(void 0===s)t=nt(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==Q,r&&(this._$AH=t);else{const i=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=nt(this,i[o+n],e,n),a===Q&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===tt?t=tt:t!==tt&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===tt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class dt extends ct{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===tt?void 0:t}}class ht extends ct{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==tt)}}class ut extends ct{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){if((t=nt(this,t,e,0)??tt)===Q)return;const o=this._$AH,i=t===tt&&o!==tt||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==tt&&(o===tt||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class pt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){nt(this,t)}}const mt=P.litHtmlPolyfillSupport;mt?.(rt,lt),(P.litHtmlVersions??=[]).push("3.3.1");const gt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ft=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=o?.renderBefore??null;i._$litPart$=s=new lt(e.insertBefore(V(),t),t,void 0,o??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Q}};ft._$litElement$=!0,ft.finalized=!0,gt.litElementHydrateSupport?.({LitElement:ft});const bt=gt.litElementPolyfillSupport;bt?.({LitElement:ft}),(gt.litElementVersions??=[]).push("4.2.1");var vt=a`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,yt="";function wt(t){yt=t}var _t={name:"default",resolver:t=>function(t=""){if(!yt){const t=[...document.getElementsByTagName("script")],e=t.find(t=>t.hasAttribute("data-shoelace"));if(e)wt(e.getAttribute("data-shoelace"));else{const e=t.find(t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(t.src));let o="";e&&(o=e.getAttribute("src")),wt(o.split("/").slice(0,-1).join("/"))}}return yt.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}(`assets/icons/${t}.svg`)},xt={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',copy:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},kt=[_t,{name:"system",resolver:t=>t in xt?`data:image/svg+xml,${encodeURIComponent(xt[t])}`:""}],Ct=[];function $t(t){return kt.find(e=>e.name===t)}var St=a`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,Et=Object.defineProperty,At=Object.defineProperties,zt=Object.getOwnPropertyDescriptor,Tt=Object.getOwnPropertyDescriptors,Mt=Object.getOwnPropertySymbols,Lt=Object.prototype.hasOwnProperty,Pt=Object.prototype.propertyIsEnumerable,Ot=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Bt=t=>{throw TypeError(t)},Dt=(t,e,o)=>e in t?Et(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Rt=(t,e)=>{for(var o in e||(e={}))Lt.call(e,o)&&Dt(t,o,e[o]);if(Mt)for(var o of Mt(e))Pt.call(e,o)&&Dt(t,o,e[o]);return t},It=(t,e)=>At(t,Tt(e)),Ft=(t,e,o,i)=>{for(var s,r=i>1?void 0:i?zt(e,o):e,n=t.length-1;n>=0;n--)(s=t[n])&&(r=(i?s(e,o,r):s(r))||r);return i&&r&&Et(e,o,r),r},Nt=(t,e,o)=>e.has(t)||Bt("Cannot "+o),Vt=function(t,e){this[0]=t,this[1]=e};function Ut(t,e){const o=Rt({waitUntilFirstUpdate:!1},e);return(e,i)=>{const{update:s}=e,r=Array.isArray(t)?t:[t];e.update=function(t){r.forEach(e=>{const s=e;if(t.has(s)){const e=t.get(s),r=this[s];e!==r&&(o.waitUntilFirstUpdate&&!this.hasUpdated||this[i](e,r))}}),s.call(this,t)}}}var Ht,Wt=a`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,jt=class extends ft{constructor(){var t,e,o;super(),t=this,o=!1,(e=Ht).has(t)?Bt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){const o=new CustomEvent(t,Rt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const i=customElements.get(t);if(!i){try{customElements.define(t,e,o)}catch(i){customElements.define(t,class extends e{},o)}return}let s=" (unknown version)",r=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in i&&i.version&&(r=" v"+i.version),s&&r&&s===r||console.warn(`Attempted to register <${t}>${s}, but <${t}>${r} has already been registered.`)}attributeChangedCallback(t,e,o){var i,s;Nt(i=this,s=Ht,"read from private field"),s.get(i)||(this.constructor.elementProperties.forEach((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])}),((t,e,o)=>{Nt(t,e,"write to private field"),e.set(t,o)})(this,Ht,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&null==this[o]&&(this[o]=e)})}};Ht=new WeakMap,jt.version="2.20.1",jt.dependencies={},Ft([E()],jt.prototype,"dir",2),Ft([E()],jt.prototype,"lang",2);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt=t=>void 0===t.strings,Kt={};var Gt,Xt=Symbol(),Yt=Symbol(),Zt=new Map,Jt=class extends jt{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let i;if(null==e?void 0:e.spriteSheet)return this.svg=J`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(i=await fetch(t,{mode:"cors"}),!i.ok)return 410===i.status?Xt:Yt}catch(t){return Yt}try{const t=document.createElement("div");t.innerHTML=await i.text();const e=t.firstElementChild;if("svg"!==(null==(o=null==e?void 0:e.tagName)?void 0:o.toLowerCase()))return Xt;Gt||(Gt=new DOMParser);const s=Gt.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");return s?(s.part.add("svg"),document.adoptNode(s)):Xt}catch(t){return Xt}}connectedCallback(){var t;super.connectedCallback(),t=this,Ct.push(t)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,Ct=Ct.filter(e=>e!==t)}getIconSource(){const t=$t(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),i=o?$t(this.library):void 0;if(!e)return void(this.svg=null);let s=Zt.get(e);if(s||(s=this.resolveIcon(e,i),Zt.set(e,s)),!this.initialRender)return;const r=await s;if(r===Yt&&Zt.delete(e),e===this.getIconSource().url)if((t=>void 0!==t?._$litType$)(r)){if(this.svg=r,i){await this.updateComplete;const t=this.shadowRoot.querySelector("[part='svg']");"function"==typeof i.mutator&&t&&i.mutator(t)}}else switch(r){case Yt:case Xt:this.svg=null,this.emit("sl-error");break;default:this.svg=r.cloneNode(!0),null==(t=null==i?void 0:i.mutator)||t.call(i,this.svg),this.emit("sl-load")}}render(){return this.svg}};Jt.styles=[Wt,St],Ft([A()],Jt.prototype,"svg",2),Ft([E({reflect:!0})],Jt.prototype,"name",2),Ft([E()],Jt.prototype,"src",2),Ft([E()],Jt.prototype,"label",2),Ft([E({reflect:!0})],Jt.prototype,"library",2),Ft([Ut("label")],Jt.prototype,"handleLabelChange",1),Ft([Ut(["name","src","library"])],Jt.prototype,"setIcon",1);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt=1,te=2,ee=3,oe=4,ie=t=>(...e)=>({_$litDirective$:t,values:e});let se=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const re=ie(class extends se{constructor(t){if(super(t),t.type!==Qt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const o=t.element.classList;for(const t of this.st)t in e||(o.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return Q}}),ne=Symbol.for(""),ae=t=>{if(t?.r===ne)return t?._$litStatic$},le=(t,...e)=>({_$litStatic$:e.reduce((e,o,i)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(o)+t[i+1],t[0]),r:ne}),ce=new Map,de=(t=>(e,...o)=>{const i=o.length;let s,r;const n=[],a=[];let l,c=0,d=!1;for(;c<i;){for(l=e[c];c<i&&void 0!==(r=o[c],s=ae(r));)l+=s+e[++c],d=!0;c!==i&&a.push(r),n.push(l),c++}if(c===i&&n.push(e[i]),d){const t=n.join("$$lit$$");void 0===(e=ce.get(t))&&(n.raw=n,ce.set(t,e=n)),o=a}return t(e,...o)})(J),he=t=>t??tt;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ue=class extends jt{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?le`a`:le`button`;return de`
      <${e}
        part="base"
        class=${re({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${he(t?void 0:this.disabled)}
        type=${he(t?void 0:"button")}
        href=${he(t?this.href:void 0)}
        target=${he(t?this.target:void 0)}
        download=${he(t?this.download:void 0)}
        rel=${he(t&&this.target?"noreferrer noopener":void 0)}
        role=${he(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${he(this.name)}
          library=${he(this.library)}
          src=${he(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};ue.styles=[Wt,vt],ue.dependencies={"sl-icon":Jt},Ft([z(".icon-button")],ue.prototype,"button",2),Ft([A()],ue.prototype,"hasFocus",2),Ft([E()],ue.prototype,"name",2),Ft([E()],ue.prototype,"library",2),Ft([E()],ue.prototype,"src",2),Ft([E()],ue.prototype,"href",2),Ft([E()],ue.prototype,"target",2),Ft([E()],ue.prototype,"download",2),Ft([E()],ue.prototype,"label",2),Ft([E({type:Boolean,reflect:!0})],ue.prototype,"disabled",2);var pe=ue;ue.define("sl-icon-button");
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
const me=/^(?:(?<hours>\d+):)??(?:(?<minutes>\d+):)??(?<seconds>\d+)(?<fraction>\.\d+)?$/;let ge=class extends ft{constructor(){super(...arguments),this.isVerticalWritingMode=!1,this.samplesSrcMap=new Map,this.prevMergeButton=null,this.nextMergeButton=null,this.splitButton=null}static{this.styles=a`
    :host {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: var(--sl-color-neutral-100);
      writing-mode: horizontal-tb;
    }

    .epub-overlay-edit-container {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: var(--sl-font-size-large);
    }

    sl-input {
      width: 11ch;
    }

    canvas {
      height: 50px;
      width: 100%;
    }
  `}validateInput(t){this.revertButton.disabled=!1;const e=t.target;e.value&&!isNaN(Number(e.value))?e.setCustomValidity(""):e.setCustomValidity("Must be a number"),this.commitButton.disabled=!e.reportValidity(),this.renderWaveform()}restoreBeginOnOverlap(t){const e=this.elems?.prev?.getAttribute("id")??"",o=this.idParMap?.get(e);if(!o)return;const i=t.target;Number(i.value)<fe(o.clipEnd)&&(i.value=fe(o.clipEnd).toString())}restoreEndOnOverlap(t){const e=this.elems?.next?.getAttribute("id")??"",o=this.idParMap?.get(e);if(!o)return;const i=t.target;Number(i.value)>fe(o.clipBegin)&&(i.value=fe(o.clipBegin).toString())}playBuffer(){const t=this.elems?.selected.getAttribute("id")??"",e=this.idParMap?.get(t);if(!e)return;const o=this.audioSrcMap?.get(e.audioSrc),i=fe(this.beginInput.value),s=fe(this.endInput.value);this.audioContext&&o&&ve(this.audioContext,o,i,s)}disableButtons(){this.commitButton.disabled=!0,this.revertButton.disabled=!0,this.deleteButton.disabled=!0}enableButtons(){this.commitButton.disabled=!1,this.revertButton.disabled=!1,this.deleteButton.disabled=!1}merge(t){const e=ye("csrftoken"),o=this.elems?.selected.getAttribute("id")??"";let i,s;if(t?(i=this.elems?.next?.getAttribute("id")??"",s=this.nextMergeButton):(i=this.elems?.prev?.getAttribute("id")??"",s=this.prevMergeButton),!(this.idParMap&&this.idParMap.has(o)&&this.idParMap.has(i)&&s&&e))return;const r=this.idParMap.get(o),n=this.idParMap.get(i),a={op:"MERGE",parId:r.parId,otherParId:n.parId};s.disabled=!0,ke(a,e).then(async t=>{if(t.ok){const{message:e,textId:o}=await t.json();we(`Merged: ${e}`,"primary","info-circle",5e3),this.dispatchEvent(new CustomEvent("restructured",{detail:{textId:o}}))}else if(t.headers.get("content-type")?.startsWith("text/html"))_e(await t.text(),`Update failed for ID: ${o}`);else{we(`Server error: ${(await t.json()).message}`,"danger","exclamation-octagon",5e3)}}).catch(t=>{we(`Error: ${t}`,"danger","exclamation-octagon",5e3)}).finally(()=>{s.disabled=!1})}split(t){const e=ye("csrftoken"),o=this.elems?.selected.getAttribute("id")??"",i=this.idParMap?.get(o);if(!e||!this.splitButton||!i)return;const s={op:"SPLIT",parId:i.parId,index:t};this.splitButton.disabled=!0,ke(s,e).then(async t=>{if(t.ok){const{message:e,textId:o}=await t.json();we(`Split: ${e}`,"primary","info-circle",5e3),this.dispatchEvent(new CustomEvent("restructured",{detail:{textId:o}}))}else if(t.headers.get("content-type")?.startsWith("text/html"))_e(await t.text(),`Update failed for ID: ${o}`),this.deleteButton.disabled=!1;else{we(`Server error: ${(await t.json()).message}`,"danger","exclamation-octagon",5e3)}}).catch(t=>{we(`Error: ${t}`,"danger","exclamation-octagon",5e3)}).finally(()=>{this.splitButton.disabled=!1})}commit(){const t=ye("csrftoken"),e=this.elems?.selected.getAttribute("id")??"",o=this.idParMap?.get(e);if(!o||!t)return;const i={...o,clipBegin:be(Number(this.beginInput.value)),clipEnd:be(Number(this.endInput.value)),op:"UPDATE"};this.disableButtons(),ke(i,t).then(async t=>{if(t.ok){const e=await t.json();we(`Updated: ${e.message}`,"primary","info-circle",5e3),this.beginInput.value=fe(e.new.clipBegin).toString(),this.endInput.value=fe(e.new.clipEnd).toString(),o.clipBegin=e.new.clipBegin,o.clipEnd=e.new.clipEnd}else if(t.headers.get("content-type")?.startsWith("text/html"))_e(await t.text(),`Update failed for ID: ${e}`),this.deleteButton.disabled=!1;else{we(`Server error: ${(await t.json()).message}`,"danger","exclamation-octagon",5e3),this.enableButtons()}}).catch(t=>{we(`Error: ${t}`,"danger","exclamation-octagon",5e3),this.enableButtons()})}revert(){const t=this.elems?.selected.getAttribute("id")??"",e=this.idParMap?.get(t);this.beginInput.value=fe(e?.clipBegin??"").toString(),this.endInput.value=fe(e?.clipEnd??"").toString(),this.revertButton.disabled=!0,this.commitButton.disabled=!0,this.renderWaveform()}delete(){const t=ye("csrftoken"),e=this.elems?.selected.getAttribute("id")??"",o=this.idParMap?.get(e);if(!o||!t)return;const i={...o,op:"DELETE"};this.deleteButton.disabled=!0,ke(i,t).then(async t=>{if(t.ok){const{message:e}=await t.json();we(`Deleted: ${e}`,"primary","info-circle",5e3),this.dispatchEvent(new CustomEvent("restructured",{detail:{textId:null}}))}else if(t.headers.get("content-type")?.startsWith("text/html"))_e(await t.text(),`Delete failed for ID: ${e}`),this.deleteButton.disabled=!1;else{we(`Server error: ${(await t.json()).message}`,"danger","exclamation-octagon",5e3),this.deleteButton.disabled=!1}}).catch(t=>{we(`Error: ${t}`,"danger","exclamation-octagon",5e3),this.deleteButton.disabled=!1})}create(){const t=ye("csrftoken"),e=this.createSelect.value,o=this.audioSrcMap?.get(e);if(!t||!this.elems?.textSrcNew||!o)return;const i=this.elems.prev?.getAttribute("id")??"",s=this.idParMap?.get(i)?.clipEnd,r=this.elems.next?.getAttribute("id")??"",n=this.idParMap?.get(r)?.clipBegin,a=this.elems.textSrcNew,l={parId:"",textSrc:a,audioSrc:e,clipBegin:s??"0:00:00.000",clipEnd:n??be(o.duration),op:"CREATE"};this.createButton.disabled=!0,ke(l,t).then(async t=>{if(t.ok){const{message:e,textId:o}=await t.json();we(`Created: ${e}`,"primary","info-circle",5e3),this.dispatchEvent(new CustomEvent("restructured",{detail:{textId:o}}))}else if(t.headers.get("content-type")?.startsWith("text/html"))_e(await t.text(),`Create failed for ID: ${a}`),this.deleteButton.disabled=!1;else{we(`Server error: ${(await t.json()).message}`,"danger","exclamation-octagon",5e3),this.createButton.disabled=!1}}).catch(t=>{we(`Error: ${t}`,"danger","exclamation-octagon",5e3),this.createButton.disabled=!1})}registerAdjustCanvasWidthEvent(){window.addEventListener("resize",()=>{this.waveformCanvas&&(this.waveformCanvas.width=this.waveformCanvas.getBoundingClientRect().width,this.renderWaveform())},!0)}firstUpdated(){this.registerAdjustCanvasWidthEvent()}willUpdate(t){this.removeMergeButtons();const e=t.get("elems");e&&this.removeSplitEvents(e.selected)}updated(){if(this.renderContext){const{width:t,height:e}=this.renderContext.canvas;this.renderContext.clearRect(0,0,t,e)}if(this.canvasIntersectionObserver&&this.canvasIntersectionObserver.disconnect(),this.waveformCanvas){const t=this.waveformCanvas.getContext("2d");if(!t)return;this.renderContext=t,this.canvasIntersectionObserver=new IntersectionObserver(t=>{const e=t[0];e.intersectionRatio>0&&this.waveformCanvas&&(this.waveformCanvas.width=e.boundingClientRect.width,this.renderWaveform())},{root:this}),this.canvasIntersectionObserver.observe(this.waveformCanvas),this.renderWaveform()}}renderWaveform(){if(!this.renderContext||!this.audioContext||!this.elems)return;const t=this.elems.selected.getAttribute("id")??"",e=this.idParMap?.get(t);if(!e)return;let o=null;if(this.elems.prev){const t=this.elems.prev.getAttribute("id")??"",e=this.idParMap?.get(t);e&&(o=[fe(e.clipBegin),fe(e.clipEnd)])}let i=null;if(this.elems.next){const t=this.elems.next.getAttribute("id")??"",e=this.idParMap?.get(t);e&&(i=[fe(e.clipBegin),fe(e.clipEnd)])}const s=this.audioSrcMap?.get(e.audioSrc);if(!s)return;let r,n;this.samplesSrcMap.has(e.audioSrc)?[r,n]=this.samplesSrcMap.get(e.audioSrc):([r,n]=function(t){const e=t.numberOfChannels,o=[];for(let i=0;i<e;i++)o.push(t.getChannelData(i));let i=0;const s=new Float32Array(t.length);for(let r=0;r<t.length;r++){for(let t=0;t<e;t++)s[r]+=o[t][r];const t=Math.abs(s[r]);t>i&&(i=t)}return[s,i]}(s),this.samplesSrcMap.set(e.audioSrc,[r,n]));const a=fe(this.beginInput.value),l=fe(this.endInput.value);!function(t,e,o,i,[s,r],n,a,l){const{width:c}=t.canvas;console.assert(s<r),t.font="24px Noto Serif JP",t.textBaseline="middle",t.textAlign="center";let d=t.measureText(a).width/c*10;d=Math.min(d,16),d=Math.max(d,1);const h=Math.round((r-s)*l/d),u=Math.round(l*s-h),p=Math.round(l*r+h),m=p-u,g=c/m;if(i){const[e,o]=i,s=Math.max(0,(Math.round(e*l)-u)*g),r=Math.max(0,(Math.round(o*l)-u)*g);s<r&&xe(t,s,r,"#ddd")}if(n){const[e,o]=n,i=Math.min(Math.round(m*g),(Math.round(e*l)-u)*g),s=Math.min(Math.round(m*g),(Math.round(o*l)-u)*g);i<s&&xe(t,i,s,"#ddd")}const f=Math.round(h*g),b=Math.round((m-h)*g);xe(t,f,b,"#ccc"),function(t,e,o,i,s,r){const{width:n,height:a}=t.canvas;t.beginPath(),t.moveTo(0,a);let l=0,c=0;for(let n=0;n<s;n++){const s=Math.round(n*r);if(s>l){const e=c*a/o;t.lineTo(l,a-e),l=s,c=0}const d=Math.abs(e[n+i]??0);d>c&&(c=d)}t.lineTo(n,a),t.fillStyle="#000",t.fill()}(t,e,o,u,m,g),function(t,e,o){const{width:i,height:s}=t.canvas;t.font="24px Noto Serif JP",t.textBaseline="middle",t.textAlign="center",t.lineWidth=5,t.strokeStyle="#fff",t.strokeText(e,i/2,s/2,o),t.fillStyle="#00f",t.fillText(e,i/2,s/2,o)}(t,a,b-f)}(this.renderContext,r,n,o,[a,l],i,Ce(this.elems.selected),this.audioContext.sampleRate)}addMergeButtons(){this.elems&&([this.prevMergeButton,this.nextMergeButton]=function(t,e){let o=null;t.prev&&t.selected.previousElementSibling===t.prev&&(o=new pe,o.id="prev-merge-button",o.name=e?"arrows-collapse":"arrows-collapse-vertical",o.label="Merge with previous media overlay",t.selected.insertAdjacentElement("beforebegin",o));let i=null;t.next&&t.selected.nextElementSibling===t.next&&(i=new pe,i.id="next-merge-button",i.name=e?"arrows-collapse":"arrows-collapse-vertical",i.label="Merge with next media overlay",t.selected.insertAdjacentElement("afterend",i));return[o,i]}(this.elems,this.isVerticalWritingMode),this.prevMergeButton&&(this.prevMergeButton.onclick=()=>{this.merge(!1)}),this.nextMergeButton&&(this.nextMergeButton.onclick=()=>{this.merge(!0)}))}removeMergeButtons(){this.prevMergeButton&&this.prevMergeButton.remove(),this.nextMergeButton&&this.nextMergeButton.remove()}addSplitEvents(){this.addSplitButtonsListeners(),this.addSplitButtonsEvents()}removeSplitEvents(t){this.originalSelectedElement&&(t.replaceChildren(...this.originalSelectedElement.childNodes),this.originalSelectedElement=void 0)}addSplitButtonsListeners(){if(!this.elems)return;this.originalSelectedElement=this.elems.selected.cloneNode(!0);const t=[];for(const e of this.elems.selected.childNodes)if(e.nodeType===Node.TEXT_NODE){const o=e;for(const e of o.data){const o=document.createTextNode(e),i=document.createElement("span");i.appendChild(o),t.push(i)}}else t.push(e);this.elems.selected.replaceChildren(...t)}addSplitButtonsEvents(){if(this.elems)for(let t=1;t<this.elems.selected.children.length;t++){const e=this.elems.selected.children[t];let o=null;e.onclick=i=>{i.stopPropagation(),o=new pe,o.id="split-button",o.name=this.isVerticalWritingMode?"arrows-expand":"arrows-expand-vertical",o.label="Split media overlay and corresponding text",o.onclick=e=>{e.stopPropagation(),this.split(t-1)},e.insertAdjacentElement("beforebegin",o),this.splitButton&&this.splitButton.remove(),this.splitButton=o},e.onmouseenter=()=>{e.style.borderInlineStart="1px solid"},e.onmouseleave=()=>{e.style.borderInlineStart=""}}}render(){if(!this.elems)return tt;if(this.elems.textSrcNew)return J`<div class="epub-overlay-edit-container">
        <sl-tooltip placement="top" content="${this.elems.textSrcNew}">
          <sl-input pill disabled value="${this.elems.textSrcNew}" size="small"></sl-input>
        </sl-tooltip>
        <sl-select id="create-select" pill size="small" placement="top" value="${this.elems.audioSrcNew}">
          ${Array.from(this.audioSrcMap.keys()).map(t=>J` <sl-option value="${t}">${t}</sl-option>`)}
        </sl-select>
        <sl-icon-button
          id="create-button"
          name="check-circle"
          label="create new"
          @click="${this.create}"
        ></sl-icon-button>
      </div>`;{this.addSplitEvents(),this.addMergeButtons();const t=!this.elems,e=this.elems.selected.getAttribute("id")??"",o=this.idParMap?.get(e),i=fe(o?.clipBegin??""),s=fe(o?.clipEnd??"");return J`<canvas id="waveform-target" height="50"></canvas>
        <div class="epub-overlay-edit-container">
          <sl-icon-button
            ?disabled=${t}
            name="play-circle"
            label="play current time selection"
            @click="${this.playBuffer}"
          ></sl-icon-button>
          <sl-input
            id="begin-input"
            ?disabled=${t}
            value="${i}"
            type="number"
            step="0.05"
            @sl-input="${this.validateInput}"
            @sl-change="${this.restoreBeginOnOverlap}"
            size="small"
            placeholder="Begin"
            pill
          ></sl-input>
          <sl-input
            id="end-input"
            ?disabled=${t}
            value="${s}"
            type="number"
            step="0.05"
            @sl-input="${this.validateInput}"
            @sl-change="${this.restoreEndOnOverlap}"
            size="small"
            placeholder="End"
            pill
          ></sl-input>
          <sl-icon-button
            id="commit-button"
            disabled
            name="check-circle"
            label="commit change"
            @click="${this.commit}"
          ></sl-icon-button>
          <sl-icon-button
            id="revert-button"
            disabled
            name="arrow-left-circle"
            label="revert change"
            @click="${this.revert}"
          ></sl-icon-button>
          <sl-icon-button
            id="delete-button"
            name="trash"
            label="delete overlay"
            @click="${this.delete}"
          ></sl-icon-button>
        </div>`}}};function fe(t){const e=me.exec(t.trim());if(!e?.groups)throw new Error(`Invalid clock value: ${t}`);const o=e.groups;let i=parseInt(o.seconds,10);return o.minutes&&(i+=60*parseInt(o.minutes,10)),o.hours&&(i+=3600*parseInt(o.hours,10)),o.fraction&&(i+=parseFloat(o.fraction)),i}function be(t){return`${Math.floor(t/3600).toString().padStart(2,"0")}:${Math.floor(t%3600/60).toString().padStart(2,"0")}:${Math.floor(t%60).toString().padStart(2,"0")}${(t%1).toFixed(3).slice(1).toString()}`}function ve(t,e,o,i){const s=t.createBufferSource();s.buffer=e,s.connect(t.destination),s.start(0,o,i-o)}function ye(t){let e=null;if(document.cookie&&""!==document.cookie){const o=document.cookie.split(";");for(const i of o){const o=i.trim();if(o.substring(0,t.length+1)===t+"="){e=decodeURIComponent(o.substring(t.length+1));break}}}return e}function we(t,e,o,i){const s=document.createElement("div");s.textContent=t;const r=s.innerHTML,n=Object.assign(document.createElement("sl-alert"),{variant:e,closable:!0,duration:i,innerHTML:`\n        <sl-icon name="${o}" slot="icon"></sl-icon>\n        ${r}\n      `});switch(document.body.append(n),e){case"warning":console.warn(r);break;case"danger":console.error(r)}n.toast()}function _e(t,e){const o=document.getElementById("error-dialog");if(!o)return void we(t,"danger","exclamation-octagon",5e3);o.label=e??"Operation failed";const i=document.createElement("iframe");i.toggleAttribute("sandbox"),i.title=e??"Operation failed",i.srcdoc=t,i.style.width="100%",i.style.height="100%",o.replaceChildren(i),o.show()}function xe(t,e,o,i){const{height:s}=t.canvas;t.beginPath(),t.rect(e,0,o-e,s),t.fillStyle=i,t.fill()}async function ke(t,e){return fetch(window.location.href,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json, text/html","X-CSRFToken":e},mode:"same-origin",body:JSON.stringify(t)})}function Ce(t){const e=[];for(const o of t.childNodes)o.nodeType==Node.TEXT_NODE&&o.textContent?e.push(o.nodeValue??""):o.nodeType!=Node.ELEMENT_NODE||["RP","RT"].includes(o.nodeName)||e.push(Ce(o));return e.join("")}
// @license-end
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
t([E({attribute:!1})],ge.prototype,"elems",void 0),t([E({attribute:!1})],ge.prototype,"isVerticalWritingMode",void 0),t([E({attribute:!1})],ge.prototype,"idParMap",void 0),t([z("#begin-input")],ge.prototype,"beginInput",void 0),t([z("#end-input")],ge.prototype,"endInput",void 0),t([z("#commit-button")],ge.prototype,"commitButton",void 0),t([z("#revert-button")],ge.prototype,"revertButton",void 0),t([z("#delete-button")],ge.prototype,"deleteButton",void 0),t([z("#create-button")],ge.prototype,"createButton",void 0),t([z("#create-select")],ge.prototype,"createSelect",void 0),t([z("#waveform-target")],ge.prototype,"waveformCanvas",void 0),ge=t([e("epub-overlay-edit")],ge);const $e=/url\("?([^")]+)"?\).*/,Se="-epub-media-overlay-active";let Ee=class extends ft{constructor(){super(...arguments),this.editModeActive=!1,this.handleXmlTask=new M(this,{task:Ae,args:()=>[this.src,this.smilsrc]})}async applyOverlay(t,e,o){this.audioContext=new AudioContext;const i=new URL(this.src,window.location.origin),s=new URL(this.smilsrc,window.location.origin);this.audioSrcMap=new Map(await Promise.all(Array.from(e).map(async t=>{const e=new URL(t,s),o=await fetch(e),i=await o.arrayBuffer();return[t,await this.audioContext.decodeAudioData(i)]}))),this.overlayElems=ze(t,o,i,s).map(([t,e])=>(this.addPlayBufferEvent(t,e),e))}addPlayBufferEvent(t,e){e.onclick=()=>{if(this.editModeActive)return;const o=this.audioSrcMap?.get(t.audioSrc);if(!o)return void console.warn(`SMIL: Audio buffer for ${t.audioSrc} not found`);const i=fe(t.clipBegin),s=fe(t.clipEnd);e.classList.add(this.activeclass??Se),setTimeout(()=>{e.classList.remove(this.activeclass??Se)},1e3*(s-i)),ve(this.audioContext,o,i,s)}}enableSpinner(t){const e=document.getElementById("header-spinner");e&&(e.classList.remove("invisible"),e.content=t)}disableSpinner(){const t=document.getElementById("header-spinner");t&&(t.classList.add("invisible"),t.content="")}enableEditModeButton(t){const e=document.getElementById("edit-mode-toggle");e&&(t.audioSrcMap=this.audioSrcMap,t.audioContext=this.audioContext,e.onclick=()=>{this.toggleEditModeEvent(t)},t.addEventListener("restructured",e=>{const o=e.detail;this.enableSpinner("Reloading book's media overlay"),Ae([this.src,this.smilsrc],{signal:this.editModeAbortController.signal}).then(e=>{this.editModeAbortController&&this.editModeAbortController.abort(),Be(e.body),this.parseResult=e,this.shadowRoot.replaceChildren(...e.body,t);const i=new URL(this.src,window.location.origin),s=new URL(this.smilsrc,window.location.origin);if(this.overlayElems=ze(e.body,e.parsData,i,s).map(([t,e])=>(this.addPlayBufferEvent(t,e),e)),this.editModeAbortController=new AbortController,Oe(t,i,s,this.editModeAbortController,e.body,e.parsData,this.overlayElems),o.textId)for(let e=0;e<this.overlayElems.length;e++)if(this.overlayElems[e].id===o.textId){Te(this.overlayElems,e,t);break}}).finally(()=>{this.disableSpinner()})}),e.disabled=!1)}toggleEditModeEvent(t){if(this.editModeActive)this.editModeActive=!1,t.style.display="none",this.editModeAbortController&&this.editModeAbortController.abort(),this.parseResult&&Be(this.parseResult.body),t.elems=void 0;else{if(!this.parseResult)return;this.editModeActive=!0,t.style.display="flex";const e=new URL(this.src,window.location.origin),o=new URL(this.smilsrc,window.location.origin);this.editModeAbortController=new AbortController,Oe(t,e,o,this.editModeAbortController,this.parseResult.body,this.parseResult.parsData,this.overlayElems)}}loadMediaOverlayIfExists(t){const{body:e,audioSrcSet:o,parsData:i}=this.parseResult;this.enableSpinner("Loading book's media overlay"),o&&i?this.applyOverlay(e,o,i).then(()=>{this.enableEditModeButton(t)}).finally(()=>{this.disableSpinner()}):this.disableSpinner()}handleInitialParseResult(t){this.parseResult&&(this.parseResult.styles.push(function(t){const e=new CSSStyleSheet;e.insertRule(".-epub-media-overlay-marked { border: 1px solid; cursor: pointer }"),e.insertRule(".-epub-media-overlay-marked + .-epub-media-overlay-marked { margin-inline-start: 2em }"),e.insertRule(".-epub-media-overlay-marked:hover { background-color: var(--sl-color-primary-100) }"),e.insertRule(".-epub-media-overlay-create { border: 1px dashed}"),t||e.insertRule(".-epub-media-overlay-active { background-color: var(--sl-color-primary-100) }");return e}(this.activeclass)),function(t,e,o){if(o.length>0){const t=new CSSStyleSheet;o.forEach(e=>{t.insertRule(e.cssText)}),document.adoptedStyleSheets=[t]}l(t,e)}
// @license-end
(this.renderRoot,this.parseResult.styles,this.parseResult.fontFaceRules),t.isVerticalWritingMode=this.parseResult.isVerticalWritingMode,t.style.display=this.editModeActive?"flex":"none")}render(){return this.handleXmlTask.render({pending:()=>(this.enableSpinner("Loading book content"),J` <div>Loading...</div>`),error:t=>(this.disableSpinner(),J` <div>${t} (${this.src})</div>`),complete:t=>{this.parseResult=t;const e=new ge;return this.handleInitialParseResult(e),this.loadMediaOverlayIfExists(e),[t.body,e]}})}};async function Ae([t,e],{signal:o}){if(!t)throw new Error("src attribute missing");const i=new URL(t,window.location.origin),s=fetch(i,{signal:o}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.text()}),r=e?fetch(e,{signal:o}).then(t=>{if(!t.ok)throw new Error(t.statusText);return t.text()}):Promise.resolve(void 0),[n,a]=await Promise.all([s,r]);return async function(t,e,o){const i=await async function(t,e){const o=new DOMParser,i=o.parseFromString(t,"application/xhtml+xml"),s=Array.from(i.head.children).filter(t=>"link"===t.tagName.toLowerCase()&&"stylesheet"===(t.getAttribute("rel")??"").toLowerCase()&&t.getAttribute("href")).map(async t=>{const o=t.getAttribute("href"),i=new URL(o,e),s=await fetch(i);if(!s.ok)throw new Error(s.statusText);return[await s.text(),i]}),r=await Promise.all(s),n=[],a=[];let l=!1;r.forEach(([t,e])=>{const o=function(t,e){const o=[],i=new CSSStyleSheet;let s=!1;i.replaceSync(t);for(const t of i.cssRules)if("CSSFontFaceRule"===t.constructor.name){const i=t,s=i.style.src,r=$e.exec(s);if(!r)continue;const n=new URL(r[1],e);i.style.src=s.replace(r[1],n.pathname),o.push(i)}else if("CSSStyleRule"===t.constructor.name){const e=t;if(["html","body",":root"].includes(e.selectorText)){e.selectorText=":host";const t=[];e.styleMap.has("writing-mode")&&t.push(e.styleMap.get("writing-mode").toString()),e.styleMap.has("-webkit-writing-mode")&&t.push(e.styleMap.get("-webkit-writing-mode").toString()),e.styleMap.has("-epub-writing-mode")&&t.push(e.styleMap.get("-epub-writing-mode").toString()),(t.includes("vertical-rl")||t.includes("vertical-lr"))&&(s=!0)}}return{styleSheet:i,fontFaceRules:o,isVerticalWritingMode:s}}(t,e);n.push(o.styleSheet),a.push(...o.fontFaceRules),l||=o.isVerticalWritingMode});const c=Array.from(i.body.children);return function(t,e){const o=t.flatMap(t=>Array.from(t.getElementsByTagName("img"))).filter(t=>t.hasAttribute("src"));for(const t of o){const o=t.getAttribute("src");t.setAttribute("src",new URL(o,e).pathname)}}(c,e),{body:c,styles:n,fontFaceRules:a,isVerticalWritingMode:l}}(t,e);if(o){const t=function(t){const e=new DOMParser,o=e.parseFromString(t,"application/xml"),i=o.querySelectorAll("par"),s=new Set,r=[];for(const t of i){const e=t.getElementsByTagName("text");console.assert(e.length>0,"text element not found: %o",t);const o=e.item(0);if(!o)continue;console.assert(1===e.length,"multiple text elements found: %o",t);const i=t.getElementsByTagName("audio");console.assert(i.length>0,"audio element not found: %o",t);const n=i.item(0);if(!n)continue;console.assert(1===i.length,"multiple audio elements found: %o",t);const a=t.getAttribute("id"),l=o.getAttribute("src"),c=n.getAttribute("src"),d=n.getAttribute("clipBegin"),h=n.getAttribute("clipEnd");a&&l&&c&&d&&h?(s.add(c),r.push({parId:a,textSrc:l,audioSrc:c,clipBegin:d,clipEnd:h})):console.warn("Incomplete par element: %o",t)}return{audioSrcSet:s,parsData:r}}(o);i.audioSrcSet=t.audioSrcSet,i.parsData=t.parsData}return i}(n,i,a)}function ze(t,e,o,i){const s=new Map(t.flatMap(t=>Array.from(t.getElementsByTagName("*")).filter(t=>t.hasAttribute("id")).map(t=>[t.getAttribute("id"),t]))),r=[];for(const t of e){const[e,n]=t.textSrc.split("#",2),a=new URL(e,i);if(o.pathname!==a.pathname){console.warn(`SMIL: ${e} does not match xhtml ${o.pathname}`);continue}const l=s.get(n);l?r.push([t,l]):console.warn(`SMIL: Element with id ${n} not found`)}return r}function Te(t,e,o){t.forEach(t=>{t.classList.remove("-epub-media-overlay-active")}),t[e].classList.add("-epub-media-overlay-active"),o.elems={prev:t[e-1],selected:t[e],next:t[e+1]}}function Me(t,e,o){const i=Le(t,e,o);if(i)return i;let s=o?t.nextElementSibling:t.previousElementSibling;for(;s;){const t=Le(s,e,o);if(t)return t;s=o?s.nextElementSibling:s.previousElementSibling}const r=o?t.parentElement?.nextElementSibling:t.parentElement?.previousElementSibling;return r?Me(r,e,o):null}function Le(t,e,o){const i=t.getAttribute("id");if(i&&e.has(i))return t;const s=Array.from(t.children);o||s.reverse();for(const t of s){const i=Le(t,e,o);if(i)return i}return null}function Pe(t){t.classList.remove("-epub-media-overlay-active"),t.classList.remove("-epub-media-overlay-marked"),t.classList.remove("-epub-media-overlay-create")}function Oe(t,e,o,i,s,r,n){t.idParMap=function(t,e,o){return new Map(t.map(t=>{const[e,o]=t.textSrc.split("#",2);return[e,o,t]}).filter(([t])=>{const i=new URL(t,o);return e.pathname===i.pathname}).map(([,t,e])=>[t,e]))}(r,e,o),function(t,e,o,i,s,r){(function(t,e,o){t.forEach((i,s)=>{i.classList.add("-epub-media-overlay-marked"),i.addEventListener("click",()=>{Te(t,s,e)},{signal:o})})})(r,t,o.signal),function(t,e,o,i,s){const r=new Set(e.map(t=>t.textSrc.split("#",2)[1]));t.forEach(t=>{t.addEventListener("click",t=>{t.stopPropagation();let s=t.target;for(;!s.hasAttribute("id");)if(s=s.parentElement,null===s)return;const n=s.getAttribute("id");if(r.has(n))return;s.classList.add("-epub-media-overlay-create");const a=Me(s,r,!1),l=Me(s,r,!0),c={};e.forEach(t=>{c[t.audioSrc]=(c[t.audioSrc]??0)+1});const d=Object.entries(c).sort(([,t],[,e])=>e-t).at(0),h=o.pathname.split("/").pop();i.elems={prev:a,selected:s,next:l,textSrcNew:`${h}#${n}`,audioSrcNew:d?.[0]}},{signal:s})})}(i,s,e,t,o.signal)}(t,e,i,s,r,n)}function Be(t){for(const e of t){Pe(e);for(const t of e.getElementsByTagName("*"))Pe(t)}}t([E({type:String})],Ee.prototype,"src",void 0),t([E({type:String})],Ee.prototype,"smilsrc",void 0),t([E({type:String})],Ee.prototype,"activeclass",void 0),Ee=t([e("epub-edit")],Ee);var De=t=>{var e;const{activeElement:o}=document;o&&t.contains(o)&&(null==(e=document.activeElement)||e.blur())},Re=new Map,Ie=new WeakMap;function Fe(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Ne(t,e){Re.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function Ve(t,e,o){const i=Ie.get(t);if(null==i?void 0:i[e])return Fe(i[e],o.dir);const s=Re.get(e);return s?Fe(s,o.dir):{keyframes:[],options:{duration:0}}}function Ue(t,e){return new Promise(o=>{t.addEventListener(e,function i(s){s.target===t&&(t.removeEventListener(e,i),o())})})}function He(t,e,o){return new Promise(i=>{if((null==o?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const s=t.animate(e,It(Rt({},o),{duration:je()?0:o.duration}));s.addEventListener("cancel",i,{once:!0}),s.addEventListener("finish",i,{once:!0})})}function We(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function je(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function qe(t){return Promise.all(t.getAnimations().map(t=>new Promise(e=>{t.cancel(),requestAnimationFrame(e)})))}var Ke=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=t=>{const e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if("sl-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};const Ge=new Set,Xe=new Map;let Ye,Ze="ltr",Je="en";const Qe="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(Qe){const t=new MutationObserver(eo);Ze=document.documentElement.dir||"ltr",Je=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function to(...t){t.map(t=>{const e=t.$code.toLowerCase();Xe.has(e)?Xe.set(e,Object.assign(Object.assign({},Xe.get(e)),t)):Xe.set(e,t),Ye||(Ye=t)}),eo()}function eo(){Qe&&(Ze=document.documentElement.dir||"ltr",Je=document.documentElement.lang||navigator.language),[...Ge.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}let oo=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){Ge.add(this.host)}hostDisconnected(){Ge.delete(this.host)}dir(){return`${this.host.dir||Ze}`.toLowerCase()}lang(){return`${this.host.lang||Je}`.toLowerCase()}getTranslationData(t){var e,o;const i=new Intl.Locale(t.replace(/_/g,"-")),s=null==i?void 0:i.language.toLowerCase(),r=null!==(o=null===(e=null==i?void 0:i.region)||void 0===e?void 0:e.toLowerCase())&&void 0!==o?o:"";return{locale:i,language:s,region:r,primary:Xe.get(`${s}-${r}`),secondary:Xe.get(s)}}exists(t,e){var o;const{primary:i,secondary:s}=this.getTranslationData(null!==(o=e.lang)&&void 0!==o?o:this.lang());return e=Object.assign({includeFallback:!1},e),!!(i&&i[t]||s&&s[t]||e.includeFallback&&Ye&&Ye[t])}term(t,...e){const{primary:o,secondary:i}=this.getTranslationData(this.lang());let s;if(o&&o[t])s=o[t];else if(i&&i[t])s=i[t];else{if(!Ye||!Ye[t])return console.error(`No translation found for: ${String(t)}`),String(t);s=Ye[t]}return"function"==typeof s?s(...e):s}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,e)}};var io={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};to(io);var so=io,ro=class extends oo{};to(so);var no=a`
  :host {
    display: contents;

    /* For better DX, we'll reset the margin here so the base part can inherit it */
    margin: 0;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-top-width: calc(var(--sl-panel-border-width) * 3);
    border-radius: var(--sl-border-radius-medium);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-normal);
    line-height: 1.6;
    color: var(--sl-color-neutral-700);
    margin: inherit;
    overflow: hidden;
  }

  .alert:not(.alert--has-icon) .alert__icon,
  .alert:not(.alert--closable) .alert__close-button {
    display: none;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-large);
    padding-inline-start: var(--sl-spacing-large);
  }

  .alert--has-countdown {
    border-bottom: none;
  }

  .alert--primary {
    border-top-color: var(--sl-color-primary-600);
  }

  .alert--primary .alert__icon {
    color: var(--sl-color-primary-600);
  }

  .alert--success {
    border-top-color: var(--sl-color-success-600);
  }

  .alert--success .alert__icon {
    color: var(--sl-color-success-600);
  }

  .alert--neutral {
    border-top-color: var(--sl-color-neutral-600);
  }

  .alert--neutral .alert__icon {
    color: var(--sl-color-neutral-600);
  }

  .alert--warning {
    border-top-color: var(--sl-color-warning-600);
  }

  .alert--warning .alert__icon {
    color: var(--sl-color-warning-600);
  }

  .alert--danger {
    border-top-color: var(--sl-color-danger-600);
  }

  .alert--danger .alert__icon {
    color: var(--sl-color-danger-600);
  }

  .alert__message {
    flex: 1 1 auto;
    display: block;
    padding: var(--sl-spacing-large);
    overflow: hidden;
  }

  .alert__close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
    margin-inline-end: var(--sl-spacing-medium);
    align-self: center;
  }

  .alert__countdown {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(var(--sl-panel-border-width) * 3);
    background-color: var(--sl-panel-border-color);
    display: flex;
  }

  .alert__countdown--ltr {
    justify-content: flex-end;
  }

  .alert__countdown .alert__countdown-elapsed {
    height: 100%;
    width: 0;
  }

  .alert--primary .alert__countdown-elapsed {
    background-color: var(--sl-color-primary-600);
  }

  .alert--success .alert__countdown-elapsed {
    background-color: var(--sl-color-success-600);
  }

  .alert--neutral .alert__countdown-elapsed {
    background-color: var(--sl-color-neutral-600);
  }

  .alert--warning .alert__countdown-elapsed {
    background-color: var(--sl-color-warning-600);
  }

  .alert--danger .alert__countdown-elapsed {
    background-color: var(--sl-color-danger-600);
  }

  .alert__timer {
    display: none;
  }
`,ao=class t extends jt{constructor(){super(...arguments),this.hasSlotController=new Ke(this,"icon","suffix"),this.localize=new ro(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0,this.remainingTime=this.duration}static get toastStack(){return this.currentToastStack||(this.currentToastStack=Object.assign(document.createElement("div"),{className:"sl-toast-stack"})),this.currentToastStack}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){this.handleCountdownChange(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.duration),this.remainingTime=this.duration,this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100))}pauseAutoHide(){var t;null==(t=this.countdownAnimation)||t.pause(),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval)}resumeAutoHide(){var t;this.duration<1/0&&(this.autoHideTimeout=window.setTimeout(()=>this.hide(),this.remainingTime),this.remainingTimeInterval=window.setInterval(()=>{this.remainingTime-=100},100),null==(t=this.countdownAnimation)||t.play())}handleCountdownChange(){if(this.open&&this.duration<1/0&&this.countdown){const{countdownElement:t}=this,e="100%",o="0";this.countdownAnimation=t.animate([{width:e},{width:o}],{duration:this.duration,easing:"linear"})}}handleCloseClick(){this.hide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await qe(this.base),this.base.hidden=!1;const{keyframes:t,options:e}=Ve(this,"alert.show",{dir:this.localize.dir()});await He(this.base,t,e),this.emit("sl-after-show")}else{De(this),this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),clearInterval(this.remainingTimeInterval),await qe(this.base);const{keyframes:t,options:e}=Ve(this,"alert.hide",{dir:this.localize.dir()});await He(this.base,t,e),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,Ue(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ue(this,"sl-after-hide")}async toast(){return new Promise(e=>{this.handleCountdownChange(),null===t.toastStack.parentElement&&document.body.append(t.toastStack),t.toastStack.appendChild(this),requestAnimationFrame(()=>{this.clientWidth,this.show()}),this.addEventListener("sl-after-hide",()=>{t.toastStack.removeChild(this),e(),null===t.toastStack.querySelector("sl-alert")&&t.toastStack.remove()},{once:!0})})}render(){return J`
      <div
        part="base"
        class=${re({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-countdown":!!this.countdown,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mouseenter=${this.pauseAutoHide}
        @mouseleave=${this.resumeAutoHide}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?J`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                class="alert__close-button"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                @click=${this.handleCloseClick}
              ></sl-icon-button>
            `:""}

        <div role="timer" class="alert__timer">${this.remainingTime}</div>

        ${this.countdown?J`
              <div
                class=${re({alert__countdown:!0,"alert__countdown--ltr":"ltr"===this.countdown})}
              >
                <div class="alert__countdown-elapsed"></div>
              </div>
            `:""}
      </div>
    `}};ao.styles=[Wt,no],ao.dependencies={"sl-icon-button":ue},Ft([z('[part~="base"]')],ao.prototype,"base",2),Ft([z(".alert__countdown-elapsed")],ao.prototype,"countdownElement",2),Ft([E({type:Boolean,reflect:!0})],ao.prototype,"open",2),Ft([E({type:Boolean,reflect:!0})],ao.prototype,"closable",2),Ft([E({reflect:!0})],ao.prototype,"variant",2),Ft([E({type:Number})],ao.prototype,"duration",2),Ft([E({type:String,reflect:!0})],ao.prototype,"countdown",2),Ft([A()],ao.prototype,"remainingTime",2),Ft([Ut("open",{waitUntilFirstUpdate:!0})],ao.prototype,"handleOpenChange",1),Ft([Ut("duration")],ao.prototype,"handleDurationChange",1);var lo=ao;Ne("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),Ne("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),lo.define("sl-alert");var co=a`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`,ho=(t="value")=>(e,o)=>{const i=e.constructor,s=i.prototype.attributeChangedCallback;i.prototype.attributeChangedCallback=function(e,r,n){var a;const l=i.getPropertyOptions(t);if(e===("string"==typeof l.attribute?l.attribute:t)){const e=l.converter||_,i=("function"==typeof e?e:null!=(a=null==e?void 0:e.fromAttribute)?a:_.fromAttribute)(n,l.type);this[t]!==i&&(this[o]=i)}s.call(this,e,r,n)}},uo=a`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,po=new WeakMap,mo=new WeakMap,go=new WeakMap,fo=new WeakSet,bo=new WeakMap,vo=class{constructor(t,e){this.handleFormData=t=>{const e=this.options.disabled(this.host),o=this.options.name(this.host),i=this.options.value(this.host),s="sl-button"===this.host.tagName.toLowerCase();this.host.isConnected&&!e&&!s&&"string"==typeof o&&o.length>0&&void 0!==i&&(Array.isArray(i)?i.forEach(e=>{t.formData.append(o,e.toString())}):t.formData.append(o,i.toString()))},this.handleFormSubmit=t=>{var e;const o=this.options.disabled(this.host),i=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(e=po.get(this.form))||e.forEach(t=>{this.setUserInteracted(t,!0)})),!this.form||this.form.noValidate||o||i(this.host)||(t.preventDefault(),t.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),bo.set(this.host,[])},this.handleInteraction=t=>{const e=bo.get(this.host);e.includes(t.type)||e.push(t.type),e.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.checkValidity&&!e.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.reportValidity&&!e.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=Rt({form:t=>{const e=t.form;if(e){const o=t.getRootNode().querySelector(`#${e}`);if(o)return o}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var e;return null!=(e=t.disabled)&&e},reportValidity:t=>"function"!=typeof t.reportValidity||t.reportValidity(),checkValidity:t=>"function"!=typeof t.checkValidity||t.checkValidity(),setValue:(t,e)=>t.value=e,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),bo.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction)})}hostDisconnected(){this.detachForm(),bo.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,po.has(this.form)?po.get(this.form).add(this.host):po.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),mo.has(this.form)||(mo.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),go.has(this.form)||(go.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=po.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),mo.has(this.form)&&(this.form.reportValidity=mo.get(this.form),mo.delete(this.form)),go.has(this.form)&&(this.form.checkValidity=go.get(this.form),go.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?fo.add(t):fo.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(t=>{e.hasAttribute(t)&&o.setAttribute(t,e.getAttribute(t))})),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return null!=(t=this.form)?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,o=Boolean(fo.has(e)),i=Boolean(e.required);e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||null==t||t.preventDefault()}},yo=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1}),wo=Object.freeze(It(Rt({},yo),{valid:!1,valueMissing:!0})),_o=Object.freeze(It(Rt({},yo),{valid:!1,customError:!0}));
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xo=ie(class extends se{constructor(t){if(super(t),t.type!==ee&&t.type!==Qt&&t.type!==oe)throw Error("The `live` directive is not allowed on child or event bindings");if(!qt(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Q||e===tt)return e;const o=t.element,i=t.name;if(t.type===ee){if(e===o[i])return Q}else if(t.type===oe){if(!!e===o.hasAttribute(i))return Q}else if(t.type===Qt&&o.getAttribute(i)===e+"")return Q;return((t,e=Kt)=>{t._$AH=e})(t),e}});var ko=class extends jt{constructor(){super(...arguments),this.formControlController=new vo(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ke(this,"help-text","label"),this.localize=new ro(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,(null==(t=this.input)?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){var t;return this.__numberInput.value=this.value,(null==(t=this.input)?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){t.preventDefault(),""!==this.value&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;"Enter"!==t.key||e||setTimeout(()=>{t.defaultPrevented||t.isComposing||this.formControlController.submit()})}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,i="preserve"){const s=null!=e?e:this.input.selectionStart,r=null!=o?o:this.input.selectionEnd;this.input.setRangeText(t,s,r,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,i=!!this.helpText||!!e,s=this.clearable&&!this.disabled&&!this.readonly&&("number"==typeof this.value||this.value.length>0);return J`
      <div
        part="form-control"
        class=${re({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":o,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${re({input:!0,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${"password"===this.type&&this.passwordVisible?"text":this.type}
              title=${this.title}
              name=${he(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${he(this.placeholder)}
              minlength=${he(this.minlength)}
              maxlength=${he(this.maxlength)}
              min=${he(this.min)}
              max=${he(this.max)}
              step=${he(this.step)}
              .value=${xo(this.value)}
              autocapitalize=${he(this.autocapitalize)}
              autocomplete=${he(this.autocomplete)}
              autocorrect=${he(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${he(this.pattern)}
              enterkeyhint=${he(this.enterkeyhint)}
              inputmode=${he(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${s?J`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                `:""}
            ${this.passwordToggle&&!this.disabled?J`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?J`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:J`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                `:""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ko.styles=[Wt,uo,co],ko.dependencies={"sl-icon":Jt},Ft([z(".input__control")],ko.prototype,"input",2),Ft([A()],ko.prototype,"hasFocus",2),Ft([E()],ko.prototype,"title",2),Ft([E({reflect:!0})],ko.prototype,"type",2),Ft([E()],ko.prototype,"name",2),Ft([E()],ko.prototype,"value",2),Ft([ho()],ko.prototype,"defaultValue",2),Ft([E({reflect:!0})],ko.prototype,"size",2),Ft([E({type:Boolean,reflect:!0})],ko.prototype,"filled",2),Ft([E({type:Boolean,reflect:!0})],ko.prototype,"pill",2),Ft([E()],ko.prototype,"label",2),Ft([E({attribute:"help-text"})],ko.prototype,"helpText",2),Ft([E({type:Boolean})],ko.prototype,"clearable",2),Ft([E({type:Boolean,reflect:!0})],ko.prototype,"disabled",2),Ft([E()],ko.prototype,"placeholder",2),Ft([E({type:Boolean,reflect:!0})],ko.prototype,"readonly",2),Ft([E({attribute:"password-toggle",type:Boolean})],ko.prototype,"passwordToggle",2),Ft([E({attribute:"password-visible",type:Boolean})],ko.prototype,"passwordVisible",2),Ft([E({attribute:"no-spin-buttons",type:Boolean})],ko.prototype,"noSpinButtons",2),Ft([E({reflect:!0})],ko.prototype,"form",2),Ft([E({type:Boolean,reflect:!0})],ko.prototype,"required",2),Ft([E()],ko.prototype,"pattern",2),Ft([E({type:Number})],ko.prototype,"minlength",2),Ft([E({type:Number})],ko.prototype,"maxlength",2),Ft([E()],ko.prototype,"min",2),Ft([E()],ko.prototype,"max",2),Ft([E()],ko.prototype,"step",2),Ft([E()],ko.prototype,"autocapitalize",2),Ft([E()],ko.prototype,"autocorrect",2),Ft([E()],ko.prototype,"autocomplete",2),Ft([E({type:Boolean})],ko.prototype,"autofocus",2),Ft([E()],ko.prototype,"enterkeyhint",2),Ft([E({type:Boolean,converter:{fromAttribute:t=>!(!t||"false"===t),toAttribute:t=>t?"true":"false"}})],ko.prototype,"spellcheck",2),Ft([E()],ko.prototype,"inputmode",2),Ft([Ut("disabled",{waitUntilFirstUpdate:!0})],ko.prototype,"handleDisabledChange",1),Ft([Ut("step",{waitUntilFirstUpdate:!0})],ko.prototype,"handleStepChange",1),Ft([Ut("value",{waitUntilFirstUpdate:!0})],ko.prototype,"handleValueChange",1),ko.define("sl-input");var Co=a`
  :host {
    --border-color: var(--sl-color-neutral-200);
    --border-radius: var(--sl-border-radius-medium);
    --border-width: 1px;
    --padding: var(--sl-spacing-large);

    display: inline-block;
  }

  .card {
    display: flex;
    flex-direction: column;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-small);
    border: solid var(--border-width) var(--border-color);
    border-radius: var(--border-radius);
  }

  .card__image {
    display: flex;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    display: block;
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card:not(.card--has-image) .card__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .card__body {
    display: block;
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    display: block;
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,$o=class extends jt{constructor(){super(...arguments),this.hasSlotController=new Ke(this,"footer","header","image")}render(){return J`
      <div
        part="base"
        class=${re({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};$o.styles=[Wt,Co],$o.define("sl-card");var So=a`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,Eo=a`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const Ao=Math.min,zo=Math.max,To=Math.round,Mo=Math.floor,Lo=t=>({x:t,y:t}),Po={left:"right",right:"left",bottom:"top",top:"bottom"},Oo={start:"end",end:"start"};function Bo(t,e,o){return zo(t,Ao(e,o))}function Do(t,e){return"function"==typeof t?t(e):t}function Ro(t){return t.split("-")[0]}function Io(t){return t.split("-")[1]}function Fo(t){return"x"===t?"y":"x"}function No(t){return"y"===t?"height":"width"}const Vo=new Set(["top","bottom"]);function Uo(t){return Vo.has(Ro(t))?"y":"x"}function Ho(t){return Fo(Uo(t))}function Wo(t){return t.replace(/start|end/g,t=>Oo[t])}const jo=["left","right"],qo=["right","left"],Ko=["top","bottom"],Go=["bottom","top"];function Xo(t,e,o,i){const s=Io(t);let r=function(t,e,o){switch(t){case"top":case"bottom":return o?e?qo:jo:e?jo:qo;case"left":case"right":return e?Ko:Go;default:return[]}}(Ro(t),"start"===o,i);return s&&(r=r.map(t=>t+"-"+s),e&&(r=r.concat(r.map(Wo)))),r}function Yo(t){return t.replace(/left|right|bottom|top/g,t=>Po[t])}function Zo(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function Jo(t){const{x:e,y:o,width:i,height:s}=t;return{width:i,height:s,top:o,left:e,right:e+i,bottom:o+s,x:e,y:o}}function Qo(t,e,o){let{reference:i,floating:s}=t;const r=Uo(e),n=Ho(e),a=No(n),l=Ro(e),c="y"===r,d=i.x+i.width/2-s.width/2,h=i.y+i.height/2-s.height/2,u=i[a]/2-s[a]/2;let p;switch(l){case"top":p={x:d,y:i.y-s.height};break;case"bottom":p={x:d,y:i.y+i.height};break;case"right":p={x:i.x+i.width,y:h};break;case"left":p={x:i.x-s.width,y:h};break;default:p={x:i.x,y:i.y}}switch(Io(e)){case"start":p[n]-=u*(o&&c?-1:1);break;case"end":p[n]+=u*(o&&c?-1:1)}return p}async function ti(t,e){var o;void 0===e&&(e={});const{x:i,y:s,platform:r,rects:n,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:d="viewport",elementContext:h="floating",altBoundary:u=!1,padding:p=0}=Do(e,t),m=Zo(p),g=a[u?"floating"===h?"reference":"floating":h],f=Jo(await r.getClippingRect({element:null==(o=await(null==r.isElement?void 0:r.isElement(g)))||o?g:g.contextElement||await(null==r.getDocumentElement?void 0:r.getDocumentElement(a.floating)),boundary:c,rootBoundary:d,strategy:l})),b="floating"===h?{x:i,y:s,width:n.floating.width,height:n.floating.height}:n.reference,v=await(null==r.getOffsetParent?void 0:r.getOffsetParent(a.floating)),y=await(null==r.isElement?void 0:r.isElement(v))&&await(null==r.getScale?void 0:r.getScale(v))||{x:1,y:1},w=Jo(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:b,offsetParent:v,strategy:l}):b);return{top:(f.top-w.top+m.top)/y.y,bottom:(w.bottom-f.bottom+m.bottom)/y.y,left:(f.left-w.left+m.left)/y.x,right:(w.right-f.right+m.right)/y.x}}const ei=new Set(["left","top"]);function oi(){return"undefined"!=typeof window}function ii(t){return ni(t)?(t.nodeName||"").toLowerCase():"#document"}function si(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function ri(t){var e;return null==(e=(ni(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function ni(t){return!!oi()&&(t instanceof Node||t instanceof si(t).Node)}function ai(t){return!!oi()&&(t instanceof Element||t instanceof si(t).Element)}function li(t){return!!oi()&&(t instanceof HTMLElement||t instanceof si(t).HTMLElement)}function ci(t){return!(!oi()||"undefined"==typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof si(t).ShadowRoot)}const di=new Set(["inline","contents"]);function hi(t){const{overflow:e,overflowX:o,overflowY:i,display:s}=ki(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+o)&&!di.has(s)}const ui=new Set(["table","td","th"]);function pi(t){return ui.has(ii(t))}const mi=[":popover-open",":modal"];function gi(t){return mi.some(e=>{try{return t.matches(e)}catch(t){return!1}})}const fi=["transform","translate","scale","rotate","perspective"],bi=["transform","translate","scale","rotate","perspective","filter"],vi=["paint","layout","strict","content"];function yi(t){const e=wi(),o=ai(t)?ki(t):t;return fi.some(t=>!!o[t]&&"none"!==o[t])||!!o.containerType&&"normal"!==o.containerType||!e&&!!o.backdropFilter&&"none"!==o.backdropFilter||!e&&!!o.filter&&"none"!==o.filter||bi.some(t=>(o.willChange||"").includes(t))||vi.some(t=>(o.contain||"").includes(t))}function wi(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}const _i=new Set(["html","body","#document"]);function xi(t){return _i.has(ii(t))}function ki(t){return si(t).getComputedStyle(t)}function Ci(t){return ai(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function $i(t){if("html"===ii(t))return t;const e=t.assignedSlot||t.parentNode||ci(t)&&t.host||ri(t);return ci(e)?e.host:e}function Si(t){const e=$i(t);return xi(e)?t.ownerDocument?t.ownerDocument.body:t.body:li(e)&&hi(e)?e:Si(e)}function Ei(t,e,o){var i;void 0===e&&(e=[]),void 0===o&&(o=!0);const s=Si(t),r=s===(null==(i=t.ownerDocument)?void 0:i.body),n=si(s);if(r){const t=Ai(n);return e.concat(n,n.visualViewport||[],hi(s)?s:[],t&&o?Ei(t):[])}return e.concat(s,Ei(s,[],o))}function Ai(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function zi(t){const e=ki(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const s=li(t),r=s?t.offsetWidth:o,n=s?t.offsetHeight:i,a=To(o)!==r||To(i)!==n;return a&&(o=r,i=n),{width:o,height:i,$:a}}function Ti(t){return ai(t)?t:t.contextElement}function Mi(t){const e=Ti(t);if(!li(e))return Lo(1);const o=e.getBoundingClientRect(),{width:i,height:s,$:r}=zi(e);let n=(r?To(o.width):o.width)/i,a=(r?To(o.height):o.height)/s;return n&&Number.isFinite(n)||(n=1),a&&Number.isFinite(a)||(a=1),{x:n,y:a}}const Li=Lo(0);function Pi(t){const e=si(t);return wi()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:Li}function Oi(t,e,o,i){void 0===e&&(e=!1),void 0===o&&(o=!1);const s=t.getBoundingClientRect(),r=Ti(t);let n=Lo(1);e&&(i?ai(i)&&(n=Mi(i)):n=Mi(t));const a=function(t,e,o){return void 0===e&&(e=!1),!(!o||e&&o!==si(t))&&e}(r,o,i)?Pi(r):Lo(0);let l=(s.left+a.x)/n.x,c=(s.top+a.y)/n.y,d=s.width/n.x,h=s.height/n.y;if(r){const t=si(r),e=i&&ai(i)?si(i):i;let o=t,s=Ai(o);for(;s&&i&&e!==o;){const t=Mi(s),e=s.getBoundingClientRect(),i=ki(s),r=e.left+(s.clientLeft+parseFloat(i.paddingLeft))*t.x,n=e.top+(s.clientTop+parseFloat(i.paddingTop))*t.y;l*=t.x,c*=t.y,d*=t.x,h*=t.y,l+=r,c+=n,o=si(s),s=Ai(o)}}return Jo({width:d,height:h,x:l,y:c})}function Bi(t,e){const o=Ci(t).scrollLeft;return e?e.left+o:Oi(ri(t)).left+o}function Di(t,e){const o=t.getBoundingClientRect();return{x:o.left+e.scrollLeft-Bi(t,o),y:o.top+e.scrollTop}}const Ri=new Set(["absolute","fixed"]);function Ii(t,e,o){let i;if("viewport"===e)i=function(t,e){const o=si(t),i=ri(t),s=o.visualViewport;let r=i.clientWidth,n=i.clientHeight,a=0,l=0;if(s){r=s.width,n=s.height;const t=wi();(!t||t&&"fixed"===e)&&(a=s.offsetLeft,l=s.offsetTop)}const c=Bi(i);if(c<=0){const t=i.ownerDocument,e=t.body,o=getComputedStyle(e),s="CSS1Compat"===t.compatMode&&parseFloat(o.marginLeft)+parseFloat(o.marginRight)||0,n=Math.abs(i.clientWidth-e.clientWidth-s);n<=25&&(r-=n)}else c<=25&&(r+=c);return{width:r,height:n,x:a,y:l}}(t,o);else if("document"===e)i=function(t){const e=ri(t),o=Ci(t),i=t.ownerDocument.body,s=zo(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),r=zo(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let n=-o.scrollLeft+Bi(t);const a=-o.scrollTop;return"rtl"===ki(i).direction&&(n+=zo(e.clientWidth,i.clientWidth)-s),{width:s,height:r,x:n,y:a}}(ri(t));else if(ai(e))i=function(t,e){const o=Oi(t,!0,"fixed"===e),i=o.top+t.clientTop,s=o.left+t.clientLeft,r=li(t)?Mi(t):Lo(1);return{width:t.clientWidth*r.x,height:t.clientHeight*r.y,x:s*r.x,y:i*r.y}}(e,o);else{const o=Pi(t);i={x:e.x-o.x,y:e.y-o.y,width:e.width,height:e.height}}return Jo(i)}function Fi(t,e){const o=$i(t);return!(o===e||!ai(o)||xi(o))&&("fixed"===ki(o).position||Fi(o,e))}function Ni(t,e,o){const i=li(e),s=ri(e),r="fixed"===o,n=Oi(t,!0,r,e);let a={scrollLeft:0,scrollTop:0};const l=Lo(0);function c(){l.x=Bi(s)}if(i||!i&&!r)if(("body"!==ii(e)||hi(s))&&(a=Ci(e)),i){const t=Oi(e,!0,r,e);l.x=t.x+e.clientLeft,l.y=t.y+e.clientTop}else s&&c();r&&!i&&s&&c();const d=!s||i||r?Lo(0):Di(s,a);return{x:n.left+a.scrollLeft-l.x-d.x,y:n.top+a.scrollTop-l.y-d.y,width:n.width,height:n.height}}function Vi(t){return"static"===ki(t).position}function Ui(t,e){if(!li(t)||"fixed"===ki(t).position)return null;if(e)return e(t);let o=t.offsetParent;return ri(t)===o&&(o=o.ownerDocument.body),o}function Hi(t,e){const o=si(t);if(gi(t))return o;if(!li(t)){let e=$i(t);for(;e&&!xi(e);){if(ai(e)&&!Vi(e))return e;e=$i(e)}return o}let i=Ui(t,e);for(;i&&pi(i)&&Vi(i);)i=Ui(i,e);return i&&xi(i)&&Vi(i)&&!yi(i)?o:i||function(t){let e=$i(t);for(;li(e)&&!xi(e);){if(yi(e))return e;if(gi(e))return null;e=$i(e)}return null}(t)||o}const Wi={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:o,offsetParent:i,strategy:s}=t;const r="fixed"===s,n=ri(i),a=!!e&&gi(e.floating);if(i===n||a&&r)return o;let l={scrollLeft:0,scrollTop:0},c=Lo(1);const d=Lo(0),h=li(i);if((h||!h&&!r)&&(("body"!==ii(i)||hi(n))&&(l=Ci(i)),li(i))){const t=Oi(i);c=Mi(i),d.x=t.x+i.clientLeft,d.y=t.y+i.clientTop}const u=!n||h||r?Lo(0):Di(n,l);return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-l.scrollLeft*c.x+d.x+u.x,y:o.y*c.y-l.scrollTop*c.y+d.y+u.y}},getDocumentElement:ri,getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:i,strategy:s}=t;const r=[..."clippingAncestors"===o?gi(e)?[]:function(t,e){const o=e.get(t);if(o)return o;let i=Ei(t,[],!1).filter(t=>ai(t)&&"body"!==ii(t)),s=null;const r="fixed"===ki(t).position;let n=r?$i(t):t;for(;ai(n)&&!xi(n);){const e=ki(n),o=yi(n);o||"fixed"!==e.position||(s=null),(r?!o&&!s:!o&&"static"===e.position&&s&&Ri.has(s.position)||hi(n)&&!o&&Fi(t,n))?i=i.filter(t=>t!==n):s=e,n=$i(n)}return e.set(t,i),i}(e,this._c):[].concat(o),i],n=r[0],a=r.reduce((t,o)=>{const i=Ii(e,o,s);return t.top=zo(i.top,t.top),t.right=Ao(i.right,t.right),t.bottom=Ao(i.bottom,t.bottom),t.left=zo(i.left,t.left),t},Ii(e,n,s));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},getOffsetParent:Hi,getElementRects:async function(t){const e=this.getOffsetParent||Hi,o=this.getDimensions,i=await o(t.floating);return{reference:Ni(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:i.width,height:i.height}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:o}=zi(t);return{width:e,height:o}},getScale:Mi,isElement:ai,isRTL:function(t){return"rtl"===ki(t).direction}};function ji(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function qi(t,e,o,i){void 0===i&&(i={});const{ancestorScroll:s=!0,ancestorResize:r=!0,elementResize:n="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:l=!1}=i,c=Ti(t),d=s||r?[...c?Ei(c):[],...Ei(e)]:[];d.forEach(t=>{s&&t.addEventListener("scroll",o,{passive:!0}),r&&t.addEventListener("resize",o)});const h=c&&a?function(t,e){let o,i=null;const s=ri(t);function r(){var t;clearTimeout(o),null==(t=i)||t.disconnect(),i=null}return function n(a,l){void 0===a&&(a=!1),void 0===l&&(l=1),r();const c=t.getBoundingClientRect(),{left:d,top:h,width:u,height:p}=c;if(a||e(),!u||!p)return;const m={rootMargin:-Mo(h)+"px "+-Mo(s.clientWidth-(d+u))+"px "+-Mo(s.clientHeight-(h+p))+"px "+-Mo(d)+"px",threshold:zo(0,Ao(1,l))||1};let g=!0;function f(e){const i=e[0].intersectionRatio;if(i!==l){if(!g)return n();i?n(!1,i):o=setTimeout(()=>{n(!1,1e-7)},1e3)}1!==i||ji(c,t.getBoundingClientRect())||n(),g=!1}try{i=new IntersectionObserver(f,{...m,root:s.ownerDocument})}catch(t){i=new IntersectionObserver(f,m)}i.observe(t)}(!0),r}(c,o):null;let u,p=-1,m=null;n&&(m=new ResizeObserver(t=>{let[i]=t;i&&i.target===c&&m&&(m.unobserve(e),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var t;null==(t=m)||t.observe(e)})),o()}),c&&!l&&m.observe(c),m.observe(e));let g=l?Oi(t):null;return l&&function e(){const i=Oi(t);g&&!ji(g,i)&&o();g=i,u=requestAnimationFrame(e)}(),o(),()=>{var t;d.forEach(t=>{s&&t.removeEventListener("scroll",o),r&&t.removeEventListener("resize",o)}),null==h||h(),null==(t=m)||t.disconnect(),m=null,l&&cancelAnimationFrame(u)}}const Ki=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var o,i;const{x:s,y:r,placement:n,middlewareData:a}=e,l=await async function(t,e){const{placement:o,platform:i,elements:s}=t,r=await(null==i.isRTL?void 0:i.isRTL(s.floating)),n=Ro(o),a=Io(o),l="y"===Uo(o),c=ei.has(n)?-1:1,d=r&&l?-1:1,h=Do(e,t);let{mainAxis:u,crossAxis:p,alignmentAxis:m}="number"==typeof h?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:h.mainAxis||0,crossAxis:h.crossAxis||0,alignmentAxis:h.alignmentAxis};return a&&"number"==typeof m&&(p="end"===a?-1*m:m),l?{x:p*d,y:u*c}:{x:u*c,y:p*d}}(e,t);return n===(null==(o=a.offset)?void 0:o.placement)&&null!=(i=a.arrow)&&i.alignmentOffset?{}:{x:s+l.x,y:r+l.y,data:{...l,placement:n}}}}},Gi=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:i,placement:s}=e,{mainAxis:r=!0,crossAxis:n=!1,limiter:a={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}},...l}=Do(t,e),c={x:o,y:i},d=await ti(e,l),h=Uo(Ro(s)),u=Fo(h);let p=c[u],m=c[h];if(r){const t="y"===u?"bottom":"right";p=Bo(p+d["y"===u?"top":"left"],p,p-d[t])}if(n){const t="y"===h?"bottom":"right";m=Bo(m+d["y"===h?"top":"left"],m,m-d[t])}const g=a.fn({...e,[u]:p,[h]:m});return{...g,data:{x:g.x-o,y:g.y-i,enabled:{[u]:r,[h]:n}}}}}},Xi=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o,i;const{placement:s,middlewareData:r,rects:n,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:d=!0,crossAxis:h=!0,fallbackPlacements:u,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:g=!0,...f}=Do(t,e);if(null!=(o=r.arrow)&&o.alignmentOffset)return{};const b=Ro(s),v=Uo(a),y=Ro(a)===a,w=await(null==l.isRTL?void 0:l.isRTL(c.floating)),_=u||(y||!g?[Yo(a)]:function(t){const e=Yo(t);return[Wo(t),e,Wo(e)]}(a)),x="none"!==m;!u&&x&&_.push(...Xo(a,g,m,w));const k=[a,..._],C=await ti(e,f),$=[];let S=(null==(i=r.flip)?void 0:i.overflows)||[];if(d&&$.push(C[b]),h){const t=function(t,e,o){void 0===o&&(o=!1);const i=Io(t),s=Ho(t),r=No(s);let n="x"===s?i===(o?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[r]>e.floating[r]&&(n=Yo(n)),[n,Yo(n)]}(s,n,w);$.push(C[t[0]],C[t[1]])}if(S=[...S,{placement:s,overflows:$}],!$.every(t=>t<=0)){var E,A;const t=((null==(E=r.flip)?void 0:E.index)||0)+1,e=k[t];if(e){if(!("alignment"===h&&v!==Uo(e))||S.every(t=>Uo(t.placement)!==v||t.overflows[0]>0))return{data:{index:t,overflows:S},reset:{placement:e}}}let o=null==(A=S.filter(t=>t.overflows[0]<=0).sort((t,e)=>t.overflows[1]-e.overflows[1])[0])?void 0:A.placement;if(!o)switch(p){case"bestFit":{var z;const t=null==(z=S.filter(t=>{if(x){const e=Uo(t.placement);return e===v||"y"===e}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,e)=>t+e,0)]).sort((t,e)=>t[1]-e[1])[0])?void 0:z[0];t&&(o=t);break}case"initialPlacement":o=a}if(s!==o)return{reset:{placement:o}}}return{}}}},Yi=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var o,i;const{placement:s,rects:r,platform:n,elements:a}=e,{apply:l=()=>{},...c}=Do(t,e),d=await ti(e,c),h=Ro(s),u=Io(s),p="y"===Uo(s),{width:m,height:g}=r.floating;let f,b;"top"===h||"bottom"===h?(f=h,b=u===(await(null==n.isRTL?void 0:n.isRTL(a.floating))?"start":"end")?"left":"right"):(b=h,f="end"===u?"top":"bottom");const v=g-d.top-d.bottom,y=m-d.left-d.right,w=Ao(g-d[f],v),_=Ao(m-d[b],y),x=!e.middlewareData.shift;let k=w,C=_;if(null!=(o=e.middlewareData.shift)&&o.enabled.x&&(C=y),null!=(i=e.middlewareData.shift)&&i.enabled.y&&(k=v),x&&!u){const t=zo(d.left,0),e=zo(d.right,0),o=zo(d.top,0),i=zo(d.bottom,0);p?C=m-2*(0!==t||0!==e?t+e:zo(d.left,d.right)):k=g-2*(0!==o||0!==i?o+i:zo(d.top,d.bottom))}await l({...e,availableWidth:C,availableHeight:k});const $=await n.getDimensions(a.floating);return m!==$.width||g!==$.height?{reset:{rects:!0}}:{}}}},Zi=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:i,placement:s,rects:r,platform:n,elements:a,middlewareData:l}=e,{element:c,padding:d=0}=Do(t,e)||{};if(null==c)return{};const h=Zo(d),u={x:o,y:i},p=Ho(s),m=No(p),g=await n.getDimensions(c),f="y"===p,b=f?"top":"left",v=f?"bottom":"right",y=f?"clientHeight":"clientWidth",w=r.reference[m]+r.reference[p]-u[p]-r.floating[m],_=u[p]-r.reference[p],x=await(null==n.getOffsetParent?void 0:n.getOffsetParent(c));let k=x?x[y]:0;k&&await(null==n.isElement?void 0:n.isElement(x))||(k=a.floating[y]||r.floating[m]);const C=w/2-_/2,$=k/2-g[m]/2-1,S=Ao(h[b],$),E=Ao(h[v],$),A=S,z=k-g[m]-E,T=k/2-g[m]/2+C,M=Bo(A,T,z),L=!l.arrow&&null!=Io(s)&&T!==M&&r.reference[m]/2-(T<A?S:E)-g[m]/2<0,P=L?T<A?T-A:T-z:0;return{[p]:u[p]+P,data:{[p]:M,centerOffset:T-M-P,...L&&{alignmentOffset:P}},reset:L}}}),Ji=(t,e,o)=>{const i=new Map,s={platform:Wi,...o},r={...s.platform,_c:i};return(async(t,e,o)=>{const{placement:i="bottom",strategy:s="absolute",middleware:r=[],platform:n}=o,a=r.filter(Boolean),l=await(null==n.isRTL?void 0:n.isRTL(e));let c=await n.getElementRects({reference:t,floating:e,strategy:s}),{x:d,y:h}=Qo(c,i,l),u=i,p={},m=0;for(let o=0;o<a.length;o++){const{name:r,fn:g}=a[o],{x:f,y:b,data:v,reset:y}=await g({x:d,y:h,initialPlacement:i,placement:u,strategy:s,middlewareData:p,rects:c,platform:n,elements:{reference:t,floating:e}});d=null!=f?f:d,h=null!=b?b:h,p={...p,[r]:{...p[r],...v}},y&&m<=50&&(m++,"object"==typeof y&&(y.placement&&(u=y.placement),y.rects&&(c=!0===y.rects?await n.getElementRects({reference:t,floating:e,strategy:s}):y.rects),({x:d,y:h}=Qo(c,u,l))),o=-1)}return{x:d,y:h,placement:u,strategy:s,middlewareData:p}})(t,e,{...s,platform:r})};function Qi(t){return function(t){for(let e=t;e;e=ts(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=ts(t);e;e=ts(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if("contents"!==t.display){if("static"!==t.position||yi(t))return e;if("BODY"===e.tagName)return e}}return null}(t)}function ts(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var es=class extends jt{constructor(){super(...arguments),this.localize=new ro(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect();let o=0,i=0,s=0,r=0,n=0,a=0,l=0,c=0;this.placement.includes("top")||this.placement.includes("bottom")?t.top<e.top?(o=t.left,i=t.bottom,s=t.right,r=t.bottom,n=e.left,a=e.top,l=e.right,c=e.top):(o=e.left,i=e.bottom,s=e.right,r=e.bottom,n=t.left,a=t.top,l=t.right,c=t.top):t.left<e.left?(o=t.right,i=t.top,s=e.left,r=e.top,n=t.right,a=t.bottom,l=e.left,c=e.bottom):(o=e.right,i=e.top,s=t.left,r=t.top,n=e.right,a=e.bottom,l=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${r}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||function(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t.contextElement instanceof Element)}(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=qi(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[Ki({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(Yi({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(Xi({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Gi({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(Yi({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Zi({element:this.arrowEl,padding:this.arrowPadding}));const e="absolute"===this.strategy?t=>Wi.getOffsetParent(t,Qi):Wi.getOffsetParent;Ji(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:It(Rt({},Wi),{getOffsetParent:e})}).then(({x:t,y:e,middlewareData:o,placement:i})=>{const s="rtl"===this.localize.dir(),r={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=o.arrow.x,e=o.arrow.y;let i="",n="",a="",l="";if("start"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",n=s?o:"",l=s?"":o}else if("end"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";n=s?"":o,l=s?o:"",a="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",i="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",i="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:i,right:n,bottom:a,left:l,[r]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return J`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${re({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${re({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?J`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};es.styles=[Wt,Eo],Ft([z(".popup")],es.prototype,"popup",2),Ft([z(".popup__arrow")],es.prototype,"arrowEl",2),Ft([E()],es.prototype,"anchor",2),Ft([E({type:Boolean,reflect:!0})],es.prototype,"active",2),Ft([E({reflect:!0})],es.prototype,"placement",2),Ft([E({reflect:!0})],es.prototype,"strategy",2),Ft([E({type:Number})],es.prototype,"distance",2),Ft([E({type:Number})],es.prototype,"skidding",2),Ft([E({type:Boolean})],es.prototype,"arrow",2),Ft([E({attribute:"arrow-placement"})],es.prototype,"arrowPlacement",2),Ft([E({attribute:"arrow-padding",type:Number})],es.prototype,"arrowPadding",2),Ft([E({type:Boolean})],es.prototype,"flip",2),Ft([E({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],es.prototype,"flipFallbackPlacements",2),Ft([E({attribute:"flip-fallback-strategy"})],es.prototype,"flipFallbackStrategy",2),Ft([E({type:Object})],es.prototype,"flipBoundary",2),Ft([E({attribute:"flip-padding",type:Number})],es.prototype,"flipPadding",2),Ft([E({type:Boolean})],es.prototype,"shift",2),Ft([E({type:Object})],es.prototype,"shiftBoundary",2),Ft([E({attribute:"shift-padding",type:Number})],es.prototype,"shiftPadding",2),Ft([E({attribute:"auto-size"})],es.prototype,"autoSize",2),Ft([E()],es.prototype,"sync",2),Ft([E({type:Object})],es.prototype,"autoSizeBoundary",2),Ft([E({attribute:"auto-size-padding",type:Number})],es.prototype,"autoSizePadding",2),Ft([E({attribute:"hover-bridge",type:Boolean})],es.prototype,"hoverBridge",2);var os=class extends jt{constructor(){super(),this.localize=new ro(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=We(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=We(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await qe(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:e,options:o}=Ve(this,"tooltip.show",{dir:this.localize.dir()});await He(this.popup.popup,e,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await qe(this.body);const{keyframes:t,options:o}=Ve(this,"tooltip.hide",{dir:this.localize.dir()});await He(this.popup.popup,t,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Ue(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ue(this,"sl-after-hide")}render(){return J`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${re({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};os.styles=[Wt,So],os.dependencies={"sl-popup":es},Ft([z("slot:not([name])")],os.prototype,"defaultSlot",2),Ft([z(".tooltip__body")],os.prototype,"body",2),Ft([z("sl-popup")],os.prototype,"popup",2),Ft([E()],os.prototype,"content",2),Ft([E()],os.prototype,"placement",2),Ft([E({type:Boolean,reflect:!0})],os.prototype,"disabled",2),Ft([E({type:Number})],os.prototype,"distance",2),Ft([E({type:Boolean,reflect:!0})],os.prototype,"open",2),Ft([E({type:Number})],os.prototype,"skidding",2),Ft([E()],os.prototype,"trigger",2),Ft([E({type:Boolean})],os.prototype,"hoist",2),Ft([Ut("open",{waitUntilFirstUpdate:!0})],os.prototype,"handleOpenChange",1),Ft([Ut(["content","distance","hoist","placement","skidding"])],os.prototype,"handleOptionsChange",1),Ft([Ut("disabled")],os.prototype,"handleDisabledChange",1),Ne("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),Ne("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}}),os.define("sl-tooltip");var is=a`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,ss=class extends jt{constructor(){super(...arguments),this.localize=new ro(this)}render(){return J`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};ss.styles=[Wt,is];var rs=a`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,ns=class extends jt{constructor(){super(...arguments),this.formControlController=new vo(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Ke(this,"[default]","prefix","suffix"),this.localize=new ro(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:yo}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){"submit"===this.type&&this.formControlController.submit(this),"reset"===this.type&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return!this.isButton()||this.button.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.isButton()||this.button.reportValidity()}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?le`a`:le`button`;return de`
      <${e}
        part="base"
        class=${re({button:!0,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":"rtl"===this.localize.dir(),"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${he(t?void 0:this.disabled)}
        type=${he(t?void 0:this.type)}
        title=${this.title}
        name=${he(t?void 0:this.name)}
        value=${he(t?void 0:this.value)}
        href=${he(t&&!this.disabled?this.href:void 0)}
        target=${he(t?this.target:void 0)}
        download=${he(t?this.download:void 0)}
        rel=${he(t?this.rel:void 0)}
        role=${he(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?de` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?de`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};ns.styles=[Wt,rs],ns.dependencies={"sl-icon":Jt,"sl-spinner":ss},Ft([z(".button")],ns.prototype,"button",2),Ft([A()],ns.prototype,"hasFocus",2),Ft([A()],ns.prototype,"invalid",2),Ft([E()],ns.prototype,"title",2),Ft([E({reflect:!0})],ns.prototype,"variant",2),Ft([E({reflect:!0})],ns.prototype,"size",2),Ft([E({type:Boolean,reflect:!0})],ns.prototype,"caret",2),Ft([E({type:Boolean,reflect:!0})],ns.prototype,"disabled",2),Ft([E({type:Boolean,reflect:!0})],ns.prototype,"loading",2),Ft([E({type:Boolean,reflect:!0})],ns.prototype,"outline",2),Ft([E({type:Boolean,reflect:!0})],ns.prototype,"pill",2),Ft([E({type:Boolean,reflect:!0})],ns.prototype,"circle",2),Ft([E()],ns.prototype,"type",2),Ft([E()],ns.prototype,"name",2),Ft([E()],ns.prototype,"value",2),Ft([E()],ns.prototype,"href",2),Ft([E()],ns.prototype,"target",2),Ft([E()],ns.prototype,"rel",2),Ft([E()],ns.prototype,"download",2),Ft([E()],ns.prototype,"form",2),Ft([E({attribute:"formaction"})],ns.prototype,"formAction",2),Ft([E({attribute:"formenctype"})],ns.prototype,"formEnctype",2),Ft([E({attribute:"formmethod"})],ns.prototype,"formMethod",2),Ft([E({attribute:"formnovalidate",type:Boolean})],ns.prototype,"formNoValidate",2),Ft([E({attribute:"formtarget"})],ns.prototype,"formTarget",2),Ft([Ut("disabled",{waitUntilFirstUpdate:!0})],ns.prototype,"handleDisabledChange",1),ns.define("sl-button");var as=a`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,ls=class extends jt{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){const e=cs(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(t){const e=cs(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(t){const e=cs(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(t){const e=cs(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach(e=>{const o=t.indexOf(e),i=cs(e);i&&(i.toggleAttribute("data-sl-button-group__button",!0),i.toggleAttribute("data-sl-button-group__button--first",0===o),i.toggleAttribute("data-sl-button-group__button--inner",o>0&&o<t.length-1),i.toggleAttribute("data-sl-button-group__button--last",o===t.length-1),i.toggleAttribute("data-sl-button-group__button--radio","sl-radio-button"===i.tagName.toLowerCase()))})}render(){return J`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};function cs(t){var e;const o="sl-button, sl-radio-button";return null!=(e=t.closest(o))?e:t.querySelector(o)}ls.styles=[Wt,as],Ft([z("slot")],ls.prototype,"defaultSlot",2),Ft([A()],ls.prototype,"disableRole",2),Ft([E()],ls.prototype,"label",2),ls.define("sl-button-group"),Jt.define("sl-icon");var ds=a`
  :host {
    --size: 25rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .drawer {
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
  }

  .drawer--contained {
    position: absolute;
    z-index: initial;
  }

  .drawer--fixed {
    position: fixed;
    z-index: var(--sl-z-index-drawer);
  }

  .drawer__panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 2;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--sl-panel-background-color);
    box-shadow: var(--sl-shadow-x-large);
    overflow: auto;
    pointer-events: all;
  }

  .drawer__panel:focus {
    outline: none;
  }

  .drawer--top .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--end .drawer__panel {
    top: 0;
    inset-inline-end: 0;
    bottom: auto;
    inset-inline-start: auto;
    width: var(--size);
    height: 100%;
  }

  .drawer--bottom .drawer__panel {
    top: auto;
    inset-inline-end: auto;
    bottom: 0;
    inset-inline-start: 0;
    width: 100%;
    height: var(--size);
  }

  .drawer--start .drawer__panel {
    top: 0;
    inset-inline-end: auto;
    bottom: auto;
    inset-inline-start: 0;
    width: var(--size);
    height: 100%;
  }

  .drawer__header {
    display: flex;
  }

  .drawer__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .drawer__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .drawer__header-actions sl-icon-button,
  .drawer__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .drawer__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer__footer {
    text-align: right;
    padding: var(--footer-spacing);
  }

  .drawer__footer ::slotted(sl-button:not(:last-of-type)) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .drawer:not(.drawer--has-footer) .drawer__footer {
    display: none;
  }

  .drawer__overlay {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
    pointer-events: all;
  }

  .drawer--contained .drawer__overlay {
    display: none;
  }

  @media (forced-colors: active) {
    .drawer__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`;function*hs(t=document.activeElement){var e,o,i,s,r;null!=t&&(yield t,"shadowRoot"in t&&t.shadowRoot&&"closed"!==t.shadowRoot.mode&&(yield*(e=hs(t.shadowRoot.activeElement),i=e[Ot("asyncIterator")],s=!1,r={},null==i?(i=e[Ot("iterator")](),o=t=>r[t]=e=>i[t](e)):(i=i.call(e),o=t=>r[t]=e=>{if(s){if(s=!1,"throw"===t)throw e;return e}return s=!0,{done:!1,value:new Vt(new Promise(o=>{var s=i[t](e);s instanceof Object||Bt("Object expected"),o(s)}),1)}}),r[Ot("iterator")]=()=>r,o("next"),"throw"in i?o("throw"):r.throw=t=>{throw t},"return"in i&&o("return"),r)))}function us(){return[...hs()].pop()}var ps=new WeakMap;function ms(t){let e=ps.get(t);return e||(e=window.getComputedStyle(t,null),ps.set(t,e)),e}function gs(t){const e=t.tagName.toLowerCase(),o=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(o)||o<=-1))return!1;if(t.hasAttribute("disabled"))return!1;if(t.closest("[inert]"))return!1;if("input"===e&&"radio"===t.getAttribute("type")){const e=t.getRootNode(),o=`input[type='radio'][name="${t.getAttribute("name")}"]`,i=e.querySelector(`${o}:checked`);if(i)return i===t;return e.querySelector(o)===t}if(!function(t){if("function"==typeof t.checkVisibility)return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=ms(t);return"hidden"!==e.visibility&&"none"!==e.display}(t))return!1;if(("audio"===e||"video"===e)&&t.hasAttribute("controls"))return!0;if(t.hasAttribute("tabindex"))return!0;if(t.hasAttribute("contenteditable")&&"false"!==t.getAttribute("contenteditable"))return!0;return!!["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)||function(t){const e=ms(t),{overflowY:o,overflowX:i}=e;return"scroll"===o||"scroll"===i||"auto"===o&&"auto"===i&&(t.scrollHeight>t.clientHeight&&"auto"===o||!(!(t.scrollWidth>t.clientWidth)||"auto"!==i))}(t)}function fs(t){const e=new WeakMap,o=[];return function i(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]"))return;if(e.has(s))return;e.set(s,!0),!o.includes(s)&&gs(s)&&o.push(s),s instanceof HTMLSlotElement&&function(t,e){var o;return(null==(o=t.getRootNode({composed:!0}))?void 0:o.host)!==e}(s,t)&&s.assignedElements({flatten:!0}).forEach(t=>{i(t)}),null!==s.shadowRoot&&"open"===s.shadowRoot.mode&&i(s.shadowRoot)}for(const t of s.children)i(t)}(t),o.sort((t,e)=>{const o=Number(t.getAttribute("tabindex"))||0;return(Number(e.getAttribute("tabindex"))||0)-o})}var bs=[],vs=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var e;if("Tab"!==t.key||this.isExternalActivated)return;if(!this.isActive())return;const o=us();if(this.previousFocus=o,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const i=fs(this.element);let s=i.findIndex(t=>t===o);this.previousFocus=this.currentFocus;const r="forward"===this.tabDirection?1:-1;for(;;){s+r>=i.length?s=0:s+r<0?s=i.length-1:s+=r,this.previousFocus=this.currentFocus;const o=i[s];if("backward"===this.tabDirection&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;if(o&&this.possiblyHasTabbableChildren(o))return;t.preventDefault(),this.currentFocus=o,null==(e=this.currentFocus)||e.focus({preventScroll:!1});const n=[...hs()];if(n.includes(this.currentFocus)||!n.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){bs.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){bs=bs.filter(t=>t!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return bs[bs.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=fs(this.element);if(!this.element.matches(":focus-within")){const e=t[0],o=t[t.length-1],i="forward"===this.tabDirection?e:o;"function"==typeof(null==i?void 0:i.focus)&&(this.currentFocus=i,i.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}};var ys=new Set;function ws(t){if(ys.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){const t=function(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}()+function(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}();let e=getComputedStyle(document.documentElement).scrollbarGutter;e&&"auto"!==e||(e="stable"),t<2&&(e=""),document.documentElement.style.setProperty("--sl-scroll-lock-gutter",e),document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${t}px`)}}function _s(t){ys.delete(t),0===ys.size&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function xs(t,e,o="vertical",i="smooth"){const s=function(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}(t,e),r=s.top+e.scrollTop,n=s.left+e.scrollLeft,a=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,d=e.scrollTop+e.offsetHeight;"horizontal"!==o&&"both"!==o||(n<a?e.scrollTo({left:n,behavior:i}):n+t.clientWidth>l&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:i})),"vertical"!==o&&"both"!==o||(r<c?e.scrollTo({top:r,behavior:i}):r+t.clientHeight>d&&e.scrollTo({top:r-e.offsetHeight+t.clientHeight,behavior:i}))}function ks(t){return t.charAt(0).toUpperCase()+t.slice(1)}var Cs=class extends jt{constructor(){super(...arguments),this.hasSlotController=new Ke(this,"footer"),this.localize=new ro(this),this.modal=new vs(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1,this.handleDocumentKeyDown=t=>{this.contained||"Escape"===t.key&&this.modal.isActive()&&this.open&&(t.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),ws(this)))}disconnectedCallback(){super.disconnectedCallback(),_s(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const t=Ve(this,"drawer.denyClose",{dir:this.localize.dir()});return void He(this.panel,t.keyframes,t.options)}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;document.removeEventListener("keydown",this.handleDocumentKeyDown),null==(t=this.closeWatcher)||t.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),ws(this));const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([qe(this.drawer),qe(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=Ve(this,`drawer.show${ks(this.placement)}`,{dir:this.localize.dir()}),o=Ve(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([He(this.panel,e.keyframes,e.options),He(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{De(this),this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),_s(this)),await Promise.all([qe(this.drawer),qe(this.overlay)]);const t=Ve(this,`drawer.hide${ks(this.placement)}`,{dir:this.localize.dir()}),e=Ve(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([He(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),He(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.drawer.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1;const o=this.originalTrigger;"function"==typeof(null==o?void 0:o.focus)&&setTimeout(()=>o.focus()),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),ws(this)),this.open&&this.contained&&(this.modal.deactivate(),_s(this))}async show(){if(!this.open)return this.open=!0,Ue(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ue(this,"sl-after-hide")}render(){return J`
      <div
        part="base"
        class=${re({drawer:!0,"drawer--open":this.open,"drawer--top":"top"===this.placement,"drawer--end":"end"===this.placement,"drawer--bottom":"bottom"===this.placement,"drawer--start":"start"===this.placement,"drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":"rtl"===this.localize.dir(),"drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${he(this.noHeader?this.label:void 0)}
          aria-labelledby=${he(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":J`
                <header part="header" class="drawer__header">
                  <h2 part="title" class="drawer__title" id="title">
                    <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="drawer__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="drawer__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click=${()=>this.requestClose("close-button")}
                    ></sl-icon-button>
                  </div>
                </header>
              `}

          <slot part="body" class="drawer__body"></slot>

          <footer part="footer" class="drawer__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};Cs.styles=[Wt,ds],Cs.dependencies={"sl-icon-button":ue},Ft([z(".drawer")],Cs.prototype,"drawer",2),Ft([z(".drawer__panel")],Cs.prototype,"panel",2),Ft([z(".drawer__overlay")],Cs.prototype,"overlay",2),Ft([E({type:Boolean,reflect:!0})],Cs.prototype,"open",2),Ft([E({reflect:!0})],Cs.prototype,"label",2),Ft([E({reflect:!0})],Cs.prototype,"placement",2),Ft([E({type:Boolean,reflect:!0})],Cs.prototype,"contained",2),Ft([E({attribute:"no-header",type:Boolean,reflect:!0})],Cs.prototype,"noHeader",2),Ft([Ut("open",{waitUntilFirstUpdate:!0})],Cs.prototype,"handleOpenChange",1),Ft([Ut("contained",{waitUntilFirstUpdate:!0})],Cs.prototype,"handleNoModalChange",1),Ne("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}}),Ne("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}}),Ne("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}}),Ne("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}}),Ne("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}}),Ne("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}}),Ne("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}}),Ne("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}}),Ne("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}}),Ne("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),Ne("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}}),Cs.define("sl-drawer");var $s=a`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,Ss=class extends jt{constructor(){super(...arguments),this.localize=new ro(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=t=>{this.open&&"Escape"===t.key&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=t=>{var e;if("Escape"===t.key&&this.open&&!this.closeWatcher)return t.stopPropagation(),this.focusOnTrigger(),void this.hide();if("Tab"===t.key){if(this.open&&"sl-menu-item"===(null==(e=document.activeElement)?void 0:e.tagName.toLowerCase()))return t.preventDefault(),this.hide(),void this.focusOnTrigger();const o=(t,e)=>{if(!t)return null;const i=t.closest(e);if(i)return i;const s=t.getRootNode();return s instanceof ShadowRoot?o(s.host,e):null};setTimeout(()=>{var t;const e=(null==(t=this.containingElement)?void 0:t.getRootNode())instanceof ShadowRoot?us():document.activeElement;this.containingElement&&o(e,this.containingElement.tagName.toLowerCase())===this.containingElement||this.hide()})}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=t=>{const e=t.target;this.stayOpenOnSelect||"sl-menu"!==e.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const t=this.trigger.assignedElements({flatten:!0})[0];"function"==typeof(null==t?void 0:t.focus)&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(t=>"sl-menu"===t.tagName.toLowerCase())}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key))return t.preventDefault(),void this.handleTriggerClick();const e=this.getMenu();if(e){const o=e.getAllItems(),i=o[0],s=o[o.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),o.length>0&&this.updateComplete.then(()=>{"ArrowDown"!==t.key&&"Home"!==t.key||(e.setCurrentItem(i),i.focus()),"ArrowUp"!==t.key&&"End"!==t.key||(e.setCurrentItem(s),s.focus())}))}}handleTriggerKeyUp(t){" "===t.key&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find(t=>function(t){var e,o;const i=fs(t);return{start:null!=(e=i[0])?e:null,end:null!=(o=i[i.length-1])?o:null}}(t).start);let e;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":e=t.button;break;default:e=t}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,Ue(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ue(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),null==(t=this.closeWatcher)||t.destroy()}async handleOpenChange(){if(this.disabled)this.open=!1;else if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await qe(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:t,options:e}=Ve(this,"dropdown.show",{dir:this.localize.dir()});await He(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await qe(this);const{keyframes:t,options:e}=Ve(this,"dropdown.hide",{dir:this.localize.dir()});await He(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return J`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${he(this.sync?this.sync:void 0)}
        class=${re({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};Ss.styles=[Wt,$s],Ss.dependencies={"sl-popup":es},Ft([z(".dropdown")],Ss.prototype,"popup",2),Ft([z(".dropdown__trigger")],Ss.prototype,"trigger",2),Ft([z(".dropdown__panel")],Ss.prototype,"panel",2),Ft([E({type:Boolean,reflect:!0})],Ss.prototype,"open",2),Ft([E({reflect:!0})],Ss.prototype,"placement",2),Ft([E({type:Boolean,reflect:!0})],Ss.prototype,"disabled",2),Ft([E({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],Ss.prototype,"stayOpenOnSelect",2),Ft([E({attribute:!1})],Ss.prototype,"containingElement",2),Ft([E({type:Number})],Ss.prototype,"distance",2),Ft([E({type:Number})],Ss.prototype,"skidding",2),Ft([E({type:Boolean})],Ss.prototype,"hoist",2),Ft([E({reflect:!0})],Ss.prototype,"sync",2),Ft([Ut("open",{waitUntilFirstUpdate:!0})],Ss.prototype,"handleOpenChange",1),Ne("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),Ne("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}}),Ss.define("sl-dropdown");var Es=a`
  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,As=class extends jt{constructor(){super(...arguments),this.hasSlotController=new Ke(this,"footer"),this.localize=new ro(this),this.modal=new vs(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{"Escape"===t.key&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),ws(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),_s(this),this.removeOpenListeners()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const t=Ve(this,"dialog.denyClose",{dir:this.localize.dir()});return void He(this.panel,t.keyframes,t.options)}this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),ws(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([qe(this.dialog),qe(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")});const e=Ve(this,"dialog.show",{dir:this.localize.dir()}),o=Ve(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([He(this.panel,e.keyframes,e.options),He(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{De(this),this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([qe(this.dialog),qe(this.overlay)]);const t=Ve(this,"dialog.hide",{dir:this.localize.dir()}),e=Ve(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([He(this.overlay,e.keyframes,e.options).then(()=>{this.overlay.hidden=!0}),He(this.panel,t.keyframes,t.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,_s(this);const o=this.originalTrigger;"function"==typeof(null==o?void 0:o.focus)&&setTimeout(()=>o.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,Ue(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Ue(this,"sl-after-hide")}render(){return J`
      <div
        part="base"
        class=${re({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${he(this.noHeader?this.label:void 0)}
          aria-labelledby=${he(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":J`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <div part="body" class="dialog__body" tabindex="-1"><slot></slot></div>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};As.styles=[Wt,Es],As.dependencies={"sl-icon-button":ue},Ft([z(".dialog")],As.prototype,"dialog",2),Ft([z(".dialog__panel")],As.prototype,"panel",2),Ft([z(".dialog__overlay")],As.prototype,"overlay",2),Ft([E({type:Boolean,reflect:!0})],As.prototype,"open",2),Ft([E({reflect:!0})],As.prototype,"label",2),Ft([E({attribute:"no-header",type:Boolean,reflect:!0})],As.prototype,"noHeader",2),Ft([Ut("open",{waitUntilFirstUpdate:!0})],As.prototype,"handleOpenChange",1),Ne("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),Ne("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),Ne("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}}),Ne("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),Ne("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}}),As.define("sl-dialog"),ss.define("sl-spinner");var zs=a`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,Ts=class extends jt{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(t){const e=["menuitem","menuitemcheckbox"],o=t.composedPath(),i=o.find(t=>{var o;return e.includes((null==(o=null==t?void 0:t.getAttribute)?void 0:o.call(t,"role"))||"")});if(!i)return;if(o.find(t=>{var e;return"menu"===(null==(e=null==t?void 0:t.getAttribute)?void 0:e.call(t,"role"))})!==this)return;const s=i;"checkbox"===s.type&&(s.checked=!s.checked),this.emit("sl-select",{detail:{item:s}})}handleKeyDown(t){if("Enter"===t.key||" "===t.key){const e=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),null==e||e.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){const e=this.getAllItems(),o=this.getCurrentItem();let i=o?e.indexOf(o):0;e.length>0&&(t.preventDefault(),t.stopPropagation(),"ArrowDown"===t.key?i++:"ArrowUp"===t.key?i--:"Home"===t.key?i=0:"End"===t.key&&(i=e.length-1),i<0&&(i=e.length-1),i>e.length-1&&(i=0),this.setCurrentItem(e[i]),e[i].focus())}}handleMouseDown(t){const e=t.target;this.isMenuItem(e)&&this.setCurrentItem(e)}handleSlotChange(){const t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0])}isMenuItem(t){var e;return"sl-menu-item"===t.tagName.toLowerCase()||["menuitem","menuitemcheckbox","menuitemradio"].includes(null!=(e=t.getAttribute("role"))?e:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(t=>!(t.inert||!this.isMenuItem(t)))}getCurrentItem(){return this.getAllItems().find(t=>"0"===t.getAttribute("tabindex"))}setCurrentItem(t){this.getAllItems().forEach(e=>{e.setAttribute("tabindex",e===t?"0":"-1")})}render(){return J`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Ts.styles=[Wt,zs],Ft([z("slot")],Ts.prototype,"defaultSlot",2),Ts.define("sl-menu");var Ms=a`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const Ls=(t,e)=>{const o=t._$AN;if(void 0===o)return!1;for(const t of o)t._$AO?.(e,!1),Ls(t,e);return!0},Ps=t=>{let e,o;do{if(void 0===(e=t._$AM))break;o=e._$AN,o.delete(t),t=e}while(0===o?.size)},Os=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(void 0===o)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),Rs(e)}};function Bs(t){void 0!==this._$AN?(Ps(this),this._$AM=t,Os(this)):this._$AM=t}function Ds(t,e=!1,o=0){const i=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(e)if(Array.isArray(i))for(let t=o;t<i.length;t++)Ls(i[t],!1),Ps(i[t]);else null!=i&&(Ls(i,!1),Ps(i));else Ls(this,t)}const Rs=t=>{t.type==te&&(t._$AP??=Ds,t._$AQ??=Bs)};class Is extends se{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,o){super._$AT(t,e,o),Os(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Ls(this,t),Ps(this))}setValue(t){if(qt(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Fs{}const Ns=new WeakMap,Vs=ie(class extends Is{render(t){return tt}update(t,[e]){const o=e!==this.G;return o&&void 0!==this.G&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.G=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),tt}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.G){const e=this.ht??globalThis;let o=Ns.get(e);void 0===o&&(o=new WeakMap,Ns.set(e,o)),void 0!==o.get(this.G)&&this.G.call(this.ht,void 0),o.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){return"function"==typeof this.G?Ns.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var Us=class{constructor(t,e){this.popupRef=new Fs,this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=t=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${t.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${t.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=t=>{switch(t.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":t.target!==this.host&&(t.preventDefault(),t.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(t)}},this.handleClick=t=>{var e;t.target===this.host?(t.preventDefault(),t.stopPropagation()):t.target instanceof Element&&("sl-menu-item"===t.target.tagName||(null==(e=t.target.role)?void 0:e.startsWith("menuitem")))&&this.disableSubmenu()},this.handleFocusOut=t=>{t.relatedTarget&&t.relatedTarget instanceof Element&&this.host.contains(t.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=t=>{t.stopPropagation()},this.handlePopupReposition=()=>{const t=this.host.renderRoot.querySelector("slot[name='submenu']"),e=null==t?void 0:t.assignedElements({flatten:!0}).filter(t=>"sl-menu"===t.localName)[0],o="rtl"===getComputedStyle(this.host).direction;if(!e)return;const{left:i,top:s,width:r,height:n}=e.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${o?i+r:i}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${o?i+r:i}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${s+n}px`)},(this.host=t).addController(this),this.hasSlotController=e}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(t){const e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e)return void console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);let o=null;for(const t of e.assignedElements())if(o=t.querySelectorAll("sl-menu-item, [role^='menuitem']"),0!==o.length)break;if(o&&0!==o.length){o[0].setAttribute("tabindex","0");for(let t=1;t!==o.length;++t)o[t].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?o[0]instanceof HTMLElement&&o[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{o[0]instanceof HTMLElement&&o[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate())}enableSubmenu(t=!0){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var t;if(!(null==(t=this.host.parentElement)?void 0:t.computedStyleMap))return;const e=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce((t,o)=>{var i;const s=null!=(i=e.get(o))?i:new CSSUnitValue(0,"px");return t-(s instanceof CSSUnitValue?s:new CSSUnitValue(0,"px")).to("px").value},0);this.skidding=o}isExpanded(){return!!this.popupRef.value&&this.popupRef.value.active}renderSubmenu(){const t="rtl"===getComputedStyle(this.host).direction;return this.isConnected?J`
      <sl-popup
        ${Vs(this.popupRef)}
        placement=${t?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:J` <slot name="submenu" hidden></slot> `}},Hs=class extends jt{constructor(){super(...arguments),this.localize=new ro(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new Ke(this,"submenu"),this.submenuController=new Us(this,this.hasSlotController),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleMouseOver=t=>{this.focus(),t.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const t=this.getTextLabel();void 0!==this.cachedTextLabel?t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1})):this.cachedTextLabel=t}handleCheckedChange(){if(this.checked&&"checkbox"!==this.type)return this.checked=!1,void console.error('The checked attribute can only be used on menu items with type="checkbox"',this);"checkbox"===this.type?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){"checkbox"===this.type?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return function(t){if(!t)return"";const e=t.assignedNodes({flatten:!0});let o="";return[...e].forEach(t=>{t.nodeType===Node.TEXT_NODE&&(o+=t.textContent)}),o}(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const t="rtl"===this.localize.dir(),e=this.submenuController.isExpanded();return J`
      <div
        id="anchor"
        part="base"
        class=${re({"menu-item":!0,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":e})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!e}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${t?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?J` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};Hs.styles=[Wt,Ms],Hs.dependencies={"sl-icon":Jt,"sl-popup":es,"sl-spinner":ss},Ft([z("slot:not([name])")],Hs.prototype,"defaultSlot",2),Ft([z(".menu-item")],Hs.prototype,"menuItem",2),Ft([E()],Hs.prototype,"type",2),Ft([E({type:Boolean,reflect:!0})],Hs.prototype,"checked",2),Ft([E()],Hs.prototype,"value",2),Ft([E({type:Boolean,reflect:!0})],Hs.prototype,"loading",2),Ft([E({type:Boolean,reflect:!0})],Hs.prototype,"disabled",2),Ft([Ut("checked")],Hs.prototype,"handleCheckedChange",1),Ft([Ut("disabled")],Hs.prototype,"handleDisabledChange",1),Ft([Ut("type")],Hs.prototype,"handleTypeChange",1),Hs.define("sl-menu-item");var Ws=a`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,js=class extends jt{constructor(){super(...arguments),this.localize=new ro(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return J`
      <span
        part="base"
        class=${re({tag:!0,"tag--primary":"primary"===this.variant,"tag--success":"success"===this.variant,"tag--neutral":"neutral"===this.variant,"tag--warning":"warning"===this.variant,"tag--danger":"danger"===this.variant,"tag--text":"text"===this.variant,"tag--small":"small"===this.size,"tag--medium":"medium"===this.size,"tag--large":"large"===this.size,"tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?J`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </span>
    `}};js.styles=[Wt,Ws],js.dependencies={"sl-icon-button":ue},Ft([E({reflect:!0})],js.prototype,"variant",2),Ft([E({reflect:!0})],js.prototype,"size",2),Ft([E({type:Boolean,reflect:!0})],js.prototype,"pill",2),Ft([E({type:Boolean})],js.prototype,"removable",2);var qs=a`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;class Ks extends se{constructor(t){if(super(t),this.it=tt,t.type!==te)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===tt||null==t)return this._t=void 0,this.it=t;if(t===Q)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}Ks.directiveName="unsafeHTML",Ks.resultType=1;const Gs=ie(Ks);var Xs=class extends jt{constructor(){super(...arguments),this.formControlController=new vo(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ke(this,"help-text","label"),this.localize=new ro(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.valueHasChanged=!1,this.name="",this._value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=t=>J`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${e=>this.handleTagRemove(e,t)}
      >
        ${t.getTextLabel()}
      </sl-tag>
    `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,o=null!==e.closest(".select__clear"),i=null!==e.closest("sl-icon-button");if(!o&&!i){if("Escape"===t.key&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),"Enter"===t.key||" "===t.key&&""===this.typeToSelectString)return t.preventDefault(),t.stopImmediatePropagation(),this.open?void(this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))):void this.show();if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=this.getAllOptions(),o=e.indexOf(this.currentOption);let i=Math.max(0,o);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;"ArrowDown"===t.key?(i=o+1,i>e.length-1&&(i=0)):"ArrowUp"===t.key?(i=o-1,i<0&&(i=e.length-1)):"Home"===t.key?i=0:"End"===t.key&&(i=e.length-1),this.setCurrentOption(e[i])}if(t.key&&1===t.key.length||"Backspace"===t.key){const e=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if("Backspace"===t.key)return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),"Backspace"===t.key?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const t of e){if(t.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(t);break}}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}get value(){return this._value}set value(t){t=this.multiple?Array.isArray(t)?t:t.split(" "):Array.isArray(t)?t.join(" "):t,this._value!==t&&(this.valueHasChanged=!0,this._value=t)}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),setTimeout(()=>{this.handleDefaultSlotChange()}),this.open=!1}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),null==(t=this.closeWatcher)||t.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){const e=t.composedPath().some(t=>t instanceof Element&&"sl-icon-button"===t.tagName.toLowerCase());this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){"Tab"!==t.key&&(t.stopPropagation(),this.handleDocumentKeyDown(t))}handleClearClick(t){t.stopPropagation(),this.valueHasChanged=!0,""!==this.value&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")}))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const e=t.target.closest("sl-option"),o=this.value;e&&!e.disabled&&(this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.value!==o&&this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){customElements.get("sl-option")||customElements.whenDefined("sl-option").then(()=>this.handleDefaultSlotChange());const t=this.getAllOptions(),e=this.valueHasChanged?this.value:this.defaultValue,o=Array.isArray(e)?e:[e],i=[];t.forEach(t=>i.push(t.value)),this.setSelectedOptions(t.filter(t=>o.includes(t.value)))}handleTagRemove(t,e){t.stopPropagation(),this.valueHasChanged=!0,this.disabled||(this.toggleOptionSelection(e,!1),this.updateComplete.then(()=>{this.emit("sl-input"),this.emit("sl-change")}))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach(t=>{t.current=!1,t.tabIndex=-1}),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach(t=>t.selected=!1),o.length&&o.forEach(t=>t.selected=!0),this.selectionChanged()}toggleOptionSelection(t,e){t.selected=!0===e||!1===e?e:!t.selected,this.selectionChanged()}selectionChanged(){var t,e,o;const i=this.getAllOptions();this.selectedOptions=i.filter(t=>t.selected);const s=this.valueHasChanged;if(this.multiple)this.value=this.selectedOptions.map(t=>t.value),this.placeholder&&0===this.value.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{const i=this.selectedOptions[0];this.value=null!=(t=null==i?void 0:i.value)?t:"",this.displayLabel=null!=(o=null==(e=null==i?void 0:i.getTextLabel)?void 0:e.call(i))?o:""}this.valueHasChanged=s,this.updateComplete.then(()=>{this.formControlController.updateValidity()})}get tags(){return this.selectedOptions.map((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const o=this.getTag(t,e);return J`<div @sl-remove=${e=>this.handleTagRemove(e,t)}>
          ${"string"==typeof o?Gs(o):o}
        </div>`}return e===this.maxOptionsVisible?J`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`:J``})}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}attributeChangedCallback(t,e,o){if(super.attributeChangedCallback(t,e,o),"value"===t){const t=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=t}}handleValueChange(){if(!this.valueHasChanged){const t=this.valueHasChanged;this.value=this.defaultValue,this.valueHasChanged=t}const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter(t=>e.includes(t.value)))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await qe(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)});const{keyframes:t,options:e}=Ve(this,"select.show",{dir:this.localize.dir()});await He(this.popup.popup,t,e),this.currentOption&&xs(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await qe(this);const{keyframes:t,options:e}=Ve(this,"select.hide",{dir:this.localize.dir()});await He(this.popup.popup,t,e),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(!this.open&&!this.disabled)return this.open=!0,Ue(this,"sl-after-show");this.open=!1}async hide(){if(this.open&&!this.disabled)return this.open=!1,Ue(this,"sl-after-hide");this.open=!1}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,i=!!this.helpText||!!e,s=this.clearable&&!this.disabled&&this.value.length>0,r=this.placeholder&&this.value&&this.value.length<=0;return J`
      <div
        part="form-control"
        class=${re({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":o,"form-control--has-help-text":i})}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${re({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":r,"select--top":"top"===this.placement,"select--bottom":"bottom"===this.placement,"select--small":"small"===this.size,"select--medium":"medium"===this.size,"select--large":"large"===this.size})}
            placement=${this.placement}
            strategy=${this.hoist?"fixed":"absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple?J`<div part="tags" class="select__tags">${this.tags}</div>`:""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${s?J`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};Xs.styles=[Wt,uo,qs],Xs.dependencies={"sl-icon":Jt,"sl-popup":es,"sl-tag":js},Ft([z(".select")],Xs.prototype,"popup",2),Ft([z(".select__combobox")],Xs.prototype,"combobox",2),Ft([z(".select__display-input")],Xs.prototype,"displayInput",2),Ft([z(".select__value-input")],Xs.prototype,"valueInput",2),Ft([z(".select__listbox")],Xs.prototype,"listbox",2),Ft([A()],Xs.prototype,"hasFocus",2),Ft([A()],Xs.prototype,"displayLabel",2),Ft([A()],Xs.prototype,"currentOption",2),Ft([A()],Xs.prototype,"selectedOptions",2),Ft([A()],Xs.prototype,"valueHasChanged",2),Ft([E()],Xs.prototype,"name",2),Ft([A()],Xs.prototype,"value",1),Ft([E({attribute:"value"})],Xs.prototype,"defaultValue",2),Ft([E({reflect:!0})],Xs.prototype,"size",2),Ft([E()],Xs.prototype,"placeholder",2),Ft([E({type:Boolean,reflect:!0})],Xs.prototype,"multiple",2),Ft([E({attribute:"max-options-visible",type:Number})],Xs.prototype,"maxOptionsVisible",2),Ft([E({type:Boolean,reflect:!0})],Xs.prototype,"disabled",2),Ft([E({type:Boolean})],Xs.prototype,"clearable",2),Ft([E({type:Boolean,reflect:!0})],Xs.prototype,"open",2),Ft([E({type:Boolean})],Xs.prototype,"hoist",2),Ft([E({type:Boolean,reflect:!0})],Xs.prototype,"filled",2),Ft([E({type:Boolean,reflect:!0})],Xs.prototype,"pill",2),Ft([E()],Xs.prototype,"label",2),Ft([E({reflect:!0})],Xs.prototype,"placement",2),Ft([E({attribute:"help-text"})],Xs.prototype,"helpText",2),Ft([E({reflect:!0})],Xs.prototype,"form",2),Ft([E({type:Boolean,reflect:!0})],Xs.prototype,"required",2),Ft([E()],Xs.prototype,"getTag",2),Ft([Ut("disabled",{waitUntilFirstUpdate:!0})],Xs.prototype,"handleDisabledChange",1),Ft([Ut(["defaultValue","value"],{waitUntilFirstUpdate:!0})],Xs.prototype,"handleValueChange",1),Ft([Ut("open",{waitUntilFirstUpdate:!0})],Xs.prototype,"handleOpenChange",1),Ne("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),Ne("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}}),Xs.define("sl-select");var Ys=a`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`,Zs=class extends jt{constructor(){super(...arguments),this.localize=new ro(this),this.isInitialized=!1,this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){this.isInitialized?customElements.whenDefined("sl-select").then(()=>{const t=this.closest("sl-select");t&&t.handleDefaultSlotChange()}):this.isInitialized=!0}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){"string"!=typeof this.value&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const t=this.childNodes;let e="";return[...t].forEach(t=>{t.nodeType===Node.ELEMENT_NODE&&(t.hasAttribute("slot")||(e+=t.textContent)),t.nodeType===Node.TEXT_NODE&&(e+=t.textContent)}),e.trim()}render(){return J`
      <div
        part="base"
        class=${re({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};Zs.styles=[Wt,Ys],Zs.dependencies={"sl-icon":Jt},Ft([z(".option__label")],Zs.prototype,"defaultSlot",2),Ft([A()],Zs.prototype,"current",2),Ft([A()],Zs.prototype,"selected",2),Ft([A()],Zs.prototype,"hasHover",2),Ft([E({reflect:!0})],Zs.prototype,"value",2),Ft([E({type:Boolean,reflect:!0})],Zs.prototype,"disabled",2),Ft([Ut("disabled")],Zs.prototype,"handleDisabledChange",1),Ft([Ut("selected")],Zs.prototype,"handleSelectedChange",1),Ft([Ut("value")],Zs.prototype,"handleValueChange",1),Zs.define("sl-option");var Js=a`
  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
    --min: 0%;
    --max: 100%;

    display: grid;
  }

  .start,
  .end {
    overflow: hidden;
  }

  .divider {
    flex: 0 0 var(--divider-width);
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
    content: '';
    position: absolute;
    width: 100%;
    top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    height: var(--divider-hit-area);
  }

  @media (forced-colors: active) {
    .divider {
      outline: solid 1px transparent;
    }
  }
`;function Qs(t,e,o){const i=t=>Object.is(t,-0)?0:t;return i(t<e?e:t>o?o:t)}var tr=()=>null,er=class extends jt{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new ro(this),this.positionBeforeCollapsing=0,this.position=50,this.vertical=!1,this.disabled=!1,this.snapValue="",this.snapFunction=tr,this.snapThreshold=12}toSnapFunction(t){const e=t.split(" ");return({pos:o,size:i,snapThreshold:s,isRtl:r,vertical:n})=>{let a=o,l=Number.POSITIVE_INFINITY;return e.forEach(e=>{let c;if(e.startsWith("repeat(")){const e=t.substring(7,t.length-1),s=e.endsWith("%"),a=Number.parseFloat(e),l=s?i*(a/100):a;c=Math.round((r&&!n?i-o:o)/l)*l}else c=e.endsWith("%")?i*(Number.parseFloat(e)/100):Number.parseFloat(e);r&&!n&&(c=i-c);const d=Math.abs(o-c);d<=s&&d<l&&(a=c,l=d)}),a}}set snap(t){this.snapValue=null!=t?t:"",this.snapFunction=t?"string"==typeof t?this.toSnapFunction(t):t:tr}get snap(){return this.snapValue}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>this.handleResize(t)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.resizeObserver)||t.unobserve(this)}detectSize(){const{width:t,height:e}=this.getBoundingClientRect();this.size=this.vertical?e:t}percentageToPixels(t){return this.size*(t/100)}pixelsToPercentage(t){return t/this.size*100}handleDrag(t){const e="rtl"===this.localize.dir();this.disabled||(t.cancelable&&t.preventDefault(),function(t,e){function o(o){const i=t.getBoundingClientRect(),s=t.ownerDocument.defaultView,r=i.left+s.scrollX,n=i.top+s.scrollY,a=o.pageX-r,l=o.pageY-n;(null==e?void 0:e.onMove)&&e.onMove(a,l)}document.addEventListener("pointermove",o,{passive:!0}),document.addEventListener("pointerup",function t(){document.removeEventListener("pointermove",o),document.removeEventListener("pointerup",t),(null==e?void 0:e.onStop)&&e.onStop()}),(null==e?void 0:e.initialEvent)instanceof PointerEvent&&o(e.initialEvent)}(this,{onMove:(t,o)=>{var i;let s=this.vertical?o:t;"end"===this.primary&&(s=this.size-s),s=null!=(i=this.snapFunction({pos:s,size:this.size,snapThreshold:this.snapThreshold,isRtl:e,vertical:this.vertical}))?i:s,this.position=Qs(this.pixelsToPercentage(s),0,100)},initialEvent:t}))}handleKeyDown(t){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(t.key)){let e=this.position;const o=(t.shiftKey?10:1)*("end"===this.primary?-1:1);if(t.preventDefault(),("ArrowLeft"===t.key&&!this.vertical||"ArrowUp"===t.key&&this.vertical)&&(e-=o),("ArrowRight"===t.key&&!this.vertical||"ArrowDown"===t.key&&this.vertical)&&(e+=o),"Home"===t.key&&(e="end"===this.primary?100:0),"End"===t.key&&(e="end"===this.primary?0:100),"Enter"===t.key)if(this.isCollapsed)e=this.positionBeforeCollapsing,this.isCollapsed=!1;else{const t=this.position;e=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=t})}this.position=Qs(e,0,100)}}handleResize(t){const{width:e,height:o}=t[0].contentRect;this.size=this.vertical?o:e,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){const t=this.vertical?"gridTemplateRows":"gridTemplateColumns",e=this.vertical?"gridTemplateColumns":"gridTemplateRows",o="rtl"===this.localize.dir(),i=`\n      clamp(\n        0%,\n        clamp(\n          var(--min),\n          ${this.position}% - var(--divider-width) / 2,\n          var(--max)\n        ),\n        calc(100% - var(--divider-width))\n      )\n    `,s="auto";return"end"===this.primary?o&&!this.vertical?this.style[t]=`${i} var(--divider-width) ${s}`:this.style[t]=`${s} var(--divider-width) ${i}`:o&&!this.vertical?this.style[t]=`${s} var(--divider-width) ${i}`:this.style[t]=`${i} var(--divider-width) ${s}`,this.style[e]="",J`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${he(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};er.styles=[Wt,Js],Ft([z(".divider")],er.prototype,"divider",2),Ft([E({type:Number,reflect:!0})],er.prototype,"position",2),Ft([E({attribute:"position-in-pixels",type:Number})],er.prototype,"positionInPixels",2),Ft([E({type:Boolean,reflect:!0})],er.prototype,"vertical",2),Ft([E({type:Boolean,reflect:!0})],er.prototype,"disabled",2),Ft([E()],er.prototype,"primary",2),Ft([E({reflect:!0})],er.prototype,"snap",1),Ft([E({type:Number,attribute:"snap-threshold"})],er.prototype,"snapThreshold",2),Ft([Ut("position")],er.prototype,"handlePositionChange",1),Ft([Ut("positionInPixels")],er.prototype,"handlePositionInPixelsChange",1),Ft([Ut("vertical")],er.prototype,"handleVerticalChange",1),er.define("sl-split-panel");var or=a`
  :host {
    display: block;
  }

  :host(:focus-visible) {
    outline: 0px;
  }

  .radio {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .radio--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .radio--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .radio__checked-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 50%;
    background-color: var(--sl-input-background-color);
    color: transparent;
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked + focus */
  :host(:focus-visible) .radio__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When the control isn't checked, hide the circle for Windows High Contrast mode a11y */
  .radio:not(.radio--checked) svg circle {
    opacity: 0;
  }

  .radio__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }
`,ir=class extends jt{constructor(){super(),this.checked=!1,this.hasFocus=!1,this.size="medium",this.disabled=!1,this.handleBlur=()=>{this.hasFocus=!1,this.emit("sl-blur")},this.handleClick=()=>{this.disabled||(this.checked=!0)},this.handleFocus=()=>{this.hasFocus=!0,this.emit("sl-focus")},this.addEventListener("blur",this.handleBlur),this.addEventListener("click",this.handleClick),this.addEventListener("focus",this.handleFocus)}connectedCallback(){super.connectedCallback(),this.setInitialAttributes()}setInitialAttributes(){this.setAttribute("role","radio"),this.setAttribute("tabindex","-1"),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false"),this.setAttribute("tabindex",this.checked?"0":"-1")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return J`
      <span
        part="base"
        class=${re({radio:!0,"radio--checked":this.checked,"radio--disabled":this.disabled,"radio--focused":this.hasFocus,"radio--small":"small"===this.size,"radio--medium":"medium"===this.size,"radio--large":"large"===this.size})}
      >
        <span part="${"control"+(this.checked?" control--checked":"")}" class="radio__control">
          ${this.checked?J` <sl-icon part="checked-icon" class="radio__checked-icon" library="system" name="radio"></sl-icon> `:""}
        </span>

        <slot part="label" class="radio__label"></slot>
      </span>
    `}};ir.styles=[Wt,or],ir.dependencies={"sl-icon":Jt},Ft([A()],ir.prototype,"checked",2),Ft([A()],ir.prototype,"hasFocus",2),Ft([E()],ir.prototype,"value",2),Ft([E({reflect:!0})],ir.prototype,"size",2),Ft([E({type:Boolean,reflect:!0})],ir.prototype,"disabled",2),Ft([Ut("checked")],ir.prototype,"handleCheckedChange",1),Ft([Ut("disabled",{waitUntilFirstUpdate:!0})],ir.prototype,"handleDisabledChange",1),ir.define("sl-radio");var sr=a`
  :host {
    display: block;
  }

  .form-control {
    position: relative;
    border: none;
    padding: 0;
    margin: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`,rr=class extends jt{constructor(){super(...arguments),this.formControlController=new vo(this),this.hasSlotController=new Ke(this,"help-text","label"),this.customValidityMessage="",this.hasButtonGroup=!1,this.errorMessage="",this.defaultValue="",this.label="",this.helpText="",this.name="option",this.value="",this.size="medium",this.form="",this.required=!1}get validity(){const t=this.required&&!this.value;return""!==this.customValidityMessage?_o:t?wo:yo}get validationMessage(){const t=this.required&&!this.value;return""!==this.customValidityMessage?this.customValidityMessage:t?this.validationInput.validationMessage:""}connectedCallback(){super.connectedCallback(),this.defaultValue=this.value}firstUpdated(){this.formControlController.updateValidity()}getAllRadios(){return[...this.querySelectorAll("sl-radio, sl-radio-button")]}handleRadioClick(t){const e=t.target.closest("sl-radio, sl-radio-button"),o=this.getAllRadios(),i=this.value;e&&!e.disabled&&(this.value=e.value,o.forEach(t=>t.checked=t===e),this.value!==i&&(this.emit("sl-change"),this.emit("sl-input")))}handleKeyDown(t){var e;if(!["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(t.key))return;const o=this.getAllRadios().filter(t=>!t.disabled),i=null!=(e=o.find(t=>t.checked))?e:o[0],s=" "===t.key?0:["ArrowUp","ArrowLeft"].includes(t.key)?-1:1,r=this.value;let n=o.indexOf(i)+s;n<0&&(n=o.length-1),n>o.length-1&&(n=0),this.getAllRadios().forEach(t=>{t.checked=!1,this.hasButtonGroup||t.setAttribute("tabindex","-1")}),this.value=o[n].value,o[n].checked=!0,this.hasButtonGroup?o[n].shadowRoot.querySelector("button").focus():(o[n].setAttribute("tabindex","0"),o[n].focus()),this.value!==r&&(this.emit("sl-change"),this.emit("sl-input")),t.preventDefault()}handleLabelClick(){this.focus()}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}async syncRadioElements(){var t,e;const o=this.getAllRadios();if(await Promise.all(o.map(async t=>{await t.updateComplete,t.checked=t.value===this.value,t.size=this.size})),this.hasButtonGroup=o.some(t=>"sl-radio-button"===t.tagName.toLowerCase()),o.length>0&&!o.some(t=>t.checked))if(this.hasButtonGroup){const e=null==(t=o[0].shadowRoot)?void 0:t.querySelector("button");e&&e.setAttribute("tabindex","0")}else o[0].setAttribute("tabindex","0");if(this.hasButtonGroup){const t=null==(e=this.shadowRoot)?void 0:e.querySelector("sl-button-group");t&&(t.disableRole=!0)}}syncRadios(){customElements.get("sl-radio")&&customElements.get("sl-radio-button")?this.syncRadioElements():(customElements.get("sl-radio")?this.syncRadioElements():customElements.whenDefined("sl-radio").then(()=>this.syncRadios()),customElements.get("sl-radio-button")?this.syncRadioElements():customElements.whenDefined("sl-radio-button").then(()=>this.syncRadios()))}updateCheckedRadio(){this.getAllRadios().forEach(t=>t.checked=t.value===this.value),this.formControlController.setValidity(this.validity.valid)}handleSizeChange(){this.syncRadios()}handleValueChange(){this.hasUpdated&&this.updateCheckedRadio()}checkValidity(){const t=this.required&&!this.value,e=""!==this.customValidityMessage;return!t&&!e||(this.formControlController.emitInvalidEvent(),!1)}getForm(){return this.formControlController.getForm()}reportValidity(){const t=this.validity.valid;return this.errorMessage=this.customValidityMessage||t?"":this.validationInput.validationMessage,this.formControlController.setValidity(t),this.validationInput.hidden=!0,clearTimeout(this.validationTimeout),t||(this.validationInput.hidden=!1,this.validationInput.reportValidity(),this.validationTimeout=setTimeout(()=>this.validationInput.hidden=!0,1e4)),t}setCustomValidity(t=""){this.customValidityMessage=t,this.errorMessage=t,this.validationInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){const e=this.getAllRadios(),o=e.find(t=>t.checked),i=e.find(t=>!t.disabled),s=o||i;s&&s.focus(t)}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,i=!!this.helpText||!!e,s=J`
      <slot @slotchange=${this.syncRadios} @click=${this.handleRadioClick} @keydown=${this.handleKeyDown}></slot>
    `;return J`
      <fieldset
        part="form-control"
        class=${re({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--radio-group":!0,"form-control--has-label":o,"form-control--has-help-text":i})}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
                @invalid=${this.handleInvalid}
              />
            </label>
          </div>

          ${this.hasButtonGroup?J`
                <sl-button-group part="button-group" exportparts="base:button-group__base" role="presentation">
                  ${s}
                </sl-button-group>
              `:s}
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </fieldset>
    `}};rr.styles=[Wt,uo,sr],rr.dependencies={"sl-button-group":ls},Ft([z("slot:not([name])")],rr.prototype,"defaultSlot",2),Ft([z(".radio-group__validation-input")],rr.prototype,"validationInput",2),Ft([A()],rr.prototype,"hasButtonGroup",2),Ft([A()],rr.prototype,"errorMessage",2),Ft([A()],rr.prototype,"defaultValue",2),Ft([E()],rr.prototype,"label",2),Ft([E({attribute:"help-text"})],rr.prototype,"helpText",2),Ft([E()],rr.prototype,"name",2),Ft([E({reflect:!0})],rr.prototype,"value",2),Ft([E({reflect:!0})],rr.prototype,"size",2),Ft([E({reflect:!0})],rr.prototype,"form",2),Ft([E({type:Boolean,reflect:!0})],rr.prototype,"required",2),Ft([Ut("size",{waitUntilFirstUpdate:!0})],rr.prototype,"handleSizeChange",1),Ft([Ut("value")],rr.prototype,"handleValueChange",1),rr.define("sl-radio-group");var nr=a`
  :host {
    --thumb-size: 20px;
    --tooltip-offset: 10px;
    --track-color-active: var(--sl-color-neutral-200);
    --track-color-inactive: var(--sl-color-neutral-200);
    --track-active-offset: 0%;
    --track-height: 6px;

    display: block;
  }

  .range {
    position: relative;
  }

  .range__control {
    --percent: 0%;
    -webkit-appearance: none;
    border-radius: 3px;
    width: 100%;
    height: var(--track-height);
    background: transparent;
    line-height: var(--sl-input-height-medium);
    vertical-align: middle;
    margin: 0;

    background-image: linear-gradient(
      to right,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  .range--rtl .range__control {
    background-image: linear-gradient(
      to left,
      var(--track-color-inactive) 0%,
      var(--track-color-inactive) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) min(var(--percent), var(--track-active-offset)),
      var(--track-color-active) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) max(var(--percent), var(--track-active-offset)),
      var(--track-color-inactive) 100%
    );
  }

  /* Webkit */
  .range__control::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    border-radius: 3px;
    border: none;
  }

  .range__control::-webkit-slider-thumb {
    border: none;
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border: solid var(--sl-input-border-width) var(--sl-color-primary-600);
    -webkit-appearance: none;
    margin-top: calc(var(--thumb-size) / -2 + var(--track-height) / 2);
    cursor: pointer;
  }

  .range__control:enabled::-webkit-slider-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-webkit-slider-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-webkit-slider-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* Firefox */
  .range__control::-moz-focus-outer {
    border: 0;
  }

  .range__control::-moz-range-progress {
    background-color: var(--track-color-active);
    border-radius: 3px;
    height: var(--track-height);
  }

  .range__control::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    background-color: var(--track-color-inactive);
    border-radius: 3px;
    border: none;
  }

  .range__control::-moz-range-thumb {
    border: none;
    height: var(--thumb-size);
    width: var(--thumb-size);
    border-radius: 50%;
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
    cursor: pointer;
  }

  .range__control:enabled::-moz-range-thumb:hover {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
  }

  .range__control:enabled:focus-visible::-moz-range-thumb {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .range__control:enabled::-moz-range-thumb:active {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    cursor: grabbing;
  }

  /* States */
  .range__control:focus-visible {
    outline: none;
  }

  .range__control:disabled {
    opacity: 0.5;
  }

  .range__control:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }

  .range__control:disabled::-moz-range-thumb {
    cursor: not-allowed;
  }

  /* Tooltip output */
  .range__tooltip {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    left: 0;
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    opacity: 0;
    padding: var(--sl-tooltip-padding);
    transition: var(--sl-transition-fast) opacity;
    pointer-events: none;
  }

  .range__tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    left: 50%;
    translate: calc(-1 * var(--sl-tooltip-arrow-size));
  }

  .range--tooltip-visible .range__tooltip {
    opacity: 1;
  }

  /* Tooltip on top */
  .range--tooltip-top .range__tooltip {
    top: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-top .range__tooltip:after {
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    top: 100%;
  }

  /* Tooltip on bottom */
  .range--tooltip-bottom .range__tooltip {
    bottom: calc(-1 * var(--thumb-size) - var(--tooltip-offset));
  }

  .range--tooltip-bottom .range__tooltip:after {
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
    bottom: 100%;
  }

  @media (forced-colors: active) {
    .range__control,
    .range__tooltip {
      border: solid 1px transparent;
    }

    .range__control::-webkit-slider-thumb {
      border: solid 1px transparent;
    }

    .range__control::-moz-range-thumb {
      border: solid 1px transparent;
    }

    .range__tooltip:after {
      display: none;
    }
  }
`,ar=class extends jt{constructor(){super(...arguments),this.formControlController=new vo(this),this.hasSlotController=new Ke(this,"help-text","label"),this.localize=new ro(this),this.hasFocus=!1,this.hasTooltip=!1,this.title="",this.name="",this.value=0,this.label="",this.helpText="",this.disabled=!1,this.min=0,this.max=100,this.step=1,this.tooltip="top",this.tooltipFormatter=t=>t.toString(),this.form="",this.defaultValue=0}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>this.syncRange()),this.value<this.min&&(this.value=this.min),this.value>this.max&&(this.value=this.max),this.updateComplete.then(()=>{this.syncRange(),this.resizeObserver.observe(this.input)})}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.resizeObserver)||t.unobserve(this.input)}handleChange(){this.emit("sl-change")}handleInput(){this.value=parseFloat(this.input.value),this.emit("sl-input"),this.syncRange()}handleBlur(){this.hasFocus=!1,this.hasTooltip=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.hasTooltip=!0,this.emit("sl-focus")}handleThumbDragStart(){this.hasTooltip=!0}handleThumbDragEnd(){this.hasTooltip=!1}syncProgress(t){this.input.style.setProperty("--percent",100*t+"%")}syncTooltip(t){if(null!==this.output){const e=this.input.offsetWidth,o=this.output.offsetWidth,i=getComputedStyle(this.input).getPropertyValue("--thumb-size"),s=e*t;if("rtl"===this.localize.dir()){const r=`${e-s}px + ${t} * ${i}`;this.output.style.translate=`calc((${r} - ${o/2}px - ${i} / 2))`}else{const e=`${s}px - ${t} * ${i}`;this.output.style.translate=`calc(${e} - ${o/2}px + ${i} / 2)`}}}handleValueChange(){this.formControlController.updateValidity(),this.input.value=this.value.toString(),this.value=parseFloat(this.input.value),this.syncRange()}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}syncRange(){const t=Math.max(0,(this.value-this.min)/(this.max-this.min));this.syncProgress(t),"none"!==this.tooltip&&this.hasTooltip&&this.updateComplete.then(()=>this.syncTooltip(t))}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}focus(t){this.input.focus(t)}blur(){this.input.blur()}stepUp(){this.input.stepUp(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}stepDown(){this.input.stepDown(),this.value!==Number(this.input.value)&&(this.value=Number(this.input.value))}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,i=!!this.helpText||!!e;return J`
      <div
        part="form-control"
        class=${re({"form-control":!0,"form-control--medium":!0,"form-control--has-label":o,"form-control--has-help-text":i})}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${o?"false":"true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${re({range:!0,"range--disabled":this.disabled,"range--focused":this.hasFocus,"range--rtl":"rtl"===this.localize.dir(),"range--tooltip-visible":this.hasTooltip,"range--tooltip-top":"top"===this.tooltip,"range--tooltip-bottom":"bottom"===this.tooltip})}
            @mousedown=${this.handleThumbDragStart}
            @mouseup=${this.handleThumbDragEnd}
            @touchstart=${this.handleThumbDragStart}
            @touchend=${this.handleThumbDragEnd}
          >
            <input
              part="input"
              id="input"
              class="range__control"
              title=${this.title}
              type="range"
              name=${he(this.name)}
              ?disabled=${this.disabled}
              min=${he(this.min)}
              max=${he(this.max)}
              step=${he(this.step)}
              .value=${xo(this.value.toString())}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @focus=${this.handleFocus}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @blur=${this.handleBlur}
            />
            ${"none"===this.tooltip||this.disabled?"":J`
                  <output part="tooltip" class="range__tooltip">
                    ${"function"==typeof this.tooltipFormatter?this.tooltipFormatter(this.value):this.value}
                  </output>
                `}
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${i?"false":"true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};ar.styles=[Wt,uo,nr],Ft([z(".range__control")],ar.prototype,"input",2),Ft([z(".range__tooltip")],ar.prototype,"output",2),Ft([A()],ar.prototype,"hasFocus",2),Ft([A()],ar.prototype,"hasTooltip",2),Ft([E()],ar.prototype,"title",2),Ft([E()],ar.prototype,"name",2),Ft([E({type:Number})],ar.prototype,"value",2),Ft([E()],ar.prototype,"label",2),Ft([E({attribute:"help-text"})],ar.prototype,"helpText",2),Ft([E({type:Boolean,reflect:!0})],ar.prototype,"disabled",2),Ft([E({type:Number})],ar.prototype,"min",2),Ft([E({type:Number})],ar.prototype,"max",2),Ft([E({type:Number})],ar.prototype,"step",2),Ft([E()],ar.prototype,"tooltip",2),Ft([E({attribute:!1})],ar.prototype,"tooltipFormatter",2),Ft([E({reflect:!0})],ar.prototype,"form",2),Ft([ho()],ar.prototype,"defaultValue",2),Ft([function(t){return(e,o)=>{const i="function"==typeof e?e:e[o];Object.assign(i,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */({passive:!0})],ar.prototype,"handleThumbDragStart",1),Ft([Ut("value",{waitUntilFirstUpdate:!0})],ar.prototype,"handleValueChange",1),Ft([Ut("disabled",{waitUntilFirstUpdate:!0})],ar.prototype,"handleDisabledChange",1),Ft([Ut("hasTooltip",{waitUntilFirstUpdate:!0})],ar.prototype,"syncRange",1),ar.define("sl-range");
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
const lr=import.meta.url;function cr(t){t.matches&&document.documentElement.classList.add("sl-theme-dark"),t.onchange=t=>{t.matches?document.documentElement.classList.add("sl-theme-dark"):document.documentElement.classList.remove("sl-theme-dark")}}wt(lr.slice(0,lr.lastIndexOf("/")+1)),async function(){if("serviceWorker"in navigator)try{const t=document.getElementById("home-button").href;await navigator.serviceWorker.register(t+"sw.js",{scope:"/"})}catch(t){console.error(`Service worker registration failed with ${t}`)}}(),function(){const t=document.getElementById("nav-toggle"),e=document.getElementById("nav-drawer"),o=document.getElementById("content");t&&e&&o&&(Number(localStorage.getItem("nav-open"))?(e.show(),o.classList.add("nav-open")):(e.hide(),o.classList.remove("nav-open")),t.addEventListener("click",function(){e.open?(e.hide(),o.classList.remove("nav-open"),localStorage.setItem("nav-open","0")):(e.show(),o.classList.add("nav-open"),localStorage.setItem("nav-open","1"))}))}(),function(){const t=document.getElementById("color-mode-toggle");if(!t)return;const e=localStorage.getItem("color-mode")??"circle-half",o=window.matchMedia("(prefers-color-scheme: dark)");switch(e){case"circle-half":cr(o);break;case"moon":document.documentElement.classList.add("sl-theme-dark");break;case"sun":document.documentElement.classList.remove("sl-theme-dark")}t.name=e,t.addEventListener("click",function(){switch(t.name){case"circle-half":{document.documentElement.classList.add("sl-theme-dark");const e="moon";t.name=e,localStorage.setItem("color-mode",e),o.onchange=null;break}case"moon":{document.documentElement.classList.remove("sl-theme-dark");const e="sun";t.name=e,localStorage.setItem("color-mode",e),o.onchange=null;break}case"sun":{document.documentElement.classList.remove("sl-theme-dark");const e="circle-half";t.name=e,localStorage.setItem("color-mode",e),cr(o);break}}})}(),function(){const t=document.getElementsByClassName("form-submit-button");Array.from(t).forEach(t=>{const e=t.parentElement;"FORM"===e?.tagName&&t.addEventListener("click",function(){e.checkValidity()&&(t.disabled=!0,t.loading=!0)})})}();
// @license-end
//# sourceMappingURL=main.js.map
