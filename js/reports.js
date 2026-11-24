topbar();
const RT=['Receipts and Payments','Income and Expenditure','Trial Balance','Balance Sheet','General Ledger','Cash Book','Bank Book','Budget vs Actual','Cost Centre-Wise Report','Project-Wise Report','Monthly Abstract','Branch Consolidated Report'];
const mult={admin:40,headoffice:8,branch:1}[role];$('#sc').textContent={admin:'Organization-wide data (all Head Offices)',headoffice:'Your Head Office and its branches',branch:'Your branch data only'}[role];
const opt=a=>a.map(x=>`<option>${x}</option>`).join('');$('#ho').innerHTML=opt(['All Head Offices',...HO.map(h=>h.name)]);$('#br').innerHTML=opt(['All Branches',...PROJECTS.slice(0,5)]);$('#pj').innerHTML=opt(['All Projects','Hostel','Local']);$('#fy').innerHTML=opt(FYS);$('#rt').innerHTML=opt(RT);
$('#ho').disabled=role!='admin';$('#br').disabled=role=='branch';
const t=DT($('#t'),[{t:'Month',k:'m'},{t:'Receipts',k:'r',r:1,f:x=>inr(x.r)},{t:'Payments',k:'p',r:1,f:x=>inr(x.p)},{t:'Difference',k:'d',r:1,f:x=>inr(x.d)}],[],6);
function gen(){const f=$('#fy').value==FYS[0]?1:.92,fd=new Date($('#fd').value),td=new Date($('#td').value);const rows=MONTHS.map((m,i)=>{const y=i<9?(+$('#fy').value.slice(0,4)):(+$('#fy').value.slice(0,4)+1),d=new Date(y,[3,4,5,6,7,8,9,10,11,0,1,2][i],1);const r=Math.round(REC[i]*mult*f),p=Math.round(PAY[i]*mult*f);return{m,d,r,p,bud:Math.round(r*1.05),dif:r-p}}).filter(x=>x.r>0&&(isNaN(fd)||x.d>=new Date(fd.getFullYear(),fd.getMonth(),1))&&(isNaN(td)||x.d<=td)).map(x=>({...x,d:x.dif}));
window.D=rows;t.set(rows.map(x=>({m:x.m,r:x.r,p:x.p,d:x.d,bud:x.bud})));const R=rows.reduce((a,x)=>a+x.r,0),P=rows.reduce((a,x)=>a+x.p,0);
$('#rh').textContent=$('#rt').value+' – FY '+$('#fy').value;$('#gt').textContent=`Grand total: Receipts ${inr(R)} · Payments ${inr(P)} · Difference ${inr(R-P)}`;
$('#k').innerHTML=[['Total Receipts',inr(R)],['Total Payments',inr(P)],['Surplus',inr(R-P)],['Budget Utilised',R?Math.round(P/R*100)+'%':'0%']].map((k,i)=>`<div class="card kpi ${i==2?'hero':''}"><small>${k[0]}</small><b>${k[1]}</b></div>`).join('');
const L=rows.map(x=>x.m);chart('c1','bar',L,[{label:'Receipts',data:rows.map(x=>x.r),backgroundColor:C.s},{label:'Payments',data:rows.map(x=>x.p),backgroundColor:C.o}]);
chart('c2','bar',L,[{label:'Budget',data:rows.map(x=>x.bud),backgroundColor:'#cbd5e1'},{label:'Actual',data:rows.map(x=>x.p),backgroundColor:C.p}]);
chart('c3','line',L,[{label:'Surplus',data:rows.map(x=>x.d),borderColor:C.g,tension:.3}]);chart('c4','doughnut',['Programmes','Salaries','Utilities','Other'],[{data:[48,30,12,10],backgroundColor:[C.p,C.s,C.o,'#94a3b8']}])}
$('#gen').onclick=()=>{gen();toast('Report generated')};gen();
const csv=()=>'Month,Receipts,Payments,Difference\n'+D.map(x=>[x.m,x.r,x.p,x.d].join(',')).join('\n');
function dl(c,n,ty){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([c],{type:ty}));a.download=n;a.click()}
$('#e1').onclick=()=>{dl(csv(),'report.csv','text/csv');toast('CSV exported')};
$('#e2').onclick=()=>{dl('<table>'+'<tr><th>Month<th>Receipts<th>Payments<th>Difference</tr>'+D.map(x=>`<tr><td>${x.m}<td>${x.r}<td>${x.p}<td>${x.d}</tr>`).join('')+'</table>','report.xls','application/vnd.ms-excel');toast('Excel file exported (demo .xls)')};
$('#e3').onclick=$('#e4').onclick=()=>print();
