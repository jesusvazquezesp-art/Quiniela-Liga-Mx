<script>
const SUPABASE_URL="...";
const SUPABASE_KEY="...";
const ADMIN_SESSION_KEY="quiniela_copamx_admin_activo";
const db=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
let esAdmin=false,jornada=null,jornadas=[],partidos=[],usuarios=[],pronosticos=[],pagos=[],auditoria=[],fama=[],tablaLiga=[],equipos=[],respaldos=[],salonFama=[];
let editandoId=null, editandoJornadaId=null, jornadaVistaId=null;
const MINUTOS_CIERRE_AUTOMATICO = 10;
let revisandoCierreAutomatico = false;
const NUM_LIGUILLA=18;
const $=id=>document.getElementById(id);
function msg(t,tipo='info'){const m=$('msg');m.textContent=t;m.className='mensaje '+tipo;setTimeout(()=>m.className='mensaje',6000)}
function money(n){return '$'+Number(n||0).toLocaleString('es-MX')}
function deviceId(){let id=localStorage.getItem('quiniela_copamx_device');if(!id){id='dev_'+Date.now()+'_'+Math.random().toString(36).slice(2);localStorage.setItem('quiniela_copamx_device',id)}return id}
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]||c))}
function normEquipo(n){return String(n||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim()}
function equipoInfo(nombre){return equipos.find(e=>normEquipo(e.nombre)===normEquipo(nombre))||null}
function escudo(nombre){let e=equipoInfo(nombre);return e&&e.escudo_url?`<img class="escudo" src="${esc(e.escudo_url)}" alt="" onerror="this.style.display='none'">`:''}
function equipoHtml(nombre){return `<div class="equipo-row">${escudo(nombre)}<b>${esc(nombre||'-')}</b></div>`}
function opcionesEquipos(valor=''){return '<option value="">Seleccionar equipo</option>'+equipos.map(e=>`<option value="${esc(e.nombre)}" ${e.nombre===valor?'selected':''}>${esc(e.nombre)}</option>`).join('')}
function equiposSeleccionadosAdmin(){return [...document.querySelectorAll('.equipo-select')].map(x=>x.value).filter(Boolean)}
function actualizarSelectsPartidos(){let usados=equiposSeleccionadosAdmin();document.querySelectorAll('.equipo-select').forEach(sel=>{[...sel.options].forEach(op=>{if(!op.value){op.disabled=false;return}op.disabled=usados.includes(op.value)&&op.value!==sel.value})});let total=new Set(usados).size;let box=$('contadorEquiposUsados');if(box){box.textContent=`Equipos utilizados: ${total}/18`;box.className='equipos-usados '+(total===18?'equipos-ok':'equipos-bad')}}
function validarEquiposJornada(regs){let usados=[];for(const r of regs){usados.push(r.local,r.visitante)}let rep=usados.filter((x,i)=>usados.indexOf(x)!==i);if(rep.length)throw new Error('Hay equipos repetidos: '+[...new Set(rep)].join(', '));if(usados.length!==18||new Set(usados).size!==18)throw new Error('Deben usarse exactamente 18 equipos sin repetir.')}
function tab(id,b){document.querySelectorAll('.seccion').forEach(x=>x.classList.remove('activa'));$(id).classList.add('activa');document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('activo'));b.classList.add('activo');if(id==='admin'&&esAdmin)cargarPrivado()}
function adminSub(id,b){document.querySelectorAll('.admin-sub').forEach(x=>x.classList.remove('activa'));$(id).classList.add('activa');document.querySelectorAll('.subtabs button').forEach(x=>x.classList.remove('activo'));b.classList.add('activo');if(esAdmin)cargarPrivado()}
function dtLocal(v){if(!v)return'';const d=new Date(v);if(isNaN(d))return'';const p=n=>String(n).padStart(2,'0');return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`}
function toISO(v){return v?new Date(v).toISOString():null}
function fecha(v){if(!v)return'-';const d=new Date(v);return d.toLocaleString('es-MX',{weekday:'short',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}
function fechaCortaPartido(v){
  if(!v)return 'Sin fecha';
  const d=new Date(v);
  if(isNaN(d))return 'Sin fecha';
  return d.toLocaleString('es-MX',{weekday:'short',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',hour12:true}).replace(',', ' ·');
}
function claseScorePartido(p,lado){
  if(!(p.finalizado&&p.resultado))return '';
  const gl=Number(p.goles_local), gv=Number(p.goles_visitante);
  if(Number.isNaN(gl)||Number.isNaN(gv))return '';
  if(gl===gv)return 'score-draw';
  const ganoLocal=gl>gv;
  return (lado==='local') ? (ganoLocal?'score-win':'score-lose') : (ganoLocal?'score-lose':'score-win');
}
function scorePartido(p,lado){
  const v = lado==='local' ? p.goles_local : p.goles_visitante;
  return (p.finalizado&&p.resultado&&v!==null&&v!==undefined&&v!=='') ? v : '-';
}
function equipoMini(nombre,clase){
  return `<div class="match-team ${clase}">${clase==='local'?`<span>${esc(nombre||'-')}</span>${escudo(nombre)}`:`${escudo(nombre)}<span>${esc(nombre||'-')}</span>`}</div>`;
}
function resFrom(gl,gv){gl=Number(gl);gv=Number(gv);if(Number.isNaN(gl)||Number.isNaN(gv))return null;return gl>gv?'L':gl<gv?'V':'E'}
function textoFalta(ms){
  if(ms<=0)return '0s';
  const totalSeg=Math.floor(ms/1000);
  const d=Math.floor(totalSeg/86400);
  const h=Math.floor((totalSeg%86400)/3600);
  const m=Math.floor((totalSeg%3600)/60);
  const s=totalSeg%60;

  // Normalmente la quiniela se llena hasta 7 días antes:
  // ahí sí mostramos segundos para que el cierre se sienta vivo.
  if(d>=7) return `${d}d ${h}h ${m}m`;
  if(d>0) return `${d}d ${h}h ${m}m ${s}s`;
  if(h>0) return `${h}h ${m}m ${s}s`;
  if(m>0) return `${m}m ${s}s`;
  return `${s}s`;
}
function estadoClavePartido(p){
  if(p.finalizado&&p.resultado)return 'finalizado';
  if(!p.fecha_partido)return 'sinfecha';
  const now=new Date(), ini=new Date(p.fecha_partido), fin=new Date(ini.getTime()+120*60000);
  if(now<ini)return 'previo';
  if(now<=fin)return 'vivo';
  return 'espera';
}
function estadoPartido(p){
  const clave=estadoClavePartido(p);
  if(clave==='finalizado')return ['✅ Finalizado','estado-ok'];
  if(clave==='sinfecha')return ['Sin fecha','estado-warn'];
  if(clave==='previo')return ['⏱️ Inicia en '+textoFalta(new Date(p.fecha_partido)-new Date()),'estado-prox'];
  if(clave==='vivo')return ['<span class="led"></span>EN VIVO','estado-live'];
  return ['⏳ Esperando resultado oficial','estado-warn'];
}

function estadoPartidoHTML(p){
  const clave=estadoClavePartido(p);
  let contenido='';
  let clase='badge';
  if(clave==='finalizado'){
    contenido='<span class="contador-label">✅ Finalizado</span>';
    clase+=' estado-ok';
  }else if(clave==='sinfecha'){
    contenido='<span class="contador-label">Sin fecha</span>';
    clase+=' estado-warn';
  }else if(clave==='previo'){
    contenido='<span class="contador-label">⏱️ Inicia en:</span><span class="contador-tiempo">'+textoFalta(new Date(p.fecha_partido)-new Date())+'</span>';
    clase+=' estado-prox';
  }else if(clave==='vivo'){
    contenido='<span class="contador-label"><span class="led"></span>EN VIVO</span>';
    clase+=' estado-live';
  }else{
    contenido='<span class="contador-label">⏳ Esperando</span><span class="contador-tiempo">resultado</span>';
    clase+=' estado-warn';
  }
  return '<span class="'+clase+' contador-box">'+contenido+'</span>';
}

function flujoPartidoHTML(p){
  const c=estadoClavePartido(p);
  const item=(clave,txt)=>`<span class="${c===clave?'activo':''}">${txt}</span>`;
  return `<div class="estado-flow">${item('previo','⏱️ Antes')}${item('vivo','🔴 Vivo')}${item('espera','⏳ Espera')}${item('finalizado','✅ Final')}</div>`;
}

function bloqueada(){return !jornada || !jornada.activa || !!jornada.bloqueada || !!jornada.archivada}
function usuariosJornada(){
  if(!jornada) return [];
  const ids = new Set(pronosticos.filter(x=>x.jornada_id===jornada.id).map(x=>x.usuario_id));
  pagos.filter(x=>x.jornada_id===jornada.id).forEach(x=>ids.add(x.usuario_id));
  return usuarios.filter(u=>ids.has(u.id));
}

function nombreBaseBoleto(nombre){
  return String(nombre||'').trim().replace(/\s+#\d+$/,'').trim();
}
function normalizarNombreBoleto(nombre){
  return nombreBaseBoleto(nombre).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\s+/g,' ').trim();
}
function mapaNumerosBoletos(lista=null){
  const arr=(lista||usuariosJornada()).slice().sort((a,b)=>new Date(a.fecha_registro||0)-new Date(b.fecha_registro||0));
  const grupos={};
  const mapa={};
  arr.forEach(u=>{
    const key=normalizarNombreBoleto(u.nombre);
    if(!key) return;
    grupos[key]=(grupos[key]||0)+1;
    mapa[u.id]=grupos[key];
  });
  return {mapa,grupos};
}
function nombreBoleto(u,lista=null){
  if(!u) return '';
  const base=nombreBaseBoleto(u.nombre);
  const info=mapaNumerosBoletos(lista);
  const key=normalizarNombreBoleto(u.nombre);
  const total=info.grupos[key]||1;
  const num=info.mapa[u.id]||1;
  return total>1 ? `${base} #${num}` : base;
}
function siguienteNumeroBoleto(nombre){
  const key=normalizarNombreBoleto(nombre);
  if(!key) return 1;
  const existentes=usuariosJornada().filter(u=>normalizarNombreBoleto(u.nombre)===key);
  return existentes.length+1;
}
function confirmarBoletoDuplicado(nombre){
  if(editandoId) return true;
  const base=nombreBaseBoleto(nombre);
  const siguiente=siguienteNumeroBoleto(base);
  if(siguiente<=1) return true;
  return confirm(`Ya existe un boleto con el nombre ${base}.

¿Deseas crear otro boleto como ${base} #${siguiente}?`);
}
function pr(usuarioId,partidoId){return pronosticos.find(x=>x.usuario_id===usuarioId && x.partido_id===partidoId)}
function pago(usuarioId){return pagos.find(x=>x.usuario_id===usuarioId && x.jornada_id===jornada?.id)}
function dueño(u){return !!u && u.dispositivo_id===deviceId()}
function aciertos(usuarioId){
  let a=0,c=0;
  partidos.forEach(p=>{
    if(!p.resultado) return;
    const x=pr(usuarioId,p.id);
    if(!x) return;
    c++;
    if(x.pronostico===p.resultado) a++;
  });
  return {a,c};
}


