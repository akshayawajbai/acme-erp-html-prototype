$('#sp').onchange=e=>$('#pw').type=e.target.checked?'text':'password';
$('#fp').onclick=e=>{e.preventDefault();modal('Forgot password','<p>Demo only: use password <b>demo123</b> with any demo account.</p>')};
$$('.demo .btn').forEach(b=>b.onclick=()=>{$('#u').value=b.dataset.u;$('#pw').value='demo123'});
$('#f').onsubmit=e=>{e.preventDefault();const u=$('#u').value.trim().toLowerCase();if(!u||!$('#pw').value)return $('#er').textContent='Enter both username and password.';
if(HOME[u]&&$('#pw').value==='demo123'){sessionStorage.setItem('role',u);location.href=HOME[u]}else $('#er').textContent='Username or password is incorrect. Try a demo account below.'};
if(sessionStorage.getItem('role'))location.replace(HOME[sessionStorage.getItem('role')]);
