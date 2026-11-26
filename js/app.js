/* =====================================================================
   AcME ERP – shared helpers, icons, header, navigation and UI widgets
   Loaded on every page after js/mock-data.js
   ===================================================================== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const role=sessionStorage.getItem('role'),page=location.pathname.split('/').pop();
if(!['login.html','index.html',''].includes(page)&&!role)location.href='login.html';
const inr=n=>'₹'+Number(n).toLocaleString('en-IN');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const badge=t=>`<span class="badge ${/^(Active|Valid|Synced|Conforming|Approved|Installed)$/.test(t)?'ok':/^(Pending|Expiring|Available)$/.test(t)?'warn':'err'}">${t}</span>`;
const pill=(t,c)=>`<span class="badge ${c}">${esc(t)}</span>`;

/* ---------- Icons (inline SVG, no external library) ---------- */
const ICONS={
  home:'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  user:'M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10',
  users:'M17 21a6 6 0 0 0-12 0M11 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21a5 5 0 0 0-4-5M16 4a4 4 0 0 1 0 8',
  shield:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
  key:'M8 20a4 4 0 1 0 0-8 4 4 0 0 0 0 8M10.8 13.2 20 4M16.5 7.5l3 3M14 10l2 2',
  lock:'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4M12 15v2',
  building:'M4 21V3h11v18M15 9h5v12M2 21h20M8 7h3M8 11h3M8 15h3',
  branch:'M3 9l2-5h14l2 5M4 9v11h16V9M3 9h18M9 20v-6h6v6',
  wrench:'M14.5 6.5a4 4 0 0 1 5.3-3.8L17 5.5l1.5 1.5 2.8-2.8a4 4 0 0 1-5.3 5.3L7.5 18a2 2 0 0 1-2.9-2.9z',
  trash:'M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 11v6M14 11v6',
  server:'M3 4h18v7H3zM3 13h18v7H3zM7 7.5h.01M7 16.5h.01',
  history:'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 3',
  mapPin:'M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
  list:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  fileText:'M14 2H6v20h12V6zM14 2v4h4M8 13h8M8 17h8M8 9h2',
  hash:'M4 9h16M4 15h16M10 3 8 21M16 3l-2 18',
  ticket:'M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4zM14 7v10',
  help:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01',
  book:'M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5zM4 19.5A2.5 2.5 0 0 1 6.5 17H20',
  bell:'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0',
  chev:'M6 9l6 6 6-6',
  menu:'M4 6h16M4 12h16M4 18h16',
  logout:'M9 21H5V3h4M16 17l5-5-5-5M21 12H9',
  refresh:'M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M3 21v-5h5',
  search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3',
  check:'M20 6 9 17l-5-5',
  x:'M18 6 6 18M6 6l12 12',
  alert:'M12 3 2 21h20zM12 10v5M12 18h.01',
  download:'M12 3v12M7 10l5 5 5-5M5 21h14',
  arrowLeft:'M19 12H5M12 19l-7-7 7-7',
  chart:'M3 3v18h18M7 15l4-4 3 3 5-6',
  clock:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M12 6v6l4 2',
  monitor:'M3 4h18v12H3zM8 20h8M12 16v4',
  cone:'M9.5 3h5l5 17h-15zM7.4 10h9.2M5.9 15h12.2M3 20h18',
  sidebar:'M3 4h18v16H3zM9 4v16',
  grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  wallet:'M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3zM3 7l13-4v4M17 13h.01',
  share:'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6M8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
  box:'M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
  cash:'M2 6h20v12H2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M6 12h.01M18 12h.01',
  database:'M4 5c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  calendar:'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4',
  info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M12 16v-5M12 8h.01',
  reply:'M9 14 4 9l5-5M4 9h10a6 6 0 0 1 6 6v5',
  globe:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20'
};
const ic=(n,cls='')=>`<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${ICONS[n]||ICONS.info}"/></svg>`;

/* ---------- Branding ---------- */
const ERP_HEADING='ERP FOR RELIGIOUS & NGOs';
/* Drop the original logo at assets/acme-logo.png – it replaces the placeholder automatically. */
const LOGO_SRC='assets/acme-logo.png';
const brandMark=()=>`<img class="logo-img" src="${LOGO_SRC}" alt="AcME ERP" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="wm" hidden aria-label="AcME ERP"><b>Ac<em>ME</em></b><i>ERP</i></span>`;
/* Centre heading per portal: Admin shows the ERP heading; Head Office and Branch Office show the organisation
   name (sessionStorage "ho" when an organisation is selected, otherwise the prototype's sample organisation) */