function primerPartidoJornada(lista){
  return (lista||[])
    .filter(p=>p.fecha_partido && !isNaN(new Date(p.fecha_partido)))
    .sort((a,b)=>new Date(a.fecha_partido)-new Date(b.fecha_partido))[0] || null;
}

function proximaJornadaDespues(jActual){
  if(!jActual) return null;
  const n=Number(jActual.numero||0);
  return [...jornadas]
    .filter(j=>Number(j.numero||0)>n && !j.archivada)
    .sort((a,b)=>Number(a.numero||0)-Number(b.numero||0))[0] || null;
}

async function audSistema(accion,detalle,jornadaId=null,antes={},despues={}){
  try{
    await db.from('auditoria').insert({
      accion,detalle,usuario_id:null,jornada_id:jornadaId,
      antes,despues,dispositivo_id:deviceId(),actor:'sistema'
    });
  }catch(e){console.warn('Auditoría sistema:',e)}
}

async function revisarCierreAutomatico(){
  if(revisandoCierreAutomatico) return false;
  revisandoCierreAutomatico=true;
  try{
    const activa = jornadas.find(j=>j.activa && !j.bloqueada && !j.archivada);
    if(!activa) return false;

    const ps = await db.from('partidos').select('*').eq('jornada_id',activa.id).order('fecha_partido',{ascending:true});
    if(ps.error) throw ps.error;
    const primero = primerPartidoJornada(ps.data||[]);
    if(!primero) return false;

    const cierreMs = new Date(primero.fecha_partido).getTime() - (MINUTOS_CIERRE_AUTOMATICO*60*1000);
    const ahoraMs = Date.now();
    if(ahoraMs < cierreMs) return false;

    const siguiente = proximaJornadaDespues(activa);

    await db.from('jornadas').update({activa:false,bloqueada:true}).eq('id',activa.id);
    await audSistema('AUTO_CIERRE_JORNADA',`Sistema cerró ${activa.nombre} ${MINUTOS_CIERRE_AUTOMATICO} minutos antes del primer partido`,activa.id,{jornada:activa,primer_partido:primero},{bloqueada:true,activa:false});

    if(siguiente){
      await db.from('jornadas').update({activa:false}).neq('id','00000000-0000-0000-0000-000000000000');
      await db.from('jornadas').update({activa:true,bloqueada:false,archivada:false}).eq('id',siguiente.id);
      await audSistema('AUTO_ABRIR_JORNADA',`Sistema abrió ${siguiente.nombre} para nuevos boletos`,siguiente.id,{jornada_anterior:activa},{jornada_activa:siguiente});
      if(!jornadaVistaId || jornadaVistaId===activa.id) jornadaVistaId=siguiente.id;
      msg(`${activa.nombre} se cerró automáticamente y se abrió ${siguiente.nombre}.`, 'ok');
    }else{
      msg(`${activa.nombre} se cerró automáticamente. No hay siguiente jornada creada para abrir.`, 'info');
    }
    return true;
  }catch(e){
    console.error('Cierre automático:',e);
    return false;
  }finally{
    revisandoCierreAutomatico=false;
  }
}

async function aud(accion,detalle,usuario_id=null,antes={},despues={}){try{await db.from('auditoria').insert({accion,detalle,usuario_id,jornada_id:jornada?.id||null,antes,despues,dispositivo_id:deviceId(),actor:esAdmin?'admin':'usuario'})}catch(e){console.warn(e)}}
async function cargar(){
 const [jorRes,eRes,salonRes]=await Promise.all([
  db.from('jornadas').select('*').order('numero',{ascending:true}),
  db.from('equipos').select('*').eq('activo',true).order('nombre'),
  db.from('salon_fama').select('*').order('fecha_cierre',{ascending:false})
 ]);
 if(jorRes.error)throw jorRes.error;if(eRes.error)throw eRes.error;
 jornadas=jorRes.data||[];equipos=eRes.data||[];salonFama=salonRes && !salonRes.error ? (salonRes.data||[]) : [];
 const cambioAuto = await revisarCierreAutomatico();
 if(cambioAuto){
   const ref=await db.from('jornadas').select('*').order('numero',{ascending:true});
   if(!ref.error) jornadas=ref.data||[];
 }
 jornada = (jornadaVistaId ? jornadas.find(j=>j.id===jornadaVistaId) : null) || jornadas.find(j=>j.activa) || null;
 if(jornada){
  const [p,u,pr,pa,f,t]=await Promise.all([
   db.from('partidos').select('*').eq('jornada_id',jornada.id).order('numero_partido'),
   db.from('usuarios').select('*').eq('activo',true).order('fecha_registro'),
   db.from('pronosticos').select('*').eq('jornada_id',jornada.id),
   db.from('pagos').select('*').eq('jornada_id',jornada.id),
   db.from('fama').select('*').order('fecha',{ascending:false}),
   db.from('tabla_liga_mx').select('*').order('posicion')
  ]);
  if(p.error||u.error||pr.error||pa.error)throw (p.error||u.error||pr.error||pa.error);
  partidos=p.data||[];usuarios=u.data||[];pronosticos=pr.data||[];pagos=pa.data||[];fama=f.data||[];tablaLiga=t.data||[];
 }else{partidos=[];usuarios=[];pronosticos=[];pagos=[]}
 dibujar()
}
function dibujar(){dibSelectorJornadas();dibResumen();dibQuiniela();dibClasificacion();dibPartidos();dibTablaLiga();dibFama();dibSalonFama();if(esAdmin){dibAdmin();cargarPrivado(false)}}
function dibSelectorJornadas(){
 const cont=$('selectorJornadas'); if(!cont) return;
 let html='';
 jornadas.forEach(j=>{html+=`<button class="${jornada?.id===j.id?'activo':''} ${Number(j.numero)===NUM_LIGUILLA?'liguilla-tag':''}" onclick="verJornada('${j.id}')">${Number(j.numero)===NUM_LIGUILLA?'🏆 Liguilla':esc(j.nombre||('J'+j.numero))}${j.activa?' ✅':''}</button>`});
 cont.innerHTML=html||'<span class="small">Aún no hay jornadas creadas</span>';
}
async function verJornada(id){jornadaVistaId=id;await cargar()}
function dibResumen(){let us=usuariosJornada(),pag=pagos.filter(x=>x.pagado).length,costo=jornada?.costo||20;$('subtitulo').textContent=jornada?`${jornada.nombre} · ${bloqueada()?'CERRADA':'ABIERTA'}`:'Sin jornada activa';$('rJornada').textContent=jornada?.nombre||'-';$('rCosto').textContent=money(costo);$('rBoletos').textContent=us.length;$('rPagados').textContent=pag;$('rBolsa').textContent=money(pag*costo);$('rEstado').textContent=bloqueada()?'Cerrada':'Abierta'}
function headerPartido(p){const e=estadoPartido(p);return `<div><strong>P${p.numero_partido}</strong></div>${equipoHtml(p.local)}<div class="vs">VS</div>${equipoHtml(p.visitante)}<div class="small">${fecha(p.fecha_partido)}</div>${estadoPartidoHTML(p)}${p.resultado?`<div class="small"><b>${p.goles_local}-${p.goles_visitante}</b> Resultado ${p.resultado}</div>`:''}`}
function clase(x,p){if(!x)return'pendiente';if(!p.resultado)return'pendiente';return x.pronostico===p.resultado?'acierto':'fallo'}
function dibQuiniela(){
  let h='<thead><tr><th class="nombre">Boleto</th>'+partidos.map(p=>`<th>${headerPartido(p)}</th>`).join('')+'<th>Puntos</th><th>Acción</th></tr></thead><tbody>';
  if(!jornada){h+='<tr><td colspan="12">No hay jornada activa.</td></tr>'}
  else if(!bloqueada()&&partidos.length===9){
    h+=`<tr><td class="nombre"><input id="nuevoNombre" placeholder="Nombre / boleto"><input id="nuevoTelefono" placeholder="Teléfono opcional" style="margin-top:6px"><div class="small" id="modo">Nuevo boleto</div></td>`+partidos.map(p=>`<td><select id="sel_${p.id}"><option value="">-</option><option value="L">Local</option><option value="E">Empate</option><option value="V">Visita</option></select></td>`).join('')+`<td>-</td><td><button class="btn-primary" onclick="guardarBoleto()" id="btnGuardar">Guardar</button><button class="btn-gray" onclick="limpiar()">Limpiar</button></td></tr>`
  }else{h+=`<tr><td colspan="12"><b>Quiniela cerrada.</b></td></tr>`}
  let lista=usuariosJornada().map(u=>({...u,...aciertos(u.id)})).sort((a,b)=>b.a-a.a||new Date(a.fecha_registro)-new Date(b.fecha_registro));
  lista.forEach(u=>{h+=`<tr><td class="nombre"><b>${esc(nombreBoleto(u,lista))}</b><div class="small">${dueño(u)?'📱 Este celular':'Solo lectura'}</div></td>`;partidos.forEach(p=>{let x=pr(u.id,p.id);h+=`<td><span class="pick ${clase(x,p)}">${x?.pronostico||'-'}</span></td>`});h+=`<td><b>${u.a}</b> / ${u.c}</td><td>`;
    let acciones=[];
    if(!bloqueada()&&(dueño(u)||esAdmin)) acciones.push(`<button class="btn-yellow" onclick="editar('${u.id}')">Editar</button>`);
    if(esAdmin) acciones.push(`<button class="btn-red" onclick="eliminarBoleto('${u.id}')">Eliminar</button>`);
    h+=acciones.length?`<div class="acciones">${acciones.join('')}</div>`:'-';
    h+=`</td></tr>`});
  h+='</tbody>';$('tablaQuiniela').innerHTML=h;
  dibQuinielaMovil(lista);
}
function dibQuinielaMovil(lista){
  const cont=$('vistaMovilQuiniela'); if(!cont) return;
  if(!jornada){cont.innerHTML='<div class="boleto-form-card">No hay jornada activa.</div>';return}
  let html='';

  if(!bloqueada()&&partidos.length===9){
    html+=`<div class="boleto-form-card"><h3>Nuevo boleto</h3><input id="mNuevoNombre" placeholder="Nombre / boleto"><input id="mNuevoTelefono" placeholder="Teléfono opcional"><div class="small" id="mModo">Nuevo boleto</div>`;
    partidos.forEach(p=>{html+=`<div class="pronostico-card"><div class="titulo-p">P${p.numero_partido}</div>${equipoHtml(p.local)}<div class="vs">VS</div>${equipoHtml(p.visitante)}<div class="small">${fecha(p.fecha_partido)}</div><select id="mSel_${p.id}"><option value="">Elegir pronóstico</option><option value="L">Gana local</option><option value="E">Empate</option><option value="V">Gana visita</option></select></div>`});
    html+=`<div class="mobile-actions"><button class="btn-primary" onclick="guardarBoletoMovil()" id="mBtnGuardar">Guardar boleto</button><button class="btn-gray" onclick="limpiarMovil()">Limpiar</button></div></div>`;
  }else{html+=`<div class="boleto-form-card"><b>Quiniela cerrada.</b></div>`}

  let lugar=0,pos=0,ant=null;
  const lugares={};
  lista.forEach(u=>{pos++; if(ant===null||u.a<ant)lugar=pos; ant=u.a; lugares[u.id]=lugar;});

  if(lista.length){
    html+=`<div class="mobile-help"><b>Vista rápida:</b> arriba están los 9 partidos alineados; abajo cada boleto solo muestra L / E / V. Verde = acierto, gris = fallo, amarillo = pendiente. Desliza a la derecha para ver todos los partidos.</div>`;
    html+=`<div class="mobile-matrix-wrap"><table class="mobile-matrix"><thead><tr><th class="col-nombre">Boleto</th>`;
    partidos.forEach(p=>{
      const marcador = p.resultado ? `${p.goles_local??''}-${p.goles_visitante??''}` : '-';
      html+=`<th><div class="mh-partido"><div class="pnum">P${p.numero_partido}</div><div>${esc(p.local)}</div><div>vs</div><div>${esc(p.visitante)}</div><div class="res">${marcador}</div></div></th>`;
    });
    html+=`<th><div class="mh-partido"><div class="pnum">Pts</div><div>Lugar</div></div></th></tr></thead><tbody>`;

    lista.forEach(u=>{
      const lugarTxt = lugares[u.id]===1?'🥇':lugares[u.id]===2?'🥈':lugares[u.id]===3?'🥉':lugares[u.id]+'°';
      html+=`<tr><td class="col-nombre"><div class="m-row-name">${lugarTxt} ${esc(nombreBoleto(u,lista))}</div><div class="m-row-meta">${dueño(u)?'📱 Este celular':'Solo lectura'} · ${u.a}/${u.c}</div>`;
      let accionesMovil=[];
      if(!bloqueada()&&(dueño(u)||esAdmin)) accionesMovil.push(`<button class="btn-yellow" onclick="editarMovil('${u.id}')">Editar</button>`);
      if(esAdmin) accionesMovil.push(`<button class="btn-red" onclick="eliminarBoleto('${u.id}')">Eliminar</button>`);
      if(accionesMovil.length) html+=`<div class="m-row-actions">${accionesMovil.join('')}</div>`;
      html+=`</td>`;
      partidos.forEach(p=>{
        const x=pr(u.id,p.id);
        const cls=clase(x,p);
        html+=`<td><div class="m-pick-cell ${cls}">${x?.pronostico||'-'}</div></td>`;
      });
      html+=`<td><div class="m-pick-cell pendiente">${u.a}/${u.c}</div></td></tr>`;
    });
    html+=`</tbody></table></div>`;
  }else{
    html+=`<div class="boleto-form-card"><b>Aún no hay boletos capturados.</b></div>`;
  }
  cont.innerHTML=html;
}
function copiarMovilADesktop(){ if(!$('mNuevoNombre')||!$('nuevoNombre'))return; $('nuevoNombre').value=$('mNuevoNombre').value; $('nuevoTelefono').value=$('mNuevoTelefono').value; partidos.forEach(p=>{let ms=$('mSel_'+p.id), ds=$('sel_'+p.id); if(ms&&ds) ds.value=ms.value}); }
function copiarDesktopAMovil(){ if(!$('mNuevoNombre')||!$('nuevoNombre'))return; $('mNuevoNombre').value=$('nuevoNombre').value; $('mNuevoTelefono').value=$('nuevoTelefono').value; partidos.forEach(p=>{let ms=$('mSel_'+p.id), ds=$('sel_'+p.id); if(ms&&ds) ms.value=ds.value}); if($('mModo')&&$('modo'))$('mModo').textContent=$('modo').textContent; if($('mBtnGuardar')&&$('btnGuardar'))$('mBtnGuardar').textContent=$('btnGuardar').textContent; }
function guardarBoletoMovil(){copiarMovilADesktop();guardarBoleto()}
function limpiarMovil(){limpiar();copiarDesktopAMovil()}

