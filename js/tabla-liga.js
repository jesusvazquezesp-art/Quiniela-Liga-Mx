function dibTablaLiga(){let h='<thead><tr><th>#</th><th class="nombre">Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th><th>Últimos</th><th>Fase</th></tr></thead><tbody>';tablaLiga.forEach(r=>h+=`<tr><td>${r.posicion||''}</td><td class="nombre">${equipoHtml(r.club)}</td><td>${r.pj||0}</td><td>${r.g||0}</td><td>${r.e||0}</td><td>${r.p||0}</td><td>${r.gf||0}</td><td>${r.gc||0}</td><td>${r.dg||0}</td><td><b>${r.pts||0}</b></td><td>${r.ultimos||r.ultimos5||''}</td><td>${r.fase||''}</td></tr>`);$('tablaGeneralLiga').innerHTML=h+'</tbody>';let mob=$('tablaGeneralLigaMobile');if(mob){let head=`<div class="liga-compact-head"><div class="team-title">Equipo</div><div>PJ</div><div>G</div><div>E</div><div>P</div><div>GA</div><div>GR</div><div>Dif</div><div>Pts</div></div>`;let rows=tablaLiga.map(r=>{let dg=Number(r.dg||0);let dgCls=dg>0?'positivo':dg<0?'negativo':'';let zona=Number(r.posicion||0)<=8?' zona-liguilla':'';return `<div class="liga-compact-row${zona}"><div class="liga-team-mobile"><div class="pos">${r.posicion||'-'}</div>${escudo(r.club)}<div class="club">${esc(r.club||'-')}</div></div><div class="liga-num">${r.pj||0}</div><div class="liga-num">${r.g||0}</div><div class="liga-num">${r.e||0}</div><div class="liga-num">${r.p||0}</div><div class="liga-num">${r.gf||0}</div><div class="liga-num">${r.gc||0}</div><div class="liga-num dif ${dgCls}">${dg>0?'+'+dg:dg}</div><div class="liga-num pts">${r.pts||0}</div><div class="liga-extra-line"><span>Últimos: ${esc(r.ultimos||r.ultimos5||'-')}</span><span>Fase: ${esc(r.fase||'-')}</span></div></div>`}).join('');mob.innerHTML=`<div class="liga-compact-mobile">${head}${rows}</div>`}}
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
="liga-team-mobile"><div class="pos">${r.posicion||'-'}</div>${escudo(r.club)}<div class="club">${esc(r.club||'-')}</div></div><div class="liga-num">${r.pj||0}</div><div class="liga-num">${r.g||0}</div><div class="liga-num">${r.e||0}</div><div class="liga-num">${r.p||0}</div><div class="liga-num">${r.gf||0}</div><div class="liga-num">${r.gc||0}</div><div class="liga-num dif ${dgCls}">${dg>0?'+'+dg:dg}</div><div class="liga-num pts">${r.pts||0}</div><div class="liga-extra-line"><span>Últimos: ${esc(r.ultimos||r.ultimos5||'-')}</span><span>Fase: ${esc(r.fase||'-')}</span></div></div>`}).join('');mob.innerHTML=`<div class="liga-compact-mobile">${head}${rows}</div>`}}
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
