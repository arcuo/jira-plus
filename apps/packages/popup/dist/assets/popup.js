function v(){}function I(e){return e()}function V(){return Object.create(null)}function A(e){e.forEach(I)}function K(e){return"function"==typeof e}function F(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let O,M;function X(e,t){return O||(O=document.createElement("a")),O.href=t,e===O.href}function Y(e){return 0===Object.keys(e).length}function c(e,t){e.appendChild(t)}function z(e,t,n){e.insertBefore(t,n||null)}function P(e){e.parentNode&&e.parentNode.removeChild(e)}function a(e){return document.createElement(e)}function j(e){return document.createTextNode(e)}function x(){return j(" ")}function Z(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function f(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ee(e){return Array.from(e.childNodes)}function te(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function w(e){M=e}!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const $=[],B=[],S=[],H=[],ne=Promise.resolve();let q=!1;function re(){q||(q=!0,ne.then(D))}function k(e){S.push(e)}const N=new Set;let _=0;function D(){if(0!==_)return;const e=M;do{try{for(;_<$.length;){const e=$[_];_++,w(e),oe(e.$$)}}catch(e){throw $.length=0,_=0,e}for(w(null),$.length=0,_=0;B.length;)B.pop()();for(let e=0;e<S.length;e+=1){const t=S[e];N.has(t)||(N.add(t),t())}S.length=0}while($.length);for(;H.length;)H.pop()();q=!1,N.clear(),w(e)}function oe(e){if(null!==e.fragment){e.update(),A(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(k)}}const C=new Set;let se;function G(e,t){e&&e.i&&(C.delete(e),e.i(t))}function ie(e,t,n,r){if(e&&e.o){if(C.has(e))return;C.add(e),se.c.push((()=>{C.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}else r&&r()}function le(e){e&&e.c()}function J(e,t,n,r){const{fragment:o,after_update:c}=e.$$;o&&o.m(t,n),r||k((()=>{const t=e.$$.on_mount.map(I).filter(K);e.$$.on_destroy?e.$$.on_destroy.push(...t):A(t),e.$$.on_mount=[]})),c.forEach(k)}function Q(e,t){const n=e.$$;null!==n.fragment&&(A(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ce(e,t){-1===e.$$.dirty[0]&&($.push(e),re(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function R(e,t,n,r,o,c,i,s=[-1]){const l=M;w(e);const u=e.$$={fragment:null,ctx:[],props:c,update:v,not_equal:o,bound:V(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(l?l.$$.context:[])),callbacks:V(),dirty:s,skip_bound:!1,root:t.target||l.$$.root};i&&i(u.root);let f=!1;if(u.ctx=n?n(e,t.props||{},((t,n,...r)=>{const c=r.length?r[0]:n;return u.ctx&&o(u.ctx[t],u.ctx[t]=c)&&(!u.skip_bound&&u.bound[t]&&u.bound[t](c),f&&ce(e,t)),n})):[],u.update(),f=!0,A(u.before_update),u.fragment=!!r&&r(u.ctx),t.target){if(t.hydrate){const e=ee(t.target);u.fragment&&u.fragment.l(e),e.forEach(P)}else u.fragment&&u.fragment.c();t.intro&&G(e.$$.fragment),J(e,t.target,t.anchor,t.customElement),D()}w(l)}class U{$destroy(){Q(this,1),this.$destroy=v}$on(e,t){if(!K(t))return v;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){this.$$set&&!Y(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const ue="/assets/svelte.svg";function fe(e){let t,n,r,o,i;return{c(){t=a("button"),n=j("count is "),r=j(e[0])},m(s,l){z(s,t,l),c(t,n),c(t,r),o||(i=Z(t,"click",e[1]),o=!0)},p(e,[t]){1&t&&te(r,e[0])},i:v,o:v,d(e){e&&P(t),o=!1,i()}}}function ae(e,t,n){let r=0;return[r,()=>{n(0,r+=1)}]}class de extends U{constructor(e){super(),R(this,e,ae,fe,F,{})}}function he(e){let t,n,r,o,i,s,l,u,d,p,h,m,$,g,y,_,b;return m=new de({}),{c(){t=a("main"),n=a("div"),r=a("a"),r.innerHTML='<img src="/vite.svg" class="logo svelte-11cv5lq" alt="Vite Logo"/>',o=x(),i=a("a"),s=a("img"),u=x(),d=a("h1"),d.textContent="Vite + Svelte",p=x(),h=a("div"),le(m.$$.fragment),$=x(),g=a("p"),g.innerHTML='Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!',y=x(),_=a("p"),_.textContent="Click on the Vite and Svelte logos to learn more",f(r,"href","https://vitejs.dev"),f(r,"target","_blank"),f(r,"rel","noreferrer"),X(s.src,l=ue)||f(s,"src",l),f(s,"class","logo svelte svelte-11cv5lq"),f(s,"alt","Svelte Logo"),f(i,"href","https://svelte.dev"),f(i,"target","_blank"),f(i,"rel","noreferrer"),f(h,"class","card"),f(_,"class","read-the-docs svelte-11cv5lq")},m(e,l){z(e,t,l),c(t,n),c(n,r),c(n,o),c(n,i),c(i,s),c(t,u),c(t,d),c(t,p),c(t,h),J(m,h,null),c(t,$),c(t,g),c(t,y),c(t,_),b=!0},p:v,i(e){b||(G(m.$$.fragment,e),b=!0)},o(e){ie(m.$$.fragment,e),b=!1},d(e){e&&P(t),Q(m)}}}function me(e){return console.log("hello from svelte"),[]}class pe extends U{constructor(e){super(),R(this,e,me,he,F,{})}}new pe({target:document.getElementById("app")});