function datosPartidoMenosEsperado(){
  const boletos=usuariosJornada();
  if(!boletos.length) return null;
  let candidatos=[];
  partidos.forEach(p=>{
    if(!p.resultado) return;
    let total=0, acertaron=0;
    boletos.forEach(u=>{
      const x=pr(u.id,p.id);
      if(!x) return;
      total++;
      if(x.pronostico===p.resultado) acertaron++;
    });
    if(total>0){
      const porcentaje=acertaron/total;
      candidatos.push({p,total,acertaron,porcentaje});
    }
  });
  if(!candidatos.length) return null;
  candidatos.sort((a,b)=>a.acertaron-b.acertaron || a.porcentaje-b.porcentaje || Number(a.p.numero_partido)-Number(b.p.numero_partido));
  return candidatos[0];
}
function textoResultadoLEV(r){return r==='L'?'Ganó local':r==='V'?'Ganó visita':r==='E'?'Empate':'-'}
function dibPartidoMenosEsperado(){
  const cont=$('partidoDificil');
  if(!cont) return;
  const d=datosPartidoMenosEsperado();
  if(!d){
    cont.innerHTML='<div class="partido-dificil-empty">🎯 Partido menos esperado: aparecerá cuando captures resultados.</div>';
    return;
  }
  const p=d.p;
  const marcador=(p.goles_local!=null&&p.goles_visitante!=null)?`${p.goles_local} - ${p.goles_visitante}`:textoResultadoLEV(p.resultado);
  cont.innerHTML=`<div class="partido-dificil-box">
    <div class="partido-dificil-title">🎯 Partido con resultado menos esperado</div>
    <div class="partido-dificil-match">
      <span>${esc(p.local)}</span>
      <span class="partido-dificil-score">${esc(String(p.goles_local??''))}</span>
      <span>VS</span>
      <span class="partido-dificil-score">${esc(String(p.goles_visitante??''))}</span>
      <span>${esc(p.visitante)}</span>
    </div>
    <div class="partido-dificil-meta">Solo <b>${d.acertaron}</b> de <b>${d.total}</b> boletos acertaron · ${esc(textoResultadoLEV(p.resultado))}</div>
  </div>`;
}

