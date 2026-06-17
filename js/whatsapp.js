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
