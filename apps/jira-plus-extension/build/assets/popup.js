function v(){}function z(e){return e()}function I(){return Object.create(null)}function A(e){e.forEach(z)}function D(e){return"function"==typeof e}function G(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let S,V;function K(e,t){return S||(S=document.createElement("a")),S.href=t,e===S.href}function ee(e){return 0===Object.keys(e).length}function c(e,t){e.appendChild(t)}function J(e,t,n){e.insertBefore(t,n||null)}function T(e){e.parentNode&&e.parentNode.removeChild(e)}function h(e){return document.createElement(e)}function q(e){return document.createTextNode(e)}function x(){return q(" ")}function te(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function u(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ne(e){return Array.from(e.childNodes)}function re(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function w(e){V=e}!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const $=[],F=[],O=[],H=[],oe=Promise.resolve();let k=!1;function se(){k||(k=!0,oe.then(Q))}function P(e){O.push(e)}const j=new Set;let _=0;function Q(){if(0!==_)return;const e=V;do{try{for(;_<$.length;){const e=$[_];_++,w(e),ie(e.$$)}}catch(e){throw $.length=0,_=0,e}for(w(null),$.length=0,_=0;F.length;)F.pop()();for(let e=0;e<O.length;e+=1){const t=O[e];j.has(t)||(j.add(t),t())}O.length=0}while($.length);for(;H.length;)H.pop()();k=!1,j.clear(),w(e)}function ie(e){if(null!==e.fragment){e.update(),A(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(P)}}const C=new Set;let le;function R(e,t){e&&e.i&&(C.delete(e),e.i(t))}function ce(e,t,n,r){if(e&&e.o){if(C.has(e))return;C.add(e),le.c.push((()=>{C.delete(e),r&&(n&&e.d(1),r())})),e.o(t)}else r&&r()}function ue(e){e&&e.c()}function U(e,t,n,r){const{fragment:o,after_update:c}=e.$$;o&&o.m(t,n),r||P((()=>{const t=e.$$.on_mount.map(z).filter(D);e.$$.on_destroy?e.$$.on_destroy.push(...t):A(t),e.$$.on_mount=[]})),c.forEach(P)}function W(e,t){const n=e.$$;null!==n.fragment&&(A(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function fe(e,t){-1===e.$$.dirty[0]&&($.push(e),se(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function X(e,t,n,r,o,c,s,u=[-1]){const i=V;w(e);const l=e.$$={fragment:null,ctx:[],props:c,update:v,not_equal:o,bound:I(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(i?i.$$.context:[])),callbacks:I(),dirty:u,skip_bound:!1,root:t.target||i.$$.root};s&&s(l.root);let a=!1;if(l.ctx=n?n(e,t.props||{},((t,n,...r)=>{const c=r.length?r[0]:n;return l.ctx&&o(l.ctx[t],l.ctx[t]=c)&&(!l.skip_bound&&l.bound[t]&&l.bound[t](c),a&&fe(e,t)),n})):[],l.update(),a=!0,A(l.before_update),l.fragment=!!r&&r(l.ctx),t.target){if(t.hydrate){const e=ne(t.target);l.fragment&&l.fragment.l(e),e.forEach(T)}else l.fragment&&l.fragment.c();t.intro&&R(e.$$.fragment),U(e,t.target,t.anchor,t.customElement),Q()}w(i)}class Y{$destroy(){W(this,1),this.$destroy=v}$on(e,t){if(!D(t))return v;const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){this.$$set&&!ee(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const ae="/assets/svelte.svg",de="/assets/vite.svg";function he(e){let t,n,r,o,s;return{c(){t=h("button"),n=q("count is "),r=q(e[0])},m(u,i){J(u,t,i),c(t,n),c(t,r),o||(s=te(t,"click",e[1]),o=!0)},p(e,[t]){1&t&&re(r,e[0])},i:v,o:v,d(e){e&&T(t),o=!1,s()}}}function me(e,t,n){let r=0;return[r,()=>{n(0,r+=1)}]}class pe extends Y{constructor(e){super(),X(this,e,me,he,G,{})}}function ge(e){let t,n,r,o,s,i,l,a,f,d,p,m,$,g,_,y,b,k,w;return g=new pe({}),{c(){t=h("main"),n=h("div"),r=h("a"),o=h("img"),i=x(),l=h("a"),a=h("img"),d=x(),p=h("h1"),p.textContent="Vite + Svelte TEST",m=x(),$=h("div"),ue(g.$$.fragment),_=x(),y=h("p"),y.innerHTML='Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!',b=x(),k=h("p"),k.textContent="Click on the Vite and Svelte logos to learn more",K(o.src,s=de)||u(o,"src",s),u(o,"class","logo svelte-11cv5lq"),u(o,"alt","Vite Logo"),u(r,"href","https://vitejs.dev"),u(r,"target","_blank"),u(r,"rel","noreferrer"),K(a.src,f=ae)||u(a,"src",f),u(a,"class","logo svelte svelte-11cv5lq"),u(a,"alt","Svelte Logo"),u(l,"href","https://svelte.dev"),u(l,"target","_blank"),u(l,"rel","noreferrer"),u($,"class","card"),u(k,"class","read-the-docs svelte-11cv5lq")},m(e,s){J(e,t,s),c(t,n),c(n,r),c(r,o),c(n,i),c(n,l),c(l,a),c(t,d),c(t,p),c(t,m),c(t,$),U(g,$,null),c(t,_),c(t,y),c(t,b),c(t,k),w=!0},p:v,i(e){w||(R(g.$$.fragment,e),w=!0)},o(e){ce(g.$$.fragment,e),w=!1},d(e){e&&T(t),W(g)}}}function _e(e){return console.log("hello from svelte"),[]}class $e extends Y{constructor(e){super(),X(this,e,_e,ge,G,{})}}new $e({target:document.getElementById("app")});