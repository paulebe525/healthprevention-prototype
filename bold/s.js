(function(){var d=document.documentElement,K='hp_lang';
window.hpLang=function(){return localStorage.getItem(K)||'en'};
function apply(l){d.lang=l;document.querySelectorAll('[data-en]').forEach(function(e){e.textContent=e.dataset[l]});document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang==l)});document.dispatchEvent(new Event('langchange'))}
window.setLang=function(l){localStorage.setItem(K,l);apply(l);var p=document.getElementById('lp');if(p)p.hidden=true};
document.querySelectorAll('.lang button,#lp [data-lang]').forEach(function(b){b.onclick=function(){setLang(b.dataset.lang)}});
var lp=document.getElementById('lp');if(lp&&!localStorage.getItem(K)&&!/nopop/.test(location.search))lp.hidden=false;
var th=localStorage.getItem('hp_theme');if(th)d.dataset.theme=th;var tb=document.getElementById('th');if(tb)tb.onclick=function(){var n=d.dataset.theme=='dark'?'light':'dark';d.dataset.theme=n;localStorage.setItem('hp_theme',n)};
var m=document.querySelector('.menu'),mn=document.getElementById('mnav');if(m)m.onclick=function(){var o=mn.classList.toggle('open');m.setAttribute('aria-expanded',o)};
if(/shot/.test(location.search))d.classList.add("shot");var io='IntersectionObserver'in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12}):null;
document.querySelectorAll('.reveal').forEach(function(e){io&&!/shot/.test(location.search)?io.observe(e):e.classList.add('in')});
apply(hpLang())})();
