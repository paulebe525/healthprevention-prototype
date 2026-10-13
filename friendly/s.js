(function(){var d=document.documentElement,K='hp_lang';
window.hpLang=function(){return localStorage.getItem(K)||'en'};
var D=window.HP_I18N||{};
function tr(x,l){var m=D[l];if(!m)return x;var k=x.trim();if(m[k])return x.replace(k,m[k]);var q=k.match(/^Question (\d+) of (\d+)$/);if(q&&l=='hi')return 'सवाल '+q[1]+' / '+q[2];q=k.match(/^(● \S+ )(Low|Moderate|High)$/);if(q)return q[1]+m[q[2]];q=k.match(/^(Your result)( · .*)$/);if(q)return m[q[1]]+q[2];return x}
window.hpTr=function(root){var l=hpLang();if(!D[l])return;var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){var t=tr(n.nodeValue,l);if(t!==n.nodeValue)n.nodeValue=t}};
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType==1&&!n.closest('[data-en]'))hpTr(n)})})}).observe(document.documentElement,{childList:true,subtree:true});
function apply(l){d.lang=l;document.querySelectorAll('[data-en]').forEach(function(e){e.textContent=e.dataset[l]||(D[l]&&D[l][e.dataset.en])||e.dataset.en});document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang==l)});document.dispatchEvent(new Event('langchange'))}
window.setLang=function(l){localStorage.setItem(K,l);apply(l);var p=document.getElementById('lp');if(p)p.hidden=true};
document.querySelectorAll('.lang button,#lp [data-lang]').forEach(function(b){b.onclick=function(){setLang(b.dataset.lang)}});
var ql=new URLSearchParams(location.search).get('lang');if(ql)localStorage.setItem(K,ql);var lp=document.getElementById('lp');if(lp&&!localStorage.getItem(K)&&!/nopop/.test(location.search))lp.hidden=false;
var th=localStorage.getItem('hp_theme');if(th)d.dataset.theme=th;var tb=document.getElementById('th');if(tb)tb.onclick=function(){var n=d.dataset.theme=='dark'?'light':'dark';d.dataset.theme=n;localStorage.setItem('hp_theme',n)};
var m=document.querySelector('.menu'),mn=document.getElementById('mnav');if(m)m.onclick=function(){var o=mn.classList.toggle('open');m.setAttribute('aria-expanded',o)};
if(/shot/.test(location.search))d.classList.add("shot");var io='IntersectionObserver'in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(function(e){io&&!/shot/.test(location.search)?io.observe(e):e.classList.add('in')});
apply(hpLang())})();
addEventListener('scroll',function(){var h=document.querySelector('header');h&&h.classList.toggle('sc',scrollY>10)},{passive:true});
