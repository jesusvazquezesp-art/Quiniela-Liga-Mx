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
function partidoLiguillaNombre(i){const nombres=['Cuartos ida 1','Cuartos ida 2','Cuartos ida 3','Cuartos ida 4','Cuartos vuelta 1','Cuartos vuelta 2','Cuartos vuelta 3','Cuartos vuelta 4','Semifinal ida 1','Semifinal ida 2','Semifinal vuelta 1','Semifinal vuelta 2','Final ida','Final vuelta'];return nombres[i-1]||('Partido '+i)}