const ORG_SAMPLE='Salesian Province of Chennai';
const portalTitle=r=>(r=='headoffice'||r=='branch')?(sessionStorage.getItem('ho')||ORG_SAMPLE):ERP_HEADING;
/* All portals: the A logo is the first letter of the "Acme.erp" wordmark */
const logo=(r)=>(r=='admin'||r=='headoffice'||r=='branch')
  ?`<a class="logo logo-wm" href="${HOME[role]||'login.html'}" aria-label="${esc(t('ui.logoHome'))}" data-i18n-aria="ui.logoHome">${brandMark()}<span class="logo-txt" aria-hidden="true">cme.erp</span></a>`
  :`<a class="logo" href="${HOME[role]||'login.html'}" aria-label="AcME ERP home">${brandMark()}</a>`;

/* ---------- Navigation configuration (per role) ----------
   Item:  [label, href|null, children|null, icon]
   Child: [label, icon?, href?, subItems?] – no href → reusable Under Development / Maintenance page
          A child with subItems opens a nested submenu (any depth; sub-items use the same Child format).
          Desktop: nested submenus open to the side; mobile menu: they expand inline. */
const ROLE_NAME={admin:'Admin',headoffice:'Head Office',branch:'Branch Office'};
const ROLE_FULL={admin:'System Admin',headoffice:'Head Office User',branch:'Branch Accountant'};
const NAV={
  admin:[
    ['Home','admin.html',null,'home'],
    ['User',null,[['User','users'],['User Role','shield'],['User Rights','key'],['Change Password','lock']],'user'],
    ['Office',null,[['Head Office','building','headoffice.html'],['Branch Office','branch','branch.html']],'building'],
    ['Tools',null,[['Download Key','key'],['Delete Voucher','trash'],['Execute Query','database'],['Branch Logged History','history'],['Branch Location Logged History','mapPin']],'wrench'],
    ['Ticketing',null,[['Reply Ticket','reply']],'ticket'],
    ['Help',null,[['Head Office Manual','book'],['Branch Office Manual','book']],'help']
  ],
  /* Head Office: 9 modules – names and hierarchy from the original ERP Head Office screenshots */
  headoffice:[
    ['Home','headoffice.html',null,'home'],
    ['Users',null,[['User','users'],['User Role','shield'],['User Rights','key'],['Change Password','lock']],'user'],
    ['Office',null,[['Branch Office','branch'],['Branch Location','mapPin'],['Refresh Ledger Balance','refresh']],'building'],
    ['Data',null,[
      ['Finance Masters','database',null,[['Accounting Period'],['Ledger Group'],['Ledger'],['Project Category'],['Project'],['FC Purpose'],['Generalate Ledger Group'],['Lock Vouchers'],['Legal Entity'],['Governing Bodies'],['Map Governing Bodies']]],
      ['Mapping','share',null,[['Map Projects'],['Map Locations'],['Map Ledgers'],['Map Projects to User'],['Map Branch to User'],['Map Subsidy Ledgers'],['Map Generalate Ledgers by Project Category Group'],['Generalate Opening Balance']]],
      ['Vouchers','fileText',null,[['Vouchers'],['Fixed Deposit'],['Amendments']]],
      ['Settings','wrench',null,[['Global Setting'],['Disable/Approve Branch Receipt Module']]]
    ],'database'],
    ['Budget',null,[['Budget Approved','check']],'wallet'],
    ['Reports',null,[
      ['Masters','database',null,[['Head Office Ledgers'],['Head Office Project'],['Branch Bank Accounts'],['Branch-wise Balance'],['Branch Data Status'],['Branch Recent Export Details']]],
      ['Abstract','fileText',null,[['Monthly - Receipts'],['Monthly - Payments'],['Monthly - Receipts and Payments'],['Multi - Receipts'],['Multi - Payments'],['Multi - Receipts and Payments']]],
      ['Bank Activities','cash',null,[['Bank Balance Statement'],['Fixed Deposit Statement']]],
      ['Final Accounts','chart',null,[['Trial Balance'],['Receipts and Payments'],['Income and Expenditure'],['Balance Sheet'],['Profit and Loss Branch-wise'],['Budget with Actual Balance'],['Province Percentage']]],
      ['Branch Analysis','branch'], /* child items not visible in the screenshots – opens Under Maintenance directly */
      ['Foreign Contribution','globe',null,[['FC Purpose'],['FC Purpose Donor Institutional'],['FC Purpose Donor Individual'],['FC Country']]],
      ['Budget','wallet',null,[['Budget Details'],['Budget Variance'],['Budget Proposed and Approved Details']]],
      ['Generate Reports','list',null,[
        ['Rendiconto Report',null,null,[['Profit and Loss - Summary'],['Profit and Loss - Detailed'],['Balance Sheet']]],
        ['Rendiconto Report(Verification)',null,null,[['Receipts and Payments'],['Profit and Loss - Summary'],['Profit and Loss - Detailed'],['Profit and Loss - Branch Summary'],['Balance Sheet']]]
      ]]
    ],'chart'],
    ['Tools',null,[['Download Key','key'],['Download Master','download'],['Branch Grace Days (Locking)','clock'],['Branch Logged History','history'],['Branch Location Logged History','mapPin']],'wrench'],
    ['Ticketing',null,[['Post Ticket','ticket']],'ticket'],
    ['Help',null,[['User Manual','book']],'help']
  ],
  /* Branch Office: 6 modules (Update removed). Every module stays inside branch.html. */
  branch:[
    ['Home','branch.html',null,'home'],['Finance','branch.html?m=Finance',null,'wallet'],['Fixed Asset','branch.html?m=Fixed%20Asset',null,'box'],
    ['Payroll','branch.html?m=Payroll',null,'cash'],['Reports','branch.html?m=Reports',null,'chart'],['Utilities','branch.html?m=Utilities',null,'wrench']
  ]
};
/* Branch Office sidebar per module: [group, icon, items] – names and order from the original ERP screenshots */
const BRANCH_SIDE={
  'Finance':[
    ['Masters','database',['Legal Entities','Project Category','Project','Ledger Group','Ledger','Bank and Branch','Bank Account','Sundry Creditors & Debtors','Cost Centre Category','Cost Centre','Country','State','Lock Type','Donor','Purpose','Statistics Type','Vendors']],
    ['Accounting','fileText',['Receipt','Payment','Contra','Journal','Bank Reconciliation','Budget - Annual','Third Party Integration']],
    ['Investment','chart',['Investment Ledger','Opening Balance','Investment','Renewal','Post Interest','Withdrawal','Closed Investment','Register']],
    ['Options','wrench',['Refresh Ledger Balance','Define Voucher Number','Regenerate Voucher Number','Map Accounts','Merge Ledgers','Merge Cash/Bank Ledger','Delete Unused Ledgers','Ledger Options','Move / Delete Multiple Vouchers','Lock Voucher','Authorize Voucher','Bulk Update Narration','Settings']],
    ['Views','list',['Vouchers','Journal','Audit Log']]
  ],
  'Fixed Asset':[
    ['Masters','database',['Asset Class','Asset Item','Vendor','Manufacturer','Custodian','Bloc \\ Zone','Location','UoM']],
    ['Transactions','refresh',['Opening Asset','Purchase','Receive In-Kind','Sales / Disposal / Donation','Depreciation','Update Asset Details']],
    ['Views','list',['Fixed Asset Register']],
    ['Options','wrench',['Map Asset Ledger','Import Opening Stock','Configure']]
  ],
  /* Payroll: not shown in the screenshots – these are the items the prototype already had (unconfirmed) */
  'Payroll':[
    ['Payroll','cash',['Employee Master','Salary Processing','Payroll Reports']]
  ],
  'Utilities':[
    ['Configuration','wrench',['Institute Info','Settings','Transaction Period']],
    ['User Management','users',['User','User Role','User Rights','Manage User Security']],
    /* The two "Split Finance Ye..." labels are truncated in the screenshots and their full names are not in the project. */
    ['Data Management','database',['Import Data','Export Data','Migration','Export To Tally','Manage Multi Branch','Import Data (Split Finance Ye...)','Export Data (Split Finance Ye...)','Backup Database','Restore Database']]
  ]
};
/* Branch Office Reports: horizontal categories. null = no submenu known → opens Under Maintenance directly. */
const REPORT_CATS=[
  ['Abstract',['Monthly Abstract (Receipts)','Monthly Abstract (Payments)','Monthly Abstract (Receipts and Payments)','Multi Abstract Receipts','Multi Abstract Payments','Multi Abstract (Receipts and Payments)','Multi Abstract Receipts - Quarter-wise','Multi Abstract Payments - Quarter-wise','Multi Abstract (Receipts and Payments) - Quarter-wise','Multi Abstract Receipts - Year-wise','Multi Abstract Payments - Year-wise','Multi Abstract (Receipts and Payments) - Year-wise','Multi Abstract Receipts - Project-wise','Multi Abstract Payments - Project-wise']],
  ['Bank Activities',['Cheque Issued Register','Cheque Collected Register','Bank Reconciliation Statement','Bank Pass Book (Bank Actual Statement)','Bank Balance Statement','Cash Deposit Register','Cash Withdrawal Register','Investment Realized Register','Investment Statement','Investment Register','Investment Deposit Register','Investment Interest Register','Investment Interest Quarter-wise Register','Mutual Fund Register','Investment History','GST Payment Challan','GSTR-1 Outwards Register','GSTR-2 Inwards Register','GST Exemption Invoices']],
  ['Book of Accounts',['Cash Journal','Bank Journal','Cash and Bank Book','Ledger','Day Book','Province % Report','Journal Invoice Status']],
  ['Final Accounts',['Trial Balance','Receipts and Payments','Income and Expenditure','Balance Sheet','Receipts and Payments with Previous Year','Income and Expenditure - Month-wise','Income and Expenditure year wise','Balance Sheet - Year Wise']],
  ['Audit',['Voucher Statistics','Vouchers Audit Log','Receipts and Payments - Cash and Bank','Abstract Receipts - Cash and Bank (Project)','Abstract Payments - Cash and Bank (Project)','Abstract Receipts and Payments - Cash and Bank (Project)','Abstract Receipts and Payments - Cash and Bank wise','Profit and Loss (Verification)','Statistical Report','Track on Voucher Changes by Users','Cost Centre enabled Ledgers List','Audited Vouchers','Track on Auditor Changes']],
  ['Contribution',['Purpose','Donor-wise Contribution List','Purpose wise Receipts and Payments','10BD - 80G Report','Donor Institutional','Donor Individual','Country','Purpose-wise Receipts/Utilisation Statement','Purpose-wise Receipts/Utilisation Statement - Cash and Bank','Purpose-wise Receipts/Utilisation - Cost Centre Distribution']],
  ['Cost Centre',['Abstract (Receipts and Payments)','Cash Journal','Bank Journal','Cash and Bank Book','Ledger','Ledger - Cost Centre-wise','Cost Centre - Statement of Accounts','Receipts and Payments','Income and Expenditure','Consolidated Report','Cost Centre Summary']],
  ['Financial Records',['Receipt Voucher','Payment Voucher','Contra Voucher','Journal Voucher','Purchase slip','Journal -Invoice','Cash/Bank Transactions','Journal Transactions','Detail Transactions','Cheque Printing','Authority Signature']],
  ['Budget',['Budget Details','Budget Details - Project-wise','Budget Annual Summary','Budget - Approved','Budget - Balance Sheet','Budget - Realization','Budget - Quarterly Realization','Budget - Variance','Budget -Years Comparison','Multi Year Budget (Verification)','Multi Year Budget Consolidated (Verification)','Budget Cost Centre - Ledger-wise']]
];
/* Report dropdown separators: a thin divider is drawn before each listed item (groups of related reports) */
const REPORT_SEP={
  'Book of Accounts':['Ledger','Province % Report'],
  'Audit':['Receipts and Payments - Cash and Bank','Profit and Loss (Verification)','Track on Voucher Changes by Users'],
  'Contribution':['Donor Institutional','Purpose-wise Receipts/Utilisation Statement'],
  'Cost Centre':['Cash Journal','Cost Centre - Statement of Accounts','Consolidated Report'],
  'Financial Records':['Cash/Bank Transactions','Cheque Printing'],
  'Budget':['Budget - Balance Sheet','Multi Year Budget (Verification)','Budget Cost Centre - Ledger-wise']
};
/* Branch Office sidebar group expanded when a module opens (others start collapsed); modules not listed open their first group */
const BRANCH_SIDE_OPEN={'Finance':'Accounting'};

