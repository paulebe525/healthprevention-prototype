def t(en,ta,tag='span',attrs=''):
    return f'<{tag} {attrs} data-en="{en}" data-ta="{ta}">{en}</{tag}>'
NAV=[('index.html','Home','முகப்பு'),('assessment.html','Check your risk','ரிஸ்க் பாருங்க'),('library.html','Health Library','ஹெல்த் லைப்ரரி'),('index.html#pro','For professionals','நிபுணர்களுக்கு'),('index.html#contact','Contact','தொடர்பு')]
def head(title,cur):
    nav=''.join(f'<a href="{h}"{" aria-current=page" if i==cur else ""} data-en="{e}" data-ta="{ta}">{e}</a>' for i,(h,e,ta) in enumerate(NAV))
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>{title} · Health Prevention (simple mock-up)</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Figtree:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="s.css"></head><body>
<a href="#main" class="sr" style="position:absolute;left:-999px">Skip to content</a>
<header><div class="wrap bar"><a class="logo" href="index.html">Health Prevention</a><nav class="main" aria-label="Main">{nav}</nav>
<div class="lang" role="group" aria-label="Language"><button data-lang="en" aria-pressed="true">EN</button><button data-lang="ta" aria-pressed="false">தமிழ்</button></div>
<button class="menu" aria-label="Menu" aria-expanded="false" aria-controls="mnav">☰</button></div><nav id="mnav" aria-label="Mobile">{nav}</nav></header><main id="main">'''
FOOT=f'''</main><footer id="contact"><div class="wrap fcols"><div><h3>Health Prevention</h3><p>{t("For health awareness only. It does not replace a doctor's advice.","விழிப்புணர்வுக்கு மட்டும். டாக்டர் ஆலோசனைக்கு மாற்று இல்லை.")}</p>
<a href="mailto:mail@healthprevention.in">mail@healthprevention.in</a><br><a href="https://wa.me/919360535703">WhatsApp +91 93605 35703</a></div>
<div><h3>{t("Explore","பாருங்க")}</h3><a href="assessment.html">{t("All 49 checks","49 செக்கும்")}</a><br><a href="library.html">{t("Health Library","ஹெல்த் லைப்ரரி")}</a><br><a href="index.html#pro">{t("Field triage","ஃபீல்ட் ட்ரியாஜ்")}</a><br><a href="#faq">FAQ</a></div>
<div><h3>{t("About","பற்றி")}</h3><a href="#">{t("About us","எங்களைப் பற்றி")}</a><br><a href="#">{t("Privacy","பிரைவசி")}</a><br><a href="#">{t("Terms","விதிமுறைகள்")}</a></div></div>
<p class="wrap" style="margin-top:20px;opacity:.85">© 2026 Health Prevention · {t("Design mock-up, not the live site","டிசைன் மாதிரி, லைவ் சைட் இல்லை")}</p></footer><script src="s.js"></script>'''

home=head('Home',0)+f'''
<section class="hero"><div class="wrap"><h1>{t("Know your health early","உங்க ஹெல்த்தை முன்னாடியே தெரிஞ்சுக்கோங்க")}</h1>
<p class="lead">{t("Free 2-minute checks. No sign-up.","இலவசம், 2 நிமிஷம் தான். சைன்-அப் வேண்டாம்.")}</p>
<div class="paths">
<a class="path primary" href="assessment.html"><span class="ic">✓</span><div><b>{t("Check your risk","ரிஸ்க் பாருங்க")}</b>{t("Diabetes, mood, sleep and more","சுகர், மனநிலை, தூக்கம், இன்னும் பல")}</div></a>
<a class="path" href="library.html"><span class="ic">📖</span><div><b>{t("Health tips","ஹெல்த் டிப்ஸ்")}</b>{t("Short, simple reads","சின்ன, ஈஸியான படிப்பு")}</div></a>
<a class="path" href="#pro"><span class="ic">🩺</span><div><b>{t("For professionals","நிபுணர்களுக்கு")}</b>{t("Field triage for nurses and doctors","நர்ஸ், டாக்டருக்கான ஃபீல்ட் ட்ரியாஜ்")}</div></a>
</div>
<div class="trust"><span>{t("49 standard tools","49 ஸ்டாண்டர்ட் டூல்ஸ்")}</span><span>{t("Indian cut-offs","இந்திய அளவுகள்")}</span><span>{t("Stays on your phone","உங்க போன்லயே இருக்கும்")}</span></div></div></section>

