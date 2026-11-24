/* =====================================================================
   Branch Office – module navigation inside one layout (branch.html)
   URL state: branch.html?m=<module>&g=<group / report category>&i=<item>
   Every value is checked against the menu definitions in js/app.js
   (NAV.branch, BRANCH_SIDE, REPORT_CATS) and written with textContent.
   The main area always shows the Under Maintenance view – no ERP
   operation or report calculation is executed.
   ===================================================================== */
/* Financial year of the branch (values unchanged; shown without the "FY" prefix, date format follows the language) */
const BR_FY={start:'2026-04-01',end:'2027-03-31'};
const fyText=()=>t('ui.fyRange',{start:fmtDate(BR_FY.start),end:fmtDate(BR_FY.end)});
const BR_MODS=NAV.branch.map(n=>n[0]);
const brHref=(m,g,i)=>{const q=[];if(m&&m!='Home')q.push('m='+encodeURIComponent(m));if(g)q.push('g='+encodeURIComponent(g));if(i)q.push('i='+encodeURIComponent(i));return 'branch.html'+(q.length?'?'+q.join('&'):'')};
const branchName=sessionStorage.getItem('branch')||PROJECTS[0];

topbar('<span class=chip id=bc></span><span class=chip id=fy></span>',
  '<button type=button class=ib id=sbt data-i18n-aria="ui.toggleSidebar" aria-controls=sb aria-expanded=false>'+ic('sidebar')+'</button>',{navRole:'branch',active:'Home'});
applyI18n($('#hdr'));applyI18n($('#bmain'));
$('#bc').textContent=branchName.split('–')[0].trim();$('#fy').textContent=fyText();
$('#umn a.mi').href=brHref('Home','','My Account');

/* ---------- read + validate the URL state ---------- */
function readState(){
  const q=new URLSearchParams(location.search),m=q.get('m')||'Home',g=q.get('g')||'',i=q.get('i')||'';
  if(!BR_MODS.includes(m))return {m:'Home',bad:true};
  if(!g&&!i)return {m};
  if(m=='Home')return i=='My Account'&&!g?{m,i}:{m,bad:true};
  if(m=='Reports'){const c=REPORT_CATS.find(([n])=>n==g);if(!c)return {m,bad:true};
    if(!i)return c[1]?{m,g,bad:true}:{m,g};return c[1]&&c[1].includes(i)?{m,g,i}:{m,g,bad:true}}
  const grp=(BRANCH_SIDE[m]||[]).find(([n])=>n==g);
  return grp&&grp[2].includes(i)?{m,g,i}:{m,bad:true};
}