/* Link to the reusable Under Development page */
const udLink=m=>`under-development.html?module=${encodeURIComponent(m)}&from=${encodeURIComponent(page||'')}`;
/* Full menu path of an item – distinguishes repeated names (e.g. "Reports › Final Accounts › Balance Sheet") */
const navKey=(l,g)=>g?`${g} › ${l}`:l;
/* Walk a portal menu: fn(label, href, path) for every top-level item without children and every leaf item,
   at any depth. path = parent labels joined with " › " (e.g. "Reports › Generate Reports › Rendiconto Report"). */
function walkNav(items,fn){const kids=(list,path)=>list.forEach(([l,,h,sub])=>sub?kids(sub,navKey(l,path)):fn(l,h,path));
  (items||[]).forEach(([l,h,ch])=>ch?kids(ch,l):fn(l,h,''))}
/* Leaf names that occur more than once in a portal menu (their links carry the full path) */
function dupLabels(r){const n=new Map();walkNav(NAV[r],l=>n.set(l,(n.get(l)||0)+1));return new Set([...n].filter(([,c])=>c>1).map(([l])=>l))}
/* Every module name that may legitimately open the Under Development page, mapped to its group */
function knownModules(){const k=new Map([['My Account','Account']]);
  Object.values(NAV).forEach(items=>walkNav(items,(l,h,g)=>{if(!h)k.set(l,g||l)}));
  Object.entries(BRANCH_SIDE).forEach(([m,gs])=>gs.forEach(([g,,ls])=>ls.forEach(l=>k.has(l)||k.set(l,`${m} › ${g}`))));return k}

