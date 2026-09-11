(function(){
'use strict';
var CAL='https://calendly.com/d/cxf7-srs-hm4/30x-sales-sales-machine-admisiones';
var ENDPOINT=window.SM_ENDPOINT||'https://diagnostico-leads-187963534040.us-central1.run.app/api/lead-sales-machine';
var PRICE=1950;
var CONSOLE='https://magnet.30x.com/caso-roi-sales-machine';
var FREQ=[['Nunca',0],['Casi nunca',25],['A veces',50],['Casi siempre',75],['Siempre',100]];
var SIG=[
 {id:'dep',type:'pct',bench:75,imp:10,name:'Dependencia del fundador',q:'¿Qué % de tu pipeline avanza esta semana SIN que tú lo empujes?',up:'tu venta deja de depender de ti y del vendedor estrella',pain:'Tu venta depende de que empujes tú o el vendedor estrella. El crecimiento tiene techo y es frágil.',mod:'M6 · Sales Operating System'},
 {id:'met',type:'pct',bench:90,imp:8,name:'Método y métricas',q:'¿Qué % de tus oportunidades tiene una etapa clara registrada (CRM o Excel)?',up:'cada oportunidad tiene método y una etapa clara en el CRM',pain:'Sin etapas claras en el CRM no sabes por qué ganas ni por qué pierdes.',mod:'M2 y M3 · Blueprint + Pipeline'},
 {id:'act',type:'pct',bench:100,imp:10,name:'Metas a actividades',q:'¿Qué % de tu equipo sabe cuántas actividades hacer HOY para llegar a la meta del mes?',up:'el 100% del equipo sabe qué hacer cada día',pain:'El equipo no tiene claro qué hacer cada día para llegar a la meta, y te enteras tarde.',mod:'M3 + M5 · Calculadora + rutina'},
 {id:'cul',type:'freq',opts:FREQ,bench:75,imp:8,name:'Cultura de ejecución',q:'¿Con qué frecuencia hacen pipeline review o revisión de la operación comercial?',up:'el equipo ejecuta con ritmo y rituales semanales, no por ganas',pain:'Sin una rutina de revisión, la ejecución depende del ánimo de la semana.',mod:'M9 · Cultura y rituales'},
 {id:'palancas',type:'freq',opts:FREQ,bench:75,imp:12,name:'Palancas de crecimiento',q:'¿Con qué frecuencia desarrollas nuevas palancas o canales de crecimiento?',up:'abres canales y palancas nuevas de demanda de forma sistemática',pain:'Creces solo con lo de siempre. No estás abriendo canales nuevos de demanda.',mod:'M7 · Plan de demanda y canales'},
 {id:'cerebro',type:'pct',bench:80,imp:9,name:'Cerebro de ventas con IA',q:'¿Qué % de tus procesos comerciales están documentados en un cerebro/base de conocimiento de IA?',up:'tu operación queda documentada en un cerebro de IA que responde por ti',pain:'El conocimiento vive en la cabeza del equipo, no en un sistema que escale.',mod:'M8 · Segundo Cerebro de ventas'}
];
var ARQ=[
 {max:3,lvl:'Nivel 1',name:'Ventas de Héroe',desc:'Casi todo depende de que tú o el vendedor estrella empujen cada deal. Tiene techo y es frágil.',col:'#FF6B5A',bg:'rgba(255,107,90,.12)'},
 {max:6,lvl:'Nivel 2',name:'Proceso a medias',desc:'Tienes piezas sueltas, pero aún no una máquina que venda sin ti.',col:'#E7C24B',bg:'rgba(231,194,75,.12)'},
 {max:8,lvl:'Nivel 3',name:'Máquina en construcción',desc:'Vas bien encaminado; falta afinar y sistematizar lo último.',col:'#EBFF6F',bg:'rgba(235,255,111,.12)'},
 {max:10,lvl:'Nivel 4',name:'Máquina de ventas',desc:'Operas como sistema. El foco ahora es escalar y sostener.',col:'#EBFF6F',bg:'rgba(235,255,111,.12)'}
];
var st={fit:null,touched:{},urgencia:null,sig:{dep:50,met:50,act:50,cul:0,palancas:0,cerebro:50},siglab:{},conv:null,leads:0,narr:null,team:null,rev:0,willing:null,role:null,industry:null,nombre:'',empresa:'',email:'',whatsapp:''};
var CSS=[
".sm{--b:#0A0A0A;--s:#1C1C1C;--f:#F4F3EE;--m:#9A9A93;--a:#EBFF6F;--bd:#222222;font-family:'Inter',-apple-system,'Segoe UI',sans-serif;letter-spacing:-0.01em;max-width:680px;margin:0 auto;padding:0 20px;color:var(--f)}",
'html,body{background:#0A0A0A}',
'.sm *{box-sizing:border-box}',
'.sm-card{background:var(--s);border:1px solid var(--bd);border-radius:12px;padding:26px 22px 20px}',
'.sm-track{height:3px;background:var(--bd);border-radius:999px;overflow:hidden}',
'.sm-bar{display:block;height:100%;width:16%;background:var(--a);border-radius:999px;transition:width .35s cubic-bezier(.4,0,.2,1)}',
'.sm-count{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--m);margin:14px 0 14px}',
'.sm-step{display:none}.sm-step.on{display:block;animation:smin .26s ease}',
'@keyframes smin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
'@media(prefers-reduced-motion:reduce){.sm-step.on{animation:none}}',
'.sm-q{font-size:25px;line-height:1.12;font-weight:700;letter-spacing:-0.06em;margin:0 0 6px}',
'.sm-help{font-size:14px;color:var(--m);margin:0 0 16px;line-height:1.5}',
'.sm-sig{padding:16px 0;border-top:1px solid var(--bd)}.sm-sig:first-of-type{border-top:none}',
'.sm-sl-q{font-size:14.5px;font-weight:600;margin-bottom:2px;line-height:1.4}',
'.sm-slrow{display:flex;align-items:center;gap:14px;margin-top:10px}',
'.sm input[type=range]{-webkit-appearance:none;appearance:none;flex:1;height:5px;border-radius:999px;background:var(--bd);outline:none}',
'.sm input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:var(--a);cursor:pointer;border:3px solid var(--b)}',
'.sm input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:var(--a);cursor:pointer;border:3px solid var(--b)}',
'.sm-slv{font-weight:800;font-size:19px;min-width:62px;text-align:right;letter-spacing:-0.02em}',
'.sm-bench{font-size:12px;color:#6c6c60;margin-top:7px}.sm-bench b{color:var(--m)}.sm-hit{color:var(--a);font-weight:700}.sm-miss{color:#E7C24B;font-weight:700}',
'.sm-opts{display:grid;gap:8px;margin-top:6px}',
'.sm-opt{display:flex;align-items:center;gap:11px;border:1px solid var(--bd);border-radius:12px;padding:13px 14px;cursor:pointer;font-size:15px;transition:.15s}',
'.sm-opt:hover{border-color:rgba(255,255,255,0.28)}.sm-opt.sel{border-color:var(--a);background:rgba(235,255,111,.08)}',
'.sm-opt .dot{width:17px;height:17px;border-radius:50%;border:2px solid var(--bd);flex:0 0 auto}.sm-opt.sel .dot{border-color:var(--a);background:var(--a);box-shadow:inset 0 0 0 3px var(--s)}',
'.sm-lab{display:block;font-size:13px;color:var(--m);font-weight:600;margin:12px 0 6px}',
'.sm input[type=text],.sm input[type=email],.sm input[type=tel]{width:100%;background:var(--b);border:1px solid var(--bd);border-radius:12px;color:var(--f);font:inherit;font-size:16px;padding:13px 14px;outline:none}',
'.sm input:focus{border-color:var(--a)}.sm ::placeholder{color:#5c5c60}',
'.sm-err{color:#FF6B5A;font-size:13px;margin:12px 0 0;min-height:16px}',
'.sm-nav{display:flex;align-items:center;gap:6px;margin-top:18px}',
'.sm-next{background:var(--a);color:#0A0A0A;border:0;border-radius:999px;font:inherit;font-weight:700;font-size:15px;padding:13px 26px;cursor:pointer}.sm-next:hover{filter:brightness(1.05)}.sm-next:disabled{opacity:.45;cursor:default}',
'.sm-back{background:none;border:0;color:var(--m);font:inherit;font-size:14px;cursor:pointer;padding:10px 12px}.sm-back:hover{color:var(--f)}',
'.sm-ring{--p:0;width:112px;height:112px;border-radius:50%;flex:0 0 auto;background:conic-gradient(var(--a) calc(var(--p)*1%),var(--bd) 0);display:grid;place-items:center}',
'.sm-ring .in{width:88px;height:88px;border-radius:50%;background:var(--s);display:grid;place-items:center;text-align:center}',
'.sm-ring .n{font-weight:800;font-size:30px;line-height:1;letter-spacing:-0.03em}',
'.sm-ring .l{font-size:9px;color:var(--m);text-transform:uppercase;letter-spacing:.08em;margin-top:2px}',
'.sm-head{display:flex;align-items:center;gap:18px;flex-wrap:wrap}',
'.sm-band{display:inline-block;font-weight:700;font-size:11.5px;letter-spacing:.03em;text-transform:uppercase;padding:5px 12px;border-radius:999px}',
'.sm-bars{margin:22px 0}',
'.sm-work{margin:20px 0;padding:18px 18px 8px;border:1px solid var(--bd);border-radius:12px;background:var(--s)}',
'.sm-work-h{font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--a);margin-bottom:10px}',
'.sm-work-i{padding:10px 0;border-top:1px solid var(--bd)}.sm-work-i:first-of-type{border-top:none}',
'.sm-work-n{display:block;font-weight:700;font-size:14.5px;color:var(--f);margin-bottom:2px}',
'.sm-work-p{font-size:13.5px;color:var(--m);line-height:1.5}',
'.sm-brow{padding:11px 0;border-top:1px solid var(--bd)}',
'.sm-btop{display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:7px}.sm-bname{font-weight:600}.sm-bst{font-size:12.5px;color:var(--m)}',
'.sm-btrk{height:9px;background:var(--b);border-radius:999px;position:relative;overflow:hidden;border:1px solid var(--bd)}',
'.sm-btrk i{display:block;height:100%;border-radius:999px}.sm-ok i{background:var(--a)}.sm-mid i{background:#E7C24B}.sm-bad i{background:#FF6B5A}',
'.sm-mkr{position:absolute;top:-3px;width:2px;height:15px;background:var(--f);opacity:.5}',
'.sm-lockcard{margin:22px 0;padding:24px 20px;border:1px dashed var(--a);border-radius:12px;background:linear-gradient(135deg,rgba(235,255,111,.08),var(--s));text-align:center}',
'.sm-lockcard .k{font-size:14px;font-weight:700;color:var(--f)}',
'.sm-lockcard .blur{font-weight:800;font-size:36px;color:var(--a);letter-spacing:-0.03em;filter:blur(10px);-webkit-user-select:none;user-select:none;margin:10px 0}',
'.sm-lockform{display:grid;gap:8px;max-width:380px;margin:16px auto 0;text-align:left}',
'.sm-pot{margin:22px 0;padding:22px 20px;border:1px solid var(--a);border-radius:12px;background:linear-gradient(135deg,rgba(235,255,111,.13),var(--s))}',
'.sm-pot .k{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--m);font-weight:700}',
'.sm-pot .v{font-weight:800;font-size:40px;color:var(--a);letter-spacing:-0.03em;line-height:1;margin:6px 0 2px}',
'.sm-pot .s{font-size:13px;color:var(--m);line-height:1.5}',
'.sm-fx{font-size:12px;color:#6c6c60;margin-top:8px;line-height:1.5}',
'.sm-lev{margin-top:14px;display:grid;gap:8px}',
'.sm-lev .li{display:flex;gap:10px;font-size:13.5px;line-height:1.4;color:var(--f)}.sm-lev .li b{color:var(--a);font-weight:700}',
'.sm-gate{margin-top:22px;padding:22px 20px;border:1px solid var(--bd);border-radius:12px;background:var(--s)}.sm-gate h3{font-size:20px;font-weight:700;letter-spacing:-0.02em;margin:0 0 12px;line-height:1.2}',
'.sm-route{margin-top:22px;border-radius:12px;padding:22px;border:1px solid var(--bd)}',
'.sm-route.go{background:linear-gradient(135deg,rgba(235,255,111,.14),var(--s));border-color:var(--a)}',
'.sm-route h3{font-size:22px;font-weight:700;letter-spacing:-0.03em;margin:0 0 6px}',
'.sm-mods{margin-top:14px}.sm-mod{display:flex;gap:10px;padding:9px 0;border-top:1px dashed var(--bd);font-size:14px}.sm-mod:first-child{border-top:none}',
'.sm-mod .mm{color:var(--a);font-weight:700;white-space:nowrap;font-size:12.5px}',
'.sm-btn{display:inline-block;background:var(--a);color:#0A0A0A;border:0;border-radius:999px;font:inherit;font-weight:700;font-size:15px;padding:13px 26px;text-decoration:none;cursor:pointer}',
'.sm-btn2{display:inline-block;background:none;color:var(--f);border:1px solid var(--bd);border-radius:999px;font:inherit;font-weight:600;font-size:15px;padding:13px 22px;text-decoration:none;cursor:pointer}.sm-btn2:hover{border-color:var(--a)}',
'.sm-acc{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}',
'.sm-foot{font-size:12px;color:var(--m);text-align:center;margin:14px auto 0;max-width:520px;line-height:1.5}',
'.sm-print{display:none}',
'@media(max-width:520px){.sm-q{font-size:22px}.sm-pot .v{font-size:34px}}',
'@media print{@page{margin:14mm}html,body{background:#0A0A0A!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}body>*{display:none!important}body>.sm-print{display:block!important;position:static;width:auto;background:#0A0A0A;color:#F4F3EE;-webkit-print-color-adjust:exact;print-color-adjust:exact}.sm-print .pk{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#EBFF6F;margin-bottom:8px}.sm-print .ph{font-size:28px;font-weight:800;letter-spacing:-0.04em;color:#fff;margin:0 0 2px;line-height:1.05}.sm-print .pl{font-size:15px;color:#EBFF6F;font-weight:700;margin:0 0 16px}.sm-print .psec{font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#9A9A93;margin:18px 0 6px}.sm-print .pit{margin:8px 0;page-break-inside:avoid}.sm-print .pit b{color:#EBFF6F;font-weight:700;display:block;font-size:14px;margin-bottom:1px}.sm-print .pit span{font-size:13px;color:#C9C8C1;line-height:1.5}.sm-print .pbig{font-size:26px;font-weight:800;color:#EBFF6F;letter-spacing:-0.02em;margin:2px 0}.sm-print p{font-size:13px;line-height:1.5;color:#C9C8C1;margin:6px 0}.sm-print .pcta{display:inline-block;margin-top:18px;background:#EBFF6F;color:#0A0A0A;font-weight:800;font-size:15px;padding:13px 28px;border-radius:999px;text-decoration:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}.sm-print .purl{font-size:12px;color:#8f8f85;margin-top:8px;word-break:break-all;overflow-wrap:anywhere}.sm-print .pfoot{margin-top:18px;font-size:11px;color:#8f8f85;line-height:1.5;border-top:1px solid #222;padding-top:12px}}'
,
".sm :focus-visible{outline:2px solid var(--a);outline-offset:2px;border-radius:8px}.sm-ring .n,.sm-slv,.sm-pot .v,.sm-bst,.sm-count{font-variant-numeric:tabular-nums;font-feature-settings:\"tnum\"}.sm-next,.sm-btn,.sm-btn2{transition:filter .14s,transform .14s,border-color .14s}.sm-next:hover,.sm-btn:hover{transform:translateY(-1px)}.sm-next:active,.sm-btn:active,.sm-btn2:active{transform:scale(.98)}.sm-bench,.sm-fx{color:#8f8f85}.sm ::placeholder{color:#8a8a80}.sm-mod .mm{color:#b7b7ad}.sm-lev .li b{color:#b7b7ad}.sm-lockcard,.sm-pot,.sm-route.go{background:var(--s)}.sm-opt{appearance:none;-webkit-appearance:none;background:none;color:inherit;font:inherit;text-align:left;width:100%}.sm-brand{padding:2px 0 14px;display:flex;align-items:center;gap:10px}.sm-brand .lg{font-weight:800;letter-spacing:-.05em;font-size:20px;color:#fff}.sm-brand .lg b{color:var(--a)}.sm-brand .ey{font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--a)}.sm-back{min-height:44px}"].join('\n');
function n(t,a,k){var e=document.createElement(t);if(a)Object.keys(a).forEach(function(x){if(x==='txt')e.textContent=a[x];else if(x==='cls')e.className=a[x];else e.setAttribute(x,a[x]);});(k||[]).forEach(function(c){if(c)e.appendChild(c);});return e;}
function css(){if(document.getElementById('sm-css'))return;var s=document.createElement('style');s.id='sm-css';s.textContent=CSS;document.head.appendChild(s);}
function mount(){var ns=document.querySelectorAll('p,div,span');for(var i=0;i<ns.length;i++){if(ns[i].children.length===0&&/Cargando el diagn/.test(ns[i].textContent||''))return ns[i];}return null;}
var fmt=function(x){return 'US$'+Math.round(x).toLocaleString('en-US');};
function _rm(){return window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;}
function cup(el,to,dur,f){to=+to||0;if(_rm()){el.textContent=f?f(to):Math.round(to);return;}var s=null;function k(t){if(s===null)s=t;var p=Math.min(1,(t-s)/dur);var e=0.5-Math.cos(p*Math.PI)/2;el.textContent=f?f(to*e):Math.round(to*e);if(p<1)requestAnimationFrame(k);}requestAnimationFrame(k);}
function cupp(el,to,dur){to=+to||0;if(_rm()){el.style.setProperty('--p',to);return;}var s=null;function k(t){if(s===null)s=t;var p=Math.min(1,(t-s)/dur);var e=0.5-Math.cos(p*Math.PI)/2;el.style.setProperty('--p',to*e);if(p<1)requestAnimationFrame(k);}requestAnimationFrame(k);}
function pts(v,b){return v>=b?2:(v>=b*0.6?1:0);}
function score(){var s=0;SIG.forEach(function(g){s+=pts(st.sig[g.id],g.bench);});s+=(+st.narr||0);return Math.round(s/(SIG.length*2+2)*10);}
function arqOf(sc){for(var i=0;i<ARQ.length;i++){if(sc<=ARQ[i].max)return ARQ[i];}return ARQ[ARQ.length-1];}
var REV_MIN=10000,REV_HIGH=25000;
function noAplica(){return st.fit==='no'||st.industry==='retail'||st.industry==='otro';}
function tierOf(){if(noAplica())return 'low';var dec=(st.role&&st.role!=='no');var r=st.rev||0;if(dec&&r>=REV_HIGH)return 'high';if(dec&&r>=REV_MIN)return 'medium';return 'low';}
function weak(){var w=SIG.map(function(g){return{g:g,gap:g.bench-st.sig[g.id]};}).filter(function(x){return x.gap>0;}).sort(function(a,b){return b.gap-a.gap;});if(!w.length)w=SIG.slice(0,3).map(function(g){return{g:g,gap:0};});return w.slice(0,3);}
function caseN(){var R=st.rev;var w=weak();var total=0;w.forEach(function(x){total+=x.g.imp;});total=Math.min(total,25);var mo=R*total/100;return{R:R,total:total,w:w,mo:mo,yr:mo*12,roi:(R>0?mo*12/PRICE:0),days:(mo>0?Math.max(1,Math.round(PRICE/(mo/30))):0)};}
function build(dest){
 var steps=[];
 function opt(container,val,label,onpick){var d=n('button',{cls:'sm-opt','data-v':val,type:'button',role:'radio','aria-checked':'false'},[n('span',{cls:'dot'}),n('span',{txt:label})]);d.addEventListener('click',function(){container.querySelectorAll('.sm-opt').forEach(function(x){x.classList.remove('sel');x.setAttribute('aria-checked','false');});d.classList.add('sel');d.setAttribute('aria-checked','true');onpick(val,d);});return d;}
 var s1=n('section',{cls:'sm-step on'});s1.appendChild(n('h2',{cls:'sm-q',txt:'¿Tu negocio ya tiene reuniones o llamadas de venta de forma recurrente?'}));
 var o1=n('div',{cls:'sm-opts'});['si|Sí, es nuestro pan de cada día','irregular|Algunas, pero irregulares','no|No, todavía no vendemos de forma activa'].forEach(function(p){var a=p.split('|');o1.appendChild(opt(o1,a[0],a[1],function(v){st.fit=v;refresh();}));});s1.appendChild(o1);s1.appendChild(n('div',{cls:'sm-sl-q',txt:'¿Qué describe mejor tu negocio?',style:'margin-top:18px'}));var oind=n('div',{cls:'sm-opts'});['b2b|Le vendo a otras empresas (B2B): software, tecnología, servicios, industria, distribución, corporativo.','serv|Servicios profesionales / consultoría / agencia.','proc|Vendo con un proceso de ventas / ticket alto (reuniones, propuestas), aunque le venda a personas.','retail|Me compran sin un proceso comercial (panadería, restaurante, tienda al detal, ecommerce al por menor…).','otro|Otro / aún no vendo.'].forEach(function(p){var a=p.split('|');oind.appendChild(opt(oind,a[0],a[1],function(v){st.industry=v;refresh();}));});s1.appendChild(oind);steps.push(s1);
 var s2=n('section',{cls:'sm-step'});s2.appendChild(n('h2',{cls:'sm-q',txt:'¿Dónde está hoy tu proceso comercial?'}));s2.appendChild(n('p',{cls:'sm-help',txt:'Mueve cada control para reflejar tu operación de hoy.'}));
 SIG.forEach(function(g){var row=n('div',{cls:'sm-sig'});row.appendChild(n('div',{cls:'sm-sl-q',txt:g.q}));if(g.type==='pct'){var sl=n('input',{type:'range',min:'0',max:'100',step:'1',value:String(st.sig[g.id]),'aria-label':g.name});var v=n('span',{cls:'sm-slv',txt:st.sig[g.id]+'%'});function up(){var val=+sl.value;st.sig[g.id]=val;v.textContent=val+'%';}sl.addEventListener('input',function(){up();st.touched[g.id]=true;refresh();});row.appendChild(n('div',{cls:'sm-slrow'},[sl,v]));up();}else{var oc=n('div',{cls:'sm-opts'});g.opts.forEach(function(o){oc.appendChild(opt(oc,String(o[1]),o[0],function(v){st.sig[g.id]=+v;st.siglab[g.id]=o[0];st.touched[g.id]=true;refresh();}));});row.appendChild(oc);}s2.appendChild(row);});steps.push(s2);
 var s3=n('section',{cls:'sm-step'});s3.appendChild(n('h2',{cls:'sm-q',txt:'Dos cosas más sobre tu equipo'}));
 s3.appendChild(n('div',{cls:'sm-sl-q',txt:'¿El pitch de venta cambia según quién lo dé?',style:'margin-top:6px'}));var on=n('div',{cls:'sm-opts'});['2|No, todos usan el mismo mensaje de valor','1|Hay una base, pero cada uno improvisa','0|Sí, cada vendedor cuenta una historia distinta'].forEach(function(p){var a=p.split('|');on.appendChild(opt(on,a[0],a[1],function(v){st.narr=v;refresh();}));});s3.appendChild(on);
 s3.appendChild(n('div',{cls:'sm-sl-q',txt:'¿A cuántas personas diriges en el área de ventas?',style:'margin-top:18px'}));var ot=n('div',{cls:'sm-opts'});['mas5|Más de 5: dirijo un equipo comercial','2a5|Entre 2 y 5','1|1 persona','solo|Ninguna, vendo yo mismo'].forEach(function(p){var a=p.split('|');ot.appendChild(opt(ot,a[0],a[1],function(v){st.team=v;refresh();}));});s3.appendChild(ot);s3.appendChild(n('div',{cls:'sm-sl-q',txt:'¿Cuándo quieres resolver esto?',style:'margin-top:18px'}));var ou=n('div',{cls:'sm-opts'});['ya|Ahora: es prioridad este trimestre','pronto|En los próximos 3-6 meses','explora|Solo estoy explorando'].forEach(function(p){var a=p.split('|');ou.appendChild(opt(ou,a[0],a[1],function(v){st.urgencia=v;refresh();}));});s3.appendChild(ou);steps.push(s3);
 var s4=n('section',{cls:'sm-step'});s4.appendChild(n('h2',{cls:'sm-q',txt:'Para dimensionar tu potencial: ¿cuánto facturas hoy?'}));s4.appendChild(n('p',{cls:'sm-help',txt:'Con tu facturación calculamos el tamaño de la oportunidad al montar tu máquina de ventas.'}));
 var revrow=n('div',{cls:'sm-sig'});revrow.appendChild(n('div',{cls:'sm-sl-q',txt:'¿Cuál es tu facturación mensual aproximada? (USD)'}));var revin=n('input',{type:'tel',inputmode:'numeric',placeholder:'Ej: 40000'});revin.addEventListener('input',function(){st.rev=parseInt((revin.value||'').replace(/\D/g,''),10)||0;refresh();});revrow.appendChild(revin);s4.appendChild(revrow);var cvrow=n('div',{cls:'sm-sig'});cvrow.appendChild(n('div',{cls:'sm-sl-q',txt:'De cada 10 oportunidades calificadas, ¿cuántas terminan en venta? (opcional)'}));var cvin=n('input',{type:'tel',inputmode:'numeric',placeholder:'Ej: 3 de 10'});cvin.addEventListener('input',function(){var x=parseInt((cvin.value||'').replace(/\D/g,''),10);st.conv=(isNaN(x)?null:Math.max(0,Math.min(10,x)));});cvrow.appendChild(cvin);s4.appendChild(cvrow);var ldrow=n('div',{cls:'sm-sig'});ldrow.appendChild(n('div',{cls:'sm-sl-q',txt:'¿Cuántos leads o prospectos nuevos entran al mes? (opcional)'}));var ldin=n('input',{type:'tel',inputmode:'numeric',placeholder:'Ej: 80'});ldin.addEventListener('input',function(){st.leads=parseInt((ldin.value||'').replace(/\D/g,''),10)||0;});ldrow.appendChild(ldin);s4.appendChild(ldrow);steps.push(s4);
 var s5=n('section',{cls:'sm-step'});s5.appendChild(n('h2',{cls:'sm-q',txt:'¿Cuál es tu rol frente a esto?'}));var orl=n('div',{cls:'sm-opts'});['dec|Founder / C-level (CEO, socio, GM)','dec|Líder de ventas (Head / Director / Gerente comercial)','infl|Rep / Growth / Ops (con mandato)','no|Otro / sin mandato para decidir'].forEach(function(p){var a=p.split('|');orl.appendChild(opt(orl,a[0],a[1],function(v){st.role=v;refresh();}));});s5.appendChild(orl);steps.push(s5);
 var err=n('p',{cls:'sm-err',role:'alert'});var back=n('button',{cls:'sm-back',type:'button',txt:'Atrás',style:'display:none'});var next=n('button',{cls:'sm-next',type:'button',txt:'Empezar'});
 var bar=n('span',{cls:'sm-bar'});var cnt=n('span',{txt:'1'});
 var wrap=n('div',{},[n('div',{cls:'sm-track'},[bar]),n('p',{cls:'sm-count'},[cnt,n('span',{txt:' de '+steps.length+' · ~2 min'})])]);
 steps.forEach(function(s){wrap.appendChild(s);});wrap.appendChild(err);wrap.appendChild(n('div',{cls:'sm-nav'},[next,back]));
 var res=n('div',{cls:'sm-res',style:'display:none'});
 var app=n('div',{cls:'sm',id:'sm'},[n('div',{cls:'sm-brand'},[n('span',{cls:'lg',html:'30<b>X</b>'}),n('span',{cls:'ey',txt:'Diagnóstico'})]),n('div',{cls:'sm-card'},[wrap,res]),n('p',{cls:'sm-foot',txt:'Tus respuestas se usan para generar tu diagnóstico y para que el equipo de 30X pueda contactarte.'})]);
 dest.parentNode.replaceChild(app,dest);
 var i=0;
 function show(k){i=k;steps.forEach(function(s,j){s.classList.toggle('on',j===k);});bar.style.width=Math.round((k+1)/steps.length*100)+'%';cnt.textContent=String(k+1);err.textContent='';back.style.display=k===0?'none':'';next.textContent=k===steps.length-1?'Ver mi nivel de madurez':'Siguiente';window.scrollTo({top:0,behavior:'smooth'});}
 function refresh(){var ok=true;if(i===0)ok=!!st.fit&&(st.fit==='no'||!!st.industry);if(i===1)ok=(Object.keys(st.touched).length>=SIG.length);if(i===2)ok=(st.narr!==null&&st.team!==null&&st.urgencia!==null);if(i===3)ok=st.rev>0;if(i===4)ok=!!st.role;next.disabled=!ok;}
 function valid(){if(i===0&&!st.fit)return 'Elige una opción.';if(i===0&&st.fit!=='no'&&!st.industry)return 'Elige la opción que describe tu negocio.';if(i===1&&Object.keys(st.touched).length<SIG.length)return 'Mueve cada control para calibrar tu diagnóstico.';if(i===2&&(st.narr===null||st.team===null||st.urgencia===null))return 'Responde todas.';if(i===3&&!(st.rev>0))return 'Escribe tu facturación mensual (solo números).';if(i===4&&!st.role)return 'Elige tu rol.';return '';}
 back.addEventListener('click',function(){if(st.fit==='no'&&i>0){show(0);refresh();return;}if(i>0)show(i-1);refresh();});
 next.addEventListener('click',function(){var p=valid();if(p){err.textContent=p;return;}if(i===0&&noAplica()){return finish();}if(i<steps.length-1){show(i+1);refresh();return;}finish();});
 show(0);refresh();
 function leadPayload(c,route){return {programa:'sales_machine',nombre:st.nombre,empresa:st.empresa,email:st.email,whatsapp:st.whatsapp,rol:st.role,dispuesto:st.willing,fit:st.fit,industria:st.industry,dirige_equipo:st.team,b2b:(st.industry==='b2b'),dirige_equipo_grande:(st.team==='mas5'),urgencia:st.urgencia,facturacion_mensual:st.rev,conv_reportada:(st.conv==null?null:st.conv*10),leads_mes:(st.leads||0),madurez:score(),nivel:arqOf(score()).lvl,senales:st.sig,narrativa:st.narr,palancas:c.w.map(function(x){return x.g.id;}),upside_pct:c.total,upside_mensual:Math.round(c.mo),upside_anual:Math.round(c.yr),ruta:route,enviado_en:new Date().toISOString(),origen:location.pathname,tier:tierOf(),consola_url:CONSOLE+'?d='+c.w.map(function(x){return x.g.id;}).join(',')+'&rev='+c.R+'&sig='+encodeURIComponent(JSON.stringify(st.sig))+'&narr='+(st.narr==null?'':st.narr)+'&nombre='+encodeURIComponent(st.nombre||'')+'&empresa='+encodeURIComponent(st.empresa||'')+'&conv='+(st.conv==null?'':st.conv*10)+'&leads='+(st.leads||0)+'&nivel='+encodeURIComponent(arqOf(score()).lvl)};}
 function sendLead(payload){try{if(st._trap&&st._trap.value)return;var body=JSON.stringify(payload);if(navigator.sendBeacon){navigator.sendBeacon(ENDPOINT,new Blob([body],{type:'application/json'}));}else{fetch(ENDPOINT,{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:body}).catch(function(){});}}catch(e){}}
 function finish(){var nofit=noAplica();var sc=score();var c=caseN();wrap.style.display='none';res.style.display='';paintTop(nofit,sc,c);res.scrollIntoView({behavior:'smooth',block:'start'});}
 function paintTop(nofit,sc,c){
  var a=arqOf(sc);
  var scn=n('div',{cls:'n',txt:'0'});var ring=n('div',{cls:'sm-ring'},[n('div',{cls:'in'},[scn,n('div',{cls:'l',txt:'/ 10 madurez'})])]);ring.style.setProperty('--p',0);cup(scn,sc,700);cupp(ring,sc*10,700);
  var bt=n('span',{cls:'sm-band',txt:a.lvl});bt.style.color=a.col;bt.style.background=a.bg;
  var head=n('div',{cls:'sm-head'},[ring,n('div',{},[bt,n('h3',{cls:'sm-q',style:'margin:10px 0 4px',txt:nofit?'Primero, activa tu proceso de ventas':a.name}),n('p',{cls:'sm-help',style:'margin:0',txt:nofit?'Sales Machine 2.0 es para negocios con venta 1:1 recurrente (no ecommerce/retail).':a.desc})])]);
  res.appendChild(n('span',{cls:'sm-band',style:'background:none;color:var(--m);padding:0 0 8px 0',txt:'Diagnóstico preliminar de madurez comercial'}));res.appendChild(head);
  var bars=n('div',{cls:'sm-bars'});SIG.forEach(function(g){var val=st.sig[g.id];var hit=val>=g.bench;var cls=hit?'sm-ok':val>=g.bench*0.6?'sm-mid':'sm-bad';var disp=(g.type==='pct')?(val+'%'):(st.siglab[g.id]||'·');var trk=n('div',{cls:'sm-btrk '+cls},[n('i',{style:'width:'+Math.max(3,val)+'%'})]);bars.appendChild(n('div',{cls:'sm-brow'},[n('div',{cls:'sm-btop'},[n('span',{cls:'sm-bname',txt:g.name}),n('span',{cls:'sm-bst',txt:disp})]),trk]));});res.appendChild(bars);
  var wk3=weak();var pt=n('div',{cls:'sm-work'});pt.appendChild(n('div',{cls:'sm-work-h',txt:'Tus puntos a trabajar hoy'}));wk3.forEach(function(x){pt.appendChild(n('div',{cls:'sm-work-i'},[n('span',{cls:'sm-work-n',txt:x.g.name}),n('span',{cls:'sm-work-p',txt:x.g.pain})]));});res.appendChild(pt);
  var lock=n('div',{cls:'sm-lockcard'});
  lock.appendChild(n('div',{cls:'k',txt:nofit?'🔒 Recibe tu diagnóstico completo':'🔒 Desbloquea cuánta plata dejas sobre la mesa + tu plan de 3 pasos'}));
  if(!nofit)lock.appendChild(n('div',{cls:'blur',txt:'+US$ ███,███ / año'}));
  lock.appendChild(n('p',{cls:'sm-help',style:'margin:8px auto 0;max-width:420px',txt:nofit?'Déjanos tus datos y te enviamos tu diagnóstico.':'Te lo calculamos sobre TU facturación y te enviamos el PDF ahora mismo.'}));
  lock.appendChild(n('p',{cls:'sm-help',style:'margin:6px auto 0;max-width:420px;color:var(--a);font-weight:600',txt:'+3.100 alumnos formados · NPS 8.3'}));var f=n('div',{cls:'sm-lockform'});
  function fld(key,type,ph,auto){var i=n('input',{type:type,placeholder:ph,'aria-label':ph});if(auto)i.setAttribute('autocomplete',auto);i.addEventListener('input',function(){st[key]=i.value.trim();});return n('div',{},[n('label',{cls:'sm-lab',txt:ph}),i]);}
  f.appendChild(fld('nombre','text','Nombre y apellido','name'));f.appendChild(fld('empresa','text','Empresa','organization'));f.appendChild(fld('email','email','Correo de trabajo','email'));f.appendChild(fld('whatsapp','tel','WhatsApp (con indicativo)','tel'));
  var trap=n('input',{type:'text',tabindex:'-1','aria-hidden':'true',style:'position:absolute;left:-9999px;opacity:0'});st._trap=trap;f.appendChild(trap);
  var le=n('p',{cls:'sm-err',style:'text-align:center'});var lb=n('button',{cls:'sm-btn',type:'button',style:'margin-top:6px',txt:nofit?'Recibir mi diagnóstico →':'Ver mi diagnóstico completo →'});
  lb.addEventListener('click',function(){if(!st.nombre||st.nombre.length<3){le.textContent='Escribe tu nombre.';return;}if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(st.email)){le.textContent='Revisa tu correo.';return;}if(st.whatsapp.replace(/\D/g,'').length<7){le.textContent='Escribe tu WhatsApp con indicativo.';return;}sendLead(leadPayload(c,tierOf()));if(!noAplica()&&window.fbq){try{fbq('track','CompleteRegistration',{content_name:'diagnostico-sales-machine'});fbq('trackCustom','Registro',{content_name:'diagnostico-sales-machine',tier:tierOf()});}catch(e){}}lock.remove();reveal(sc,c);});
  lock.appendChild(f);lock.appendChild(le);lock.appendChild(lb);res.appendChild(lock);
 }
 function reveal(sc,c){
 var t=tierOf();var nofit=noAplica();
 var holder=n('div',{});
 if(t==='low'){
  if(!nofit){
   var pot=n('div',{cls:'sm-pot'});pot.appendChild(n('div',{cls:'k',txt:'Potencial al montar tu máquina'}));pot.appendChild(n('div',{cls:'v',txt:'+'+fmt(c.yr)+'/año'}));pot.appendChild(n('div',{cls:'s',txt:'≈ +'+fmt(c.mo)+'/mes sobre tu facturación actual.'}));
   pot.appendChild(n('div',{cls:'sm-fx',txt:'Así lo calculamos (conservador): cerrar tus 3 señales más débiles equivale a ≈ +'+c.total+'% en ventas · sobre '+fmt(c.R)+'/mes son +'+fmt(c.mo)+'/mes. El caso a fondo, con los números de TU negocio, se construye en la sesión 1:1.'}));
   var lev=n('div',{cls:'sm-lev'});lev.appendChild(n('div',{cls:'li',style:'color:var(--m)'},[n('span',{txt:'De dónde saldría ese salto:'})]));c.w.forEach(function(x){lev.appendChild(n('div',{cls:'li'},[n('b',{txt:'→'}),n('span',{txt:'Si '+x.g.up+'.'})]));});pot.appendChild(lev);holder.appendChild(pot);
   var mods=n('div',{cls:'sm-mods'},[n('div',{cls:'sm-sl-q',txt:'Tus prioridades → cómo se cierran en Sales Machine 2.0'})]);c.w.forEach(function(x){mods.appendChild(n('div',{cls:'sm-mod'},[n('span',{cls:'mm',txt:x.g.mod}),n('span',{txt:x.g.name})]));});holder.appendChild(mods);
  }
  var box=n('div',{cls:'sm-route'});box.appendChild(n('h3',{txt:nofit?'Guarda tu diagnóstico':'Descarga tu diagnóstico'}));box.appendChild(n('p',{cls:'sm-help',style:'margin:0',txt:nofit?'Sales Machine 2.0 es para negocios con venta 1:1 recurrente (no ecommerce/retail). Guarda tu diagnóstico para cuando sea tu momento.':'Llévate tu diagnóstico completo en PDF y compártelo con tu equipo. Cuando quieras, agenda un 1:1 para construir el caso con tus números.'}));box.appendChild(n('div',{cls:'sm-acc'},[n('button',{cls:'sm-btn',type:'button',mk:'1',txt:'Descargar mi diagnóstico (PDF)'}),n('a',{cls:'sm-btn2',href:CAL,target:'_blank',rel:'noopener',txt:'Quiero agendar igual →'})]));holder.appendChild(box);
 } else {
  var gate=n('div',{cls:'sm-route go'});gate.appendChild(n('span',{cls:'sm-band',style:'background:none;color:var(--a);padding:0 0 6px 0',txt:t==='high'?'Perfil prioritario':'Siguiente paso'}));gate.appendChild(n('h3',{txt:'Tu diagnóstico completo, gratis en un 1:1'}));gate.appendChild(n('p',{cls:'sm-help',style:'margin:0 0 4px',txt:'Ya viste tu nivel y tus señales. En 20 min, un especialista de 30X te muestra cuánta plata dejas sobre la mesa y tu plan de 3 pasos, con los números de TU negocio.'}));
  var pv=n('div',{cls:'v',txt:'+US$0/mes'});var tease=n('div',{cls:'sm-pot',style:'margin:16px 0'});tease.appendChild(n('div',{cls:'k',txt:'Tu potencial preliminar (sobre tus números)'}));tease.appendChild(pv);tease.appendChild(n('div',{cls:'s',txt:'El caso anual completo y tu plan de 3 pasos los cerramos en la sesión 1:1.'}));gate.appendChild(tease);cup(pv,c.mo,700,function(x){return '+'+fmt(x)+'/mes';});
  gate.appendChild(n('div',{cls:'sm-acc'},[n('a',{cls:'sm-btn',href:CAL,target:'_blank',rel:'noopener',mkcal:'1',txt:'Agendar y ver mi diagnóstico →'}),n('button',{cls:'sm-btn2',type:'button',mk:'1',txt:'Descargar mi abrebocas (PDF)'})]));holder.appendChild(gate);
 }
 var _op=document.getElementById('sm-pdf');if(_op)_op.remove();var pr=n('div',{cls:'sm-print',id:'sm-pdf'});
 pr.appendChild(n('div',{cls:'pk',txt:'30X · Sales Machine 2.0 · Diagnóstico'}));
 pr.appendChild(n('div',{cls:'ph',txt:'Tu diagnóstico preliminar'}));
 pr.appendChild(n('div',{cls:'pl',txt:'Nivel '+sc+'/10 · '+arqOf(sc).lvl+' · '+arqOf(sc).name}));
 pr.appendChild(n('div',{cls:'psec',txt:'Tus puntos a trabajar hoy'}));
 c.w.forEach(function(x){pr.appendChild(n('div',{cls:'pit'},[n('b',{txt:x.g.name}),n('span',{txt:x.g.pain})]));});
 if(!nofit){pr.appendChild(n('div',{cls:'psec',txt:'Potencial estimado (conservador)'}));pr.appendChild(n('div',{cls:'pbig',txt:'+'+fmt(c.yr)+'/año'}));pr.appendChild(n('p',{txt:'≈ +'+fmt(c.mo)+'/mes sobre tu facturación actual. El caso completo, con los números de tu negocio, se construye en la sesión 1:1.'}));}
 pr.appendChild(n('div',{cls:'psec',txt:'Qué trabajarías en Sales Machine 2.0'}));
 pr.appendChild(n('p',{txt:c.w.map(function(x){return x.g.mod;}).join('     ·     ')}));
 pr.appendChild(n('a',{cls:'pcta',href:CAL,target:'_blank',rel:'noopener',txt:'Agenda tu 1:1 gratis con 30X'}));
 pr.appendChild(n('div',{cls:'purl',txt:CAL}));
 pr.appendChild(n('div',{cls:'pfoot',txt:'El potencial es una estimación orientativa y conservadora sobre tu facturación, no una promesa de resultados. 30X · Sales Machine 2.0 · inicia 28 de septiembre 2026.'}));
 document.body.appendChild(pr);
 holder.appendChild(n('p',{cls:'sm-foot',txt:'El potencial es una estimación orientativa y conservadora sobre tu facturación, no una promesa de resultados. 30X · Sales Machine 2.0 · inicia 28 de septiembre 2026.'}));
 res.appendChild(holder);
 holder.querySelectorAll('[mk]').forEach(function(b){b.addEventListener('click',function(){window.print();});});
 holder.querySelectorAll('[mkcal]').forEach(function(b){b.addEventListener('click',function(){if(window.fbq){try{fbq('track','Schedule');}catch(e){}}});});
 holder.scrollIntoView({behavior:'smooth',block:'start'});
}
 console.log('[sm] diagnóstico montado');
}
var tries=0;function boot(){if(document.getElementById('sm'))return;var d=mount();if(!d){if(++tries>40)return;setTimeout(boot,150);return;}css();build(d);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();