/* ---------- top navigation highlight ---------- */
function setTop(m){$$('#mainnav .links>li>.nl').forEach(a=>{const on=a.dataset.k==m;a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')})}

/* ---------- module sidebar (Finance, Fixed Asset, Payroll, Utilities) ---------- */
let sideFor=null;
function drawSide(st){const groups=BRANCH_SIDE[st.m],sb=$('#sb'),sbt=$('#sbt');
  document.body.classList.toggle('has-side',!!groups);sb.hidden=!groups;sbt.hidden=!groups;
  if(!groups){document.body.classList.remove('open-side');sideFor=null;return}
  /* labels are translated (data-il / data-il-title); data-g / data-i keep the internal ids */
  if(sideFor!=st.m){sideFor=st.m;
    sb.innerHTML=`<p class=side-h data-il="${esc(st.m)}">${esc(tl(st.m))}</p>`+groups.map(([g,gi,items],k)=>`<details data-g="${esc(g)}"${k==0?' open':''}><summary title="${esc(tl(g))}" data-il-title="${esc(g)}">${ic(gi)}<span class=t data-il="${esc(g)}">${esc(tl(g))}</span>${ic('chev','cv-i')}</summary><ul>${items.map(l=>`<li><a href="${brHref(st.m,g,l)}" data-br data-i="${esc(l)}" data-il="${esc(l)}">${esc(tl(l))}</a></li>`).join('')}</ul></details>`).join('')}
  sb.setAttribute('aria-label',t('ui.moduleMenu',{module:tl(st.m)}));
  $$('#sb a').forEach(a=>{const d=a.closest('details'),on=d.dataset.g==st.g&&a.dataset.i==st.i;a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current');if(on)d.open=true});
}
$('#sb').addEventListener('click',e=>{const s=e.target.closest('summary');
  if(s&&document.body.classList.contains('col')){e.preventDefault();document.body.classList.remove('col');s.parentElement.open=true}});
$('#sbt').onclick=e=>{e.stopPropagation();const mob=innerWidth<=900,b=document.body;
  if(mob)b.classList.toggle('open-side');else b.classList.toggle('col');
  $('#sbt').setAttribute('aria-expanded',mob?b.classList.contains('open-side'):!b.classList.contains('col'))};
document.addEventListener('click',e=>{if(document.body.classList.contains('open-side')&&!e.target.closest('#sb,#sbt')){document.body.classList.remove('open-side');$('#sbt').setAttribute('aria-expanded','false')}});

/* ---------- Reports: horizontal category bar with compact dropdowns ---------- */
function drawReports(st){const rn=$('#rn');document.body.classList.toggle('rep',st.m=='Reports');rn.hidden=st.m!='Reports';
  if(st.m!='Reports'){closeRep();return}
  if(!rn.dataset.built){rn.dataset.built=1;
    rn.innerHTML=`<ul class=rc>${REPORT_CATS.map(([c,items],k)=>items
      ?`<li class=rdd><button type=button class=rc-b data-c="${esc(c)}" aria-expanded=false aria-controls=rdm${k}><span data-il="${esc(c)}">${esc(tl(c))}</span>${ic('chev','cv-i')}</button><ul class=rdm id=rdm${k}>${items.map(l=>`<li><a href="${brHref('Reports',c,l)}" data-br data-i="${esc(l)}" data-il="${esc(l)}">${esc(tl(l))}</a></li>`).join('')}</ul></li>`
      :`<li><a class=rc-b href="${brHref('Reports',c)}" data-br data-c="${esc(c)}"><span data-il="${esc(c)}">${esc(tl(c))}</span></a></li>`).join('')}</ul>`;
    wireReports()}
  rn.setAttribute('aria-label',t('ui.reportCategories'));
  $$('#rn .rdd').forEach(li=>$('.rdm',li).setAttribute('aria-label',t('ui.categoryReports',{cat:tl($('.rc-b',li).dataset.c)})));
  $$('#rn .rc>li').forEach(li=>{const b=$('.rc-b',li),on=b.dataset.c==st.g;b.classList.toggle('on',on);
    if(b.tagName=='A')on?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current')});
  $$('#rn .rdm a').forEach(a=>{const on=a.dataset.i==st.i&&a.closest('.rdd').querySelector('.rc-b').dataset.c==st.g;a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
}
/* the panel is position:fixed so it is not clipped by the horizontally scrollable bar; it is placed under its button and kept inside the viewport */
function placeRep(li){const b=$('.rc-b',li),p=$('.rdm',li),r=b.getBoundingClientRect(),vw=document.documentElement.clientWidth,vh=innerHeight;
  p.style.maxWidth=Math.min(380,vw-16)+'px';const w=p.offsetWidth,top=r.bottom+4;
  p.style.left=Math.max(8,Math.min(r.left,vw-w-8))+'px';p.style.top=top+'px';p.style.maxHeight=Math.max(160,Math.min(420,vh*.65,vh-top-8))+'px'}
const openRepLi=()=>$('#rn .rdd.open');
function closeRep(except){$$('#rn .rdd.open').forEach(li=>{if(li!=except){li.classList.remove('open');$('.rc-b',li).setAttribute('aria-expanded','false')}})}
function setRep(li,o){closeRep(li);li.classList.toggle('open',o);$('.rc-b',li).setAttribute('aria-expanded',o);if(o){placeRep(li);const cur=$('.rdm a.on',li);$('.rdm',li).scrollTop=cur?cur.offsetTop-40:0}}
function wireReports(){
  $$('#rn .rdd').forEach(li=>{const b=$('.rc-b',li),links=()=>$$('.rdm a',li);
    b.onclick=e=>{e.stopPropagation();setRep(li,!li.classList.contains('open'))};
    b.onkeydown=e=>{if(e.key=='ArrowDown'){e.preventDefault();setRep(li,true);(links().find(a=>a.classList.contains('on'))||links()[0]).focus()}};
    $('.rdm',li).onkeydown=e=>{const l=links(),i=l.indexOf(document.activeElement);
      if(e.key=='ArrowDown'){e.preventDefault();l[Math.min(i+1,l.length-1)].focus()}else if(e.key=='ArrowUp'){e.preventDefault();i<=0?b.focus():l[i-1].focus()}
      else if(e.key=='Home'){e.preventDefault();l[0].focus()}else if(e.key=='End'){e.preventDefault();l[l.length-1].focus()}};
    li.addEventListener('focusout',e=>{if(!li.contains(e.relatedTarget))setRep(li,false)})});
  document.addEventListener('click',e=>{if(!e.target.closest('#rn'))closeRep()});
  document.addEventListener('keydown',e=>{if(e.key=='Escape'){const li=openRepLi();if(li){setRep(li,false);$('.rc-b',li).focus()}}});
  const re=()=>{const li=openRepLi();li&&placeRep(li)};addEventListener('resize',re);addEventListener('scroll',re,{passive:true});$('#rn .rc').addEventListener('scroll',re,{passive:true});
}

/* ---------- main area: Under Maintenance for the selected item ---------- */
function render(focusMain){const st=readState();setTop(st.m);drawSide(st);drawReports(st);
  const name=st.i||st.g||st.m,path=st.i?(st.g?`${st.m} › ${st.g}`:st.m):(st.g?st.m:'');
  renderMaintenance($('#maint'),{module:name,group:path,sub:'',msg:'mt.brMsg',note:st.bad?'mt.brNotFound':''});
  $('#live').textContent=$('#mt-h').textContent;
  if(focusMain){const h=$('#mt-h');h.tabIndex=-1;h.focus({preventScroll:true})}
}

/* ---------- in-layout navigation: top nav, sidebar and report links stay inside branch.html ---------- */
document.addEventListener('click',e=>{const a=e.target.closest('#mainnav a.nl,a[data-br]');
  if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.button)return;const h=a.getAttribute('href');if(!/^branch\.html(\?|$)/.test(h))return;
  e.preventDefault();if(h!=location.pathname.split('/').pop()+location.search)history.pushState(null,'',h);
  const hdr=$('#hdr');if(hdr.classList.contains('nav-open')){hdr.classList.remove('nav-open');$('#ntg').setAttribute('aria-expanded','false')}
  if(innerWidth<=900&&a.closest('#sb'))document.body.classList.remove('open-side');
  closeRep();const fromSide=!!a.closest('#sb');render(!fromSide);if(!fromSide)scrollTo(0,0)});
addEventListener('popstate',()=>render(false));
/* language change: labels already updated in place (applyI18n); refresh the text that is built per render */
I18N_HOOKS.push(()=>{$('#fy').textContent=fyText();render(false)});
render(false);