function dibClasificacion(){
  let lista=usuariosJornada().map(u=>({...u,...aciertos(u.id)})).sort((a,b)=>b.a-a.a||a.nombre.localeCompare(b.nombre));
  let h='<thead><tr><th>Lugar</th><th class="nombre">Boleto</th><th>Aciertos</th><th>Calificados</th></tr></thead><tbody>';
  let cards='',lugar=0,pos=0,ant=null;
  lista.forEach(u=>{
    pos++; if(ant===null||u.a<ant)lugar=pos; ant=u.a;
    const med=lugar===1?'🥇':lugar===2?'🥈':lugar===3?'🥉':lugar;
    h+=`<tr><td>${med}</td><td class="nombre"><b>${esc(nombreBoleto(u,lista))}</b></td><td><b>${u.a}</b></td><td>${u.c}</td></tr>`;
    cards+=`<div class="class-card"><div class="class-head"><div class="class-place">${med}</div><div class="class-name">${esc(nombreBoleto(u,lista))}</div><div class="class-score">${u.a}/${u.c}</div></div><div class="class-meta"><span class="class-pill">Aciertos: ${u.a}</span><span class="class-pill">Calificados: ${u.c}</span></div></div>`;
  });
  $('tablaClasificacion').innerHTML=h+'</tbody>';
  if($('clasificacionMovil')) $('clasificacionMovil').innerHTML=cards||'<div class="class-card">No hay boletos todavía.</div>';
  dibPartidoMenosEsperado();
}
let faseLiguillaVisible='cuartos';
function dibPartidos(){
  if(!jornada){$('listaPartidos').innerHTML='Sin jornada activa';return}
  if(Number(jornada.numero)===NUM_LIGUILLA){dibPartidosLiguilla();return}
  $('listaPartidos').innerHTML=partidos.map(p=>cardPartidoNormal(p)).join('')
}
function cardPartidoNormal(p){
  let e=estadoPartido(p);
  return `<div class="partido-card match-card">
    <div class="match-num"><span class="badge">Partido ${p.numero_partido}</span></div>
    <div class="match-line">
      ${equipoMini(p.local,'local')}
      <div class="match-score ${claseScorePartido(p,'local')}">${scorePartido(p,'local')}</div>
      <div class="match-vs">VS</div>
      <div class="match-score ${claseScorePartido(p,'visita')}">${scorePartido(p,'visita')}</div>
      ${equipoMini(p.visitante,'visita')}
    </div>
    <div class="match-date">${fechaCortaPartido(p.fecha_partido)}</div>
    ${p.estadio?`<div class="small" style="text-align:center">${esc(p.estadio)}</div>`:''}
    <div class="match-status">${estadoPartidoHTML(p)}</div>
    ${flujoPartidoHTML(p)}
  </div>`
}
function setFaseLiguilla(f){faseLiguillaVisible=f;dibPartidosLiguilla()}
function partidosPorNums(nums){return nums.map(n=>partidos.find(p=>Number(p.numero_partido)===n)).filter(Boolean)}
function cardLiguilla(p){
  let e=estadoPartido(p);
  return `<div class="liguilla-card match-card">
    <div class="match-num"><span class="badge">${esc(partidoLiguillaNombre(Number(p.numero_partido)))}</span></div>
    <div class="match-line">
      ${equipoMini(p.local,'local')}
      <div class="match-score ${claseScorePartido(p,'local')}">${scorePartido(p,'local')}</div>
      <div class="match-vs">VS</div>
      <div class="match-score ${claseScorePartido(p,'visita')}">${scorePartido(p,'visita')}</div>
      ${equipoMini(p.visitante,'visita')}
    </div>
    <div class="match-date">${fechaCortaPartido(p.fecha_partido)}</div>
    ${p.estadio?`<div class="small" style="text-align:center">${esc(p.estadio)}</div>`:''}
    <div class="match-status">${estadoPartidoHTML(p)}</div>
    ${flujoPartidoHTML(p)}
  </div>`
}
function bloqueLiguilla(titulo, nums){
  let ps=partidosPorNums(nums);
  return `<div class="liguilla-bloque"><h3>${titulo}</h3><div class="liguilla-grid">${ps.map(cardLiguilla).join('')||'<div class="small">Sin partidos cargados todavía</div>'}</div></div>`
}
function calcularCampeonFinal(){
  const final=partidosPorNums([13,14]);
  if(final.length<2 || !final.every(p=>p.finalizado))return null;
  const goles={};
  final.forEach(p=>{
    goles[p.local]=(goles[p.local]||0)+Number(p.goles_local||0);
    goles[p.visitante]=(goles[p.visitante]||0)+Number(p.goles_visitante||0);
  });
  const equipos=Object.keys(goles); if(equipos.length<2)return null;
  equipos.sort((a,b)=>goles[b]-goles[a]);
  if(goles[equipos[0]]===goles[equipos[1]])return {empate:true,texto:'Final empatada, falta criterio/penales'};
  return {equipo:equipos[0],goles:goles[equipos[0]],contra:goles[equipos[1]]};
}
function campeonHTML(){
  const c=calcularCampeonFinal();
  if(!c)return '';
  if(c.empate)return `<div class="campeon-box"><img src="logo.png" class="logo-campeon" alt="Logo Quiniela Copa MX"><div class="campeon-copa">🏆</div><div class="campeon-titulo">Final en espera</div><div class="small">${esc(c.texto)}</div></div>`;
  return `<div class="campeon-box"><img src="logo.png" class="logo-campeon" alt="Logo Quiniela Copa MX"><div class="campeon-copa">🏆</div><div class="campeon-titulo">¡TENEMOS CAMPEÓN!</div><div class="campeon-equipo">${equipoHtml(c.equipo)}</div><div class="small">Marcador global: ${c.goles} - ${c.contra}</div></div>`;
}
function dibPartidosLiguilla(){
  const tab=(id,txt)=>`<button class="${faseLiguillaVisible===id?'activo':''}" onclick="setFaseLiguilla('${id}')">${txt}</button>`;
  let contenido='';
  if(faseLiguillaVisible==='cuartos') contenido=bloqueLiguilla('Cuartos de final · Ida',[1,2,3,4])+bloqueLiguilla('Cuartos de final · Regreso',[5,6,7,8]);
  if(faseLiguillaVisible==='semis') contenido=bloqueLiguilla('Semifinales · Ida',[9,10])+bloqueLiguilla('Semifinales · Regreso',[11,12]);
  if(faseLiguillaVisible==='final') contenido=bloqueLiguilla('Gran final · Ida',[13])+bloqueLiguilla('Gran final · Regreso',[14])+campeonHTML();
  $('listaPartidos').innerHTML=`<div class="liguilla-panel"><div class="tombola-box"><b>🎟️ Quiniela de liguilla por tómbola</b><div class="small">Se sortean los 8 equipos en papelito. Cada persona se queda con un equipo; el dueño del equipo campeón gana el premio.</div></div><div class="liguilla-tabs">${tab('cuartos','Cuartos')}${tab('semis','Semifinales')}${tab('final','Gran final')}</div>${contenido}</div>`;
}
function dibTablaLiga(){let h='<thead><tr><th>#</th><th class="nombre">Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th><th>Últimos</th><th>Fase</th></tr></thead><tbody>';tablaLiga.forEach(r=>h+=`<tr><td>${r.posicion||''}</td><td class="nombre">${equipoHtml(r.club)}</td><td>${r.pj||0}</td><td>${r.g||0}</td><td>${r.e||0}</td><td>${r.p||0}</td><td>${r.gf||0}</td><td>${r.gc||0}</td><td>${r.dg||0}</td><td><b>${r.pts||0}</b></td><td>${r.ultimos||r.ultimos5||''}</td><td>${r.fase||''}</td></tr>`);$('tablaGeneralLiga').innerHTML=h+'</tbody>';let mob=$('tablaGeneralLigaMobile');if(mob){let head=`<div class="liga-compact-head"><div class="team-title">Equipo</div><div>PJ</div><div>G</div><div>E</div><div>P</div><div>GA</div><div>GR</div><div>Dif</div><div>Pts</div></div>`;let rows=tablaLiga.map(r=>{let dg=Number(r.dg||0);let dgCls=dg>0?'positivo':dg<0?'negativo':'';let zona=Number(r.posicion||0)<=8?' zona-liguilla':'';return `<div class="liga-compact-row${zona}"><div class="liga-team-mobile"><div class="pos">${r.posicion||'-'}</div>${escudo(r.club)}<div class="club">${esc(r.club||'-')}</div></div><div class="liga-num">${r.pj||0}</div><div class="liga-num">${r.g||0}</div><div class="liga-num">${r.e||0}</div><div class="liga-num">${r.p||0}</div><div class="liga-num">${r.gf||0}</div><div class="liga-num">${r.gc||0}</div><div class="liga-num dif ${dgCls}">${dg>0?'+'+dg:dg}</div><div class="liga-num pts">${r.pts||0}</div><div class="liga-extra-line"><span>Últimos: ${esc(r.ultimos||r.ultimos5||'-')}</span><span>Fase: ${esc(r.fase||'-')}</span></div></div>`}).join('');mob.innerHTML=`<div class="liga-compact-mobile">${head}${rows}</div>`}}
function dibFama(){if(!fama.length){$('famaLista').innerHTML='<p>No hay ganadores todavía.</p>';return}$('famaLista').innerHTML=fama.map(f=>`<div class="fama-card"><b>👑 ${f.nombre}</b><div class="small">${f.aciertos} aciertos · Premio: ${money(f.premio)} · ${fecha(f.fecha)}</div></div>`).join('')}
function medalla(i){return i===0?'🥇':i===1?'🥈':i===2?'🥉':'🏅'}
function renderTopSalon(titulo, lista, valorKey='cantidad', extra=''){
  lista=Array.isArray(lista)?lista:[];
  const rows=lista.slice(0,5).map((x,i)=>`<div class="salon-row"><span><span class="salon-medal">${medalla(i)}</span> <b>${esc(x.nombre||x.dueno||x.equipo||'-')}</b>${x.telefono_mask?` <span class="small">· ${esc(x.telefono_mask)}</span>`:''}</span><span class="salon-record">${esc(x[valorKey]??x.valor??'')}</span></div>`).join('')||'<div class="salon-empty">Sin datos</div>';
  return `<div class="salon-card"><h3>${titulo}</h3>${rows}${extra}</div>`;
}
function dibSalonFama(){
  const cont=$('salonLista'); if(!cont) return;
  if(!salonFama.length){cont.innerHTML='<div class="salon-empty">Aún no hay temporadas archivadas. Se guardará automáticamente cuando uses 🧹 Reiniciar torneo.</div>';return;}
  const ult=salonFama[0]||{};
  let html=`<div class="salon-card salon-season"><h3>🏆 Última temporada archivada</h3><div><b>${esc(ult.temporada||'-')}</b></div><div class="small">Cierre: ${fecha(ult.fecha_cierre)} · Campeón del torneo: <b>${esc(ult.campeon_torneo||'-')}</b></div></div>`;
  html+=`<div class="salon-grid">`;
  html+=renderTopSalon('👑 Más jornadas ganadas',ult.jornadas_ganadas||[],'cantidad');
  html+=renderTopSalon('⭐ Boletos perfectos',ult.boletos_perfectos||[],'aciertos');
  html+=renderTopSalon('🎯 Más aciertos históricos',ult.top_aciertos||[],'aciertos');
  html+=renderTopSalon('💰 Mayor premio ganado',ult.top_premios||[],'premio');
  html+=renderTopSalon('🏆 Campeones de liguilla',ult.campeones_liguilla||[],'cantidad');
  html+=`</div><h3 style="margin-top:16px">📅 Historial de temporadas</h3>`;
  html+=salonFama.map(s=>`<div class="fama-card"><b>🏆 ${esc(s.temporada||'-')}</b><div class="small">${fecha(s.fecha_cierre)} · Campeón: <b>${esc(s.campeon_torneo||'-')}</b> · Jornadas: ${esc(s.resumen?.jornadas||0)} · Boletos: ${esc(s.resumen?.boletos||0)}</div></div>`).join('');
  cont.innerHTML=html;
}
function normalizaNombreJugador(n){return String(n||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function telefonoMask(t){t=String(t||'').replace(/\D/g,'');return t?('****'+t.slice(-4)):''}
function etiquetaHistUsuario(u,jornadaId,usuariosAll,pronosticosAll){
  const idsJ=[...new Set((pronosticosAll||[]).filter(p=>p.jornada_id===jornadaId).map(p=>p.usuario_id))];
  const mismos=(usuariosAll||[]).filter(x=>idsJ.includes(x.id)&&normalizaNombreJugador(x.nombre)===normalizaNombreJugador(u.nombre)).sort((a,b)=>new Date(a.fecha_registro||0)-new Date(b.fecha_registro||0));
  const idx=mismos.findIndex(x=>x.id===u.id);
  const num=idx>0?` #${idx+1}`:'';
  const mask=telefonoMask(u.telefono);
  return `${u.nombre||'Sin nombre'}${mask?' · '+mask:''}${num}`;
}
function addAgg(mapa,key,obj,campo,inc){if(!key)return;if(!mapa[key])mapa[key]={...obj,[campo]:0};mapa[key][campo]+=inc}
async function obtenerDatosTorneoCompleto(){
  const [jr,ur,pr,par,pa,fr,cf]=await Promise.all([
    db.from('jornadas').select('*'),db.from('usuarios').select('*'),db.from('pronosticos').select('*'),db.from('partidos').select('*'),db.from('pagos').select('*'),db.from('fama').select('*'),db.from('configuracion').select('*').limit(1).maybeSingle()
  ]);
  for(const r of [jr,ur,pr,par,pa,fr]) if(r.error) throw r.error;
  return {jornadas:jr.data||[],usuarios:ur.data||[],pronosticos:pr.data||[],partidos:par.data||[],pagos:pa.data||[],fama:fr.data||[],config:cf.data||{}};
}
async function archivarSalonFamaAntesDeReiniciar(temporada){
  const d=await obtenerDatosTorneoCompleto();
  if(!d.jornadas.length && !d.usuarios.length) return null;
  const usuariosById=Object.fromEntries(d.usuarios.map(u=>[u.id,u]));
  const partidosById=Object.fromEntries(d.partidos.map(p=>[p.id,p]));
  const jornadasById=Object.fromEntries(d.jornadas.map(j=>[j.id,j]));
  const topA={}, topPremios={}, jGanadas={}, perfectos=[];
  (d.fama||[]).forEach(f=>{
    const u=usuariosById[f.usuario_id]||{id:f.usuario_id,nombre:f.nombre||'Ganador'};
    const label=f.nombre||u.nombre||'Ganador';
    const key=(u.telefono?('tel:'+u.telefono):('uid:'+u.id));
    addAgg(jGanadas,key,{nombre:label,usuario_id:u.id,telefono_mask:telefonoMask(u.telefono)},'cantidad',1);
    addAgg(topPremios,key,{nombre:label,usuario_id:u.id,telefono_mask:telefonoMask(u.telefono)},'premio',Number(f.premio||0));
  });
  d.usuarios.forEach(u=>{
    const prs=d.pronosticos.filter(p=>p.usuario_id===u.id);
    let ac=0,cal=0;
    const porJ={};
    prs.forEach(p=>{const part=partidosById[p.partido_id]; if(!part||!part.resultado)return; cal++; if(p.pronostico===part.resultado) ac++; (porJ[p.jornada_id]??=[]).push({p,part,ok:p.pronostico===part.resultado});});
    if(cal>0){const key=(u.telefono?('tel:'+u.telefono):('uid:'+u.id));addAgg(topA,key,{nombre:u.nombre,usuario_id:u.id,telefono_mask:telefonoMask(u.telefono)},'aciertos',ac)}
    Object.entries(porJ).forEach(([jid,arr])=>{const total=arr.length, ok=arr.filter(x=>x.ok).length; if(total>=9 && ok===total){perfectos.push({nombre:etiquetaHistUsuario(u,jid,d.usuarios,d.pronosticos),usuario_id:u.id,telefono_mask:telefonoMask(u.telefono),jornada:jornadasById[jid]?.nombre||'',aciertos:ok})}})
  });
  const orden=(obj,campo)=>Object.values(obj).sort((a,b)=>Number(b[campo]||0)-Number(a[campo]||0)).slice(0,10);
  const top_aciertos=orden(topA,'aciertos');
  const jornadas_ganadas=orden(jGanadas,'cantidad');
  const top_premios=orden(topPremios,'premio');
  const lig=d.jornadas.filter(j=>Number(j.numero)===NUM_LIGUILLA).map(j=>j.id);
  const campeones_liguilla=(d.fama||[]).filter(f=>lig.includes(f.jornada_id)).map(f=>({nombre:f.nombre,usuario_id:f.usuario_id,premio:Number(f.premio||0),cantidad:1}));
  const payload={temporada:temporada||d.config?.temporada||('Temporada '+new Date().getFullYear()),fecha_cierre:new Date().toISOString(),campeon_torneo:top_aciertos[0]?.nombre||jornadas_ganadas[0]?.nombre||'',jornadas_ganadas,boletos_perfectos:perfectos.slice(0,20),campeones_liguilla,top_aciertos,top_premios,resumen:{jornadas:d.jornadas.length,boletos:d.usuarios.length,partidos:d.partidos.length,pronosticos:d.pronosticos.length,pagos:d.pagos.filter(x=>x.pagado).length,fecha:new Date().toISOString()}};
  const r=await db.from('salon_fama').insert(payload).select().single();
  if(r.error) throw new Error('No pude guardar Salón de la Fama. Revisa permisos RLS de salon_fama: '+r.error.message);
  await aud('SALON_FAMA_ARCHIVADO',`Se archivó ${payload.temporada} antes de reiniciar torneo`,null,{},payload.resumen);
  return r.data;
}

async function guardarBoleto(){
  if(!jornada||bloqueada())return msg('La jornada está cerrada o no hay jornada activa','error');
  let nombre=nombreBaseBoleto($('nuevoNombre').value.trim()),tel=$('nuevoTelefono').value.trim();
  if(!nombre)return msg('Escribe el nombre del boleto','error');
  if(!confirmarBoletoDuplicado(nombre)) return;
  let picks=[];
  for(const p of partidos){
    let v=$('sel_'+p.id).value;
    if(!v)return msg('Falta pronóstico del partido '+p.numero_partido,'error');
    picks.push({p,v});
  }
  try{
    let uid=editandoId,antes={};
    let nombreVisible=nombre;
    if(uid){
      let u=usuarios.find(x=>x.id===uid);
      if(!esAdmin&&!dueño(u))throw new Error('Este boleto solo se edita desde el celular donde se capturó');
      antes={usuario:u,pronosticos:pronosticos.filter(x=>x.usuario_id===uid)};
      await db.from('usuarios').update({nombre,telefono:tel,ultima_actividad:new Date().toISOString()}).eq('id',uid);
      nombreVisible=nombreBoleto({...u,nombre});
    }else{
      let r=await db.from('usuarios').insert({nombre,telefono:tel,dispositivo_id:deviceId(),activo:true}).select().single();
      if(r.error)throw r.error;
      uid=r.data.id;
      await db.from('pagos').insert({usuario_id:uid,jornada_id:jornada.id,monto:jornada.costo||20,pagado:false});
      nombreVisible=nombreBoleto(r.data,[...usuariosJornada(),r.data]);
    }
    for(const x of picks){
      let old=pr(uid,x.p.id);
      if(old)await db.from('pronosticos').update({pronostico:x.v,fecha_registro:new Date().toISOString()}).eq('id',old.id);
      else await db.from('pronosticos').insert({usuario_id:uid,jornada_id:jornada.id,partido_id:x.p.id,pronostico:x.v});
    }
    await aud(uid===editandoId?'EDITAR_BOLETO':'CREAR_BOLETO',`${nombreVisible} guardó boleto`,uid,antes,{nombre:nombreVisible,nombre_base:nombre,picks:picks.map(x=>({partido:x.p.numero_partido,pronostico:x.v}))});
    limpiar();await cargar();msg(`Boleto guardado correctamente: ${nombreVisible}`,'ok');
  }catch(e){msg('Error: '+e.message,'error')}
}
function editar(uid){let u=usuarios.find(x=>x.id===uid);if(!u)return;if(!esAdmin&&!dueño(u))return msg('Solo se puede editar desde el celular donde se capturó','error');editandoId=uid;$('nuevoNombre').value=nombreBaseBoleto(u.nombre);$('nuevoTelefono').value=u.telefono||'';partidos.forEach(p=>{$('sel_'+p.id).value=pr(uid,p.id)?.pronostico||''});$('modo').textContent='Editando: '+nombreBoleto(u);$('btnGuardar').textContent='Actualizar';copiarDesktopAMovil();window.scrollTo({top:0,behavior:'smooth'})}
function editarMovil(uid){editar(uid);setTimeout(()=>copiarDesktopAMovil(),50)}
async function eliminarBoleto(uid){
  if(!esAdmin) return msg('Solo el administrador puede eliminar boletos','error');
  if(!jornada) return msg('No hay jornada seleccionada','error');
  const lista=usuariosJornada();
  const u=lista.find(x=>x.id===uid) || usuarios.find(x=>x.id===uid);
  if(!u) return msg('No encontré ese boleto','error');
  const nombre=nombreBoleto(u,lista);
  const confirmar=prompt(`Vas a eliminar el boleto:\n\n${nombre}\n\nSe borrarán sus pronósticos y pago de esta jornada.\n\nEscribe ELIMINAR para confirmar:`);
  if(confirmar!=='ELIMINAR') return;
  const btn=event?.target;
  const original=btn?btn.textContent:'';
  if(btn){btn.disabled=true;btn.textContent='⏳ Eliminando...'}
  try{
    const antes={usuario:u,pronosticos:pronosticos.filter(x=>x.usuario_id===uid),pago:pago(uid)||null,jornada:jornada?.nombre||''};
    await aud('ELIMINAR_BOLETO',`${nombre} fue eliminado por administrador`,uid,antes,{});
    let r;
    r=await db.from('pronosticos').delete().eq('usuario_id',uid).eq('jornada_id',jornada.id); if(r.error) throw r.error;
    r=await db.from('pagos').delete().eq('usuario_id',uid).eq('jornada_id',jornada.id); if(r.error) throw r.error;
    await db.from('fama').delete().eq('usuario_id',uid).eq('jornada_id',jornada.id);
    r=await db.from('usuarios').delete().eq('id',uid); if(r.error) throw r.error;
    await recalcularTablaLiga(true);
    await cargar();
    msg(`Boleto eliminado correctamente: ${nombre}`,'ok');
  }catch(e){
    msg('Error al eliminar boleto: '+e.message,'error');
    if(btn){btn.disabled=false;btn.textContent=original}
  }
}

function limpiar(){editandoId=null;if($('nuevoNombre')){$('nuevoNombre').value='';$('nuevoTelefono').value='';partidos.forEach(p=>{let s=$('sel_'+p.id);if(s)s.value=''});$('modo').textContent='Nuevo boleto';$('btnGuardar').textContent='Guardar';copiarDesktopAMovil()}}
function aplicarEstadoAdmin(){
  document.body.classList.toggle('admin-on', !!esAdmin);
  const login=$('login'), panel=$('panelAdmin');
  if(login) login.style.display=esAdmin?'none':'block';
  if(panel) panel.style.display=esAdmin?'block':'none';
}
async function loginAdmin(){
  const usuario=($('adminUser')?.value||'').trim();
  const password=$('adminPass')?.value||'';
  if(!usuario||!password){msg('Escribe usuario y contraseña.','error');return}
  const {data,error}=await db.rpc('validar_admin',{p_usuario:usuario,p_password:password});
  if(error){
    console.error(error);
    msg('No se pudo validar admin. Revisa que ya corriste el SQL del PIN oculto.','error');
    return;
  }
  if(data===true){
    esAdmin=true;
    localStorage.setItem(ADMIN_SESSION_KEY,'1');
    aplicarEstadoAdmin();
    dibujar();
    cargarPrivado(false);
    $('adminPass').value='';
    msg('Admin activo. Permanecerá abierto hasta que cierres sesión.','ok');
  }else{
    msg('Usuario o contraseña incorrectos','error');
  }
}
function logoutAdmin(){
  esAdmin=false;
  localStorage.removeItem(ADMIN_SESSION_KEY);
  editandoJornadaId=null;
  aplicarEstadoAdmin();
  cancelarEdicion(false);
  dibujar();
  msg('Admin cerrado. La página volvió a modo usuario.','info')
}
function dibAdmin(){let nums='';for(let i=1;i<=17;i++)nums+=`<option value="${i}">Jornada ${i}</option>`;nums+=`<option value="${NUM_LIGUILLA}">🏆 Liguilla</option>`;$('jNumero').innerHTML=nums;if(!$('jNombre').value)$('jNombre').value='Jornada 1'; if($('jNumero')) $('jNumero').setAttribute('onchange','prepararFormJornada()'); prepararFormJornada();dibJornadas();dibResultados();dibPagos()}
function partidoLiguillaNombre(i){const nombres=['Cuartos ida 1','Cuartos ida 2','Cuartos ida 3','Cuartos ida 4','Cuartos vuelta 1','Cuartos vuelta 2','Cuartos vuelta 3','Cuartos vuelta 4','Semifinal ida 1','Semifinal ida 2','Semifinal vuelta 1','Semifinal vuelta 2','Final ida','Final vuelta'];return nombres[i-1]||('Partido '+i)}
function totalPartidosForm(){return Number($('jNumero')?.value)===NUM_LIGUILLA?14:9}
function prepararFormJornada(){
 const num=Number($('jNumero')?.value||1); if($('jNombre')) $('jNombre').value = num===NUM_LIGUILLA ? 'Liguilla' : 'Jornada '+num;
 const total=totalPartidosForm(); const lig=num===NUM_LIGUILLA;
 let html=lig?'<div class="equipos-usados equipos-ok">Liguilla: 14 partidos, ida y vuelta. Puedes dejar Por definir y editar después.</div>':'<div id="contadorEquiposUsados" class="equipos-usados equipos-bad">Equipos utilizados: 0/18</div>';
 for(let i=1;i<=total;i++){
  const titulo=lig?partidoLiguillaNombre(i):('Partido '+i);
  if(lig) html+=`<div class="partido-card"><b>${titulo}</b><label>Local</label><input id="np_l_${i}" value="Por definir"><label>Visitante</label><input id="np_v_${i}" value="Por definir"><label>Fecha y hora</label><input id="np_f_${i}" type="datetime-local"><label>Estadio</label><input id="np_e_${i}"></div>`;
  else html+=`<div class="partido-card"><b>${titulo}</b><label>Local</label><select class="equipo-select" id="np_l_${i}" onchange="actualizarSelectsPartidos()">${opcionesEquipos()}</select><label>Visitante</label><select class="equipo-select" id="np_v_${i}" onchange="actualizarSelectsPartidos()">${opcionesEquipos()}</select><label>Fecha y hora</label><input id="np_f_${i}" type="datetime-local"><label>Estadio</label><input id="np_e_${i}"></div>`;
 }
 $('formPartidos').innerHTML=html; if(!lig) actualizarSelectsPartidos();
}
function dibJornadas(){let html='';jornadas.forEach(j=>html+=`<div class="partido-card"><b>${esc(j.nombre)}</b> ${j.activa?'✅ Activa':''} ${j.bloqueada?'🔒 Cerrada':'🟢 Abierta'}<div class="small">Apuesta ${money(j.costo)}</div><div class="acciones"><button class="btn-primary" onclick="activarJornada('${j.id}')">Activar</button><button class="btn-yellow" onclick="toggleJornada('${j.id}',${!j.bloqueada})">${j.bloqueada?'Abrir':'Cerrar'}</button><button class="btn-gray" onclick="cargarJornadaParaEditar('${j.id}')">Editar jornada</button><button class="btn-red" onclick="borrarJornada('${j.id}')">Borrar</button></div></div>`);$('jornadasLista').innerHTML=html||'No hay jornadas'}
function dibResultados(){if(!jornada){$('formResultados').innerHTML='Sin jornada activa';return}$('formResultados').innerHTML=partidos.map(p=>`<div class="partido-card"><b>P${p.numero_partido}</b><div>${equipoHtml(p.local)}</div><div class="vs">VS</div><div>${equipoHtml(p.visitante)}</div><div class="grid"><div><label>Goles local</label><input id="gl_${p.id}" type="number" value="${p.goles_local??''}"></div><div><label>Goles visita</label><input id="gv_${p.id}" type="number" value="${p.goles_visitante??''}"></div></div><div class="small">Actual: ${p.resultado||'pendiente'}</div></div>`).join('')}
function dibPagos(){let lista=usuariosJornada();let h='<thead><tr><th class="nombre">Boleto</th><th>Monto</th><th>Pagado</th><th>Observaciones</th></tr></thead><tbody>';lista.forEach(u=>{let pa=pago(u.id)||{};h+=`<tr><td class="nombre"><b>${esc(nombreBoleto(u,lista))}</b></td><td>${money(pa.monto||jornada.costo||20)}</td><td><button class="${pa.pagado?'btn-green':'btn-gray'}" onclick="cambiarPago('${u.id}',${!pa.pagado})">${pa.pagado?'Pagado':'Pendiente'}</button></td><td><input id="obs_${u.id}" value="${pa.observaciones||''}" onchange="obsPago('${u.id}')"></td></tr>`});$('tablaPagos').innerHTML=h+'</tbody>'}
async function cargarPrivado(redib=true){if(!esAdmin)return;let a=await db.from('auditoria').select('*').order('fecha',{ascending:false}).limit(80);if(!a.error)auditoria=a.data||[];dibAuditoria();if(redib)dibPagos()}
function dibAuditoria(){$('listaAuditoria').innerHTML=auditoria.map(a=>`<div class="audit-card"><b>${a.accion}</b><div class="small">${fecha(a.fecha)} · ${a.actor||''} · ${a.detalle||''}</div><div class="audit-json">ANTES: ${JSON.stringify(a.antes||{},null,2)}\nDESPUÉS: ${JSON.stringify(a.despues||{},null,2)}</div></div>`).join('')||'Sin movimientos'}
async function leerFormJornada(){
  if(!esAdmin) throw new Error('Solo administrador');
  let num=+$('jNumero').value,costo=+$('jCosto').value||20,nombre=$('jNombre').value||(num===NUM_LIGUILLA?'Liguilla':`Jornada ${num}`);
  let regs=[], total=totalPartidosForm(), lig=num===NUM_LIGUILLA;
  for(let i=1;i<=total;i++){
    let l=$('np_l_'+i).value.trim()||'Por definir',v=$('np_v_'+i).value.trim()||'Por definir';
    if(!lig){
      if(!l||!v)throw new Error('Falta local o visitante en partido '+i);
      if(l===v)throw new Error('Local y visitante no pueden ser el mismo equipo en partido '+i);
    }
    regs.push({numero_partido:i,local:l,visitante:v,fecha_partido:toISO($('np_f_'+i).value),estadio:$('np_e_'+i).value})
  }
  if(!lig) validarEquiposJornada(regs);
  return {num,costo,nombre,regs};
}
async function crearJornada(){try{if(!esAdmin)return msg('Solo administrador','error');
  const {num,costo,nombre,regs}=await leerFormJornada();
  if(editandoJornadaId){
    let antes={jornada:jornadas.find(j=>j.id===editandoJornadaId)};
    let jr=await db.from('jornadas').update({numero:num,nombre,costo}).eq('id',editandoJornadaId).select().single(); if(jr.error)throw jr.error;
    let existentes=await db.from('partidos').select('*').eq('jornada_id',editandoJornadaId);
    if(existentes.error)throw existentes.error;
    for(const r of regs){
      let ex=(existentes.data||[]).find(p=>p.numero_partido===r.numero_partido);
      if(ex){let up=await db.from('partidos').update(r).eq('id',ex.id); if(up.error)throw up.error;}
      else{let ins=await db.from('partidos').insert({...r,jornada_id:editandoJornadaId}); if(ins.error)throw ins.error;}
    }
    await db.from('partidos').delete().eq('jornada_id',editandoJornadaId).gt('numero_partido',regs.length);
    await aud('EDITAR_JORNADA',`Admin editó ${nombre}`,null,antes,{nombre,regs});
    editandoJornadaId=null; await cargar(); msg('Jornada actualizada correctamente','ok'); return;
  }
  await db.from('jornadas').update({activa:false}).neq('id','00000000-0000-0000-0000-000000000000');
  let jr=await db.from('jornadas').insert({numero:num,nombre,costo,activa:true,bloqueada:false,archivada:false}).select().single();if(jr.error)throw jr.error;
  let prt=await db.from('partidos').insert(regs.map(x=>({...x,jornada_id:jr.data.id})));if(prt.error)throw prt.error;
  await aud('CREAR_JORNADA',`Admin creó ${nombre}`,null,{},jr.data);await cargar();msg(num===NUM_LIGUILLA?'Liguilla creada y activada':'Jornada creada y activada con 18 equipos sin repetir','ok')
}catch(e){msg('Error: '+e.message,'error')}}
async function cargarJornadaParaEditar(id){try{if(!esAdmin)return msg('Solo administrador','error');
  editandoJornadaId=id;
  const j=jornadas.find(x=>x.id===id); if(!j) return msg('No encontré la jornada','error');
  const ps=await db.from('partidos').select('*').eq('jornada_id',id).order('numero_partido'); if(ps.error)throw ps.error;
  $('jNumero').value=j.numero||1; prepararFormJornada(); $('jNombre').value=j.nombre||''; $('jCosto').value=j.costo||20;
  (ps.data||[]).forEach(p=>{let i=p.numero_partido; if($('np_l_'+i))$('np_l_'+i).value=p.local||''; if($('np_v_'+i))$('np_v_'+i).value=p.visitante||''; if($('np_f_'+i))$('np_f_'+i).value=dtLocal(p.fecha_partido); if($('np_e_'+i))$('np_e_'+i).value=p.estadio||'';});
  actualizarSelectsPartidos();
  if($('btnCrearJornada'))$('btnCrearJornada').textContent='Guardar cambios de jornada'; if($('btnCancelarJornada'))$('btnCancelarJornada').style.display='inline-block';
  msg('Modo edición de jornada activo','info'); document.getElementById('admJornadas').scrollIntoView({behavior:'smooth',block:'start'});
}catch(e){msg('Error: '+e.message,'error')}}
function cancelarEdicionJornada(){editandoJornadaId=null; if($('btnCrearJornada'))$('btnCrearJornada').textContent='Crear jornada y activarla'; if($('btnCancelarJornada'))$('btnCancelarJornada').style.display='none'; dibAdmin();}
async function borrarJornada(id){try{if(!esAdmin)return msg('Solo administrador','error');
  const j=jornadas.find(x=>x.id===id); if(!confirm(`¿Borrar ${j?.nombre||'esta jornada'}? Se borran partidos, pronósticos y pagos relacionados.`))return;
  let prs=await db.from('pronosticos').select('usuario_id').eq('jornada_id',id);
  let pas=await db.from('pagos').select('usuario_id').eq('jornada_id',id);
  let uids=[...new Set([...(prs.data||[]).map(x=>x.usuario_id),...(pas.data||[]).map(x=>x.usuario_id)])];
  await db.from('pronosticos').delete().eq('jornada_id',id);
  await db.from('pagos').delete().eq('jornada_id',id);
  await db.from('partidos').delete().eq('jornada_id',id);
  await db.from('fama').delete().eq('jornada_id',id);
  await db.from('jornadas').delete().eq('id',id);
  for(const uid of uids){await db.from('usuarios').delete().eq('id',uid)}
  await aud('BORRAR_JORNADA',`Admin borró ${j?.nombre||id}`); await recalcularTablaLiga(); editandoJornadaId=null; await cargar(); msg('Jornada borrada y tabla recalculada','ok')
}catch(e){msg('Error al borrar: '+e.message,'error')}}
async function activarJornada(id){if(!esAdmin)return msg('Solo administrador','error');jornadaVistaId=id;await db.from('jornadas').update({activa:false}).neq('id','00000000-0000-0000-0000-000000000000');await db.from('jornadas').update({activa:true}).eq('id',id);await aud('ACTIVAR_JORNADA','Admin activó jornada');await cargar();msg('Jornada activada','ok')}
async function toggleJornada(id,cerrar){if(!esAdmin)return msg('Solo administrador','error');await db.from('jornadas').update({bloqueada:cerrar}).eq('id',id);await aud(cerrar?'CERRAR_QUINIELA':'ABRIR_QUINIELA',cerrar?'Admin cerró quiniela':'Admin abrió quiniela');await cargar();msg(cerrar?'Quiniela cerrada':'Quiniela abierta','ok')}
async function guardarResultados(){try{if(!esAdmin)return msg('Solo administrador','error');let antes=JSON.parse(JSON.stringify(partidos));for(const p of partidos){let gl=$('gl_'+p.id).value,gv=$('gv_'+p.id).value;if(gl===''||gv==='')continue;let r=resFrom(gl,gv);await db.from('partidos').update({goles_local:+gl,goles_visitante:+gv,resultado:r,finalizado:true}).eq('id',p.id)}await actualizarAciertos();await recalcularTablaLiga();await aud('CAPTURAR_RESULTADOS','Admin guardó resultados',null,antes,{});await cargar();msg('Resultados guardados','ok')}catch(e){msg('Error: '+e.message,'error')}}
async function actualizarAciertos(){let ps=await db.from('partidos').select('*').eq('jornada_id',jornada.id);let prs=await db.from('pronosticos').select('*').eq('jornada_id',jornada.id);for(const x of prs.data||[]){let p=(ps.data||[]).find(y=>y.id===x.partido_id);if(p&&p.resultado)await db.from('pronosticos').update({acierto:x.pronostico===p.resultado}).eq('id',x.id)}}
async function cambiarPago(uid,val){if(!esAdmin)return msg('Solo administrador','error');let pa=pago(uid);if(pa)await db.from('pagos').update({pagado:val,fecha_pago:val?new Date().toISOString():null,observaciones:$('obs_'+uid)?.value||pa.observaciones||''}).eq('id',pa.id);else await db.from('pagos').insert({usuario_id:uid,jornada_id:jornada.id,monto:jornada.costo||20,pagado:val,fecha_pago:val?new Date().toISOString():null});await aud(val?'MARCAR_PAGADO':'QUITAR_PAGO','Admin modificó pago',uid);await cargar();msg('Pago actualizado','ok')}
async function obsPago(uid){let pa=pago(uid);if(pa)await db.from('pagos').update({observaciones:$('obs_'+uid).value}).eq('id',pa.id)}
async function recalcularTablaLiga(){
  // Recalcula desde cero para evitar que se quede información vieja cuando se borran resultados o jornadas.
  let all=await db.from('partidos').select('*').eq('finalizado',true);
  if(all.error) throw all.error;
  let map={};
  (equipos||[]).forEach(e=>{map[e.nombre]={club:e.nombre,pj:0,g:0,e:0,p:0,gf:0,gc:0,dg:0,pts:0,ult:[]}});
  (all.data||[]).forEach(m=>{
    if(m.goles_local===null||m.goles_visitante===null||m.goles_local===undefined||m.goles_visitante===undefined)return;
    [m.local,m.visitante].forEach(c=>{if(!map[c])map[c]={club:c,pj:0,g:0,e:0,p:0,gf:0,gc:0,dg:0,pts:0,ult:[]}});
    let gl=+m.goles_local,gv=+m.goles_visitante,L=map[m.local],V=map[m.visitante];
    L.pj++;V.pj++;L.gf+=gl;L.gc+=gv;V.gf+=gv;V.gc+=gl;
    if(gl>gv){L.g++;L.pts+=3;V.p++;L.ult.push('G');V.ult.push('P')}
    else if(gl<gv){V.g++;V.pts+=3;L.p++;V.ult.push('G');L.ult.push('P')}
    else{L.e++;V.e++;L.pts++;V.pts++;L.ult.push('E');V.ult.push('E')}
  });
  let filas=Object.values(map).map(x=>({...x,dg:x.gf-x.gc,ultimos:x.ult.slice(-5).join(','),fase:''}))
    .sort((a,b)=>b.pts-a.pts||b.dg-a.dg||b.gf-a.gf||a.club.localeCompare(b.club))
    .map((x,i)=>({...x,posicion:i+1,fase:i<8&&x.pj>0?'Liguilla':''}));
  // Limpia la tabla para que no queden datos viejos.
  await db.from('tabla_liga_mx').delete().neq('id','00000000-0000-0000-0000-000000000000');
  if(filas.length){
    let regs=filas.map(f=>({club:f.club,posicion:f.posicion,pj:f.pj,g:f.g,e:f.e,p:f.p,gf:f.gf,gc:f.gc,dg:f.dg,pts:f.pts,ultimos:f.ultimos,fase:f.fase,actualizado:new Date().toISOString()}));
    let ins=await db.from('tabla_liga_mx').insert(regs);
    if(ins.error) throw ins.error;
  }
}

async function forzarRecalculoTabla(){
  try{
    if(!esAdmin)return msg('Solo administrador','error');
    await recalcularTablaLiga();
    await cargar();
    await aud('RECALCULAR_TABLA','Admin forzó actualización de tabla general');
    msg('Tabla general recalculada desde cero','ok');
  }catch(e){msg('Error al recalcular tabla: '+e.message,'error')}
}

async function reiniciarTorneo(){
  try{
    if(!esAdmin)return msg('Solo administrador','error');
    let c1=confirm('Esto borrará boletos, jornadas, partidos, resultados, pagos, fama y auditoría. Se conservan equipos y escudos. ¿Continuar?');
    if(!c1)return;
    let txt=prompt('Para confirmar escribe exactamente: REINICIAR TORNEO');
    if(txt!=='REINICIAR TORNEO')return msg('Reinicio cancelado','info');
    let temporada=prompt('Nombre de temporada para guardar en Salón de la Fama:', 'Apertura 2026') || ('Temporada '+new Date().getFullYear());
    msg('Archivando Salón de la Fama antes de reiniciar...','info');
    await archivarSalonFamaAntesDeReiniciar(temporada);
    try{ await guardarRespaldo('PRE_REINICIO',false); }catch(e){ console.warn('No se pudo crear respaldo PRE_REINICIO:',e.message); }
    // Orden por relaciones.
    await db.from('pronosticos').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('pagos').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('fama').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('auditoria').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('partidos').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('usuarios').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('jornadas').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('tabla_liga_mx').delete().neq('id','00000000-0000-0000-0000-000000000000');
    jornada=null;jornadas=[];partidos=[];usuarios=[];pronosticos=[];pagos=[];auditoria=[];fama=[];tablaLiga=[];
    await cargar();
    msg('Torneo reiniciado. Equipos y escudos se conservaron. Salón de la Fama archivado.','ok');
  }catch(e){msg('Error al reiniciar torneo: '+e.message,'error')}
}
async function cerrarYFama(){try{if(!esAdmin)return msg('Solo administrador','error');let lista=usuariosJornada().map(u=>({...u,...aciertos(u.id)}));let max=Math.max(...lista.map(x=>x.a),0);let gan=lista.filter(x=>x.a===max&&max>0);if(!gan.length)return msg('Aún no hay ganadores','error');let bolsa=pagos.filter(x=>x.pagado).length*(jornada.costo||20),premio=bolsa/gan.length;for(const g of gan){await db.from('fama').insert({jornada_id:jornada.id,usuario_id:g.id,nombre:nombreBoleto(g,lista),aciertos:g.a,premio})}await db.from('jornadas').update({bloqueada:true,archivada:true}).eq('id',jornada.id);await aud('TRONO_FAMA',`Ganadores: ${gan.map(x=>nombreBoleto(x,lista)).join(', ')}`);await cargar();msg('Ganadores enviados al trono de la fama','ok')}catch(e){msg('Error: '+e.message,'error')}}

const TABLAS_RESPALDO=['jornadas','partidos','usuarios','pronosticos','pagos','auditoria','fama','tabla_liga_mx','salon_fama'];
function inicioSemanaRespaldo(){
  const d=new Date();
  const dia=d.getDay(); // domingo 0, lunes 1
  const diff=(dia+6)%7;
  const ini=new Date(d.getFullYear(),d.getMonth(),d.getDate()-diff,8,0,0,0);
  return ini;
}
function semanaKeyRespaldo(fechaBase=new Date()){
  const ini=inicioSemanaRespaldo();
  const y=ini.getFullYear();
  const onejan=new Date(y,0,1);
  const week=Math.ceil((((ini-onejan)/86400000)+onejan.getDay()+1)/7);
  return `${y}-S${String(week).padStart(2,'0')}`;
}
async function obtenerDatosRespaldo(){
  const datos={meta:{app:'Quiniela Copa MX',version:'FIX23_BOTONES_ESTADO',fecha:new Date().toISOString(),semana:semanaKeyRespaldo()},tablas:{}};
  for(const t of TABLAS_RESPALDO){
    const r=await db.from(t).select('*');
    if(r.error) throw new Error(`No pude leer ${t}: ${r.error.message}`);
    datos.tablas[t]=r.data||[];
  }
  const eq=await db.from('equipos').select('*').order('nombre');
  datos.tablas.equipos=eq.error?[]:(eq.data||[]);
  return datos;
}
async function guardarRespaldo(tipo,automatico=false){
  const datos=await obtenerDatosRespaldo();
  datos.meta.tipo=tipo;
  const payload={tipo,fecha:new Date().toISOString(),semana:semanaKeyRespaldo(),datos};
  const r=await db.from('respaldos').upsert(payload,{onConflict:'tipo'}).select().single();
  if(r.error) throw new Error('No pude guardar respaldo. ¿Ya corriste el SQL de respaldos? '+r.error.message);
  if(automatico) await audSistema('RESPALDO_AUTO','Sistema actualizó el respaldo automático semanal',jornada?.id||null,{}, {tipo,semana:payload.semana});
  else await aud('RESPALDO_MANUAL','Admin creó respaldo manual',null,{}, {tipo,semana:payload.semana});
  return r.data;
}
async function revisarRespaldoAutomatico(){
  try{
    const inicio=inicioSemanaRespaldo();
    if(Date.now()<inicio.getTime()) return;
    const r=await db.from('respaldos').select('*').eq('tipo','AUTO_SEMANAL').maybeSingle();
    if(r.error) return console.warn('Respaldos no disponibles:',r.error.message);
    if(r.data && new Date(r.data.fecha).getTime()>=inicio.getTime()) return;
    await guardarRespaldo('AUTO_SEMANAL',true);
    await cargarEstadoRespaldos();
  }catch(e){console.warn('Respaldo automático:',e.message)}
}
async function cargarEstadoRespaldos(){
  const box=$('estadoRespaldos');
  try{
    const r=await db.from('respaldos').select('tipo,fecha,semana').order('tipo');
    if(r.error) throw r.error;
    respaldos=r.data||[];
    if(box){
      const auto=respaldos.find(x=>x.tipo==='AUTO_SEMANAL');
      const man=respaldos.find(x=>x.tipo==='MANUAL');
      box.innerHTML=`Último automático: <b>${auto?fecha(auto.fecha)+' · '+esc(auto.semana||''):'No existe'}</b><br>Último manual: <b>${man?fecha(man.fecha)+' · '+esc(man.semana||''):'No existe'}</b>`;
    }
  }catch(e){
    if(box) box.innerHTML='Falta correr el SQL de respaldos o revisar permisos: '+esc(e.message);
  }
}
async function crearRespaldoManual(){
  try{
    if(!esAdmin)return msg('Solo administrador','error');
    msg('Creando respaldo manual...','info');
    await guardarRespaldo('MANUAL',false);
    await cargarEstadoRespaldos();
    msg('Respaldo manual creado. Se reescribió el respaldo manual anterior.','ok');
  }catch(e){msg('Error respaldo: '+e.message,'error')}
}
async function forzarRespaldoAutomatico(){
  try{
    if(!esAdmin)return msg('Solo administrador','error');
    msg('Actualizando respaldo automático...','info');
    await guardarRespaldo('AUTO_SEMANAL',true);
    await cargarEstadoRespaldos();
    msg('Respaldo automático actualizado manualmente.','ok');
  }catch(e){msg('Error respaldo automático: '+e.message,'error')}
}
async function obtenerRespaldoGuardado(tipo){
  const r=await db.from('respaldos').select('*').eq('tipo',tipo).maybeSingle();
  if(r.error) throw r.error;
  if(!r.data) throw new Error('No existe respaldo '+tipo);
  return r.data;
}
async function descargarRespaldo(tipo){
  try{
    if(!esAdmin)return msg('Solo administrador','error');
    const r=await obtenerRespaldoGuardado(tipo);
    const blob=new Blob([JSON.stringify(r.datos,null,2)],{type:'application/json'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=`quiniela_copamx_${tipo}_${(r.semana||'respaldo')}.json`;
    document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(a.href);
    msg('Respaldo descargado','ok');
  }catch(e){msg('Error al descargar respaldo: '+e.message,'error')}
}
async function restaurarRespaldo(tipo){
  try{
    if(!esAdmin)return msg('Solo administrador','error');
    const r=await obtenerRespaldoGuardado(tipo);
    if(!confirm(`Restaurar respaldo ${tipo} del ${fecha(r.fecha)}? Esto reemplazará jornadas, boletos, partidos, pronósticos, pagos, fama, auditoría y tabla general. Equipos y escudos se conservan.`))return;
    const txt=prompt('Para confirmar escribe: RESTAURAR RESPALDO');
    if(txt!=='RESTAURAR RESPALDO')return msg('Restauración cancelada','info');
    const datos=r.datos?.tablas||{};
    await db.from('pronosticos').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('pagos').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('fama').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('auditoria').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('partidos').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('usuarios').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('jornadas').delete().neq('id','00000000-0000-0000-0000-000000000000');
    await db.from('tabla_liga_mx').delete().neq('id','00000000-0000-0000-0000-000000000000');
    const orden=['jornadas','usuarios','partidos','pronosticos','pagos','fama','tabla_liga_mx','auditoria'];
    for(const t of orden){
      const arr=datos[t]||[];
      if(arr.length){
        const ins=await db.from(t).insert(arr);
        if(ins.error) throw new Error(`Error restaurando ${t}: ${ins.error.message}`);
      }
    }
    jornadaVistaId=null;editandoId=null;editandoJornadaId=null;
    await cargar();
    msg('Respaldo restaurado correctamente','ok');
  }catch(e){msg('Error al restaurar: '+e.message,'error')}
}

function toggleMenuOpciones(){const m=document.getElementById('menuOpciones');if(m)m.classList.toggle('abierto')}
function cambiarModoOscuro(activo){document.body.classList.toggle('dark',activo);localStorage.setItem('quiniela_copamx_modo_oscuro',activo?'1':'0')}
function aplicarModoOscuro(){const activo=localStorage.getItem('quiniela_copamx_modo_oscuro')==='1';document.body.classList.toggle('dark',activo);const c=document.getElementById('modoOscuroCheck');if(c)c.checked=activo}


/* =================== FIX24: COMPARTIR CLASIFICACIÓN WHATSAPP =================== */
const URL_PUBLICA_QUINIELA = 'https://jesusvazquezesp-art.github.io/Quiniela-Liga-Mx/';
function medallaLugar(lugar){
  if(lugar===1)return '🥇';
  if(lugar===2)return '🥈';
  if(lugar===3)return '🥉';
  return lugar+'°';
}
function listaClasificacionCompartir(limite=10){
  const lista=usuariosJornada().map(u=>({...u,...aciertos(u.id)})).sort((a,b)=>b.a-a.a||a.nombre.localeCompare(b.nombre));
  let lugar=0,pos=0,ant=null;
  return lista.slice(0,limite).map(u=>{
    pos++;
    if(ant===null||u.a<ant)lugar=pos;
    ant=u.a;
    return `${medallaLugar(lugar)} ${nombreBoleto(u,lista)} — ${u.a}/${u.c} pts`;
  });
}
function resumenPartidosCompartir(){
  const finalizados=partidos.filter(p=>p.resultado);
  if(!finalizados.length)return '';
  return '\n\n⚽ Resultados capturados:\n'+finalizados.slice(0,9).map(p=>{
    const gl=(p.goles_local??'-'), gv=(p.goles_visitante??'-');
    return `P${p.numero_partido}: ${p.local} ${gl}-${gv} ${p.visitante}`;
  }).join('\n');
}

function textoPartidoMenosEsperadoCompartir(){
  const d=datosPartidoMenosEsperado();
  if(!d) return '';
  const p=d.p;
  const marcador=(p.goles_local!=null&&p.goles_visitante!=null)?`${p.goles_local}-${p.goles_visitante}`:textoResultadoLEV(p.resultado);
  return `\n\n🎯 Partido menos esperado:\n${p.local} ${marcador} ${p.visitante}\nSolo ${d.acertaron} de ${d.total} acertaron`;
}

async function compartirClasificacionWhatsApp(){
  try{
    const lineas=listaClasificacionCompartir(10);
    if(!lineas.length){msg('Todavía no hay boletos para compartir.','info');return;}
    const titulo=`🏆 QUINIELA COPA MX V2`;
    const jornadaTxt=jornada?`\n${jornada.nombre}${jornada.activa?' ✅ Activa':''}${jornada.bloqueada?' 🔒 Cerrada':''}`:'';
    const dificil=textoPartidoMenosEsperadoCompartir();
    const texto=`${titulo}${jornadaTxt}\n\n📊 Clasificación en vivo:\n${lineas.join('\n')}${resumenPartidosCompartir()}${dificil}\n\n📲 Entra aquí:\n${URL_PUBLICA_QUINIELA}`;
    const url='https://wa.me/?text='+encodeURIComponent(texto);
    window.open(url,'_blank');
  }catch(e){msg('No se pudo generar el mensaje de WhatsApp: '+e.message,'error')}
}


/* =================== FIX23: ESTADO VISUAL EN BOTONES =================== */
let ultimoBotonAccion=null;
document.addEventListener('click',function(e){
  const b=e.target.closest('button');
  if(b) ultimoBotonAccion=b;
},true);

function textoBotonTerminado(textoTrabajo){
  if(textoTrabajo.includes('respaldo')) return '✅ Respaldo listo';
  if(textoTrabajo.includes('Restaurando')) return '✅ Restaurado';
  if(textoTrabajo.includes('Recalculando')) return '✅ Recalculado';
  if(textoTrabajo.includes('Reiniciando')) return '✅ Reiniciado';
  if(textoTrabajo.includes('Guardando resultados')) return '✅ Resultados guardados';
  if(textoTrabajo.includes('Guardando jornada')) return '✅ Jornada guardada';
  if(textoTrabajo.includes('Guardando boleto')) return '✅ Boleto guardado';
  if(textoTrabajo.includes('Activando')) return '✅ Activada';
  if(textoTrabajo.includes('Cerrando')) return '✅ Cerrada';
  if(textoTrabajo.includes('Abriendo')) return '✅ Abierta';
  if(textoTrabajo.includes('Borrando')) return '✅ Borrado';
  if(textoTrabajo.includes('pagos')||textoTrabajo.includes('pago')) return '✅ Pago actualizado';
  return '✅ Listo';
}

async function ejecutarConEstadoBoton(textoTrabajo, tarea){
  const btn=ultimoBotonAccion;
  const usarBtn=btn && btn.tagName==='BUTTON' && !btn.disabled;
  let original='';
  if(usarBtn){
    original=btn.innerHTML;
    btn.dataset.textoOriginal=original;
    btn.disabled=true;
    btn.classList.add('btn-loading');
    btn.innerHTML=textoTrabajo;
  }
  try{
    const res=await tarea();
    if(usarBtn){
      btn.innerHTML=textoBotonTerminado(textoTrabajo);
      setTimeout(()=>{
        if(btn.dataset.textoOriginal){
          btn.innerHTML=btn.dataset.textoOriginal;
          btn.disabled=false;
          btn.classList.remove('btn-loading');
          delete btn.dataset.textoOriginal;
        }
      },1400);
    }
    return res;
  }catch(e){
    if(usarBtn){
      btn.innerHTML='❌ Error';
      setTimeout(()=>{
        btn.innerHTML=original;
        btn.disabled=false;
        btn.classList.remove('btn-loading');
        delete btn.dataset.textoOriginal;
      },1800);
    }
    throw e;
  }
}

function aplicarEstadosABotones(){
  const envolver=(nombre,texto)=>{
    const fn=window[nombre];
    if(typeof fn!=='function' || fn.__conEstado)return;
    const nuevo=function(...args){
      return ejecutarConEstadoBoton(texto,()=>fn.apply(this,args));
    };
    nuevo.__conEstado=true;
    window[nombre]=nuevo;
  };
  envolver('guardarBoleto','⏳ Guardando boleto...');
  envolver('crearJornada','⏳ Guardando jornada...');
  envolver('borrarJornada','⏳ Borrando jornada...');
  envolver('activarJornada','⏳ Activando jornada...');
  envolver('toggleJornada','⏳ Actualizando jornada...');
  envolver('guardarResultados','⏳ Guardando resultados...');
  envolver('cerrarYFama','⏳ Cerrando jornada...');
  envolver('cambiarPago','⏳ Actualizando pago...');
  envolver('forzarRecalculoTabla','⏳ Recalculando tabla...');
  envolver('reiniciarTorneo','⏳ Reiniciando torneo...');
  envolver('crearRespaldoManual','⏳ Generando respaldo...');
  envolver('forzarRespaldoAutomatico','⏳ Generando respaldo...');
  envolver('descargarRespaldo','⏳ Preparando descarga...');
  envolver('restaurarRespaldo','⏳ Restaurando respaldo...');
  envolver('loginAdmin','⏳ Entrando...');
  envolver('compartirClasificacionWhatsApp','⏳ Generando mensaje...');
}
aplicarEstadosABotones();

document.addEventListener('click',function(e){const box=document.querySelector('.menu-flotante');const m=document.getElementById('menuOpciones');if(box&&m&&!box.contains(e.target))m.classList.remove('abierto')});

async function init(){try{aplicarModoOscuro();esAdmin=localStorage.getItem(ADMIN_SESSION_KEY)==='1';aplicarEstadoAdmin();await cargar();let ultimoAuto=0;setInterval(async()=>{const ahora=Date.now();if(ahora-ultimoAuto>=30000){ultimoAuto=ahora;const cambio=await revisarCierreAutomatico();if(cambio){await cargar();return}}dibResumen();dibPartidos()},1000)}catch(e){msg('Error al cargar: '+e.message,'error');console.error(e)}}
document.addEventListener('DOMContentLoaded',init);
</script>
