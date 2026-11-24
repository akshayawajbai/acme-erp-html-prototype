chart('c','line',MONTHS.slice(0,8),[{label:'Receipts',data:REC.slice(0,8),borderColor:C.p,backgroundColor:'#00a8cc33',fill:true,tension:.4},{label:'Payments',data:PAY.slice(0,8),borderColor:C.o,tension:.4}],{plugins:{legend:{display:false}},scales:{y:{display:false},x:{grid:{display:false}}}});
$('#sp').onchange=e=>$('#pw').type=e.target.checked?'text':'password';
$('#fp').onclick=e=>{e.preventDefault();modal('Forgot password','<p>Demo only: use password <b>demo123</b> with any demo account.</p>')};
$$('.demo .btn').forEach(b=>b.onclick=()=>{$('#u').value=b.dataset.u;$('#pw').value='demo123'});
$('#f').onsubmit=e=>{e.preventDefault();const u=$('#u').value.trim().toLowerCase();if(!u||!$('#pw').value)return $('#er').textContent='Enter both username and password.';
if(HOME[u]&&$('#pw').value==='demo123'){sessionStorage.setItem('role',u);location.href=HOME[u]}else $('#er').textContent='Username or password is incorrect. Try a demo account below.'};
if(sessionStorage.getItem('role'))location.replace(HOME[sessionStorage.getItem('role')]);
