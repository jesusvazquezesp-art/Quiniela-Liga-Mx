const SUPABASE_URL="https://pijlscldaveqmcxlcebz.supabase.co";
const SUPABASE_KEY="sb_publishable_kXg9gyEon_VEprcarCgEGg_HmwRdEMq";
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

  // FIX: al unificar calendarios, la pestaña Quiniela móvil dependía de
  // "Nuevo boleto" para mostrar partidos. Si la jornada estaba cerrada,
  // bloqueada o no tenía exactamente 9 partidos, ya no se veía el calendario.
  // Este bloque muestra SIEMPRE el calendario de la jornada en móvil,
  // usando las mismas tarjetas que la pestaña Partidos.
  if(partidos.length){
    html+=`<div class="boleto-form-card">
      <h3>📅 Calendario de la jornada</h3>
      <div class="partidos-grid">${partidos.map(p=>cardPartidoNormal(p)).join('')}</div>
    </div>`;
  }else{
    html+=`<div class="boleto-form-card"><b>📅 Calendario de la jornada</b><div class="small">Aún no hay partidos cargados para esta jornada.</div></div>`;
  }
  if(!bloqueada()&&partidos.length===9){
    html+=`<div class="boleto-form-card"><h3>Nuevo boleto</h3><input id="mNuevoNombre" placeholder="Nombre / boleto"><input id="mNuevoTelefono" placeholder="Teléfono opcional"><div class="small" id="mModo">Nuevo boleto</div>`;
    partidos.forEach(p=>{html+=`<div class="pronostico-card"><div class="titulo-p">P${p.numero_partido}</div>${equipoHtml(p.local)}<div class="vs">VS</div>${equipoHtml(p.visitante)}<div class="small">${fecha(p.fecha_partido)}</div><select id="mSel_${p.id}"><option value="">Elegir pronóstico</option><option value="L">Gana local</option><option value="E">Empate</option><option value="V">Gana visita</option></select></div>`});
    html+=`<div class="mobile-actions"><button class="btn-primary" onclick="guardarBoletoMovil()" id="mBtnGuardar">Guardar boleto</button><button class="btn-gray" onclick="limpiarMovil()">Limpiar</button></div></div>`;
  }else{
    const motivo = bloqueada() ? 'Quiniela cerrada.' : `Faltan partidos para capturar boleto (${partidos.length}/9).`;
    html+=`<div class="boleto-form-card"><b>${esc(motivo)}</b></div>`;
  }
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
function dibFama(){if(!fama.length){$('famaLista').innerHTML='<p>No hay ganadores todavía.</p>';return}$('famaLista').innerHTML=fama.map(f=>`<div class="fama-card"><b>👑 ${f.nombre}</b><div class="small">${f.aciertos} aciertos · Premio: ${money(f.premio)} · ${fecha(f.fecha)}</div></div>`).join('')}
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
function toggleMenuOpciones(){const m=document.getElementById('menuOpciones');if(m)m.classList.toggle('abierto')}
function cambiarModoOscuro(activo){document.body.classList.toggle('dark',activo);localStorage.setItem('quiniela_copamx_modo_oscuro',activo?'1':'0')}
function aplicarModoOscuro(){
    let valor = localStorage.getItem('quiniela_copamx_modo_oscuro');
    // Si nunca ha elegido tema, usar oscuro
    if(valor === null){
        valor = '1';
        localStorage.setItem('quiniela_copamx_modo_oscuro','1');
    }
    const activo = valor === '1';
    document.body.classList.toggle('dark', activo);
    const c = document.getElementById('modoOscuroCheck');
    if(c) c.checked = activo;
}
/* =================== FIX24: COMPARTIR CLASIFICACIÓN WHATSAPP =================== */
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