/* ---------- Maintenance mode ----------
   The Admin and Head Office dashboards have been removed: those portals show only the Under Maintenance
   view, and every menu item in them opens under-maintenance.html. Keep on:true. */
const MAINT={on:true,roles:['admin','headoffice'],pages:['admin.html','headoffice.html']};
const inMaint=r=>MAINT.on&&MAINT.roles.includes(r);
/* path (parent menus) is added only for names that repeat in the portal menu */
const umLink=(m,r,g='')=>`under-maintenance.html?module=${encodeURIComponent(m)}${g?`&path=${encodeURIComponent(g)}`:''}&role=${encodeURIComponent(r)}`;

/* ---------- Header + navigation ----------
   opts.navRole – which portal's menu to show (presentation only, defaults to the signed-in role)
   opts.active  – full menu path (navKey) to highlight (used by the maintenance views) */
function topbar(extra='',lead='',opts={}){
  const navRole=opts.navRole||role,items=NAV[navRole]||[],mod=new URLSearchParams(location.search).get('module');
  document.body.dataset.portal=navRole||'';
  initLang(navRole); /* Head Office / Branch Office: saved language; every other portal: English */
  const multi=i18nOn(navRole);
  const isOn=(h,l,k)=>opts.active?k==opts.active:((h&&h==page)||(page=='under-development.html'&&!h&&l==mod));
  const dup=dupLabels(navRole),dest=(l,h,g)=>inMaint(navRole)?umLink(l,navRole,dup.has(l)?g:''):(h||udLink(l));
  const notes=['note.pendingUploads','note.licenceExpiry','note.softwareUpdate'];
  const anyOn=(list,path)=>list.some(([cl,,chh,sb])=>{const k=navKey(cl,path);return sb?anyOn(sb,k):isOn(chh,cl,k)});
  /* menu text: internal id stays in data-k / URLs; the visible label is translated (data-il) */
  const lbl=id=>`<span data-il="${esc(id)}">${esc(tl(id))}</span>`;
  /* dropdown items, recursively: a child with sub-items is a nested submenu toggle */
  let uid=0;
  const kids=(list,path)=>list.map(([cl,cic,chh,sb])=>{const k=navKey(cl,path),di=cic?`<span class="dmi">${ic(cic)}</span>`:'';
    if(!sb){const on=isOn(chh,cl,k);return `<li><a class="${on?'on':''}" href="${dest(cl,chh,path)}" data-k="${esc(k)}"${on?' aria-current="page"':''}>${di}${lbl(cl)}</a></li>`}
    const id='dms'+(++uid);
    return `<li class="dsm"><button type="button" class="st${anyOn(sb,k)?' on':''}" aria-expanded="false" aria-controls="${id}">${di}${lbl(cl)}${ic('chev','cv-s')}</button><ul class="dm2" id="${id}">${kids(sb,k)}</ul></li>`}).join('');
  const nav=items.map(([l,h,ch,icn],i)=>{
    if(!ch){const on=isOn(h,l,l);return `<li><a class="nl${on?' on':''}" href="${dest(l,h,'')}" data-k="${esc(l)}"${on?' aria-current="page"':''}>${ic(icn)}${lbl(l)}</a></li>`}
    return `<li class="dd"><button type="button" class="nl dt${anyOn(ch,l)?' on':''}" aria-expanded="false" aria-controls="dm${i}" data-k="${esc(l)}">${ic(icn)}${lbl(l)}${ic('chev','cv-i')}</button><ul class="dm" id="dm${i}">${kids(ch,l)}</ul></li>`}).join('');
  /* language selector – Head Office and Branch Office only */
  const langSel=multi?`<div class="lang-w"><button type="button" class="ib lang-b" id="lang" aria-expanded="false" aria-controls="lgm">${ic('globe')}<span class="lang-t"></span>${ic('chev','cv-i')}</button>
      <div class="menu lang-m" id="lgm"><p class="mh" data-i18n="ui.language">${esc(t('ui.language'))}</p>${LANGS.map(l=>`<button type="button" class="mi" data-lang="${l.code}" lang="${l.html}" aria-pressed="false">${ic('check','lg-ck')}<span>${esc(l.name)}</span></button>`).join('')}</div></div>`:'';
  const roleName=`<b data-i18n="role.${esc(role||'none')}">${esc(t('role.'+role,{_fb:'User'}))}</b>`;
  $('#top').outerHTML=`<header class="top nav-${esc(navRole||'none')}" id="hdr">
  <div class="hbar">
    <div class="hl"><button type="button" class="ib nav-tg" id="ntg" aria-label="${esc(t('ui.openNav'))}" aria-expanded="false" aria-controls="mainnav">${ic('menu')}</button>${lead}${logo(navRole)}</div>
    <div class="brand-title"><span>${esc(portalTitle(navRole))}</span></div>
    <div class="right">
      ${langSel}
      <button type="button" class="ib" id="bell" aria-expanded="false" aria-controls="nm">${ic('bell')}<i>${notes.length}</i></button>
      <button type="button" class="pf" id="um" aria-label="${esc(t('ui.userMenu'))}" data-i18n-aria="ui.userMenu" aria-expanded="false" aria-controls="umn"><span class="av">${ic('user')}</span><span class="pf-t"><small data-i18n="ui.welcome">${esc(t('ui.welcome'))}</small> ${roleName}</span>${ic('chev','cv-i')}</button>
      <div class="menu" id="nm"><p class="mh" data-i18n="ui.notifications">${esc(t('ui.notifications'))}</p>${notes.map(n=>`<div class="mi">${ic('bell')}<span data-i18n="${n}">${esc(t(n))}</span></div>`).join('')}</div>
      <div class="menu" id="umn"><div class="mu"><span class="av lg">${ic('user')}</span><div><b><span data-i18n="ui.welcome">${esc(t('ui.welcome'))}</span> ${roleName}</b><small><span data-i18n="roleFull.${esc(role||'none')}">${esc(t('roleFull.'+role))}</span> · <span data-i18n="ui.role">${esc(t('ui.role'))}</span>: ${esc(role||'')}</small></div></div>
        <a class="mi" href="${inMaint(role)?umLink('My Account',role):udLink('My Account')}">${ic('user')}${lbl('My Account')}</a>
        <button type="button" class="mi" id="lo">${ic('logout')}<span data-i18n="ui.logout">${esc(t('ui.logout'))}</span></button></div>
    </div>
  </div>
  <nav class="nbar" id="mainnav" aria-label="${esc(t('ui.mainNav'))}" data-i18n-aria="ui.mainNav"><ul class="links">${nav}</ul>${extra?`<div class="nx">${extra}</div>`:''}</nav>
</header>`;
  const hdr=$('#hdr'),closeAll=(except)=>{$$('.menu',hdr).forEach(m=>m!=except&&m.classList.remove('open'));$$('#bell,#um,#lang',hdr).forEach(b=>b.getAttribute('aria-controls')!=(except&&except.id)&&b.setAttribute('aria-expanded','false'))};
  const tg=(b,m)=>$(b).onclick=e=>{e.stopPropagation();closeDD();const mm=$(m),o=!mm.classList.contains('open');closeAll(mm);mm.classList.toggle('open',o);$(b).setAttribute('aria-expanded',o)};
  tg('#bell','#nm');tg('#um','#umn');
  /* header text that needs values (counts, current language) – refreshed after a language change */
  const relabel=()=>{$('#bell').setAttribute('aria-label',t('ui.notificationsCount',{n:notes.length}));
    $('#ntg').setAttribute('aria-label',t(hdr.classList.contains('nav-open')?'ui.closeNav':'ui.openNav'));
    if(multi){const L=langInfo();$('#lang .lang-t').textContent=L.name;$('#lang').setAttribute('aria-label',t('ui.languageCurrent',{lang:L.name}));
      $$('#lgm [data-lang]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.lang==LANG))}};
  relabel();I18N_HOOKS.push(relabel);
  if(multi){tg('#lang','#lgm');
    $('#lgm').onclick=e=>{const x=e.target.closest('[data-lang]');if(!x)return;e.stopPropagation();closeAll();setLang(x.dataset.lang);$('#lang').focus()}}
  /* dropdowns: click / touch / keyboard (disclosure pattern) */
  const closeDD=(keep)=>$$('.dd',hdr).forEach(d=>{if(d!=keep){d.classList.remove('open');$('.dt',d).setAttribute('aria-expanded','false')}});
  /* nested submenus: side flyouts on desktop (≥901px), inline accordion in the mobile menu */
  const fly=()=>matchMedia('(min-width:901px)').matches;
  const subBtn=s=>$(':scope>.st',s),subList=s=>$(':scope>.dm2',s);
  /* flyout opens to the right of its parent item; flips left when there is no room, and moves up to stay on screen */
  const placeSub=s=>{const p=subList(s);s.classList.remove('flip');p.style.top='';if(!fly())return;
    const vw=document.documentElement.clientWidth,r=p.getBoundingClientRect();
    if(r.right>vw-8){s.classList.add('flip');const r2=p.getBoundingClientRect();if(8-r2.left>r.right-(vw-8))s.classList.remove('flip')}
    const r3=p.getBoundingClientRect(),over=r3.bottom-(innerHeight-8);if(over>0)p.style.top=`${-4-Math.min(over,r3.top-8)}px`};
  const setSub=(s,o)=>{
    if(o)[...s.parentElement.children].forEach(x=>x!=s&&x.classList.contains('open')&&setSub(x,false)); /* one open submenu per level */
    else $$('.dsm.open',s).forEach(x=>{x.classList.remove('open');subBtn(x).setAttribute('aria-expanded','false')});
    s.classList.toggle('open',o);subBtn(s).setAttribute('aria-expanded',o);if(o)placeSub(s)};
  $$('.dd',hdr).forEach(d=>{const b=$('.dt',d),dm=$('.dm',d);
    const closeSubs=()=>$$('.dsm.open',d).forEach(x=>{x.classList.remove('open');subBtn(x).setAttribute('aria-expanded','false')});
    const set=o=>{d.classList.toggle('open',o);b.setAttribute('aria-expanded',o);if(!o)closeSubs()};
    /* keyboard lists: desktop → items of the current menu level; mobile → every visible item */
    const visible=()=>$$('.dm a,.dm .st',d).filter(x=>x.offsetParent!==null);
    const level=a=>[...a.closest('ul').children].map(li=>$(':scope>a,:scope>.st',li)).filter(Boolean);
    $$('.st',d).forEach(s=>s.onclick=e=>{e.stopPropagation();const li=s.parentElement;setSub(li,!li.classList.contains('open'))});
    /* mouse hover (desktop): open the hovered submenu after a short delay and close its siblings – avoids flicker on diagonal moves */
    let ht;dm.addEventListener('mouseover',e=>{if(!fly()||!matchMedia('(hover:hover)').matches)return;const li=e.target.closest('li');if(!li||!d.contains(li))return;
      clearTimeout(ht);ht=setTimeout(()=>{if(li.classList.contains('dsm')){if(!li.classList.contains('open'))setSub(li,true)}
        else[...li.parentElement.children].forEach(x=>x.classList.contains('open')&&setSub(x,false))},110)});
    d.addEventListener('mouseleave',()=>{clearTimeout(ht);if(!d.classList.contains('open'))closeSubs()});
    b.onclick=e=>{e.stopPropagation();closeAll();const o=!d.classList.contains('open');closeDD(d);set(o)};
    b.onkeydown=e=>{if(e.key=='ArrowDown'){e.preventDefault();closeDD(d);set(true);visible()[0].focus()}};
    dm.onkeydown=e=>{const a=document.activeElement;if(!dm.contains(a))return;
      const l=fly()?level(a):visible(),i=l.indexOf(a),parent=a.closest('ul').closest('.dsm');
      if(e.key=='ArrowDown'){e.preventDefault();l[(i+1)%l.length].focus()}
      else if(e.key=='ArrowUp'){e.preventDefault();if(i>0)l[i-1].focus();else if(fly()&&parent)l[l.length-1].focus();else b.focus()}
      else if(e.key=='Home'){e.preventDefault();l[0].focus()}else if(e.key=='End'){e.preventDefault();l[l.length-1].focus()}
      else if(e.key=='ArrowRight'&&a.classList.contains('st')){e.preventDefault();const s=a.parentElement;setSub(s,true);$(':scope>.dm2>li>a,:scope>.dm2>li>.st',s).focus()}
      else if(e.key=='ArrowLeft'&&parent){e.preventDefault();setSub(parent,false);subBtn(parent).focus()}};
    d.addEventListener('focusout',e=>{if(!d.contains(e.relatedTarget))set(false)})});
  document.addEventListener('click',e=>{if(!hdr.contains(e.target)){closeAll();closeDD()}});
  document.addEventListener('keydown',e=>{if(e.key!='Escape')return;const d=e.target.closest&&e.target.closest('.dd');closeAll();closeDD();if(d)$('.dt',d).focus();
    if(hdr.classList.contains('nav-open')&&!d){hdr.classList.remove('nav-open');$('#ntg').setAttribute('aria-expanded','false');$('#ntg').focus()}});
  $('#ntg').onclick=e=>{e.stopPropagation();const o=!hdr.classList.contains('nav-open');hdr.classList.toggle('nav-open',o);e.currentTarget.setAttribute('aria-expanded',o);e.currentTarget.setAttribute('aria-label',t(o?'ui.closeNav':'ui.openNav'))};
  $('#lo').onclick=()=>{sessionStorage.clear();location.href='login.html'};
  /* layout: content height = viewport − real header height (header bar + nav bar on desktop; the mobile nav panel is absolute, so excluded).
     Measured instead of hard-coded so zoom, font fallback and breakpoints never push the page into scrolling. */
  const root=document.documentElement;root.classList.add('app');
  const setHH=()=>root.style.setProperty('--hh',hdr.offsetHeight+'px');setHH();
  if(window.ResizeObserver)new ResizeObserver(setHH).observe(hdr);else addEventListener('resize',setHH);
}

/* ---------- Toast + modal ---------- */
function toast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.setAttribute('role','status');document.body.append(t)}t.textContent=m;t.style.display='block';clearTimeout(t.h);t.h=setTimeout(()=>t.style.display='none',2600)}
function modal(title,html,acts=[['Close']]){let o=$('#ov');if(!o){o=document.createElement('div');o.id='ov';o.className='ov';document.body.append(o)}
o.innerHTML=`<div class=mod role=dialog aria-modal=true aria-label="${esc(title)}"><h2>${title}</h2>${html}<div class=act>${acts.map((a,i)=>`<button class="btn ${i&&a[0]!='Reset'?'pr':''}" data-i=${i}>${a[0]}</button>`).join('')}</div></div>`;o.classList.add('open');
$$('.act .btn',o).forEach(b=>b.onclick=()=>{const f=acts[b.dataset.i][1];if(!f||f()!==false)o.classList.remove('open')});o.onclick=e=>{if(e.target===o)o.classList.remove('open')};const l=$$('.act .btn',o);l[l.length-1].focus()}
const confirmBox=(msg,fn)=>modal('Please confirm',`<p>${msg}</p>`,[['Cancel'],['Confirm',fn]]);
document.addEventListener('keydown',e=>{if(e.key=='Escape'){const o=$('#ov.open');o&&o.classList.remove('open')}});

/* ---------- Data table: search, sort, paging ---------- */
function DT(el,cols,rows,ps=5){let q='',sk=null,sd=1,p=0;el.innerHTML=`<div class=tools><span class=srch>${ic('search')}<input placeholder="Search…" aria-label=Search></span></div><div class=scroll><table><thead><tr>${cols.map((c,i)=>`<th data-i=${i} class="${c.r?'num':''}">${c.t} ↕</th>`).join('')}</tr></thead><tbody></tbody></table></div><div class=pg></div>`;
const draw=()=>{let r=rows.filter(x=>JSON.stringify(Object.values(x)).toLowerCase().includes(q));if(sk)r.sort((a,b)=>(a[sk]>b[sk]?1:-1)*sd);const n=Math.max(1,Math.ceil(r.length/ps));p=Math.min(p,n-1);
$('tbody',el).innerHTML=r.slice(p*ps,p*ps+ps).map(x=>`<tr>${cols.map(c=>`<td class="${c.r?'num':''}">${c.f?c.f(x):x[c.k]}</td>`).join('')}</tr>`).join('')||'<tr><td colspan=99 class=empty>No matching records. Clear the search to see all.</td></tr>';
$('.pg',el).innerHTML=`<span>${r.length} records</span><span><button class="btn sm" data-d=-1 aria-label="Previous page">‹</button> ${p+1} / ${n} <button class="btn sm" data-d=1 aria-label="Next page">›</button></span>`;el.rows=r;$$('.pg .btn',el).forEach(b=>b.onclick=()=>{p=Math.max(0,Math.min(n-1,p+ +b.dataset.d));draw()})};
$('input',el).oninput=e=>{q=e.target.value.toLowerCase();p=0;draw()};$$('th',el).forEach(h=>h.onclick=()=>{const k=cols[h.dataset.i].k;if(!k)return;sd=sk==k?-sd:1;sk=k;draw()});el.draw=draw;el.set=r=>{rows=r;draw()};draw();return el}

/* ---------- Charts ---------- */
const C={p:'#00A8CC',s:'#005B96',d:'#003B70',o:'#F59E0B',r:'#EF4444',g:'#16A34A'};
if(window.Chart){Chart.defaults.font.family="Rubik,'Segoe UI',system-ui,sans-serif";Chart.defaults.color='#64748B'}
let CH={};function chart(id,type,labels,sets,opt={}){CH[id]&&CH[id].destroy();CH[id]=new Chart($('#'+id),{type,data:{labels,datasets:sets},options:{responsive:true,maintainAspectRatio:false,...opt}});return CH[id]}

/* ---------- Static icons ---------- */
function initUI(root=document){
  $$('[data-ic]',root).forEach(e=>{e.innerHTML=ic(e.dataset.ic);e.removeAttribute('data-ic')});
}
document.addEventListener('DOMContentLoaded',()=>initUI());
