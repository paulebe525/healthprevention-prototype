(function(){var b=document.querySelectorAll('.lang button');
function set(l){document.documentElement.lang=l;document.querySelectorAll('[data-en]').forEach(function(e){e.textContent=e.getAttribute('data-'+l)});b.forEach(function(x){x.setAttribute('aria-pressed',String(x.dataset.lang===l))});try{localStorage.setItem('hp_lang',l)}catch(e){};document.dispatchEvent(new CustomEvent('langchange',{detail:l}))}
b.forEach(function(x){x.onclick=function(){set(x.dataset.lang)}});
var q=new URLSearchParams(location.search).get('lang');var l=q||(function(){try{return localStorage.getItem('hp_lang')}catch(e){}})();if(l==='ta')set('ta');
var m=document.querySelector('.menu'),n=document.getElementById('mnav');if(m)m.onclick=function(){m.setAttribute('aria-expanded',String(n.classList.toggle('open')))};
window.hpLang=function(){return document.documentElement.lang==='ta'?'ta':'en'}})();
