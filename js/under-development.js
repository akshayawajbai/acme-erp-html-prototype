/* Reusable Under Development page:
   under-development.html?module=<Menu item>&from=<dashboard page>
   All values are written with textContent / validated whitelists – no HTML injection. */
function initUnderDevelopment(){
  const q=new URLSearchParams(location.search),raw=(q.get('module')||'').trim(),known=knownModules();
  const valid=known.has(raw);
  /* 1–3. read, validate and display the module name */
  $('#ud-h').textContent=valid?`${raw} — Under Development`:'Under Development';
  $('#ud-path').textContent=valid?(known.get(raw)!=raw?`${known.get(raw)} › ${raw}`:raw):'ACME ERP';
  if(!valid){$('#ud-warn').classList.add('show');
    $('#ud-warn-t').textContent=raw?'The requested module could not be found. Please choose an item from the navigation menu.':'No module was selected. Please choose an item from the navigation menu.'}
  /* 4. browser title */
  document.title=(valid?`${raw} — Under Development`:'Under Development')+' | AcME ERP';
  /* 5. Back to Dashboard – only internal dashboard pages are allowed as a return target */
  const allowed=[...new Set([...Object.values(HOME),'reports.html'])],from=q.get('from');
  $('#ud-back').href=allowed.includes(from)?from:(HOME[role]||'admin.html');
}
topbar();
initUnderDevelopment();
