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
