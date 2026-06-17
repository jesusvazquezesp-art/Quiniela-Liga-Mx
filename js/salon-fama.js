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