<section class="alt"><div class="wrap"><h2>{t("Popular checks","பிரபலமான செக்ஸ்")}</h2><div class="grid g3">
<div class="card"><h3>{t("Diabetes risk (IDRS)","சுகர் ரிஸ்க் (IDRS)")}</h3><p>{t("4 questions · 2 min","4 கேள்வி · 2 நிமிஷம்")}</p><a class="more" href="assessment.html">{t("Start →","ஆரம்பிங்க →")}</a></div>
<div class="card"><h3>{t("Mood (PHQ-9)","மனநிலை (PHQ-9)")}</h3><p>{t("9 questions · 2 min","9 கேள்வி · 2 நிமிஷம்")}</p><a class="more" href="#">{t("Start →","ஆரம்பிங்க →")}</a></div>
<div class="card"><h3>{t("Anxiety (GAD-7)","பதட்டம் (GAD-7)")}</h3><p>{t("7 questions · 2 min","7 கேள்வி · 2 நிமிஷம்")}</p><a class="more" href="#">{t("Start →","ஆரம்பிங்க →")}</a></div>
</div><p class="center" style="margin-top:24px"><a class="btn ghost" href="#">{t("See all 49 checks","49 செக்கும் பாருங்க")}</a></p></div></section>

<section id="pro"><div class="wrap"><div class="card" style="max-width:760px;margin:0 auto;text-align:center;padding:32px">
<h2>{t("Field triage for professionals","நிபுணர்களுக்கு ஃபீல்ட் ட்ரியாஜ்")}</h2>
<p style="font-size:1.1rem">{t("Type the complaint. Get questions, checks and a referral slip.","பிரச்சனையை டைப் பண்ணுங்க. கேள்வி, செக், ரெஃபரல் ஸ்லிப் கிடைக்கும்.")}</p>
<p class="note" style="margin:16px auto">{t("Only for verified nurses, nursing students and doctors.","வெரிஃபை ஆன நர்ஸ், நர்ஸிங் ஸ்டூடண்ட்ஸ், டாக்டர்களுக்கு மட்டும்.")}</p>
<p><a class="btn" href="#">{t("Sign in to field triage","ஃபீல்ட் ட்ரியாஜ்ல சைன் இன்")}</a></p>
<a class="more" href="#">{t("Learn more","மேலும் தெரிஞ்சுக்க")}</a></div></div></section>

