function t(t,e,o,i){var s,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,o,r):s(e,o))||r);return n>3&&r&&Object.defineProperty(e,o,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,o=globalThis,i=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1]),t[0]);return new r(o,t,s)},l=(t,e)=>{if(i)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of e){const e=document.createElement("style"),s=o.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}},c=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:d,defineProperty:h,getOwnPropertyDescriptor:u,getOwnPropertyNames:p,getOwnPropertySymbols:m,getPrototypeOf:f}=Object,b=globalThis,g=b.trustedTypes,v=g?g.emptyScript:"",y=b.reactiveElementPolyfillSupport,w=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},x=(t,e)=>!d(t,e),k={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=k){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:s}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return i?.call(this)},set(e){const n=i?.call(this);s.call(this,e),this.requestUpdate(t,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??k}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,e=[...p(t),...m(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$EC(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const s=(void 0!==o.converter?.toAttribute?o.converter:_).toAttribute(e,o.type);this._$Em=t,null==s?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=i,this[i]=s.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,o){if(void 0!==t){if(o??=this.constructor.getPropertyOptions(t),!(o.hasChanged??x)(this[t],e))return;this.P(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,o){this._$AL.has(t)||this._$AL.set(t,e),!0===o.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t)!0!==o.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[w("elementProperties")]=new Map,$[w("finalized")]=new Map,y?.({ReactiveElement:$}),(b.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:x},E=(t=C,e,o)=>{const{kind:i,metadata:s}=o;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const s=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,s,t)},init(e){return void 0!==e&&this.P(i,void 0,t),e}}}if("setter"===i){const{name:i}=o;return function(o){const s=this[i];e.call(this,o),this.requestUpdate(i,s,t)}}throw Error("Unsupported decorator location: "+i)};function S(t){return(e,o)=>"object"==typeof o?E(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function A(t){return S({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,o),o)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function z(t,e){return(o,i,s)=>{const n=e=>e.renderRoot?.querySelector(t)??null;if(e){const{get:t,set:e}="object"==typeof i?o:s??(()=>{const t=Symbol();return{get(){return this[t]},set(e){this[t]=e}}})();return L(o,i,{get(){let o=t.call(this);return void 0===o&&(o=n(this),(null!==o||this.hasUpdated)&&e.call(this,o)),o}})}return L(o,i,{get(){return n(this)}})}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=Symbol();let O=class{get taskComplete(){return this.t||(1===this.status?this.t=new Promise(((t,e)=>{this.i=t,this.o=e})):3===this.status?this.t=Promise.reject(this.h):this.t=Promise.resolve(this.l)),this.t}constructor(t,e,o){this.u=0,this.status=0,(this.p=t).addController(this);const i="object"==typeof e?e:{task:e,args:o};this._=i.task,this.v=i.args,this.j=i.argsEqual??P,this.m=i.onComplete,this.g=i.onError,this.autoRun=i.autoRun??!0,"initialValue"in i&&(this.l=i.initialValue,this.status=2,this.k=this.A?.())}hostUpdate(){!0===this.autoRun&&this.O()}hostUpdated(){"afterUpdate"===this.autoRun&&this.O()}A(){if(void 0===this.v)return;const t=this.v();if(!Array.isArray(t))throw Error("The args function must return an array");return t}async O(){const t=this.A(),e=this.k;this.k=t,t===e||void 0===t||void 0!==e&&this.j(e,t)||await this.run(t)}async run(t){let e,o;t??=this.A(),this.k=t,1===this.status?this.T?.abort():(this.t=void 0,this.i=void 0,this.o=void 0),this.status=1,"afterUpdate"===this.autoRun?queueMicrotask((()=>this.p.requestUpdate())):this.p.requestUpdate();const i=++this.u;this.T=new AbortController;let s=!1;try{e=await this._(t,{signal:this.T.signal})}catch(t){s=!0,o=t}if(this.u===i){if(e===T)this.status=0;else{if(!1===s){try{this.m?.(e)}catch{}this.status=2,this.i?.(e)}else{try{this.g?.(o)}catch{}this.status=3,this.o?.(o)}this.l=e,this.h=o}this.p.requestUpdate()}}abort(t){1===this.status&&this.T?.abort(t)}get value(){return this.l}get error(){return this.h}render(t){switch(this.status){case 0:return t.initial?.();case 1:return t.pending?.();case 2:return t.complete?.(this.value);case 3:return t.error?.(this.error);default:throw Error("Unexpected status: "+this.status)}}};const P=(t,e)=>t===e||t.length===e.length&&t.every(((t,o)=>!x(t,e[o])))
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,M=globalThis,D=M.trustedTypes,B=D?D.createPolicy("lit-html",{createHTML:t=>t}):void 0,R="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,F="?"+I,N=`<${F}>`,U=document,V=()=>U.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,W=Array.isArray,j="[ \t\n\f\r]",q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,Y=/>/g,X=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Z=/'/g,J=/"/g,G=/^(?:script|style|textarea|title)$/i,Q=(t=>(e,...o)=>({_$litType$:t,strings:e,values:o}))(1),tt=Symbol.for("lit-noChange"),et=Symbol.for("lit-nothing"),ot=new WeakMap,it=U.createTreeWalker(U,129);function st(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==B?B.createHTML(e):e}const nt=(t,e)=>{const o=t.length-1,i=[];let s,n=2===e?"<svg>":"",r=q;for(let e=0;e<o;e++){const o=t[e];let a,l,c=-1,d=0;for(;d<o.length&&(r.lastIndex=d,l=r.exec(o),null!==l);)d=r.lastIndex,r===q?"!--"===l[1]?r=K:void 0!==l[1]?r=Y:void 0!==l[2]?(G.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=X):void 0!==l[3]&&(r=X):r===X?">"===l[0]?(r=s??q,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?X:'"'===l[3]?J:Z):r===J||r===Z?r=X:r===K||r===Y?r=q:(r=X,s=void 0);const h=r===X&&t[e+1].startsWith("/>")?" ":"";n+=r===q?o+N:c>=0?(i.push(a),o.slice(0,c)+R+o.slice(c)+I+h):o+I+(-2===c?e:h)}return[st(t,n+(t[o]||"<?>")+(2===e?"</svg>":"")),i]};class rt{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[l,c]=nt(t,e);if(this.el=rt.createElement(l,o),it.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=it.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(R)){const e=c[n++],o=i.getAttribute(t).split(I),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:o,ctor:"."===r[1]?ht:"?"===r[1]?ut:"@"===r[1]?pt:dt}),i.removeAttribute(t)}else t.startsWith(I)&&(a.push({type:6,index:s}),i.removeAttribute(t));if(G.test(i.tagName)){const t=i.textContent.split(I),e=t.length-1;if(e>0){i.textContent=D?D.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],V()),it.nextNode(),a.push({type:2,index:++s});i.append(t[e],V())}}}else if(8===i.nodeType)if(i.data===F)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=i.data.indexOf(I,t+1));)a.push({type:7,index:s}),t+=I.length-1}s++}}static createElement(t,e){const o=U.createElement("template");return o.innerHTML=t,o}}function at(t,e,o=t,i){if(e===tt)return e;let s=void 0!==i?o._$Co?.[i]:o._$Cl;const n=H(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=s:o._$Cl=s),void 0!==s&&(e=at(t,s._$AS(t,e.values),s,i)),e}class lt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);it.currentNode=i;let s=it.nextNode(),n=0,r=0,a=o[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new ct(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new mt(s,this,t)),this._$AV.push(e),a=o[++r]}n!==a?.index&&(s=it.nextNode(),n++)}return it.currentNode=U,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class ct{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=et,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=at(this,t,e),H(t)?t===et||null==t||""===t?(this._$AH!==et&&this._$AR(),this._$AH=et):t!==this._$AH&&t!==tt&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>W(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}S(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}_(t){this._$AH!==et&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=rt.createElement(st(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new lt(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=ot.get(t.strings);return void 0===e&&ot.set(t.strings,e=new rt(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const s of t)i===e.length?e.push(o=new ct(this.S(V()),this.S(V()),this,this.options)):o=e[i],o._$AI(s),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class dt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,s){this.type=1,this._$AH=et,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=et}_$AI(t,e=this,o,i){const s=this.strings;let n=!1;if(void 0===s)t=at(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==tt,n&&(this._$AH=t);else{const i=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=at(this,i[o+r],e,r),a===tt&&(a=this._$AH[r]),n||=!H(a)||a!==this._$AH[r],a===et?t=et:t!==et&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===et?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ht extends dt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===et?void 0:t}}class ut extends dt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==et)}}class pt extends dt{constructor(t,e,o,i,s){super(t,e,o,i,s),this.type=5}_$AI(t,e=this){if((t=at(this,t,e,0)??et)===tt)return;const o=this._$AH,i=t===et&&o!==et||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==et&&(o===et||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class mt{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){at(this,t)}}const ft=M.litHtmlPolyfillSupport;ft?.(rt,ct),(M.litHtmlVersions??=[]).push("3.1.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let bt=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let s=i._$litPart$;if(void 0===s){const t=o?.renderBefore??null;i._$litPart$=s=new ct(e.insertBefore(V(),t),t,void 0,o??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return tt}};bt._$litElement$=!0,bt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:bt});const gt=globalThis.litElementPolyfillSupport;gt?.({LitElement:bt}),(globalThis.litElementVersions??=[]).push("4.0.5");
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
const vt=/^(?:(?<hours>\d+):)??(?:(?<minutes>\d+):)??(?<seconds>\d+)(?<fraction>\.\d+)?$/;let yt=class extends bt{static{this.styles=a`
    .epub-overlay-edit-container {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: var(--sl-color-neutral-100);
      font-size: var(--sl-font-size-large);
      writing-mode: horizontal-tb;
    }

    .vertical-space {
      height: var(--sl-spacing-3x-large);
    }

    sl-input {
      width: 11ch;
    }
  `}validateInput(t){this.revertButton.disabled=!1;const e=t.target;e.value.match(vt)?e.setCustomValidity(""):e.setCustomValidity("Must be a SMIL clock value"),this.commitButton.disabled=!e.reportValidity()}restoreBeginOnOverlap(t){const e=this.elems?.prev?.getAttribute("id")??"",o=this.idParMap?.get(e);if(!o)return;const i=t.target;wt(i.value)<wt(o.clipEnd)&&(i.value=o.clipEnd)}restoreEndOnOverlap(t){const e=this.elems?.next?.getAttribute("id")??"",o=this.idParMap?.get(e);if(!o)return;const i=t.target;wt(i.value)>wt(o.clipBegin)&&(i.value=o.clipBegin)}playBuffer(){const t=this.elems?.selected.getAttribute("id")??"",e=this.idParMap?.get(t);if(!e)return;const o=this.audioSrcMap?.get(e.audioSrc),i=wt(this.beginInput.value),s=wt(this.endInput.value);this.audioContext&&o&&xt(this.audioContext,o,i,s)}disableButtons(){this.commitButton.disabled=!0,this.revertButton.disabled=!0,this.deleteButton.disabled=!0}enableButtons(){this.commitButton.disabled=!1,this.revertButton.disabled=!1,this.deleteButton.disabled=!1}commit(){const t=kt("csrftoken"),e=this.elems?.selected.getAttribute("id")??"",o=this.idParMap?.get(e);if(!o||!t)return;const i={...o,clipBegin:this.beginInput.value,clipEnd:this.endInput.value};this.disableButtons(),fetch(window.location.href,{method:"PUT",headers:{"Content-Type":"application/json",Accept:"application/json, text/html","X-CSRFToken":t},mode:"same-origin",body:JSON.stringify(i)}).then((async t=>{if(t.ok){const e=await t.json();this.beginInput.value=e.new.clipBegin,this.endInput.value=e.new.clipEnd,o.clipBegin=e.new.clipBegin,o.clipEnd=e.new.clipEnd}else if(t.headers.get("content-type")?.startsWith("text/html"))Ct(await t.text(),`Update failed for ID: ${e}`),this.deleteButton.disabled=!1;else{$t(`Server error: ${(await t.json()).message}`,"danger","exclamation-octagon",5e3),this.enableButtons()}})).catch((t=>{$t(`Error: ${t}`,"danger","exclamation-octagon",5e3),this.enableButtons()}))}revert(){const t=this.elems?.selected.getAttribute("id")??"",e=this.idParMap?.get(t);this.beginInput.value=e?.clipBegin??"",this.endInput.value=e?.clipEnd??"",this.revertButton.disabled=!0,this.commitButton.disabled=!0}delete(){const t=kt("csrftoken"),e=this.elems?.selected.getAttribute("id")??"",o=this.idParMap?.get(e);if(!o||!t)return;const i={...o};this.deleteButton.disabled=!0,fetch(window.location.href,{method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json, text/html","X-CSRFToken":t},mode:"same-origin",body:JSON.stringify(i)}).then((async t=>{if(t.ok){const e=await t.json();$t(`Deleted: ${e.message}`,"primary","info-circle",5e3),this.dispatchEvent(new CustomEvent("deleted",{detail:{old:e.old,elems:this.elems}}))}else if(t.headers.get("content-type")?.startsWith("text/html"))Ct(await t.text(),`Delete failed for ID: ${e}`),this.deleteButton.disabled=!1;else{$t(`Server error: ${(await t.json()).message}`,"danger","exclamation-octagon",5e3),this.deleteButton.disabled=!1}})).catch((t=>{$t(`Error: ${t}`,"danger","exclamation-octagon",5e3),this.deleteButton.disabled=!1}))}create(){const t=kt("csrftoken"),e=this.createSelect.value,o=this.audioSrcMap?.get(e);if(!t||!this.elems?.textSrcNew||!o)return;const i=this.elems.prev?.getAttribute("id")??"",s=this.idParMap?.get(i)?.clipEnd,n=this.elems.next?.getAttribute("id")??"",r=this.idParMap?.get(n)?.clipBegin,a=this.elems.textSrcNew,l={parId:"",textSrc:a,audioSrc:e,clipBegin:s??"0:00:00.000",clipEnd:r??_t(o.duration)};this.createButton.disabled=!0,fetch(window.location.href,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json, text/html","X-CSRFToken":t},mode:"same-origin",body:JSON.stringify(l)}).then((async t=>{if(t.ok){const e=await t.json();$t(`Created: ${e.message}`,"primary","info-circle",5e3),this.dispatchEvent(new CustomEvent("created",{detail:{new:e.new,elems:this.elems}}))}else if(t.headers.get("content-type")?.startsWith("text/html"))Ct(await t.text(),`Create failed for ID: ${a}`),this.deleteButton.disabled=!1;else{$t(`Server error: ${(await t.json()).message}`,"danger","exclamation-octagon",5e3),this.createButton.disabled=!1}})).catch((t=>{$t(`Error: ${t}`,"danger","exclamation-octagon",5e3),this.createButton.disabled=!1}))}render(){if(this.elems?.textSrcNew)return Q` <div class="vertical-space"></div>
        <div class="epub-overlay-edit-container">
          <sl-tooltip placement="top" content="${this.elems.textSrcNew}">
            <sl-input pill disabled value="${this.elems.textSrcNew}" size="small"></sl-input>
          </sl-tooltip>
          <sl-select id="create-select" pill size="small" placement="top" value="${this.elems.audioSrcNew}">
            ${Array.from(this.audioSrcMap.keys()).map((t=>Q` <sl-option value="${t}">${t}</sl-option>`))}
          </sl-select>
          <sl-icon-button
            id="create-button"
            name="check-circle"
            label="create new"
            @click="${this.create}"
          ></sl-icon-button>
        </div>`;{const t=!this.elems,e=this.elems?.selected.getAttribute("id")??"",o=this.idParMap?.get(e),i=o?.clipBegin??"",s=o?.clipEnd??"";return Q`
        <div class="vertical-space"></div>
        </div>
        <div class="epub-overlay-edit-container">
          <sl-icon-button ?disabled=${t} name="play-circle" label="play current time selection"
                          @click="${this.playBuffer}"></sl-icon-button>
          <sl-input id="begin-input" ?disabled=${t} value="${i}" @sl-input="${this.validateInput}"
                    @sl-change="${this.restoreBeginOnOverlap}" size="small" placeholder="Begin" pill></sl-input>
          <sl-input id="end-input" ?disabled=${t} value="${s}" @sl-input="${this.validateInput}"
                    @sl-change="${this.restoreEndOnOverlap}" size="small" placeholder="End" pill></sl-input>
          <sl-icon-button id="commit-button" disabled name="check-circle" label="commit change"
                          @click="${this.commit}"></sl-icon-button>
          <sl-icon-button id="revert-button" disabled name="arrow-left-circle" label="revert change"
                          @click="${this.revert}"></sl-icon-button>
          <sl-icon-button id="delete-button" name="trash" label="delete overlay"
                          @click="${this.delete}"></sl-icon-button>
        </div>`}}};function wt(t){const e=t.trim().match(vt);if(!e?.groups)throw new Error(`Invalid clock value: ${t}`);const o=e.groups;let i=parseInt(o.seconds,10);return o.minutes&&(i+=60*parseInt(o.minutes,10)),o.hours&&(i+=3600*parseInt(o.hours,10)),o.fraction&&(i+=parseFloat(o.fraction)),i}function _t(t){return`${Math.floor(t/3600)}:${Math.floor(t%3600/60)}:${Math.floor(t%60)}${(t%1).toFixed(3).slice(1)}`}function xt(t,e,o,i){const s=t.createBufferSource();s.buffer=e,s.connect(t.destination),s.start(0,o,i-o)}function kt(t){let e=null;if(document.cookie&&""!==document.cookie){const o=document.cookie.split(";");for(const i of o){const o=i.trim();if(o.substring(0,t.length+1)===t+"="){e=decodeURIComponent(o.substring(t.length+1));break}}}return e}function $t(t,e,o,i){const s=document.createElement("div");s.textContent=t;const n=s.innerHTML,r=Object.assign(document.createElement("sl-alert"),{variant:e,closable:!0,duration:i,innerHTML:`\n        <sl-icon name="${o}" slot="icon"></sl-icon>\n        ${n}\n      `});switch(document.body.append(r),e){case"warning":console.warn(n);break;case"danger":console.error(n)}r.toast()}function Ct(t,e){const o=document.getElementById("error-dialog");o?(e&&(o.label=e),o.innerHTML=t,o.show()):$t(t,"danger","exclamation-octagon",5e3)}
// @license-end
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
t([S({attribute:!1})],yt.prototype,"elems",void 0),t([z("#begin-input")],yt.prototype,"beginInput",void 0),t([z("#end-input")],yt.prototype,"endInput",void 0),t([z("#commit-button")],yt.prototype,"commitButton",void 0),t([z("#revert-button")],yt.prototype,"revertButton",void 0),t([z("#delete-button")],yt.prototype,"deleteButton",void 0),t([z("#create-button")],yt.prototype,"createButton",void 0),t([z("#create-select")],yt.prototype,"createSelect",void 0),yt=t([e("epub-overlay-edit")],yt);let Et=class extends bt{constructor(){super(...arguments),this.editModeActive=!1,this.handleXmlTask=new O(this,{task:St,args:()=>[this.src,this.smilsrc]}),this.enableSpinner=t=>{const e=document.getElementById("header-spinner");e&&(e.classList.remove("invisible"),e.content=t)},this.disableSpinner=()=>{const t=document.getElementById("header-spinner");t&&(t.classList.add("invisible"),t.content="")},this.enableEditModeButton=t=>{const{body:e,parsData:o}=this.parseResult,i=document.getElementById("edit-mode-toggle");if(!i)return;const s=new URL(this.src,window.location.origin),n=new URL(this.smilsrc,window.location.origin);t.idParMap=At(o,s,n),t.audioContext=this.audioContext,t.audioSrcMap=this.audioSrcMap;let r=Lt(this.overlayElems,t),a=zt(e,o,s,t);i.onclick=()=>{this.editModeActive?(this.editModeActive=!1,t.hidden=!0,this.removeEditModeListeners(r,a),t.elems=void 0):(this.editModeActive=!0,t.hidden=!1,this.addEditModeListeners(r,a))},t.addEventListener("deleted",(i=>{const{elems:l,old:c}=i.detail;this.removeEditModeListeners(r,a);const d=this.overlayElems.findIndex((t=>t===l.selected));d>=0&&this.overlayElems.splice(d,1);const h=o.findIndex((t=>t.parId===c.parId));h>=0&&o.splice(h,1),t.idParMap=At(o,s,n),r=Lt(this.overlayElems,t),a=zt(e,o,s,t),this.addEditModeListeners(r,a),t.elems=void 0})),t.addEventListener("created",(i=>{const l=i.detail;this.removeEditModeListeners(r,a);const c=this.overlayElems.findIndex((t=>t===l.elems.prev)),d=this.overlayElems.findIndex((t=>t===l.elems.next));c>=0?this.overlayElems.splice(c+1,0,l.elems.selected):d>=0?this.overlayElems.splice(d,0,l.elems.selected):this.overlayElems.unshift(l.elems.selected),o.push(l.new),t.idParMap=At(o,s,n),r=Lt(this.overlayElems,t),a=zt(e,o,s,t),this.addEditModeListeners(r,a),l.elems.selected.classList.remove("epub-media-overlay-create"),l.elems.selected.classList.add("-epub-media-overlay-active"),l.elems.selected.classList.add("-epub-media-overlay-marked"),t.elems={prev:l.elems.prev,selected:l.elems.selected,next:l.elems.next}})),i.disabled=!1}}adoptStyles(){const{fontFaceRules:t,styles:e}=this.parseResult;if(t.length>0){const e=new CSSStyleSheet;t.forEach((t=>{e.insertRule(t.cssText)})),document.adoptedStyleSheets=[e]}l(this.renderRoot,e)}async applyOverlay(t,e,o){this.audioContext=new AudioContext;const i=new URL(this.src,window.location.origin),s=new URL(this.smilsrc,window.location.origin);this.audioSrcMap=new Map(await Promise.all(Array.from(e).map((async t=>{const e=new URL(t,s),o=await fetch(e),i=await o.arrayBuffer();return[t,await this.audioContext.decodeAudioData(i)]}))));const n=new Map(t.flatMap((t=>Array.from(t.getElementsByTagName("*")).filter((t=>t.hasAttribute("id"))).map((t=>[t.getAttribute("id"),t]))))),r=[];for(const t of o){const[e,o]=t.textSrc.split("#",2),a=new URL(e,s);if(i.pathname!==a.pathname){console.warn(`SMIL: ${e} does not match xhtml ${this.src}`);continue}const l=n.get(o);l?(r.push(l),l.onclick=this.createPlayBufferEvent(t,l)):console.warn(`SMIL: Element with id ${o} not found`)}this.overlayElems=r}createPlayBufferEvent(t,e){return()=>{if(this.editModeActive)return;const o=this.audioSrcMap?.get(t.audioSrc);if(!o)return void console.warn(`SMIL: Audio buffer for ${t.audioSrc} not found`);const i=wt(t.clipBegin),s=wt(t.clipEnd);this.activeclass&&(e.classList.add(this.activeclass),setTimeout((()=>{e.classList.remove(this.activeclass)}),1e3*(s-i))),xt(this.audioContext,o,i,s)}}addEditModeListeners(t,e=[]){t.forEach((([t,e])=>{t.classList.add("-epub-media-overlay-marked"),t.addEventListener("click",e)})),e.forEach((([t,e])=>{t.addEventListener("click",e)}))}removeEditModeListeners(t,e=[]){t.forEach((([t,e])=>{t.classList.remove("-epub-media-overlay-active"),t.classList.remove("-epub-media-overlay-marked"),t.removeEventListener("click",e)})),e.forEach((([t,e])=>{Array.from(t.getElementsByClassName("-epub-media-overlay-create")).forEach((t=>{t.classList.remove("-epub-media-overlay-create")})),t.removeEventListener("click",e)}))}addMediaOverlayClasses(){const{styles:t}=this.parseResult,e=new CSSStyleSheet;e.insertRule(".-epub-media-overlay-marked { border: 1px solid; cursor: pointer }"),e.insertRule(".-epub-media-overlay-marked:hover { background-color: var(--sl-color-primary-100) }"),e.insertRule(".-epub-media-overlay-create { border: 1px dashed}"),this.activeclass||(this.activeclass="-epub-media-overlay-active",e.insertRule(".-epub-media-overlay-active { background-color: var(--sl-color-primary-100) }")),t.push(e)}loadMediaOverlayIfExists(t){const{body:e,audioSrcSet:o,parsData:i}=this.parseResult;this.enableSpinner("Loading book's media overlay"),o&&i?this.applyOverlay(e,o,i).then((()=>{this.enableEditModeButton(t)})).finally((()=>{this.disableSpinner()})):this.disableSpinner()}render(){return this.handleXmlTask.render({pending:()=>(this.enableSpinner("Loading book content"),Q` <div>Loading...</div>`),error:t=>(this.disableSpinner(),Q` <div>${t} (${this.src})</div>`),complete:t=>{this.parseResult=t,this.addMediaOverlayClasses(),this.adoptStyles();const e=new yt;return e.hidden=!this.editModeActive,this.loadMediaOverlayIfExists(e),[t.body,e]}})}};async function St([t,e],{signal:o}){if(!t)throw new Error("src attribute missing");const i=new URL(t,window.location.origin),s=fetch(i,{signal:o}).then((t=>{if(!t.ok)throw new Error(t.statusText);return t.text()})),n=e?fetch(e,{signal:o}).then((t=>{if(!t.ok)throw new Error(t.statusText);return t.text()})):Promise.resolve(void 0),[r,a]=await Promise.all([s,n]);return async function(t,e,o){const i=await async function(t,e){const o=new DOMParser,i=o.parseFromString(t,"application/xhtml+xml"),s=Array.from(i.head.children).filter((t=>"link"===t.tagName.toLowerCase()&&"stylesheet"===(t.getAttribute("rel")??"").toLowerCase()&&t.getAttribute("href"))).map((async t=>{const o=t.getAttribute("href"),i=new URL(o,e),s=await fetch(i);if(!s.ok)throw new Error(s.statusText);return[await s.text(),i]})),n=await Promise.all(s),r=[],a=[];n.forEach((([t,e])=>{const o=function(t,e){const o=[],i=new CSSStyleSheet;i.replaceSync(t);for(const t of i.cssRules)if("CSSFontFaceRule"===t.constructor.name){const i=t,s=i.style.src,n=s.match(/url\("?([^")]+)"?\).*/);if(!n)continue;const r=new URL(n[1],e);i.style.src=s.replace(n[1],r.pathname),o.push(i)}else if("CSSStyleRule"===t.constructor.name){const e=t;["html","body",":root"].includes(e.selectorText)&&(e.selectorText=":host")}return{styleSheet:i,fontFaceRules:o}}(t,e);r.push(o.styleSheet),a.push(...o.fontFaceRules)}));const l=Array.from(i.body.children);return function(t,e){const o=t.flatMap((t=>Array.from(t.getElementsByTagName("img")))).filter((t=>t.hasAttribute("src")));for(const t of o){const o=t.getAttribute("src");t.setAttribute("src",new URL(o,e).pathname)}}(l,e),{body:l,styles:r,fontFaceRules:a}}(t,e);if(o){const t=function(t){const e=new DOMParser,o=e.parseFromString(t,"application/xml"),i=o.querySelectorAll("par"),s=new Set,n=[];for(const t of i){const e=t.getElementsByTagName("text");console.assert(e.length>0,"text element not found: %o",t);const o=e.item(0);if(!o)continue;console.assert(1===e.length,"multiple text elements found: %o",t);const i=t.getElementsByTagName("audio");console.assert(i.length>0,"audio element not found: %o",t);const r=i.item(0);if(!r)continue;console.assert(1===i.length,"multiple audio elements found: %o",t);const a=t.getAttribute("id"),l=o.getAttribute("src"),c=r.getAttribute("src"),d=r.getAttribute("clipBegin"),h=r.getAttribute("clipEnd");a&&l&&c&&d&&h?(s.add(c),n.push({parId:a,textSrc:l,audioSrc:c,clipBegin:d,clipEnd:h})):console.warn("Incomplete par element: %o",t)}return{audioSrcSet:s,parsData:n}}(o);i.audioSrcSet=t.audioSrcSet,i.parsData=t.parsData}return i}(r,i,a)}function At(t,e,o){return new Map(t.map((t=>{const[e,o]=t.textSrc.split("#",2);return[e,o,t]})).filter((([t])=>{const i=new URL(t,o);return e.pathname===i.pathname})).map((([,t,e])=>[t,e])))}function Lt(t,e){return t.map(((o,i)=>[o,()=>{t.forEach((t=>{t.classList.remove("-epub-media-overlay-active")})),o.classList.add("-epub-media-overlay-active"),e.elems={prev:t[i-1],selected:o,next:t[i+1]}}]))}function zt(t,e,o,i){const s=new Set(e.map((t=>t.textSrc.split("#",2)[1])));return t.map((t=>[t,n=>{Array.from(t.getElementsByClassName("-epub-media-overlay-create")).forEach((t=>{t.classList.remove("-epub-media-overlay-create")}));let r=n.target;for(;!r.hasAttribute("id");)if(r=r.parentElement,null===r)return;const a=r.getAttribute("id");if(s.has(a))return;r.classList.add("-epub-media-overlay-create");const l=Tt(r,s,!1),c=Tt(r,s,!0),d={};e.forEach((t=>{d[t.audioSrc]=(d[t.audioSrc]??0)+1}));const h=Object.entries(d).sort((([,t],[,e])=>e-t)).at(0),u=o.pathname.split("/").pop();i.elems={prev:l,selected:r,next:c,textSrcNew:`${u}#${a}`,audioSrcNew:h?.[0]}}]))}function Tt(t,e,o){const i=Ot(t,e,o);if(i)return i;let s=o?t.nextElementSibling:t.previousElementSibling;for(;s;){const t=Ot(s,e,o);if(t)return t;s=o?s.nextElementSibling:s.previousElementSibling}const n=o?t.parentElement?.nextElementSibling:t.parentElement?.previousElementSibling;return n?Tt(n,e,o):null}function Ot(t,e,o){const i=t.getAttribute("id");if(i&&e.has(i))return t;const s=Array.from(t.children);o||s.reverse();for(const t of s){const i=Ot(t,e,o);if(i)return i}return null}
// @license-end
t([S({type:String})],Et.prototype,"src",void 0),t([S({type:String})],Et.prototype,"smilsrc",void 0),t([S({type:String})],Et.prototype,"activeclass",void 0),Et=t([e("epub-edit")],Et);var Pt=a`
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
`,Mt="";function Dt(t){Mt=t}var Bt={name:"default",resolver:t=>function(t=""){if(!Mt){const t=[...document.getElementsByTagName("script")],e=t.find((t=>t.hasAttribute("data-shoelace")));if(e)Dt(e.getAttribute("data-shoelace"));else{const e=t.find((t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(t.src)));let o="";e&&(o=e.getAttribute("src")),Dt(o.split("/").slice(0,-1).join("/"))}}return Mt.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")}(`assets/icons/${t}.svg`)},Rt={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',copy:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},It=[Bt,{name:"system",resolver:t=>t in Rt?`data:image/svg+xml,${encodeURIComponent(Rt[t])}`:""}],Ft=[];function Nt(t){return It.find((e=>e.name===t))}var Ut=a`
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
`,Vt=Object.defineProperty,Ht=Object.defineProperties,Wt=Object.getOwnPropertyDescriptor,jt=Object.getOwnPropertyDescriptors,qt=Object.getOwnPropertySymbols,Kt=Object.prototype.hasOwnProperty,Yt=Object.prototype.propertyIsEnumerable,Xt=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),Zt=(t,e,o)=>e in t?Vt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,Jt=(t,e)=>{for(var o in e||(e={}))Kt.call(e,o)&&Zt(t,o,e[o]);if(qt)for(var o of qt(e))Yt.call(e,o)&&Zt(t,o,e[o]);return t},Gt=(t,e)=>Ht(t,jt(e)),Qt=(t,e,o,i)=>{for(var s,n=i>1?void 0:i?Wt(e,o):e,r=t.length-1;r>=0;r--)(s=t[r])&&(n=(i?s(e,o,n):s(n))||n);return i&&n&&Vt(e,o,n),n},te=function(t,e){this[0]=t,this[1]=e},ee=t=>{var e,o=t[Xt("asyncIterator")],i=!1,s={};return null==o?(o=t[Xt("iterator")](),e=t=>s[t]=e=>o[t](e)):(o=o.call(t),e=t=>s[t]=e=>{if(i){if(i=!1,"throw"===t)throw e;return e}return i=!0,{done:!1,value:new te(new Promise((i=>{var s=o[t](e);if(!(s instanceof Object))throw TypeError("Object expected");i(s)})),1)}}),s[Xt("iterator")]=()=>s,e("next"),"throw"in o?e("throw"):s.throw=t=>{throw t},"return"in o&&e("return"),s};function oe(t,e){const o=Jt({waitUntilFirstUpdate:!1},e);return(e,i)=>{const{update:s}=e,n=Array.isArray(t)?t:[t];e.update=function(t){n.forEach((e=>{const s=e;if(t.has(s)){const e=t.get(s),n=this[s];e!==n&&(o.waitUntilFirstUpdate&&!this.hasUpdated||this[i](e,n))}})),s.call(this,t)}}}var ie=a`
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
`,se=class extends bt{constructor(){super(),Object.entries(this.constructor.dependencies).forEach((([t,e])=>{this.constructor.define(t,e)}))}emit(t,e){const o=new CustomEvent(t,Jt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(o),o}static define(t,e=this,o={}){const i=customElements.get(t);if(!i)return void customElements.define(t,class extends e{},o);let s=" (unknown version)",n=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in i&&i.version&&(n=" v"+i.version),s&&n&&s===n||console.warn(`Attempted to register <${t}>${s}, but <${t}>${n} has already been registered.`)}};se.version="2.15.0",se.dependencies={},Qt([S()],se.prototype,"dir",2),Qt([S()],se.prototype,"lang",2);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne=t=>void 0===t.strings,re={};var ae,le=Symbol(),ce=Symbol(),de=new Map,he=class extends se{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var o;let i;if(null==e?void 0:e.spriteSheet){this.svg=Q`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;const o=this.shadowRoot.querySelector("[part='svg']");return"function"==typeof e.mutator&&e.mutator(o),this.svg}try{if(i=await fetch(t,{mode:"cors"}),!i.ok)return 410===i.status?le:ce}catch(t){return ce}try{const t=document.createElement("div");t.innerHTML=await i.text();const e=t.firstElementChild;if("svg"!==(null==(o=null==e?void 0:e.tagName)?void 0:o.toLowerCase()))return le;ae||(ae=new DOMParser);const s=ae.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");return s?(s.part.add("svg"),document.adoptNode(s)):le}catch(t){return le}}connectedCallback(){var t;super.connectedCallback(),t=this,Ft.push(t)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,Ft=Ft.filter((e=>e!==t))}getIconSource(){const t=Nt(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;const{url:e,fromLibrary:o}=this.getIconSource(),i=o?Nt(this.library):void 0;if(!e)return void(this.svg=null);let s=de.get(e);if(s||(s=this.resolveIcon(e,i),de.set(e,s)),!this.initialRender)return;const n=await s;if(n===ce&&de.delete(e),e===this.getIconSource().url)if(((t,e)=>void 0===e?void 0!==t?._$litType$:t?._$litType$===e)(n))this.svg=n;else switch(n){case ce:case le:this.svg=null,this.emit("sl-error");break;default:this.svg=n.cloneNode(!0),null==(t=null==i?void 0:i.mutator)||t.call(i,this.svg),this.emit("sl-load")}}render(){return this.svg}};he.styles=[ie,Ut],Qt([A()],he.prototype,"svg",2),Qt([S({reflect:!0})],he.prototype,"name",2),Qt([S()],he.prototype,"src",2),Qt([S()],he.prototype,"label",2),Qt([S({reflect:!0})],he.prototype,"library",2),Qt([oe("label")],he.prototype,"handleLabelChange",1),Qt([oe(["name","src","library"])],he.prototype,"setIcon",1);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue=1,pe=2,me=3,fe=4,be=t=>(...e)=>({_$litDirective$:t,values:e});class ge{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,o){this._$Ct=t,this._$AM=e,this._$Ci=o}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ve=be(class extends ge{constructor(t){if(super(t),t.type!==ue||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const o=t.element.classList;for(const t of this.st)t in e||(o.remove(t),this.st.delete(t));for(const t in e){const i=!!e[t];i===this.st.has(t)||this.nt?.has(t)||(i?(o.add(t),this.st.add(t)):(o.remove(t),this.st.delete(t)))}return tt}}),ye=Symbol.for(""),we=t=>{if(t?.r===ye)return t?._$litStatic$},_e=(t,...e)=>({_$litStatic$:e.reduce(((e,o,i)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(o)+t[i+1]),t[0]),r:ye}),xe=new Map,ke=(t=>(e,...o)=>{const i=o.length;let s,n;const r=[],a=[];let l,c=0,d=!1;for(;c<i;){for(l=e[c];c<i&&void 0!==(n=o[c],s=we(n));)l+=s+e[++c],d=!0;c!==i&&a.push(n),r.push(l),c++}if(c===i&&r.push(e[i]),d){const t=r.join("$$lit$$");void 0===(e=xe.get(t))&&(r.raw=r,xe.set(t,e=r)),o=a}return t(e,...o)})(Q),$e=t=>t??et;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ce=class extends se{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(t){this.disabled&&(t.preventDefault(),t.stopPropagation())}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){const t=!!this.href,e=t?_e`a`:_e`button`;return ke`
      <${e}
        part="base"
        class=${ve({"icon-button":!0,"icon-button--disabled":!t&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${$e(t?void 0:this.disabled)}
        type=${$e(t?void 0:"button")}
        href=${$e(t?this.href:void 0)}
        target=${$e(t?this.target:void 0)}
        download=${$e(t?this.download:void 0)}
        rel=${$e(t&&this.target?"noreferrer noopener":void 0)}
        role=${$e(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${$e(this.name)}
          library=${$e(this.library)}
          src=${$e(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${e}>
    `}};Ce.styles=[ie,Pt],Ce.dependencies={"sl-icon":he},Qt([z(".icon-button")],Ce.prototype,"button",2),Qt([A()],Ce.prototype,"hasFocus",2),Qt([S()],Ce.prototype,"name",2),Qt([S()],Ce.prototype,"library",2),Qt([S()],Ce.prototype,"src",2),Qt([S()],Ce.prototype,"href",2),Qt([S()],Ce.prototype,"target",2),Qt([S()],Ce.prototype,"download",2),Qt([S()],Ce.prototype,"label",2),Qt([S({type:Boolean,reflect:!0})],Ce.prototype,"disabled",2);var Ee=new Map,Se=new WeakMap;function Ae(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function Le(t,e){Ee.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function ze(t,e,o){const i=Se.get(t);if(null==i?void 0:i[e])return Ae(i[e],o.dir);const s=Ee.get(e);return s?Ae(s,o.dir):{keyframes:[],options:{duration:0}}}function Te(t,e){return new Promise((o=>{t.addEventListener(e,(function i(s){s.target===t&&(t.removeEventListener(e,i),o())}))}))}function Oe(t,e,o){return new Promise((i=>{if((null==o?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const s=t.animate(e,Gt(Jt({},o),{duration:Me()?0:o.duration}));s.addEventListener("cancel",i,{once:!0}),s.addEventListener("finish",i,{once:!0})}))}function Pe(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function Me(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function De(t){return Promise.all(t.getAnimations().map((t=>new Promise((e=>{t.cancel(),requestAnimationFrame(e)})))))}const Be=new Set,Re=new MutationObserver(He),Ie=new Map;let Fe,Ne=document.documentElement.dir||"ltr",Ue=document.documentElement.lang||navigator.language;function Ve(...t){t.map((t=>{const e=t.$code.toLowerCase();Ie.has(e)?Ie.set(e,Object.assign(Object.assign({},Ie.get(e)),t)):Ie.set(e,t),Fe||(Fe=t)})),He()}function He(){Ne=document.documentElement.dir||"ltr",Ue=document.documentElement.lang||navigator.language,[...Be.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}Re.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});let We=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){Be.add(this.host)}hostDisconnected(){Be.delete(this.host)}dir(){return`${this.host.dir||Ne}`.toLowerCase()}lang(){return`${this.host.lang||Ue}`.toLowerCase()}getTranslationData(t){var e,o;const i=new Intl.Locale(t.replace(/_/g,"-")),s=null==i?void 0:i.language.toLowerCase(),n=null!==(o=null===(e=null==i?void 0:i.region)||void 0===e?void 0:e.toLowerCase())&&void 0!==o?o:"";return{locale:i,language:s,region:n,primary:Ie.get(`${s}-${n}`),secondary:Ie.get(s)}}exists(t,e){var o;const{primary:i,secondary:s}=this.getTranslationData(null!==(o=e.lang)&&void 0!==o?o:this.lang());return e=Object.assign({includeFallback:!1},e),!!(i&&i[t]||s&&s[t]||e.includeFallback&&Fe&&Fe[t])}term(t,...e){const{primary:o,secondary:i}=this.getTranslationData(this.lang());let s;if(o&&o[t])s=o[t];else if(i&&i[t])s=i[t];else{if(!Fe||!Fe[t])return console.error(`No translation found for: ${String(t)}`),String(t);s=Fe[t]}return"function"==typeof s?s(...e):s}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,e)}};var je={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};Ve(je);var qe=je,Ke=class extends We{};Ve(qe);var Ye=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=t=>{const e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some((t=>{if(t.nodeType===t.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===t.ELEMENT_NODE){const e=t;if("sl-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1}))}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};var Xe=a`
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
    padding-inline-end: var(--sl-spacing-medium);
  }
`,Ze=Object.assign(document.createElement("div"),{className:"sl-toast-stack"}),Je=class extends se{constructor(){super(...arguments),this.hasSlotController=new Ye(this,"icon","suffix"),this.localize=new Ke(this),this.open=!1,this.closable=!1,this.variant="primary",this.duration=1/0}firstUpdated(){this.base.hidden=!this.open}restartAutoHide(){clearTimeout(this.autoHideTimeout),this.open&&this.duration<1/0&&(this.autoHideTimeout=window.setTimeout((()=>this.hide()),this.duration))}handleCloseClick(){this.hide()}handleMouseMove(){this.restartAutoHide()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.duration<1/0&&this.restartAutoHide(),await De(this.base),this.base.hidden=!1;const{keyframes:t,options:e}=ze(this,"alert.show",{dir:this.localize.dir()});await Oe(this.base,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),clearTimeout(this.autoHideTimeout),await De(this.base);const{keyframes:t,options:e}=ze(this,"alert.hide",{dir:this.localize.dir()});await Oe(this.base,t,e),this.base.hidden=!0,this.emit("sl-after-hide")}}handleDurationChange(){this.restartAutoHide()}async show(){if(!this.open)return this.open=!0,Te(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Te(this,"sl-after-hide")}async toast(){return new Promise((t=>{null===Ze.parentElement&&document.body.append(Ze),Ze.appendChild(this),requestAnimationFrame((()=>{this.clientWidth,this.show()})),this.addEventListener("sl-after-hide",(()=>{Ze.removeChild(this),t(),null===Ze.querySelector("sl-alert")&&Ze.remove()}),{once:!0})}))}render(){return Q`
      <div
        part="base"
        class=${ve({alert:!0,"alert--open":this.open,"alert--closable":this.closable,"alert--has-icon":this.hasSlotController.test("icon"),"alert--primary":"primary"===this.variant,"alert--success":"success"===this.variant,"alert--neutral":"neutral"===this.variant,"alert--warning":"warning"===this.variant,"alert--danger":"danger"===this.variant})}
        role="alert"
        aria-hidden=${this.open?"false":"true"}
        @mousemove=${this.handleMouseMove}
      >
        <div part="icon" class="alert__icon">
          <slot name="icon"></slot>
        </div>

        <div part="message" class="alert__message" aria-live="polite">
          <slot></slot>
        </div>

        ${this.closable?Q`
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
      </div>
    `}};Je.styles=[ie,Xe],Je.dependencies={"sl-icon-button":Ce},Qt([z('[part~="base"]')],Je.prototype,"base",2),Qt([S({type:Boolean,reflect:!0})],Je.prototype,"open",2),Qt([S({type:Boolean,reflect:!0})],Je.prototype,"closable",2),Qt([S({reflect:!0})],Je.prototype,"variant",2),Qt([S({type:Number})],Je.prototype,"duration",2),Qt([oe("open",{waitUntilFirstUpdate:!0})],Je.prototype,"handleOpenChange",1),Qt([oe("duration")],Je.prototype,"handleDurationChange",1),Le("alert.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),Le("alert.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),Je.define("sl-alert");var Ge=a`
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
`,Qe=(t="value")=>(e,o)=>{const i=e.constructor,s=i.prototype.attributeChangedCallback;i.prototype.attributeChangedCallback=function(e,n,r){var a;const l=i.getPropertyOptions(t);if(e===("string"==typeof l.attribute?l.attribute:t)){const e=l.converter||_,i=("function"==typeof e?e:null!=(a=null==e?void 0:e.fromAttribute)?a:_.fromAttribute)(r,l.type);this[t]!==i&&(this[o]=i)}s.call(this,e,n,r)}},to=a`
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
`,eo=new WeakMap,oo=new WeakMap,io=new WeakMap,so=new WeakSet,no=new WeakMap,ro=class{constructor(t,e){this.handleFormData=t=>{const e=this.options.disabled(this.host),o=this.options.name(this.host),i=this.options.value(this.host),s="sl-button"===this.host.tagName.toLowerCase();this.host.isConnected&&!e&&!s&&"string"==typeof o&&o.length>0&&void 0!==i&&(Array.isArray(i)?i.forEach((e=>{t.formData.append(o,e.toString())})):t.formData.append(o,i.toString()))},this.handleFormSubmit=t=>{var e;const o=this.options.disabled(this.host),i=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(e=eo.get(this.form))||e.forEach((t=>{this.setUserInteracted(t,!0)}))),!this.form||this.form.noValidate||o||i(this.host)||(t.preventDefault(),t.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),no.set(this.host,[])},this.handleInteraction=t=>{const e=no.get(this.host);e.includes(t.type)||e.push(t.type),e.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.checkValidity&&!e.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const t=this.form.querySelectorAll("*");for(const e of t)if("function"==typeof e.reportValidity&&!e.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=Jt({form:t=>{const e=t.form;if(e){const o=t.getRootNode().querySelector(`#${e}`);if(o)return o}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var e;return null!=(e=t.disabled)&&e},reportValidity:t=>"function"!=typeof t.reportValidity||t.reportValidity(),checkValidity:t=>"function"!=typeof t.checkValidity||t.checkValidity(),setValue:(t,e)=>t.value=e,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),no.set(this.host,[]),this.options.assumeInteractionOn.forEach((t=>{this.host.addEventListener(t,this.handleInteraction)}))}hostDisconnected(){this.detachForm(),no.delete(this.host),this.options.assumeInteractionOn.forEach((t=>{this.host.removeEventListener(t,this.handleInteraction)}))}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,eo.has(this.form)?eo.get(this.form).add(this.host):eo.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),oo.has(this.form)||(oo.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),io.has(this.form)||(io.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=eo.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),oo.has(this.form)&&(this.form.reportValidity=oo.get(this.form),oo.delete(this.form)),io.has(this.form)&&(this.form.checkValidity=io.get(this.form),io.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?so.add(t):so.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach((t=>{e.hasAttribute(t)&&o.setAttribute(t,e.getAttribute(t))}))),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return null!=(t=this.form)?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,o=Boolean(so.has(e)),i=Boolean(e.required);e.toggleAttribute("data-required",i),e.toggleAttribute("data-optional",!i),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||null==t||t.preventDefault()}},ao=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(Gt(Jt({},ao),{valid:!1,valueMissing:!0})),Object.freeze(Gt(Jt({},ao),{valid:!1,customError:!0}));
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lo=be(class extends ge{constructor(t){if(super(t),t.type!==me&&t.type!==ue&&t.type!==fe)throw Error("The `live` directive is not allowed on child or event bindings");if(!ne(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===tt||e===et)return e;const o=t.element,i=t.name;if(t.type===me){if(e===o[i])return tt}else if(t.type===fe){if(!!e===o.hasAttribute(i))return tt}else if(t.type===ue&&o.getAttribute(i)===e+"")return tt;return((t,e=re)=>{t._$AH=e})(t),e}});var co=class extends se{constructor(){super(...arguments),this.formControlController=new ro(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ye(this,"help-text","label"),this.localize=new Ke(this),this.hasFocus=!1,this.title="",this.__numberInput=Object.assign(document.createElement("input"),{type:"number"}),this.__dateInput=Object.assign(document.createElement("input"),{type:"date"}),this.type="text",this.name="",this.value="",this.defaultValue="",this.size="medium",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.disabled=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.noSpinButtons=!1,this.form="",this.required=!1,this.spellcheck=!0}get valueAsDate(){var t;return this.__dateInput.type=this.type,this.__dateInput.value=this.value,(null==(t=this.input)?void 0:t.valueAsDate)||this.__dateInput.valueAsDate}set valueAsDate(t){this.__dateInput.type=this.type,this.__dateInput.valueAsDate=t,this.value=this.__dateInput.value}get valueAsNumber(){var t;return this.__numberInput.value=this.value,(null==(t=this.input)?void 0:t.valueAsNumber)||this.__numberInput.valueAsNumber}set valueAsNumber(t){this.__numberInput.valueAsNumber=t,this.value=this.__numberInput.value}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleChange(){this.value=this.input.value,this.emit("sl-change")}handleClearClick(t){t.preventDefault(),""!==this.value&&(this.value="",this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")),this.input.focus()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleInput(){this.value=this.input.value,this.formControlController.updateValidity(),this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleKeyDown(t){const e=t.metaKey||t.ctrlKey||t.shiftKey||t.altKey;"Enter"!==t.key||e||setTimeout((()=>{t.defaultPrevented||t.isComposing||this.formControlController.submit()}))}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStepChange(){this.input.step=String(this.step),this.formControlController.updateValidity()}async handleValueChange(){await this.updateComplete,this.formControlController.updateValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,o="none"){this.input.setSelectionRange(t,e,o)}setRangeText(t,e,o,i="preserve"){const s=null!=e?e:this.input.selectionStart,n=null!=o?o:this.input.selectionEnd;this.input.setRangeText(t,s,n,i),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,i=!!this.helpText||!!e,s=this.clearable&&!this.disabled&&!this.readonly&&("number"==typeof this.value||this.value.length>0);return Q`
      <div
        part="form-control"
        class=${ve({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":o,"form-control--has-help-text":i})}
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
            class=${ve({input:!0,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":!this.value,"input--no-spin-buttons":this.noSpinButtons})}
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
              name=${$e(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${$e(this.placeholder)}
              minlength=${$e(this.minlength)}
              maxlength=${$e(this.maxlength)}
              min=${$e(this.min)}
              max=${$e(this.max)}
              step=${$e(this.step)}
              .value=${lo(this.value)}
              autocapitalize=${$e(this.autocapitalize)}
              autocomplete=${$e(this.autocomplete)}
              autocorrect=${$e(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${$e(this.pattern)}
              enterkeyhint=${$e(this.enterkeyhint)}
              inputmode=${$e(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${s?Q`
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
            ${this.passwordToggle&&!this.disabled?Q`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible?Q`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        `:Q`
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
    `}};co.styles=[ie,to,Ge],co.dependencies={"sl-icon":he},Qt([z(".input__control")],co.prototype,"input",2),Qt([A()],co.prototype,"hasFocus",2),Qt([S()],co.prototype,"title",2),Qt([S({reflect:!0})],co.prototype,"type",2),Qt([S()],co.prototype,"name",2),Qt([S()],co.prototype,"value",2),Qt([Qe()],co.prototype,"defaultValue",2),Qt([S({reflect:!0})],co.prototype,"size",2),Qt([S({type:Boolean,reflect:!0})],co.prototype,"filled",2),Qt([S({type:Boolean,reflect:!0})],co.prototype,"pill",2),Qt([S()],co.prototype,"label",2),Qt([S({attribute:"help-text"})],co.prototype,"helpText",2),Qt([S({type:Boolean})],co.prototype,"clearable",2),Qt([S({type:Boolean,reflect:!0})],co.prototype,"disabled",2),Qt([S()],co.prototype,"placeholder",2),Qt([S({type:Boolean,reflect:!0})],co.prototype,"readonly",2),Qt([S({attribute:"password-toggle",type:Boolean})],co.prototype,"passwordToggle",2),Qt([S({attribute:"password-visible",type:Boolean})],co.prototype,"passwordVisible",2),Qt([S({attribute:"no-spin-buttons",type:Boolean})],co.prototype,"noSpinButtons",2),Qt([S({reflect:!0})],co.prototype,"form",2),Qt([S({type:Boolean,reflect:!0})],co.prototype,"required",2),Qt([S()],co.prototype,"pattern",2),Qt([S({type:Number})],co.prototype,"minlength",2),Qt([S({type:Number})],co.prototype,"maxlength",2),Qt([S()],co.prototype,"min",2),Qt([S()],co.prototype,"max",2),Qt([S()],co.prototype,"step",2),Qt([S()],co.prototype,"autocapitalize",2),Qt([S()],co.prototype,"autocorrect",2),Qt([S()],co.prototype,"autocomplete",2),Qt([S({type:Boolean})],co.prototype,"autofocus",2),Qt([S()],co.prototype,"enterkeyhint",2),Qt([S({type:Boolean,converter:{fromAttribute:t=>!(!t||"false"===t),toAttribute:t=>t?"true":"false"}})],co.prototype,"spellcheck",2),Qt([S()],co.prototype,"inputmode",2),Qt([oe("disabled",{waitUntilFirstUpdate:!0})],co.prototype,"handleDisabledChange",1),Qt([oe("step",{waitUntilFirstUpdate:!0})],co.prototype,"handleStepChange",1),Qt([oe("value",{waitUntilFirstUpdate:!0})],co.prototype,"handleValueChange",1),co.define("sl-input");var ho=a`
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
`,uo=class extends se{constructor(){super(...arguments),this.hasSlotController=new Ye(this,"footer","header","image")}render(){return Q`
      <div
        part="base"
        class=${ve({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `}};uo.styles=[ie,ho],uo.define("sl-card");var po=a`
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
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,mo=a`
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
`;const fo=Math.min,bo=Math.max,go=Math.round,vo=Math.floor,yo=t=>({x:t,y:t}),wo={left:"right",right:"left",bottom:"top",top:"bottom"},_o={start:"end",end:"start"};function xo(t,e,o){return bo(t,fo(e,o))}function ko(t,e){return"function"==typeof t?t(e):t}function $o(t){return t.split("-")[0]}function Co(t){return t.split("-")[1]}function Eo(t){return"x"===t?"y":"x"}function So(t){return"y"===t?"height":"width"}function Ao(t){return["top","bottom"].includes($o(t))?"y":"x"}function Lo(t){return Eo(Ao(t))}function zo(t){return t.replace(/start|end/g,(t=>_o[t]))}function To(t){return t.replace(/left|right|bottom|top/g,(t=>wo[t]))}function Oo(t){return"number"!=typeof t?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(t):{top:t,right:t,bottom:t,left:t}}function Po(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function Mo(t,e,o){let{reference:i,floating:s}=t;const n=Ao(e),r=Lo(e),a=So(r),l=$o(e),c="y"===n,d=i.x+i.width/2-s.width/2,h=i.y+i.height/2-s.height/2,u=i[a]/2-s[a]/2;let p;switch(l){case"top":p={x:d,y:i.y-s.height};break;case"bottom":p={x:d,y:i.y+i.height};break;case"right":p={x:i.x+i.width,y:h};break;case"left":p={x:i.x-s.width,y:h};break;default:p={x:i.x,y:i.y}}switch(Co(e)){case"start":p[r]-=u*(o&&c?-1:1);break;case"end":p[r]+=u*(o&&c?-1:1)}return p}async function Do(t,e){var o;void 0===e&&(e={});const{x:i,y:s,platform:n,rects:r,elements:a,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:d="viewport",elementContext:h="floating",altBoundary:u=!1,padding:p=0}=ko(e,t),m=Oo(p),f=a[u?"floating"===h?"reference":"floating":h],b=Po(await n.getClippingRect({element:null==(o=await(null==n.isElement?void 0:n.isElement(f)))||o?f:f.contextElement||await(null==n.getDocumentElement?void 0:n.getDocumentElement(a.floating)),boundary:c,rootBoundary:d,strategy:l})),g="floating"===h?{...r.floating,x:i,y:s}:r.reference,v=await(null==n.getOffsetParent?void 0:n.getOffsetParent(a.floating)),y=await(null==n.isElement?void 0:n.isElement(v))&&await(null==n.getScale?void 0:n.getScale(v))||{x:1,y:1},w=Po(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:g,offsetParent:v,strategy:l}):g);return{top:(b.top-w.top+m.top)/y.y,bottom:(w.bottom-b.bottom+m.bottom)/y.y,left:(b.left-w.left+m.left)/y.x,right:(w.right-b.right+m.right)/y.x}}const Bo=function(t){return void 0===t&&(t=0),{name:"offset",options:t,async fn(e){var o,i;const{x:s,y:n,placement:r,middlewareData:a}=e,l=await async function(t,e){const{placement:o,platform:i,elements:s}=t,n=await(null==i.isRTL?void 0:i.isRTL(s.floating)),r=$o(o),a=Co(o),l="y"===Ao(o),c=["left","top"].includes(r)?-1:1,d=n&&l?-1:1,h=ko(e,t);let{mainAxis:u,crossAxis:p,alignmentAxis:m}="number"==typeof h?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...h};return a&&"number"==typeof m&&(p="end"===a?-1*m:m),l?{x:p*d,y:u*c}:{x:u*c,y:p*d}}(e,t);return r===(null==(o=a.offset)?void 0:o.placement)&&null!=(i=a.arrow)&&i.alignmentOffset?{}:{x:s+l.x,y:n+l.y,data:{...l,placement:r}}}}};function Ro(t){return No(t)?(t.nodeName||"").toLowerCase():"#document"}function Io(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function Fo(t){var e;return null==(e=(No(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function No(t){return t instanceof Node||t instanceof Io(t).Node}function Uo(t){return t instanceof Element||t instanceof Io(t).Element}function Vo(t){return t instanceof HTMLElement||t instanceof Io(t).HTMLElement}function Ho(t){return"undefined"!=typeof ShadowRoot&&(t instanceof ShadowRoot||t instanceof Io(t).ShadowRoot)}function Wo(t){const{overflow:e,overflowX:o,overflowY:i,display:s}=Xo(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+o)&&!["inline","contents"].includes(s)}function jo(t){return["table","td","th"].includes(Ro(t))}function qo(t){const e=Ko(),o=Xo(t);return"none"!==o.transform||"none"!==o.perspective||!!o.containerType&&"normal"!==o.containerType||!e&&!!o.backdropFilter&&"none"!==o.backdropFilter||!e&&!!o.filter&&"none"!==o.filter||["transform","perspective","filter"].some((t=>(o.willChange||"").includes(t)))||["paint","layout","strict","content"].some((t=>(o.contain||"").includes(t)))}function Ko(){return!("undefined"==typeof CSS||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function Yo(t){return["html","body","#document"].includes(Ro(t))}function Xo(t){return Io(t).getComputedStyle(t)}function Zo(t){return Uo(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Jo(t){if("html"===Ro(t))return t;const e=t.assignedSlot||t.parentNode||Ho(t)&&t.host||Fo(t);return Ho(e)?e.host:e}function Go(t){const e=Jo(t);return Yo(e)?t.ownerDocument?t.ownerDocument.body:t.body:Vo(e)&&Wo(e)?e:Go(e)}function Qo(t,e,o){var i;void 0===e&&(e=[]),void 0===o&&(o=!0);const s=Go(t),n=s===(null==(i=t.ownerDocument)?void 0:i.body),r=Io(s);return n?e.concat(r,r.visualViewport||[],Wo(s)?s:[],r.frameElement&&o?Qo(r.frameElement):[]):e.concat(s,Qo(s,[],o))}function ti(t){const e=Xo(t);let o=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const s=Vo(t),n=s?t.offsetWidth:o,r=s?t.offsetHeight:i,a=go(o)!==n||go(i)!==r;return a&&(o=n,i=r),{width:o,height:i,$:a}}function ei(t){return Uo(t)?t:t.contextElement}function oi(t){const e=ei(t);if(!Vo(e))return yo(1);const o=e.getBoundingClientRect(),{width:i,height:s,$:n}=ti(e);let r=(n?go(o.width):o.width)/i,a=(n?go(o.height):o.height)/s;return r&&Number.isFinite(r)||(r=1),a&&Number.isFinite(a)||(a=1),{x:r,y:a}}const ii=yo(0);function si(t){const e=Io(t);return Ko()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:ii}function ni(t,e,o,i){void 0===e&&(e=!1),void 0===o&&(o=!1);const s=t.getBoundingClientRect(),n=ei(t);let r=yo(1);e&&(i?Uo(i)&&(r=oi(i)):r=oi(t));const a=function(t,e,o){return void 0===e&&(e=!1),!(!o||e&&o!==Io(t))&&e}(n,o,i)?si(n):yo(0);let l=(s.left+a.x)/r.x,c=(s.top+a.y)/r.y,d=s.width/r.x,h=s.height/r.y;if(n){const t=Io(n),e=i&&Uo(i)?Io(i):i;let o=t,s=o.frameElement;for(;s&&i&&e!==o;){const t=oi(s),e=s.getBoundingClientRect(),i=Xo(s),n=e.left+(s.clientLeft+parseFloat(i.paddingLeft))*t.x,r=e.top+(s.clientTop+parseFloat(i.paddingTop))*t.y;l*=t.x,c*=t.y,d*=t.x,h*=t.y,l+=n,c+=r,o=Io(s),s=o.frameElement}}return Po({width:d,height:h,x:l,y:c})}const ri=[":popover-open",":modal"];function ai(t){return ri.some((e=>{try{return t.matches(e)}catch(t){return!1}}))}function li(t){return ni(Fo(t)).left+Zo(t).scrollLeft}function ci(t,e,o){let i;if("viewport"===e)i=function(t,e){const o=Io(t),i=Fo(t),s=o.visualViewport;let n=i.clientWidth,r=i.clientHeight,a=0,l=0;if(s){n=s.width,r=s.height;const t=Ko();(!t||t&&"fixed"===e)&&(a=s.offsetLeft,l=s.offsetTop)}return{width:n,height:r,x:a,y:l}}(t,o);else if("document"===e)i=function(t){const e=Fo(t),o=Zo(t),i=t.ownerDocument.body,s=bo(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),n=bo(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let r=-o.scrollLeft+li(t);const a=-o.scrollTop;return"rtl"===Xo(i).direction&&(r+=bo(e.clientWidth,i.clientWidth)-s),{width:s,height:n,x:r,y:a}}(Fo(t));else if(Uo(e))i=function(t,e){const o=ni(t,!0,"fixed"===e),i=o.top+t.clientTop,s=o.left+t.clientLeft,n=Vo(t)?oi(t):yo(1);return{width:t.clientWidth*n.x,height:t.clientHeight*n.y,x:s*n.x,y:i*n.y}}(e,o);else{const o=si(t);i={...e,x:e.x-o.x,y:e.y-o.y}}return Po(i)}function di(t,e){const o=Jo(t);return!(o===e||!Uo(o)||Yo(o))&&("fixed"===Xo(o).position||di(o,e))}function hi(t,e,o){const i=Vo(e),s=Fo(e),n="fixed"===o,r=ni(t,!0,n,e);let a={scrollLeft:0,scrollTop:0};const l=yo(0);if(i||!i&&!n)if(("body"!==Ro(e)||Wo(s))&&(a=Zo(e)),i){const t=ni(e,!0,n,e);l.x=t.x+e.clientLeft,l.y=t.y+e.clientTop}else s&&(l.x=li(s));return{x:r.left+a.scrollLeft-l.x,y:r.top+a.scrollTop-l.y,width:r.width,height:r.height}}function ui(t,e){return Vo(t)&&"fixed"!==Xo(t).position?e?e(t):t.offsetParent:null}function pi(t,e){const o=Io(t);if(!Vo(t)||ai(t))return o;let i=ui(t,e);for(;i&&jo(i)&&"static"===Xo(i).position;)i=ui(i,e);return i&&("html"===Ro(i)||"body"===Ro(i)&&"static"===Xo(i).position&&!qo(i))?o:i||function(t){let e=Jo(t);for(;Vo(e)&&!Yo(e);){if(qo(e))return e;e=Jo(e)}return null}(t)||o}const mi={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:o,offsetParent:i,strategy:s}=t;const n="fixed"===s,r=Fo(i),a=!!e&&ai(e.floating);if(i===r||a&&n)return o;let l={scrollLeft:0,scrollTop:0},c=yo(1);const d=yo(0),h=Vo(i);if((h||!h&&!n)&&(("body"!==Ro(i)||Wo(r))&&(l=Zo(i)),Vo(i))){const t=ni(i);c=oi(i),d.x=t.x+i.clientLeft,d.y=t.y+i.clientTop}return{width:o.width*c.x,height:o.height*c.y,x:o.x*c.x-l.scrollLeft*c.x+d.x,y:o.y*c.y-l.scrollTop*c.y+d.y}},getDocumentElement:Fo,getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:i,strategy:s}=t;const n=[..."clippingAncestors"===o?function(t,e){const o=e.get(t);if(o)return o;let i=Qo(t,[],!1).filter((t=>Uo(t)&&"body"!==Ro(t))),s=null;const n="fixed"===Xo(t).position;let r=n?Jo(t):t;for(;Uo(r)&&!Yo(r);){const e=Xo(r),o=qo(r);o||"fixed"!==e.position||(s=null),(n?!o&&!s:!o&&"static"===e.position&&s&&["absolute","fixed"].includes(s.position)||Wo(r)&&!o&&di(t,r))?i=i.filter((t=>t!==r)):s=e,r=Jo(r)}return e.set(t,i),i}(e,this._c):[].concat(o),i],r=n[0],a=n.reduce(((t,o)=>{const i=ci(e,o,s);return t.top=bo(i.top,t.top),t.right=fo(i.right,t.right),t.bottom=fo(i.bottom,t.bottom),t.left=bo(i.left,t.left),t}),ci(e,r,s));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},getOffsetParent:pi,getElementRects:async function(t){const e=this.getOffsetParent||pi,o=this.getDimensions;return{reference:hi(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,...await o(t.floating)}}},getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){const{width:e,height:o}=ti(t);return{width:e,height:o}},getScale:oi,isElement:Uo,isRTL:function(t){return"rtl"===Xo(t).direction}};function fi(t,e,o,i){void 0===i&&(i={});const{ancestorScroll:s=!0,ancestorResize:n=!0,elementResize:r="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:l=!1}=i,c=ei(t),d=s||n?[...c?Qo(c):[],...Qo(e)]:[];d.forEach((t=>{s&&t.addEventListener("scroll",o,{passive:!0}),n&&t.addEventListener("resize",o)}));const h=c&&a?function(t,e){let o,i=null;const s=Fo(t);function n(){var t;clearTimeout(o),null==(t=i)||t.disconnect(),i=null}return function r(a,l){void 0===a&&(a=!1),void 0===l&&(l=1),n();const{left:c,top:d,width:h,height:u}=t.getBoundingClientRect();if(a||e(),!h||!u)return;const p={rootMargin:-vo(d)+"px "+-vo(s.clientWidth-(c+h))+"px "+-vo(s.clientHeight-(d+u))+"px "+-vo(c)+"px",threshold:bo(0,fo(1,l))||1};let m=!0;function f(t){const e=t[0].intersectionRatio;if(e!==l){if(!m)return r();e?r(!1,e):o=setTimeout((()=>{r(!1,1e-7)}),100)}m=!1}try{i=new IntersectionObserver(f,{...p,root:s.ownerDocument})}catch(t){i=new IntersectionObserver(f,p)}i.observe(t)}(!0),n}(c,o):null;let u,p=-1,m=null;r&&(m=new ResizeObserver((t=>{let[i]=t;i&&i.target===c&&m&&(m.unobserve(e),cancelAnimationFrame(p),p=requestAnimationFrame((()=>{var t;null==(t=m)||t.observe(e)}))),o()})),c&&!l&&m.observe(c),m.observe(e));let f=l?ni(t):null;return l&&function e(){const i=ni(t);!f||i.x===f.x&&i.y===f.y&&i.width===f.width&&i.height===f.height||o();f=i,u=requestAnimationFrame(e)}(),o(),()=>{var t;d.forEach((t=>{s&&t.removeEventListener("scroll",o),n&&t.removeEventListener("resize",o)})),null==h||h(),null==(t=m)||t.disconnect(),m=null,l&&cancelAnimationFrame(u)}}const bi=function(t){return void 0===t&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:i,placement:s}=e,{mainAxis:n=!0,crossAxis:r=!1,limiter:a={fn:t=>{let{x:e,y:o}=t;return{x:e,y:o}}},...l}=ko(t,e),c={x:o,y:i},d=await Do(e,l),h=Ao($o(s)),u=Eo(h);let p=c[u],m=c[h];if(n){const t="y"===u?"bottom":"right";p=xo(p+d["y"===u?"top":"left"],p,p-d[t])}if(r){const t="y"===h?"bottom":"right";m=xo(m+d["y"===h?"top":"left"],m,m-d[t])}const f=a.fn({...e,[u]:p,[h]:m});return{...f,data:{x:f.x-o,y:f.y-i}}}}},gi=function(t){return void 0===t&&(t={}),{name:"flip",options:t,async fn(e){var o,i;const{placement:s,middlewareData:n,rects:r,initialPlacement:a,platform:l,elements:c}=e,{mainAxis:d=!0,crossAxis:h=!0,fallbackPlacements:u,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:f=!0,...b}=ko(t,e);if(null!=(o=n.arrow)&&o.alignmentOffset)return{};const g=$o(s),v=$o(a)===a,y=await(null==l.isRTL?void 0:l.isRTL(c.floating)),w=u||(v||!f?[To(a)]:function(t){const e=To(t);return[zo(t),e,zo(e)]}(a));u||"none"===m||w.push(...function(t,e,o,i){const s=Co(t);let n=function(t,e,o){const i=["left","right"],s=["right","left"],n=["top","bottom"],r=["bottom","top"];switch(t){case"top":case"bottom":return o?e?s:i:e?i:s;case"left":case"right":return e?n:r;default:return[]}}($o(t),"start"===o,i);return s&&(n=n.map((t=>t+"-"+s)),e&&(n=n.concat(n.map(zo)))),n}(a,f,m,y));const _=[a,...w],x=await Do(e,b),k=[];let $=(null==(i=n.flip)?void 0:i.overflows)||[];if(d&&k.push(x[g]),h){const t=function(t,e,o){void 0===o&&(o=!1);const i=Co(t),s=Lo(t),n=So(s);let r="x"===s?i===(o?"end":"start")?"right":"left":"start"===i?"bottom":"top";return e.reference[n]>e.floating[n]&&(r=To(r)),[r,To(r)]}(s,r,y);k.push(x[t[0]],x[t[1]])}if($=[...$,{placement:s,overflows:k}],!k.every((t=>t<=0))){var C,E;const t=((null==(C=n.flip)?void 0:C.index)||0)+1,e=_[t];if(e)return{data:{index:t,overflows:$},reset:{placement:e}};let o=null==(E=$.filter((t=>t.overflows[0]<=0)).sort(((t,e)=>t.overflows[1]-e.overflows[1]))[0])?void 0:E.placement;if(!o)switch(p){case"bestFit":{var S;const t=null==(S=$.map((t=>[t.placement,t.overflows.filter((t=>t>0)).reduce(((t,e)=>t+e),0)])).sort(((t,e)=>t[1]-e[1]))[0])?void 0:S[0];t&&(o=t);break}case"initialPlacement":o=a}if(s!==o)return{reset:{placement:o}}}return{}}}},vi=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){const{placement:o,rects:i,platform:s,elements:n}=e,{apply:r=(()=>{}),...a}=ko(t,e),l=await Do(e,a),c=$o(o),d=Co(o),h="y"===Ao(o),{width:u,height:p}=i.floating;let m,f;"top"===c||"bottom"===c?(m=c,f=d===(await(null==s.isRTL?void 0:s.isRTL(n.floating))?"start":"end")?"left":"right"):(f=c,m="end"===d?"top":"bottom");const b=p-l[m],g=u-l[f],v=!e.middlewareData.shift;let y=b,w=g;if(h){const t=u-l.left-l.right;w=d||v?fo(g,t):t}else{const t=p-l.top-l.bottom;y=d||v?fo(b,t):t}if(v&&!d){const t=bo(l.left,0),e=bo(l.right,0),o=bo(l.top,0),i=bo(l.bottom,0);h?w=u-2*(0!==t||0!==e?t+e:bo(l.left,l.right)):y=p-2*(0!==o||0!==i?o+i:bo(l.top,l.bottom))}await r({...e,availableWidth:w,availableHeight:y});const _=await s.getDimensions(n.floating);return u!==_.width||p!==_.height?{reset:{rects:!0}}:{}}}},yi=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:i,placement:s,rects:n,platform:r,elements:a,middlewareData:l}=e,{element:c,padding:d=0}=ko(t,e)||{};if(null==c)return{};const h=Oo(d),u={x:o,y:i},p=Lo(s),m=So(p),f=await r.getDimensions(c),b="y"===p,g=b?"top":"left",v=b?"bottom":"right",y=b?"clientHeight":"clientWidth",w=n.reference[m]+n.reference[p]-u[p]-n.floating[m],_=u[p]-n.reference[p],x=await(null==r.getOffsetParent?void 0:r.getOffsetParent(c));let k=x?x[y]:0;k&&await(null==r.isElement?void 0:r.isElement(x))||(k=a.floating[y]||n.floating[m]);const $=w/2-_/2,C=k/2-f[m]/2-1,E=fo(h[g],C),S=fo(h[v],C),A=E,L=k-f[m]-S,z=k/2-f[m]/2+$,T=xo(A,z,L),O=!l.arrow&&null!=Co(s)&&z!==T&&n.reference[m]/2-(z<A?E:S)-f[m]/2<0,P=O?z<A?z-A:z-L:0;return{[p]:u[p]+P,data:{[p]:T,centerOffset:z-T-P,...O&&{alignmentOffset:P}},reset:O}}}),wi=(t,e,o)=>{const i=new Map,s={platform:mi,...o},n={...s.platform,_c:i};return(async(t,e,o)=>{const{placement:i="bottom",strategy:s="absolute",middleware:n=[],platform:r}=o,a=n.filter(Boolean),l=await(null==r.isRTL?void 0:r.isRTL(e));let c=await r.getElementRects({reference:t,floating:e,strategy:s}),{x:d,y:h}=Mo(c,i,l),u=i,p={},m=0;for(let o=0;o<a.length;o++){const{name:n,fn:f}=a[o],{x:b,y:g,data:v,reset:y}=await f({x:d,y:h,initialPlacement:i,placement:u,strategy:s,middlewareData:p,rects:c,platform:r,elements:{reference:t,floating:e}});d=null!=b?b:d,h=null!=g?g:h,p={...p,[n]:{...p[n],...v}},y&&m<=50&&(m++,"object"==typeof y&&(y.placement&&(u=y.placement),y.rects&&(c=!0===y.rects?await r.getElementRects({reference:t,floating:e,strategy:s}):y.rects),({x:d,y:h}=Mo(c,u,l))),o=-1)}return{x:d,y:h,placement:u,strategy:s,middlewareData:p}})(t,e,{...s,platform:n})};function _i(t){return function(t){for(let e=t;e;e=xi(e))if(e instanceof Element&&"none"===getComputedStyle(e).display)return null;for(let e=xi(t);e;e=xi(e)){if(!(e instanceof Element))continue;const t=getComputedStyle(e);if("contents"!==t.display){if("static"!==t.position||"none"!==t.filter)return e;if("BODY"===e.tagName)return e}}return null}(t)}function xi(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var ki=class extends se{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect();let o=0,i=0,s=0,n=0,r=0,a=0,l=0,c=0;this.placement.includes("top")||this.placement.includes("bottom")?t.top<e.top?(o=t.left,i=t.bottom,s=t.right,n=t.bottom,r=e.left,a=e.top,l=e.right,c=e.top):(o=e.left,i=e.bottom,s=e.right,n=e.bottom,r=t.left,a=t.top,l=t.right,c=t.top):t.left<e.left?(o=t.right,i=t.top,s=e.left,n=e.top,r=t.right,a=t.bottom,l=e.left,c=e.bottom):(o=e.right,i=e.top,s=t.left,n=t.top,r=e.right,a=e.bottom,l=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${r}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||function(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&(this.cleanup=fi(this.anchorEl,this.popup,(()=>{this.reposition()})))}async stop(){return new Promise((t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame((()=>t()))):t()}))}reposition(){if(!this.active||!this.anchorEl)return;const t=[Bo({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(vi({apply:({rects:t})=>{const e="width"===this.sync||"both"===this.sync,o="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=o?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(gi({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(bi({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(vi({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(yi({element:this.arrowEl,padding:this.arrowPadding}));const e="absolute"===this.strategy?t=>mi.getOffsetParent(t,_i):mi.getOffsetParent;wi(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:Gt(Jt({},mi),{getOffsetParent:e})}).then((({x:t,y:e,middlewareData:o,placement:i})=>{const s="rtl"===getComputedStyle(this).direction,n={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){const t=o.arrow.x,e=o.arrow.y;let i="",r="",a="",l="";if("start"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",r=s?o:"",l=s?"":o}else if("end"===this.arrowPlacement){const o="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r=s?"":o,l=s?o:"",a="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",i="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",i="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:i,right:r,bottom:a,left:l,[n]:"calc(var(--arrow-size-diagonal) * -1)"})}})),requestAnimationFrame((()=>this.updateHoverBridge())),this.emit("sl-reposition")}render(){return Q`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${ve({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${ve({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?Q`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};ki.styles=[ie,mo],Qt([z(".popup")],ki.prototype,"popup",2),Qt([z(".popup__arrow")],ki.prototype,"arrowEl",2),Qt([S()],ki.prototype,"anchor",2),Qt([S({type:Boolean,reflect:!0})],ki.prototype,"active",2),Qt([S({reflect:!0})],ki.prototype,"placement",2),Qt([S({reflect:!0})],ki.prototype,"strategy",2),Qt([S({type:Number})],ki.prototype,"distance",2),Qt([S({type:Number})],ki.prototype,"skidding",2),Qt([S({type:Boolean})],ki.prototype,"arrow",2),Qt([S({attribute:"arrow-placement"})],ki.prototype,"arrowPlacement",2),Qt([S({attribute:"arrow-padding",type:Number})],ki.prototype,"arrowPadding",2),Qt([S({type:Boolean})],ki.prototype,"flip",2),Qt([S({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map((t=>t.trim())).filter((t=>""!==t)),toAttribute:t=>t.join(" ")}})],ki.prototype,"flipFallbackPlacements",2),Qt([S({attribute:"flip-fallback-strategy"})],ki.prototype,"flipFallbackStrategy",2),Qt([S({type:Object})],ki.prototype,"flipBoundary",2),Qt([S({attribute:"flip-padding",type:Number})],ki.prototype,"flipPadding",2),Qt([S({type:Boolean})],ki.prototype,"shift",2),Qt([S({type:Object})],ki.prototype,"shiftBoundary",2),Qt([S({attribute:"shift-padding",type:Number})],ki.prototype,"shiftPadding",2),Qt([S({attribute:"auto-size"})],ki.prototype,"autoSize",2),Qt([S()],ki.prototype,"sync",2),Qt([S({type:Object})],ki.prototype,"autoSizeBoundary",2),Qt([S({attribute:"auto-size-padding",type:Number})],ki.prototype,"autoSizePadding",2),Qt([S({attribute:"hover-bridge",type:Boolean})],ki.prototype,"hoverBridge",2);var $i=class extends se{constructor(){super(),this.localize=new Ke(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){const t=Pe(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.show()),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){const t=Pe(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>this.hide()),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await De(this.body),this.body.hidden=!1,this.popup.active=!0;const{keyframes:e,options:o}=ze(this,"tooltip.show",{dir:this.localize.dir()});await Oe(this.popup.popup,e,o),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await De(this.body);const{keyframes:t,options:o}=ze(this,"tooltip.hide",{dir:this.localize.dir()});await Oe(this.popup.popup,t,o),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,Te(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Te(this,"sl-after-hide")}render(){return Q`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${ve({tooltip:!0,"tooltip--open":this.open})}
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
    `}};$i.styles=[ie,po],$i.dependencies={"sl-popup":ki},Qt([z("slot:not([name])")],$i.prototype,"defaultSlot",2),Qt([z(".tooltip__body")],$i.prototype,"body",2),Qt([z("sl-popup")],$i.prototype,"popup",2),Qt([S()],$i.prototype,"content",2),Qt([S()],$i.prototype,"placement",2),Qt([S({type:Boolean,reflect:!0})],$i.prototype,"disabled",2),Qt([S({type:Number})],$i.prototype,"distance",2),Qt([S({type:Boolean,reflect:!0})],$i.prototype,"open",2),Qt([S({type:Number})],$i.prototype,"skidding",2),Qt([S()],$i.prototype,"trigger",2),Qt([S({type:Boolean})],$i.prototype,"hoist",2),Qt([oe("open",{waitUntilFirstUpdate:!0})],$i.prototype,"handleOpenChange",1),Qt([oe(["content","distance","hoist","placement","skidding"])],$i.prototype,"handleOptionsChange",1),Qt([oe("disabled")],$i.prototype,"handleDisabledChange",1),Le("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),Le("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}}),$i.define("sl-tooltip");var Ci=a`
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
`,Ei=class extends se{constructor(){super(...arguments),this.localize=new Ke(this)}render(){return Q`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Ei.styles=[ie,Ci];var Si=a`
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
    border-color: var(--sl-color-neutral-300);
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
    border-color: var(--sl-color-neutral-300);
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
  :host([data-sl-button-group__button[checked]]) {
    z-index: 2;
  }
`,Ai=class extends se{constructor(){super(...arguments),this.formControlController=new ro(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new Ye(this,"[default]","prefix","suffix"),this.localize=new Ke(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:ao}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){"submit"===this.type&&this.formControlController.submit(this),"reset"===this.type&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return!this.isButton()||this.button.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.isButton()||this.button.reportValidity()}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?_e`a`:_e`button`;return ke`
      <${e}
        part="base"
        class=${ve({button:!0,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":"rtl"===this.localize.dir(),"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${$e(t?void 0:this.disabled)}
        type=${$e(t?void 0:this.type)}
        title=${this.title}
        name=${$e(t?void 0:this.name)}
        value=${$e(t?void 0:this.value)}
        href=${$e(t?this.href:void 0)}
        target=${$e(t?this.target:void 0)}
        download=${$e(t?this.download:void 0)}
        rel=${$e(t?this.rel:void 0)}
        role=${$e(t?void 0:"button")}
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
        ${this.caret?ke` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?ke`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};Ai.styles=[ie,Si],Ai.dependencies={"sl-icon":he,"sl-spinner":Ei},Qt([z(".button")],Ai.prototype,"button",2),Qt([A()],Ai.prototype,"hasFocus",2),Qt([A()],Ai.prototype,"invalid",2),Qt([S()],Ai.prototype,"title",2),Qt([S({reflect:!0})],Ai.prototype,"variant",2),Qt([S({reflect:!0})],Ai.prototype,"size",2),Qt([S({type:Boolean,reflect:!0})],Ai.prototype,"caret",2),Qt([S({type:Boolean,reflect:!0})],Ai.prototype,"disabled",2),Qt([S({type:Boolean,reflect:!0})],Ai.prototype,"loading",2),Qt([S({type:Boolean,reflect:!0})],Ai.prototype,"outline",2),Qt([S({type:Boolean,reflect:!0})],Ai.prototype,"pill",2),Qt([S({type:Boolean,reflect:!0})],Ai.prototype,"circle",2),Qt([S()],Ai.prototype,"type",2),Qt([S()],Ai.prototype,"name",2),Qt([S()],Ai.prototype,"value",2),Qt([S()],Ai.prototype,"href",2),Qt([S()],Ai.prototype,"target",2),Qt([S()],Ai.prototype,"rel",2),Qt([S()],Ai.prototype,"download",2),Qt([S()],Ai.prototype,"form",2),Qt([S({attribute:"formaction"})],Ai.prototype,"formAction",2),Qt([S({attribute:"formenctype"})],Ai.prototype,"formEnctype",2),Qt([S({attribute:"formmethod"})],Ai.prototype,"formMethod",2),Qt([S({attribute:"formnovalidate",type:Boolean})],Ai.prototype,"formNoValidate",2),Qt([S({attribute:"formtarget"})],Ai.prototype,"formTarget",2),Qt([oe("disabled",{waitUntilFirstUpdate:!0})],Ai.prototype,"handleDisabledChange",1),Ai.define("sl-button");var Li=a`
  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,zi=class extends se{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(t){const e=Ti(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--focus",!0)}handleBlur(t){const e=Ti(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--focus",!1)}handleMouseOver(t){const e=Ti(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--hover",!0)}handleMouseOut(t){const e=Ti(t.target);null==e||e.toggleAttribute("data-sl-button-group__button--hover",!1)}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach((e=>{const o=t.indexOf(e),i=Ti(e);i&&(i.toggleAttribute("data-sl-button-group__button",!0),i.toggleAttribute("data-sl-button-group__button--first",0===o),i.toggleAttribute("data-sl-button-group__button--inner",o>0&&o<t.length-1),i.toggleAttribute("data-sl-button-group__button--last",o===t.length-1),i.toggleAttribute("data-sl-button-group__button--radio","sl-radio-button"===i.tagName.toLowerCase()))}))}render(){return Q`
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
    `}};function Ti(t){var e;const o="sl-button, sl-radio-button";return null!=(e=t.closest(o))?e:t.querySelector(o)}zi.styles=[ie,Li],Qt([z("slot")],zi.prototype,"defaultSlot",2),Qt([A()],zi.prototype,"disableRole",2),Qt([S()],zi.prototype,"label",2),zi.define("sl-button-group"),he.define("sl-icon"),Ce.define("sl-icon-button");var Oi=a`
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
`,Pi=new WeakMap;function Mi(t){let e=Pi.get(t);return e||(e=window.getComputedStyle(t,null),Pi.set(t,e)),e}function Di(t){const e=t.tagName.toLowerCase(),o=Number(t.getAttribute("tabindex"));if(t.hasAttribute("tabindex")&&(isNaN(o)||o<=-1))return!1;if(t.hasAttribute("disabled"))return!1;if(t.closest("[inert]"))return!1;if("input"===e&&"radio"===t.getAttribute("type")&&!t.hasAttribute("checked"))return!1;if(!function(t){if("function"==typeof t.checkVisibility)return t.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=Mi(t);return"hidden"!==e.visibility&&"none"!==e.display}(t))return!1;if(("audio"===e||"video"===e)&&t.hasAttribute("controls"))return!0;if(t.hasAttribute("tabindex"))return!0;if(t.hasAttribute("contenteditable")&&"false"!==t.getAttribute("contenteditable"))return!0;return!!["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)||function(t){const e=Mi(t),{overflowY:o,overflowX:i}=e;return"scroll"===o||"scroll"===i||"auto"===o&&"auto"===i&&(t.scrollHeight>t.clientHeight&&"auto"===o||!(!(t.scrollWidth>t.clientWidth)||"auto"!==i))}(t)}function Bi(t){const e=new WeakMap,o=[];return function i(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]"))return;if(e.has(s))return;e.set(s,!0),!o.includes(s)&&Di(s)&&o.push(s),s instanceof HTMLSlotElement&&function(t,e){var o;return(null==(o=t.getRootNode({composed:!0}))?void 0:o.host)!==e}(s,t)&&s.assignedElements({flatten:!0}).forEach((t=>{i(t)})),null!==s.shadowRoot&&"open"===s.shadowRoot.mode&&i(s.shadowRoot)}for(const t of s.children)i(t)}(t),o.sort(((t,e)=>{const o=Number(t.getAttribute("tabindex"))||0;return(Number(e.getAttribute("tabindex"))||0)-o}))}function*Ri(t=document.activeElement){null!=t&&(yield t,"shadowRoot"in t&&t.shadowRoot&&"closed"!==t.shadowRoot.mode&&(yield*ee(Ri(t.shadowRoot.activeElement))))}var Ii=[],Fi=class{constructor(t){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var e;if("Tab"!==t.key||this.isExternalActivated)return;if(!this.isActive())return;const o=[...Ri()].pop();if(this.previousFocus=o,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const i=Bi(this.element);let s=i.findIndex((t=>t===o));this.previousFocus=this.currentFocus;const n="forward"===this.tabDirection?1:-1;for(;;){s+n>=i.length?s=0:s+n<0?s=i.length-1:s+=n,this.previousFocus=this.currentFocus;const o=i[s];if("backward"===this.tabDirection&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;if(o&&this.possiblyHasTabbableChildren(o))return;t.preventDefault(),this.currentFocus=o,null==(e=this.currentFocus)||e.focus({preventScroll:!1});const r=[...Ri()];if(r.includes(this.currentFocus)||!r.includes(this.previousFocus))break}setTimeout((()=>this.checkFocus()))},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=t,this.elementsWithTabbableControls=["iframe"]}activate(){Ii.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){Ii=Ii.filter((t=>t!==this.element)),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return Ii[Ii.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const t=Bi(this.element);if(!this.element.matches(":focus-within")){const e=t[0],o=t[t.length-1],i="forward"===this.tabDirection?e:o;"function"==typeof(null==i?void 0:i.focus)&&(this.currentFocus=i,i.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(t){return this.elementsWithTabbableControls.includes(t.tagName.toLowerCase())||t.hasAttribute("controls")}};var Ni=new Set;function Ui(t){if(Ni.add(t),!document.documentElement.classList.contains("sl-scroll-lock")){const t=function(){const t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}()+function(){const t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}();document.documentElement.classList.add("sl-scroll-lock"),document.documentElement.style.setProperty("--sl-scroll-lock-size",`${t}px`)}}function Vi(t){Ni.delete(t),0===Ni.size&&(document.documentElement.classList.remove("sl-scroll-lock"),document.documentElement.style.removeProperty("--sl-scroll-lock-size"))}function Hi(t,e,o="vertical",i="smooth"){const s=function(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}(t,e),n=s.top+e.scrollTop,r=s.left+e.scrollLeft,a=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,d=e.scrollTop+e.offsetHeight;"horizontal"!==o&&"both"!==o||(r<a?e.scrollTo({left:r,behavior:i}):r+t.clientWidth>l&&e.scrollTo({left:r-e.offsetWidth+t.clientWidth,behavior:i})),"vertical"!==o&&"both"!==o||(n<c?e.scrollTo({top:n,behavior:i}):n+t.clientHeight>d&&e.scrollTo({top:n-e.offsetHeight+t.clientHeight,behavior:i}))}function Wi(t){return t.charAt(0).toUpperCase()+t.slice(1)}var ji=class extends se{constructor(){super(...arguments),this.hasSlotController=new Ye(this,"footer"),this.localize=new Ke(this),this.modal=new Fi(this),this.open=!1,this.label="",this.placement="end",this.contained=!1,this.noHeader=!1,this.handleDocumentKeyDown=t=>{this.contained||"Escape"===t.key&&this.modal.isActive()&&this.open&&(t.stopImmediatePropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.drawer.hidden=!this.open,this.open&&(this.addOpenListeners(),this.contained||(this.modal.activate(),Ui(this)))}disconnectedCallback(){var t;super.disconnectedCallback(),Vi(this),null==(t=this.closeWatcher)||t.destroy()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const t=ze(this,"drawer.denyClose",{dir:this.localize.dir()});Oe(this.panel,t.keyframes,t.options)}else this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.contained||(this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard"))):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;document.removeEventListener("keydown",this.handleDocumentKeyDown),null==(t=this.closeWatcher)||t.destroy()}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.contained||(this.modal.activate(),Ui(this));const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([De(this.drawer),De(this.overlay)]),this.drawer.hidden=!1,requestAnimationFrame((()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")}));const e=ze(this,`drawer.show${Wi(this.placement)}`,{dir:this.localize.dir()}),o=ze(this,"drawer.overlay.show",{dir:this.localize.dir()});await Promise.all([Oe(this.panel,e.keyframes,e.options),Oe(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.contained||(this.modal.deactivate(),Vi(this)),await Promise.all([De(this.drawer),De(this.overlay)]);const t=ze(this,`drawer.hide${Wi(this.placement)}`,{dir:this.localize.dir()}),e=ze(this,"drawer.overlay.hide",{dir:this.localize.dir()});await Promise.all([Oe(this.overlay,e.keyframes,e.options).then((()=>{this.overlay.hidden=!0})),Oe(this.panel,t.keyframes,t.options).then((()=>{this.panel.hidden=!0}))]),this.drawer.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1;const o=this.originalTrigger;"function"==typeof(null==o?void 0:o.focus)&&setTimeout((()=>o.focus())),this.emit("sl-after-hide")}}handleNoModalChange(){this.open&&!this.contained&&(this.modal.activate(),Ui(this)),this.open&&this.contained&&(this.modal.deactivate(),Vi(this))}async show(){if(!this.open)return this.open=!0,Te(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Te(this,"sl-after-hide")}render(){return Q`
      <div
        part="base"
        class=${ve({drawer:!0,"drawer--open":this.open,"drawer--top":"top"===this.placement,"drawer--end":"end"===this.placement,"drawer--bottom":"bottom"===this.placement,"drawer--start":"start"===this.placement,"drawer--contained":this.contained,"drawer--fixed":!this.contained,"drawer--rtl":"rtl"===this.localize.dir(),"drawer--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="drawer__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${$e(this.noHeader?this.label:void 0)}
          aria-labelledby=${$e(this.noHeader?void 0:"title")}
          tabindex="0"
        >
          ${this.noHeader?"":Q`
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
    `}};ji.styles=[ie,Oi],ji.dependencies={"sl-icon-button":Ce},Qt([z(".drawer")],ji.prototype,"drawer",2),Qt([z(".drawer__panel")],ji.prototype,"panel",2),Qt([z(".drawer__overlay")],ji.prototype,"overlay",2),Qt([S({type:Boolean,reflect:!0})],ji.prototype,"open",2),Qt([S({reflect:!0})],ji.prototype,"label",2),Qt([S({reflect:!0})],ji.prototype,"placement",2),Qt([S({type:Boolean,reflect:!0})],ji.prototype,"contained",2),Qt([S({attribute:"no-header",type:Boolean,reflect:!0})],ji.prototype,"noHeader",2),Qt([oe("open",{waitUntilFirstUpdate:!0})],ji.prototype,"handleOpenChange",1),Qt([oe("contained",{waitUntilFirstUpdate:!0})],ji.prototype,"handleNoModalChange",1),Le("drawer.showTop",{keyframes:[{opacity:0,translate:"0 -100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}}),Le("drawer.hideTop",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 -100%"}],options:{duration:250,easing:"ease"}}),Le("drawer.showEnd",{keyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}}),Le("drawer.hideEnd",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],options:{duration:250,easing:"ease"}}),Le("drawer.showBottom",{keyframes:[{opacity:0,translate:"0 100%"},{opacity:1,translate:"0 0"}],options:{duration:250,easing:"ease"}}),Le("drawer.hideBottom",{keyframes:[{opacity:1,translate:"0 0"},{opacity:0,translate:"0 100%"}],options:{duration:250,easing:"ease"}}),Le("drawer.showStart",{keyframes:[{opacity:0,translate:"-100%"},{opacity:1,translate:"0"}],rtlKeyframes:[{opacity:0,translate:"100%"},{opacity:1,translate:"0"}],options:{duration:250,easing:"ease"}}),Le("drawer.hideStart",{keyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"-100%"}],rtlKeyframes:[{opacity:1,translate:"0"},{opacity:0,translate:"100%"}],options:{duration:250,easing:"ease"}}),Le("drawer.denyClose",{keyframes:[{scale:1},{scale:1.01},{scale:1}],options:{duration:250}}),Le("drawer.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),Le("drawer.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}}),ji.define("sl-drawer");var qi=a`
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
`,Ki=class extends se{constructor(){super(...arguments),this.localize=new Ke(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=t=>{this.open&&"Escape"===t.key&&(t.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=t=>{var e;if("Escape"===t.key&&this.open&&!this.closeWatcher)return t.stopPropagation(),this.focusOnTrigger(),void this.hide();if("Tab"===t.key){if(this.open&&"sl-menu-item"===(null==(e=document.activeElement)?void 0:e.tagName.toLowerCase()))return t.preventDefault(),this.hide(),void this.focusOnTrigger();setTimeout((()=>{var t,e,o;const i=(null==(t=this.containingElement)?void 0:t.getRootNode())instanceof ShadowRoot?null==(o=null==(e=document.activeElement)?void 0:e.shadowRoot)?void 0:o.activeElement:document.activeElement;this.containingElement&&(null==i?void 0:i.closest(this.containingElement.tagName.toLowerCase()))===this.containingElement||this.hide()}))}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=t=>{const e=t.target;this.stayOpenOnSelect||"sl-menu"!==e.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const t=this.trigger.assignedElements({flatten:!0})[0];"function"==typeof(null==t?void 0:t.focus)&&t.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find((t=>"sl-menu"===t.tagName.toLowerCase()))}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(t){if([" ","Enter"].includes(t.key))return t.preventDefault(),void this.handleTriggerClick();const e=this.getMenu();if(e){const o=e.getAllItems(),i=o[0],s=o[o.length-1];["ArrowDown","ArrowUp","Home","End"].includes(t.key)&&(t.preventDefault(),this.open||(this.show(),await this.updateComplete),o.length>0&&this.updateComplete.then((()=>{"ArrowDown"!==t.key&&"Home"!==t.key||(e.setCurrentItem(i),i.focus()),"ArrowUp"!==t.key&&"End"!==t.key||(e.setCurrentItem(s),s.focus())})))}}handleTriggerKeyUp(t){" "===t.key&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find((t=>function(t){var e,o;const i=Bi(t);return{start:null!=(e=i[0])?e:null,end:null!=(o=i[i.length-1])?o:null}}(t).start));let e;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":e=t.button;break;default:e=t}e.setAttribute("aria-haspopup","true"),e.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,Te(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Te(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var t;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var t;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),null==(t=this.closeWatcher)||t.destroy()}async handleOpenChange(){if(this.disabled)this.open=!1;else if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await De(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:t,options:e}=ze(this,"dropdown.show",{dir:this.localize.dir()});await Oe(this.popup.popup,t,e),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await De(this);const{keyframes:t,options:e}=ze(this,"dropdown.hide",{dir:this.localize.dir()});await Oe(this.popup.popup,t,e),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return Q`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${$e(this.sync?this.sync:void 0)}
        class=${ve({dropdown:!0,"dropdown--open":this.open})}
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
    `}};Ki.styles=[ie,qi],Ki.dependencies={"sl-popup":ki},Qt([z(".dropdown")],Ki.prototype,"popup",2),Qt([z(".dropdown__trigger")],Ki.prototype,"trigger",2),Qt([z(".dropdown__panel")],Ki.prototype,"panel",2),Qt([S({type:Boolean,reflect:!0})],Ki.prototype,"open",2),Qt([S({reflect:!0})],Ki.prototype,"placement",2),Qt([S({type:Boolean,reflect:!0})],Ki.prototype,"disabled",2),Qt([S({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],Ki.prototype,"stayOpenOnSelect",2),Qt([S({attribute:!1})],Ki.prototype,"containingElement",2),Qt([S({type:Number})],Ki.prototype,"distance",2),Qt([S({type:Number})],Ki.prototype,"skidding",2),Qt([S({type:Boolean})],Ki.prototype,"hoist",2),Qt([S({reflect:!0})],Ki.prototype,"sync",2),Qt([oe("open",{waitUntilFirstUpdate:!0})],Ki.prototype,"handleOpenChange",1),Le("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),Le("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}}),Ki.define("sl-dropdown");var Yi=a`
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
`,Xi=class extends se{constructor(){super(...arguments),this.hasSlotController=new Ye(this,"footer"),this.localize=new Ke(this),this.modal=new Fi(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=t=>{"Escape"===t.key&&this.modal.isActive()&&this.open&&(t.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),Ui(this))}disconnectedCallback(){var t;super.disconnectedCallback(),this.modal.deactivate(),Vi(this),null==(t=this.closeWatcher)||t.destroy()}requestClose(t){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:t}}).defaultPrevented){const t=ze(this,"dialog.denyClose",{dir:this.localize.dir()});Oe(this.panel,t.keyframes,t.options)}else this.hide()}addOpenListeners(){var t;"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>this.requestClose("keyboard")):document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){var t;null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),Ui(this);const t=this.querySelector("[autofocus]");t&&t.removeAttribute("autofocus"),await Promise.all([De(this.dialog),De(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame((()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(t?t.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),t&&t.setAttribute("autofocus","")}));const e=ze(this,"dialog.show",{dir:this.localize.dir()}),o=ze(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([Oe(this.panel,e.keyframes,e.options),Oe(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([De(this.dialog),De(this.overlay)]);const t=ze(this,"dialog.hide",{dir:this.localize.dir()}),e=ze(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([Oe(this.overlay,e.keyframes,e.options).then((()=>{this.overlay.hidden=!0})),Oe(this.panel,t.keyframes,t.options).then((()=>{this.panel.hidden=!0}))]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,Vi(this);const o=this.originalTrigger;"function"==typeof(null==o?void 0:o.focus)&&setTimeout((()=>o.focus())),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,Te(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Te(this,"sl-after-hide")}render(){return Q`
      <div
        part="base"
        class=${ve({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${$e(this.noHeader?this.label:void 0)}
          aria-labelledby=${$e(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":Q`
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
    `}};Xi.styles=[ie,Yi],Xi.dependencies={"sl-icon-button":Ce},Qt([z(".dialog")],Xi.prototype,"dialog",2),Qt([z(".dialog__panel")],Xi.prototype,"panel",2),Qt([z(".dialog__overlay")],Xi.prototype,"overlay",2),Qt([S({type:Boolean,reflect:!0})],Xi.prototype,"open",2),Qt([S({reflect:!0})],Xi.prototype,"label",2),Qt([S({attribute:"no-header",type:Boolean,reflect:!0})],Xi.prototype,"noHeader",2),Qt([oe("open",{waitUntilFirstUpdate:!0})],Xi.prototype,"handleOpenChange",1),Le("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}}),Le("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}}),Le("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}}),Le("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}}),Le("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}}),Xi.define("sl-dialog"),Ei.define("sl-spinner");var Zi=a`
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
`,Ji=class extends se{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(t){const e=["menuitem","menuitemcheckbox"],o=t.composedPath().find((t=>{var o;return e.includes((null==(o=null==t?void 0:t.getAttribute)?void 0:o.call(t,"role"))||"")}));if(!o)return;const i=o;"checkbox"===i.type&&(i.checked=!i.checked),this.emit("sl-select",{detail:{item:i}})}handleKeyDown(t){if("Enter"===t.key||" "===t.key){const e=this.getCurrentItem();t.preventDefault(),t.stopPropagation(),null==e||e.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(t.key)){const e=this.getAllItems(),o=this.getCurrentItem();let i=o?e.indexOf(o):0;e.length>0&&(t.preventDefault(),t.stopPropagation(),"ArrowDown"===t.key?i++:"ArrowUp"===t.key?i--:"Home"===t.key?i=0:"End"===t.key&&(i=e.length-1),i<0&&(i=e.length-1),i>e.length-1&&(i=0),this.setCurrentItem(e[i]),e[i].focus())}}handleMouseDown(t){const e=t.target;this.isMenuItem(e)&&this.setCurrentItem(e)}handleSlotChange(){const t=this.getAllItems();t.length>0&&this.setCurrentItem(t[0])}isMenuItem(t){var e;return"sl-menu-item"===t.tagName.toLowerCase()||["menuitem","menuitemcheckbox","menuitemradio"].includes(null!=(e=t.getAttribute("role"))?e:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter((t=>!(t.inert||!this.isMenuItem(t))))}getCurrentItem(){return this.getAllItems().find((t=>"0"===t.getAttribute("tabindex")))}setCurrentItem(t){this.getAllItems().forEach((e=>{e.setAttribute("tabindex",e===t?"0":"-1")}))}render(){return Q`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Ji.styles=[ie,Zi],Qt([z("slot")],Ji.prototype,"defaultSlot",2),Ji.define("sl-menu");var Gi=a`
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
`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;const Qi=(t,e)=>{const o=t._$AN;if(void 0===o)return!1;for(const t of o)t._$AO?.(e,!1),Qi(t,e);return!0},ts=t=>{let e,o;do{if(void 0===(e=t._$AM))break;o=e._$AN,o.delete(t),t=e}while(0===o?.size)},es=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(void 0===o)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),ss(e)}};function os(t){void 0!==this._$AN?(ts(this),this._$AM=t,es(this)):this._$AM=t}function is(t,e=!1,o=0){const i=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(e)if(Array.isArray(i))for(let t=o;t<i.length;t++)Qi(i[t],!1),ts(i[t]);else null!=i&&(Qi(i,!1),ts(i));else Qi(this,t)}const ss=t=>{t.type==pe&&(t._$AP??=is,t._$AQ??=os)};class ns extends ge{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,o){super._$AT(t,e,o),es(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Qi(this,t),ts(this))}setValue(t){if(ne(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rs{}const as=new WeakMap,ls=be(class extends ns{render(t){return et}update(t,[e]){const o=e!==this.Y;return o&&void 0!==this.Y&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.Y=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),et}rt(t){if("function"==typeof this.Y){const e=this.ht??globalThis;let o=as.get(e);void 0===o&&(o=new WeakMap,as.set(e,o)),void 0!==o.get(this.Y)&&this.Y.call(this.ht,void 0),o.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){return"function"==typeof this.Y?as.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var cs=class{constructor(t,e,o){this.popupRef=new rs,this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=t=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${t.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${t.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=t=>{switch(t.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":t.target!==this.host&&(t.preventDefault(),t.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(t)}},this.handleClick=t=>{var e;t.target===this.host?(t.preventDefault(),t.stopPropagation()):t.target instanceof Element&&("sl-menu-item"===t.target.tagName||(null==(e=t.target.role)?void 0:e.startsWith("menuitem")))&&this.disableSubmenu()},this.handleFocusOut=t=>{t.relatedTarget&&t.relatedTarget instanceof Element&&this.host.contains(t.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=t=>{t.stopPropagation()},this.handlePopupReposition=()=>{const t=this.host.renderRoot.querySelector("slot[name='submenu']"),e=null==t?void 0:t.assignedElements({flatten:!0}).filter((t=>"sl-menu"===t.localName))[0],o="rtl"===this.localize.dir();if(!e)return;const{left:i,top:s,width:n,height:r}=e.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${o?i+n:i}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${s}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${o?i+n:i}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${s+r}px`)},(this.host=t).addController(this),this.hasSlotController=e,this.localize=o}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(t){const e=this.host.renderRoot.querySelector("slot[name='submenu']");if(!e)return void console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);let o=null;for(const t of e.assignedElements())if(o=t.querySelectorAll("sl-menu-item, [role^='menuitem']"),0!==o.length)break;if(o&&0!==o.length){o[0].setAttribute("tabindex","0");for(let t=1;t!==o.length;++t)o[t].setAttribute("tabindex","-1");this.popupRef.value&&(t.preventDefault(),t.stopPropagation(),this.popupRef.value.active?o[0]instanceof HTMLElement&&o[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then((()=>{o[0]instanceof HTMLElement&&o[0].focus()})),this.host.requestUpdate()))}}setSubmenuState(t){this.popupRef.value&&this.popupRef.value.active!==t&&(this.popupRef.value.active=t,this.host.requestUpdate())}enableSubmenu(t=!0){t?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout((()=>{this.setSubmenuState(!0)}),this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var t;if(!(null==(t=this.host.parentElement)?void 0:t.computedStyleMap))return;const e=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce(((t,o)=>{var i;const s=null!=(i=e.get(o))?i:new CSSUnitValue(0,"px");return t-(s instanceof CSSUnitValue?s:new CSSUnitValue(0,"px")).to("px").value}),0);this.skidding=o}isExpanded(){return!!this.popupRef.value&&this.popupRef.value.active}renderSubmenu(){const t="ltr"===this.localize.dir();return this.isConnected?Q`
      <sl-popup
        ${ls(this.popupRef)}
        placement=${t?"right-start":"left-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:Q` <slot name="submenu" hidden></slot> `}},ds=class extends se{constructor(){super(...arguments),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.localize=new Ke(this),this.hasSlotController=new Ye(this,"submenu"),this.submenuController=new cs(this,this.hasSlotController,this.localize),this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleMouseOver=t=>{this.focus(),t.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const t=this.getTextLabel();void 0!==this.cachedTextLabel?t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1})):this.cachedTextLabel=t}handleCheckedChange(){if(this.checked&&"checkbox"!==this.type)return this.checked=!1,void console.error('The checked attribute can only be used on menu items with type="checkbox"',this);"checkbox"===this.type?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){"checkbox"===this.type?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return function(t){if(!t)return"";const e=t.assignedNodes({flatten:!0});let o="";return[...e].forEach((t=>{t.nodeType===Node.TEXT_NODE&&(o+=t.textContent)})),o}(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const t="rtl"===this.localize.dir(),e=this.submenuController.isExpanded();return Q`
      <div
        id="anchor"
        part="base"
        class=${ve({"menu-item":!0,"menu-item--rtl":t,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":e})}
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
        ${this.loading?Q` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};ds.styles=[ie,Gi],ds.dependencies={"sl-icon":he,"sl-popup":ki,"sl-spinner":Ei},Qt([z("slot:not([name])")],ds.prototype,"defaultSlot",2),Qt([z(".menu-item")],ds.prototype,"menuItem",2),Qt([S()],ds.prototype,"type",2),Qt([S({type:Boolean,reflect:!0})],ds.prototype,"checked",2),Qt([S()],ds.prototype,"value",2),Qt([S({type:Boolean,reflect:!0})],ds.prototype,"loading",2),Qt([S({type:Boolean,reflect:!0})],ds.prototype,"disabled",2),Qt([oe("checked")],ds.prototype,"handleCheckedChange",1),Qt([oe("disabled")],ds.prototype,"handleDisabledChange",1),Qt([oe("type")],ds.prototype,"handleTypeChange",1),ds.define("sl-menu-item");var hs=a`
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
`,us=class extends se{constructor(){super(...arguments),this.localize=new Ke(this),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){this.emit("sl-remove")}render(){return Q`
      <span
        part="base"
        class=${ve({tag:!0,"tag--primary":"primary"===this.variant,"tag--success":"success"===this.variant,"tag--neutral":"neutral"===this.variant,"tag--warning":"warning"===this.variant,"tag--danger":"danger"===this.variant,"tag--text":"text"===this.variant,"tag--small":"small"===this.size,"tag--medium":"medium"===this.size,"tag--large":"large"===this.size,"tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable?Q`
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
    `}};us.styles=[ie,hs],us.dependencies={"sl-icon-button":Ce},Qt([S({reflect:!0})],us.prototype,"variant",2),Qt([S({reflect:!0})],us.prototype,"size",2),Qt([S({type:Boolean,reflect:!0})],us.prototype,"pill",2),Qt([S({type:Boolean})],us.prototype,"removable",2);var ps=a`
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

  /* Prefix */
  .select__prefix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
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
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;class ms extends ge{constructor(t){if(super(t),this.it=et,t.type!==pe)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===et||null==t)return this._t=void 0,this.it=t;if(t===tt)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}ms.directiveName="unsafeHTML",ms.resultType=1;const fs=be(ms);var bs=class extends se{constructor(){super(...arguments),this.formControlController=new ro(this,{assumeInteractionOn:["sl-blur","sl-input"]}),this.hasSlotController=new Ye(this,"help-text","label"),this.localize=new Ke(this),this.typeToSelectString="",this.hasFocus=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this.value="",this.defaultValue="",this.size="medium",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.clearable=!1,this.open=!1,this.hoist=!1,this.filled=!1,this.pill=!1,this.label="",this.placement="bottom",this.helpText="",this.form="",this.required=!1,this.getTag=t=>Q`
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
    `,this.handleDocumentFocusIn=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()},this.handleDocumentKeyDown=t=>{const e=t.target,o=null!==e.closest(".select__clear"),i=null!==e.closest("sl-icon-button");if(!o&&!i){if("Escape"===t.key&&this.open&&!this.closeWatcher&&(t.preventDefault(),t.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),"Enter"===t.key||" "===t.key&&""===this.typeToSelectString)return t.preventDefault(),t.stopImmediatePropagation(),this.open?void(this.currentOption&&!this.currentOption.disabled&&(this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then((()=>{this.emit("sl-input"),this.emit("sl-change")})),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))):void this.show();if(["ArrowUp","ArrowDown","Home","End"].includes(t.key)){const e=this.getAllOptions(),o=e.indexOf(this.currentOption);let i=Math.max(0,o);if(t.preventDefault(),!this.open&&(this.show(),this.currentOption))return;"ArrowDown"===t.key?(i=o+1,i>e.length-1&&(i=0)):"ArrowUp"===t.key?(i=o-1,i<0&&(i=e.length-1)):"Home"===t.key?i=0:"End"===t.key&&(i=e.length-1),this.setCurrentOption(e[i])}if(1===t.key.length||"Backspace"===t.key){const e=this.getAllOptions();if(t.metaKey||t.ctrlKey||t.altKey)return;if(!this.open){if("Backspace"===t.key)return;this.show()}t.stopPropagation(),t.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout((()=>this.typeToSelectString=""),1e3),"Backspace"===t.key?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=t.key.toLowerCase();for(const t of e){if(t.getTextLabel().toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(t);break}}}}},this.handleDocumentMouseDown=t=>{const e=t.composedPath();this&&!e.includes(this)&&this.hide()}}get validity(){return this.valueInput.validity}get validationMessage(){return this.valueInput.validationMessage}connectedCallback(){super.connectedCallback(),this.open=!1}addOpenListeners(){var t;document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn),"CloseWatcher"in window&&(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.open&&(this.hide(),this.displayInput.focus({preventScroll:!0}))})}removeOpenListeners(){var t;document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn),null==(t=this.closeWatcher)||t.destroy()}handleFocus(){this.hasFocus=!0,this.displayInput.setSelectionRange(0,0),this.emit("sl-focus")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleLabelClick(){this.displayInput.focus()}handleComboboxMouseDown(t){const e=t.composedPath().some((t=>t instanceof Element&&"sl-icon-button"===t.tagName.toLowerCase()));this.disabled||e||(t.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(t){"Tab"!==t.key&&(t.stopPropagation(),this.handleDocumentKeyDown(t))}handleClearClick(t){t.stopPropagation(),""!==this.value&&(this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then((()=>{this.emit("sl-clear"),this.emit("sl-input"),this.emit("sl-change")})))}handleClearMouseDown(t){t.stopPropagation(),t.preventDefault()}handleOptionClick(t){const e=t.target.closest("sl-option"),o=this.value;e&&!e.disabled&&(this.multiple?this.toggleOptionSelection(e):this.setSelectedOptions(e),this.updateComplete.then((()=>this.displayInput.focus({preventScroll:!0}))),this.value!==o&&this.updateComplete.then((()=>{this.emit("sl-input"),this.emit("sl-change")})),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value],o=[];customElements.get("sl-option")?(t.forEach((t=>o.push(t.value))),this.setSelectedOptions(t.filter((t=>e.includes(t.value))))):customElements.whenDefined("sl-option").then((()=>this.handleDefaultSlotChange()))}handleTagRemove(t,e){t.stopPropagation(),this.disabled||(this.toggleOptionSelection(e,!1),this.updateComplete.then((()=>{this.emit("sl-input"),this.emit("sl-change")})))}getAllOptions(){return[...this.querySelectorAll("sl-option")]}getFirstOption(){return this.querySelector("sl-option")}setCurrentOption(t){this.getAllOptions().forEach((t=>{t.current=!1,t.tabIndex=-1})),t&&(this.currentOption=t,t.current=!0,t.tabIndex=0,t.focus())}setSelectedOptions(t){const e=this.getAllOptions(),o=Array.isArray(t)?t:[t];e.forEach((t=>t.selected=!1)),o.length&&o.forEach((t=>t.selected=!0)),this.selectionChanged()}toggleOptionSelection(t,e){t.selected=!0===e||!1===e?e:!t.selected,this.selectionChanged()}selectionChanged(){var t,e,o,i;this.selectedOptions=this.getAllOptions().filter((t=>t.selected)),this.multiple?(this.value=this.selectedOptions.map((t=>t.value)),this.placeholder&&0===this.value.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length)):(this.value=null!=(e=null==(t=this.selectedOptions[0])?void 0:t.value)?e:"",this.displayLabel=null!=(i=null==(o=this.selectedOptions[0])?void 0:o.getTextLabel())?i:""),this.updateComplete.then((()=>{this.formControlController.updateValidity()}))}get tags(){return this.selectedOptions.map(((t,e)=>{if(e<this.maxOptionsVisible||this.maxOptionsVisible<=0){const o=this.getTag(t,e);return Q`<div @sl-remove=${e=>this.handleTagRemove(e,t)}>
          ${"string"==typeof o?fs(o):o}
        </div>`}return e===this.maxOptionsVisible?Q`<sl-tag size=${this.size}>+${this.selectedOptions.length-e}</sl-tag>`:Q``}))}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleDisabledChange(){this.disabled&&(this.open=!1,this.handleOpenChange())}handleValueChange(){const t=this.getAllOptions(),e=Array.isArray(this.value)?this.value:[this.value];this.setSelectedOptions(t.filter((t=>e.includes(t.value))))}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption()),this.emit("sl-show"),this.addOpenListeners(),await De(this),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame((()=>{this.setCurrentOption(this.currentOption)}));const{keyframes:t,options:e}=ze(this,"select.show",{dir:this.localize.dir()});await Oe(this.popup.popup,t,e),this.currentOption&&Hi(this.currentOption,this.listbox,"vertical","auto"),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await De(this);const{keyframes:t,options:e}=ze(this,"select.hide",{dir:this.localize.dir()});await Oe(this.popup.popup,t,e),this.listbox.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}async show(){if(!this.open&&!this.disabled)return this.open=!0,Te(this,"sl-after-show");this.open=!1}async hide(){if(this.open&&!this.disabled)return this.open=!1,Te(this,"sl-after-hide");this.open=!1}checkValidity(){return this.valueInput.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.valueInput.reportValidity()}setCustomValidity(t){this.valueInput.setCustomValidity(t),this.formControlController.updateValidity()}focus(t){this.displayInput.focus(t)}blur(){this.displayInput.blur()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text"),o=!!this.label||!!t,i=!!this.helpText||!!e,s=this.clearable&&!this.disabled&&this.value.length>0,n=this.placeholder&&0===this.value.length;return Q`
      <div
        part="form-control"
        class=${ve({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-label":o,"form-control--has-help-text":i})}
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
            class=${ve({select:!0,"select--standard":!0,"select--filled":this.filled,"select--pill":this.pill,"select--open":this.open,"select--disabled":this.disabled,"select--multiple":this.multiple,"select--focused":this.hasFocus,"select--placeholder-visible":n,"select--top":"top"===this.placement,"select--bottom":"bottom"===this.placement,"select--small":"small"===this.size,"select--medium":"medium"===this.size,"select--large":"large"===this.size})}
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

              ${this.multiple?Q`<div part="tags" class="select__tags">${this.tags}</div>`:""}

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

              ${s?Q`
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
    `}};bs.styles=[ie,to,ps],bs.dependencies={"sl-icon":he,"sl-popup":ki,"sl-tag":us},Qt([z(".select")],bs.prototype,"popup",2),Qt([z(".select__combobox")],bs.prototype,"combobox",2),Qt([z(".select__display-input")],bs.prototype,"displayInput",2),Qt([z(".select__value-input")],bs.prototype,"valueInput",2),Qt([z(".select__listbox")],bs.prototype,"listbox",2),Qt([A()],bs.prototype,"hasFocus",2),Qt([A()],bs.prototype,"displayLabel",2),Qt([A()],bs.prototype,"currentOption",2),Qt([A()],bs.prototype,"selectedOptions",2),Qt([S()],bs.prototype,"name",2),Qt([S({converter:{fromAttribute:t=>t.split(" "),toAttribute:t=>t.join(" ")}})],bs.prototype,"value",2),Qt([Qe()],bs.prototype,"defaultValue",2),Qt([S({reflect:!0})],bs.prototype,"size",2),Qt([S()],bs.prototype,"placeholder",2),Qt([S({type:Boolean,reflect:!0})],bs.prototype,"multiple",2),Qt([S({attribute:"max-options-visible",type:Number})],bs.prototype,"maxOptionsVisible",2),Qt([S({type:Boolean,reflect:!0})],bs.prototype,"disabled",2),Qt([S({type:Boolean})],bs.prototype,"clearable",2),Qt([S({type:Boolean,reflect:!0})],bs.prototype,"open",2),Qt([S({type:Boolean})],bs.prototype,"hoist",2),Qt([S({type:Boolean,reflect:!0})],bs.prototype,"filled",2),Qt([S({type:Boolean,reflect:!0})],bs.prototype,"pill",2),Qt([S()],bs.prototype,"label",2),Qt([S({reflect:!0})],bs.prototype,"placement",2),Qt([S({attribute:"help-text"})],bs.prototype,"helpText",2),Qt([S({reflect:!0})],bs.prototype,"form",2),Qt([S({type:Boolean,reflect:!0})],bs.prototype,"required",2),Qt([S()],bs.prototype,"getTag",2),Qt([oe("disabled",{waitUntilFirstUpdate:!0})],bs.prototype,"handleDisabledChange",1),Qt([oe("value",{waitUntilFirstUpdate:!0})],bs.prototype,"handleValueChange",1),Qt([oe("open",{waitUntilFirstUpdate:!0})],bs.prototype,"handleOpenChange",1),Le("select.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}}),Le("select.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}}),bs.define("sl-select");var gs=a`
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
`,vs=class extends se{constructor(){super(...arguments),this.localize=new Ke(this),this.current=!1,this.selected=!1,this.hasHover=!1,this.value="",this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false")}handleDefaultSlotChange(){const t=this.getTextLabel();void 0!==this.cachedTextLabel?t!==this.cachedTextLabel&&(this.cachedTextLabel=t,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1})):this.cachedTextLabel=t}handleMouseEnter(){this.hasHover=!0}handleMouseLeave(){this.hasHover=!1}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleValueChange(){"string"!=typeof this.value&&(this.value=String(this.value)),this.value.includes(" ")&&(console.error("Option values cannot include a space. All spaces have been replaced with underscores.",this),this.value=this.value.replace(/ /g,"_"))}getTextLabel(){const t=this.childNodes;let e="";return[...t].forEach((t=>{t.nodeType===Node.ELEMENT_NODE&&(t.hasAttribute("slot")||(e+=t.textContent)),t.nodeType===Node.TEXT_NODE&&(e+=t.textContent)})),e.trim()}render(){return Q`
      <div
        part="base"
        class=${ve({option:!0,"option--current":this.current,"option--disabled":this.disabled,"option--selected":this.selected,"option--hover":this.hasHover})}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `}};vs.styles=[ie,gs],vs.dependencies={"sl-icon":he},Qt([z(".option__label")],vs.prototype,"defaultSlot",2),Qt([A()],vs.prototype,"current",2),Qt([A()],vs.prototype,"selected",2),Qt([A()],vs.prototype,"hasHover",2),Qt([S({reflect:!0})],vs.prototype,"value",2),Qt([S({type:Boolean,reflect:!0})],vs.prototype,"disabled",2),Qt([oe("disabled")],vs.prototype,"handleDisabledChange",1),Qt([oe("selected")],vs.prototype,"handleSelectedChange",1),Qt([oe("value")],vs.prototype,"handleValueChange",1),vs.define("sl-option");
// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0
const ys=import.meta.url;function ws(t){t.matches&&document.documentElement.classList.add("sl-theme-dark"),t.onchange=t=>{t.matches?document.documentElement.classList.add("sl-theme-dark"):document.documentElement.classList.remove("sl-theme-dark")}}Dt(ys.slice(0,ys.lastIndexOf("/")+1)),async function(){if("serviceWorker"in navigator)try{const t=document.getElementById("home-button").href;await navigator.serviceWorker.register(t+"sw.js",{scope:"/"})}catch(t){console.error(`Service worker registration failed with ${t}`)}}(),function(){const t=document.getElementById("nav-toggle"),e=document.getElementById("nav-drawer"),o=document.getElementById("content");t&&e&&o&&(Number(localStorage.getItem("nav-open"))?(e.show(),o.classList.add("nav-open")):(e.hide(),o.classList.remove("nav-open")),t.addEventListener("click",(function(){e.open?(e.hide(),o.classList.remove("nav-open"),localStorage.setItem("nav-open","0")):(e.show(),o.classList.add("nav-open"),localStorage.setItem("nav-open","1"))})))}(),function(){const t=document.getElementById("login-dialog"),e=document.getElementById("login-dialog-open");t&&e&&e.addEventListener("click",(function(){t.show()}))}(),function(){const t=document.getElementById("color-mode-toggle");if(!t)return;const e=localStorage.getItem("color-mode")??"circle-half",o=window.matchMedia("(prefers-color-scheme: dark)");switch(e){case"circle-half":ws(o);break;case"moon":document.documentElement.classList.add("sl-theme-dark");break;case"sun":document.documentElement.classList.remove("sl-theme-dark")}t.name=e,t.addEventListener("click",(function(){switch(t.name){case"circle-half":{document.documentElement.classList.add("sl-theme-dark");const e="moon";t.name=e,localStorage.setItem("color-mode",e),o.onchange=null;break}case"moon":{document.documentElement.classList.remove("sl-theme-dark");const e="sun";t.name=e,localStorage.setItem("color-mode",e),o.onchange=null;break}case"sun":{document.documentElement.classList.remove("sl-theme-dark");const e="circle-half";t.name=e,localStorage.setItem("color-mode",e),ws(o);break}}}))}(),function(){const t=document.getElementsByClassName("form-submit-button");Array.from(t).forEach((t=>{const e=t.parentElement;"FORM"===e?.tagName&&t.addEventListener("click",(function(){e.checkValidity()&&(t.disabled=!0,t.loading=!0)}))}))}();
// @license-end
