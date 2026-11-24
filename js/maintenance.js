/* =====================================================================
   Reusable "Under Maintenance" view – Admin and Head Office portals
   Used by admin.html / headoffice.html (inline) and under-maintenance.html.
   Module names and return paths come from allowlists; text is written
   with textContent only. No ERP operation is ever executed here.
   ===================================================================== */
const MT_ROLES=['admin','headoffice'];

/* Allowlist: every clickable menu item of a portal (any depth), plus "Home" and "My Account".
   Keyed by full menu path (navKey) so repeated names stay distinct → {label, group} */
function maintModules(r){const m=new Map([['Home',{label:'Home',group:''}],['My Account',{label:'My Account',group:'Account'}]]);
  walkNav(NAV[r],(l,h,g)=>m.set(navKey(l,g),{label:l,group:g}));return m}
/* Resolve ?module= (+ optional ?path=) to an allowlisted key; a name without a path must be unique */
function maintKey(all,raw,path){if(path)return all.has(navKey(raw,path))?navKey(raw,path):null;if(all.has(raw))return raw;
  const hits=[...all].filter(([,v])=>v.label==raw);return hits.length==1?hits[0][0]:null}

/* Which portal menu to show. ?role= is presentation only: an Admin may preview either portal,
   everyone else always sees their own menu (no Admin items leak into Head Office). */
function maintNavRole(){const p=new URLSearchParams(location.search).get('role');
  if(role=='admin'&&MT_ROLES.includes(p))return p;return role}

const MT_ART=`<svg viewBox="0 0 160 160" aria-hidden="true" focusable="false">
  <defs><linearGradient id="mtg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--p)"/><stop offset="1" style="stop-color:var(--s)"/></linearGradient></defs>
  <circle cx="80" cy="80" r="72" style="fill:var(--lc)"/>
  <g class="g1"><circle cx="66" cy="74" r="34" fill="none" stroke="url(#mtg)" stroke-width="12" stroke-dasharray="9 8.8"/><circle cx="66" cy="74" r="29" fill="url(#mtg)"/><circle cx="66" cy="74" r="11" style="fill:var(--lc)"/></g>
  <g class="g2"><circle cx="113" cy="109" r="16" fill="none" style="stroke:var(--d)" stroke-width="8" stroke-dasharray="6 6.57"/><circle cx="113" cy="109" r="13" style="fill:var(--d)"/><circle cx="113" cy="109" r="5" style="fill:var(--lc)"/></g>
</svg>`;

/* Render the maintenance card into el.
   module – selected menu label (already validated) or null; group – its parent menu;
   note – message for a missing/invalid module; back – internal URL for "Back to Home" or null
   sub / msg – translation keys of the subheading and description (Admin/Head Office defaults; Branch Office passes its own)
   module and group are internal menu ids (English); they are shown translated in the current language. */
function renderMaintenance(el,{module=null,group='',note='',back=null,sub='mt.sub',msg='mt.msg'}={}){
  el.innerHTML=`<section class="ud-card" aria-labelledby="mt-h">
    <div class="ud-art mt-art">${MT_ART}</div>
    <span class="ud-pill">${ic('wrench')}<span id="mt-pill"></span></span>
    <p class="ud-path" id="mt-path"></p>
    <h1 id="mt-h"></h1>
    <div class="demo-note ud-warn" id="mt-warn" role="status">${ic('info')}<span id="mt-warn-t"></span></div>
    ${sub?'<h2 id="mt-sub"></h2>':''}
    <p class="msg" id="mt-msg"></p>
    ${back?`<a class="btn pr" id="mt-back">${ic('arrowLeft')}<span id="mt-back-t"></span></a>`:''}
  </section>`;
  const um=t('mt.title'),name=module?tl(module):'';
  $('#mt-pill').textContent=um;
  if(sub)$('#mt-sub').textContent=t(sub);$('#mt-msg').textContent=t(msg);
  $('#mt-h').textContent=module?`${name} — ${um}`:um;
  $('#mt-path').textContent=module?(group?`${tpath(group)} › ${name}`:name):'ACME ERP';
  if(note){$('#mt-warn').classList.add('show');$('#mt-warn-t').textContent=t(note)}
  if(back){$('#mt-back').href=back;$('#mt-back-t').textContent=t('mt.back')}
  document.title=(module?`${name} — ${um}`:um)+' | AcME ERP';
}

