(function(){
'use strict';
var PRICE=1950;var DISC=0.85;var CAPX=1.8;
var DECK=window.DECK_URL||'https://juanjose-30x.github.io/30x-decks/Sales-Machine-30X.pdf';
var BENCH={dep:75,met:90,act:100,cul:75,palancas:75,cerebro:80};
var PAINS=[
 {id:'dep',lab:'Depende de héroes',line:'Hoy la venta depende de que empujes tú o el vendedor estrella. Con sistema, el equipo cierra sin ti, y el crecimiento se destraba.'},
 {id:'met',lab:'Sin método/CRM',line:'Sin etapas claras no sabes por qué ganas o pierdes. Con método, cada oportunidad es predecible.'},
 {id:'act',lab:'Metas sin actividades',line:'El equipo no sabe qué hacer cada día para llegar a la meta. Al traducirla a actividades, dejas de enterarte tarde.'},
 {id:'cul',lab:'Sin pipeline review',line:'Sin rituales, la ejecución depende del ánimo. Con pipeline review semanal, el equipo rinde parejo.'},
 {id:'palancas',lab:'Sin palancas nuevas',line:'Creces solo con lo de siempre. Desarrollando nuevas palancas y canales abres demanda que hoy no existe.'},
 {id:'cerebro',lab:'Sin cerebro de ventas',line:'Los procesos viven en la cabeza del equipo. Documentados en un cerebro de IA, la operación deja de depender de las personas.'},
 {id:'narr',lab:'Pitch improvisado',line:'Cada vendedor cuenta otra historia. Con un mensaje único, cierras más parejo.'}
];
var Q=new URLSearchParams(location.search);
var sel={};PAINS.forEach(function(p){sel[p.id]=false;});
var dx=(Q.get('d')||'').split(',').map(function(s){return s.trim();}).filter(Boolean);
if(dx.length){dx.forEach(function(id){if(sel.hasOwnProperty(id))sel[id]=true;});}else{sel.dep=true;sel.act=true;sel.palancas=true;}
var quien=Q.get('nombre')||Q.get('empresa')||'';
function gv(k){var v=Q.get(k);if(v==null||v==='')return NaN;v=parseFloat(v);return isNaN(v)?NaN:v;}
var sig=(function(){try{return JSON.parse(Q.get('sig')||'{}');}catch(e){return {};}})();
var narr=gv('narr');
function wk(id){var v=sig[id];if(isNaN(v))return dx.indexOf(id)>=0?0.7:0.2;var b=BENCH[id];return Math.max(0,Math.min(1,(b-v)/b));}
function wkNarr(){if(isNaN(narr))return dx.indexOf('narr')>=0?0.7:0.3;return Math.max(0,Math.min(1,(2-narr)/2));}
var LAMBDA=0.60;
var convBase=gv('conv');var convFromDx=!isNaN(convBase);if(!convFromDx)convBase=29;
var LEADS=gv('leads');if(isNaN(LEADS))LEADS=0;
var CONV=[{id:'met',lab:'M\u00e9todo + CRM',coef:0.29,src:'Salesforce: usar bien el CRM \u2248 +29% ingresos'},{id:'cul',lab:'Coaching / pipeline review',coef:0.28,src:'CSO Insights: coaching din\u00e1mico hasta +28% en cierre'},{id:'narr',lab:'Mensaje de ventas \u00fanico',coef:0.10,src:'Corporate Visions: un mensaje diferenciado sube la conversi\u00f3n'}];
var convParts=CONV.map(function(l){var g=(l.id==='narr'?wkNarr():wk(l.id));var b=BENCH[l.id];return {id:l.id,lab:l.lab,coef:l.coef,gap:g,pts:convBase*l.coef*g*LAMBDA,src:l.src,bench:(b==null?null:b),v:(b==null?null:Math.round(b*(1-g)))};});
var totalLift=convParts.reduce(function(a,p){return a+p.coef*p.gap;},0)*LAMBDA;
var convNew=Math.min(convBase*(1+totalLift),convBase*3,60);
var PIPE=[{id:'palancas',lab:'Nuevas palancas y canales',coef:0.30,src:'McKinsey: 72% de B2B con 7+ canales ganan cuota'},{id:'act',lab:'Metas traducidas a actividades',coef:0.12,src:'CSO Insights: vender por actividades sube el pipeline'},{id:'dep',lab:'Dejar de depender de h\u00e9roes',coef:0.15,src:'Un sistema replicable escala sin el vendedor estrella'},{id:'cerebro',lab:'Cerebro de ventas IA',coef:0.10,src:'Salesforce State of Sales 2024: 83% con IA m\u00e1s ingresos'}];
var pipeParts=PIPE.map(function(l){var g=wk(l.id);var b=BENCH[l.id];return {id:l.id,lab:l.lab,coef:l.coef,gap:g,frac:l.coef*g*LAMBDA,src:l.src,bench:(b==null?null:b),v:(b==null?null:Math.round(b*(1-g)))};});
var VOL=Math.min(0.50,pipeParts.reduce(function(a,p){return a+p.frac;},0));
var sugTgt=Math.round(convNew);
var sugLeads=(LEADS>0?Math.round(LEADS*VOL):0);
var leadNote='Sugerido por tus se\u00f1ales; ponlo en 0 para ver solo el efecto de conversi\u00f3n.';
var convNote=convFromDx?'Sobre tu tasa de cierre y tus señales':'Estimado con benchmark (no diste tu tasa de cierre)';
var CITES=['Un proceso de ventas formal genera más ingresos · Harvard Business Review.','Documentar proceso y contenido: +27% win rate y +18% cuota · CSO Insights / Miller Heiman.','Coaching de ventas dinámico: hasta +28% en cierre · CSO Insights.','Usar bien un CRM: ~29% más ingresos y ~42% más precisión de forecast · Salesforce.','72% de las empresas B2B con 7 o más canales ganaron cuota · McKinsey B2B Pulse.','83% de los equipos que usan IA reportan más ingresos · Salesforce State of Sales 2024.'];
var CSS=[
".rc{--b:#0A0A0A;--s:#1C1C1C;--ink:#FFFFFF;--mut:rgba(255,255,255,.70);--faint:rgba(255,255,255,.45);--a:#EBFF6F;--line:#222222;font-family:'Inter',system-ui,sans-serif;max-width:1080px;margin:0 auto;padding:8px 4px 40px;color:var(--ink)}",
'html,body{background:#0A0A0A}',
'.rc *{box-sizing:border-box}',
'.rc-top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:16px}',
'.rc-brand{display:flex;align-items:center;gap:14px}',
".rc-logo{font-weight:800;font-size:23px;letter-spacing:-.05em;color:var(--ink)}.rc-logo b{color:var(--a)}",
'.rc-kick{font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--a)}',
".rc h1{font-family:'Inter',system-ui,sans-serif;font-weight:700;font-size:clamp(26px,4.2vw,44px);letter-spacing:-.06em;line-height:1.04;margin:26px 0 2px}",
'.rc h1 .it{color:var(--a);font-weight:800}',
'.rc-who{font-size:15px;color:var(--a);font-weight:700;margin:4px 0 0;letter-spacing:-.01em}',
'.rc-nums{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:22px}',
'.rc-col{padding:22px 18px;border-left:1px solid var(--line)}.rc-col:first-child{border-left:none}',
".rc-col .n{font-family:'Inter',system-ui,sans-serif;font-weight:800;font-size:clamp(28px,3.6vw,46px);line-height:1;letter-spacing:-.05em}",
'.rc-col.hoy .n{color:var(--mut)}.rc-col.win .n{color:var(--a)}',
'.rc-col .l{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--faint);margin-top:11px}',
'.rc-take{font-size:15px;color:var(--mut);margin-top:15px}.rc-take b{color:var(--ink)}',
'.rc-panel{margin-top:26px;display:grid;grid-template-columns:1fr 1fr;gap:14px}',
'.rc-card{background:var(--s);border:1px solid var(--line);border-radius:12px;padding:22px}',
'.rc-ch{font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--faint);margin-bottom:14px}',
'.rc-fld{margin:14px 0}.rc-fld:first-of-type{margin-top:0}',
'.rc-flab{display:flex;justify-content:space-between;align-items:baseline;font-size:14px;font-weight:600;margin-bottom:8px}',
".rc-flab .v{font-weight:800;font-size:19px;color:var(--a);letter-spacing:-.02em}",
'.rc-sug{font-size:11.5px;color:var(--faint);margin-top:7px;line-height:1.4}',
'.rc input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:6px;border-radius:99px;background:#000;border:1px solid var(--line);outline:none}',
'.rc input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;border-radius:50%;background:var(--a);cursor:pointer;border:3px solid var(--b)}',
'.rc input[type=range]::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:var(--a);cursor:pointer;border:3px solid var(--b)}',
'.rc input.num{width:100%;background:#000;border:1px solid var(--line);border-radius:10px;color:var(--ink);font:inherit;font-weight:700;font-size:16px;padding:11px 13px;outline:none}',
'.rc input.num:focus,.rc input[type=range]:focus{border-color:var(--a)}',
'.rc-chips{display:flex;flex-wrap:wrap;gap:8px}',
'.rc-src{margin-top:16px;background:var(--s);border:1px solid var(--line);border-radius:12px;padding:20px 22px}',
'.rc-acc{border-top:1px solid var(--line)}.rc-acc:first-of-type{border-top:none}',
'.rc-acc-h{display:flex;align-items:baseline;gap:10px;padding:11px 0 2px;font-size:14px;color:var(--ink)}',
'.rc-acc-pts{margin-left:auto;color:var(--a);font-weight:800;font-size:13px;white-space:nowrap}',
'.rc-acc-d{display:block;font-size:12.5px;color:var(--mut);line-height:1.5;padding:0 0 12px}.rc-acc-d b{color:var(--ink)}',
'.rc-cite{display:flex;gap:10px;font-size:13px;color:var(--mut);line-height:1.5;padding:5px 0}.rc-cite .dt{color:var(--a);font-weight:800}',
'.rc-chip{font-size:12.5px;font-weight:600;color:var(--mut);background:#000;border:1px solid var(--line);border-radius:99px;padding:7px 13px;cursor:pointer;user-select:none}',
'.rc-chip.on{background:var(--a);color:#0A0A0A;border-color:var(--a);font-weight:700}',
'.rc-note{font-size:12px;color:var(--faint);margin:8px 0 2px}',
'.rc-pitch{margin-top:14px;display:grid;gap:9px}',
".rc-pitch p{font-size:14.5px;line-height:1.5;color:var(--ink);margin:0}",
'.rc-pitch p .m{color:var(--a);font-weight:700}',
'.rc-coi{margin-top:14px;padding:13px 15px;border:1px solid var(--line);border-left:3px solid var(--a);border-radius:10px;background:#000;font-size:13.5px;color:var(--mut);line-height:1.5}.rc-coi b{color:var(--ink)}',
'.rc-roi{display:flex;gap:26px;flex-wrap:wrap;align-items:baseline;margin-top:16px}',
".rc-roi .big{font-weight:800;font-size:32px;color:var(--a);line-height:1;letter-spacing:-.03em}",
'.rc-roi .lab{font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.06em;font-weight:700}',
'.rc-scn{font-size:11px;color:var(--faint);margin-top:10px}',
'.rc-acts{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}',
'.rc-btn{background:var(--a);color:#0A0A0A;border:0;border-radius:99px;font:inherit;font-weight:800;font-size:14px;padding:12px 22px;cursor:pointer;text-decoration:none;display:inline-block}',
'.rc-btn2{background:none;color:var(--ink);border:1px solid var(--line);border-radius:99px;font:inherit;font-weight:600;font-size:14px;padding:12px 20px;cursor:pointer;text-decoration:none;display:inline-block}.rc-btn2:hover{border-color:var(--a)}',
'@media(max-width:820px){.rc-nums{grid-template-columns:repeat(2,1fr)}.rc-col:nth-child(3){border-left:none}.rc-panel{grid-template-columns:1fr}}',
'@media(max-width:560px){.rc{padding:8px 2px 32px}.rc-card{padding:16px}.rc-col{padding:16px 12px}.rc-acts{flex-direction:column}.rc-acts .rc-btn,.rc-acts .rc-btn2{width:100%;text-align:center}.rc-roi{gap:18px}.rc h1{margin-top:18px}.rc-src{padding:16px 16px}.rc-cite{font-size:12.5px}.rc-flab .v{font-size:17px}}'
,
".rc :focus-visible{outline:2px solid var(--a);outline-offset:2px;border-radius:8px}.rc-col .n,.rc-roi .big,.rc-flab .v{font-variant-numeric:tabular-nums;font-feature-settings:\"tnum\"}.rc-chip{appearance:none;-webkit-appearance:none}.rc-btn,.rc-btn2{transition:filter .14s,transform .14s,border-color .14s}.rc-btn:hover{transform:translateY(-1px)}.rc-btn:active,.rc-btn2:active{transform:scale(.98)}.rc{--faint:rgba(255,255,255,.60)}"].join('\n');
function n(t,a,k){var e=document.createElement(t);if(a)Object.keys(a).forEach(function(x){if(x==='txt')e.textContent=a[x];else if(x==='cls')e.className=a[x];else if(x==='html')e.innerHTML=a[x];else e.setAttribute(x,a[x]);});(k||[]).forEach(function(c){if(c)e.appendChild(c);});return e;}
function css(){if(document.getElementById('rc-css'))return;var s=document.createElement('style');s.id='rc-css';s.textContent=CSS;document.head.appendChild(s);}
function mount(){var ns=document.querySelectorAll('p,div,span');for(var i=0;i<ns.length;i++){if(ns[i].children.length===0&&/Cargando la consola/.test(ns[i].textContent||''))return ns[i];}return null;}
var fmt=function(x){return 'US$'+Math.round(x).toLocaleString('en-US');};
function build(dest){
 css();
 var app=n('div',{cls:'rc',id:'rc'});
 app.appendChild(n('div',{cls:'rc-top'},[n('div',{cls:'rc-brand'},[n('span',{cls:'rc-logo',html:'30<b>X</b>'}),n('span',{cls:'rc-kick',txt:'Hagamos la matemática'})])]));
 app.appendChild(n('h1',{html:'Si montas tu máquina,<br><span class="it">¿cuánto cambia el número?</span>'}));
 if(quien)app.appendChild(n('div',{cls:'rc-who',txt:'Caso de '+quien}));
 var cHoy=n('div',{cls:'n',txt:'10%'}),cWin=n('div',{cls:'n',txt:'20%'}),cMo=n('div',{cls:'n',txt:'+US$0'}),cPay=n('div',{cls:'n',txt:'·'});
 app.appendChild(n('div',{cls:'rc-nums'},[
  n('div',{cls:'rc-col hoy'},[cHoy,n('div',{cls:'l',txt:'Conversión hoy'})]),
  n('div',{cls:'rc-col win'},[cWin,n('div',{cls:'l',txt:'Con la máquina montada'})]),
  n('div',{cls:'rc-col win'},[cMo,n('div',{cls:'l',txt:'Más al mes (rango)'})]),
  n('div',{cls:'rc-col win'},[cPay,n('div',{cls:'l',txt:'Recuperas la inversión en'})])
 ]));
 var take=n('div',{cls:'rc-take',txt:'Cada mes sin sistema es plata que se queda sobre la mesa.'});app.appendChild(take);
 var rev=n('input',{cls:'num',type:'tel',inputmode:'numeric',value:Q.get('rev')||'45000'});
 var convV=n('span',{cls:'v',txt:convBase+'%'}),tgtV=n('span',{cls:'v',txt:sugTgt+'%'});
 var ldin=n('input',{cls:'num',type:'tel',inputmode:'numeric',value:(LEADS>0?String(LEADS):''),placeholder:'ej: 80'});
 var dlin=n('input',{cls:'num',type:'tel',inputmode:'numeric',value:(sugLeads>0?String(sugLeads):'0')});
 var conv=n('input',{type:'range',min:'2',max:'80',step:'1',value:String(convBase)});
 var tgt=n('input',{type:'range',min:'2',max:'80',step:'1',value:String(sugTgt)});
 var tick=n('div',{cls:'rc-sug'});
 var left=n('div',{cls:'rc-card'},[n('div',{cls:'rc-ch',txt:'N\u00fameros del lead'}),
  n('div',{cls:'rc-fld'},[n('div',{cls:'rc-flab'},[n('span',{txt:'Facturaci\u00f3n mensual (USD)'})]),rev]),
  n('div',{cls:'rc-fld'},[n('div',{cls:'rc-flab'},[n('span',{txt:'Leads / oportunidades al mes'})]),ldin,tick]),
  n('div',{cls:'rc-fld'},[n('div',{cls:'rc-flab'},[n('span',{txt:'Conversión hoy'}),convV]),conv]),
  n('div',{cls:'rc-fld'},[n('div',{cls:'rc-flab'},[n('span',{txt:'Con la máquina montada'}),tgtV]),tgt,n('div',{cls:'rc-sug',txt:convNote})]),
  n('div',{cls:'rc-fld'},[n('div',{cls:'rc-flab'},[n('span',{txt:'Leads nuevos al mes con la máquina'})]),dlin,n('div',{cls:'rc-sug',txt:leadNote})])
 ]);
  var chips=n('div',{cls:'rc-chips'});
 var dnote=n('div',{cls:'rc-note'});
 var pitch=n('div',{cls:'rc-pitch'});
 var coi=n('div',{cls:'rc-coi'});
 var yr=n('div',{cls:'big',txt:'+US$0'}),roi=n('div',{cls:'big',txt:'0×'});
 var deckBtn=n('a',{cls:'rc-btn',href:DECK,target:'_blank',rel:'noopener',txt:'Abrir el deck →'});
 var right=n('div',{cls:'rc-card'},[n('div',{cls:'rc-ch',txt:'Dolores que arrojó el diagnóstico'}),chips,dnote,pitch,coi,
  n('div',{cls:'rc-roi'},[n('div',{},[yr,n('div',{cls:'lab',txt:'Más al año'})]),n('div',{},[roi,n('div',{cls:'lab',txt:'ROI año 1'})])]),
  n('div',{cls:'rc-scn',txt:'Rango conservador; el caso real puede ser mayor. La matemática está detallada abajo.'}),
  n('div',{cls:'rc-acts'},[deckBtn,n('button',{cls:'rc-btn2',type:'button',txt:'Guardar PDF'})])
 ]);
 right.querySelector('button.rc-btn2').addEventListener('click',function(){window.print();});
 app.appendChild(n('div',{cls:'rc-panel'},[left,right]));
var cb=n('div',{cls:'rc-src'});
 cb.appendChild(n('div',{cls:'rc-ch',txt:'Cómo se construye tu conversión con la máquina'}));
 cb.appendChild(n('p',{cls:'rc-scn',style:'margin:0 0 4px',html:'Arrancas en <b>'+Math.round(convBase)+'%</b>. Cada palanca que tu diagnóstico marca floja suma unos puntos, y se van <b>acumulando</b> hasta <b>'+sugTgt+'%</b>:'}));
 var acc=convBase;
 convParts.forEach(function(p){
  var det;
  if(p.pts>=0.05){var from=acc;acc=acc+p.pts;
   det=(p.bench!=null?'Hoy ~<b>'+p.v+'%</b> de madurez (ideal '+p.bench+'%). ':'Hoy tu mensaje no es consistente. ')+'El estudio ve hasta <b>+'+Math.round(p.coef*100)+'% relativo</b> (no puntos): sobre tu '+Math.round(convBase)+'% eso es <b>+'+(convBase*p.coef).toFixed(1)+' pts</b> de techo. Por tu brecha ('+Math.round(p.gap*100)+'%) y un margen conservador, cuenta <b>+'+p.pts.toFixed(1)+' pts</b> → acumulas de <b>'+from.toFixed(1)+'%</b> a <b>'+acc.toFixed(1)+'%</b>. Base: '+p.src+'.';}
  else{det='Ya está en el ideal, no suma. '+p.src+'.';}
  cb.appendChild(n('div',{cls:'rc-acc'},[n('div',{cls:'rc-acc-h'},[n('span',{html:'<b>'+p.lab+'</b>'}),n('span',{cls:'rc-acc-pts',txt:(p.pts>=0.05?'+'+p.pts.toFixed(1)+' pts':'ya en punto')})]),n('div',{cls:'rc-acc-d',html:det})]));
 });
 cb.appendChild(n('p',{cls:'rc-scn',style:'margin-top:10px',html:'<b>Total: '+Math.round(convBase)+'% → '+sugTgt+'%.</b> No usamos el máximo de cada estudio: tomamos solo la parte que te falta (tu brecha) y con margen de prudencia.'}));
 app.appendChild(cb);
 var pb=n('div',{cls:'rc-src'});
 pb.appendChild(n('div',{cls:'rc-ch',txt:'Cómo se construye tu pipeline (leads nuevos)'}));
 pb.appendChild(n('p',{cls:'rc-scn',style:'margin:0 0 4px',html:(LEADS>0?('Además de cerrar mejor, la máquina te trae más leads: <b>+'+sugLeads+'/mes</b> sobre tus '+LEADS+' actuales. Así aporta cada palanca:'):'Además de cerrar mejor, la máquina te trae más leads. Ingresa tus leads/mes arriba para verlo en números.')}));
 pipeParts.forEach(function(p){
  var N=(LEADS>0?Math.round(LEADS*p.frac):0);
  var det;
  if(p.frac>=0.005){det=(p.bench!=null?'Hoy ~<b>'+p.v+'%</b> de madurez (ideal '+p.bench+'%). ':'')+(LEADS>0?('El estudio ve hasta <b>+'+Math.round(p.coef*100)+'% de pipeline</b>: sobre tus '+LEADS+' leads serían +'+Math.round(LEADS*p.coef)+' de techo. Por tu brecha y margen conservador, suma <b>+'+N+' leads/mes</b>'):('Desarrollarla sube tu pipeline hasta +'+Math.round(p.coef*100)+'%'))+'. Base: '+p.src+'.';}
  else{det='Ya la tienes en el ideal, no suma más. '+p.src+'.';}
  pb.appendChild(n('div',{cls:'rc-acc'},[n('div',{cls:'rc-acc-h'},[n('span',{html:'<b>'+p.lab+'</b>'}),n('span',{cls:'rc-acc-pts',txt:(p.frac>=0.005?(LEADS>0?'+'+N+' leads/mes':'+'+Math.round(p.frac*100)+'%'):'ya en punto')})]),n('div',{cls:'rc-acc-d',html:det})]));
 });
 app.appendChild(pb);
  var src=n('div',{cls:'rc-src'});src.appendChild(n('div',{cls:'rc-ch',txt:'Por qué estos números'}));CITES.forEach(function(t){src.appendChild(n('div',{cls:'rc-cite'},[n('span',{cls:'dt',txt:'•'}),n('span',{txt:t})]));});src.appendChild(n('p',{cls:'rc-scn',style:'margin-top:12px',txt:'Estimación conservadora sobre estudios de Salesforce, HubSpot, McKinsey, HBR/MIT y CSO Insights; no es promesa de resultados. Se afina con tus cierres reales.'}));app.appendChild(src);
 dest.parentNode.replaceChild(app,dest);
 dnote.textContent=dx.length?('Activados desde el diagnóstico'+(quien?' de '+quien:'')+' · conversión y pipeline sugeridos según sus señales'):'Vista de ejemplo · abre desde el resultado del diagnóstico para cargar los reales';
 function drawChips(){chips.innerHTML='';PAINS.forEach(function(p){var d=n('button',{cls:'rc-chip'+(sel[p.id]?' on':''),type:'button','aria-pressed':sel[p.id]?'true':'false',txt:p.lab});d.addEventListener('click',function(){sel[p.id]=!sel[p.id];drawChips();calc();});chips.appendChild(d);});}
 function calc(){
  var R=parseInt((rev.value||'0').replace(/\D/g,''),10)||0;
  var L=parseInt((ldin.value||'0').replace(/\D/g,''),10)||0;
  var dL=parseInt((dlin.value||'0').replace(/\D/g,''),10)||0;
  var C=Math.max(+conv.value,1)/100,T=Math.max(+tgt.value,1)/100;
  convV.textContent=Math.round(C*100)+'%';tgtV.textContent=Math.round(T*100)+'%';
  var ticket=0,upConv=0,upPipe=0,mo=0;
  if(L>0){var cli0=L*C;ticket=cli0>0?R/cli0:0;upConv=ticket*L*(T-C);upPipe=ticket*dL*T;mo=upConv+upPipe;}
  else{upConv=(C>0?R*(T/C-1):0);upPipe=0;mo=upConv;}
  if(!isFinite(mo))mo=0;var moP=Math.max(0,mo);
  tick.textContent=(L>0&&ticket>0)?('Ticket promedio ≈ '+fmt(ticket)):(L>0?'':'Ingresa tus leads/mes para el aporte de pipeline.');
  var lo=moP*0.80,hi=moP*1.15;
  var an=moP*12,r=moP>0?an/PRICE:0;
  var pm=moP>0?PRICE/moP:0;var payTxt=moP>0?(pm<1?'< 1 mes':(Math.ceil(pm)===1?'1 mes':Math.ceil(pm)+' meses')):'·';
  cHoy.textContent=Math.round(C*100)+'%';cWin.textContent=Math.round(T*100)+'%';cMo.textContent=moP>0?('+'+fmt(lo)+' a '+fmt(hi)):'US$0';cPay.textContent=payTxt;
  yr.textContent='+'+fmt(an);roi.textContent=r.toFixed(1)+'×';
  if(moP>0){take.innerHTML='Para '+(quien||'este lead')+': <b>+'+fmt(lo)+' a '+fmt(hi)+'/mes</b>. Por mejor conversión <b>+'+fmt(Math.max(0,upConv))+'</b>, por más pipeline <b>+'+fmt(Math.max(0,upPipe))+'</b>.';}
  else{take.innerHTML='<b>Con estos números no hay aumento:</b> misma conversión y sin leads nuevos. Sube la conversión objetivo o agrega leads nuevos para ver el impacto.';}
  coi.innerHTML=moP>0?('<b>Lo que cuesta seguir igual:</b> ~<b>+'+fmt(moP)+'/mes</b> sobre la mesa. En 6 meses son <b>+'+fmt(moP*6)+'</b>; pipeline que no vuelve.'):'Ajusta la conversión objetivo o los leads nuevos para ver el impacto.';
  pitch.innerHTML='';PAINS.forEach(function(p){if(sel[p.id])pitch.appendChild(n('p',{txt:p.line}));});
  if(moP>0)pitch.appendChild(n('p',{html:'Cerrar esto vale <span class="m">+'+fmt(an)+'/año</span>. Aun logrando la mitad, recuperas la inversión de sobra.'}));
 }
 [rev,ldin,dlin,conv,tgt].forEach(function(el){el.addEventListener('input',calc);});
 drawChips();calc();
 console.log('[rc] consola v4 montada · conv '+Math.round(convBase)+'%->'+sugTgt+'% · VOL='+VOL.toFixed(2));
}
var tries=0;function boot(){if(document.getElementById('rc'))return;var d=mount();if(!d){if(++tries>40)return;setTimeout(boot,150);return;}build(d);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();