<section class="alt" id="faq"><div class="wrap" style="max-width:760px"><h2>{t("Quick answers","சின்ன பதில்கள்")}</h2>
<details class="card" style="margin-bottom:12px"><summary style="font-weight:700;min-height:44px;cursor:pointer">{t("Is it free?","இது இலவசமா?")}</summary><p>{t("Yes. Every check and score is free.","ஆமா. எல்லா செக்கும் ஸ்கோரும் இலவசம்.")}</p></details>
<details class="card" style="margin-bottom:12px"><summary style="font-weight:700;min-height:44px;cursor:pointer">{t("Is it a diagnosis?","இது டயக்னோசிஸா?")}</summary><p>{t("No. It is a screening aid. See a doctor for a diagnosis.","இல்லை. இது ஸ்கிரீனிங் மட்டும். டயக்னோசிஸுக்கு டாக்டரைப் பாருங்க.")}</p></details>
<details class="card"><summary style="font-weight:700;min-height:44px;cursor:pointer">{t("Is my data private?","என் தகவல் பத்திரமா?")}</summary><p>{t("Yes. Results stay on your device unless you save them.","ஆமா. நீங்க சேவ் பண்ணாத வரை உங்க போன்லயே இருக்கும்.")}</p></details>
</div></section>
<section><div class="wrap center" style="max-width:700px"><p style="color:var(--mute)">{t("Built by Paul Ebenezer P, Associate Professor in Digital Health, Scudder College of Nursing.","உருவாக்கியவர்: பால் எபனேசர் P, டிஜிட்டல் ஹெல்த் அசோசியேட் பேராசிரியர், ஸ்கடர் நர்ஸிங் கல்லூரி.")}</p></div></section>
'''+FOOT+'</body></html>'

TOP=[('❤️','Heart & diabetes','இதயம் & சுகர்'),('🧠','Mind & mood','மனசு & மனநிலை'),('🌙','Sleep','தூக்கம்'),('🏃','Activity','உடற்பயிற்சி'),('🥗','Food & diet','சாப்பாடு'),('🚭','Alcohol & tobacco','மது & புகையிலை'),('🎗️','Cancer screening','கேன்சர் ஸ்கிரீனிங்'),('🌸',"Women's health",'பெண்கள் நலம்'),('👵','Older adults','முதியோர்'),('💻','Work & screens','வேலை & ஸ்கிரீன்'),('👶','Family & child','குடும்பம் & குழந்தை')]
tiles=''.join(f'<a class="tile" href="#"><span class="ic">{i}</span><div><b data-en="{e}" data-ta="{ta}">{e}</b></div></a>' for i,e,ta in TOP)
POSTS=[('Back pain in children: why daily movement matters','குழந்தைகளுக்கு முதுகுவலி: தினமும் அசைவு ஏன் முக்கியம்','Family & child','குடும்பம் & குழந்தை'),('What is a normal BMI for Indians?','இந்தியர்களுக்கு நார்மல் BMI எவ்வளவு?','Heart & diabetes','இதயம் & சுகர்'),('5 early warning signs of diabetes','சுகரோட 5 ஆரம்ப அறிகுறிகள்','Heart & diabetes','இதயம் & சுகர்')]
reads=''.join(f'<div class="read"><span class="tag">{t("2-min read","2 நிமிஷ படிப்பு")}</span> <span class="tag" data-en="{ce}" data-ta="{ct}">{ce}</span><h3 style="margin-top:10px" data-en="{e}" data-ta="{ta}">{e}</h3><a class="more" href="#">{t("Read →","படிங்க →")}</a></div>' for e,ta,ce,ct in POSTS)
lib=head('Health Library',2)+f'''<section class="hero" style="padding-bottom:10px"><div class="wrap"><h1>{t("Health Library","ஹெல்த் லைப்ரரி")}</h1><p class="lead">{t("Pick a topic. Each read takes 2 minutes.","ஒரு டாபிக்கை தேர்ந்தெடுங்க. ஒவ்வொன்றும் 2 நிமிஷம் தான்.")}</p></div></section>
<section style="padding-top:10px"><div class="wrap"><h2>{t("Latest reads","புதுசா வந்தவை")}</h2><div class="grid g3">{reads}</div></div></section>
<section class="alt"><div class="wrap"><h2>{t("Topics","டாபிக்ஸ்")}</h2><div class="grid g3">{tiles}</div></div></section>'''+FOOT+'</body></html>'

ass=head('Diabetes risk check',1)+f'''<div class="wrap qbox"><button class="back" id="bk">{t("← Back","← பின்னாடி")}</button>
<h1 style="font-size:1.6rem;margin-top:10px">{t("Diabetes risk (IDRS)","சுகர் ரிஸ்க் (IDRS)")}</h1>
<div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="4" id="pb"><i id="pf" style="width:25%"></i></div>
<div class="qcount" id="qc"></div><div id="q" aria-live="polite"></div></div>
<script>
var Q=[{{en:"How old are you?",ta:"உங்க வயசு என்ன?",o:[["Under 35","35க்கு கீழ்",0],["35 to 49","35 முதல் 49",20],["50 or more","50 அல்லது மேல்",30]]}},
{{en:"What is your waist size?",ta:"உங்க இடுப்பு அளவு என்ன?",o:[["Women under 80 cm · Men under 90 cm","பெண்கள் 80 செ.மீ.க்கு கீழ் · ஆண்கள் 90க்கு கீழ்",0],["Women 80–89 cm · Men 90–99 cm","பெண்கள் 80–89 · ஆண்கள் 90–99 செ.மீ.",10],["Women 90 cm+ · Men 100 cm+","பெண்கள் 90+ · ஆண்கள் 100+ செ.மீ.",20]]}},
{{en:"How active are you?",ta:"நீங்க எவ்வளவு ஆக்டிவ்?",o:[["Hard exercise every day","தினமும் கடினமான உடற்பயிற்சி",0],["Moderate exercise or hard physical work","மிதமான உடற்பயிற்சி அல்லது கடின உடல் உழைப்பு",10],["Light exercise","லேசான உடற்பயிற்சி",20],["No exercise, mostly sitting","உடற்பயிற்சி இல்லை, பெரும்பாலும் உட்கார்ந்தே",30]]}},
{{en:"Does a parent have diabetes?",ta:"அப்பா அம்மாவுக்கு சுகர் இருக்கா?",o:[["No","இல்லை",0],["One parent","ஒருத்தருக்கு",10],["Both parents","இரண்டு பேருக்கும்",20]]}}];
var i=0,a=[];function L(){{return hpLang()}}
function draw(){{var l=L();var pf=document.getElementById('pf'),qc=document.getElementById('qc'),q=document.getElementById('q');
if(i>=Q.length){{var s=a.reduce(function(x,y){{return x+y}},0);var b=s<30?["Low risk","குறைந்த ரிஸ்க்","#e3f4ec","#1d6b4f"]:s<60?["Moderate risk","மிதமான ரிஸ்க்","#fff3d6","#7a5600"]:["High risk","அதிக ரிஸ்க்","#fde4e1","#9b2a1c"];
pf.style.width='100%';qc.textContent=l=='ta'?'முடிஞ்சது!':'Done!';q.innerHTML='<div class="result"><div class="score">'+s+'</div><span class="band" style="background:'+b[2]+';color:'+b[3]+'">'+(l=='ta'?b[1]:b[0])+'</span><p>'+(l=='ta'?'இது ஸ்கிரீனிங் மட்டும். சந்தேகம் இருந்தா டாக்டரைப் பாருங்க.':'This is a screening score, not a diagnosis. Talk to a doctor if unsure.')+'</p><p><a class="btn" href="#">'+(l=='ta'?'டாக்டருக்கான PDF':'Get doctor PDF')+'</a></p><button class="back" onclick="i=0;a=[];draw()">'+(l=='ta'?'மறுபடி செய்ய':'Start again')+'</button></div>';return}}
var x=Q[i];pf.style.width=((i+1)/Q.length*100)+'%';document.getElementById('pb').setAttribute('aria-valuenow',i+1);
qc.textContent=l=='ta'?('கேள்வி '+(i+1)+' / '+Q.length):('Question '+(i+1)+' of '+Q.length);
q.innerHTML='<h2>'+x[l]+'</h2>'+x.o.map(function(o,k){{return '<button class="opt'+(a[i]===o[2]&&a.length>i?' sel':'')+'" data-k="'+k+'">'+(l=='ta'?o[1]:o[0])+'</button>'}}).join('');
q.querySelectorAll('.opt').forEach(function(b){{b.onclick=function(){{a[i]=x.o[+b.dataset.k][2];i++;draw()}}}})}}
document.getElementById('bk').onclick=function(){{if(i>0){{i--;draw()}}else location.href='index.html'}};
document.addEventListener('langchange',draw);
var st=new URLSearchParams(location.search).get('step');if(st){{i=+st;for(var k=0;k<i;k++)a.push(Q[k].o[1][2]);}}
</script>'''+FOOT+'<script>draw()</script></body></html>'
for n,h in [('index.html',home),('library.html',lib),('assessment.html',ass)]: open(n,'w').write(h)
