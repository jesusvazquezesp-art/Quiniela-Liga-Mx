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

