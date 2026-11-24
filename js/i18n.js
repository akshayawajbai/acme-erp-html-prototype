/* =====================================================================
   ACME ERP – lightweight translation system (no dependencies)
   - Dictionaries: locales/en.js, locales/fr.js, locales/pt.js (window.I18N_DICT)
     .js instead of .json so the prototype also works when opened from disk (file://)
   - Used by the Head Office and Branch Office portals. Admin always stays English.
   - Menu items keep their English names as internal ids (URLs, routes, highlighting);
     only the displayed text is translated, via the key labelKey(id).
   ===================================================================== */
const LANGS=[
  {code:'en',name:'English',html:'en',intl:'en-GB'},
  {code:'fr',name:'Français',html:'fr',intl:'fr-FR'},
  {code:'pt',name:'Português',html:'pt-PT',intl:'pt-PT'} /* European Portuguese */
];
const LANG_KEY='acme-erp-language',I18N_PORTALS=['headoffice','branch'];
const I18N=window.I18N_DICT||{en:{}};
let LANG='en';
const I18N_HOOKS=[];            /* functions re-run after a language change (re-render dynamic text) */
const I18N_MISSING=new Set();   /* keys that fell back – checked by the tests, never shown to users */
const i18nOn=r=>I18N_PORTALS.includes(r);
const langInfo=(c=LANG)=>LANGS.find(x=>x.code==c)||LANGS[0];

function storedLang(){try{const l=localStorage.getItem(LANG_KEY);return LANGS.some(x=>x.code==l)?l:'en'}catch(e){return 'en'}}
/* Called once per page by topbar(): portals with i18n use the saved language, everything else English */
function initLang(portal){LANG=i18nOn(portal)?storedLang():'en';if(i18nOn(portal))document.documentElement.lang=langInfo().html}

/* t(key, vars) – translated UI text. Missing in the selected language → English; missing in English → warning + fallback */
function t(key,vars){
  let s=(I18N[LANG]||{})[key];
  if(s==null){s=(I18N.en||{})[key];
    if(s==null){if(!I18N_MISSING.has(key))console.warn('[i18n] missing key:',key);I18N_MISSING.add(key);s=vars&&vars._fb!=null?String(vars._fb):''}
    else if(LANG!='en')I18N_MISSING.add(LANG+':'+key)}
  return vars?s.replace(/\{(\w+)\}/g,(m,k)=>vars[k]!=null?vars[k]:m):s;
}
/* Menu labels: stable key derived from the internal id, e.g. "Trial Balance" → "menu.trialBalance" */
const labelKey=id=>'menu.'+String(id).normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9]+/g,' ').trim().split(' ')
  .map((w,i)=>{w=w.toLowerCase();return i?w[0].toUpperCase()+w.slice(1):w}).join('');
const tl=id=>t(labelKey(id),{_fb:id});
/* Menu path "Reports › Final Accounts" → translated segment by segment */
const tpath=p=>p?p.split(' › ').map(tl).join(' › '):'';

/* Dates: English keeps the existing dd-Mon-yyyy display; French/Portuguese use the locale's short month */
const EN_MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtDate(iso){const d=new Date(iso+'T00:00:00');
  if(LANG=='en')return `${String(d.getDate()).padStart(2,'0')}-${EN_MON[d.getMonth()]}-${d.getFullYear()}`;
  return new Intl.DateTimeFormat(langInfo().intl,{day:'2-digit',month:'short',year:'numeric'}).format(d)}

/* Update every marked element in place (keeps event listeners, open menus and navigation state) */
function applyI18n(root=document){
  root.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));
  root.querySelectorAll('[data-il]').forEach(e=>e.textContent=tl(e.dataset.il));
  root.querySelectorAll('[data-i18n-aria]').forEach(e=>e.setAttribute('aria-label',t(e.dataset.i18nAria)));
  root.querySelectorAll('[data-il-title]').forEach(e=>e.title=tl(e.dataset.ilTitle));
}
function setLang(code){
  if(!LANGS.some(x=>x.code==code))return;
  LANG=code;try{localStorage.setItem(LANG_KEY,code)}catch(e){/* storage unavailable – language applies to this page only */}
  document.documentElement.lang=langInfo().html;
  applyI18n();I18N_HOOKS.forEach(f=>f());
}