/* admin.html / headoffice.html: hide the dashboard, show maintenance in place.
   The module shown is the menu item that normally points at this page. */
function portalModule(r,file){let mod=null;walkNav(NAV[r],(l,h)=>{if(h==file)mod=l});return mod||(NAV[r]&&NAV[r][0][0])||'Home'}
function showPortalMaintenance(extra=''){
  const mod=portalModule(role,page),all=maintModules(role),k=maintKey(all,mod,'')||mod;
  topbar(extra,'',{active:k});
  const el=$('#maint');el.hidden=false;
  renderMaintenance(el,{module:mod,group:(all.get(k)||{}).group||''}); /* already on the portal home – no Back button */
  maintInPlace(role);
}

/* under-maintenance.html?module=…[&path=…]&role=…: validated view options for the current URL */
function maintView(navRole){
  const q=new URLSearchParams(location.search),all=maintModules(navRole),raw=(q.get('module')||'').trim();
  const key=maintKey(all,raw,(q.get('path')||'').trim()),v=key&&all.get(key);
  return {active:key?(key=='Home'?NAV[navRole][0][0]:key):null,
    opts:{module:v?v.label:null,group:v?v.group:'',
      note:v?'':(raw?'mt.notFound':'mt.noModule'),
      back:HOME[navRole]||null}}; /* internal portal home only – never a URL taken from the query string */
}

/* Highlight a menu item (by full path) in the rendered navigation, plus its submenu toggles and top-level item */
function maintSetActive(key){
  $$('#mainnav .links a,#mainnav .dt,#mainnav .st').forEach(x=>{x.classList.remove('on');x.removeAttribute('aria-current')});
  const a=key&&$$('#mainnav .links a[data-k]').find(x=>x.dataset.k==key);if(!a)return;
  a.classList.add('on');a.setAttribute('aria-current','page');
  for(let s=a.closest('.dsm');s;s=s.parentElement.closest('.dsm'))$(':scope>.st',s).classList.add('on');
  const dd=a.closest('.dd');if(dd)$('.dt',dd).classList.add('on');
}

/* Admin + Head Office portals: menu items update the maintenance view in place (history.pushState) instead of
   reloading the page. Only the portal's own maintenance URLs are handled; anything else navigates normally. */
function maintInPlace(navRole){
  if(!MT_ROLES.includes(navRole))return;
  const file=()=>location.pathname.split('/').pop(),own=new RegExp(`^under-maintenance\\.html\\?module=[^&]*(&path=[^&]*)?&role=${navRole}$`);
  const route=()=>{const f=file(),el=$('#maint');
    if(f=='under-maintenance.html'){const v=maintView(navRole);renderMaintenance(el,v.opts);maintSetActive(v.active)}
    else{const mod=portalModule(navRole,f),all=maintModules(navRole),k=maintKey(all,mod,'')||mod;renderMaintenance(el,{module:mod,group:(all.get(k)||{}).group||''});maintSetActive(k)}};
  I18N_HOOKS.push(route); /* language change: re-render the current maintenance view in the new language */
  document.addEventListener('click',e=>{
    const a=e.target.closest('#mainnav .links a,#umn a.mi,#mt-back');
    if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.button)return;
    const h=a.getAttribute('href')||'';
    if(!own.test(h)&&h!=HOME[navRole])return;
    e.preventDefault();
    if(h!=file()+location.search)history.pushState(null,'',h);
    const hdr=$('#hdr');
    $$('.dd.open',hdr).forEach(d=>{d.classList.remove('open');$('.dt',d).setAttribute('aria-expanded','false')});
    $$('.dsm.open',hdr).forEach(s=>{s.classList.remove('open');$(':scope>.st',s).setAttribute('aria-expanded','false')});
    const dd=a.closest('.dd');if(dd){dd.classList.add('hold');dd.addEventListener('mouseleave',()=>dd.classList.remove('hold'),{once:true})}
    $$('.menu.open',hdr).forEach(m=>m.classList.remove('open'));$$('#bell,#um',hdr).forEach(b=>b.setAttribute('aria-expanded','false'));
    if(hdr.classList.contains('nav-open')){hdr.classList.remove('nav-open');$('#ntg').setAttribute('aria-expanded','false')}
    route();scrollTo(0,0);const h1=$('#mt-h');h1.tabIndex=-1;h1.focus({preventScroll:true});
  });
  addEventListener('popstate',route);
}
